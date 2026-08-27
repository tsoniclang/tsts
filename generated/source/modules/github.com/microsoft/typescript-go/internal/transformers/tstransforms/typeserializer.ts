import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ConditionalTypeNode as ConditionalTypeNode__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, QualifiedName as QualifiedName__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, TypePredicateNode as TypePredicateNode__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptTarget as ScriptTarget__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, ConditionalExpression as ConditionalExpression__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAllAccessorDeclarations as GetAllAccessorDeclarations__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, GetRestParameterElementType as GetRestParameterElementType__from_ast, Identifier as Identifier__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, IsAsyncFunction as IsAsyncFunction__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsConditionalExpression as IsConditionalExpression__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsLiteralTypeNode as IsLiteralTypeNode__from_ast, IsNumericLiteral as IsNumericLiteral__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsThisParameter as IsThisParameter__from_ast, IsTypeOfExpression as IsTypeOfExpression__from_ast, IsVoidExpression as IsVoidExpression__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindBigIntKeyword$constant as KindBigIntKeyword$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJSDocAllType$constant as KindJSDocAllType$constant__from_ast, KindJSDocNonNullableType$constant as KindJSDocNonNullableType$constant__from_ast, KindJSDocNullableType$constant as KindJSDocNullableType$constant__from_ast, KindJSDocOptionalType$constant as KindJSDocOptionalType$constant__from_ast, KindJSDocVariadicType$constant as KindJSDocVariadicType$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindTemplateLiteralType$constant as KindTemplateLiteralType$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeIsPresent as NodeIsPresent__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, SkipTypeParentheses as SkipTypeParentheses__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ScriptTargetES2020$constant as ScriptTargetES2020$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer, TypeReferenceSerializationKindArrayLikeType$int32 as TypeReferenceSerializationKindArrayLikeType$int32__from_printer, TypeReferenceSerializationKindBigIntLikeType$int32 as TypeReferenceSerializationKindBigIntLikeType$int32__from_printer, TypeReferenceSerializationKindBooleanType$int32 as TypeReferenceSerializationKindBooleanType$int32__from_printer, TypeReferenceSerializationKindESSymbolType$int32 as TypeReferenceSerializationKindESSymbolType$int32__from_printer, TypeReferenceSerializationKindNumberLikeType$int32 as TypeReferenceSerializationKindNumberLikeType$int32__from_printer, TypeReferenceSerializationKindObjectType$int32 as TypeReferenceSerializationKindObjectType$int32__from_printer, TypeReferenceSerializationKindPromise$int32 as TypeReferenceSerializationKindPromise$int32__from_printer, TypeReferenceSerializationKindStringLikeType$int32 as TypeReferenceSerializationKindStringLikeType$int32__from_printer, TypeReferenceSerializationKindTypeWithCallSignature$int32 as TypeReferenceSerializationKindTypeWithCallSignature$int32__from_printer, TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32 as TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32__from_printer, TypeReferenceSerializationKindUnknown$int32 as TypeReferenceSerializationKindUnknown$int32__from_printer, TypeReferenceSerializationKindVoidNullableOrNeverType$int32 as TypeReferenceSerializationKindVoidNullableOrNeverType$int32__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$Named_printer$TypeReferenceSerializationKind, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class metadataSerializer {
    declare private readonly $goType: void;
    public constructor(public resolver: EmitResolver__from_printer | undefined, public languageVersion: ScriptTarget__from_core, public strictNullChecks: bool, public f: {
        value: NodeFactory__from_printer;
    } | undefined, public ec: {
        value: EmitContext__from_printer;
    } | undefined, public c: metadataSerializerContext) {
    }
    declare private readonly then?: never;
    static SerializeParameterTypesOfNode(s: metadataSerializer | undefined, ctx: metadataSerializerContext, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let oldCtx = metadataSerializerContext.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c);
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c = metadataSerializerContext.$copy(ctx);
                    const __gotots_receiver_0 = s;
                    const __gotots_argument_0 = metadataSerializerContext.$copy(oldCtx);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        metadataSerializer.$go$private$tstransforms$setContext(__gotots_receiver_0, __gotots_argument_0);
                    };
                    __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeParameterTypesOfNode(s, node, container);
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
    static SerializeReturnTypeOfNode(s: metadataSerializer | undefined, ctx: metadataSerializerContext, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let oldCtx = metadataSerializerContext.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c);
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c = metadataSerializerContext.$copy(ctx);
                    const __gotots_receiver_0 = s;
                    const __gotots_argument_0 = metadataSerializerContext.$copy(oldCtx);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        metadataSerializer.$go$private$tstransforms$setContext(__gotots_receiver_0, __gotots_argument_0);
                    };
                    __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeReturnTypeOfNode(s, node);
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
    static SerializeTypeOfNode(s: metadataSerializer | undefined, ctx: metadataSerializerContext, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let oldCtx = metadataSerializerContext.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c);
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c = metadataSerializerContext.$copy(ctx);
                    const __gotots_receiver_0 = s;
                    const __gotots_argument_0 = metadataSerializerContext.$copy(oldCtx);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        metadataSerializer.$go$private$tstransforms$setContext(__gotots_receiver_0, __gotots_argument_0);
                    };
                    __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeTypeOfNode(s, node, container);
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
    static $go$private$tstransforms$createCheckedValue(s: metadataSerializer | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_8 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f;
        const __gotots_receiver_7 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f;
        const __gotots_store_43 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_20 = NodeFactory__from_ast.NewTypeOfExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeFactory"), left);
        const __gotots_store_44 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_21 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory"), "undefined", TokenFlagsNone$constant__from_ast());
        const __gotots_argument_22 = NodeFactory__from_printer.NewStrictInequalityExpression(__gotots_receiver_7, __gotots_argument_20, __gotots_argument_21);
        const __gotots_argument_23 = right;
        return NodeFactory__from_printer.NewLogicalANDExpression(__gotots_receiver_8, __gotots_argument_22, __gotots_argument_23);
    }
    static $go$private$tstransforms$equateSerializedTypeNodes(s: metadataSerializer | undefined, left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (IsGeneratedIdentifier__from_transformers((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, left)) {
            return IsGeneratedIdentifier__from_transformers((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, right);
        }
        if (IsIdentifier__from_ast(left)) {
            return IsIdentifier__from_ast(right) && Node__from_ast.Text(left) === Node__from_ast.Text(right);
        }
        if (IsPropertyAccessExpression__from_ast(left)) {
            return IsPropertyAccessExpression__from_ast(right) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, Node__from_ast.Expression(left), Node__from_ast.Expression(right)) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, Node__from_ast.Name(left), Node__from_ast.Name(right));
        }
        if (IsVoidExpression__from_ast(left)) {
            return IsVoidExpression__from_ast(right) && IsNumericLiteral__from_ast(Node__from_ast.Expression(left)) && IsNumericLiteral__from_ast(Node__from_ast.Expression(right)) && Node__from_ast.Text(Node__from_ast.Expression(left)) === "0" && Node__from_ast.Text(Node__from_ast.Expression(right)) === "0";
        }
        if (IsStringLiteral__from_ast(left)) {
            return IsStringLiteral__from_ast(right) && Node__from_ast.Text(left) === Node__from_ast.Text(right);
        }
        if (IsTypeOfExpression__from_ast(left)) {
            return IsTypeOfExpression__from_ast(right) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, Node__from_ast.Expression(left), Node__from_ast.Expression(right));
        }
        if (IsParenthesizedExpression__from_ast(left)) {
            return IsParenthesizedExpression__from_ast(right) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, Node__from_ast.Expression(left), Node__from_ast.Expression(right));
        }
        if (IsConditionalExpression__from_ast(left)) {
            return IsConditionalExpression__from_ast(right) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse);
        }
        if (IsBinaryExpression__from_ast(left)) {
            return IsBinaryExpression__from_ast(right) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        }
        return false;
    }
    static $go$private$tstransforms$serializeBigIntConstructor(s: metadataSerializer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).languageVersion >= ScriptTargetES2020$constant__from_core()) {
            const __gotots_store_19 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), "BigInt");
        }
        const __gotots_store_20 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory");
        const __gotots_receiver_2 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f;
        const __gotots_store_21 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_4 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), "BigInt");
        const __gotots_argument_5 = "function";
        const __gotots_argument_6 = NodeFactory__from_printer.NewTypeCheck(__gotots_receiver_2, __gotots_argument_4, __gotots_argument_5);
        const __gotots_store_22 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_7 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), KindQuestionToken$constant__from_ast());
        const __gotots_store_23 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_8 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), "BigInt");
        const __gotots_store_24 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_9 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), KindColonToken$constant__from_ast());
        const __gotots_store_25 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_10 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), "Object");
        return NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_3, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    }
    static $go$private$tstransforms$serializeEntityNameAsExpression(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast(): {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(node, new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f));
                Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                EmitContext__from_printer.UnsetOriginal((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, name);
                Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = EmitContext__from_printer.ParseNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.currentLexicalScope);
                return name;
                break;
            }
            case KindQualifiedName$constant__from_ast(): {
                return metadataSerializer.$go$private$tstransforms$serializeQualifiedNameAsExpression(s, Node__from_ast.AsQualifiedName(node));
                break;
            }
        }
        return void 0;
    }
    static $go$private$tstransforms$serializeEntityNameAsExpressionFallback(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
            let copied: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpression(s, node);
            return metadataSerializer.$go$private$tstransforms$createCheckedValue(s, copied, copied);
        }
        if (Node__from_ast.$storageOf((((Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
            return metadataSerializer.$go$private$tstransforms$createCheckedValue(s, metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpression(s, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left), metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpression(s, node));
        }
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpressionFallback(s, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left);
        let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
        EmitContext__from_printer.AddVariableDeclaration((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, temp);
        const __gotots_receiver_6 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f;
        const __gotots_argument_18 = NodeFactory__from_printer.NewLogicalANDExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, NodeFactory__from_printer.NewStrictInequalityExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f, NodeFactory__from_printer.NewAssignmentExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f, temp, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right), NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f)));
        const __gotots_store_42 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_19 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory"), temp, void 0, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, NodeFlagsNone$constant__from_ast());
        return NodeFactory__from_printer.NewLogicalANDExpression(__gotots_receiver_6, __gotots_argument_18, __gotots_argument_19);
    }
    static $go$private$tstransforms$serializeLiteralOfLiteralTypeNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindStringLiteral$constant__from_ast():
            case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                const __gotots_store_16 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory"), "String");
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
                switch (Node__from_ast.$storageOf(((operand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindNumericLiteral$constant__from_ast():
                    case KindBigIntLiteral$constant__from_ast(): {
                        return metadataSerializer.$go$private$tstransforms$serializeLiteralOfLiteralTypeNode(s, operand);
                        break;
                    }
                    default: {
                        FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(operand), RuntimeSlice.nil<GoInterface | undefined>());
                        break;
                    }
                }
                break;
            }
            case KindNumericLiteral$constant__from_ast(): {
                const __gotots_store_17 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), "Number");
                break;
            }
            case KindBigIntLiteral$constant__from_ast(): {
                return metadataSerializer.$go$private$tstransforms$serializeBigIntConstructor(s);
                break;
            }
            case KindTrueKeyword$constant__from_ast():
            case KindFalseKeyword$constant__from_ast(): {
                const __gotots_store_18 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), "Boolean");
                break;
            }
            case KindNullKeyword$constant__from_ast(): {
                return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                break;
            }
            default: {
                FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(node), RuntimeSlice.nil<GoInterface | undefined>());
                return void 0;
                break;
            }
        }
        return void 0;
    }
    static $go$private$tstransforms$serializeParameterTypesOfNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let valueDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsClassLike__from_ast(node)) {
            valueDeclaration = GetFirstConstructorWithBody__from_ast(node);
        }
        else if (IsFunctionLike__from_ast(node) && NodeIsPresent__from_ast(Node__from_ast.Body(node))) {
            valueDeclaration = node;
        }
        if (valueDeclaration === undefined) {
            const __gotots_store_1 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory");
            const __gotots_store_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_0 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_1 = false;
            return NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1);
        }
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getParametersOfDecoratedDeclaration(valueDeclaration, container);
        const __gotots_range_0 = NodeList__from_ast.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            if (i === 0 && IsIdentifier__from_ast(Node__from_ast.Name(parameter)) && Node__from_ast.Text(Node__from_ast.Name(parameter)) === "this") {
                continue;
            }
            if (!(ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(parameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
                expressions = expressions.append(void 0, [metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, GetRestParameterElementType__from_ast(Node__from_ast.Type(parameter)))]);
            }
            else {
                expressions = expressions.append(void 0, [metadataSerializer.$go$private$tstransforms$serializeTypeOfNode(s, parameter, container)]);
            }
        }
        const __gotots_store_3 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory");
        const __gotots_store_4 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_2 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), expressions);
        const __gotots_argument_3 = false;
        return NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_1, __gotots_argument_2, __gotots_argument_3);
    }
    static $go$private$tstransforms$serializeQualifiedNameAsExpression(s: metadataSerializer | undefined, node: {
        value: QualifiedName__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_45 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeFactory"), metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpression(s, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left), void 0, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, NodeFlagsNone$constant__from_ast());
    }
    static $go$private$tstransforms$serializeReturnTypeOfNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsFunctionLike__from_ast(node) && !(Node__from_ast.Type(node) === undefined)) {
            return metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, Node__from_ast.Type(node));
        }
        else if (IsAsyncFunction__from_ast(node)) {
            const __gotots_store_5 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), "Promise");
        }
        return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
    }
    static $go$private$tstransforms$serializeTypeNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (node === undefined) {
                        const __gotots_store_6 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), "Object");
                        break __gotots_return_block_0;
                    }
                    node = SkipTypeParentheses__from_ast(node);
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindVoidKeyword$constant__from_ast():
                        case KindUndefinedKeyword$constant__from_ast():
                        case KindNeverKeyword$constant__from_ast(): {
                            __gotots_return_0 = NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionType$constant__from_ast():
                        case KindConstructorType$constant__from_ast(): {
                            const __gotots_store_7 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), "Function");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindArrayType$constant__from_ast():
                        case KindTupleType$constant__from_ast(): {
                            const __gotots_store_8 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), "Array");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTypePredicate$constant__from_ast(): {
                            if (!((Node__from_ast.AsTypePredicateNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssertsModifier === undefined)) {
                                __gotots_return_0 = NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_9 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), "Boolean");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindBooleanKeyword$constant__from_ast(): {
                            const __gotots_store_10 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), "Boolean");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTemplateLiteralType$constant__from_ast():
                        case KindStringKeyword$constant__from_ast(): {
                            const __gotots_store_11 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), "String");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindObjectKeyword$constant__from_ast(): {
                            const __gotots_store_12 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), "Object");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindLiteralType$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeLiteralOfLiteralTypeNode(s, LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNumberKeyword$constant__from_ast(): {
                            const __gotots_store_13 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), "Number");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindBigIntKeyword$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeBigIntConstructor(s);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSymbolKeyword$constant__from_ast(): {
                            const __gotots_store_14 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), "Symbol");
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTypeReference$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeTypeReferenceNode(s, Node__from_ast.AsTypeReferenceNode(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindIntersectionType$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeUnionOrIntersectionConstituents(s, NodeList__from_ast.$storageOf(((UnionOrIntersectionTypeNodeBase__from_ast.$storageOf(UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage(IntersectionTypeNode__from_ast.$storageOf(((Node__from_ast.AsIntersectionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, true);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindUnionType$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeUnionOrIntersectionConstituents(s, NodeList__from_ast.$storageOf(((UnionOrIntersectionTypeNodeBase__from_ast.$storageOf(UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage(UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindConditionalType$constant__from_ast(): {
                            let oldState = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.serializingConditionalTypeBranch;
                            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.serializingConditionalTypeBranch = true;
                            const __gotots_callee_0 = (): void => {
                                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.serializingConditionalTypeBranch = oldState;
                            };
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_callee_0();
                            });
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeUnionOrIntersectionConstituents(s, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([(Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType, (Node__from_ast.AsConditionalTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType]), false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTypeOperator$constant__from_ast(): {
                            if (TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindReadonlyKeyword$constant__from_ast()) {
                                __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, Node__from_ast.Type(node));
                                break __gotots_return_block_0;
                            }
                            break;
                        }
                        case KindTypeQuery$constant__from_ast():
                        case KindIndexedAccessType$constant__from_ast():
                        case KindMappedType$constant__from_ast():
                        case KindTypeLiteral$constant__from_ast():
                        case KindAnyKeyword$constant__from_ast():
                        case KindUnknownKeyword$constant__from_ast():
                        case KindThisType$constant__from_ast():
                        case KindImportType$constant__from_ast(): {
                            break;
                            break;
                        }
                        case KindJSDocAllType$constant__from_ast():
                        case KindJSDocVariadicType$constant__from_ast(): {
                            break;
                            break;
                        }
                        case KindJSDocNullableType$constant__from_ast():
                        case KindJSDocNonNullableType$constant__from_ast():
                        case KindJSDocOptionalType$constant__from_ast(): {
                            __gotots_return_0 = metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, Node__from_ast.Type(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(node), RuntimeSlice.nil<GoInterface | undefined>());
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                    const __gotots_store_15 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), "Object");
                    break __gotots_return_block_0;
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
    static $go$private$tstransforms$serializeTypeOfNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyDeclaration$constant__from_ast():
            case KindParameter$constant__from_ast(): {
                return metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, Node__from_ast.Type(node));
                break;
            }
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast(): {
                return metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, getAccessorTypeNode(node, container));
                break;
            }
            case KindClassDeclaration$constant__from_ast():
            case KindClassExpression$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast(): {
                const __gotots_store_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory"), "Function");
                break;
            }
            default: {
                return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                break;
            }
        }
    }
    static $go$private$tstransforms$serializeTypeReferenceNode(s: metadataSerializer | undefined, node: tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let serialScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.currentNameScope;
        if (serialScope === undefined) {
            serialScope = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.currentLexicalScope;
        }
        const __gotots_receiver_4 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_argument_11 = EmitContext__from_printer.ParseNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, TypeReferenceNode__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName);
        const __gotots_argument_12 = EmitContext__from_printer.ParseNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, serialScope);
        let kind = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_4).GetTypeReferenceSerializationKind(__gotots_argument_11, __gotots_argument_12);
        switch (kind) {
            case TypeReferenceSerializationKindUnknown$int32__from_printer: {
                if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c.serializingConditionalTypeBranch) {
                    const __gotots_store_26 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), "Object");
                }
                let serialized: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpressionFallback(s, TypeReferenceNode__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName);
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                EmitContext__from_printer.AddVariableDeclaration((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ec, temp);
                const __gotots_store_27 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory");
                const __gotots_argument_13 = NodeFactory__from_printer.NewTypeCheck((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f, NodeFactory__from_printer.NewAssignmentExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f, temp, serialized), "function");
                const __gotots_store_28 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_14 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), KindQuestionToken$constant__from_ast());
                const __gotots_argument_15 = temp;
                const __gotots_store_29 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_16 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), KindColonToken$constant__from_ast());
                const __gotots_store_30 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_17 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), "Object");
                return NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_5, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
                break;
            }
            case TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32__from_printer: {
                return metadataSerializer.$go$private$tstransforms$serializeEntityNameAsExpression(s, TypeReferenceNode__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName);
                break;
            }
            case TypeReferenceSerializationKindVoidNullableOrNeverType$int32__from_printer: {
                return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                break;
            }
            case TypeReferenceSerializationKindBigIntLikeType$int32__from_printer: {
                return metadataSerializer.$go$private$tstransforms$serializeBigIntConstructor(s);
                break;
            }
            case TypeReferenceSerializationKindBooleanType$int32__from_printer: {
                const __gotots_store_31 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeFactory"), "Boolean");
                break;
            }
            case TypeReferenceSerializationKindNumberLikeType$int32__from_printer: {
                const __gotots_store_32 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), "Number");
                break;
            }
            case TypeReferenceSerializationKindStringLikeType$int32__from_printer: {
                const __gotots_store_33 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory"), "String");
                break;
            }
            case TypeReferenceSerializationKindArrayLikeType$int32__from_printer: {
                const __gotots_store_34 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), "Array");
                break;
            }
            case TypeReferenceSerializationKindESSymbolType$int32__from_printer: {
                const __gotots_store_35 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory"), "Symbol");
                break;
            }
            case TypeReferenceSerializationKindTypeWithCallSignature$int32__from_printer: {
                const __gotots_store_36 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory"), "Function");
                break;
            }
            case TypeReferenceSerializationKindPromise$int32__from_printer: {
                const __gotots_store_37 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeFactory"), "Promise");
                break;
            }
            case TypeReferenceSerializationKindObjectType$int32__from_printer: {
                const __gotots_store_38 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeFactory"), "Object");
                break;
            }
            default: {
                AssertNever__from_debug(new $goInterfaceAdapter$Named_printer$TypeReferenceSerializationKind(kind), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("unknown type reference serialization kind")]));
                return void 0;
                break;
            }
        }
    }
    static $go$private$tstransforms$serializeUnionOrIntersectionConstituents(s: metadataSerializer | undefined, types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, isIntersection: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let serializedType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_range_1 = types;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            typeNode = SkipTypeParentheses__from_ast(typeNode);
            if (Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNeverKeyword$constant__from_ast()) {
                if (isIntersection) {
                    return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
                }
                continue;
            }
            if (Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindUnknownKeyword$constant__from_ast()) {
                if (!isIntersection) {
                    const __gotots_store_39 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), "Object");
                }
                continue;
            }
            if (Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAnyKeyword$constant__from_ast()) {
                const __gotots_store_40 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory"), "Object");
            }
            if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).strictNullChecks && ((IsLiteralTypeNode__from_ast(typeNode) && Node__from_ast.$storageOf(((LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast()) || Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindUndefinedKeyword$constant__from_ast())) {
                continue;
            }
            let serializedConstituent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = metadataSerializer.$go$private$tstransforms$serializeTypeNode(s, typeNode);
            if (IsIdentifier__from_ast(serializedConstituent) && Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(serializedConstituent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text === "Object") {
                return serializedConstituent;
            }
            if (!(serializedType === undefined)) {
                if (!metadataSerializer.$go$private$tstransforms$equateSerializedTypeNodes(s, serializedType, serializedConstituent)) {
                    const __gotots_store_41 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory"), "Object");
                }
            }
            else {
                serializedType = serializedConstituent;
            }
        }
        if (!(serializedType === undefined)) {
            return serializedType;
        }
        return NodeFactory__from_printer.NewVoidZeroExpression((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).f);
    }
    static $go$private$tstransforms$setContext(s: metadataSerializer | undefined, ctx: metadataSerializerContext): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c = metadataSerializerContext.$copy(ctx);
    }
}
export class metadataSerializerContext {
    declare private readonly $goType: void;
    public constructor(public currentLexicalScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNameScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public serializingConditionalTypeBranch: bool) {
    }
    static $zero(): metadataSerializerContext {
        return new metadataSerializerContext(void 0, void 0, false);
    }
    static $copy($source: metadataSerializerContext): metadataSerializerContext {
        return new metadataSerializerContext($source.currentLexicalScope, $source.currentNameScope, $source.serializingConditionalTypeBranch);
    }
    declare private readonly then?: never;
}
export function newMetadataSerializer(resolver: EmitResolver__from_printer | undefined, f: {
    value: NodeFactory__from_printer;
} | undefined, ec: {
    value: EmitContext__from_printer;
} | undefined, languageVersion: ScriptTarget__from_core, strictNullChecks: bool): metadataSerializer | undefined {
    return new metadataSerializer(resolver, languageVersion, strictNullChecks, f, ec, metadataSerializerContext.$zero());
}
export function GetSetAccessorValueParameter(node: {
    value: SetAccessorDeclaration__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!(node === undefined) && NodeList__from_ast.$storageOf(((FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
        if (NodeList__from_ast.$storageOf(((FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >= 2 && IsThisParameter__from_ast(NodeList__from_ast.$storageOf(((FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0))) {
            return NodeList__from_ast.$storageOf(((FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(1);
        }
        return NodeList__from_ast.$storageOf(((FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
    }
    return void 0;
}
export function getSetAccessorTypeAnnotationNode(node: {
    value: SetAccessorDeclaration__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetSetAccessorValueParameter(node);
    if (!(p === undefined) && !(Node__from_ast.Type(p) === undefined)) {
        return Node__from_ast.Type(p);
    }
    return void 0;
}
export function getAccessorTypeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let accessors = GetAllAccessorDeclarations__from_ast(Node__from_ast.Members(container), node);
    if (!(accessors.SetAccessor === undefined)) {
        return getSetAccessorTypeAnnotationNode(accessors.SetAccessor);
    }
    if (!(accessors.GetAccessor === undefined)) {
        return FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((accessors.GetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type;
    }
    return void 0;
}
export function getParametersOfDecoratedDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (!(container === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast()) {
        let acc = GetAllAccessorDeclarations__from_ast(Node__from_ast.Members(container), node);
        if (!(acc.SetAccessor === undefined)) {
            return FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((acc.SetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        }
    }
    return Node__from_ast.ParameterList(node);
}
