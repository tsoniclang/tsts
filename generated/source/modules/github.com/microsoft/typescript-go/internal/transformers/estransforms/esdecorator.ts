import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, ComputedPropertyName as ComputedPropertyName__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, Decorator as Decorator__from_ast, ForStatement as ForStatement__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, MethodDeclaration as MethodDeclaration__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, PartiallyEmittedExpression as PartiallyEmittedExpression__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SourceFile as SourceFile__from_ast, SpreadAssignment as SpreadAssignment__from_ast, SpreadElement as SpreadElement__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TryStatement as TryStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ChildIsDecorated as ChildIsDecorated__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ClassOrConstructorParameterIsDecorated as ClassOrConstructorParameterIsDecorated__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, GetHeritageClause as GetHeritageClause__from_ast, HasAccessorModifier as HasAccessorModifier__from_ast, HasDecorators as HasDecorators__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsArrayBindingOrAssignmentElement as IsArrayBindingOrAssignmentElement__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsAutoAccessorPropertyDeclaration as IsAutoAccessorPropertyDeclaration__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsCompoundAssignment as IsCompoundAssignment__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsLeftHandSideExpression as IsLeftHandSideExpression__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodOrAccessor as IsMethodOrAccessor__from_ast, IsObjectBindingOrAssignmentElement as IsObjectBindingOrAssignmentElement__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPrefixUnaryExpression as IsPrefixUnaryExpression__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSpreadAssignment as IsSpreadAssignment__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsSuperProperty as IsSuperProperty__from_ast, IsTryStatement as IsTryStatement__from_ast, KindAccessorKeyword$constant as KindAccessorKeyword$constant__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeIsDecorated as NodeIsDecorated__from_ast, NodeList as NodeList__from_ast, NodeOrChildIsDecorated as NodeOrChildIsDecorated__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, SkipParentheses as SkipParentheses__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsDecorators$constant as SubtreeContainsDecorators$constant__from_ast, SubtreeContainsLexicalSuper$constant as SubtreeContainsLexicalSuper$constant__from_ast, SubtreeContainsLexicalThis$constant as SubtreeContainsLexicalThis$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, ScriptTargetESNext$constant as ScriptTargetESNext$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { AssignedNameOptions as AssignedNameOptions__from_printer, AutoGenerateOptions as AutoGenerateOptions__from_printer, EFHelperName$constant as EFHelperName$constant__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFNoLeadingComments$constant as EFNoLeadingComments$constant__from_printer, EFNoTrailingSourceMap$constant as EFNoTrailingSourceMap$constant__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EFTransformPrivateStaticElements$constant as EFTransformPrivateStaticElements$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsOptimistic$int as GeneratedIdentifierFlagsOptimistic$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { FindSuperStatementIndexPath as FindSuperStatementIndexPath__from_transformers, GetNonAssignmentOperatorForCompoundAssignment as GetNonAssignmentOperatorForCompoundAssignment__from_transformers, IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsSimpleInlineableExpression as IsSimpleInlineableExpression__from_transformers, MoveRangePastDecorators as MoveRangePastDecorators__from_transformers, MoveRangePastModifiers as MoveRangePastModifiers__from_transformers, SingleOrMany as SingleOrMany__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { OrderedMap$Entries$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Set$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { $goInterfaceAdapter$Named_estransforms$lexicalEntryKind, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$memberInfo as GoMap } from "../../../../../../../support/maps.js";
import { classHasClassThisAssignment, expandPreOrPostfixIncrementOrDecrementExpression, findComputedPropertyNameCacheAssignment } from "./classfields.js";
import { isClassThisAssignmentBlock } from "./classthis.js";
import { classHasDeclaredOrExplicitlyAssignedName, injectClassNamedEvaluationHelperBlockIfMissing, isClassNamedEvaluationHelperBlock, isNamedEvaluationAnd, transformNamedEvaluation } from "./namedevaluation.js";
import { createAccessorPropertyBackingField } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class lexicalEntryKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function lexicalEntryKindClass$constant(): lexicalEntryKind {
    return new lexicalEntryKind(0);
}
export function lexicalEntryKindClassElement$constant(): lexicalEntryKind {
    return new lexicalEntryKind(1);
}
export function lexicalEntryKindName$constant(): lexicalEntryKind {
    return new lexicalEntryKind(2);
}
export function lexicalEntryKindOther$constant(): lexicalEntryKind {
    return new lexicalEntryKind(3);
}
export class lexicalEntry {
    declare private readonly $goType: void;
    public constructor(public kind: lexicalEntryKind, public next: lexicalEntry | undefined, public classInfoData: classInfo | undefined, public savedPendingExpressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public classThisData: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classSuperData: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public depth: int) {
    }
    declare private readonly then?: never;
}
export class memberInfo {
    declare private readonly $goType: void;
    public constructor(public memberDecoratorsName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public memberInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public memberExtraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public memberDescriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export class classInfo {
    declare private readonly $goType: void;
    public constructor(public __go_class: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classDecoratorsName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classDescriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classExtraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classSuper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public metadataReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public memberInfos: OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo | undefined>, public instanceMethodExtraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public staticMethodExtraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public staticNonFieldDecorationStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public nonStaticNonFieldDecorationStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public staticFieldDecorationStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public nonStaticFieldDecorationStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public hasStaticInitializers: bool, public hasNonAmbientInstanceFields: bool, public hasStaticPrivateClassElements: bool, public pendingStaticInitializers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public pendingInstanceInitializers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
}
export class esDecoratorTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public top: lexicalEntry | undefined, public classInfoStack: classInfo | undefined, public classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classSuper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public pendingExpressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public outerThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public shouldTransformPrivateStaticElementsInFile: bool, public outerThisVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public discardedVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public modifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public exportStrippingModifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public classElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public nonConstructorClassElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public constructorClassElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public arrayAssignmentVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public objectAssignmentVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public staticOnlyModifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public asyncOnlyModifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public accessorStrippingModifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$appendDecorationStatement(tx: esDecoratorTransformer | undefined, ci: classInfo | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsMethodOrAccessor__from_ast(member) || IsAutoAccessorPropertyDeclaration__from_ast(member)) {
            if (IsStatic__from_ast(member)) {
                (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticNonFieldDecorationStatements = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticNonFieldDecorationStatements.append(void 0, [stmt]);
            }
            else {
                (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticNonFieldDecorationStatements = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticNonFieldDecorationStatements.append(void 0, [stmt]);
            }
        }
        else if (IsPropertyDeclaration__from_ast(member) && !IsAutoAccessorPropertyDeclaration__from_ast(member)) {
            if (IsStatic__from_ast(member)) {
                (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticFieldDecorationStatements = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticFieldDecorationStatements.append(void 0, [stmt]);
            }
            else {
                (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticFieldDecorationStatements = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticFieldDecorationStatements.append(void 0, [stmt]);
            }
        }
        else {
            Fail__from_debug("Unexpected class element kind.");
        }
    }
    static $go$private$estransforms$classElementVisitorVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindConstructor$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitConstructorDeclaration(tx, node);
                break;
            }
            case KindMethodDeclaration$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitMethodDeclaration(tx, node);
                break;
            }
            case KindGetAccessor$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitGetAccessorDeclaration(tx, node);
                break;
            }
            case KindSetAccessor$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitSetAccessorDeclaration(tx, node);
                break;
            }
            case KindPropertyDeclaration$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPropertyDeclaration(tx, node);
                break;
            }
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitClassStaticBlockDeclaration(tx, node);
                break;
            }
            default: {
                return esDecoratorTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$constructorClassElementVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsConstructorDeclaration__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$classElementVisitorVisit(tx, node);
        }
        return node;
    }
    static $go$private$estransforms$createAccessorPropertyDescriptorObject(tx: esDecoratorTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_313 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_313, "Transformer"));
        let backingFieldName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(f, Node__from_ast.Name(member), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage"));
        const __gotots_store_314 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_112 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_314, "NodeFactory");
        const __gotots_store_315 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_111 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_315, "NodeFactory");
        const __gotots_receiver_103 = tx;
        const __gotots_argument_301 = member;
        const __gotots_argument_302 = Node__from_ast.Name(member);
        const __gotots_argument_303 = void 0;
        const __gotots_argument_304 = void 0;
        const __gotots_argument_305 = "get";
        const __gotots_store_316 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_306 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_316, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_store_317 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_102 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_317, "NodeFactory");
        const __gotots_store_318 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_101 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_318, "NodeFactory");
        const __gotots_store_319 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_100 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_319, "NodeFactory");
        const __gotots_store_320 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_297 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_320, "NodeFactory"), NodeFactory__from_printer.NewThisExpression(f), void 0, backingFieldName, NodeFlagsNone$constant__from_ast());
        const __gotots_slice_element_7 = NodeFactory__from_ast.NewReturnStatement(__gotots_receiver_100, __gotots_argument_297);
        const __gotots_argument_298 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_7]);
        const __gotots_argument_299 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_101, __gotots_argument_298);
        const __gotots_argument_300 = false;
        const __gotots_argument_307 = NodeFactory__from_ast.NewBlock(__gotots_receiver_102, __gotots_argument_299, __gotots_argument_300);
        const __gotots_slice_element_10 = esDecoratorTransformer.$go$private$estransforms$createDescriptorMethod(__gotots_receiver_103, __gotots_argument_301, __gotots_argument_302, __gotots_argument_303, __gotots_argument_304, __gotots_argument_305, __gotots_argument_306, __gotots_argument_307);
        const __gotots_receiver_110 = tx;
        const __gotots_argument_321 = member;
        const __gotots_argument_322 = Node__from_ast.Name(member);
        const __gotots_argument_323 = void 0;
        const __gotots_argument_324 = void 0;
        const __gotots_argument_325 = "set";
        const __gotots_store_321 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_105 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_321, "NodeFactory");
        const __gotots_store_322 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_104 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_322, "NodeFactory");
        const __gotots_argument_308 = void 0;
        const __gotots_argument_309 = void 0;
        const __gotots_store_323 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_310 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_323, "NodeFactory"), "value");
        const __gotots_argument_311 = void 0;
        const __gotots_argument_312 = void 0;
        const __gotots_argument_313 = void 0;
        const __gotots_slice_element_8 = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_104, __gotots_argument_308, __gotots_argument_309, __gotots_argument_310, __gotots_argument_311, __gotots_argument_312, __gotots_argument_313);
        const __gotots_argument_314 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_8]);
        const __gotots_argument_326 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_105, __gotots_argument_314);
        const __gotots_store_324 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_109 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_324, "NodeFactory");
        const __gotots_store_325 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_108 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_325, "NodeFactory");
        const __gotots_store_326 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_107 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_326, "NodeFactory");
        const __gotots_receiver_106 = f;
        const __gotots_store_327 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_315 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_327, "NodeFactory"), NodeFactory__from_printer.NewThisExpression(f), void 0, backingFieldName, NodeFlagsNone$constant__from_ast());
        const __gotots_store_328 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_316 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_328, "NodeFactory"), "value");
        const __gotots_argument_317 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_106, __gotots_argument_315, __gotots_argument_316);
        const __gotots_slice_element_9 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_107, __gotots_argument_317);
        const __gotots_argument_318 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_9]);
        const __gotots_argument_319 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_108, __gotots_argument_318);
        const __gotots_argument_320 = false;
        const __gotots_argument_327 = NodeFactory__from_ast.NewBlock(__gotots_receiver_109, __gotots_argument_319, __gotots_argument_320);
        const __gotots_slice_element_11 = esDecoratorTransformer.$go$private$estransforms$createDescriptorMethod(__gotots_receiver_110, __gotots_argument_321, __gotots_argument_322, __gotots_argument_323, __gotots_argument_324, __gotots_argument_325, __gotots_argument_326, __gotots_argument_327);
        const __gotots_argument_328 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_10, __gotots_slice_element_11]);
        const __gotots_argument_329 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_111, __gotots_argument_328);
        const __gotots_argument_330 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_112, __gotots_argument_329, __gotots_argument_330);
    }
    static $go$private$estransforms$createCallBinding(tx: esDecoratorTransformer | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        const __gotots_store_439 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_439, "Transformer"));
        let callee: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(expression, OEKAll$constant__from_ast());
        if (IsSuperProperty__from_ast(callee)) {
            return [callee, NodeFactory__from_printer.NewThisExpression(f)];
        }
        if (Node__from_ast.$storageOf(((callee ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
            return [callee, NodeFactory__from_printer.NewThisExpression(f)];
        }
        const __gotots_store_440 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_6 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_440, "Transformer")), callee);
        const __gotots_binary_operand_7 = EFHelperName$constant__from_printer();
        if (!((__gotots_binary_operand_6 & __gotots_binary_operand_7) >>> 0 === 0)) {
            return [callee, NodeFactory__from_printer.NewVoidZeroExpression(f)];
        }
        if (IsPropertyAccessExpression__from_ast(callee)) {
            let pa: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(callee);
            if (esDecoratorTransformer.$go$private$estransforms$shouldBeCapturedInTempVariable(tx, PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression)) {
                let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
                const __gotots_store_441 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_441, "Transformer")), thisArg);
                let assign: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, thisArg, PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
                Node__from_ast.$storageOf(((assign ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_442 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_442, "NodeFactory"), assign, void 0, PropertyAccessExpression__from_ast.Name(pa), NodeFlagsNone$constant__from_ast());
                Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((callee ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                return [target, thisArg];
            }
            return [callee, PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression];
        }
        if (IsElementAccessExpression__from_ast(callee)) {
            let ea: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(callee);
            if (esDecoratorTransformer.$go$private$estransforms$shouldBeCapturedInTempVariable(tx, ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression)) {
                let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
                const __gotots_store_443 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_443, "Transformer")), thisArg);
                let assign: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, thisArg, ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression);
                Node__from_ast.$storageOf(((assign ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_444 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_444, "NodeFactory"), assign, void 0, ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression, NodeFlagsNone$constant__from_ast());
                Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((callee ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                return [target, thisArg];
            }
            return [callee, ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression];
        }
        return [expression, NodeFactory__from_printer.NewVoidZeroExpression(f)];
    }
    static $go$private$estransforms$createClassInfo(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): classInfo | undefined {
        const __gotots_store_344 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_344, "Transformer"));
        let ci: classInfo | undefined = new classInfo(node, void 0, void 0, void 0, void 0, void 0, NodeFactory__from_printer.NewUniqueNameEx(f, "_metadata", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", "")), OrderedMap__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo | undefined> => {
            return GoMap.nil();
        }), void 0, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), false, false, false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
        if (NodeIsDecorated__from_ast(false, node, void 0, void 0)) {
            let needsUniqueClassThis = Some$PointerTo_Named_ast$Node(Node__from_ast.Members(node), (member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return (IsPrivateIdentifierClassElementDeclaration__from_ast(member) || IsAutoAccessorPropertyDeclaration__from_ast(member)) && HasStaticModifier__from_ast(member);
            });
            let flags = new GeneratedIdentifierFlags__from_printer(48);
            if (needsUniqueClassThis) {
                flags = new GeneratedIdentifierFlags__from_printer(24);
            }
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = NodeFactory__from_printer.NewUniqueNameEx(f, "_classThis", new AutoGenerateOptions__from_printer(flags, "", ""));
        }
        const __gotots_range_7 = Node__from_ast.Members(node);
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_7);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            if (IsMethodOrAccessor__from_ast(member) && NodeOrChildIsDecorated__from_ast(false, member, node, void 0)) {
                if (HasStaticModifier__from_ast(member)) {
                    if ((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName === undefined) {
                        (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName = NodeFactory__from_printer.NewUniqueNameEx(f, "_staticExtraInitializers", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
                        let renamedClassThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
                            renamedClassThis = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
                        }
                        else {
                            renamedClassThis = NodeFactory__from_printer.NewThisExpression(f);
                        }
                        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewRunInitializersHelper(f, renamedClassThis, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName, void 0);
                        let nameRange: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
                        if (!(nameRange === undefined)) {
                            const __gotots_store_345 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_345, "Transformer")), initializer, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((nameRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        }
                        else {
                            const __gotots_store_346 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_346, "Transformer")), initializer, MoveRangePastDecorators__from_transformers(node));
                        }
                        (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers.append(void 0, [initializer]);
                    }
                }
                else {
                    if ((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName === undefined) {
                        (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName = NodeFactory__from_printer.NewUniqueNameEx(f, "_instanceExtraInitializers", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
                        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewRunInitializersHelper(f, NodeFactory__from_printer.NewThisExpression(f), (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName, void 0);
                        let nameRange: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
                        if (!(nameRange === undefined)) {
                            const __gotots_store_347 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_347, "Transformer")), initializer, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((nameRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        }
                        else {
                            const __gotots_store_348 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_348, "Transformer")), initializer, MoveRangePastDecorators__from_transformers(node));
                        }
                        (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers.append(void 0, [initializer]);
                    }
                }
            }
            if (IsClassStaticBlockDeclaration__from_ast(member)) {
                const __gotots_store_349 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_345 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_349, "Transformer"));
                const __gotots_argument_346 = member;
                if (!isClassNamedEvaluationHelperBlock(__gotots_argument_345, __gotots_argument_346)) {
                    (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers = true;
                }
            }
            else if (IsPropertyDeclaration__from_ast(member)) {
                if (HasStaticModifier__from_ast(member)) {
                    (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers || !(Node__from_ast.Initializer(member) === undefined) || HasDecorators__from_ast(member);
                }
                else {
                    (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNonAmbientInstanceFields = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNonAmbientInstanceFields || !HasSyntacticModifier__from_ast(member, ModifierFlagsAmbient$constant__from_ast());
                }
            }
            if ((IsPrivateIdentifierClassElementDeclaration__from_ast(member) || IsAutoAccessorPropertyDeclaration__from_ast(member)) && HasStaticModifier__from_ast(member)) {
                (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticPrivateClassElements = true;
            }
            if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName === undefined) && !((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName === undefined) && (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers && (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNonAmbientInstanceFields && (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticPrivateClassElements) {
                break;
            }
        }
        return ci;
    }
    static $go$private$estransforms$createDescriptorMethod(tx: esDecoratorTransformer | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: gostring, parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_406 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_406, "Transformer"));
        const __gotots_store_407 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_407, "Transformer"));
        if (body === undefined) {
            const __gotots_store_408 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_139 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_408, "NodeFactory");
            const __gotots_store_409 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_426 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_409, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_427 = false;
            body = NodeFactory__from_ast.NewBlock(__gotots_receiver_139, __gotots_argument_426, __gotots_argument_427);
        }
        const __gotots_store_410 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let funcExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_410, "NodeFactory"), modifiers, asteriskToken, void 0, void 0, parameters, void 0, void 0, body);
        EmitContext__from_printer.SetOriginal(ec, funcExpr, original);
        EmitContext__from_printer.SetSourceMapRange(ec, funcExpr, MoveRangePastDecorators__from_transformers(original));
        EmitContext__from_printer.SetEmitFlags(ec, funcExpr, EFNoComments$constant__from_printer());
        let prefix = "";
        if (kind === "get" || kind === "set") {
            prefix = kind;
        }
        let functionName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewStringLiteralFromNode(f, name);
        let namedFunction: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewSetFunctionNameHelper(f, funcExpr, functionName, prefix);
        const __gotots_store_411 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_140 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_411, "NodeFactory");
        const __gotots_argument_428 = void 0;
        const __gotots_store_412 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_429 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_412, "NodeFactory"), kind);
        const __gotots_argument_430 = void 0;
        const __gotots_argument_431 = void 0;
        const __gotots_argument_432 = namedFunction;
        let method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_140, __gotots_argument_428, __gotots_argument_429, __gotots_argument_430, __gotots_argument_431, __gotots_argument_432);
        EmitContext__from_printer.SetOriginal(ec, method, original);
        EmitContext__from_printer.SetSourceMapRange(ec, method, MoveRangePastDecorators__from_transformers(original));
        EmitContext__from_printer.SetEmitFlags(ec, method, EFNoComments$constant__from_printer());
        return method;
    }
    static $go$private$estransforms$createGetAccessorDescriptorForwarder(tx: esDecoratorTransformer | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_289 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_289, "Transformer"));
        let staticOnly: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticOnlyModifierVisitor, modifiers);
        const __gotots_store_290 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_90 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_290, "NodeFactory");
        const __gotots_argument_263 = staticOnly;
        const __gotots_argument_264 = name;
        const __gotots_argument_265 = void 0;
        const __gotots_store_291 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_266 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_291, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_267 = void 0;
        const __gotots_argument_268 = void 0;
        const __gotots_store_292 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_89 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_292, "NodeFactory");
        const __gotots_store_293 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_88 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_293, "NodeFactory");
        const __gotots_store_294 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_87 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_294, "NodeFactory");
        const __gotots_receiver_86 = f;
        const __gotots_store_295 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_85 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_295, "NodeFactory");
        const __gotots_argument_252 = descriptorName;
        const __gotots_argument_253 = void 0;
        const __gotots_store_296 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_254 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_296, "NodeFactory"), "get");
        const __gotots_argument_255 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_256 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_85, __gotots_argument_252, __gotots_argument_253, __gotots_argument_254, __gotots_argument_255);
        const __gotots_argument_257 = NodeFactory__from_printer.NewThisExpression(f);
        const __gotots_argument_258 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_argument_259 = NodeFactory__from_printer.NewFunctionCallCall(__gotots_receiver_86, __gotots_argument_256, __gotots_argument_257, __gotots_argument_258);
        const __gotots_slice_element_3 = NodeFactory__from_ast.NewReturnStatement(__gotots_receiver_87, __gotots_argument_259);
        const __gotots_argument_260 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3]);
        const __gotots_argument_261 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_88, __gotots_argument_260);
        const __gotots_argument_262 = false;
        const __gotots_argument_269 = NodeFactory__from_ast.NewBlock(__gotots_receiver_89, __gotots_argument_261, __gotots_argument_262);
        return NodeFactory__from_ast.NewGetAccessorDeclaration(__gotots_receiver_90, __gotots_argument_263, __gotots_argument_264, __gotots_argument_265, __gotots_argument_266, __gotots_argument_267, __gotots_argument_268, __gotots_argument_269);
    }
    static $go$private$estransforms$createGetAccessorDescriptorObject(tx: esDecoratorTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_284 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_284, "Transformer"));
        const __gotots_store_285 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_285, "Transformer")), Node__from_ast.Body(member));
        const __gotots_store_286 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_84 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_286, "NodeFactory");
        const __gotots_store_287 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_83 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_287, "NodeFactory");
        const __gotots_receiver_82 = tx;
        const __gotots_argument_242 = member;
        const __gotots_argument_243 = Node__from_ast.Name(member);
        const __gotots_argument_244 = modifiers;
        const __gotots_argument_245 = void 0;
        const __gotots_argument_246 = "get";
        const __gotots_store_288 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_247 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_288, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_248 = body;
        const __gotots_slice_element_2 = esDecoratorTransformer.$go$private$estransforms$createDescriptorMethod(__gotots_receiver_82, __gotots_argument_242, __gotots_argument_243, __gotots_argument_244, __gotots_argument_245, __gotots_argument_246, __gotots_argument_247, __gotots_argument_248);
        const __gotots_argument_249 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
        const __gotots_argument_250 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_83, __gotots_argument_249);
        const __gotots_argument_251 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_84, __gotots_argument_250, __gotots_argument_251);
    }
    static $go$private$estransforms$createHelperVariable(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, suffix: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_414 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_141 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_414, "Transformer"));
        const __gotots_store_415 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_433 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_415, "Transformer"));
        const __gotots_argument_434 = node;
        const __gotots_binary_operand_2 = getHelperVariableName(__gotots_argument_433, __gotots_argument_434);
        const __gotots_binary_operand_3 = "_";
        const __gotots_binary_operand_4 = __gotots_binary_operand_2 + __gotots_binary_operand_3;
        const __gotots_binary_operand_5 = suffix;
        const __gotots_argument_435 = __gotots_binary_operand_4 + __gotots_binary_operand_5;
        const __gotots_argument_436 = new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(24), "", "");
        return NodeFactory__from_printer.NewUniqueNameEx(__gotots_receiver_141, __gotots_argument_435, __gotots_argument_436);
    }
    static $go$private$estransforms$createLet(tx: esDecoratorTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_350 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_351 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_350, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_118 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_351, "NodeFactory");
        const __gotots_argument_350 = void 0;
        const __gotots_store_352 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_353 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_352, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_117 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_353, "NodeFactory");
        const __gotots_store_354 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_355 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_354, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_116 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_355, "NodeFactory");
        const __gotots_store_356 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_357 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_356, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_12 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_357, "NodeFactory"), name, void 0, void 0, initializer);
        const __gotots_argument_347 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_12]);
        const __gotots_argument_348 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_116, __gotots_argument_347);
        const __gotots_argument_349 = NodeFlagsLet$constant__from_ast();
        const __gotots_argument_351 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_117, __gotots_argument_348, __gotots_argument_349);
        return NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_118, __gotots_argument_350, __gotots_argument_351);
    }
    static $go$private$estransforms$createMetadata(tx: esDecoratorTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, classSuper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_358 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_358, "Transformer"));
        let superMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(classSuper === undefined)) {
            superMetadata = esDecoratorTransformer.$go$private$estransforms$createSymbolMetadataReference(tx, classSuper);
        }
        else {
            const __gotots_store_359 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            superMetadata = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_359, "NodeFactory"), KindNullKeyword$constant__from_ast());
        }
        const __gotots_store_360 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_120 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_360, "NodeFactory");
        const __gotots_store_361 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_119 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_361, "NodeFactory");
        const __gotots_store_362 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_352 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_362, "NodeFactory"), "Object");
        const __gotots_argument_353 = void 0;
        const __gotots_store_363 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_354 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_363, "NodeFactory"), "create");
        const __gotots_argument_355 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_356 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_119, __gotots_argument_352, __gotots_argument_353, __gotots_argument_354, __gotots_argument_355);
        const __gotots_argument_357 = void 0;
        const __gotots_argument_358 = void 0;
        const __gotots_store_364 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_359 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_364, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([superMetadata]));
        const __gotots_argument_360 = NodeFlagsNone$constant__from_ast();
        let objectCreate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_120, __gotots_argument_356, __gotots_argument_357, __gotots_argument_358, __gotots_argument_359, __gotots_argument_360);
        const __gotots_receiver_123 = f;
        const __gotots_receiver_121 = f;
        const __gotots_store_365 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_361 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_365, "NodeFactory"), "Symbol");
        const __gotots_argument_362 = "function";
        const __gotots_argument_367 = NodeFactory__from_printer.NewTypeCheck(__gotots_receiver_121, __gotots_argument_361, __gotots_argument_362);
        const __gotots_store_366 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_122 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_366, "NodeFactory");
        const __gotots_store_367 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_363 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_367, "NodeFactory"), "Symbol");
        const __gotots_argument_364 = void 0;
        const __gotots_store_368 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_365 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_368, "NodeFactory"), "metadata");
        const __gotots_argument_366 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_368 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_122, __gotots_argument_363, __gotots_argument_364, __gotots_argument_365, __gotots_argument_366);
        let symbolCheck: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewLogicalANDExpression(__gotots_receiver_123, __gotots_argument_367, __gotots_argument_368);
        const __gotots_store_369 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_124 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_369, "NodeFactory");
        const __gotots_argument_369 = symbolCheck;
        const __gotots_store_370 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_370 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_370, "NodeFactory"), KindQuestionToken$constant__from_ast());
        const __gotots_argument_371 = objectCreate;
        const __gotots_store_371 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_372 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_371, "NodeFactory"), KindColonToken$constant__from_ast());
        const __gotots_argument_373 = NodeFactory__from_printer.NewVoidZeroExpression(f);
        let conditional: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_124, __gotots_argument_369, __gotots_argument_370, __gotots_argument_371, __gotots_argument_372, __gotots_argument_373);
        const __gotots_store_372 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_372, "NodeFactory"), name, void 0, void 0, conditional);
        const __gotots_store_373 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_125 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_373, "NodeFactory");
        const __gotots_store_374 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_374 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_374, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
        const __gotots_argument_375 = NodeFlagsConst$constant__from_ast();
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_125, __gotots_argument_374, __gotots_argument_375);
        const __gotots_store_375 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_375, "NodeFactory"), void 0, varDeclList);
    }
    static $go$private$estransforms$createMethodDescriptorForwarder(tx: esDecoratorTransformer | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_274 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_274, "Transformer"));
        let staticOnly: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticOnlyModifierVisitor, modifiers);
        const __gotots_store_275 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_81 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_275, "NodeFactory");
        const __gotots_argument_235 = staticOnly;
        const __gotots_argument_236 = name;
        const __gotots_argument_237 = void 0;
        const __gotots_store_276 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_238 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_276, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_239 = void 0;
        const __gotots_argument_240 = void 0;
        const __gotots_store_277 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_80 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_277, "NodeFactory");
        const __gotots_store_278 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_79 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_278, "NodeFactory");
        const __gotots_store_279 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_78 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_279, "NodeFactory");
        const __gotots_store_280 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_77 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_280, "NodeFactory");
        const __gotots_argument_227 = descriptorName;
        const __gotots_argument_228 = void 0;
        const __gotots_store_281 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_229 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_281, "NodeFactory"), "value");
        const __gotots_argument_230 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_231 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_77, __gotots_argument_227, __gotots_argument_228, __gotots_argument_229, __gotots_argument_230);
        const __gotots_slice_element_1 = NodeFactory__from_ast.NewReturnStatement(__gotots_receiver_78, __gotots_argument_231);
        const __gotots_argument_232 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
        const __gotots_argument_233 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_79, __gotots_argument_232);
        const __gotots_argument_234 = false;
        const __gotots_argument_241 = NodeFactory__from_ast.NewBlock(__gotots_receiver_80, __gotots_argument_233, __gotots_argument_234);
        return NodeFactory__from_ast.NewGetAccessorDeclaration(__gotots_receiver_81, __gotots_argument_235, __gotots_argument_236, __gotots_argument_237, __gotots_argument_238, __gotots_argument_239, __gotots_argument_240, __gotots_argument_241);
    }
    static $go$private$estransforms$createMethodDescriptorObject(tx: esDecoratorTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_256 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_256, "Transformer"));
        const __gotots_store_257 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_257, "Transformer")), Node__from_ast.ParameterList(member));
        const __gotots_store_258 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_258, "Transformer")), Node__from_ast.Body(member));
        let method: {
            value: MethodDeclaration__from_ast;
        } | undefined = Node__from_ast.AsMethodDeclaration(member);
        const __gotots_store_259 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_259, "NodeFactory");
        const __gotots_store_260 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_213 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_260, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([esDecoratorTransformer.$go$private$estransforms$createDescriptorMethod(tx, member, Node__from_ast.Name(member), modifiers, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((method ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, "value", parameters, body)]));
        const __gotots_argument_214 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_74, __gotots_argument_213, __gotots_argument_214);
    }
    static $go$private$estransforms$createSetAccessorDescriptorForwarder(tx: esDecoratorTransformer | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, descriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_302 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_302, "Transformer"));
        let staticOnly: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticOnlyModifierVisitor, modifiers);
        const __gotots_store_303 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_99 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_303, "NodeFactory");
        const __gotots_argument_290 = staticOnly;
        const __gotots_argument_291 = name;
        const __gotots_argument_292 = void 0;
        const __gotots_store_304 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_93 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_304, "NodeFactory");
        const __gotots_store_305 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_92 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_305, "NodeFactory");
        const __gotots_argument_272 = void 0;
        const __gotots_argument_273 = void 0;
        const __gotots_store_306 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_274 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_306, "NodeFactory"), "value");
        const __gotots_argument_275 = void 0;
        const __gotots_argument_276 = void 0;
        const __gotots_argument_277 = void 0;
        const __gotots_slice_element_4 = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_92, __gotots_argument_272, __gotots_argument_273, __gotots_argument_274, __gotots_argument_275, __gotots_argument_276, __gotots_argument_277);
        const __gotots_argument_278 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_4]);
        const __gotots_argument_293 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_93, __gotots_argument_278);
        const __gotots_argument_294 = void 0;
        const __gotots_argument_295 = void 0;
        const __gotots_store_307 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_98 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_307, "NodeFactory");
        const __gotots_store_308 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_97 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_308, "NodeFactory");
        const __gotots_store_309 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_96 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_309, "NodeFactory");
        const __gotots_receiver_95 = f;
        const __gotots_store_310 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_94 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_310, "NodeFactory");
        const __gotots_argument_279 = descriptorName;
        const __gotots_argument_280 = void 0;
        const __gotots_store_311 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_281 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_311, "NodeFactory"), "set");
        const __gotots_argument_282 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_283 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_94, __gotots_argument_279, __gotots_argument_280, __gotots_argument_281, __gotots_argument_282);
        const __gotots_argument_284 = NodeFactory__from_printer.NewThisExpression(f);
        const __gotots_store_312 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_5 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_312, "NodeFactory"), "value");
        const __gotots_argument_285 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_5]);
        const __gotots_argument_286 = NodeFactory__from_printer.NewFunctionCallCall(__gotots_receiver_95, __gotots_argument_283, __gotots_argument_284, __gotots_argument_285);
        const __gotots_slice_element_6 = NodeFactory__from_ast.NewReturnStatement(__gotots_receiver_96, __gotots_argument_286);
        const __gotots_argument_287 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6]);
        const __gotots_argument_288 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_97, __gotots_argument_287);
        const __gotots_argument_289 = false;
        const __gotots_argument_296 = NodeFactory__from_ast.NewBlock(__gotots_receiver_98, __gotots_argument_288, __gotots_argument_289);
        return NodeFactory__from_ast.NewSetAccessorDeclaration(__gotots_receiver_99, __gotots_argument_290, __gotots_argument_291, __gotots_argument_292, __gotots_argument_293, __gotots_argument_294, __gotots_argument_295, __gotots_argument_296);
    }
    static $go$private$estransforms$createSetAccessorDescriptorObject(tx: esDecoratorTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_297 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_297, "Transformer"));
        const __gotots_store_298 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_298, "Transformer")), Node__from_ast.ParameterList(member));
        const __gotots_store_299 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_299, "Transformer")), Node__from_ast.Body(member));
        const __gotots_store_300 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_91 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_300, "NodeFactory");
        const __gotots_store_301 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_270 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_301, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([esDecoratorTransformer.$go$private$estransforms$createDescriptorMethod(tx, member, Node__from_ast.Name(member), modifiers, void 0, "set", parameters, body)]));
        const __gotots_argument_271 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_91, __gotots_argument_270, __gotots_argument_271);
    }
    static $go$private$estransforms$createSymbolMetadata(tx: esDecoratorTransformer | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_382 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_382, "Transformer"));
        const __gotots_store_383 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_130 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_383, "NodeFactory");
        const __gotots_store_384 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_388 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_384, "NodeFactory"), "Symbol");
        const __gotots_argument_389 = void 0;
        const __gotots_store_385 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_390 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_385, "NodeFactory"), "metadata");
        const __gotots_argument_391 = NodeFlagsNone$constant__from_ast();
        let symbolMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_130, __gotots_argument_388, __gotots_argument_389, __gotots_argument_390, __gotots_argument_391);
        const __gotots_store_386 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_131 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_386, "NodeFactory");
        const __gotots_argument_392 = void 0;
        const __gotots_store_387 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_393 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_387, "NodeFactory"), "enumerable");
        const __gotots_argument_394 = void 0;
        const __gotots_argument_395 = void 0;
        const __gotots_argument_396 = NodeFactory__from_printer.NewTrueExpression(f);
        const __gotots_slice_element_13 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_131, __gotots_argument_392, __gotots_argument_393, __gotots_argument_394, __gotots_argument_395, __gotots_argument_396);
        const __gotots_store_388 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_132 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_388, "NodeFactory");
        const __gotots_argument_397 = void 0;
        const __gotots_store_389 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_398 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_389, "NodeFactory"), "configurable");
        const __gotots_argument_399 = void 0;
        const __gotots_argument_400 = void 0;
        const __gotots_argument_401 = NodeFactory__from_printer.NewTrueExpression(f);
        const __gotots_slice_element_14 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_132, __gotots_argument_397, __gotots_argument_398, __gotots_argument_399, __gotots_argument_400, __gotots_argument_401);
        const __gotots_store_390 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_133 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_390, "NodeFactory");
        const __gotots_argument_402 = void 0;
        const __gotots_store_391 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_403 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_391, "NodeFactory"), "writable");
        const __gotots_argument_404 = void 0;
        const __gotots_argument_405 = void 0;
        const __gotots_argument_406 = NodeFactory__from_printer.NewTrueExpression(f);
        const __gotots_slice_element_15 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_133, __gotots_argument_402, __gotots_argument_403, __gotots_argument_404, __gotots_argument_405, __gotots_argument_406);
        const __gotots_store_392 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_134 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_392, "NodeFactory");
        const __gotots_argument_407 = void 0;
        const __gotots_store_393 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_408 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_393, "NodeFactory"), "value");
        const __gotots_argument_409 = void 0;
        const __gotots_argument_410 = void 0;
        const __gotots_argument_411 = value;
        const __gotots_slice_element_16 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_134, __gotots_argument_407, __gotots_argument_408, __gotots_argument_409, __gotots_argument_410, __gotots_argument_411);
        let descriptorProps = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_13, __gotots_slice_element_14, __gotots_slice_element_15, __gotots_slice_element_16]);
        const __gotots_store_394 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_135 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_394, "NodeFactory");
        const __gotots_store_395 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_412 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_395, "NodeFactory"), descriptorProps);
        const __gotots_argument_413 = false;
        let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_135, __gotots_argument_412, __gotots_argument_413);
        const __gotots_store_396 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_137 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_396, "NodeFactory");
        const __gotots_store_397 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_136 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_397, "NodeFactory");
        const __gotots_store_398 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_414 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_398, "NodeFactory"), "Object");
        const __gotots_argument_415 = void 0;
        const __gotots_store_399 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_416 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_399, "NodeFactory"), "defineProperty");
        const __gotots_argument_417 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_418 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_136, __gotots_argument_414, __gotots_argument_415, __gotots_argument_416, __gotots_argument_417);
        const __gotots_argument_419 = void 0;
        const __gotots_argument_420 = void 0;
        const __gotots_store_400 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_421 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_400, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([target, symbolMetadata, descriptor]));
        const __gotots_argument_422 = NodeFlagsNone$constant__from_ast();
        let defineProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_137, __gotots_argument_418, __gotots_argument_419, __gotots_argument_420, __gotots_argument_421, __gotots_argument_422);
        const __gotots_store_401 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_138 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_401, "NodeFactory");
        const __gotots_argument_423 = value;
        const __gotots_store_402 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_424 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_402, "NodeFactory"), defineProperty);
        const __gotots_argument_425 = void 0;
        let ifStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIfStatement(__gotots_receiver_138, __gotots_argument_423, __gotots_argument_424, __gotots_argument_425);
        const __gotots_store_403 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_403, "Transformer")), ifStatement, EFSingleLine$constant__from_printer());
        return ifStatement;
    }
    static $go$private$estransforms$createSymbolMetadataReference(tx: esDecoratorTransformer | undefined, classSuper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_431 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_431, "Transformer"));
        const __gotots_store_432 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_143 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_432, "NodeFactory");
        const __gotots_store_433 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_438 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_433, "NodeFactory"), "Symbol");
        const __gotots_argument_439 = void 0;
        const __gotots_store_434 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_440 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_434, "NodeFactory"), "metadata");
        const __gotots_argument_441 = NodeFlagsNone$constant__from_ast();
        let symbolMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_143, __gotots_argument_438, __gotots_argument_439, __gotots_argument_440, __gotots_argument_441);
        const __gotots_store_435 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let elementAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_435, "NodeFactory"), classSuper, void 0, symbolMetadata, NodeFlagsNone$constant__from_ast());
        const __gotots_store_436 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_144 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_436, "NodeFactory");
        const __gotots_argument_442 = void 0;
        const __gotots_argument_443 = elementAccess;
        const __gotots_argument_444 = void 0;
        const __gotots_store_437 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_445 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_437, "NodeFactory"), KindQuestionQuestionToken$constant__from_ast());
        const __gotots_store_438 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_446 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_438, "NodeFactory"), KindNullKeyword$constant__from_ast());
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_144, __gotots_argument_442, __gotots_argument_443, __gotots_argument_444, __gotots_argument_445, __gotots_argument_446);
    }
    static $go$private$estransforms$discardedValueVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPrefixUnaryExpression$constant__from_ast():
            case KindPostfixUnaryExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPreOrPostfixUnaryExpression(tx, node, true);
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitBinaryExpression(tx, node, true);
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitParenthesizedExpression(tx, node, true);
                break;
            }
            case KindPartiallyEmittedExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPartiallyEmittedExpression(tx, node, true);
                break;
            }
            default: {
                return esDecoratorTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$emitMemberInfoDeclarations(tx: esDecoratorTransformer | undefined, ci: classInfo | undefined, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_376 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_376, "Transformer"));
        let stmts = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_377 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_range_9 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_377, "memberInfos")));
        if (__gotots_range_9 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_9(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: memberInfo | undefined): bool => {
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
            const __gotots_range_value_10 = $argument0;
            const __gotots_range_value_11 = $argument1;
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
            let mi: memberInfo | undefined = __gotots_range_value_11;
            if (IsStatic__from_ast(member) !== isStatic) {
                __gotots_range_state_0 = 1;
                return true;
            }
            stmts = stmts.append(void 0, [esDecoratorTransformer.$go$private$estransforms$createLet(tx, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDecoratorsName, void 0)]);
            if (!((mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberInitializersName === undefined)) {
                const __gotots_argument_380 = stmts;
                const __gotots_receiver_127 = tx;
                const __gotots_argument_378 = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberInitializersName;
                const __gotots_store_378 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_126 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_378, "NodeFactory");
                const __gotots_store_379 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_376 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_379, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_377 = false;
                const __gotots_argument_379 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_126, __gotots_argument_376, __gotots_argument_377);
                const __gotots_argument_381 = esDecoratorTransformer.$go$private$estransforms$createLet(__gotots_receiver_127, __gotots_argument_378, __gotots_argument_379);
                stmts = __gotots_argument_380.append(void 0, [__gotots_argument_381]);
            }
            if (!((mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberExtraInitializersName === undefined)) {
                const __gotots_argument_386 = stmts;
                const __gotots_receiver_129 = tx;
                const __gotots_argument_384 = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberExtraInitializersName;
                const __gotots_store_380 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_128 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_380, "NodeFactory");
                const __gotots_store_381 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_382 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_381, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_383 = false;
                const __gotots_argument_385 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_128, __gotots_argument_382, __gotots_argument_383);
                const __gotots_argument_387 = esDecoratorTransformer.$go$private$estransforms$createLet(__gotots_receiver_129, __gotots_argument_384, __gotots_argument_385);
                stmts = __gotots_argument_386.append(void 0, [__gotots_argument_387]);
            }
            if (!((mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName === undefined)) {
                stmts = stmts.append(void 0, [esDecoratorTransformer.$go$private$estransforms$createLet(tx, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName, void 0)]);
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        return stmts;
    }
    static $go$private$estransforms$enterClass(tx: esDecoratorTransformer | undefined, ci: classInfo | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = new lexicalEntry(lexicalEntryKindClass$constant(), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top, ci, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, void 0, void 0, 0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$enterClassElement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClass$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'class' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = new lexicalEntry(lexicalEntryKindClassElement$constant(), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0, void 0, 0);
        if (IsClassStaticBlockDeclaration__from_ast(node) || IsPropertyDeclaration__from_ast(node) && HasStaticModifier__from_ast(node)) {
            if (!((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData === undefined)) {
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThisData = ((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuperData = ((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper;
            }
        }
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$enterName(tx: esDecoratorTransformer | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClassElement$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'class-element' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = new lexicalEntry(lexicalEntryKindName$constant(), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0, void 0, 0);
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$enterOther(tx: esDecoratorTransformer | undefined): void {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindOther$constant().$value) {
            Assert__from_debug((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length === 0, RuntimeSlice.nil<GoInterface | undefined>());
            const __gotots_store_104 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_104.depth = __gotots_store_104.depth + 1;
        }
        else {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = new lexicalEntry(lexicalEntryKindOther$constant(), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top, void 0, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, void 0, void 0, 0);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            esDecoratorTransformer.$go$private$estransforms$updateState(tx);
        }
    }
    static $go$private$estransforms$exitClass(tx: esDecoratorTransformer | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClass$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'class' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPendingExpressions;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next;
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$exitClassElement(tx: esDecoratorTransformer | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClassElement$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'class-element' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        Assert__from_debug(!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next === undefined) && (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClass$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.next.kind. Expected top.next.kind to be 'class' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next;
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$exitName(tx: esDecoratorTransformer | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindName$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'name' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next;
        esDecoratorTransformer.$go$private$estransforms$updateState(tx);
    }
    static $go$private$estransforms$exitOther(tx: esDecoratorTransformer | undefined): void {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindOther$constant().$value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Incorrect value for top.kind. Expected top.kind to be 'other' but got '"), new $goInterfaceAdapter$Named_estransforms$lexicalEntryKind(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind), new GoInterfaceAdapter("' instead.")]));
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).depth > 0) {
            Assert__from_debug((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length === 0, RuntimeSlice.nil<GoInterface | undefined>());
            const __gotots_store_105 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_105.depth = __gotots_store_105.depth - 1;
        }
        else {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPendingExpressions;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next;
            esDecoratorTransformer.$go$private$estransforms$updateState(tx);
        }
    }
    static $go$private$estransforms$exportStrippingModifierVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportKeyword$constant__from_ast()) {
            return void 0;
        }
        return esDecoratorTransformer.$go$private$estransforms$modifierVisitorVisit(tx, node);
    }
    static $go$private$estransforms$finishClassElement(tx: esDecoratorTransformer | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!tsonicTypeScriptRuntime.sameLocation(updated, original)) {
            const __gotots_store_282 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AssignCommentRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_282, "Transformer")), updated, original);
            const __gotots_store_283 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_283, "Transformer")), updated, MoveRangePastDecorators__from_transformers(original));
        }
        return updated;
    }
    static $go$private$estransforms$injectPendingExpressions(tx: esDecoratorTransformer | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$prependExpressions(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, expression);
        Assert__from_debug(!(result === undefined), RuntimeSlice.nil<GoInterface | undefined>());
        if (!tsonicTypeScriptRuntime.sameLocation(result, expression)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        return result;
    }
    static $go$private$estransforms$injectPendingInitializers(tx: esDecoratorTransformer | undefined, ci: classInfo | undefined, isStatic: bool, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let pending: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined = void 0;
        if (isStatic) {
            const __gotots_store_329 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            pending =
                tsonicTypeScriptRuntime.propertyLocation(__gotots_store_329, "pendingStaticInitializers");
        }
        else {
            const __gotots_store_330 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            pending =
                tsonicTypeScriptRuntime.propertyLocation(__gotots_store_330, "pendingInstanceInitializers");
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$prependExpressions(tx, ((pending ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>).value, expression);
        if (!tsonicTypeScriptRuntime.sameLocation(result, expression)) {
            void ((pending ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
        }
        return result;
    }
    static $go$private$estransforms$modifierVisitorVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDecorator$constant__from_ast()) {
            return void 0;
        }
        return node;
    }
    static $go$private$estransforms$nonConstructorClassElementVisit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsConstructorDeclaration__from_ast(node)) {
            return node;
        }
        return esDecoratorTransformer.$go$private$estransforms$classElementVisitorVisit(tx, node);
    }
    static $go$private$estransforms$outerThisVisit(tx: esDecoratorTransformer | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(n) & SubtreeContainsLexicalThis$constant__from_ast()) >>> 0 === 0 && !(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast())) {
            return n;
        }
        if (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast()) {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis === undefined) {
                const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer")), "_outerThis", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
            }
            return (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis;
        }
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThisVisitor, n);
    }
    static $go$private$estransforms$partialTransformClassElement(tx: esDecoratorTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ci: classInfo | undefined, createDescriptor: createDescriptorFunc): partialResult {
        const __gotots_store_261 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_261, "Transformer"));
        const __gotots_store_262 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_262, "Transformer"));
        if (ci === undefined) {
            let modifiers__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor, Node__from_ast.Modifiers(member));
            esDecoratorTransformer.$go$private$estransforms$enterName(tx);
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitPropertyName(tx, Node__from_ast.Name(member));
            esDecoratorTransformer.$go$private$estransforms$exitName(tx);
            return new partialResult(modifiers__shadow_1, void 0, name, void 0, void 0, void 0, void 0);
        }
        let savedClassThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = void 0;
        let memberDecorators = esDecoratorTransformer.$go$private$estransforms$transformAllDecoratorsOfDeclaration(tx, Node__from_ast.Decorators(member));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = savedClassThis;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor, Node__from_ast.Modifiers(member));
        let result = partialResult.$zero();
        result.modifiers = modifiers;
        if (memberDecorators.length > 0) {
            let memberDecoratorsName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$createHelperVariable(tx, member, "decorators");
            const __gotots_store_263 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_75 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_263, "NodeFactory");
            const __gotots_store_264 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_215 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_264, "NodeFactory"), memberDecorators);
            const __gotots_argument_216 = false;
            let memberDecoratorsArray: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_75, __gotots_argument_215, __gotots_argument_216);
            let memberDecoratorsAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, memberDecoratorsName, memberDecoratorsArray);
            let mi: memberInfo | undefined = new memberInfo(memberDecoratorsName, void 0, void 0, void 0);
            const __gotots_store_265 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            OrderedMap$Set$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_265, "memberInfos"), member, mi);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.append(void 0, [memberDecoratorsAssignment]);
            let kind = "";
            __gotots_control_target_0: {
                if (IsGetAccessorDeclaration__from_ast(member)) {
                    kind = "getter";
                }
                else if (IsSetAccessorDeclaration__from_ast(member)) {
                    kind = "setter";
                }
                else if (IsMethodDeclaration__from_ast(member)) {
                    kind = "method";
                }
                else if (IsAutoAccessorPropertyDeclaration__from_ast(member)) {
                    kind = "accessor";
                }
                else if (IsPropertyDeclaration__from_ast(member)) {
                    kind = "field";
                }
                else {
                    Fail__from_debug("Unexpected class element kind.");
                }
            }
            let propertyNameComputed = false;
            let propertyNameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(Node__from_ast.Name(member) === undefined) && (IsIdentifier__from_ast(Node__from_ast.Name(member)) || IsPrivateIdentifier__from_ast(Node__from_ast.Name(member)))) {
                propertyNameComputed = false;
                propertyNameExpr = Node__from_ast.Name(member);
            }
            else if (!(Node__from_ast.Name(member) === undefined) && IsPropertyNameLiteral__from_ast(Node__from_ast.Name(member))) {
                propertyNameComputed = true;
                propertyNameExpr = NodeFactory__from_printer.NewStringLiteralFromNode(f, Node__from_ast.Name(member));
            }
            else if (!(Node__from_ast.Name(member) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(member))) {
                let cpn: {
                    value: ComputedPropertyName__from_ast;
                } | undefined = Node__from_ast.AsComputedPropertyName(Node__from_ast.Name(member));
                if (IsPropertyNameLiteral__from_ast((cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression) && !IsIdentifier__from_ast((cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
                    propertyNameComputed = true;
                    propertyNameExpr = NodeFactory__from_printer.NewStringLiteralFromNode(f, (cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                }
                else {
                    esDecoratorTransformer.$go$private$estransforms$enterName(tx);
                    const __gotots_store_266 = result;
                    const __gotots_store_267 = result;
                    const __gotots_results_2 = esDecoratorTransformer.$go$private$estransforms$visitReferencedPropertyName(tx, Node__from_ast.Name(member));
                    __gotots_store_266.referencedName = __gotots_results_2[0];
                    __gotots_store_267.name = __gotots_results_2[1];
                    esDecoratorTransformer.$go$private$estransforms$exitName(tx);
                    propertyNameComputed = true;
                    propertyNameExpr = result.referencedName;
                }
            }
            let contextObj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewESDecorateClassElementContextObject(f, kind, propertyNameComputed, propertyNameExpr, IsStatic__from_ast(member), !(Node__from_ast.Name(member) === undefined) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(member)), IsPropertyDeclaration__from_ast(member) || IsGetAccessorDeclaration__from_ast(member) || IsMethodDeclaration__from_ast(member), IsPropertyDeclaration__from_ast(member) || IsSetAccessorDeclaration__from_ast(member), (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).metadataReference);
            if (IsMethodOrAccessor__from_ast(member)) {
                let methodExtraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName;
                if (IsStatic__from_ast(member)) {
                    methodExtraInitializersName = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName;
                }
                Assert__from_debug(!(methodExtraInitializersName === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("methodExtraInitializersName should be defined")]));
                let descriptorArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsPrivateIdentifierClassElementDeclaration__from_ast(member) && !(createDescriptor.$value === undefined)) {
                    let asyncMods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncOnlyModifierVisitor, modifiers);
                    const __gotots_callee_0 = createDescriptor.$value;
                    const __gotots_argument_217 = member;
                    const __gotots_argument_218 = asyncMods;
                    let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_217, __gotots_argument_218);
                    (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName = esDecoratorTransformer.$go$private$estransforms$createHelperVariable(tx, member, "descriptor");
                    result.descriptorName = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName;
                    descriptorArg = NodeFactory__from_printer.NewAssignmentExpression(f, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName, descriptor);
                }
                else {
                    const __gotots_store_268 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    descriptorArg = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_268, "NodeFactory"), KindNullKeyword$constant__from_ast());
                }
                const __gotots_receiver_76 = f;
                const __gotots_argument_219 = NodeFactory__from_printer.NewThisExpression(f);
                const __gotots_argument_220 = descriptorArg;
                const __gotots_argument_221 = memberDecoratorsName;
                const __gotots_argument_222 = contextObj;
                const __gotots_store_269 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_223 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_269, "NodeFactory"), KindNullKeyword$constant__from_ast());
                const __gotots_argument_224 = methodExtraInitializersName;
                let esDecorateExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewESDecorateHelper(__gotots_receiver_76, __gotots_argument_219, __gotots_argument_220, __gotots_argument_221, __gotots_argument_222, __gotots_argument_223, __gotots_argument_224);
                const __gotots_store_270 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let esDecorateStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_270, "NodeFactory"), esDecorateExpr);
                EmitContext__from_printer.SetSourceMapRange(ec, esDecorateStatement, MoveRangePastDecorators__from_transformers(member));
                esDecoratorTransformer.$go$private$estransforms$appendDecorationStatement(tx, ci, member, esDecorateStatement);
            }
            else if (IsPropertyDeclaration__from_ast(member)) {
                (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberInitializersName = esDecoratorTransformer.$go$private$estransforms$createHelperVariable(tx, member, "initializers");
                (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberExtraInitializersName = esDecoratorTransformer.$go$private$estransforms$createHelperVariable(tx, member, "extraInitializers");
                result.initializersName = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberInitializersName;
                result.extraInitializersName = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberExtraInitializersName;
                if (IsStatic__from_ast(member)) {
                    result.thisArg = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
                }
                let ctorArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsAutoAccessorPropertyDeclaration__from_ast(member)) {
                    ctorArg = NodeFactory__from_printer.NewThisExpression(f);
                }
                else {
                    const __gotots_store_271 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    ctorArg = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_271, "NodeFactory"), KindNullKeyword$constant__from_ast());
                }
                let descriptorArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsPrivateIdentifierClassElementDeclaration__from_ast(member) && HasAccessorModifier__from_ast(member) && !(createDescriptor.$value === undefined)) {
                    const __gotots_callee_1 = createDescriptor.$value;
                    const __gotots_argument_225 = member;
                    const __gotots_argument_226 = void 0;
                    let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_225, __gotots_argument_226);
                    (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName = esDecoratorTransformer.$go$private$estransforms$createHelperVariable(tx, member, "descriptor");
                    result.descriptorName = (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName;
                    descriptorArg = NodeFactory__from_printer.NewAssignmentExpression(f, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberDescriptorName, descriptor);
                }
                else {
                    const __gotots_store_272 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    descriptorArg = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_272, "NodeFactory"), KindNullKeyword$constant__from_ast());
                }
                let esDecorateExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewESDecorateHelper(f, ctorArg, descriptorArg, memberDecoratorsName, contextObj, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberInitializersName, (mi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).memberExtraInitializersName);
                const __gotots_store_273 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let esDecorateStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_273, "NodeFactory"), esDecorateExpr);
                EmitContext__from_printer.SetSourceMapRange(ec, esDecorateStatement, MoveRangePastDecorators__from_transformers(member));
                esDecoratorTransformer.$go$private$estransforms$appendDecorationStatement(tx, ci, member, esDecorateStatement);
            }
        }
        if (result.name === undefined) {
            esDecoratorTransformer.$go$private$estransforms$enterName(tx);
            result.name = esDecoratorTransformer.$go$private$estransforms$visitPropertyName(tx, Node__from_ast.Name(member));
            esDecoratorTransformer.$go$private$estransforms$exitName(tx);
        }
        if ((modifiers === undefined || (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
            ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes.length === 0) && (IsMethodDeclaration__from_ast(member) || IsPropertyDeclaration__from_ast(member))) {
            EmitContext__from_printer.SetEmitFlags(ec, result.name, EFNoLeadingComments$constant__from_printer());
        }
        return partialResult.$copy(result);
    }
    static $go$private$estransforms$prepareConstructor(tx: esDecoratorTransformer | undefined, ci: classInfo | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if ((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        const __gotots_store_243 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_243, "Transformer"));
        const __gotots_store_244 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_0 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_244, "NodeFactory"), NodeFactory__from_printer.InlineExpressions(f, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers));
        let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
        (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        return statements;
    }
    static $go$private$estransforms$prependExpressions(tx: esDecoratorTransformer | undefined, pending: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_404 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_404, "Transformer"));
        if (pending.length === 0) {
            return expression;
        }
        if (expression === undefined) {
            return NodeFactory__from_printer.InlineExpressions(f, pending);
        }
        if (IsParenthesizedExpression__from_ast(expression)) {
            let pe: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined = Node__from_ast.AsParenthesizedExpression(expression);
            let exprs__shadow_1 = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(pending.length + 1, null, void 0);
            RuntimeSlice.copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(exprs__shadow_1, pending);
            exprs__shadow_1.set(pending.length, ParenthesizedExpression__from_ast.$storageOf(((pe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
            const __gotots_store_405 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_405, "NodeFactory"), pe, NodeFactory__from_printer.InlineExpressions(f, exprs__shadow_1));
        }
        let exprs = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(pending.length + 1, null, void 0);
        RuntimeSlice.copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(exprs, pending);
        exprs.set(pending.length, expression);
        return NodeFactory__from_printer.InlineExpressions(f, exprs);
    }
    static $go$private$estransforms$shouldBeCapturedInTempVariable(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(node);
        switch (Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast(): {
                return true;
                break;
            }
            case KindThisKeyword$constant__from_ast():
            case KindNumericLiteral$constant__from_ast():
            case KindBigIntLiteral$constant__from_ast():
            case KindStringLiteral$constant__from_ast(): {
                return false;
                break;
            }
            default: {
                return true;
                break;
            }
        }
    }
    static $go$private$estransforms$shouldVisitNode(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return !((Node__from_ast.SubtreeFacts(node) & SubtreeContainsDecorators$constant__from_ast()) >>> 0 === 0) || (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((Node__from_ast.SubtreeFacts(node) & SubtreeContainsLexicalThis$constant__from_ast()) >>> 0 === 0)) || (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined) && !((Node__from_ast.SubtreeFacts(node) & SubtreeContainsLexicalSuper$constant__from_ast()) >>> 0 === 0));
    }
    static $go$private$estransforms$transformAllDecoratorsOfDeclaration(tx: esDecoratorTransformer | undefined, decorators: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (decorators.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, decorators.length, void 0);
        const __gotots_range_8 = decorators;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
            result = result.append(void 0, [esDecoratorTransformer.$go$private$estransforms$transformDecorator(tx, d)]);
        }
        return result;
    }
    static $go$private$estransforms$transformClassLike(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "Transformer"));
        const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "Transformer"));
        EmitContext__from_printer.StartVariableEnvironment(ec);
        if (!classHasDeclaredOrExplicitlyAssignedName(ec, node) && ClassOrConstructorParameterIsDecorated__from_ast(false, node)) {
            const __gotots_argument_119 = ec;
            const __gotots_argument_120 = node;
            const __gotots_store_184 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_121 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "NodeFactory"), "", 0);
            const __gotots_argument_122 = void 0;
            node = injectClassNamedEvaluationHelperBlockIfMissing(__gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122);
        }
        let classReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(f, node, new AssignedNameOptions__from_printer(false, false, false));
        let ci: classInfo | undefined = esDecoratorTransformer.$go$private$estransforms$createClassInfo(tx, node);
        let classDefinitionStatements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        let leadingBlockStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let trailingBlockStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let syntheticConstructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let shouldTransformPrivateStaticElementsInClass = false;
        let classDecorators = esDecoratorTransformer.$go$private$estransforms$transformAllDecoratorsOfDeclaration(tx, Node__from_ast.Decorators(node));
        if (classDecorators.length > 0) {
            Assert__from_debug(!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined), RuntimeSlice.nil<GoInterface | undefined>());
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDecoratorsName = NodeFactory__from_printer.NewUniqueNameEx(f, "_classDecorators", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDescriptorName = NodeFactory__from_printer.NewUniqueNameEx(f, "_classDescriptor", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName = NodeFactory__from_printer.NewUniqueNameEx(f, "_classExtraInitializers", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            const __gotots_store_185 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory");
            const __gotots_store_186 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_123 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "NodeFactory"), classDecorators);
            const __gotots_argument_124 = false;
            let decoratorsArray: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_50, __gotots_argument_123, __gotots_argument_124);
            const __gotots_argument_129 = classDefinitionStatements;
            const __gotots_argument_130 = esDecoratorTransformer.$go$private$estransforms$createLet(tx, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDecoratorsName, decoratorsArray);
            const __gotots_argument_131 = esDecoratorTransformer.$go$private$estransforms$createLet(tx, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDescriptorName, void 0);
            const __gotots_receiver_52 = tx;
            const __gotots_argument_127 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName;
            const __gotots_store_187 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_51 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "NodeFactory");
            const __gotots_store_188 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_125 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_126 = false;
            const __gotots_argument_128 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_51, __gotots_argument_125, __gotots_argument_126);
            const __gotots_argument_132 = esDecoratorTransformer.$go$private$estransforms$createLet(__gotots_receiver_52, __gotots_argument_127, __gotots_argument_128);
            const __gotots_argument_133 = esDecoratorTransformer.$go$private$estransforms$createLet(tx, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis, void 0);
            classDefinitionStatements = __gotots_argument_129.append(void 0, [__gotots_argument_130, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133]);
            if (classDecorators.length > 0 && (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticPrivateClassElements) {
                shouldTransformPrivateStaticElementsInClass = true;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile = true;
            }
        }
        let extendsClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetHeritageClause__from_ast(node, KindExtendsKeyword$constant__from_ast());
        let extendsElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(extendsClause === undefined)) {
            let hc: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined = Node__from_ast.AsHeritageClause(extendsClause);
            if (!(HeritageClause__from_ast.$storageOf(((hc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types === undefined) && NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((hc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                extendsElement = NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((hc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
            }
        }
        let extendsExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(extendsElement === undefined)) {
            const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            extendsExpression = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "Transformer")), ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(extendsElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression);
        }
        if (!(extendsExpression === undefined)) {
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper = NodeFactory__from_printer.NewUniqueNameEx(f, "_classSuper", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            let unwrapped: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(extendsExpression, OEKAll$constant__from_ast());
            let safeExtendsExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = extendsExpression;
            if ((IsClassExpression__from_ast(unwrapped) && Node__from_ast.Name(unwrapped) === undefined) || (IsFunctionExpression__from_ast(unwrapped) && Node__from_ast.Name(unwrapped) === undefined) || IsArrowFunction__from_ast(unwrapped)) {
                const __gotots_receiver_53 = f;
                const __gotots_store_190 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_134 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeFactory"), "0", 0);
                const __gotots_argument_135 = extendsExpression;
                safeExtendsExpression = NodeFactory__from_printer.NewCommaExpression(__gotots_receiver_53, __gotots_argument_134, __gotots_argument_135);
            }
            classDefinitionStatements = classDefinitionStatements.append(void 0, [esDecoratorTransformer.$go$private$estransforms$createLet(tx, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, safeExtendsExpression)]);
            const __gotots_store_191 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let updatedExtendsElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateExpressionWithTypeArguments(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "NodeFactory"), Node__from_ast.AsExpressionWithTypeArguments(extendsElement), (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, void 0);
            let hc: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined = Node__from_ast.AsHeritageClause(extendsClause);
            const __gotots_store_192 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_192, "NodeFactory");
            const __gotots_argument_136 = hc;
            const __gotots_argument_137 = HeritageClause__from_ast.$storageOf(((hc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token;
            const __gotots_store_193 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_138 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updatedExtendsElement]));
            let updatedExtendsClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateHeritageClause(__gotots_receiver_54, __gotots_argument_136, __gotots_argument_137, __gotots_argument_138);
            const __gotots_store_194 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            heritageClauses = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_194, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updatedExtendsClause]));
        }
        let renamedClassThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            renamedClassThis = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
        }
        else {
            renamedClassThis = NodeFactory__from_printer.NewThisExpression(f);
        }
        esDecoratorTransformer.$go$private$estransforms$enterClass(tx, ci);
        leadingBlockStatements = leadingBlockStatements.append(void 0, [esDecoratorTransformer.$go$private$estransforms$createMetadata(tx, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).metadataReference, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper)]);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonConstructorClassElementVisitor, Node__from_ast.MemberList(node));
        members = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).constructorClassElementVisitor, members);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis = void 0;
            const __gotots_range_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                if (!((Node__from_ast.SubtreeFacts(expr) & SubtreeContainsLexicalThis$constant__from_ast()) >>> 0 === 0)) {
                    expr = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThisVisitor, expr);
                }
                const __gotots_store_195 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "NodeFactory"), expr);
                leadingBlockStatements = leadingBlockStatements.append(void 0, [statement]);
            }
            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis === undefined)) {
                classDefinitionStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([esDecoratorTransformer.$go$private$estransforms$createLet(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThis, NodeFactory__from_printer.NewThisExpression(f))]), classDefinitionStatements, void 0);
            }
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        esDecoratorTransformer.$go$private$estransforms$exitClass(tx);
        if ((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers.length > 0 && GetFirstConstructorWithBody__from_ast(node) === undefined) {
            let initializerStatements = esDecoratorTransformer.$go$private$estransforms$prepareConstructor(tx, ci);
            if (initializerStatements.length > 0) {
                let isDerivedClass = !(extendsElement === undefined) && !(Node__from_ast.$storageOf(((SkipOuterExpressions__from_ast(ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(extendsElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression, OEKAll$constant__from_ast()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast());
                let constructorStatements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
                if (isDerivedClass) {
                    const __gotots_store_196 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "NodeFactory");
                    const __gotots_store_197 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_139 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory"), "arguments");
                    let spreadArguments: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSpreadElement(__gotots_receiver_55, __gotots_argument_139);
                    const __gotots_store_198 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_56 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "NodeFactory");
                    const __gotots_store_199 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_140 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory"), KindSuperKeyword$constant__from_ast());
                    const __gotots_argument_141 = void 0;
                    const __gotots_argument_142 = void 0;
                    const __gotots_store_200 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_143 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([spreadArguments]));
                    const __gotots_argument_144 = NodeFlagsNone$constant__from_ast();
                    let superCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_56, __gotots_argument_140, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143, __gotots_argument_144);
                    const __gotots_argument_145 = constructorStatements;
                    const __gotots_store_201 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_146 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory"), superCall);
                    constructorStatements = __gotots_argument_145.append(void 0, [__gotots_argument_146]);
                }
                constructorStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(constructorStatements, initializerStatements, void 0);
                const __gotots_store_202 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_57 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "NodeFactory");
                const __gotots_store_203 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_147 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeFactory"), constructorStatements);
                const __gotots_argument_148 = true;
                let constructorBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_57, __gotots_argument_147, __gotots_argument_148);
                const __gotots_store_204 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_58 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "NodeFactory");
                const __gotots_argument_149 = void 0;
                const __gotots_argument_150 = void 0;
                const __gotots_store_205 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_151 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_205, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_152 = void 0;
                const __gotots_argument_153 = void 0;
                const __gotots_argument_154 = constructorBody;
                syntheticConstructor = NodeFactory__from_ast.NewConstructorDeclaration(__gotots_receiver_58, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154);
            }
        }
        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName === undefined)) {
            const __gotots_argument_159 = classDefinitionStatements;
            const __gotots_receiver_60 = tx;
            const __gotots_argument_157 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticMethodExtraInitializersName;
            const __gotots_store_206 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_59 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeFactory");
            const __gotots_store_207 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_155 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_207, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_156 = false;
            const __gotots_argument_158 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_59, __gotots_argument_155, __gotots_argument_156);
            const __gotots_argument_160 = esDecoratorTransformer.$go$private$estransforms$createLet(__gotots_receiver_60, __gotots_argument_157, __gotots_argument_158);
            classDefinitionStatements = __gotots_argument_159.append(void 0, [__gotots_argument_160]);
        }
        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName === undefined)) {
            const __gotots_argument_165 = classDefinitionStatements;
            const __gotots_receiver_62 = tx;
            const __gotots_argument_163 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).instanceMethodExtraInitializersName;
            const __gotots_store_208 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_61 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory");
            const __gotots_store_209 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_161 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_209, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_162 = false;
            const __gotots_argument_164 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_61, __gotots_argument_161, __gotots_argument_162);
            const __gotots_argument_166 = esDecoratorTransformer.$go$private$estransforms$createLet(__gotots_receiver_62, __gotots_argument_163, __gotots_argument_164);
            classDefinitionStatements = __gotots_argument_165.append(void 0, [__gotots_argument_166]);
        }
        const __gotots_store_210 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_0 = OrderedMap$Size$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "memberInfos"));
        const __gotots_binary_operand_1 = 0;
        if (__gotots_binary_operand_0 > __gotots_binary_operand_1) {
            classDefinitionStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(classDefinitionStatements, esDecoratorTransformer.$go$private$estransforms$emitMemberInfoDeclarations(tx, ci, true), void 0);
            classDefinitionStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(classDefinitionStatements, esDecoratorTransformer.$go$private$estransforms$emitMemberInfoDeclarations(tx, ci, false), void 0);
        }
        leadingBlockStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(leadingBlockStatements, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticNonFieldDecorationStatements, void 0);
        leadingBlockStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(leadingBlockStatements, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticNonFieldDecorationStatements, void 0);
        leadingBlockStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(leadingBlockStatements, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticFieldDecorationStatements, void 0);
        leadingBlockStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(leadingBlockStatements, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonStaticFieldDecorationStatements, void 0);
        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDescriptorName === undefined) && !((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDecoratorsName === undefined) && !((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName === undefined) && !((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            const __gotots_store_211 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_63 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "NodeFactory");
            const __gotots_argument_167 = void 0;
            const __gotots_store_212 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_168 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_212, "NodeFactory"), "value");
            const __gotots_argument_169 = void 0;
            const __gotots_argument_170 = void 0;
            const __gotots_argument_171 = renamedClassThis;
            let valueProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_63, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169, __gotots_argument_170, __gotots_argument_171);
            const __gotots_store_213 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "NodeFactory");
            const __gotots_store_214 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_172 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_214, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([valueProperty]));
            const __gotots_argument_173 = false;
            let classDescriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_64, __gotots_argument_172, __gotots_argument_173);
            let classDescriptorAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDescriptorName, classDescriptor);
            const __gotots_store_215 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_65 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_215, "NodeFactory");
            const __gotots_argument_174 = renamedClassThis;
            const __gotots_argument_175 = void 0;
            const __gotots_store_216 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_176 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory"), "name");
            const __gotots_argument_177 = NodeFlagsNone$constant__from_ast();
            let classNameReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_65, __gotots_argument_174, __gotots_argument_175, __gotots_argument_176, __gotots_argument_177);
            let contextObj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewESDecorateClassContextObject(f, classNameReference, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).metadataReference);
            const __gotots_receiver_66 = f;
            const __gotots_store_217 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_178 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_217, "NodeFactory"), KindNullKeyword$constant__from_ast());
            const __gotots_argument_179 = classDescriptorAssignment;
            const __gotots_argument_180 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDecoratorsName;
            const __gotots_argument_181 = contextObj;
            const __gotots_store_218 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_182 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeFactory"), KindNullKeyword$constant__from_ast());
            const __gotots_argument_183 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName;
            let esDecorateHelper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewESDecorateHelper(__gotots_receiver_66, __gotots_argument_178, __gotots_argument_179, __gotots_argument_180, __gotots_argument_181, __gotots_argument_182, __gotots_argument_183);
            const __gotots_store_219 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let esDecorateStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_219, "NodeFactory"), esDecorateHelper);
            EmitContext__from_printer.SetSourceMapRange(ec, esDecorateStatement, MoveRangePastDecorators__from_transformers(node));
            leadingBlockStatements = leadingBlockStatements.append(void 0, [esDecorateStatement]);
            const __gotots_store_220 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_67 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_220, "NodeFactory");
            const __gotots_argument_184 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classDescriptorName;
            const __gotots_argument_185 = void 0;
            const __gotots_store_221 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_186 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_221, "NodeFactory"), "value");
            const __gotots_argument_187 = NodeFlagsNone$constant__from_ast();
            let classDescriptorValueRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_67, __gotots_argument_184, __gotots_argument_185, __gotots_argument_186, __gotots_argument_187);
            let classThisAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis, classDescriptorValueRef);
            let classReferenceAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, classReference, classThisAssignment);
            const __gotots_argument_188 = leadingBlockStatements;
            const __gotots_store_222 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_189 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_222, "NodeFactory"), classReferenceAssignment);
            leadingBlockStatements = __gotots_argument_188.append(void 0, [__gotots_argument_189]);
        }
        leadingBlockStatements = leadingBlockStatements.append(void 0, [esDecoratorTransformer.$go$private$estransforms$createSymbolMetadata(tx, renamedClassThis, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).metadataReference)]);
        if ((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers.length > 0) {
            const __gotots_range_2 = (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                const __gotots_store_223 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let initializerStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_223, "NodeFactory"), initializer);
                EmitContext__from_printer.SetSourceMapRange(ec, initializerStatement, EmitContext__from_printer.SourceMapRange(ec, initializer));
                trailingBlockStatements = trailingBlockStatements.append(void 0, [initializerStatement]);
            }
            (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName === undefined)) {
            let runClassInitializersHelper: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewRunInitializersHelper(f, renamedClassThis, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classExtraInitializersName, void 0);
            const __gotots_store_224 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let runClassInitializersStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_224, "NodeFactory"), runClassInitializersHelper);
            if (!(Node__from_ast.Name(node) === undefined)) {
                EmitContext__from_printer.SetSourceMapRange(ec, runClassInitializersStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            }
            else {
                EmitContext__from_printer.SetSourceMapRange(ec, runClassInitializersStatement, MoveRangePastDecorators__from_transformers(node));
            }
            trailingBlockStatements = trailingBlockStatements.append(void 0, [runClassInitializersStatement]);
        }
        if (leadingBlockStatements.length > 0 && trailingBlockStatements.length > 0 && !(ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers) {
            leadingBlockStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(leadingBlockStatements, trailingBlockStatements, void 0);
            trailingBlockStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let leadingStaticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (leadingBlockStatements.length > 0) {
            const __gotots_store_225 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_69 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "NodeFactory");
            const __gotots_argument_192 = void 0;
            const __gotots_store_226 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_68 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_226, "NodeFactory");
            const __gotots_store_227 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_190 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_227, "NodeFactory"), leadingBlockStatements);
            const __gotots_argument_191 = true;
            const __gotots_argument_193 = NodeFactory__from_ast.NewBlock(__gotots_receiver_68, __gotots_argument_190, __gotots_argument_191);
            leadingStaticBlock = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_69, __gotots_argument_192, __gotots_argument_193);
        }
        if (!(leadingStaticBlock === undefined) && shouldTransformPrivateStaticElementsInClass) {
            EmitContext__from_printer.SetEmitFlags(ec, leadingStaticBlock, EFTransformPrivateStaticElements$constant__from_printer());
        }
        let trailingStaticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (trailingBlockStatements.length > 0) {
            const __gotots_store_228 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_71 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_228, "NodeFactory");
            const __gotots_argument_196 = void 0;
            const __gotots_store_229 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeFactory");
            const __gotots_store_230 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_194 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_230, "NodeFactory"), trailingBlockStatements);
            const __gotots_argument_195 = true;
            const __gotots_argument_197 = NodeFactory__from_ast.NewBlock(__gotots_receiver_70, __gotots_argument_194, __gotots_argument_195);
            trailingStaticBlock = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_71, __gotots_argument_196, __gotots_argument_197);
        }
        if (!(leadingStaticBlock === undefined) || !(syntheticConstructor === undefined) || !(trailingStaticBlock === undefined)) {
            let newMembers = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length + 3, void 0);
            let existingNamedEvaluationHelperBlockIndex = -1;
            const __gotots_range_3 = NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_index_3;
                const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
                let i = __gotots_range_value_3;
                let m: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                if (isClassNamedEvaluationHelperBlock(ec, m)) {
                    existingNamedEvaluationHelperBlockIndex = i;
                    break;
                }
            }
            if (!(leadingStaticBlock === undefined)) {
                newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(0, existingNamedEvaluationHelperBlockIndex + 1, null), void 0);
                newMembers = newMembers.append(void 0, [leadingStaticBlock]);
                newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(existingNamedEvaluationHelperBlockIndex + 1, null, null), void 0);
            }
            else {
                newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
            }
            if (!(syntheticConstructor === undefined)) {
                newMembers = newMembers.append(void 0, [syntheticConstructor]);
            }
            if (!(trailingStaticBlock === undefined)) {
                newMembers = newMembers.append(void 0, [trailingStaticBlock]);
            }
            const __gotots_store_231 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let membersList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_231, "NodeFactory"), newMembers);
            NodeList__from_ast.$storageOf(((membersList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            members = membersList;
        }
        let lexicalEnvironment = EmitContext__from_printer.EndVariableEnvironment(ec);
        let classExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (classDecorators.length > 0) {
            const __gotots_store_232 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            classExpression = NodeFactory__from_ast.NewClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_232, "NodeFactory"), void 0, void 0, void 0, heritageClauses, members);
            EmitContext__from_printer.SetOriginal(ec, classExpression, node);
            if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
                classExpression = injectClassThisAssignmentIfMissing(ec, f, classExpression, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
            }
            const __gotots_store_233 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let classReferenceDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_233, "NodeFactory"), classReference, void 0, void 0, classExpression);
            const __gotots_store_234 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_72 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_234, "NodeFactory");
            const __gotots_store_235 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_198 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_235, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([classReferenceDeclaration]));
            const __gotots_argument_199 = NodeFlagsNone$constant__from_ast();
            let classReferenceVarDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_72, __gotots_argument_198, __gotots_argument_199);
            let returnExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
                returnExpr = NodeFactory__from_printer.NewAssignmentExpression(f, classReference, (ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
            }
            else {
                returnExpr = classReference;
            }
            const __gotots_argument_200 = classDefinitionStatements;
            const __gotots_store_236 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_201 = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_236, "NodeFactory"), void 0, classReferenceVarDeclList);
            const __gotots_store_237 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_202 = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_237, "NodeFactory"), returnExpr);
            classDefinitionStatements = __gotots_argument_200.append(void 0, [__gotots_argument_201, __gotots_argument_202]);
        }
        else {
            const __gotots_store_238 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            classExpression = NodeFactory__from_ast.NewClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_238, "NodeFactory"), void 0, Node__from_ast.Name(node), void 0, heritageClauses, members);
            EmitContext__from_printer.SetOriginal(ec, classExpression, node);
            const __gotots_argument_203 = classDefinitionStatements;
            const __gotots_store_239 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_204 = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_239, "NodeFactory"), classExpression);
            classDefinitionStatements = __gotots_argument_203.append(void 0, [__gotots_argument_204]);
        }
        if (shouldTransformPrivateStaticElementsInClass) {
            EmitContext__from_printer.AddEmitFlags(ec, classExpression, EFTransformPrivateStaticElements$constant__from_printer());
            const __gotots_range_4 = Node__from_ast.Members(classExpression);
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
                let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                if ((IsPrivateIdentifierClassElementDeclaration__from_ast(member) || IsAutoAccessorPropertyDeclaration__from_ast(member)) && HasStaticModifier__from_ast(member)) {
                    EmitContext__from_printer.AddEmitFlags(ec, member, EFTransformPrivateStaticElements$constant__from_printer());
                }
            }
        }
        let mergedStatements = EmitContext__from_printer.MergeEnvironment(ec, classDefinitionStatements, lexicalEnvironment);
        return NodeFactory__from_printer.NewImmediatelyInvokedArrowFunction(f, mergedStatements);
    }
    static $go$private$estransforms$transformConstructorBodyWorker(tx: esDecoratorTransformer | undefined, statementsOut: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statementsIn: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statementOffset: int, superPath: RuntimeSlice<int>, superPathDepth: int, initializerStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let superStatementIndex = superPath.get(superPathDepth);
        if (superStatementIndex > statementOffset) {
            const __gotots_range_5 = statementsIn.slice(statementOffset, superStatementIndex, null);
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
                let s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                const __gotots_argument_205 = statementsOut;
                const __gotots_store_245 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_206 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_245, "Transformer")), s);
                statementsOut = __gotots_argument_205.append(void 0, [__gotots_argument_206]);
            }
        }
        let superStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statementsIn.get(superStatementIndex);
        if (IsTryStatement__from_ast(superStatement)) {
            let tryBlockNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock;
            let tryBlock: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock(tryBlockNode);
            let tryBlockStatements = esDecoratorTransformer.$go$private$estransforms$transformConstructorBodyWorker(tx, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, 0, superPath, superPathDepth + 1, initializerStatements);
            const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_247 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_246, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_247, "NodeFactory");
            const __gotots_store_248 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_249 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_248, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_207 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_249, "NodeFactory"), tryBlockStatements);
            const __gotots_argument_208 = true;
            let newTryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_73, __gotots_argument_207, __gotots_argument_208);
            Node__from_ast.$storageOf(((newTryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((tryBlockNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!((Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause === undefined)) {
                const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                catchClause = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_250, "Transformer")), (Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause);
            }
            let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!((Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock === undefined)) {
                const __gotots_store_251 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                finallyBlock = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_251, "Transformer")), (Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock);
            }
            const __gotots_store_252 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_253 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_252, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateTryStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_253, "NodeFactory"), Node__from_ast.AsTryStatement(superStatement), newTryBlock, catchClause, finallyBlock);
            statementsOut = statementsOut.append(void 0, [updated]);
        }
        else {
            const __gotots_argument_209 = statementsOut;
            const __gotots_store_254 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_210 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_254, "Transformer")), superStatement);
            statementsOut = __gotots_argument_209.append(void 0, [__gotots_argument_210]);
            statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, initializerStatements, void 0);
        }
        if (superStatementIndex + 1 < statementsIn.length) {
            const __gotots_range_6 = statementsIn.slice(superStatementIndex + 1, null, null);
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
                let s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                const __gotots_argument_211 = statementsOut;
                const __gotots_store_255 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_212 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_255, "Transformer")), s);
                statementsOut = __gotots_argument_211.append(void 0, [__gotots_argument_212]);
            }
        }
        return statementsOut;
    }
    static $go$private$estransforms$transformDecorator(tx: esDecoratorTransformer | undefined, decorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_427 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_427, "Transformer")), (Node__from_ast.AsDecorator(decorator) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_428 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_428, "Transformer")), expression, EFNoComments$constant__from_printer());
        let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(expression, OEKAll$constant__from_ast());
        if (IsAccessExpression__from_ast(innerExpression)) {
            const __gotots_results_7 = esDecoratorTransformer.$go$private$estransforms$createCallBinding(tx, expression);
            let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_7[0];
            let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_7[1];
            const __gotots_store_429 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let bindCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionBindCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_429, "Transformer")), target, thisArg, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_store_430 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeFactory__from_printer.RestoreOuterExpressions(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_430, "Transformer")), expression, bindCall, OEKAll$constant__from_ast());
        }
        return expression;
    }
    static $go$private$estransforms$updateState(tx: esDecoratorTransformer | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper = void 0;
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top === undefined) {
            return;
        }
        switch (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value) {
            case 0: {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData;
                break;
            }
            case 1: {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack = (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThisData;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuperData;
                break;
            }
            case 2: {
                let grandparent: lexicalEntry | undefined = ((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next;
                if (!(grandparent === undefined) && (grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value === lexicalEntryKindClassElement$constant().$value) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack = ((grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoData;
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = (grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThisData;
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper = (grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuperData;
                }
                break;
            }
        }
    }
    static $go$private$estransforms$visit(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
            return esDecoratorTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
        }
        if (!esDecoratorTransformer.$go$private$estransforms$shouldVisitNode(tx, node)) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindDecorator$constant__from_ast(): {
                return void 0;
                break;
            }
            case KindClassDeclaration$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitClassExpression(tx, Node__from_ast.AsClassExpression(node));
                break;
            }
            case KindConstructor$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast():
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                Fail__from_debug("Not supported outside of a class. Use 'classElementVisitor' instead.");
                return void 0;
                break;
            }
            case KindParameter$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitParameterDeclaration(tx, Node__from_ast.AsParameterDeclaration(node));
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitBinaryExpression(tx, node, false);
                break;
            }
            case KindPropertyAssignment$constant__from_ast():
            case KindVariableDeclaration$constant__from_ast():
            case KindBindingElement$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitNamedEvaluationSite(tx, node, Node__from_ast.Initializer(node));
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitExportAssignment(tx, node);
                break;
            }
            case KindThisKeyword$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitThisExpression(tx, node);
                break;
            }
            case KindForStatement$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitForStatement(tx, node);
                break;
            }
            case KindExpressionStatement$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitExpressionStatement(tx, node);
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitParenthesizedExpression(tx, node, false);
                break;
            }
            case KindPartiallyEmittedExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPartiallyEmittedExpression(tx, node, false);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitCallExpression(tx, node);
                break;
            }
            case KindTaggedTemplateExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitTaggedTemplateExpression(tx, node);
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast():
            case KindPostfixUnaryExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPreOrPostfixUnaryExpression(tx, node, false);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitPropertyAccessExpression(tx, node);
                break;
            }
            case KindElementAccessExpression$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitElementAccessExpression(tx, node);
                break;
            }
            case KindComputedPropertyName$constant__from_ast(): {
                return esDecoratorTransformer.$go$private$estransforms$visitComputedPropertyName(tx, node);
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast(): {
                esDecoratorTransformer.$go$private$estransforms$enterOther(tx);
                const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer")), node);
                esDecoratorTransformer.$go$private$estransforms$exitOther(tx);
                return result;
                break;
            }
            default: {
                const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Transformer")), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitArrayAssignmentElement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(IsArrayBindingOrAssignmentElement__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        if (IsSpreadElement__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitAssignmentRestElement(tx, node);
        }
        if (!IsOmittedExpression__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitAssignmentElement(tx, node);
        }
        const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Transformer")), node);
    }
    static $go$private$estransforms$visitAssignmentElement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsAssignmentExpression__from_ast(node, true)) {
            const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let f: {
                value: NodeFactory__from_printer;
            } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "Transformer"));
            let bin: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
            const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_105 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "Transformer"));
            const __gotots_argument_106 = node;
            const __gotots_argument_107 = isAnonymousClassNeedingAssignedName;
            if (isNamedEvaluationAnd(__gotots_argument_105, __gotots_argument_106, __gotots_argument_107)) {
                const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_108 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "Transformer"));
                const __gotots_argument_109 = node;
                const __gotots_argument_110 = canIgnoreEmptyStringLiteralInAssignedName(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                const __gotots_argument_111 = "";
                node = transformNamedEvaluation(__gotots_argument_108, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111);
                bin = Node__from_ast.AsBinaryExpression(node);
            }
            let assignmentTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            const __gotots_store_169 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "Transformer")), BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            const __gotots_store_170 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "NodeFactory"), bin, void 0, assignmentTarget, void 0, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, initializer);
        }
        return esDecoratorTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, node);
    }
    static $go$private$estransforms$visitAssignmentPattern(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_240 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_240, "Transformer"));
        if (IsArrayLiteralExpression__from_ast(node)) {
            let ale: {
                value: ArrayLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsArrayLiteralExpression(node);
            let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).arrayAssignmentVisitor, (ale ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
            const __gotots_store_241 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateArrayLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_241, "NodeFactory"), ale, elements, (ale ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine);
        }
        let ole: {
            value: ObjectLiteralExpression__from_ast;
        } | undefined = Node__from_ast.AsObjectLiteralExpression(node);
        let properties: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).objectAssignmentVisitor, (ole ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties);
        const __gotots_store_242 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateObjectLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_242, "NodeFactory"), ole, properties, (ole ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine);
    }
    static $go$private$estransforms$visitAssignmentPropertyNode(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "Transformer"));
        let pa: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = Node__from_ast.AsPropertyAssignment(node);
        const __gotots_store_178 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "Transformer")), PropertyAssignment__from_ast.Name(pa));
        if (IsAssignmentExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer, true)) {
            let assignmentElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitAssignmentElement(tx, PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
            const __gotots_store_179 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "NodeFactory"), pa, void 0, name, void 0, void 0, assignmentElement);
        }
        if (IsLeftHandSideExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
            let assignmentElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
            const __gotots_store_180 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory"), pa, void 0, name, void 0, void 0, assignmentElement);
        }
        const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "Transformer")), node);
    }
    static $go$private$estransforms$visitAssignmentRestElement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let se: {
            value: SpreadElement__from_ast;
        } | undefined = Node__from_ast.AsSpreadElement(node);
        if (IsLeftHandSideExpression__from_ast((se ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let f: {
                value: NodeFactory__from_printer;
            } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "Transformer"));
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, (se ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_store_164 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory"), se, expression);
        }
        const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "Transformer")), node);
    }
    static $go$private$estransforms$visitAssignmentRestProperty(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let sa: {
            value: SpreadAssignment__from_ast;
        } | undefined = Node__from_ast.AsSpreadAssignment(node);
        if (IsLeftHandSideExpression__from_ast((sa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let f: {
                value: NodeFactory__from_printer;
            } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "Transformer"));
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, (sa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_store_172 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateSpreadAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory"), sa, expression);
        }
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "Transformer")), node);
    }
    static $go$private$estransforms$visitBinaryExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Transformer"));
        const __gotots_store_52 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Transformer"));
        let bin: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        if (IsDestructuringAssignment__from_ast(node)) {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$visitAssignmentPattern(tx, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Transformer")), BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            const __gotots_store_54 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory"), bin, void 0, left, void 0, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
        }
        if (IsAssignmentExpression__from_ast(node, false)) {
            if (isNamedEvaluationAnd(ec, node, isAnonymousClassNeedingAssignedName)) {
                node = transformNamedEvaluation(ec, node, canIgnoreEmptyStringLiteralInAssignedName(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right), "");
                const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "Transformer")), node);
            }
            if (IsSuperProperty__from_ast(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined)) {
                let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsElementAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
                    const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    setterName = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Transformer")), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                }
                else if (IsPropertyAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)))) {
                    setterName = NodeFactory__from_printer.NewStringLiteralFromNode(f, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)));
                }
                if (!(setterName === undefined)) {
                    const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "Transformer")), BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                    if (IsCompoundAssignment__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
                        let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = setterName;
                        if (!IsSimpleInlineableExpression__from_transformers(setterName)) {
                            getterName = NodeFactory__from_printer.NewTempVariable(f);
                            EmitContext__from_printer.AddVariableDeclaration(ec, getterName);
                            setterName = NodeFactory__from_printer.NewAssignmentExpression(f, getterName, setterName);
                        }
                        let superPropertyGet: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(f, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, getterName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
                        EmitContext__from_printer.SetOriginal(ec, superPropertyGet, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                        Node__from_ast.$storageOf(((superPropertyGet ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        const __gotots_store_58 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_30 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory"));
                        const __gotots_argument_44 = void 0;
                        const __gotots_argument_45 = superPropertyGet;
                        const __gotots_argument_46 = void 0;
                        const __gotots_store_59 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_47 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeFactory"), GetNonAssignmentOperatorForCompoundAssignment__from_transformers(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
                        const __gotots_argument_48 = expression;
                        expression = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_30, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    }
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!discarded) {
                        temp = NodeFactory__from_printer.NewTempVariable(f);
                        EmitContext__from_printer.AddVariableDeclaration(ec, temp);
                    }
                    if (!(temp === undefined)) {
                        expression = NodeFactory__from_printer.NewAssignmentExpression(f, temp, expression);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    }
                    expression = NodeFactory__from_printer.NewReflectSetCall(f, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, setterName, expression, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
                    EmitContext__from_printer.SetOriginal(ec, expression, node);
                    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    if (!(temp === undefined)) {
                        expression = NodeFactory__from_printer.NewCommaExpression(f, expression, temp);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    }
                    return expression;
                }
            }
        }
        if (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (discarded) {
                right = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            }
            else {
                const __gotots_store_60 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                right = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "Transformer")), BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            }
            const __gotots_store_61 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory"), bin, void 0, left, void 0, BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
        }
        const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer")), node);
    }
    static $go$private$estransforms$visitCallExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let call: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(node);
        if (IsSuperProperty__from_ast(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "Transformer")), CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let argumentsList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "Transformer")), CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
            const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let invocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionCallCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "Transformer")), expression, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis, NodeList__from_ast.$storageOf(((argumentsList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer")), invocation, node);
            Node__from_ast.$storageOf(((invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return invocation;
        }
        const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "Transformer")), node);
    }
    static $go$private$estransforms$visitClassDeclaration(tx: esDecoratorTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_12 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_14 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (isDecoratedClassLike(__gotots_argument_14)) {
            const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let f: {
                value: NodeFactory__from_printer;
            } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer"));
            const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let ec: {
                value: EmitContext__from_printer;
            } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Transformer"));
            let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
            const __gotots_receiver_22 = ec;
            const __gotots_store_15 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_15 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let originalClass: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(__gotots_receiver_22, __gotots_argument_15);
            if (!IsClassLike__from_ast(originalClass)) {
                const __gotots_store_16 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                originalClass = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            }
            let className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(Node__from_ast.Name(originalClass) === undefined)) {
                className = NodeFactory__from_printer.NewStringLiteralFromNode(f, Node__from_ast.Name(originalClass));
            }
            else {
                const __gotots_store_17 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                className = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), "default", 0);
            }
            const __gotots_store_18 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_16 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_17 = ModifierFlagsExport$constant__from_ast();
            let isExport = HasSyntacticModifier__from_ast(__gotots_argument_16, __gotots_argument_17);
            const __gotots_store_19 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_18 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_19 = ModifierFlagsDefault$constant__from_ast();
            let isDefault = HasSyntacticModifier__from_ast(__gotots_argument_18, __gotots_argument_19);
            const __gotots_store_20 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            let classNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            if (ClassDeclaration__from_ast.Name(node) === undefined) {
                classNode = injectClassNamedEvaluationHelperBlockIfMissing(ec, classNode, className, void 0);
            }
            if (isExport && isDefault) {
                let iife: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$transformClassLike(tx, classNode);
                if (!(Node__from_ast.Name(classNode) === undefined)) {
                    const __gotots_store_21 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), NodeFactory__from_printer.GetLocalName(f, classNode), void 0, void 0, iife);
                    EmitContext__from_printer.SetOriginal(ec, varDecl, classNode);
                    const __gotots_store_22 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory");
                    const __gotots_store_23 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_20 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
                    const __gotots_argument_21 = NodeFlagsLet$constant__from_ast();
                    let varDecls: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_23, __gotots_argument_20, __gotots_argument_21);
                    const __gotots_store_24 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), void 0, varDecls);
                    statements = statements.append(void 0, [varStatement]);
                    let exportStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewExportDefault(f, NodeFactory__from_printer.GetDeclarationName(f, classNode));
                    EmitContext__from_printer.SetOriginal(ec, exportStatement, classNode);
                    EmitContext__from_printer.AssignCommentRange(ec, exportStatement, classNode);
                    EmitContext__from_printer.SetSourceMapRange(ec, exportStatement, MoveRangePastDecorators__from_transformers(classNode));
                    statements = statements.append(void 0, [exportStatement]);
                }
                else {
                    let exportStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewExportDefault(f, iife);
                    EmitContext__from_printer.SetOriginal(ec, exportStatement, classNode);
                    EmitContext__from_printer.AssignCommentRange(ec, exportStatement, classNode);
                    EmitContext__from_printer.SetSourceMapRange(ec, exportStatement, MoveRangePastDecorators__from_transformers(classNode));
                    statements = statements.append(void 0, [exportStatement]);
                }
            }
            else {
                Assert__from_debug(!(Node__from_ast.Name(classNode) === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("A class declaration that is not a default export must have a name.")]));
                let iife: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$transformClassLike(tx, classNode);
                let modifiers__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportStrippingModifierVisitor, Node__from_ast.Modifiers(classNode));
                let declName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(f, classNode, new AssignedNameOptions__from_printer(false, true, false));
                const __gotots_store_25 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), declName, void 0, void 0, iife);
                EmitContext__from_printer.SetOriginal(ec, varDecl, classNode);
                const __gotots_store_26 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory");
                const __gotots_store_27 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_22 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
                const __gotots_argument_23 = NodeFlagsLet$constant__from_ast();
                let varDecls: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_24, __gotots_argument_22, __gotots_argument_23);
                const __gotots_store_28 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), modifiers__shadow_1, varDecls);
                EmitContext__from_printer.SetOriginal(ec, varStatement, classNode);
                EmitContext__from_printer.AssignCommentRange(ec, varStatement, classNode);
                statements = statements.append(void 0, [varStatement]);
                if (isExport) {
                    let exportStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewExternalModuleExport(f, declName);
                    EmitContext__from_printer.SetOriginal(ec, exportStatement, classNode);
                    statements = statements.append(void 0, [exportStatement]);
                }
            }
            return SingleOrMany__from_transformers(statements, f);
        }
        const __gotots_receiver_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_29: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_24 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_25, __gotots_argument_24);
        const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        esDecoratorTransformer.$go$private$estransforms$enterClass(tx, void 0);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        esDecoratorTransformer.$go$private$estransforms$exitClass(tx);
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_32 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), node, modifiers, ClassDeclaration__from_ast.Name(node), void 0, heritageClauses, members);
    }
    static $go$private$estransforms$visitClassExpression(tx: esDecoratorTransformer | undefined, node: {
        value: ClassExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_33 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_25 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (isDecoratedClassLike(__gotots_argument_25)) {
            const __gotots_receiver_26 = tx;
            const __gotots_store_34 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_26 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let iife: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$transformClassLike(__gotots_receiver_26, __gotots_argument_26);
            const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_27 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Transformer"));
            const __gotots_argument_27 = iife;
            const __gotots_store_36 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_28 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_27, __gotots_argument_27, __gotots_argument_28);
            return iife;
        }
        const __gotots_receiver_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_37: ClassExpression__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_29 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_28, __gotots_argument_29);
        const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        esDecoratorTransformer.$go$private$estransforms$enterClass(tx, void 0);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        esDecoratorTransformer.$go$private$estransforms$exitClass(tx);
        const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_40 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory"), node, modifiers, ClassExpression__from_ast.Name(node), void 0, heritageClauses, members);
    }
    static $go$private$estransforms$visitClassStaticBlockDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "Transformer"));
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_91 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "Transformer"));
        const __gotots_argument_92 = node;
        if (isClassNamedEvaluationHelperBlock(__gotots_argument_91, __gotots_argument_92)) {
            const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "Transformer")), node);
            {
                const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.AssignedName(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "Transformer")), node);
                if (!(assignedName === undefined) && !tsonicTypeScriptRuntime.sameLocation(result, node)) {
                    const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetAssignedName(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "Transformer")), result, assignedName);
                }
            }
        }
        else {
            const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_93 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "Transformer"));
            const __gotots_argument_94 = node;
            if (isClassThisAssignmentBlock(__gotots_argument_93, __gotots_argument_94)) {
                let savedClassThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = void 0;
                const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "Transformer")), node);
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = savedClassThis;
            }
            else {
                const __gotots_store_151 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let ec: {
                    value: EmitContext__from_printer;
                } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "Transformer"));
                EmitContext__from_printer.StartVariableEnvironment(ec);
                const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "Transformer")), node);
                let varStatements = EmitContext__from_printer.EndVariableEnvironment(ec);
                if (varStatements.length > 0) {
                    let blockBody: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock((Node__from_ast.AsClassStaticBlockDeclaration(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body);
                    let newStmts = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, varStatements.length + NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((blockBody ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
                    newStmts = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newStmts, varStatements, void 0);
                    newStmts = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newStmts, NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((blockBody ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                    const __gotots_store_153 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "NodeFactory");
                    const __gotots_argument_97 = void 0;
                    const __gotots_store_154 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory");
                    const __gotots_store_155 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_95 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "NodeFactory"), newStmts);
                    const __gotots_argument_96 = Block__from_ast.$storageOf(((blockBody ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
                    const __gotots_argument_98 = NodeFactory__from_ast.NewBlock(__gotots_receiver_46, __gotots_argument_95, __gotots_argument_96);
                    result = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_47, __gotots_argument_97, __gotots_argument_98);
                }
                if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack === undefined)) {
                    ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers = true;
                    if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers.length > 0) {
                        let stmts = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
                        const __gotots_range_0 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers;
                        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                            let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                            const __gotots_store_156 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            let initStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory"), init);
                            const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_48 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "Transformer"));
                            const __gotots_argument_99 = initStmt;
                            const __gotots_store_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_100 = EmitContext__from_printer.SourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "Transformer")), init);
                            EmitContext__from_printer.SetSourceMapRange(__gotots_receiver_48, __gotots_argument_99, __gotots_argument_100);
                            stmts = stmts.append(void 0, [initStmt]);
                        }
                        const __gotots_store_159 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "NodeFactory");
                        const __gotots_store_160 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_101 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory"), stmts);
                        const __gotots_argument_102 = true;
                        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_49, __gotots_argument_101, __gotots_argument_102);
                        const __gotots_store_161 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        let staticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassStaticBlockDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory"), void 0, body);
                        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
                        const __gotots_argument_103 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([staticBlock, result]);
                        const __gotots_store_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_104 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "Transformer"));
                        return SingleOrMany__from_transformers(__gotots_argument_103, __gotots_argument_104);
                    }
                }
            }
        }
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        return result;
    }
    static $go$private$estransforms$visitComputedPropertyName(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let cpn: {
            value: ComputedPropertyName__from_ast;
        } | undefined = Node__from_ast.AsComputedPropertyName(node);
        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "Transformer")), (cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        if (!IsSimpleInlineableExpression__from_transformers(expression)) {
            expression = esDecoratorTransformer.$go$private$estransforms$injectPendingExpressions(tx, expression);
        }
        const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_103 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory"), cpn, expression);
    }
    static $go$private$estransforms$visitConstructorDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor, Node__from_ast.Modifiers(node));
        const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "Transformer")), Node__from_ast.ParameterList(node));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let ctor: {
            value: ConstructorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsConstructorDeclaration(node);
        if (!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((ctor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack === undefined)) {
            let initializerStatements = esDecoratorTransformer.$go$private$estransforms$prepareConstructor(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack);
            if (initializerStatements.length > 0) {
                let stmts = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
                const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_0 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "Transformer")), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((ctor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
                let prologue = __gotots_results_0[0];
                let rest = __gotots_results_0[1];
                stmts = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(stmts, prologue, void 0);
                let superStatementIndices = FindSuperStatementIndexPath__from_transformers(rest, 0);
                if (superStatementIndices.length > 0) {
                    stmts = esDecoratorTransformer.$go$private$estransforms$transformConstructorBodyWorker(tx, stmts, rest, 0, superStatementIndices, 0, initializerStatements);
                }
                else {
                    stmts = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(stmts, initializerStatements, void 0);
                    const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_results_1 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "Transformer")), rest);
                    let visited = __gotots_results_1[0];
                    stmts = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(stmts, visited, void 0);
                }
                const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_110 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "NodeFactory");
                const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_112 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_63 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeFactory"), stmts);
                const __gotots_argument_64 = true;
                body = NodeFactory__from_ast.NewBlock(__gotots_receiver_33, __gotots_argument_63, __gotots_argument_64);
                const __gotots_store_113 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "Transformer")), body, (void Node__from_ast.AsNode,
                    (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((ctor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body));
                Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((ctor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            }
        }
        if (body === undefined) {
            const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            body = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "Transformer")), (void Node__from_ast.AsNode,
                (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((ctor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body));
        }
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_116 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateConstructorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "NodeFactory"), ctor, modifiers, void 0, parameters, void 0, void 0, body);
    }
    static $go$private$estransforms$visitDestructuringAssignmentTarget(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsObjectLiteralExpression__from_ast(node) || IsArrayLiteralExpression__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitAssignmentPattern(tx, node);
        }
        if (IsSuperProperty__from_ast(node) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined)) {
            const __gotots_store_331 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let f: {
                value: NodeFactory__from_printer;
            } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_331, "Transformer"));
            const __gotots_store_332 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let ec: {
                value: EmitContext__from_printer;
            } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_332, "Transformer"));
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsElementAccessExpression__from_ast(node)) {
                const __gotots_store_333 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                propertyName = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_333, "Transformer")), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
            }
            else if (IsPropertyAccessExpression__from_ast(node) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)))) {
                propertyName = NodeFactory__from_printer.NewStringLiteralFromNode(f, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)));
            }
            if (!(propertyName === undefined)) {
                let paramName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentTargetWrapper(f, paramName, NodeFactory__from_printer.NewReflectSetCall(f, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, propertyName, paramName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis));
                EmitContext__from_printer.SetOriginal(ec, expression, node);
                Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                return expression;
            }
        }
        const __gotots_store_334 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_334, "Transformer")), node);
    }
    static $go$private$estransforms$visitElementAccessExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let ea: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(node);
        if (IsSuperProperty__from_ast(node) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined)) {
            const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "Transformer")), ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
            const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let superProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "Transformer")), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, propertyName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
            const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "Transformer")), superProperty, ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression);
            Node__from_ast.$storageOf(((superProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((ElementAccessExpression__from_ast.$storageOf(((ea ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return superProperty;
        }
        const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "Transformer")), node);
    }
    static $go$private$estransforms$visitExportAssignment(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return esDecoratorTransformer.$go$private$estransforms$visitNamedEvaluationSite(tx, node, Node__from_ast.Expression(node));
    }
    static $go$private$estransforms$visitExpressionStatement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, node);
    }
    static $go$private$estransforms$visitForStatement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "Transformer"));
        let forStmt: {
            value: ForStatement__from_ast;
        } | undefined = Node__from_ast.AsForStatement(node);
        const __gotots_store_67 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
        const __gotots_argument_58 = forStmt;
        const __gotots_argument_59 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, (forStmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_60 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer")), (forStmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
        const __gotots_argument_61 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, (forStmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_31 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "Transformer"));
        const __gotots_argument_56 = (forStmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement;
        const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_57 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "Transformer"));
        const __gotots_argument_62 = EmitContext__from_printer.VisitIterationBody(__gotots_receiver_31, __gotots_argument_56, __gotots_argument_57);
        return NodeFactory__from_ast.UpdateForStatement(__gotots_receiver_32, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62);
    }
    static $go$private$estransforms$visitGetAccessorDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        const __gotots_receiver_38 = tx;
        const __gotots_argument_70 = node;
        const __gotots_argument_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack;
        const __gotots_receiver_37 = tx;
        const __gotots_argument_72 = new createDescriptorFunc(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return esDecoratorTransformer.$go$private$estransforms$createGetAccessorDescriptorObject(__gotots_receiver_37, $argument0, $argument1);
        });
        let result = esDecoratorTransformer.$go$private$estransforms$partialTransformClassElement(__gotots_receiver_38, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
        if (!(result.descriptorName === undefined)) {
            esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
            return esDecoratorTransformer.$go$private$estransforms$finishClassElement(tx, esDecoratorTransformer.$go$private$estransforms$createGetAccessorDescriptorForwarder(tx, result.modifiers, result.name, result.descriptorName), node);
        }
        const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "Transformer")), Node__from_ast.ParameterList(node));
        const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "Transformer")), Node__from_ast.Body(node));
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        let __go_accessor: {
            value: GetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsGetAccessorDeclaration(node);
        const __gotots_receiver_39 = tx;
        const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_124 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_73 = NodeFactory__from_ast.UpdateGetAccessorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeFactory"), __go_accessor, result.modifiers, result.name, void 0, parameters, void 0, void 0, body);
        const __gotots_argument_74 = node;
        return esDecoratorTransformer.$go$private$estransforms$finishClassElement(__gotots_receiver_39, __gotots_argument_73, __gotots_argument_74);
    }
    static $go$private$estransforms$visitMethodDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        const __gotots_receiver_35 = tx;
        const __gotots_argument_65 = node;
        const __gotots_argument_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack;
        const __gotots_receiver_34 = tx;
        const __gotots_argument_67 = new createDescriptorFunc(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return esDecoratorTransformer.$go$private$estransforms$createMethodDescriptorObject(__gotots_receiver_34, $argument0, $argument1);
        });
        let result = esDecoratorTransformer.$go$private$estransforms$partialTransformClassElement(__gotots_receiver_35, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
        if (!(result.descriptorName === undefined)) {
            esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
            return esDecoratorTransformer.$go$private$estransforms$finishClassElement(tx, esDecoratorTransformer.$go$private$estransforms$createMethodDescriptorForwarder(tx, result.modifiers, result.name, result.descriptorName), node);
        }
        const __gotots_store_117 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "Transformer")), Node__from_ast.ParameterList(node));
        const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "Transformer")), Node__from_ast.Body(node));
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        let method: {
            value: MethodDeclaration__from_ast;
        } | undefined = Node__from_ast.AsMethodDeclaration(node);
        const __gotots_receiver_36 = tx;
        const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_120 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_68 = NodeFactory__from_ast.UpdateMethodDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "NodeFactory"), method, result.modifiers, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((method ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, result.name, void 0, void 0, parameters, void 0, void 0, body);
        const __gotots_argument_69 = node;
        return esDecoratorTransformer.$go$private$estransforms$finishClassElement(__gotots_receiver_36, __gotots_argument_68, __gotots_argument_69);
    }
    static $go$private$estransforms$visitNamedEvaluationSite(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, classExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_49 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "Transformer"));
        const __gotots_argument_50 = node;
        const __gotots_argument_51 = isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51)) {
            const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_52 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Transformer"));
            const __gotots_argument_53 = node;
            const __gotots_argument_54 = canIgnoreEmptyStringLiteralInAssignedName(classExpr);
            const __gotots_argument_55 = "";
            node = transformNamedEvaluation(__gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
        }
        const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "Transformer")), node);
    }
    static $go$private$estransforms$visitObjectAssignmentElement(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(IsObjectBindingOrAssignmentElement__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        if (IsSpreadAssignment__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitAssignmentRestProperty(tx, node);
        }
        if (IsShorthandPropertyAssignment__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitShorthandAssignmentProperty(tx, node);
        }
        if (IsPropertyAssignment__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitAssignmentPropertyNode(tx, node);
        }
        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer")), node);
    }
    static $go$private$estransforms$visitParameterDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_41 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        let paramNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_30 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "Transformer"));
        const __gotots_argument_31 = paramNode;
        const __gotots_argument_32 = isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32)) {
            const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_33 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "Transformer"));
            const __gotots_argument_34 = paramNode;
            const __gotots_argument_35 = canIgnoreEmptyStringLiteralInAssignedName(Node__from_ast.Initializer(paramNode));
            const __gotots_argument_36 = "";
            paramNode = transformNamedEvaluation(__gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
            node = Node__from_ast.AsParameterDeclaration(paramNode);
        }
        const __gotots_store_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_45 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeFactory");
        const __gotots_argument_37 = node;
        const __gotots_argument_38 = void 0;
        const __gotots_argument_39 = ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
        const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_40 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "Transformer")), ParameterDeclaration__from_ast.Name(node));
        const __gotots_argument_41 = void 0;
        const __gotots_argument_42 = void 0;
        const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_43 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Transformer")), ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_29, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
        if (!tsonicTypeScriptRuntime.sameLocation(updated, paramNode)) {
            const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "Transformer")), updated, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((paramNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            let newLoc = MoveRangePastModifiers__from_transformers(paramNode);
            Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(newLoc));
            const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "Transformer")), updated, TextRange__from_core.$copy(newLoc));
            const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Transformer")), Node__from_ast.Name(updated), EFNoTrailingSourceMap$constant__from_printer());
        }
        return updated;
    }
    static $go$private$estransforms$visitParenthesizedExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "Transformer"));
        let pe: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined = Node__from_ast.AsParenthesizedExpression(node);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (discarded) {
            expression = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, ParenthesizedExpression__from_ast.$storageOf(((pe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
        }
        else {
            const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            expression = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "Transformer")), ParenthesizedExpression__from_ast.$storageOf(((pe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
        }
        const __gotots_store_73 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "NodeFactory"), pe, expression);
    }
    static $go$private$estransforms$visitPartiallyEmittedExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let pe: {
            value: PartiallyEmittedExpression__from_ast;
        } | undefined = Node__from_ast.AsPartiallyEmittedExpression(node);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (discarded) {
            expression = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor, (pe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        }
        else {
            const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            expression = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "Transformer")), (pe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        }
        const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_76 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdatePartiallyEmittedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeFactory"), pe, expression);
    }
    static $go$private$estransforms$visitPreOrPostfixUnaryExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "Transformer"));
        const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "Transformer"));
        let operator = 0;
        let operandNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsPrefixUnaryExpression__from_ast(node)) {
            operator = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator;
            operandNode = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
        }
        else {
            operator = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
            operandNode = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
        }
        if (operator === KindPlusPlusToken$constant__from_ast() || operator === KindMinusMinusToken$constant__from_ast()) {
            let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(operandNode);
            if (IsSuperProperty__from_ast(operand) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined)) {
                let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsElementAccessExpression__from_ast(operand)) {
                    const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    setterName = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "Transformer")), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(operand) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                }
                else if (IsPropertyAccessExpression__from_ast(operand) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(operand)))) {
                    setterName = NodeFactory__from_printer.NewStringLiteralFromNode(f, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(operand)));
                }
                if (!(setterName === undefined)) {
                    let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = setterName;
                    if (!IsSimpleInlineableExpression__from_transformers(setterName)) {
                        getterName = NodeFactory__from_printer.NewTempVariable(f);
                        EmitContext__from_printer.AddVariableDeclaration(ec, getterName);
                        setterName = NodeFactory__from_printer.NewAssignmentExpression(f, getterName, setterName);
                    }
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(f, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, getterName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
                    EmitContext__from_printer.SetOriginal(ec, expression, node);
                    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!discarded) {
                        temp = NodeFactory__from_printer.NewTempVariable(f);
                        EmitContext__from_printer.AddVariableDeclaration(ec, temp);
                    }
                    expression = expandPreOrPostfixIncrementOrDecrementExpression(f, ec, node, expression, temp);
                    expression = NodeFactory__from_printer.NewReflectSetCall(f, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, setterName, expression, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
                    EmitContext__from_printer.SetOriginal(ec, expression, node);
                    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    if (!(temp === undefined)) {
                        expression = NodeFactory__from_printer.NewCommaExpression(f, expression, temp);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    }
                    return expression;
                }
            }
        }
        const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "Transformer")), node);
    }
    static $go$private$estransforms$visitPropertyAccessExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let pa: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(node);
        if (IsSuperProperty__from_ast(node) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(pa)) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper === undefined)) {
            const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "Transformer")), PropertyAccessExpression__from_ast.Name(pa));
            const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let superProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "Transformer")), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classSuper, propertyName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis);
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "Transformer")), superProperty, PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
            Node__from_ast.$storageOf(((superProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((PropertyAccessExpression__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return superProperty;
        }
        const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "Transformer")), node);
    }
    static $go$private$estransforms$visitPropertyDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_129 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_80 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "Transformer"));
        const __gotots_argument_81 = node;
        const __gotots_argument_82 = isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_80, __gotots_argument_81, __gotots_argument_82)) {
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_83 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "Transformer"));
            const __gotots_argument_84 = node;
            const __gotots_argument_85 = canIgnoreEmptyStringLiteralInAssignedName(Node__from_ast.Initializer(node));
            const __gotots_argument_86 = "";
            node = transformNamedEvaluation(__gotots_argument_83, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86);
        }
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        Assert__from_debug(!HasSyntacticModifier__from_ast(node, ModifierFlagsAmbient$constant__from_ast()), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Not yet implemented.")]));
        const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "Transformer"));
        const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let ec: {
            value: EmitContext__from_printer;
        } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "Transformer"));
        let createDescriptor: createDescriptorFunc = new createDescriptorFunc(void 0);
        if (HasAccessorModifier__from_ast(node)) {
            const __gotots_receiver_43 = tx;
            createDescriptor = new createDescriptorFunc(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return esDecoratorTransformer.$go$private$estransforms$createAccessorPropertyDescriptorObject(__gotots_receiver_43, $argument0, $argument1);
            });
        }
        let result = esDecoratorTransformer.$go$private$estransforms$partialTransformClassElement(tx, node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack, createDescriptor);
        EmitContext__from_printer.StartVariableEnvironment(ec);
        const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "Transformer")), Node__from_ast.Initializer(node));
        if (!(result.initializersName === undefined)) {
            let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(result.thisArg === undefined)) {
                thisArg = result.thisArg;
            }
            else {
                thisArg = NodeFactory__from_printer.NewThisExpression(f);
            }
            if (initializer === undefined) {
                initializer = NodeFactory__from_printer.NewVoidZeroExpression(f);
            }
            initializer = NodeFactory__from_printer.NewRunInitializersHelper(f, thisArg, result.initializersName, initializer);
        }
        if (IsStatic__from_ast(node) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack === undefined) && !(initializer === undefined)) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasStaticInitializers = true;
        }
        let declarations = EmitContext__from_printer.EndVariableEnvironment(ec);
        if (declarations.length > 0) {
            let stmts = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(declarations.length + 1, null, void 0);
            RuntimeSlice.copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(stmts, declarations);
            const __gotots_store_135 = stmts;
            const __gotots_store_136 = declarations.length;
            const __gotots_store_134 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_135.set(__gotots_store_136, NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory"), initializer));
            initializer = NodeFactory__from_printer.NewImmediatelyInvokedArrowFunction(f, stmts);
        }
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack === undefined)) {
            if (IsStatic__from_ast(node)) {
                initializer = esDecoratorTransformer.$go$private$estransforms$injectPendingInitializers(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack, true, initializer);
                if (!(result.extraInitializersName === undefined)) {
                    let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
                        thisArg = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
                    }
                    else {
                        thisArg = NodeFactory__from_printer.NewThisExpression(f);
                    }
                    ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStaticInitializers.append(void 0, [NodeFactory__from_printer.NewRunInitializersHelper(f, thisArg, result.extraInitializersName, void 0)]);
                }
            }
            else {
                initializer = esDecoratorTransformer.$go$private$estransforms$injectPendingInitializers(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack, false, initializer);
                if (!(result.extraInitializersName === undefined)) {
                    ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingInstanceInitializers.append(void 0, [NodeFactory__from_printer.NewRunInitializersHelper(f, NodeFactory__from_printer.NewThisExpression(f), result.extraInitializersName, void 0)]);
                }
            }
        }
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        if (HasAccessorModifier__from_ast(node) && !(result.descriptorName === undefined)) {
            let commentRange = EmitContext__from_printer.CommentRange(ec, node);
            let sourceMapRange = EmitContext__from_printer.SourceMapRange(ec, node);
            let propName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
            let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = result.name;
            let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = result.name;
            if (IsComputedPropertyName__from_ast(propName) && !IsSimpleInlineableExpression__from_transformers(Node__from_ast.Expression(propName))) {
                let cacheAssignment: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = findComputedPropertyNameCacheAssignment(ec, propName);
                if (!(cacheAssignment === undefined)) {
                    const __gotots_store_137 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "NodeFactory");
                    const __gotots_argument_87 = Node__from_ast.AsComputedPropertyName(propName);
                    const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_88 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "Transformer")), Node__from_ast.Expression(propName));
                    getterName = NodeFactory__from_ast.UpdateComputedPropertyName(__gotots_receiver_44, __gotots_argument_87, __gotots_argument_88);
                    const __gotots_store_139 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    setterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory"), Node__from_ast.AsComputedPropertyName(propName), BinaryExpression__from_ast.$storageOf(((cacheAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                }
                else {
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
                    EmitContext__from_printer.SetSourceMapRange(ec, temp, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(propName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    EmitContext__from_printer.AddVariableDeclaration(ec, temp);
                    const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "Transformer")), Node__from_ast.Expression(propName));
                    let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, temp, expression);
                    EmitContext__from_printer.SetSourceMapRange(ec, assignment, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(propName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    const __gotots_store_141 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    getterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "NodeFactory"), Node__from_ast.AsComputedPropertyName(propName), assignment);
                    const __gotots_store_142 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    setterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), Node__from_ast.AsComputedPropertyName(propName), temp);
                }
            }
            let modifiersWithoutAccessor: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).accessorStrippingModifierVisitor, result.modifiers);
            let backingField: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createAccessorPropertyBackingField(f, Node__from_ast.AsPropertyDeclaration(node), modifiersWithoutAccessor, initializer);
            EmitContext__from_printer.SetOriginal(ec, backingField, node);
            EmitContext__from_printer.SetEmitFlags(ec, backingField, EFNoComments$constant__from_printer());
            EmitContext__from_printer.SetSourceMapRange(ec, backingField, TextRange__from_core.$copy(sourceMapRange));
            EmitContext__from_printer.SetSourceMapRange(ec, PropertyDeclaration__from_ast.Name(Node__from_ast.AsPropertyDeclaration(backingField)), EmitContext__from_printer.SourceMapRange(ec, Node__from_ast.Name(node)));
            let getter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$createGetAccessorDescriptorForwarder(tx, modifiersWithoutAccessor, getterName, result.descriptorName);
            EmitContext__from_printer.SetOriginal(ec, getter, node);
            EmitContext__from_printer.SetCommentRange(ec, getter, TextRange__from_core.$copy(commentRange));
            EmitContext__from_printer.SetSourceMapRange(ec, getter, TextRange__from_core.$copy(sourceMapRange));
            let setter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = esDecoratorTransformer.$go$private$estransforms$createSetAccessorDescriptorForwarder(tx, modifiersWithoutAccessor, setterName, result.descriptorName);
            EmitContext__from_printer.SetOriginal(ec, setter, node);
            EmitContext__from_printer.SetEmitFlags(ec, setter, EFNoComments$constant__from_printer());
            EmitContext__from_printer.SetSourceMapRange(ec, setter, TextRange__from_core.$copy(sourceMapRange));
            return SingleOrMany__from_transformers(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([backingField, getter, setter]), f);
        }
        let prop: {
            value: PropertyDeclaration__from_ast;
        } | undefined = Node__from_ast.AsPropertyDeclaration(node);
        const __gotots_receiver_45 = tx;
        const __gotots_store_143 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_89 = NodeFactory__from_ast.UpdatePropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "NodeFactory"), prop, result.modifiers, result.name, void 0, void 0, initializer);
        const __gotots_argument_90 = node;
        return esDecoratorTransformer.$go$private$estransforms$finishClassElement(__gotots_receiver_45, __gotots_argument_89, __gotots_argument_90);
    }
    static $go$private$estransforms$visitPropertyName(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsComputedPropertyName__from_ast(node)) {
            return esDecoratorTransformer.$go$private$estransforms$visitComputedPropertyName(tx, node);
        }
        const __gotots_store_413 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_413, "Transformer")), node);
    }
    static $go$private$estransforms$visitReferencedPropertyName(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        if (IsPropertyNameLiteral__from_ast(node) || IsPrivateIdentifier__from_ast(node)) {
            const __gotots_store_416 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_3 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_416, "Transformer")), node);
            const __gotots_store_417 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_4 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_417, "Transformer")), node);
            return [__gotots_results_3, __gotots_results_4];
        }
        let cpn: {
            value: ComputedPropertyName__from_ast;
        } | undefined = Node__from_ast.AsComputedPropertyName(node);
        if (IsPropertyNameLiteral__from_ast((cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression) && !IsIdentifier__from_ast((cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            const __gotots_store_418 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_5 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_418, "Transformer")), (cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_store_419 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_6 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_419, "Transformer")), node);
            return [__gotots_results_5, __gotots_results_6];
        }
        const __gotots_store_420 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let referencedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_420, "Transformer")), node);
        const __gotots_store_421 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_421, "Transformer")), referencedName);
        const __gotots_store_422 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_142 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_422, "Transformer"));
        const __gotots_store_423 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_437 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_423, "Transformer")), (cpn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        let key: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewPropKeyHelper(__gotots_receiver_142, __gotots_argument_437);
        const __gotots_store_424 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_424, "Transformer")), referencedName, key);
        const __gotots_store_425 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_426 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_425, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_426, "NodeFactory"), cpn, esDecoratorTransformer.$go$private$estransforms$injectPendingExpressions(tx, assignment));
        return [referencedName, updatedName];
    }
    static $go$private$estransforms$visitSetAccessorDeclaration(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        esDecoratorTransformer.$go$private$estransforms$enterClassElement(tx, node);
        const __gotots_receiver_41 = tx;
        const __gotots_argument_75 = node;
        const __gotots_argument_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classInfoStack;
        const __gotots_receiver_40 = tx;
        const __gotots_argument_77 = new createDescriptorFunc(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return esDecoratorTransformer.$go$private$estransforms$createSetAccessorDescriptorObject(__gotots_receiver_40, $argument0, $argument1);
        });
        let result = esDecoratorTransformer.$go$private$estransforms$partialTransformClassElement(__gotots_receiver_41, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
        if (!(result.descriptorName === undefined)) {
            esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
            return esDecoratorTransformer.$go$private$estransforms$finishClassElement(tx, esDecoratorTransformer.$go$private$estransforms$createSetAccessorDescriptorForwarder(tx, result.modifiers, result.name, result.descriptorName), node);
        }
        const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "Transformer")), Node__from_ast.ParameterList(node));
        const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "Transformer")), Node__from_ast.Body(node));
        esDecoratorTransformer.$go$private$estransforms$exitClassElement(tx);
        let __go_accessor: {
            value: SetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
        const __gotots_receiver_42 = tx;
        const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_128 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_78 = NodeFactory__from_ast.UpdateSetAccessorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory"), __go_accessor, result.modifiers, result.name, void 0, parameters, void 0, void 0, body);
        const __gotots_argument_79 = node;
        return esDecoratorTransformer.$go$private$estransforms$finishClassElement(__gotots_receiver_42, __gotots_argument_78, __gotots_argument_79);
    }
    static $go$private$estransforms$visitShorthandAssignmentProperty(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_112 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "Transformer"));
        const __gotots_argument_113 = node;
        const __gotots_argument_114 = isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_112, __gotots_argument_113, __gotots_argument_114)) {
            const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_115 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "Transformer"));
            const __gotots_argument_116 = node;
            const __gotots_argument_117 = canIgnoreEmptyStringLiteralInAssignedName((Node__from_ast.AsShorthandPropertyAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
            const __gotots_argument_118 = "";
            node = transformNamedEvaluation(__gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118);
        }
        const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "Transformer")), node);
    }
    static $go$private$estransforms$visitSourceFile(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).top = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile = false;
        const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_20 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer"));
        const __gotots_store_8 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_11 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_20, __gotots_argument_11);
        const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_21 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Transformer"));
        const __gotots_argument_12 = visited;
        const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_13 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Transformer")));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_21, __gotots_argument_12, __gotots_argument_13);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile) {
            const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Transformer")), visited, EFTransformPrivateStaticElements$constant__from_printer());
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile = false;
        }
        return visited;
    }
    static $go$private$estransforms$visitTaggedTemplateExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tte: {
            value: TaggedTemplateExpression__from_ast;
        } | undefined = Node__from_ast.AsTaggedTemplateExpression(node);
        if (IsSuperProperty__from_ast((tte ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "Transformer")), (tte ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
            const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let boundTag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionBindCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "Transformer")), tag, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "Transformer")), boundTag, node);
            Node__from_ast.$storageOf(((boundTag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let template: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "Transformer")), (tte ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
            const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_87 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateTaggedTemplateExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeFactory"), tte, boundTag, void 0, void 0, template, (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        MemberExpressionBase__from_ast.$storageOf((tte ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
        }
        const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "Transformer")), node);
    }
    static $go$private$estransforms$visitThisExpression(tx: esDecoratorTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            return (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
        }
        return node;
    }
}
export function newESDecoratorTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    if (Tristate_IsTrue__from_core(((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators) || (CompilerOptions__from_core.GetEmitScriptTarget((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions) >= ScriptTargetESNext$constant__from_core() && CompilerOptions__from_core.GetUseDefineForClassFields((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions))) {
        return void 0;
    }
    let tx: esDecoratorTransformer | undefined = new esDecoratorTransformer(Transformer__from_transformers.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, void 0, void 0, void 0, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0, false, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let result: tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined = Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
    const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    let ec: {
        value: EmitContext__from_printer;
    } | undefined = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer"));
    const __gotots_receiver_3 = ec;
    const __gotots_receiver_2 = tx;
    const __gotots_argument_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$outerThisVisit(__gotots_receiver_2, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).outerThisVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_3, __gotots_argument_2);
    const __gotots_receiver_5 = ec;
    const __gotots_receiver_4 = tx;
    const __gotots_argument_3 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$discardedValueVisit(__gotots_receiver_4, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_5, __gotots_argument_3);
    const __gotots_receiver_7 = ec;
    const __gotots_receiver_6 = tx;
    const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$modifierVisitorVisit(__gotots_receiver_6, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_7, __gotots_argument_4);
    const __gotots_receiver_9 = ec;
    const __gotots_receiver_8 = tx;
    const __gotots_argument_5 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$exportStrippingModifierVisit(__gotots_receiver_8, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportStrippingModifierVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_9, __gotots_argument_5);
    const __gotots_receiver_11 = ec;
    const __gotots_receiver_10 = tx;
    const __gotots_argument_6 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$classElementVisitorVisit(__gotots_receiver_10, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_11, __gotots_argument_6);
    const __gotots_receiver_13 = ec;
    const __gotots_receiver_12 = tx;
    const __gotots_argument_7 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$nonConstructorClassElementVisit(__gotots_receiver_12, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nonConstructorClassElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_13, __gotots_argument_7);
    const __gotots_receiver_15 = ec;
    const __gotots_receiver_14 = tx;
    const __gotots_argument_8 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$constructorClassElementVisit(__gotots_receiver_14, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).constructorClassElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_15, __gotots_argument_8);
    const __gotots_receiver_17 = ec;
    const __gotots_receiver_16 = tx;
    const __gotots_argument_9 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$visitArrayAssignmentElement(__gotots_receiver_16, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).arrayAssignmentVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_17, __gotots_argument_9);
    const __gotots_receiver_19 = ec;
    const __gotots_receiver_18 = tx;
    const __gotots_argument_10 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return esDecoratorTransformer.$go$private$estransforms$visitObjectAssignmentElement(__gotots_receiver_18, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).objectAssignmentVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_19, __gotots_argument_10);
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).staticOnlyModifierVisitor = EmitContext__from_printer.NewNodeVisitor(ec, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStaticKeyword$constant__from_ast()) {
            return node;
        }
        return void 0;
    });
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncOnlyModifierVisitor = EmitContext__from_printer.NewNodeVisitor(ec, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsyncKeyword$constant__from_ast()) {
            return node;
        }
        return void 0;
    });
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).accessorStrippingModifierVisitor = EmitContext__from_printer.NewNodeVisitor(ec, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAccessorKeyword$constant__from_ast()) {
            return void 0;
        }
        return node;
    });
    return result;
}
export function getHelperVariableName(ec: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
    let declarationName = "";
    __gotots_control_target_1: {
        if (!(name === undefined) && IsIdentifier__from_ast(name) && !IsGeneratedIdentifier__from_transformers(ec, name)) {
            declarationName = Node__from_ast.Text(name);
        }
        else if (!(name === undefined) && IsPrivateIdentifier__from_ast(name) && !EmitContext__from_printer.HasAutoGenerateInfo(ec, name)) {
            {
                let text = Node__from_ast.Text(name);
                if (text.length > 1) {
                    declarationName = goStringSlice(text, 1);
                }
            }
        }
        else if (!(name === undefined) && IsStringLiteral__from_ast(name) && IsIdentifierText__from_scanner(Node__from_ast.Text(name), LanguageVariantStandard$constant__from_core())) {
            declarationName = Node__from_ast.Text(name);
        }
        else if (IsClassLike__from_ast(node)) {
            declarationName = "class";
        }
        else {
            declarationName = "member";
        }
    }
    if (IsGetAccessorDeclaration__from_ast(node)) {
        declarationName = "get_" + declarationName;
    }
    if (IsSetAccessorDeclaration__from_ast(node)) {
        declarationName = "set_" + declarationName;
    }
    if (!(name === undefined) && IsPrivateIdentifier__from_ast(name)) {
        declarationName = "private_" + declarationName;
    }
    if (IsStatic__from_ast(node)) {
        declarationName = "static_" + declarationName;
    }
    return "_" + declarationName;
}
export function isDecoratedClassLike(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return ClassOrConstructorParameterIsDecorated__from_ast(false, node) || ChildIsDecorated__from_ast(false, node, void 0);
}
export class partialResult {
    declare private readonly $goType: void;
    public constructor(public modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, public referencedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public initializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public extraInitializersName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public descriptorName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $zero(): partialResult {
        return new partialResult(void 0, void 0, void 0, void 0, void 0, void 0, void 0);
    }
    static $copy($source: partialResult): partialResult {
        return new partialResult($source.modifiers, $source.referencedName, $source.name, $source.initializersName, $source.extraInitializersName, $source.descriptorName, $source.thisArg);
    }
    declare private readonly then?: never;
}
export class createDescriptorFunc {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined) {
    }
    declare private readonly then?: never;
}
export function isAnonymousClassNeedingAssignedName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsClassExpression__from_ast(node) && Node__from_ast.Name(node) === undefined && isDecoratedClassLike(node);
}
export function canIgnoreEmptyStringLiteralInAssignedName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(node, OEKAll$constant__from_ast());
    return IsClassExpression__from_ast(innerExpression) && Node__from_ast.Name(innerExpression) === undefined && !ClassOrConstructorParameterIsDecorated__from_ast(false, innerExpression);
}
export function injectClassThisAssignmentIfMissing(ec: {
    value: EmitContext__from_printer;
} | undefined, f: {
    value: NodeFactory__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (classHasClassThisAssignment(ec, node)) {
        return node;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, classThis, NodeFactory__from_printer.NewThisExpression(f));
    const __gotots_store_335 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_335, "NodeFactory"), expression);
    const __gotots_store_336 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_113 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_336, "NodeFactory");
    const __gotots_store_337 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_331 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_337, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
    const __gotots_argument_332 = false;
    let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_113, __gotots_argument_331, __gotots_argument_332);
    const __gotots_store_338 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let staticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassStaticBlockDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_338, "NodeFactory"), void 0, body);
    EmitContext__from_printer.SetClassThis(ec, staticBlock, classThis);
    if (!(Node__from_ast.Name(node) === undefined)) {
        EmitContext__from_printer.SetSourceMapRange(ec, statement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    }
    let newMembers = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1 + Node__from_ast.Members(node).length, void 0);
    newMembers = newMembers.append(void 0, [staticBlock]);
    newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, Node__from_ast.Members(node), void 0);
    const __gotots_store_339 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let membersList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_339, "NodeFactory"), newMembers);
    NodeList__from_ast.$storageOf(((membersList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
    let updatedNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsClassDeclaration__from_ast(node)) {
        let cd: {
            value: ClassDeclaration__from_ast;
        } | undefined = Node__from_ast.AsClassDeclaration(node);
        const __gotots_store_340 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_114 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_340, "NodeFactory");
        const __gotots_argument_333 = cd;
        const __gotots_store_341: ClassDeclaration__from_ast["ClassLikeBase"] = (cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_334 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_341, "ModifiersBase"));
        const __gotots_argument_335 = ClassDeclaration__from_ast.Name(cd);
        const __gotots_argument_336 = void 0;
        const __gotots_argument_337 = (cd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses;
        const __gotots_argument_338 = membersList;
        updatedNode = NodeFactory__from_ast.UpdateClassDeclaration(__gotots_receiver_114, __gotots_argument_333, __gotots_argument_334, __gotots_argument_335, __gotots_argument_336, __gotots_argument_337, __gotots_argument_338);
    }
    else {
        let ce: {
            value: ClassExpression__from_ast;
        } | undefined = Node__from_ast.AsClassExpression(node);
        const __gotots_store_342 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_115 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_342, "NodeFactory");
        const __gotots_argument_339 = ce;
        const __gotots_store_343: ClassExpression__from_ast["ClassLikeBase"] = (ce ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_340 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_343, "ModifiersBase"));
        const __gotots_argument_341 = ClassExpression__from_ast.Name(ce);
        const __gotots_argument_342 = void 0;
        const __gotots_argument_343 = (ce ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses;
        const __gotots_argument_344 = membersList;
        updatedNode = NodeFactory__from_ast.UpdateClassExpression(__gotots_receiver_115, __gotots_argument_339, __gotots_argument_340, __gotots_argument_341, __gotots_argument_342, __gotots_argument_343, __gotots_argument_344);
    }
    EmitContext__from_printer.SetClassThis(ec, updatedNode, classThis);
    return updatedNode;
}
