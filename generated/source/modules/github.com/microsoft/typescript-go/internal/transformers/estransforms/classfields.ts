import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, ArrowFunction as ArrowFunction__from_ast, BindingElement as BindingElement__from_ast, ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, ComputedPropertyName as ComputedPropertyName__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ExportAssignment as ExportAssignment__from_ast, ForStatement as ForStatement__from_ast, Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, SourceFile as SourceFile__from_ast, SpreadAssignment as SpreadAssignment__from_ast, SpreadElement as SpreadElement__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TryStatement as TryStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { PrivateIdentifierKind as PrivateIdentifierKind__from_printer, SynthesizedComment$Storage as SynthesizedComment__from_printer$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ClassOrConstructorParameterIsDecorated as ClassOrConstructorParameterIsDecorated__from_ast, CreateModifiersFromModifierFlags as CreateModifiersFromModifierFlags__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionStatement as ExpressionStatement__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, HasAbstractModifier as HasAbstractModifier__from_ast, HasAccessorModifier as HasAccessorModifier__from_ast, HasDecorators as HasDecorators__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, Identifier as Identifier__from_ast, IsArrayBindingOrAssignmentElement as IsArrayBindingOrAssignmentElement__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsAutoAccessorPropertyDeclaration as IsAutoAccessorPropertyDeclaration__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsCommaExpression as IsCommaExpression__from_ast, IsCompoundAssignment as IsCompoundAssignment__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInitializedProperty as IsInitializedProperty__from_ast, IsLeftHandSideExpression as IsLeftHandSideExpression__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodOrAccessor as IsMethodOrAccessor__from_ast, IsModifierLike as IsModifierLike__from_ast, IsModifier as IsModifier__from_ast, IsNumericLiteral as IsNumericLiteral__from_ast, IsObjectBindingOrAssignmentElement as IsObjectBindingOrAssignmentElement__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPostfixUnaryExpression as IsPostfixUnaryExpression__from_ast, IsPrefixUnaryExpression as IsPrefixUnaryExpression__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSpreadAssignment as IsSpreadAssignment__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsStatement as IsStatement__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsSuperProperty as IsSuperProperty__from_ast, IsTryStatement as IsTryStatement__from_ast, IsVoidExpression as IsVoidExpression__from_ast, KindAccessorKeyword$constant as KindAccessorKeyword$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOmittedExpression$constant as KindOmittedExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSemicolonClassElement$constant as KindSemicolonClassElement$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsOptionalChain$constant as NodeFlagsOptionalChain$constant__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, SkipParentheses as SkipParentheses__from_ast, SkipPartiallyEmittedExpressions as SkipPartiallyEmittedExpressions__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsLexicalSuper$constant as SubtreeContainsLexicalSuper$constant__from_ast, SubtreeContainsLexicalThis$constant as SubtreeContainsLexicalThis$constant__from_ast, SubtreeContainsLexicalThisOrSuper$constant as SubtreeContainsLexicalThisOrSuper$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast, Visitor as Visitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewTextRange as NewTextRange__from_core, ScriptTargetES2022$constant as ScriptTargetES2022$constant__from_core, ScriptTargetESNext$constant as ScriptTargetESNext$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug, FailBadSyntaxKind as FailBadSyntaxKind__from_debug, Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFIndented$constant as EFIndented$constant__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFNoLeadingComments$constant as EFNoLeadingComments$constant__from_printer, EFNoLexicalArguments$constant as EFNoLexicalArguments$constant__from_printer, EFNoLexicalThis$constant as EFNoLexicalThis$constant__from_printer, EFNoNestedSourceMaps$constant as EFNoNestedSourceMaps$constant__from_printer, EFStartOnNewLine$constant as EFStartOnNewLine$constant__from_printer, EFTransformPrivateStaticElements$constant as EFTransformPrivateStaticElements$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsReservedInNestedScopes$int as GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer, PrivateIdentifierKindAccessor$constant as PrivateIdentifierKindAccessor$constant__from_printer, PrivateIdentifierKindField$constant as PrivateIdentifierKindField$constant__from_printer, PrivateIdentifierKindMethod$constant as PrivateIdentifierKindMethod$constant__from_printer, PrivateIdentifierKindUntransformed$constant as PrivateIdentifierKindUntransformed$constant__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { ExtractModifiers as ExtractModifiers__from_transformers, FindSuperStatementIndexPath as FindSuperStatementIndexPath__from_transformers, GetNonAssignmentOperatorForCompoundAssignment as GetNonAssignmentOperatorForCompoundAssignment__from_transformers, IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsSimpleCopiableExpression as IsSimpleCopiableExpression__from_transformers, IsSimpleInlineableExpression as IsSimpleInlineableExpression__from_transformers, MoveRangePastModifiers as MoveRangePastModifiers__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { Set$Add$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clear$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clear.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/IndexFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_estransforms$privateIdentifierInfo, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$privateIdentifierInfo, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_string_To_PointerTo_Named_estransforms$privateIdentifierInfo, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { isClassThisAssignmentBlock } from "./classthis.js";
import { classHasExplicitlyAssignedName, isClassNamedEvaluationHelperBlock, isNamedEvaluationAnd, transformNamedEvaluation } from "./namedevaluation.js";
import { createAccessorPropertyBackingField } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
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
export class classFacts {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function classFactsNone$constant(): classFacts {
    return new classFacts(0);
}
export function classFactsClassWasDecorated$constant(): classFacts {
    return new classFacts(1);
}
export function classFactsNeedsClassConstructorReference$constant(): classFacts {
    return new classFacts(2);
}
export function classFactsNeedsClassSuperReference$constant(): classFacts {
    return new classFacts(4);
}
export function classFactsNeedsSubstitutionForThisInClassStaticField$constant(): classFacts {
    return new classFacts(8);
}
export function classFactsWillHoistInitializersToConstructor$constant(): classFacts {
    return new classFacts(16);
}
export class privateIdentifierInfo {
    declare private readonly $goType: void;
    public constructor(public kind: PrivateIdentifierKind__from_printer, public brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public isStatic: bool, public isValid: bool, public variableName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public methodName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: privateIdentifierInfo): privateIdentifierInfo {
        return new privateIdentifierInfo($source.kind, $source.brandCheckIdentifier, $source.isStatic, $source.isValid, $source.variableName, $source.methodName, $source.getterName, $source.setterName);
    }
    static $equal($left: privateIdentifierInfo, $right: privateIdentifierInfo): bool {
        return $left.kind.$value === $right.kind.$value &&
            tsonicTypeScriptRuntime.sameLocation($left.brandCheckIdentifier, $right.brandCheckIdentifier) && $left.isStatic === $right.isStatic && $left.isValid === $right.isValid &&
            tsonicTypeScriptRuntime.sameLocation($left.variableName, $right.variableName) &&
            tsonicTypeScriptRuntime.sameLocation($left.methodName, $right.methodName) &&
            tsonicTypeScriptRuntime.sameLocation($left.getterName, $right.getterName) &&
            tsonicTypeScriptRuntime.sameLocation($left.setterName, $right.setterName);
    }
    static $hash($source: privateIdentifierInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.kind.$value));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.brandCheckIdentifier));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isStatic));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isValid));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.variableName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.methodName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.getterName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.setterName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class privateEnvironmentData {
    declare private readonly $goType: void;
    public constructor(public className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public weakSetName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $zero(): privateEnvironmentData {
        return new privateEnvironmentData(void 0, void 0);
    }
    declare private readonly then?: never;
}
export class privateEnvironment {
    declare private readonly $goType: void;
    public constructor(public data: privateEnvironmentData, public members: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined>, public generatedIdentifiers: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined>) {
    }
    declare private readonly then?: never;
}
export class classLexicalEnvironment {
    declare private readonly $goType: void;
    public constructor(public facts: classFacts, public classConstructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public superClassReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export class classLexicalEnv {
    declare private readonly $goType: void;
    public constructor(public previous: classLexicalEnv | undefined, public data: classLexicalEnvironment | undefined, public privateEnv: privateEnvironment | undefined) {
    }
    declare private readonly then?: never;
}
export class classFieldsTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public resolver: ReferenceResolver__from_binder | undefined, public shouldTransformInitializersUsingSet: bool, public shouldTransformInitializersUsingDefine: bool, public shouldTransformInitializers: bool, public shouldTransformPrivateElementsOrClassStaticBlocks: bool, public shouldTransformAutoAccessors: bool, public shouldTransformThisInStaticInitializers: bool, public shouldTransformSuperInStaticInitializers: bool, public shouldTransformPrivateStaticElementsInFile: bool, public legacyDecorators: bool, public pendingExpressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public pendingStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public lexicalEnvironment: classLexicalEnv | undefined, public currentClassContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentClassElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public classAliases: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public enclosingClassDeclarations: Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public inIterationStatement: bool, public insideComputedPropertyName: bool, public parentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public modifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public discardedValueVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public heritageClauseVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public assignmentTargetVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public classElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public accessorFieldResultVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public arrayAssignmentElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public objectAssignmentElementVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public substitutionVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public isAnonymousClassNeedingAssignedName: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$accessPrivateIdentifier(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined {
        for (let env: classLexicalEnv | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment; !(env === undefined); env = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous) {
            if (!((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).privateEnv === undefined)) {
                {
                    const __gotots_results_6 = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifier(tx, (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).privateEnv, name);
                    let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = __gotots_results_6[0];
                    let ok = __gotots_results_6[1];
                    if (ok) {
                        if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindUntransformed$constant__from_printer().$value) {
                            return void 0;
                        }
                        return info;
                    }
                }
            }
        }
        return void 0;
    }
    static $go$private$estransforms$addInstanceMethodStatements(tx: classFieldsTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, methods: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || methods.length === 0) {
            return statements;
        }
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let weakSetName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
        Assert__from_debug(!(weakSetName === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("weakSetName should be set in private identifier environment")]));
        const __gotots_argument_470 = statements;
        const __gotots_store_660 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_661 = (Transformer__from_transformers.Factory(__gotots_store_660.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_145 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_661, "NodeFactory");
        const __gotots_store_662 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_466 = Transformer__from_transformers.Factory(__gotots_store_662.Transformer);
        const __gotots_argument_467 = receiver;
        const __gotots_argument_468 = weakSetName;
        const __gotots_argument_469 = createPrivateInstanceMethodInitializer(__gotots_argument_466, __gotots_argument_467, __gotots_argument_468);
        const __gotots_argument_471 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_145, __gotots_argument_469);
        return __gotots_argument_470.append(void 0, [__gotots_argument_471]);
    }
    static $go$private$estransforms$addPendingExpressions(tx: classFieldsTransformer | undefined, exprs: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, exprs, void 0);
    }
    static $go$private$estransforms$addPrivateIdentifierAutoAccessorToEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lex: classLexicalEnvironment | undefined, env: privateEnvironment | undefined, isStatic: bool, isValid: bool): void {
        let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "_get");
        let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "_set");
        let brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isStatic) {
            brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
            if (brandCheckIdentifier === undefined) {
                brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            }
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("classConstructor should be set in private identifier environment")]));
        }
        else {
            brandCheckIdentifier = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("weakSetName should be set in private identifier environment")]));
        }
        classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindAccessor$constant__from_printer(), brandCheckIdentifier, isStatic, isValid, void 0, void 0, getterName, setterName)));
    }
    static $go$private$estransforms$addPrivateIdentifierGetAccessorToEnvironment(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lex: classLexicalEnvironment | undefined, env: privateEnvironment | undefined, isStatic: bool, isValid: bool, previousInfo: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined): void {
        let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "_get");
        let brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isStatic) {
            brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
            if (brandCheckIdentifier === undefined) {
                brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            }
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("classConstructor should be set in private identifier environment")]));
        }
        else {
            brandCheckIdentifier = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("weakSetName should be set in private identifier environment")]));
        }
        if (!(previousInfo === undefined) && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindAccessor$constant__from_printer().$value && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic === isStatic && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.getterName === undefined) {
            ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.getterName = getterName;
        }
        else {
            classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindAccessor$constant__from_printer(), brandCheckIdentifier, isStatic, isValid, void 0, void 0, getterName, void 0)));
        }
    }
    static $go$private$estransforms$addPrivateIdentifierMethodToEnvironment(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lex: classLexicalEnvironment | undefined, env: privateEnvironment | undefined, isStatic: bool, isValid: bool): void {
        let methodName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "");
        let brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isStatic) {
            brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
            if (brandCheckIdentifier === undefined) {
                brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            }
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("classConstructor should be set in private identifier environment")]));
        }
        else {
            brandCheckIdentifier = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
        }
        classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindMethod$constant__from_printer(), brandCheckIdentifier, isStatic, isValid, void 0, methodName, void 0, void 0)));
    }
    static $go$private$estransforms$addPrivateIdentifierPropertyDeclarationToEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let lex: classLexicalEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx);
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let isStatic = HasStaticModifier__from_ast(node);
        const __gotots_results_16 = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifier(tx, env, name);
        let previousInfo: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = __gotots_results_16[0];
        let isValid = !classFieldsTransformer.$go$private$estransforms$isReservedPrivateName(tx, name) && previousInfo === undefined;
        if (isStatic) {
            let brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
            if (brandCheckIdentifier === undefined) {
                brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            }
            let variableName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "");
            classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindField$constant__from_printer(), brandCheckIdentifier, true, isValid, variableName, void 0, void 0, void 0)));
        }
        else {
            let weakMapName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "");
            classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindField$constant__from_printer(), weakMapName, false, isValid, void 0, void 0, void 0, void 0)));
            const __gotots_receiver_142 = tx;
            const __gotots_store_634 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_141 = Transformer__from_transformers.Factory(__gotots_store_634.Transformer);
            const __gotots_argument_452 = weakMapName;
            const __gotots_store_635 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_636 = (Transformer__from_transformers.Factory(__gotots_store_635.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_140 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_636, "NodeFactory");
            const __gotots_store_637 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_638 = (Transformer__from_transformers.Factory(__gotots_store_637.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_449 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_638, "NodeFactory"), "WeakMap");
            const __gotots_argument_450 = void 0;
            const __gotots_store_639 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_640 = (Transformer__from_transformers.Factory(__gotots_store_639.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_451 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_640, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_453 = NodeFactory__from_ast.NewNewExpression(__gotots_receiver_140, __gotots_argument_449, __gotots_argument_450, __gotots_argument_451);
            const __gotots_argument_454 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_141, __gotots_argument_452, __gotots_argument_453);
            const __gotots_argument_455 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_argument_454]);
            classFieldsTransformer.$go$private$estransforms$addPendingExpressions(__gotots_receiver_142, __gotots_argument_455);
        }
    }
    static $go$private$estransforms$addPrivateIdentifierSetAccessorToEnvironment(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lex: classLexicalEnvironment | undefined, env: privateEnvironment | undefined, isStatic: bool, isValid: bool, previousInfo: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined): void {
        let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForPrivateName(tx, name, "_set");
        let brandCheckIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isStatic) {
            brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
            if (brandCheckIdentifier === undefined) {
                brandCheckIdentifier = (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            }
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("classConstructor should be set in private identifier environment")]));
        }
        else {
            brandCheckIdentifier = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
            Assert__from_debug(!(brandCheckIdentifier === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("weakSetName should be set in private identifier environment")]));
        }
        if (!(previousInfo === undefined) && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindAccessor$constant__from_printer().$value && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic === isStatic && ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.setterName === undefined) {
            ((previousInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.setterName = setterName;
        }
        else {
            classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, name, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindAccessor$constant__from_printer(), brandCheckIdentifier, isStatic, isValid, void 0, void 0, void 0, setterName)));
        }
    }
    static $go$private$estransforms$addPrivateIdentifierToEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let lex: classLexicalEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx);
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        let isStatic = HasStaticModifier__from_ast(node);
        const __gotots_results_15 = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifier(tx, env, name);
        let previousInfo: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = __gotots_results_15[0];
        let isValid = !classFieldsTransformer.$go$private$estransforms$isReservedPrivateName(tx, name) && previousInfo === undefined;
        if (IsAutoAccessorPropertyDeclaration__from_ast(node)) {
            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierAutoAccessorToEnvironment(tx, node, name, lex, env, isStatic, isValid);
        }
        else if (IsPropertyDeclaration__from_ast(node)) {
            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierPropertyDeclarationToEnvironment(tx, node, name);
        }
        else if (IsMethodDeclaration__from_ast(node)) {
            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierMethodToEnvironment(tx, name, lex, env, isStatic, isValid);
        }
        else if (IsGetAccessorDeclaration__from_ast(node)) {
            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierGetAccessorToEnvironment(tx, name, lex, env, isStatic, isValid, previousInfo);
        }
        else if (IsSetAccessorDeclaration__from_ast(node)) {
            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierSetAccessorToEnvironment(tx, name, lex, env, isStatic, isValid, previousInfo);
        }
    }
    static $go$private$estransforms$addPropertyOrClassStaticBlockStatements(tx: classFieldsTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, properties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_range_9 = properties;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_8);
            let property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
            if (IsStatic__from_ast(property) && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
                continue;
            }
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$transformPropertyOrClassStaticBlock(tx, property, receiver);
            if (!(statement === undefined)) {
                statements = statements.append(void 0, [statement]);
            }
        }
        return statements;
    }
    static $go$private$estransforms$classContainsConstructorReference(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_range_5 = Node__from_ast.Members(node);
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_4);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            if (classFieldsTransformer.$go$private$estransforms$memberContainsConstructorReference(tx, member, node)) {
                return true;
            }
        }
        return false;
    }
    static $go$private$estransforms$classExpressionNeedsBlockScopedTemp(tx: classFieldsTransformer | undefined): bool {
        if (!classFieldsTransformer.$go$private$estransforms$requiresBlockScopedVar(tx)) {
            return false;
        }
        const __gotots_range_11 = Node__from_ast.Members((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer);
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
            const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_10);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
            if (IsPropertyDeclaration__from_ast(member) && !HasStaticModifier__from_ast(member) && !(Node__from_ast.Name(member) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(member))) {
                return true;
            }
        }
        return false;
    }
    static $go$private$estransforms$createAccessorPropertyGetRedirector(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_562 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let backingFieldName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(Transformer__from_transformers.Factory(__gotots_store_562.Transformer), PropertyDeclaration__from_ast.Name(node), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage"));
        const __gotots_store_563 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_564 = (Transformer__from_transformers.Factory(__gotots_store_563.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let returnExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_564, "NodeFactory"), receiver, void 0, backingFieldName, NodeFlagsNone$constant__from_ast());
        const __gotots_store_565 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_566 = (Transformer__from_transformers.Factory(__gotots_store_565.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let returnStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_566, "NodeFactory"), returnExpr);
        const __gotots_store_567 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_568 = (Transformer__from_transformers.Factory(__gotots_store_567.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_128 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_568, "NodeFactory");
        const __gotots_store_569 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_570 = (Transformer__from_transformers.Factory(__gotots_store_569.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_401 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_570, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([returnStmt]));
        const __gotots_argument_402 = false;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_128, __gotots_argument_401, __gotots_argument_402);
        const __gotots_store_571 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_572 = (Transformer__from_transformers.Factory(__gotots_store_571.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_129 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_572, "NodeFactory");
        const __gotots_argument_403 = modifiers;
        const __gotots_argument_404 = name;
        const __gotots_argument_405 = void 0;
        const __gotots_store_573 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_574 = (Transformer__from_transformers.Factory(__gotots_store_573.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_406 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_574, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_407 = void 0;
        const __gotots_argument_408 = void 0;
        const __gotots_argument_409 = body;
        return NodeFactory__from_ast.NewGetAccessorDeclaration(__gotots_receiver_129, __gotots_argument_403, __gotots_argument_404, __gotots_argument_405, __gotots_argument_406, __gotots_argument_407, __gotots_argument_408, __gotots_argument_409);
    }
    static $go$private$estransforms$createAccessorPropertySetRedirector(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_575 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let backingFieldName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(Transformer__from_transformers.Factory(__gotots_store_575.Transformer), PropertyDeclaration__from_ast.Name(node), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage"));
        const __gotots_store_576 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_577 = (Transformer__from_transformers.Factory(__gotots_store_576.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_130 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_577, "NodeFactory");
        const __gotots_argument_410 = void 0;
        const __gotots_argument_411 = void 0;
        const __gotots_store_578 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_579 = (Transformer__from_transformers.Factory(__gotots_store_578.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_412 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_579, "NodeFactory"), "value");
        const __gotots_argument_413 = void 0;
        const __gotots_argument_414 = void 0;
        const __gotots_argument_415 = void 0;
        let valueParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_130, __gotots_argument_410, __gotots_argument_411, __gotots_argument_412, __gotots_argument_413, __gotots_argument_414, __gotots_argument_415);
        const __gotots_store_580 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_131 = Transformer__from_transformers.Factory(__gotots_store_580.Transformer);
        const __gotots_store_581 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_582 = (Transformer__from_transformers.Factory(__gotots_store_581.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_416 = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_582, "NodeFactory"), receiver, void 0, backingFieldName, NodeFlagsNone$constant__from_ast());
        const __gotots_store_583 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_584 = (Transformer__from_transformers.Factory(__gotots_store_583.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_417 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_584, "NodeFactory"), "value");
        let assignExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_131, __gotots_argument_416, __gotots_argument_417);
        const __gotots_store_585 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_586 = (Transformer__from_transformers.Factory(__gotots_store_585.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let exprStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_586, "NodeFactory"), assignExpr);
        const __gotots_store_587 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_588 = (Transformer__from_transformers.Factory(__gotots_store_587.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_132 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_588, "NodeFactory");
        const __gotots_store_589 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_590 = (Transformer__from_transformers.Factory(__gotots_store_589.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_418 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_590, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([exprStmt]));
        const __gotots_argument_419 = false;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_132, __gotots_argument_418, __gotots_argument_419);
        const __gotots_store_591 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_592 = (Transformer__from_transformers.Factory(__gotots_store_591.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_133 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_592, "NodeFactory");
        const __gotots_argument_420 = modifiers;
        const __gotots_argument_421 = name;
        const __gotots_argument_422 = void 0;
        const __gotots_store_593 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_594 = (Transformer__from_transformers.Factory(__gotots_store_593.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_423 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_594, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([valueParam]));
        const __gotots_argument_424 = void 0;
        const __gotots_argument_425 = void 0;
        const __gotots_argument_426 = body;
        return NodeFactory__from_ast.NewSetAccessorDeclaration(__gotots_receiver_133, __gotots_argument_420, __gotots_argument_421, __gotots_argument_422, __gotots_argument_423, __gotots_argument_424, __gotots_argument_425, __gotots_argument_426);
    }
    static $go$private$estransforms$createBrandCheckWeakSetForPrivateMethods(tx: classFieldsTransformer | undefined): void {
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let weakSetName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName;
        Assert__from_debug(!(weakSetName === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("weakSetName should be set in private identifier environment")]));
        const __gotots_receiver_139 = tx;
        const __gotots_store_627 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_138 = Transformer__from_transformers.Factory(__gotots_store_627.Transformer);
        const __gotots_argument_445 = weakSetName;
        const __gotots_store_628 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_629 = (Transformer__from_transformers.Factory(__gotots_store_628.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_137 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_629, "NodeFactory");
        const __gotots_store_630 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_631 = (Transformer__from_transformers.Factory(__gotots_store_630.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_442 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_631, "NodeFactory"), "WeakSet");
        const __gotots_argument_443 = void 0;
        const __gotots_store_632 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_633 = (Transformer__from_transformers.Factory(__gotots_store_632.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_444 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_633, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
        const __gotots_argument_446 = NodeFactory__from_ast.NewNewExpression(__gotots_receiver_137, __gotots_argument_442, __gotots_argument_443, __gotots_argument_444);
        const __gotots_argument_447 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_138, __gotots_argument_445, __gotots_argument_446);
        const __gotots_argument_448 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_argument_447]);
        classFieldsTransformer.$go$private$estransforms$addPendingExpressions(__gotots_receiver_139, __gotots_argument_448);
    }
    static $go$private$estransforms$createCallBinding(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsSuperProperty__from_ast(node)) {
            const __gotots_store_371 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_8 = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_371.Transformer));
            const __gotots_results_9 = node;
            return [__gotots_results_8, __gotots_results_9];
        }
        if (IsPropertyAccessExpression__from_ast(node)) {
            let expr: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(node);
            if (shouldBeCapturedInTempVariable(PropertyAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression)) {
                const __gotots_store_372 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                thisArg = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_372.Transformer));
                const __gotots_store_373 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_373.Transformer), thisArg);
                const __gotots_store_374 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_375 = (Transformer__from_transformers.Factory(__gotots_store_374.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_90 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_375, "NodeFactory");
                const __gotots_store_376 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_377 = (Transformer__from_transformers.Factory(__gotots_store_376.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_89 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_377, "NodeFactory");
                const __gotots_store_378 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_279 = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_378.Transformer), thisArg, PropertyAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
                const __gotots_argument_280 = NodeFactory__from_ast.NewParenthesizedExpression(__gotots_receiver_89, __gotots_argument_279);
                const __gotots_argument_281 = void 0;
                const __gotots_argument_282 = PropertyAccessExpression__from_ast.Name(expr);
                const __gotots_argument_283 = NodeFlagsNone$constant__from_ast();
                target = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_90, __gotots_argument_280, __gotots_argument_281, __gotots_argument_282, __gotots_argument_283);
                return [thisArg, target];
            }
            return [PropertyAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression, node];
        }
        const __gotots_store_379 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        thisArg = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_379.Transformer));
        target = node;
        return [thisArg, target];
    }
    static $go$private$estransforms$createCopiableReceiverExpr(tx: classFieldsTransformer | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let readExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let initializeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let clone: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = receiver;
        if (!NodeIsSynthesized__from_ast(receiver)) {
            const __gotots_receiver_85 = receiver;
            const __gotots_store_347 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_270 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_347.Transformer));
            clone = Node__from_ast.Clone(__gotots_receiver_85, __gotots_argument_270);
        }
        if (IsSimpleInlineableExpression__from_transformers(receiver)) {
            return [clone, void 0];
        }
        const __gotots_store_348 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        readExpression = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_348.Transformer));
        const __gotots_store_349 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_349.Transformer), readExpression);
        const __gotots_store_350 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        initializeExpression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_350.Transformer), readExpression, clone);
        return [readExpression, initializeExpression];
    }
    static $go$private$estransforms$createHoistedVariableForClass(tx: classFieldsTransformer | undefined, nameText: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, suffix: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className === undefined)) {
            let prefix = "_" + Node__from_ast.Text((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className) + "_";
            const __gotots_store_521 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            identifier = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_521.Transformer), prefix + nameText, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(24), "", suffix));
        }
        else {
            const __gotots_store_522 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            identifier = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_522.Transformer), "_" + nameText, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(24), "", suffix));
        }
        if (classFieldsTransformer.$go$private$estransforms$requiresBlockScopedVar(tx)) {
            const __gotots_store_523 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_523.Transformer), identifier);
        }
        else {
            const __gotots_store_524 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_524.Transformer), identifier);
        }
        return identifier;
    }
    static $go$private$estransforms$createHoistedVariableForClassFromNode(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, suffix: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
        let prefix = "";
        if (!((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className === undefined)) {
            prefix = "_" + Node__from_ast.Text((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className) + "_";
        }
        else {
            prefix = "_";
        }
        const __gotots_store_739 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNodeEx(Transformer__from_transformers.Factory(__gotots_store_739.Transformer), name, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(24), prefix, suffix));
        if (classFieldsTransformer.$go$private$estransforms$requiresBlockScopedVar(tx)) {
            const __gotots_store_740 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_740.Transformer), identifier);
        }
        else {
            const __gotots_store_741 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_741.Transformer), identifier);
        }
        return identifier;
    }
    static $go$private$estransforms$createHoistedVariableForPrivateName(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, suffix: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_677 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (EmitContext__from_printer.HasAutoGenerateInfo(Transformer__from_transformers.EmitContext(__gotots_store_677.Transformer), name)) {
            return classFieldsTransformer.$go$private$estransforms$createHoistedVariableForClassFromNode(tx, name, suffix);
        }
        let text = Node__from_ast.Text(name);
        if (text.length >= 1 && goStringIndex(text, 0) === 35) {
            text = goStringSlice(text, 1);
        }
        return classFieldsTransformer.$go$private$estransforms$createHoistedVariableForClass(tx, text, name, suffix);
    }
    static $go$private$estransforms$createPrivateIdentifierAccess(tx: classFieldsTransformer | undefined, info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_339 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        receiver = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_339.Transformer), receiver);
        return classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAccessHelper(tx, info, receiver);
    }
    static $go$private$estransforms$createPrivateIdentifierAccessHelper(tx: classFieldsTransformer | undefined, info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_351 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_351.Transformer), receiver, NewTextRange__from_core(-1, Node__from_ast.End(receiver)));
        switch (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value) {
            case "a": {
                const __gotots_store_352 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldGetHelper(Transformer__from_transformers.Factory(__gotots_store_352.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.getterName);
                break;
            }
            case "m": {
                const __gotots_store_353 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldGetHelper(Transformer__from_transformers.Factory(__gotots_store_353.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.methodName);
                break;
            }
            case "f": {
                let f: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic) {
                    f = ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.variableName;
                }
                const __gotots_store_354 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldGetHelper(Transformer__from_transformers.Factory(__gotots_store_354.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, f);
                break;
            }
            case "untransformed": {
                Fail__from_debug("Access helpers should not be created for untransformed private elements");
                return void 0;
                break;
            }
        }
        AssertNever__from_debug(new $goInterfaceAdapter$PointerTo_Named_estransforms$privateIdentifierInfo(info), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Unknown private element type")]));
        return void 0;
    }
    static $go$private$estransforms$createPrivateIdentifierAssignment(tx: classFieldsTransformer | undefined, info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, operator: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_355 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        receiver = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_355.Transformer), receiver);
        const __gotots_store_356 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        right = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_356.Transformer), right);
        if (IsCompoundAssignment__from_ast(operator)) {
            const __gotots_results_7 = classFieldsTransformer.$go$private$estransforms$createCopiableReceiverExpr(tx, receiver);
            let readExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_7[0];
            let initializeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_7[1];
            if (!(initializeExpression === undefined)) {
                receiver = initializeExpression;
            }
            else {
                receiver = readExpression;
            }
            const __gotots_store_357 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_358 = (Transformer__from_transformers.Factory(__gotots_store_357.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_86 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_358, "NodeFactory");
            const __gotots_argument_271 = void 0;
            const __gotots_argument_272 = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAccessHelper(tx, info, readExpression);
            const __gotots_argument_273 = void 0;
            const __gotots_store_359 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_360 = (Transformer__from_transformers.Factory(__gotots_store_359.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_274 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_360, "NodeFactory"), GetNonAssignmentOperatorForCompoundAssignment__from_transformers(operator));
            const __gotots_argument_275 = right;
            right = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_86, __gotots_argument_271, __gotots_argument_272, __gotots_argument_273, __gotots_argument_274, __gotots_argument_275);
        }
        const __gotots_store_361 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_361.Transformer), receiver, NewTextRange__from_core(-1, Node__from_ast.End(receiver)));
        switch (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value) {
            case "a": {
                const __gotots_store_362 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldSetHelper(Transformer__from_transformers.Factory(__gotots_store_362.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, right, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.setterName);
                break;
            }
            case "m": {
                const __gotots_store_363 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldSetHelper(Transformer__from_transformers.Factory(__gotots_store_363.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, right, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, void 0);
                break;
            }
            case "f": {
                let f: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic) {
                    f = ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.variableName;
                }
                const __gotots_store_364 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewClassPrivateFieldSetHelper(Transformer__from_transformers.Factory(__gotots_store_364.Transformer), receiver, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, right, ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind, f);
                break;
            }
            case "untransformed": {
                Fail__from_debug("Access helpers should not be created for untransformed private elements");
                return void 0;
                break;
            }
        }
        AssertNever__from_debug(new $goInterfaceAdapter$PointerTo_Named_estransforms$privateIdentifierInfo(info), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Unknown private element type")]));
        return void 0;
    }
    static $go$private$estransforms$endClassLexicalEnvironment(tx: classFieldsTransformer | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous;
    }
    static $go$private$estransforms$extractNonStaticNonAccessorModifiers(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        const __gotots_store_391 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_286 = Transformer__from_transformers.EmitContext(__gotots_store_391.Transformer);
        const __gotots_argument_287 = Node__from_ast.Modifiers(node);
        const __gotots_argument_288 = 4294966527;
        return ExtractModifiers__from_transformers(__gotots_argument_286, __gotots_argument_287, __gotots_argument_288);
    }
    static $go$private$estransforms$generateInitializedPropertyExpressionsOrClassStaticBlock(tx: classFieldsTransformer | undefined, propertiesOrClassStaticBlocks: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_12 = propertiesOrClassStaticBlocks;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
            const __gotots_range_value_13 = __gotots_range_12.get(__gotots_range_index_11);
            let property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsClassStaticBlockDeclaration__from_ast(property)) {
                expression = classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, property, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return classFieldsTransformer.$go$private$estransforms$transformClassStaticBlockDeclaration($argument0, $argument1);
                }, property);
            }
            else {
                expression = classFieldsTransformer.$go$private$estransforms$transformProperty(tx, Node__from_ast.AsPropertyDeclaration(property), receiver);
            }
            if (expression === undefined) {
                continue;
            }
            const __gotots_store_530 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginalEx(Transformer__from_transformers.EmitContext(__gotots_store_530.Transformer), expression, property, true);
            const __gotots_store_531 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(__gotots_store_531.Transformer), expression, property);
            expressions = expressions.append(void 0, [expression]);
        }
        return expressions;
    }
    static $go$private$estransforms$getClassFacts(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): classFacts {
        let facts = classFactsNone$constant();
        const __gotots_store_525 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_525.Transformer), node);
        if (IsClassLike__from_ast(original) && ClassOrConstructorParameterIsDecorated__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators, original)) {
            facts = new classFacts(facts.$value | 1);
        }
        let __gotots_logical_result_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks;
        if (__gotots_logical_result_11) {
            const __gotots_store_526 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_380 = Transformer__from_transformers.EmitContext(__gotots_store_526.Transformer);
            const __gotots_argument_381 = node;
            let __gotots_logical_result_10 = classHasClassThisAssignment(__gotots_argument_380, __gotots_argument_381);
            if (!__gotots_logical_result_10) {
                const __gotots_store_527 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_382 = Transformer__from_transformers.EmitContext(__gotots_store_527.Transformer);
                const __gotots_argument_383 = node;
                __gotots_logical_result_10 = classHasExplicitlyAssignedName(__gotots_argument_382, __gotots_argument_383);
            }
            __gotots_logical_result_11 = (__gotots_logical_result_10);
        }
        if (__gotots_logical_result_11) {
            facts = new classFacts(facts.$value | 2);
        }
        let containsPublicInstanceFields = false;
        let containsInitializedPublicInstanceFields = false;
        let containsInstancePrivateElements = false;
        let containsInstanceAutoAccessors = false;
        const __gotots_range_10 = Node__from_ast.Members(node);
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
            const __gotots_range_value_11 = __gotots_range_10.get(__gotots_range_index_9);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
            if (IsStatic__from_ast(member)) {
                if (!(Node__from_ast.Name(member) === undefined) && (IsPrivateIdentifier__from_ast(Node__from_ast.Name(member)) || IsAutoAccessorPropertyDeclaration__from_ast(member)) && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
                    facts = new classFacts(facts.$value | 2);
                }
                else {
                    let __gotots_logical_result_12 = IsAutoAccessorPropertyDeclaration__from_ast(member) && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformAutoAccessors && Node__from_ast.Name(node) === undefined;
                    if (__gotots_logical_result_12) {
                        const __gotots_store_528 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        __gotots_logical_result_12 = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_528.Transformer), node) === undefined;
                    }
                    if (__gotots_logical_result_12) {
                        facts = new classFacts(facts.$value | 2);
                    }
                }
                if (IsPropertyDeclaration__from_ast(member) || IsClassStaticBlockDeclaration__from_ast(member)) {
                    if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformThisInStaticInitializers && !((Node__from_ast.SubtreeFacts(member) & SubtreeContainsLexicalThis$constant__from_ast()) >>> 0 === 0)) {
                        facts = new classFacts(facts.$value | 8);
                        if (((void classFacts,
                            facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                            ===
                                ((void classFacts,
                                    0) as int)) {
                            facts = new classFacts(facts.$value | 2);
                        }
                    }
                    if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((Node__from_ast.SubtreeFacts(member) & SubtreeContainsLexicalSuper$constant__from_ast()) >>> 0 === 0)) {
                        if (((void classFacts,
                            facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                            ===
                                ((void classFacts,
                                    0) as int)) {
                            facts = new classFacts(facts.$value | 6);
                        }
                    }
                }
            }
            else {
                const __gotots_store_529 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_384 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_529.Transformer), member);
                if (!HasAbstractModifier__from_ast(__gotots_argument_384)) {
                    if (IsAutoAccessorPropertyDeclaration__from_ast(member)) {
                        containsInstanceAutoAccessors = true;
                        containsInstancePrivateElements = containsInstancePrivateElements || IsPrivateIdentifierClassElementDeclaration__from_ast(member);
                    }
                    else if (IsPrivateIdentifierClassElementDeclaration__from_ast(member)) {
                        containsInstancePrivateElements = true;
                        if (classFieldsTransformer.$go$private$estransforms$memberContainsConstructorReference(tx, member, node)) {
                            facts = new classFacts(facts.$value | 2);
                        }
                    }
                    else if (IsPropertyDeclaration__from_ast(member)) {
                        containsPublicInstanceFields = true;
                        containsInitializedPublicInstanceFields = containsInitializedPublicInstanceFields || !(Node__from_ast.Initializer(member) === undefined);
                    }
                }
            }
        }
        let willHoistInitializersToConstructor = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingDefine && containsPublicInstanceFields) || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingSet && containsInitializedPublicInstanceFields) || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks && containsInstancePrivateElements) || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks && containsInstanceAutoAccessors && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformAutoAccessors);
        if (willHoistInitializersToConstructor) {
            facts = new classFacts(facts.$value | 16);
        }
        return facts;
    }
    static $go$private$estransforms$getClassLexicalEnvironment(tx: classFieldsTransformer | undefined): classLexicalEnvironment | undefined {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined), RuntimeSlice.nil<GoInterface | undefined>());
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data = new classLexicalEnvironment(new classFacts(0), void 0, void 0, void 0);
        }
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
    }
    static $go$private$estransforms$getHoistedFunctionName(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(!(Node__from_ast.Name(node) === undefined) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(node)), RuntimeSlice.nil<GoInterface | undefined>());
        let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, Node__from_ast.Name(node));
        Assert__from_debug(!(info === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Undeclared private name for property declaration.")]));
        if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindMethod$constant__from_printer().$value) {
            return ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.methodName;
        }
        if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindAccessor$constant__from_printer().$value) {
            if (IsGetAccessorDeclaration__from_ast(node)) {
                return ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.getterName;
            }
            if (IsSetAccessorDeclaration__from_ast(node)) {
                return ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.setterName;
            }
        }
        return void 0;
    }
    static $go$private$estransforms$getPrivateIdentifier(tx: classFieldsTransformer | undefined, env: privateEnvironment | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined,
        bool
    ] {
        const __gotots_store_532 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (EmitContext__from_printer.HasAutoGenerateInfo(Transformer__from_transformers.EmitContext(__gotots_store_532.Transformer), name)) {
            const __gotots_map_0 = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedIdentifiers;
            const __gotots_store_533 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_map_1 = EmitContext__from_printer.GetNodeForGeneratedName(Transformer__from_transformers.EmitContext(__gotots_store_533.Transformer), name);
            const __gotots_results_12 = __gotots_map_0.lookupOk(__gotots_map_1);
            let info__shadow_1: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = __gotots_results_12[0];
            let ok__shadow_1 = __gotots_results_12[1];
            return [info__shadow_1, ok__shadow_1];
        }
        const __gotots_results_13 = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).members.lookupOk(Node__from_ast.Text(name));
        let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = __gotots_results_13[0];
        let ok = __gotots_results_13[1];
        return [info, ok];
    }
    static $go$private$estransforms$getPrivateIdentifierEnvironment(tx: classFieldsTransformer | undefined): privateEnvironment | undefined {
        Assert__from_debug(!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined), RuntimeSlice.nil<GoInterface | undefined>());
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).privateEnv === undefined) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).privateEnv = new privateEnvironment(privateEnvironmentData.$zero(), $goMap$MapOf_string_To_PointerTo_Named_estransforms$privateIdentifierInfo.make(0, []), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$privateIdentifierInfo.nil());
        }
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).privateEnv;
    }
    static $go$private$estransforms$getPrivateInstanceMethodsAndAccessors(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return Filter$PointerTo_Named_ast$Node(Node__from_ast.Members(node), isNonStaticMethodOrAccessorWithPrivateName);
    }
    static $go$private$estransforms$getProperties(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, requireInitializer: bool, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_15 = Node__from_ast.Members(node);
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_15.length; __gotots_range_index_14++) {
            const __gotots_range_value_16 = __gotots_range_15.get(__gotots_range_index_14);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
            if (IsPropertyDeclaration__from_ast(member) && (!requireInitializer || !(Node__from_ast.Initializer(member) === undefined)) && HasStaticModifier__from_ast(member) === isStatic) {
                result = result.append(void 0, [member]);
            }
        }
        return result;
    }
    static $go$private$estransforms$getPropertyNameExpressionIfNeeded(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, shouldHoist: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!IsComputedPropertyName__from_ast(name)) {
            return void 0;
        }
        const __gotots_store_609 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_429 = Transformer__from_transformers.EmitContext(__gotots_store_609.Transformer);
        const __gotots_argument_430 = name;
        let cacheAssignment: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = findComputedPropertyNameCacheAssignment(__gotots_argument_429, __gotots_argument_430);
        let savedLexicalEnvironment: classLexicalEnv | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment;
        let savedInsideComputedPropertyName = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName = true;
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous === undefined)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous;
        }
        const __gotots_store_610 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_610.Transformer), Node__from_ast.Expression(name));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = savedLexicalEnvironment;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName = savedInsideComputedPropertyName;
        let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipPartiallyEmittedExpressions__from_ast(expression);
        let inlinable = IsSimpleInlineableExpression__from_transformers(innerExpression);
        let __gotots_logical_result_14 = !(cacheAssignment === undefined);
        if (!__gotots_logical_result_14) {
            let __gotots_logical_result_13 = IsAssignmentExpression__from_ast(innerExpression, true) && IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(innerExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            if (__gotots_logical_result_13) {
                const __gotots_store_611 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_431 = Transformer__from_transformers.EmitContext(__gotots_store_611.Transformer);
                const __gotots_argument_432 = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(innerExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                __gotots_logical_result_13 = IsGeneratedIdentifier__from_transformers(__gotots_argument_431, __gotots_argument_432);
            }
            __gotots_logical_result_14 = (__gotots_logical_result_13);
        }
        let alreadyTransformed = __gotots_logical_result_14;
        if (!alreadyTransformed && !inlinable && shouldHoist) {
            const __gotots_store_612 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let generatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_612.Transformer), name);
            if (classFieldsTransformer.$go$private$estransforms$requiresBlockScopedVar(tx)) {
                const __gotots_store_613 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_613.Transformer), generatedName);
            }
            else {
                const __gotots_store_614 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_614.Transformer), generatedName);
            }
            const __gotots_store_615 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_615.Transformer), generatedName, expression);
        }
        if (inlinable || IsIdentifier__from_ast(innerExpression)) {
            return void 0;
        }
        return expression;
    }
    static $go$private$estransforms$getStaticPropertiesAndClassStaticBlock(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_1 = Node__from_ast.Members(node);
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            if (IsClassStaticBlockDeclaration__from_ast(member) || (IsPropertyDeclaration__from_ast(member) && HasStaticModifier__from_ast(member))) {
                result = result.append(void 0, [member]);
            }
        }
        return result;
    }
    static $go$private$estransforms$injectPendingExpressions(tx: classFieldsTransformer | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
            if (IsParenthesizedExpression__from_ast(expression)) {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.append(void 0, [Node__from_ast.Expression(expression)]);
                const __gotots_store_436 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_437 = (Transformer__from_transformers.Factory(__gotots_store_436.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_102 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_437, "NodeFactory");
                const __gotots_argument_310 = Node__from_ast.AsParenthesizedExpression(expression);
                const __gotots_store_438 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_311 = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_438.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions);
                expression = NodeFactory__from_ast.UpdateParenthesizedExpression(__gotots_receiver_102, __gotots_argument_310, __gotots_argument_311);
            }
            else {
                let exprs = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.append(void 0, [expression]);
                const __gotots_store_439 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_439.Transformer), exprs);
            }
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        return expression;
    }
    static $go$private$estransforms$isAnonymousClassNeedingAssignedNameWorker(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (IsClassExpression__from_ast(node) && Node__from_ast.Name(node) === undefined) {
            let staticPropertiesOrClassStaticBlocks = classFieldsTransformer.$go$private$estransforms$getStaticPropertiesAndClassStaticBlock(tx, node);
            if (Some$PointerTo_Named_ast$Node(staticPropertiesOrClassStaticBlocks, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_12 = Transformer__from_transformers.EmitContext(__gotots_store_13.Transformer);
                const __gotots_argument_13 = n;
                return isClassNamedEvaluationHelperBlock(__gotots_argument_12, __gotots_argument_13);
            })) {
                return false;
            }
            let hasTransformableStatics = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || classFieldsTransformer.$go$private$estransforms$nodeHasTransformPrivateStaticElementsFlag(tx, node)) && Some$PointerTo_Named_ast$Node(staticPropertiesOrClassStaticBlocks, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return IsClassStaticBlockDeclaration__from_ast(n) || IsPrivateIdentifierClassElementDeclaration__from_ast(n) || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializers && IsInitializedProperty__from_ast(n);
            });
            return hasTransformableStatics;
        }
        return false;
    }
    static $go$private$estransforms$isReservedPrivateName(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_20 = IsPrivateIdentifier__from_ast(node);
        if (__gotots_logical_result_20) {
            const __gotots_store_676 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_logical_result_20 = EmitContext__from_printer.HasAutoGenerateInfo(Transformer__from_transformers.EmitContext(__gotots_store_676.Transformer), node);
        }
        return !(__gotots_logical_result_20) && Node__from_ast.Text(node) === "#constructor";
    }
    static $go$private$estransforms$memberContainsConstructorReference(tx: classFieldsTransformer | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, classDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_623 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let classOriginal: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_623.Transformer), classDecl);
        let className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(classDecl);
        let check: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined;
        check = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            if (IsIdentifier__from_ast(n) && !tsonicTypeScriptRuntime.sameLocation(n, className)) {
                const __gotots_receiver_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_argument_437 = n;
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_136).GetReferencedValueDeclaration(__gotots_argument_437);
                if (tsonicTypeScriptRuntime.sameLocation(decl, classOriginal)) {
                    return true;
                }
            }
            if (IsPropertyAccessExpression__from_ast(n)) {
                const __gotots_callee_5 = check;
                const __gotots_argument_438 = Node__from_ast.Expression(n);
                return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_438);
            }
            return Node__from_ast.ForEachChild(n, new Visitor__from_ast(check));
        };
        if (IsClassStaticBlockDeclaration__from_ast(member)) {
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsClassStaticBlockDeclaration(member) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body;
            let __gotots_logical_result_15 = !(body === undefined);
            if (__gotots_logical_result_15) {
                const __gotots_callee_6 = check;
                const __gotots_argument_439 = (void Node__from_ast.AsNode,
                    body);
                __gotots_logical_result_15 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_439);
            }
            if (__gotots_logical_result_15) {
                return true;
            }
        }
        else {
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(member);
            let __gotots_logical_result_16 = !(body === undefined);
            if (__gotots_logical_result_16) {
                const __gotots_callee_7 = check;
                const __gotots_argument_440 = body;
                __gotots_logical_result_16 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_440);
            }
            if (__gotots_logical_result_16) {
                return true;
            }
        }
        if (IsPropertyDeclaration__from_ast(member)) {
            let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(member);
            let __gotots_logical_result_17 = !(init === undefined);
            if (__gotots_logical_result_17) {
                const __gotots_callee_8 = check;
                const __gotots_argument_441 = init;
                __gotots_logical_result_17 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_441);
            }
            if (__gotots_logical_result_17) {
                return true;
            }
        }
        return false;
    }
    static $go$private$estransforms$nodeHasTransformPrivateStaticElementsFlag(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_264 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_2 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_264.Transformer), node);
        const __gotots_binary_operand_3 = EFTransformPrivateStaticElements$constant__from_printer();
        return !((__gotots_binary_operand_2 & __gotots_binary_operand_3) >>> 0 === 0);
    }
    static $go$private$estransforms$popNode(tx: classFieldsTransformer | undefined, grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = grandparentNode;
    }
    static $go$private$estransforms$pushNode(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        grandparentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = node;
        return grandparentNode;
    }
    static $go$private$estransforms$requiresBlockScopedVar(tx: classFieldsTransformer | undefined): bool {
        return (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer === undefined) && IsClassExpression__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer);
    }
    static $go$private$estransforms$setClassElementAndVisitEachChild(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, node, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return classFieldsTransformer.$go$private$estransforms$visitEachChildOfNode($argument0, $argument1);
        }, node);
    }
    static $go$private$estransforms$setCurrentClassElementAnd(tx: classFieldsTransformer | undefined, classElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: (($0: classFieldsTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!tsonicTypeScriptRuntime.sameLocation(classElement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement)) {
            let saved: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = classElement;
            const __gotots_callee_2 = visitor;
            const __gotots_argument_192 = tx;
            const __gotots_argument_193 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_192, __gotots_argument_193);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = saved;
            return result;
        }
        const __gotots_callee_3 = visitor;
        const __gotots_argument_194 = tx;
        const __gotots_argument_195 = node;
        return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_194, __gotots_argument_195);
    }
    static $go$private$estransforms$setCurrentClassElementAndVisitStatements(tx: classFieldsTransformer | undefined, classElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let savedCurrentClassElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = classElement;
        const __gotots_store_678 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_20 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_678.Transformer), statements);
        let result = __gotots_results_20[0];
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = savedCurrentClassElement;
        return result;
    }
    static $go$private$estransforms$setInIterationStatementAnd(tx: classFieldsTransformer | undefined, inIteration: bool, visitor: (($0: classFieldsTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement !== inIteration) {
            let saved = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = inIteration;
            const __gotots_callee_0 = visitor;
            const __gotots_argument_181 = tx;
            const __gotots_argument_182 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_181, __gotots_argument_182);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = saved;
            return result;
        }
        const __gotots_callee_1 = visitor;
        const __gotots_argument_183 = tx;
        const __gotots_argument_184 = node;
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_183, __gotots_argument_184);
    }
    static $go$private$estransforms$setPrivateIdentifier(tx: classFieldsTransformer | undefined, env: privateEnvironment | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined): void {
        const __gotots_store_624 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (EmitContext__from_printer.HasAutoGenerateInfo(Transformer__from_transformers.EmitContext(__gotots_store_624.Transformer), name)) {
            if ((env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedIdentifiers.isNil()) {
                (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedIdentifiers = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$privateIdentifierInfo.make(0, []);
            }
            const __gotots_store_626 = (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedIdentifiers;
            const __gotots_store_625 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_626.store(EmitContext__from_printer.GetNodeForGeneratedName(Transformer__from_transformers.EmitContext(__gotots_store_625.Transformer), name), info);
        }
        else {
            (env ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).members.store(Node__from_ast.Text(name), info);
        }
    }
    static $go$private$estransforms$shouldAlwaysTransformPrivateStaticElements(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_7 = HasStaticModifier__from_ast(node);
        if (__gotots_logical_result_7) {
            const __gotots_store_392 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_binary_operand_4 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_392.Transformer), node);
            const __gotots_binary_operand_5 = EFTransformPrivateStaticElements$constant__from_printer();
            __gotots_logical_result_7 = !((__gotots_binary_operand_4 & __gotots_binary_operand_5) >>> 0 === 0);
        }
        return __gotots_logical_result_7;
    }
    static $go$private$estransforms$shouldTransformAutoAccessorsInCurrentClass(tx: classFieldsTransformer | undefined): bool {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformAutoAccessors) {
            return true;
        }
        return !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) && !(((void classFacts,
            (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsWillHoistInitializersToConstructor$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int));
    }
    static $go$private$estransforms$shouldTransformClassElementToWeakMap(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            return true;
        }
        return classFieldsTransformer.$go$private$estransforms$shouldAlwaysTransformPrivateStaticElements(tx, node);
    }
    static $go$private$estransforms$startClassLexicalEnvironment(tx: classFieldsTransformer | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = new classLexicalEnv((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment, void 0, void 0);
    }
    static $go$private$estransforms$transformAutoAccessor(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_393 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_93 = Transformer__from_transformers.EmitContext(__gotots_store_393.Transformer);
        const __gotots_store_394 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_289 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_394, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let commentRange = EmitContext__from_printer.CommentRange(__gotots_receiver_93, __gotots_argument_289);
        const __gotots_store_395 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_94 = Transformer__from_transformers.EmitContext(__gotots_store_395.Transformer);
        const __gotots_store_396 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_290 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_396, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let sourceMapRange = EmitContext__from_printer.SourceMapRange(__gotots_receiver_94, __gotots_argument_290);
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyDeclaration__from_ast.Name(node);
        let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = name;
        let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = name;
        if (IsComputedPropertyName__from_ast(name) && !IsSimpleInlineableExpression__from_transformers(Node__from_ast.Expression(name))) {
            const __gotots_store_397 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_291 = Transformer__from_transformers.EmitContext(__gotots_store_397.Transformer);
            const __gotots_argument_292 = name;
            let cacheAssignment: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = findComputedPropertyNameCacheAssignment(__gotots_argument_291, __gotots_argument_292);
            if (!(cacheAssignment === undefined)) {
                const __gotots_store_398 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_399 = (Transformer__from_transformers.Factory(__gotots_store_398.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_95 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_399, "NodeFactory");
                const __gotots_argument_293 = Node__from_ast.AsComputedPropertyName(name);
                const __gotots_store_400 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_294 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_400.Transformer), Node__from_ast.Expression(name));
                getterName = NodeFactory__from_ast.UpdateComputedPropertyName(__gotots_receiver_95, __gotots_argument_293, __gotots_argument_294);
                const __gotots_store_401 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_402 = (Transformer__from_transformers.Factory(__gotots_store_401.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                setterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_402, "NodeFactory"), Node__from_ast.AsComputedPropertyName(name), BinaryExpression__from_ast.$storageOf(((cacheAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            }
            else {
                const __gotots_store_403 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_403.Transformer));
                const __gotots_store_404 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_404.Transformer), temp, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_405 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_405.Transformer), temp);
                const __gotots_store_406 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_406.Transformer), Node__from_ast.Expression(name));
                const __gotots_store_407 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_407.Transformer), temp, expression);
                const __gotots_store_408 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_408.Transformer), assignment, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_409 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_410 = (Transformer__from_transformers.Factory(__gotots_store_409.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                getterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_410, "NodeFactory"), Node__from_ast.AsComputedPropertyName(name), assignment);
                const __gotots_store_411 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_412 = (Transformer__from_transformers.Factory(__gotots_store_411.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                setterName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_412, "NodeFactory"), Node__from_ast.AsComputedPropertyName(name), temp);
            }
        }
        const __gotots_receiver_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_413 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_295 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_413, "NamedMemberBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_96, __gotots_argument_295);
        const __gotots_store_414 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_296 = Transformer__from_transformers.Factory(__gotots_store_414.Transformer);
        const __gotots_argument_297 = node;
        const __gotots_argument_298 = modifiers;
        const __gotots_argument_299: PropertyDeclaration__from_ast["Initializer"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
        let backingField: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createAccessorPropertyBackingField(__gotots_argument_296, __gotots_argument_297, __gotots_argument_298, __gotots_argument_299);
        const __gotots_store_415 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_97 = Transformer__from_transformers.EmitContext(__gotots_store_415.Transformer);
        const __gotots_argument_300 = backingField;
        const __gotots_store_416 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_301 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_416, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_97, __gotots_argument_300, __gotots_argument_301);
        const __gotots_store_417 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_417.Transformer), backingField, EFNoComments$constant__from_printer());
        const __gotots_store_418 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_418.Transformer), backingField, TextRange__from_core.$copy(sourceMapRange));
        let receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_store_419 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_302 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_419, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (IsStatic__from_ast(__gotots_argument_302)) {
            receiver = classFieldsTransformer.$go$private$estransforms$tryGetClassThis(tx);
            if (receiver === undefined) {
                const __gotots_store_420 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                receiver = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_420.Transformer));
            }
        }
        else {
            const __gotots_store_421 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            receiver = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_421.Transformer));
        }
        let getter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createAccessorPropertyGetRedirector(tx, node, modifiers, getterName, receiver);
        const __gotots_store_422 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_98 = Transformer__from_transformers.EmitContext(__gotots_store_422.Transformer);
        const __gotots_argument_303 = getter;
        const __gotots_store_423 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_304 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_423, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_98, __gotots_argument_303, __gotots_argument_304);
        const __gotots_store_424 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_424.Transformer), getter, TextRange__from_core.$copy(commentRange));
        const __gotots_store_425 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_425.Transformer), getter, TextRange__from_core.$copy(sourceMapRange));
        let setterModifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (!(modifiers === undefined)) {
            const __gotots_store_426 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_427 = (Transformer__from_transformers.Factory(__gotots_store_426.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_100 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_427, "NodeFactory");
            const __gotots_argument_305 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).ModifierFlags;
            const __gotots_store_428 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_429 = (Transformer__from_transformers.Factory(__gotots_store_428.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_99 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_429, "NodeFactory");
            const __gotots_argument_306 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return NodeFactory__from_ast.NewModifier(__gotots_receiver_99, $argument0);
            };
            const __gotots_argument_307 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_305, __gotots_argument_306);
            setterModifiers = NodeFactory__from_ast.NewModifierList(__gotots_receiver_100, __gotots_argument_307);
        }
        let setter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createAccessorPropertySetRedirector(tx, node, setterModifiers, setterName, receiver);
        const __gotots_store_430 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_101 = Transformer__from_transformers.EmitContext(__gotots_store_430.Transformer);
        const __gotots_argument_308 = setter;
        const __gotots_store_431 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_309 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_431, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_101, __gotots_argument_308, __gotots_argument_309);
        const __gotots_store_432 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_432.Transformer), setter, EFNoComments$constant__from_printer());
        const __gotots_store_433 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_433.Transformer), setter, TextRange__from_core.$copy(sourceMapRange));
        const __gotots_results_10 = NodeVisitor__from_ast.VisitSlice((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).accessorFieldResultVisitor, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([backingField, getter, setter]));
        let visited = __gotots_results_10[0];
        const __gotots_store_434 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_435 = (Transformer__from_transformers.Factory(__gotots_store_434.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_435, "NodeFactory"), visited);
    }
    static $go$private$estransforms$transformClassMembers(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let prologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_store_487 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_6 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_487.Transformer), node);
        const __gotots_binary_operand_7 = EFTransformPrivateStaticElements$constant__from_printer();
        let shouldTransformPrivateStaticElementsInClass = !((__gotots_binary_operand_6 & __gotots_binary_operand_7) >>> 0 === 0);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile) {
            const __gotots_range_6 = Node__from_ast.Members(node);
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_5);
                let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                if (IsPrivateIdentifierClassElementDeclaration__from_ast(member)) {
                    if (classFieldsTransformer.$go$private$estransforms$shouldTransformClassElementToWeakMap(tx, member)) {
                        classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierToEnvironment(tx, member);
                    }
                    else {
                        let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
                        classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, Node__from_ast.Name(member), tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindUntransformed$constant__from_printer(), void 0, false, false, void 0, void 0, void 0, void 0)));
                    }
                }
            }
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
                if (classFieldsTransformer.$go$private$estransforms$getPrivateInstanceMethodsAndAccessors(tx, node).length > 0) {
                    classFieldsTransformer.$go$private$estransforms$createBrandCheckWeakSetForPrivateMethods(tx);
                }
            }
            if (classFieldsTransformer.$go$private$estransforms$shouldTransformAutoAccessorsInCurrentClass(tx)) {
                const __gotots_range_7 = Node__from_ast.Members(node);
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                    const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_6);
                    let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                    if (IsAutoAccessorPropertyDeclaration__from_ast(member)) {
                        const __gotots_store_488 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let storageName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(Transformer__from_transformers.Factory(__gotots_store_488.Transformer), Node__from_ast.Name(member), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage"));
                        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || shouldTransformPrivateStaticElementsInClass && HasStaticModifier__from_ast(member)) {
                            classFieldsTransformer.$go$private$estransforms$addPrivateIdentifierPropertyDeclarationToEnvironment(tx, member, storageName);
                        }
                        else {
                            let env: privateEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx);
                            {
                                const __gotots_results_11 = classFieldsTransformer.$go$private$estransforms$getPrivateIdentifier(tx, env, storageName);
                                let ok = __gotots_results_11[1];
                                if (!ok) {
                                    classFieldsTransformer.$go$private$estransforms$setPrivateIdentifier(tx, env, storageName, tsonicTypeScriptRuntime.location<privateIdentifierInfo>(new privateIdentifierInfo(PrivateIdentifierKindUntransformed$constant__from_printer(), void 0, false, false, void 0, void 0, void 0, void 0)));
                                }
                            }
                        }
                    }
                }
            }
        }
        members = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor, Node__from_ast.MemberList(node));
        let syntheticConstructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsConstructorDeclaration__from_ast)) {
            syntheticConstructor = classFieldsTransformer.$go$private$estransforms$transformConstructor(tx, void 0, node);
        }
        let syntheticStaticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
            const __gotots_store_489 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_490 = (Transformer__from_transformers.Factory(__gotots_store_489.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_117 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_490, "NodeFactory");
            const __gotots_store_491 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_358 = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_491.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_117, __gotots_argument_358);
            if (!((Node__from_ast.SubtreeFacts(statement) & SubtreeContainsLexicalThisOrSuper$constant__from_ast()) >>> 0 === 0)) {
                const __gotots_store_492 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_492.Transformer));
                const __gotots_store_493 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_493.Transformer), temp);
                const __gotots_store_494 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_495 = (Transformer__from_transformers.Factory(__gotots_store_494.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_119 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_495, "NodeFactory");
                const __gotots_argument_361 = void 0;
                const __gotots_argument_362 = void 0;
                const __gotots_store_496 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_497 = (Transformer__from_transformers.Factory(__gotots_store_496.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_363 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_497, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_364 = void 0;
                const __gotots_argument_365 = void 0;
                const __gotots_store_498 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_499 = (Transformer__from_transformers.Factory(__gotots_store_498.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_366 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_499, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
                const __gotots_store_500 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_501 = (Transformer__from_transformers.Factory(__gotots_store_500.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_118 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_501, "NodeFactory");
                const __gotots_store_502 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_503 = (Transformer__from_transformers.Factory(__gotots_store_502.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_359 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_503, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
                const __gotots_argument_360 = false;
                const __gotots_argument_367 = NodeFactory__from_ast.NewBlock(__gotots_receiver_118, __gotots_argument_359, __gotots_argument_360);
                let arrow: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_119, __gotots_argument_361, __gotots_argument_362, __gotots_argument_363, __gotots_argument_364, __gotots_argument_365, __gotots_argument_366, __gotots_argument_367);
                const __gotots_store_504 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                prologue = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_504.Transformer), temp, arrow);
                const __gotots_store_505 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_506 = (Transformer__from_transformers.Factory(__gotots_store_505.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_121 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_506, "NodeFactory");
                const __gotots_store_507 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_508 = (Transformer__from_transformers.Factory(__gotots_store_507.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_120 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_508, "NodeFactory");
                const __gotots_argument_368 = temp;
                const __gotots_argument_369 = void 0;
                const __gotots_argument_370 = void 0;
                const __gotots_store_509 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_510 = (Transformer__from_transformers.Factory(__gotots_store_509.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_371 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_510, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_372 = NodeFlagsNone$constant__from_ast();
                const __gotots_argument_373 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_120, __gotots_argument_368, __gotots_argument_369, __gotots_argument_370, __gotots_argument_371, __gotots_argument_372);
                statement = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_121, __gotots_argument_373);
            }
            const __gotots_store_511 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_512 = (Transformer__from_transformers.Factory(__gotots_store_511.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_122 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_512, "NodeFactory");
            const __gotots_store_513 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_514 = (Transformer__from_transformers.Factory(__gotots_store_513.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_374 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_514, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
            const __gotots_argument_375 = false;
            let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_122, __gotots_argument_374, __gotots_argument_375);
            const __gotots_store_515 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_516 = (Transformer__from_transformers.Factory(__gotots_store_515.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            syntheticStaticBlock = NodeFactory__from_ast.NewClassStaticBlockDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_516, "NodeFactory"), void 0, block);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        if (!(syntheticConstructor === undefined) || !(syntheticStaticBlock === undefined)) {
            let membersArray = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length + 2, void 0);
            let classThisIdx = IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                const __gotots_store_517 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_376 = Transformer__from_transformers.EmitContext(__gotots_store_517.Transformer);
                const __gotots_argument_377 = n;
                return isClassThisAssignmentBlock(__gotots_argument_376, __gotots_argument_377);
            });
            let namedEvalIdx = IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                const __gotots_store_518 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_378 = Transformer__from_transformers.EmitContext(__gotots_store_518.Transformer);
                const __gotots_argument_379 = n;
                return isClassNamedEvaluationHelperBlock(__gotots_argument_378, __gotots_argument_379);
            });
            if (classThisIdx >= 0) {
                membersArray = membersArray.append(void 0, [NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(classThisIdx)]);
            }
            if (namedEvalIdx >= 0) {
                membersArray = membersArray.append(void 0, [NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(namedEvalIdx)]);
            }
            if (!(syntheticConstructor === undefined)) {
                membersArray = membersArray.append(void 0, [syntheticConstructor]);
            }
            if (!(syntheticStaticBlock === undefined)) {
                membersArray = membersArray.append(void 0, [syntheticStaticBlock]);
            }
            const __gotots_range_8 = NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
                const __gotots_range_value_8 = __gotots_range_index_7;
                const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_7);
                let i = __gotots_range_value_8;
                let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                if (i !== classThisIdx && i !== namedEvalIdx) {
                    membersArray = membersArray.append(void 0, [member]);
                }
            }
            const __gotots_store_519 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_520 = (Transformer__from_transformers.Factory(__gotots_store_519.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            members = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_520, "NodeFactory"), membersArray);
            NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        }
        return [members, prologue];
    }
    static $go$private$estransforms$transformClassStaticBlockDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            const __gotots_store_641 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_456 = Transformer__from_transformers.EmitContext(__gotots_store_641.Transformer);
            const __gotots_argument_457 = node;
            if (isClassThisAssignmentBlock(__gotots_argument_456, __gotots_argument_457)) {
                const __gotots_store_642 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_642.Transformer), Node__from_ast.Expression(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0)));
                if (IsAssignmentExpression__from_ast(result, true)) {
                    let binary: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(result);
                    if (tsonicTypeScriptRuntime.sameLocation(BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right)) {
                        return void 0;
                    }
                }
                return result;
            }
            const __gotots_store_643 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_458 = Transformer__from_transformers.EmitContext(__gotots_store_643.Transformer);
            const __gotots_argument_459 = node;
            if (isClassNamedEvaluationHelperBlock(__gotots_argument_458, __gotots_argument_459)) {
                const __gotots_store_644 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_644.Transformer), Node__from_ast.Expression(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0)));
            }
            const __gotots_store_645 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_645.Transformer));
            let statements = classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAndVisitStatements(tx, node, NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            const __gotots_store_646 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            statements = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_646.Transformer), statements);
            const __gotots_store_647 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let iife: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewImmediatelyInvokedArrowFunction(Transformer__from_transformers.Factory(__gotots_store_647.Transformer), statements);
            let arrowFunction: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(Node__from_ast.Expression(iife));
            const __gotots_store_648 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_648.Transformer), arrowFunction, node);
            const __gotots_store_649 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_649.Transformer), arrowFunction, EFNoLexicalArguments$constant__from_printer());
            NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsArrowFunction(arrowFunction) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_650 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_650.Transformer), iife, node);
            const __gotots_store_651 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AssignSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_651.Transformer), iife, node);
            const __gotots_store_652 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_652.Transformer), arrowFunction, EFNoLexicalThis$constant__from_printer());
            return iife;
        }
        return void 0;
    }
    static $go$private$estransforms$transformConstructor(tx: classFieldsTransformer | undefined, __go_constructor: {
        value: ConstructorDeclaration__from_ast;
    } | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined || ((void classFacts,
            (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsWillHoistInitializersToConstructor$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int)) {
            if (!(__go_constructor === undefined)) {
                const __gotots_store_380 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_91 = Transformer__from_transformers.Visitor(__gotots_store_380.Transformer);
                const __gotots_store_381 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_284 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_381, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_91, __gotots_argument_284);
            }
            return void 0;
        }
        let extendsClauseElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassExtendsHeritageElement__from_ast(container);
        let isDerivedClass = !(extendsClauseElement === undefined) && !(Node__from_ast.$storageOf(((SkipOuterExpressions__from_ast(Node__from_ast.Expression(extendsClauseElement), OEKAll$constant__from_ast()) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast());
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (!(__go_constructor === undefined)) {
            const __gotots_store_382 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            parameters = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_382.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        }
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$transformConstructorBody(tx, container, __go_constructor, isDerivedClass);
        if (body === undefined) {
            if (!(__go_constructor === undefined)) {
                const __gotots_store_383 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_92 = Transformer__from_transformers.Visitor(__gotots_store_383.Transformer);
                const __gotots_store_384 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_285 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_384, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_92, __gotots_argument_285);
            }
            return void 0;
        }
        if (!(__go_constructor === undefined)) {
            Assert__from_debug(!(parameters === undefined), RuntimeSlice.nil<GoInterface | undefined>());
            const __gotots_store_385 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_386 = (Transformer__from_transformers.Factory(__gotots_store_385.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateConstructorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_386, "NodeFactory"), __go_constructor, void 0, void 0, parameters, void 0, void 0, body);
        }
        if (parameters === undefined) {
            const __gotots_store_387 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_388 = (Transformer__from_transformers.Factory(__gotots_store_387.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            parameters = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_388, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
        }
        const __gotots_store_389 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_390 = (Transformer__from_transformers.Factory(__gotots_store_389.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewConstructorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_390, "NodeFactory"), void 0, void 0, parameters, void 0, void 0, body);
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return result;
    }
    static $go$private$estransforms$transformConstructorBody(tx: classFieldsTransformer | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_constructor: {
        value: ConstructorDeclaration__from_ast;
    } | undefined, isDerivedClass: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let instanceProperties = classFieldsTransformer.$go$private$estransforms$getProperties(tx, container, false, false);
        let properties = instanceProperties;
        if (!CompilerOptions__from_core.GetUseDefineForClassFields((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions)) {
            properties = Filter$PointerTo_Named_ast$Node(properties, (prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return !(Node__from_ast.Initializer(prop) === undefined) || IsPrivateIdentifier__from_ast(Node__from_ast.Name(prop)) || HasAccessorModifier__from_ast(prop);
            });
        }
        let privateMethodsAndAccessors = classFieldsTransformer.$go$private$estransforms$getPrivateInstanceMethodsAndAccessors(tx, container);
        let needsConstructorBody = properties.length > 0 || privateMethodsAndAccessors.length > 0;
        if (__go_constructor === undefined && !needsConstructorBody) {
            const __gotots_store_534 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_123 = Transformer__from_transformers.EmitContext(__gotots_store_534.Transformer);
            const __gotots_argument_385 = void 0;
            const __gotots_store_535 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_386 = Transformer__from_transformers.Visitor(__gotots_store_535.Transformer);
            return EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_123, __gotots_argument_385, __gotots_argument_386);
        }
        const __gotots_store_536 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_536.Transformer));
        let needsSyntheticConstructor = __go_constructor === undefined && isDerivedClass;
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let initializerStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_537 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_537.Transformer));
        initializerStatements = classFieldsTransformer.$go$private$estransforms$addInstanceMethodStatements(tx, initializerStatements, privateMethodsAndAccessors, receiver);
        if (!(__go_constructor === undefined)) {
            let parameterProperties = Filter$PointerTo_Named_ast$Node(instanceProperties, (prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                const __gotots_store_538 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_387 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_538.Transformer), prop);
                const __gotots_store_539 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_388 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_539, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return IsParameterPropertyDeclaration__from_ast(__gotots_argument_387, __gotots_argument_388);
            });
            let nonParameterProperties = Filter$PointerTo_Named_ast$Node(properties, (prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                const __gotots_store_540 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_389 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_540.Transformer), prop);
                const __gotots_store_541 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_390 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_541, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return !IsParameterPropertyDeclaration__from_ast(__gotots_argument_389, __gotots_argument_390);
            });
            initializerStatements = classFieldsTransformer.$go$private$estransforms$addPropertyOrClassStaticBlockStatements(tx, initializerStatements, parameterProperties, receiver);
            initializerStatements = classFieldsTransformer.$go$private$estransforms$addPropertyOrClassStaticBlockStatements(tx, initializerStatements, nonParameterProperties, receiver);
        }
        else {
            initializerStatements = classFieldsTransformer.$go$private$estransforms$addPropertyOrClassStaticBlockStatements(tx, initializerStatements, properties, receiver);
        }
        if (!(__go_constructor === undefined) && !((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) {
            let body: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
            const __gotots_range_13 = NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_13.length; __gotots_range_index_12++) {
                const __gotots_range_value_14 = __gotots_range_13.get(__gotots_range_index_12);
                let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
                if (IsPrologueDirective__from_ast(stmt)) {
                    statements = statements.append(void 0, [stmt]);
                }
                else {
                    break;
                }
            }
            let statementOffset = statements.length;
            let superPath = FindSuperStatementIndexPath__from_transformers(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, statementOffset);
            if (superPath.length > 0) {
                statements = classFieldsTransformer.$go$private$estransforms$transformConstructorBodyWorker(tx, statements, NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, statementOffset, superPath, 0, initializerStatements, __go_constructor);
            }
            else {
                for (; statementOffset < NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length;) {
                    let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(statementOffset);
                    const __gotots_store_542 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let orig: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_542.Transformer), stmt);
                    const __gotots_argument_391 = orig;
                    const __gotots_store_543 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_392 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_543, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (IsParameterPropertyDeclaration__from_ast(__gotots_argument_391, __gotots_argument_392)) {
                        statementOffset++;
                    }
                    else {
                        break;
                    }
                }
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, initializerStatements, void 0);
                const __gotots_store_544 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_14 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_544.Transformer), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(statementOffset, null, null));
                let visited = __gotots_results_14[0];
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, visited, void 0);
            }
        }
        else {
            if (needsSyntheticConstructor) {
                const __gotots_store_545 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_546 = (Transformer__from_transformers.Factory(__gotots_store_545.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_127 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_546, "NodeFactory");
                const __gotots_store_547 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_548 = (Transformer__from_transformers.Factory(__gotots_store_547.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_126 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_548, "NodeFactory");
                const __gotots_store_549 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_550 = (Transformer__from_transformers.Factory(__gotots_store_549.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_395 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_550, "NodeFactory"), KindSuperKeyword$constant__from_ast());
                const __gotots_argument_396 = void 0;
                const __gotots_argument_397 = void 0;
                const __gotots_store_551 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_552 = (Transformer__from_transformers.Factory(__gotots_store_551.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_125 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_552, "NodeFactory");
                const __gotots_store_553 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_554 = (Transformer__from_transformers.Factory(__gotots_store_553.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_124 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_554, "NodeFactory");
                const __gotots_store_555 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_556 = (Transformer__from_transformers.Factory(__gotots_store_555.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_393 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_556, "NodeFactory"), "arguments");
                const __gotots_slice_element_1 = NodeFactory__from_ast.NewSpreadElement(__gotots_receiver_124, __gotots_argument_393);
                const __gotots_argument_394 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
                const __gotots_argument_398 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_125, __gotots_argument_394);
                const __gotots_argument_399 = NodeFlagsNone$constant__from_ast();
                const __gotots_argument_400 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_126, __gotots_argument_395, __gotots_argument_396, __gotots_argument_397, __gotots_argument_398, __gotots_argument_399);
                let superCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_127, __gotots_argument_400);
                statements = statements.append(void 0, [superCall]);
            }
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, initializerStatements, void 0);
        }
        const __gotots_store_557 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        statements = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_557.Transformer), statements);
        if (statements.length === 0 && __go_constructor === undefined) {
            return void 0;
        }
        let multiLine = false;
        if (!(__go_constructor === undefined) && !((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined) && NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >= statements.length) {
            multiLine = Block__from_ast.$storageOf(((Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
        }
        else {
            multiLine = statements.length > 0;
        }
        const __gotots_store_558 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_559 = (Transformer__from_transformers.Factory(__gotots_store_558.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_559, "NodeFactory"), statements);
        if (!(__go_constructor === undefined) && !((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) {
            NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        }
        else {
            NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(container) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc).Pos(), TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(container) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc).End()));
        }
        const __gotots_store_560 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_561 = (Transformer__from_transformers.Factory(__gotots_store_560.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_561, "NodeFactory"), statementList, multiLine);
        if (!(__go_constructor === undefined) && !((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) {
            Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        return block;
    }
    static $go$private$estransforms$transformConstructorBodyWorker(tx: classFieldsTransformer | undefined, statementsOut: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statementsIn: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statementOffset: int, superPath: RuntimeSlice<int>, superPathDepth: int, initializerStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, __go_constructor: {
        value: ConstructorDeclaration__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let superStatementIndex = superPath.get(superPathDepth);
        let superStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statementsIn.get(superStatementIndex);
        const __gotots_store_663 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_17 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_663.Transformer), statementsIn.slice(statementOffset, superStatementIndex, null));
        let visited = __gotots_results_17[0];
        statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, visited, void 0);
        statementOffset = superStatementIndex + 1;
        if (IsTryStatement__from_ast(superStatement)) {
            let tryBlock: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock((Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock);
            let tryBlockStatements = classFieldsTransformer.$go$private$estransforms$transformConstructorBodyWorker(tx, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, 0, superPath, superPathDepth + 1, initializerStatements, __go_constructor);
            const __gotots_store_664 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_665 = (Transformer__from_transformers.Factory(__gotots_store_664.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let tryStatementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_665, "NodeFactory"), tryBlockStatements);
            NodeList__from_ast.$storageOf(((tryStatementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_666 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_666.Transformer), (Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause);
            const __gotots_store_667 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_667.Transformer), (Node__from_ast.AsTryStatement(superStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock);
            const __gotots_store_668 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_669 = (Transformer__from_transformers.Factory(__gotots_store_668.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_146 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_669, "NodeFactory");
            const __gotots_argument_472 = Node__from_ast.AsTryStatement(superStatement);
            const __gotots_store_670 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_671 = (Transformer__from_transformers.Factory(__gotots_store_670.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_473 = NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_671, "NodeFactory"), tryBlock, tryStatementList, Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
            const __gotots_argument_474 = catchClause;
            const __gotots_argument_475 = finallyBlock;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateTryStatement(__gotots_receiver_146, __gotots_argument_472, __gotots_argument_473, __gotots_argument_474, __gotots_argument_475);
            statementsOut = statementsOut.append(void 0, [updated]);
        }
        else {
            const __gotots_store_672 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_18 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_672.Transformer), statementsIn.slice(superStatementIndex, superStatementIndex + 1, null));
            let visited__shadow_1 = __gotots_results_18[0];
            statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, visited__shadow_1, void 0);
            for (; statementOffset < statementsIn.length;) {
                let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statementsIn.get(statementOffset);
                const __gotots_store_673 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let orig: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_673.Transformer), stmt);
                const __gotots_argument_476 = orig;
                const __gotots_store_674 = NodeBase__from_ast.$storageOf((__go_constructor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_477 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_674, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                if (IsParameterPropertyDeclaration__from_ast(__gotots_argument_476, __gotots_argument_477)) {
                    statementOffset++;
                }
                else {
                    break;
                }
            }
            statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, initializerStatements, void 0);
        }
        const __gotots_store_675 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_19 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_675.Transformer), statementsIn.slice(statementOffset, null, null));
        let visited2 = __gotots_results_19[0];
        statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, visited2, void 0);
        return statementsOut;
    }
    static $go$private$estransforms$transformFieldInitializer(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_231 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_198 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_231, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_199 = !HasDecorators__from_ast(__gotots_argument_198);
        const __gotots_argument_200 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Decorators should already have been transformed and elided.")]);
        Assert__from_debug(__gotots_argument_199, __gotots_argument_200);
        const __gotots_store_232 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_201 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_232, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (IsPrivateIdentifierClassElementDeclaration__from_ast(__gotots_argument_201)) {
            return classFieldsTransformer.$go$private$estransforms$transformPrivateFieldInitializer(tx, node);
        }
        return classFieldsTransformer.$go$private$estransforms$transformPublicFieldInitializer(tx, node);
    }
    static $go$private$estransforms$transformPrivateFieldInitializer(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_103 = tx;
        const __gotots_store_440 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_312 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_440, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (classFieldsTransformer.$go$private$estransforms$shouldTransformClassElementToWeakMap(__gotots_receiver_103, __gotots_argument_312)) {
            let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, PropertyDeclaration__from_ast.Name(node));
            Assert__from_debug(!(info === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Undeclared private name for property declaration.")]));
            if (!((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isValid) {
                const __gotots_store_441 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_441, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            }
            if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
                const __gotots_receiver_104 = tx;
                const __gotots_store_442 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_313 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_442, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_store_443 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_314 = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_443.Transformer));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$transformPropertyOrClassStaticBlock(__gotots_receiver_104, __gotots_argument_313, __gotots_argument_314);
                if (!(statement === undefined)) {
                    const __gotots_store_444 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_445 = (Transformer__from_transformers.Factory(__gotots_store_444.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_106 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_445, "NodeFactory");
                    const __gotots_argument_317 = void 0;
                    const __gotots_store_446 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_447 = (Transformer__from_transformers.Factory(__gotots_store_446.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_105 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_447, "NodeFactory");
                    const __gotots_store_448 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_449 = (Transformer__from_transformers.Factory(__gotots_store_448.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_315 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_449, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
                    const __gotots_argument_316 = true;
                    const __gotots_argument_318 = NodeFactory__from_ast.NewBlock(__gotots_receiver_105, __gotots_argument_315, __gotots_argument_316);
                    return NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_106, __gotots_argument_317, __gotots_argument_318);
                }
            }
            return void 0;
        }
        let __gotots_logical_result_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingSet;
        if (__gotots_logical_result_8) {
            const __gotots_store_450 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_319 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_450, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_8 = !HasStaticModifier__from_ast(__gotots_argument_319);
        }
        if (__gotots_logical_result_8 && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) && !(((void classFacts,
            (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsWillHoistInitializersToConstructor$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int))) {
            const __gotots_store_451 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_452 = (Transformer__from_transformers.Factory(__gotots_store_451.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_108 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_452, "NodeFactory");
            const __gotots_argument_321 = node;
            const __gotots_store_453 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_107 = Transformer__from_transformers.Visitor(__gotots_store_453.Transformer);
            const __gotots_store_454 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_320 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_454, "NamedMemberBase"));
            const __gotots_argument_322 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_107, __gotots_argument_320);
            const __gotots_argument_323 = PropertyDeclaration__from_ast.Name(node);
            const __gotots_argument_324 = void 0;
            const __gotots_argument_325 = void 0;
            const __gotots_argument_326 = void 0;
            return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_108, __gotots_argument_321, __gotots_argument_322, __gotots_argument_323, __gotots_argument_324, __gotots_argument_325, __gotots_argument_326);
        }
        const __gotots_store_455 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_327 = Transformer__from_transformers.EmitContext(__gotots_store_455.Transformer);
        const __gotots_store_456 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_328 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_456, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_329 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_327, __gotots_argument_328, __gotots_argument_329)) {
            const __gotots_store_457 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_330 = Transformer__from_transformers.EmitContext(__gotots_store_457.Transformer);
            const __gotots_store_458 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_331 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_458, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_332 = false;
            const __gotots_argument_333 = "";
            node = Node__from_ast.AsPropertyDeclaration(transformNamedEvaluation(__gotots_argument_330, __gotots_argument_331, __gotots_argument_332, __gotots_argument_333));
        }
        const __gotots_store_459 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_460 = (Transformer__from_transformers.Factory(__gotots_store_459.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_110 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_460, "NodeFactory");
        const __gotots_argument_335 = node;
        const __gotots_receiver_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_461 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_334 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_461, "NamedMemberBase"));
        const __gotots_argument_336 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_109, __gotots_argument_334);
        const __gotots_argument_337 = classFieldsTransformer.$go$private$estransforms$visitPropertyName(tx, PropertyDeclaration__from_ast.Name(node));
        const __gotots_argument_338 = void 0;
        const __gotots_argument_339 = void 0;
        const __gotots_store_462 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_340 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_462.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_110, __gotots_argument_335, __gotots_argument_336, __gotots_argument_337, __gotots_argument_338, __gotots_argument_339, __gotots_argument_340);
    }
    static $go$private$estransforms$transformPrivateIdentifierInInExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        if (!(info === undefined)) {
            const __gotots_store_365 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_365.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            const __gotots_store_366 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewClassPrivateFieldInHelper(Transformer__from_transformers.Factory(__gotots_store_366.Transformer), ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier, receiver);
            const __gotots_store_367 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_87 = Transformer__from_transformers.EmitContext(__gotots_store_367.Transformer);
            const __gotots_argument_276 = result;
            const __gotots_store_368 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
            const __gotots_argument_277 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_368, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_87, __gotots_argument_276, __gotots_argument_277);
            return result;
        }
        const __gotots_store_369 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_88 = Transformer__from_transformers.Visitor(__gotots_store_369.Transformer);
        const __gotots_store_370 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_278 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_370, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_88, __gotots_argument_278);
    }
    static $go$private$estransforms$transformProperty(tx: classFieldsTransformer | undefined, property: {
        value: PropertyDeclaration__from_ast;
    } | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedCurrentClassElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement;
        let transformed: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$transformPropertyWorker(tx, property, receiver);
        let __gotots_logical_result_18 = !(transformed === undefined);
        if (__gotots_logical_result_18) {
            const __gotots_store_653 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_460 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_653, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_18 = HasStaticModifier__from_ast(__gotots_argument_460);
        }
        if (__gotots_logical_result_18) {
            const __gotots_store_654 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_654.Transformer), transformed, EFNoLexicalThis$constant__from_printer());
        }
        let __gotots_logical_result_19 = !(transformed === undefined);
        if (__gotots_logical_result_19) {
            const __gotots_store_655 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_461 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_655, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_19 = HasStaticModifier__from_ast(__gotots_argument_461);
        }
        if (__gotots_logical_result_19 && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) && !((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value ===
            ((void classFacts,
                0) as int))) {
            const __gotots_store_656 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_143 = Transformer__from_transformers.EmitContext(__gotots_store_656.Transformer);
            const __gotots_argument_462 = transformed;
            const __gotots_store_657 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_463 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_657, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_143, __gotots_argument_462, __gotots_argument_463);
            const __gotots_store_658 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_144 = Transformer__from_transformers.EmitContext(__gotots_store_658.Transformer);
            const __gotots_argument_464 = transformed;
            const __gotots_store_659 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_465 = EmitContext__from_printer.SourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_659.Transformer), PropertyDeclaration__from_ast.Name(property));
            EmitContext__from_printer.SetSourceMapRange(__gotots_receiver_144, __gotots_argument_464, __gotots_argument_465);
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = savedCurrentClassElement;
        return transformed;
    }
    static $go$private$estransforms$transformPropertyOrClassStaticBlock(tx: classFieldsTransformer | undefined, property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsClassStaticBlockDeclaration__from_ast(property)) {
            expression = classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, property, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return classFieldsTransformer.$go$private$estransforms$transformClassStaticBlockDeclaration($argument0, $argument1);
            }, property);
        }
        else {
            expression = classFieldsTransformer.$go$private$estransforms$transformProperty(tx, Node__from_ast.AsPropertyDeclaration(property), receiver);
        }
        if (expression === undefined) {
            return void 0;
        }
        const __gotots_store_595 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_596 = (Transformer__from_transformers.Factory(__gotots_store_595.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_596, "NodeFactory"), expression);
        const __gotots_store_597 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_597.Transformer), statement, property);
        const __gotots_store_598 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_134 = Transformer__from_transformers.EmitContext(__gotots_store_598.Transformer);
        const __gotots_argument_427 = statement;
        const __gotots_store_599 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_8 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_599.Transformer), property);
        const __gotots_binary_operand_9 = EFNoComments$constant__from_printer();
        const __gotots_argument_428 = (__gotots_binary_operand_8 & __gotots_binary_operand_9) >>> 0;
        EmitContext__from_printer.AddEmitFlags(__gotots_receiver_134, __gotots_argument_427, __gotots_argument_428);
        const __gotots_store_600 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_600.Transformer), statement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_601 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let propertyOriginalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_601.Transformer), property);
        if (IsParameterDeclaration__from_ast(propertyOriginalNode)) {
            const __gotots_store_602 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_602.Transformer), statement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((propertyOriginalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_603 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_603.Transformer), statement, EFNoComments$constant__from_printer());
        }
        else {
            const __gotots_store_604 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_604.Transformer), statement, MoveRangePastModifiers__from_transformers(property));
        }
        const __gotots_store_605 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSyntheticLeadingComments(Transformer__from_transformers.EmitContext(__gotots_store_605.Transformer), expression, RuntimeSlice.nil<SynthesizedComment__from_printer$Storage>());
        const __gotots_store_606 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSyntheticTrailingComments(Transformer__from_transformers.EmitContext(__gotots_store_606.Transformer), expression, RuntimeSlice.nil<SynthesizedComment__from_printer$Storage>());
        if (HasAccessorModifier__from_ast(propertyOriginalNode)) {
            const __gotots_store_607 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_607.Transformer), statement, EFNoComments$constant__from_printer());
        }
        return statement;
    }
    static $go$private$estransforms$transformPropertyWorker(tx: classFieldsTransformer | undefined, property: {
        value: PropertyDeclaration__from_ast;
    } | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let emitAssignment = !CompilerOptions__from_core.GetUseDefineForClassFields((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
        const __gotots_store_679 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_479 = Transformer__from_transformers.EmitContext(__gotots_store_679.Transformer);
        const __gotots_store_680 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_480 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_680, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_481 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_479, __gotots_argument_480, __gotots_argument_481)) {
            const __gotots_store_681 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_482 = Transformer__from_transformers.EmitContext(__gotots_store_681.Transformer);
            const __gotots_store_682 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_483 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_682, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_484 = false;
            const __gotots_argument_485 = "";
            property = Node__from_ast.AsPropertyDeclaration(transformNamedEvaluation(__gotots_argument_482, __gotots_argument_483, __gotots_argument_484, __gotots_argument_485));
        }
        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyDeclaration__from_ast.Name(property);
        const __gotots_store_683 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_486 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_683, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (HasAccessorModifier__from_ast(__gotots_argument_486)) {
            const __gotots_store_684 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            propertyName = NodeFactory__from_printer.NewGeneratedPrivateNameForNodeEx(Transformer__from_transformers.Factory(__gotots_store_684.Transformer), PropertyDeclaration__from_ast.Name(property), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(0), "", "_accessor_storage"));
        }
        else if (IsComputedPropertyName__from_ast(propertyName) && !IsSimpleInlineableExpression__from_transformers(Node__from_ast.Expression(propertyName))) {
            const __gotots_store_685 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_686 = (Transformer__from_transformers.Factory(__gotots_store_685.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_147 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_686, "NodeFactory");
            const __gotots_argument_487 = Node__from_ast.AsComputedPropertyName(propertyName);
            const __gotots_store_687 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_488 = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_687.Transformer), propertyName);
            propertyName = NodeFactory__from_ast.UpdateComputedPropertyName(__gotots_receiver_147, __gotots_argument_487, __gotots_argument_488);
        }
        const __gotots_store_688 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_489 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_688, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (HasStaticModifier__from_ast(__gotots_argument_489)) {
            const __gotots_store_689 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_689, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        let __gotots_logical_result_21 = IsPrivateIdentifier__from_ast(propertyName);
        if (__gotots_logical_result_21) {
            const __gotots_receiver_148 = tx;
            const __gotots_store_690 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_490 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_690, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_21 = classFieldsTransformer.$go$private$estransforms$shouldTransformClassElementToWeakMap(__gotots_receiver_148, __gotots_argument_490);
        }
        if (__gotots_logical_result_21) {
            let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, propertyName);
            if (!(info === undefined)) {
                if (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.kind.$value === PrivateIdentifierKindField$constant__from_printer().$value) {
                    if (!((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isStatic) {
                        const __gotots_store_691 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_491 = Transformer__from_transformers.Factory(__gotots_store_691.Transformer);
                        const __gotots_argument_492 = receiver;
                        const __gotots_store_692 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_493 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_692.Transformer), (property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                        const __gotots_argument_494 = ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.brandCheckIdentifier;
                        return createPrivateInstanceFieldInitializer(__gotots_argument_491, __gotots_argument_492, __gotots_argument_493, __gotots_argument_494);
                    }
                    const __gotots_store_693 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_495 = Transformer__from_transformers.Factory(__gotots_store_693.Transformer);
                    const __gotots_argument_496 = ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.variableName;
                    const __gotots_store_694 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_497 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_694.Transformer), (property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                    return createPrivateStaticFieldInitializer(__gotots_argument_495, __gotots_argument_496, __gotots_argument_497);
                }
                return void 0;
            }
            else {
                Fail__from_debug("Undeclared private name for property declaration.");
            }
        }
        let __gotots_logical_result_22 = IsPrivateIdentifier__from_ast(propertyName);
        if (!__gotots_logical_result_22) {
            const __gotots_store_695 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_498 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_695, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_22 = HasStaticModifier__from_ast(__gotots_argument_498);
        }
        if ((__gotots_logical_result_22) && (property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined) {
            return void 0;
        }
        const __gotots_store_696 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_149 = Transformer__from_transformers.EmitContext(__gotots_store_696.Transformer);
        const __gotots_store_697 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_499 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_697, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_500 = EmitContext__from_printer.MostOriginal(__gotots_receiver_149, __gotots_argument_499);
        if (HasAbstractModifier__from_ast(__gotots_argument_500)) {
            return void 0;
        }
        const __gotots_store_698 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_698.Transformer), (property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_699 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_150 = Transformer__from_transformers.EmitContext(__gotots_store_699.Transformer);
        const __gotots_store_700 = NodeBase__from_ast.$storageOf((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_501 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_700, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let propertyOriginalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(__gotots_receiver_150, __gotots_argument_501);
        if (IsParameterPropertyDeclaration__from_ast(propertyOriginalNode, Node__from_ast.$storageOf(((propertyOriginalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsIdentifier__from_ast(propertyName)) {
            const __gotots_receiver_151 = propertyName;
            const __gotots_store_701 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_502 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_701.Transformer));
            let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_151, __gotots_argument_502);
            if (!(initializer === undefined)) {
                let __gotots_logical_result_23 = IsParenthesizedExpression__from_ast(initializer) && IsCommaExpression__from_ast(Node__from_ast.Expression(initializer));
                if (__gotots_logical_result_23) {
                    const __gotots_store_702 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_logical_result_23 = EmitContext__from_printer.IsCallToHelper(Transformer__from_transformers.EmitContext(__gotots_store_702.Transformer), BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.Expression(initializer)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, "__runInitializers");
                }
                if (__gotots_logical_result_23 && IsVoidExpression__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.Expression(initializer)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right) && IsNumericLiteral__from_ast(Node__from_ast.Expression(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.Expression(initializer)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right))) {
                    initializer = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.Expression(initializer)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                }
                const __gotots_store_703 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                initializer = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_703.Transformer), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([initializer, localName]));
            }
            else {
                initializer = localName;
            }
            const __gotots_store_704 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_704.Transformer), propertyName, 396);
            const __gotots_store_705 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_705.Transformer), localName, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Name(propertyOriginalNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_706 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_706.Transformer), localName, EFNoComments$constant__from_printer());
        }
        else if (initializer === undefined) {
            const __gotots_store_707 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            initializer = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_707.Transformer));
        }
        if (emitAssignment || IsPrivateIdentifier__from_ast(propertyName)) {
            const __gotots_store_708 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_503 = Transformer__from_transformers.Factory(__gotots_store_708.Transformer);
            const __gotots_store_709 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_504 = Transformer__from_transformers.EmitContext(__gotots_store_709.Transformer);
            const __gotots_argument_505 = receiver;
            const __gotots_argument_506 = propertyName;
            const __gotots_argument_507 = propertyName;
            let memberAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createMemberAccessForPropertyName(__gotots_argument_503, __gotots_argument_504, __gotots_argument_505, __gotots_argument_506, __gotots_argument_507);
            const __gotots_store_710 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_710.Transformer), memberAccess, EFNoLeadingComments$constant__from_printer());
            const __gotots_store_711 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_711.Transformer), memberAccess, initializer);
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsComputedPropertyName__from_ast(propertyName)) {
            name = Node__from_ast.Expression(propertyName);
        }
        else if (IsIdentifier__from_ast(propertyName)) {
            const __gotots_store_712 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_713 = (Transformer__from_transformers.Factory(__gotots_store_712.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            name = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_713, "NodeFactory"), Node__from_ast.Text(propertyName), TokenFlagsNone$constant__from_ast());
        }
        else {
            name = propertyName;
        }
        const __gotots_store_714 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_715 = (Transformer__from_transformers.Factory(__gotots_store_714.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_157 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_715, "NodeFactory");
        const __gotots_store_716 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_717 = (Transformer__from_transformers.Factory(__gotots_store_716.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_156 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_717, "NodeFactory");
        const __gotots_store_718 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_719 = (Transformer__from_transformers.Factory(__gotots_store_718.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_152 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_719, "NodeFactory");
        const __gotots_argument_508 = void 0;
        const __gotots_store_720 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_721 = (Transformer__from_transformers.Factory(__gotots_store_720.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_509 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_721, "NodeFactory"), "enumerable");
        const __gotots_argument_510 = void 0;
        const __gotots_argument_511 = void 0;
        const __gotots_store_722 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_512 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_722.Transformer));
        const __gotots_slice_element_2 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_152, __gotots_argument_508, __gotots_argument_509, __gotots_argument_510, __gotots_argument_511, __gotots_argument_512);
        const __gotots_store_723 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_724 = (Transformer__from_transformers.Factory(__gotots_store_723.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_153 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_724, "NodeFactory");
        const __gotots_argument_513 = void 0;
        const __gotots_store_725 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_726 = (Transformer__from_transformers.Factory(__gotots_store_725.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_514 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_726, "NodeFactory"), "configurable");
        const __gotots_argument_515 = void 0;
        const __gotots_argument_516 = void 0;
        const __gotots_store_727 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_517 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_727.Transformer));
        const __gotots_slice_element_3 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_153, __gotots_argument_513, __gotots_argument_514, __gotots_argument_515, __gotots_argument_516, __gotots_argument_517);
        const __gotots_store_728 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_729 = (Transformer__from_transformers.Factory(__gotots_store_728.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_154 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_729, "NodeFactory");
        const __gotots_argument_518 = void 0;
        const __gotots_store_730 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_731 = (Transformer__from_transformers.Factory(__gotots_store_730.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_519 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_731, "NodeFactory"), "writable");
        const __gotots_argument_520 = void 0;
        const __gotots_argument_521 = void 0;
        const __gotots_store_732 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_522 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_732.Transformer));
        const __gotots_slice_element_4 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_154, __gotots_argument_518, __gotots_argument_519, __gotots_argument_520, __gotots_argument_521, __gotots_argument_522);
        const __gotots_store_733 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_734 = (Transformer__from_transformers.Factory(__gotots_store_733.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_155 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_734, "NodeFactory");
        const __gotots_argument_523 = void 0;
        const __gotots_store_735 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_736 = (Transformer__from_transformers.Factory(__gotots_store_735.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_524 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_736, "NodeFactory"), "value");
        const __gotots_argument_525 = void 0;
        const __gotots_argument_526 = void 0;
        const __gotots_argument_527 = initializer;
        const __gotots_slice_element_5 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_155, __gotots_argument_523, __gotots_argument_524, __gotots_argument_525, __gotots_argument_526, __gotots_argument_527);
        const __gotots_argument_528 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2, __gotots_slice_element_3, __gotots_slice_element_4, __gotots_slice_element_5]);
        const __gotots_argument_529 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_156, __gotots_argument_528);
        const __gotots_argument_530 = true;
        let descriptor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_157, __gotots_argument_529, __gotots_argument_530);
        const __gotots_store_737 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewObjectDefinePropertyCall(Transformer__from_transformers.Factory(__gotots_store_737.Transformer), receiver, name, descriptor);
    }
    static $go$private$estransforms$transformPublicFieldInitializer(tx: classFieldsTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializers;
        if (__gotots_logical_result_9) {
            const __gotots_store_463 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_341 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_463, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_9 = !IsAutoAccessorPropertyDeclaration__from_ast(__gotots_argument_341);
        }
        if (__gotots_logical_result_9) {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$getPropertyNameExpressionIfNeeded(tx, PropertyDeclaration__from_ast.Name(node), !((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined) || CompilerOptions__from_core.GetUseDefineForClassFields((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions));
            if (!(expr === undefined)) {
                const __gotots_range_4 = named_iter.IterSeqValueOperations.$project(flattenCommaList(expr));
                if (__gotots_range_4 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_0 = 1;
                __gotots_range_4(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
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
                    const __gotots_range_value_4 = $argument0;
                    let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                    classFieldsTransformer.$go$private$estransforms$addPendingExpressions(tx, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([e]));
                    __gotots_range_state_0 = 1;
                    return true;
                });
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_0 = -2;
            }
            const __gotots_store_464 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_342 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_464, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            if (IsStatic__from_ast(__gotots_argument_342) && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
                const __gotots_receiver_111 = tx;
                const __gotots_store_465 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                const __gotots_argument_343 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_465, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_store_466 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_344 = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_466.Transformer));
                let initializerStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$transformPropertyOrClassStaticBlock(__gotots_receiver_111, __gotots_argument_343, __gotots_argument_344);
                if (!(initializerStatement === undefined)) {
                    const __gotots_store_467 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_468 = (Transformer__from_transformers.Factory(__gotots_store_467.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_113 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_468, "NodeFactory");
                    const __gotots_argument_347 = void 0;
                    const __gotots_store_469 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_470 = (Transformer__from_transformers.Factory(__gotots_store_469.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_112 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_470, "NodeFactory");
                    const __gotots_store_471 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_472 = (Transformer__from_transformers.Factory(__gotots_store_471.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_345 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_472, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([initializerStatement]));
                    const __gotots_argument_346 = false;
                    const __gotots_argument_348 = NodeFactory__from_ast.NewBlock(__gotots_receiver_112, __gotots_argument_345, __gotots_argument_346);
                    let staticBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassStaticBlockDeclaration(__gotots_receiver_113, __gotots_argument_347, __gotots_argument_348);
                    const __gotots_store_473 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_114 = Transformer__from_transformers.EmitContext(__gotots_store_473.Transformer);
                    const __gotots_argument_349 = staticBlock;
                    const __gotots_store_474 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_argument_350 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_474, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_114, __gotots_argument_349, __gotots_argument_350);
                    const __gotots_store_475 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_475.Transformer), staticBlock, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Loc)));
                    const __gotots_store_476 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_476.Transformer), initializerStatement, EFNoComments$constant__from_printer());
                    return staticBlock;
                }
            }
            return void 0;
        }
        const __gotots_store_477 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_478 = (Transformer__from_transformers.Factory(__gotots_store_477.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_116 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_478, "NodeFactory");
        const __gotots_argument_352 = node;
        const __gotots_receiver_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_479 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_351 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_479, "NamedMemberBase"));
        const __gotots_argument_353 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_115, __gotots_argument_351);
        const __gotots_argument_354 = classFieldsTransformer.$go$private$estransforms$visitPropertyName(tx, PropertyDeclaration__from_ast.Name(node));
        const __gotots_argument_355 = void 0;
        const __gotots_argument_356 = void 0;
        const __gotots_store_480 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_357 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_480.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_116, __gotots_argument_352, __gotots_argument_353, __gotots_argument_354, __gotots_argument_355, __gotots_argument_356, __gotots_argument_357);
    }
    static $go$private$estransforms$tryGetClassThis(tx: classFieldsTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            let classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$tryGetClassThisNoContainer(tx);
            if (!(classThis === undefined)) {
                return classThis;
            }
        }
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer === undefined)) {
            return Node__from_ast.Name((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer);
        }
        return void 0;
    }
    static $go$private$estransforms$tryGetClassThisNoContainer(tx: classFieldsTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let lex: classLexicalEnvironment | undefined = classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx);
        if (!((lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis === undefined)) {
            return (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis;
        }
        if (!((lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined)) {
            return (lex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
        }
        return void 0;
    }
    static $go$private$estransforms$visit(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$pushNode(tx, node);
                    const __gotots_receiver_21 = tx;
                    const __gotots_argument_11 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        classFieldsTransformer.$go$private$estransforms$popNode(__gotots_receiver_21, __gotots_argument_11);
                    };
                    if ((Node__from_ast.SubtreeFacts(node) & (1097728)) >>> 0 === 0) {
                        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer === undefined) && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases.length() > 0) {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitForSubstitution(tx, node);
                            break __gotots_return_block_0;
                        }
                        __gotots_return_0 = node;
                        break __gotots_return_block_0;
                    }
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindSourceFile$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassDeclaration$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitClassExpression(tx, Node__from_ast.AsClassExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassStaticBlockDeclaration$constant__from_ast():
                        case KindPropertyDeclaration$constant__from_ast(): {
                            const __gotots_argument_12 = new GoInterfaceAdapter("Use `classElementVisitor` instead.");
                            GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                            break;
                        }
                        case KindPropertyAssignment$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitPropertyAssignment(tx, Node__from_ast.AsPropertyAssignment(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindVariableStatement$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitVariableStatement(tx, Node__from_ast.AsVariableStatement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindVariableDeclaration$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitVariableDeclaration(tx, Node__from_ast.AsVariableDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParameter$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitParameterDeclaration(tx, Node__from_ast.AsParameterDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindBindingElement$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitBindingElement(tx, Node__from_ast.AsBindingElement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExportAssignment$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitExportAssignment(tx, Node__from_ast.AsExportAssignment(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindPrivateIdentifier$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitPrivateIdentifier(tx, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindPropertyAccessExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitPropertyAccessExpression(tx, Node__from_ast.AsPropertyAccessExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindElementAccessExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitElementAccessExpression(tx, Node__from_ast.AsElementAccessExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindPrefixUnaryExpression$constant__from_ast():
                        case KindPostfixUnaryExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitPreOrPostfixUnaryExpression(tx, node, false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindBinaryExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitBinaryExpression(tx, Node__from_ast.AsBinaryExpression(node), false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParenthesizedExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitParenthesizedExpression(tx, Node__from_ast.AsParenthesizedExpression(node), false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindCallExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitCallExpression(tx, Node__from_ast.AsCallExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExpressionStatement$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitExpressionStatement(tx, Node__from_ast.AsExpressionStatement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTaggedTemplateExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitTaggedTemplateExpression(tx, Node__from_ast.AsTaggedTemplateExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindForStatement$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitForStatement(tx, Node__from_ast.AsForStatement(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindForInStatement$constant__from_ast():
                        case KindForOfStatement$constant__from_ast():
                        case KindDoStatement$constant__from_ast():
                        case KindWhileStatement$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$setInIterationStatementAnd(tx, true, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return classFieldsTransformer.$go$private$estransforms$visitEachChildOfNode($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindThisKeyword$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$visitThisExpression(tx, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast():
                        case KindFunctionExpression$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$setInIterationStatementAnd(tx, false, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return classFieldsTransformer.$go$private$estransforms$visitFunctionExpressionOrDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindConstructor$constant__from_ast():
                        case KindMethodDeclaration$constant__from_ast():
                        case KindGetAccessor$constant__from_ast():
                        case KindSetAccessor$constant__from_ast(): {
                            __gotots_return_0 = classFieldsTransformer.$go$private$estransforms$setInIterationStatementAnd(tx, false, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return classFieldsTransformer.$go$private$estransforms$setClassElementAndVisitEachChild($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_10.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
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
    static $go$private$estransforms$visitAccessorFieldResult(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyDeclaration$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$transformFieldInitializer(tx, Node__from_ast.AsPropertyDeclaration(node));
                break;
            }
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitClassElement(tx, node);
                break;
            }
            default: {
                FailBadSyntaxKind__from_debug(new $goInterfaceAdapter$PointerTo_Named_ast$Node(node), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration")]));
                return void 0;
                break;
            }
        }
    }
    static $go$private$estransforms$visitArrayAssignmentElement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsArrayBindingOrAssignmentElement__from_ast(node)) {
            if (IsSpreadElement__from_ast(node)) {
                return classFieldsTransformer.$go$private$estransforms$visitAssignmentRestElement(tx, node);
            }
            if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOmittedExpression$constant__from_ast())) {
                return classFieldsTransformer.$go$private$estransforms$visitAssignmentElement(tx, node);
            }
        }
        const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_11.Transformer), node);
    }
    static $go$private$estransforms$visitAssignmentElement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_236 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_202 = Transformer__from_transformers.EmitContext(__gotots_store_236.Transformer);
        const __gotots_argument_203 = node;
        const __gotots_argument_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_202, __gotots_argument_203, __gotots_argument_204)) {
            const __gotots_store_237 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_205 = Transformer__from_transformers.EmitContext(__gotots_store_237.Transformer);
            const __gotots_argument_206 = node;
            const __gotots_argument_207 = false;
            const __gotots_argument_208 = "";
            node = transformNamedEvaluation(__gotots_argument_205, __gotots_argument_206, __gotots_argument_207, __gotots_argument_208);
        }
        if (IsAssignmentExpression__from_ast(node, true)) {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            const __gotots_store_238 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_238.Transformer), BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            const __gotots_store_239 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_240 = (Transformer__from_transformers.Factory(__gotots_store_239.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_240, "NodeFactory"), Node__from_ast.AsBinaryExpression(node), void 0, left, void 0, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
        }
        return classFieldsTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, node);
    }
    static $go$private$estransforms$visitAssignmentPattern(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsArrayLiteralExpression__from_ast(node)) {
            const __gotots_store_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_216 = (Transformer__from_transformers.Factory(__gotots_store_215.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateArrayLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory"), Node__from_ast.AsArrayLiteralExpression(node), NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).arrayAssignmentElementVisitor, (Node__from_ast.AsArrayLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements), (Node__from_ast.AsArrayLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine);
        }
        const __gotots_store_217 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_218 = (Transformer__from_transformers.Factory(__gotots_store_217.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateObjectLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeFactory"), Node__from_ast.AsObjectLiteralExpression(node), NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).objectAssignmentElementVisitor, (Node__from_ast.AsObjectLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties), (Node__from_ast.AsObjectLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine);
    }
    static $go$private$estransforms$visitAssignmentProperty(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let prop: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = Node__from_ast.AsPropertyAssignment(node);
        const __gotots_store_247 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_247.Transformer), PropertyAssignment__from_ast.Name(prop));
        let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyAssignment__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer;
        if (IsAssignmentExpression__from_ast(init, true)) {
            let assignElem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitAssignmentElement(tx, init);
            const __gotots_store_248 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_249 = (Transformer__from_transformers.Factory(__gotots_store_248.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_249, "NodeFactory"), prop, void 0, name, void 0, void 0, assignElem);
        }
        if (IsLeftHandSideExpression__from_ast(init)) {
            let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, init);
            const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_251 = (Transformer__from_transformers.Factory(__gotots_store_250.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_251, "NodeFactory"), prop, void 0, name, void 0, void 0, target);
        }
        const __gotots_store_252 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_252.Transformer), node);
    }
    static $go$private$estransforms$visitAssignmentRestElement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let spread: {
            value: SpreadElement__from_ast;
        } | undefined = Node__from_ast.AsSpreadElement(node);
        if (IsLeftHandSideExpression__from_ast((spread ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, (spread ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_store_233 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_234 = (Transformer__from_transformers.Factory(__gotots_store_233.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_234, "NodeFactory"), spread, expr);
        }
        const __gotots_store_235 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_235.Transformer), node);
    }
    static $go$private$estransforms$visitAssignmentRestProperty(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let spread: {
            value: SpreadAssignment__from_ast;
        } | undefined = Node__from_ast.AsSpreadAssignment(node);
        if (IsLeftHandSideExpression__from_ast((spread ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitDestructuringAssignmentTarget(tx, (spread ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_store_241 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_242 = (Transformer__from_transformers.Factory(__gotots_store_241.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateSpreadAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_242, "NodeFactory"), spread, expr);
        }
        const __gotots_store_243 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_243.Transformer), node);
    }
    static $go$private$estransforms$visitAssignmentTarget(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindObjectLiteralExpression$constant__from_ast():
            case KindArrayLiteralExpression$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitAssignmentPattern(tx, node);
                break;
            }
            default: {
                return classFieldsTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitBinaryExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_103 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_89 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_103, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (IsDestructuringAssignment__from_ast(__gotots_argument_89)) {
            let savedPendingExpressions = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory");
            const __gotots_argument_90 = node;
            const __gotots_argument_91 = void 0;
            const __gotots_argument_92 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).assignmentTargetVisitor, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            const __gotots_argument_93 = void 0;
            const __gotots_argument_94 = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken;
            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_95 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_106.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateBinaryExpression(__gotots_receiver_40, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93, __gotots_argument_94, __gotots_argument_95);
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
                let exprs = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.append(void 0, [updated]);
                const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                result = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_107.Transformer), exprs);
            }
            else {
                result = updated;
            }
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = savedPendingExpressions;
            return result;
        }
        const __gotots_store_108 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_96 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_108, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_97 = false;
        if (IsAssignmentExpression__from_ast(__gotots_argument_96, __gotots_argument_97)) {
            const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_98 = Transformer__from_transformers.EmitContext(__gotots_store_109.Transformer);
            const __gotots_store_110 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
            const __gotots_argument_99 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_110, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
            if (isNamedEvaluationAnd(__gotots_argument_98, __gotots_argument_99, __gotots_argument_100)) {
                const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_101 = Transformer__from_transformers.EmitContext(__gotots_store_111.Transformer);
                const __gotots_store_112 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                const __gotots_argument_102 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_112, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_103 = false;
                const __gotots_argument_104 = "";
                node = Node__from_ast.AsBinaryExpression(transformNamedEvaluation(__gotots_argument_101, __gotots_argument_102, __gotots_argument_103, __gotots_argument_104));
                const __gotots_store_113 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                let __gotots_logical_result_2 = !(NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_113, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)) === undefined);
                if (__gotots_logical_result_2) {
                    const __gotots_store_114 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                    const __gotots_argument_105 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_114, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_106 = false;
                    __gotots_logical_result_2 = IsAssignmentExpression__from_ast(__gotots_argument_105, __gotots_argument_106);
                }
                const __gotots_argument_107 = __gotots_logical_result_2;
                const __gotots_argument_108 = RuntimeSlice.nil<GoInterface | undefined>();
                Assert__from_debug(__gotots_argument_107, __gotots_argument_108);
            }
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, 9);
            if (IsPropertyAccessExpression__from_ast(left) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(left))) {
                let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, Node__from_ast.Name(left));
                if (!(info === undefined)) {
                    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAssignment(tx, info, Node__from_ast.Expression(left), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
                    const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_41 = Transformer__from_transformers.EmitContext(__gotots_store_115.Transformer);
                    const __gotots_argument_109 = result;
                    const __gotots_store_116 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                    const __gotots_argument_110 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_116, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_41, __gotots_argument_109, __gotots_argument_110);
                    Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                    BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                    return result;
                }
            }
            else if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && IsSuperProperty__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
                let data: classLexicalEnvironment | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
                if (!(((void classFacts,
                    (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                    ===
                        ((void classFacts,
                            0) as int))) {
                    const __gotots_store_117 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_118 = (Transformer__from_transformers.Factory(__gotots_store_117.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeFactory");
                    const __gotots_argument_111 = node;
                    const __gotots_argument_112 = void 0;
                    const __gotots_argument_113 = classFieldsTransformer.$go$private$estransforms$visitInvalidSuperProperty(tx, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                    const __gotots_argument_114 = void 0;
                    const __gotots_argument_115 = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken;
                    const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_116 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_119.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                    return NodeFactory__from_ast.UpdateBinaryExpression(__gotots_receiver_42, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116);
                }
                if (!((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference === undefined)) {
                    let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (IsElementAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
                        const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        setterName = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_120.Transformer), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                    }
                    else if (IsPropertyAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)))) {
                        const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        setterName = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(__gotots_store_121.Transformer), PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)));
                    }
                    if (!(setterName === undefined)) {
                        const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_122.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                        if (IsCompoundAssignment__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
                            let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = setterName;
                            if (!IsSimpleInlineableExpression__from_transformers(setterName)) {
                                const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                getterName = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_123.Transformer));
                                const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_124.Transformer), getterName);
                                const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                setterName = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_125.Transformer), getterName, setterName);
                            }
                            const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let superPropertyGet: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(Transformer__from_transformers.Factory(__gotots_store_126.Transformer), (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference, getterName, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                            const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_127.Transformer), superPropertyGet, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                            Node__from_ast.$storageOf(((superPropertyGet ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_129 = (Transformer__from_transformers.Factory(__gotots_store_128.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory");
                            const __gotots_argument_117 = void 0;
                            const __gotots_argument_118 = superPropertyGet;
                            const __gotots_argument_119 = void 0;
                            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_131 = (Transformer__from_transformers.Factory(__gotots_store_130.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_120 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeFactory"), GetNonAssignmentOperatorForCompoundAssignment__from_transformers(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
                            const __gotots_argument_121 = expression;
                            expression = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_43, __gotots_argument_117, __gotots_argument_118, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121);
                            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                        }
                        let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!discarded) {
                            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            temp = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_132.Transformer));
                            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_133.Transformer), temp);
                        }
                        if (!(temp === undefined)) {
                            const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_134.Transformer), temp, expression);
                            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                        }
                        const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        expression = NodeFactory__from_printer.NewReflectSetCall(Transformer__from_transformers.Factory(__gotots_store_135.Transformer), (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference, setterName, expression, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                        const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_44 = Transformer__from_transformers.EmitContext(__gotots_store_136.Transformer);
                        const __gotots_argument_122 = expression;
                        const __gotots_store_137 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                        const __gotots_argument_123 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_137, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        EmitContext__from_printer.SetOriginal(__gotots_receiver_44, __gotots_argument_122, __gotots_argument_123);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                        if (!(temp === undefined)) {
                            const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            expression = NodeFactory__from_printer.NewCommaExpression(Transformer__from_transformers.Factory(__gotots_store_138.Transformer), expression, temp);
                            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                        }
                        return expression;
                    }
                }
            }
        }
        if (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInKeyword$constant__from_ast() && IsPrivateIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
            return classFieldsTransformer.$go$private$estransforms$transformPrivateIdentifierInInExpression(tx, node);
        }
        const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_45 = Transformer__from_transformers.Visitor(__gotots_store_139.Transformer);
        const __gotots_store_140 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_124 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_140, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_45, __gotots_argument_124);
    }
    static $go$private$estransforms$visitBindingElement(tx: classFieldsTransformer | undefined, node: {
        value: BindingElement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_47 = Transformer__from_transformers.EmitContext(__gotots_store_47.Transformer);
        const __gotots_store_48 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_48 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_48, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_47, __gotots_argument_48, __gotots_argument_49)) {
            const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_50 = Transformer__from_transformers.EmitContext(__gotots_store_49.Transformer);
            const __gotots_store_50 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_51 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_50, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_52 = false;
            const __gotots_argument_53 = "";
            node = Node__from_ast.AsBindingElement(transformNamedEvaluation(__gotots_argument_50, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53));
        }
        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_30 = Transformer__from_transformers.Visitor(__gotots_store_51.Transformer);
        const __gotots_store_52 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_54 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_52, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_30, __gotots_argument_54);
    }
    static $go$private$estransforms$visitCallExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPropertyAccessExpression__from_ast(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression) && IsPrivateIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression))) && !(classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression))) === undefined)) {
            const __gotots_results_1 = classFieldsTransformer.$go$private$estransforms$createCallBinding(tx, CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_1[0];
            let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_1[1];
            const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let visitedTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_146.Transformer), target);
            const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let visitedThisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_147.Transformer), thisArg);
            const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let visitedArgs: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_148.Transformer), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
            let allArgs = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1 + NodeList__from_ast.$storageOf(((visitedArgs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
            allArgs = allArgs.append(void 0, [visitedThisArg]);
            allArgs = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allArgs, NodeList__from_ast.$storageOf(((visitedArgs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
            if (!(((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
                const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_150 = (Transformer__from_transformers.Factory(__gotots_store_149.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "NodeFactory");
                const __gotots_argument_129 = node;
                const __gotots_store_151 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_152 = (Transformer__from_transformers.Factory(__gotots_store_151.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "NodeFactory");
                const __gotots_argument_125 = visitedTarget;
                const __gotots_argument_126 = CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken;
                const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_154 = (Transformer__from_transformers.Factory(__gotots_store_153.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_127 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory"), "call");
                const __gotots_argument_128 = NodeFlagsOptionalChain$constant__from_ast();
                const __gotots_argument_130 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_46, __gotots_argument_125, __gotots_argument_126, __gotots_argument_127, __gotots_argument_128);
                const __gotots_argument_131 = void 0;
                const __gotots_argument_132 = void 0;
                const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_156 = (Transformer__from_transformers.Factory(__gotots_store_155.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_133 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory"), allArgs);
                const __gotots_argument_134 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                            CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
                return NodeFactory__from_ast.UpdateCallExpression(__gotots_receiver_47, __gotots_argument_129, __gotots_argument_130, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133, __gotots_argument_134);
            }
            const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_158 = (Transformer__from_transformers.Factory(__gotots_store_157.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory");
            const __gotots_argument_139 = node;
            const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_160 = (Transformer__from_transformers.Factory(__gotots_store_159.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory");
            const __gotots_argument_135 = visitedTarget;
            const __gotots_argument_136 = void 0;
            const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_162 = (Transformer__from_transformers.Factory(__gotots_store_161.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_137 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), "call");
            const __gotots_argument_138 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_140 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_48, __gotots_argument_135, __gotots_argument_136, __gotots_argument_137, __gotots_argument_138);
            const __gotots_argument_141 = void 0;
            const __gotots_argument_142 = void 0;
            const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_164 = (Transformer__from_transformers.Factory(__gotots_store_163.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_143 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory"), allArgs);
            const __gotots_argument_144 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            return NodeFactory__from_ast.UpdateCallExpression(__gotots_receiver_49, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143, __gotots_argument_144);
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && IsSuperProperty__from_ast(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) && !((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined)) {
            const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_50 = Transformer__from_transformers.Factory(__gotots_store_165.Transformer);
            const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_145 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_166.Transformer), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            const __gotots_argument_146 = (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_147 = NodeList__from_ast.$storageOf(((NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_167.Transformer), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            let invocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionCallCall(__gotots_receiver_50, __gotots_argument_145, __gotots_argument_146, __gotots_argument_147);
            const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_51 = Transformer__from_transformers.EmitContext(__gotots_store_168.Transformer);
            const __gotots_argument_148 = invocation;
            const __gotots_store_169 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_149 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_169, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_51, __gotots_argument_148, __gotots_argument_149);
            Node__from_ast.$storageOf(((invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
            return invocation;
        }
        const __gotots_store_170 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_52 = Transformer__from_transformers.Visitor(__gotots_store_170.Transformer);
        const __gotots_store_171 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_150 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_171, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_52, __gotots_argument_150);
    }
    static $go$private$estransforms$visitClassDeclaration(tx: classFieldsTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_24 = tx;
        const __gotots_store_23 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_18 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_23, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_19 = ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: classFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return classFieldsTransformer.$go$private$estransforms$visitClassDeclarationInNewClassLexicalEnvironment($argument0, $argument1, $argument2);
        };
        return classFieldsTransformer.$go$private$estransforms$visitInNewClassLexicalEnvironment(__gotots_receiver_24, __gotots_argument_18, __gotots_argument_19);
    }
    static $go$private$estransforms$visitClassDeclarationInNewClassLexicalEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, facts: classFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let classDecl: {
            value: ClassDeclaration__from_ast;
        } | undefined = Node__from_ast.AsClassDeclaration(node);
        let pendingClassReferenceAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((void classFacts,
            facts.$value & classFactsNeedsClassConstructorReference$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int))) {
            let __gotots_logical_result_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks;
            if (__gotots_logical_result_4) {
                const __gotots_store_267 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_logical_result_4 = !(EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_267.Transformer), node) === undefined);
            }
            if (__gotots_logical_result_4) {
                const __gotots_store_268 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_268.Transformer), node);
                (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = classThis;
                const __gotots_store_269 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_70 = Transformer__from_transformers.Factory(__gotots_store_269.Transformer);
                const __gotots_argument_219 = classThis;
                const __gotots_store_270 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_220 = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_270.Transformer), node);
                pendingClassReferenceAssignment = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_70, __gotots_argument_219, __gotots_argument_220);
            }
            else {
                const __gotots_store_271 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_271.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
                const __gotots_store_272 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_272.Transformer), temp);
                const __gotots_receiver_71 = temp;
                const __gotots_store_273 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_221 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_273.Transformer));
                (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = Node__from_ast.Clone(__gotots_receiver_71, __gotots_argument_221);
                const __gotots_store_274 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_72 = Transformer__from_transformers.Factory(__gotots_store_274.Transformer);
                const __gotots_argument_222 = temp;
                const __gotots_store_275 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_223 = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_275.Transformer), node);
                pendingClassReferenceAssignment = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_72, __gotots_argument_222, __gotots_argument_223);
            }
        }
        const __gotots_store_276 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (!(EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_276.Transformer), node) === undefined)) {
            const __gotots_store_277 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_277.Transformer), node);
        }
        let isClassWithConstructorReference = classFieldsTransformer.$go$private$estransforms$classContainsConstructorReference(tx, node);
        let alias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
        if (isClassWithConstructorReference && !(alias === undefined)) {
            const __gotots_store_279 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
            const __gotots_store_278 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_279.store(EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_278.Transformer), node), alias);
        }
        const __gotots_receiver_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_280: ClassDeclaration__from_ast["ClassLikeBase"] = (classDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_224 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_280, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_73, __gotots_argument_224);
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).heritageClauseVisitor, (classDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_results_4 = classFieldsTransformer.$go$private$estransforms$transformClassMembers(tx, node);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_4[0];
        let membersPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_4[1];
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(pendingClassReferenceAssignment === undefined)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([pendingClassReferenceAssignment]), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, void 0);
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
            const __gotots_argument_226 = statements;
            const __gotots_store_281 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_282 = (Transformer__from_transformers.Factory(__gotots_store_281.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_282, "NodeFactory");
            const __gotots_store_283 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_225 = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_283.Transformer), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions);
            const __gotots_argument_227 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_74, __gotots_argument_225);
            statements = __gotots_argument_226.append(void 0, [__gotots_argument_227]);
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ClassDeclaration__from_ast.Name(classDecl);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingSet || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            let staticProperties = classFieldsTransformer.$go$private$estransforms$getStaticPropertiesAndClassStaticBlock(tx, node);
            if (staticProperties.length > 0) {
                if (name === undefined) {
                    const __gotots_store_284 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    name = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_284.Transformer), node);
                }
                const __gotots_receiver_75 = tx;
                const __gotots_argument_228 = statements;
                const __gotots_argument_229 = staticProperties;
                const __gotots_store_285 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_230 = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_285.Transformer), node);
                statements = classFieldsTransformer.$go$private$estransforms$addPropertyOrClassStaticBlockStatements(__gotots_receiver_75, __gotots_argument_228, __gotots_argument_229, __gotots_argument_230);
            }
        }
        let isExport = HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast());
        let isDefault = HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast());
        if (statements.length > 0 && isExport && isDefault) {
            const __gotots_store_286 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_231 = Transformer__from_transformers.EmitContext(__gotots_store_286.Transformer);
            const __gotots_argument_232 = modifiers;
            const __gotots_argument_233 = 4294965215;
            modifiers = ExtractModifiers__from_transformers(__gotots_argument_231, __gotots_argument_232, __gotots_argument_233);
            const __gotots_store_287 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_288 = (Transformer__from_transformers.Factory(__gotots_store_287.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_76 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_288, "NodeFactory");
            const __gotots_argument_234 = void 0;
            const __gotots_argument_235 = false;
            const __gotots_argument_236 = void 0;
            const __gotots_store_289 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_237 = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_289.Transformer), node);
            let exportAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportAssignment(__gotots_receiver_76, __gotots_argument_234, __gotots_argument_235, __gotots_argument_236, __gotots_argument_237);
            statements = statements.append(void 0, [exportAssignment]);
        }
        const __gotots_store_290 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_291 = (Transformer__from_transformers.Factory(__gotots_store_290.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updatedClass: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_291, "NodeFactory"), classDecl, modifiers, name, void 0, heritageClauses, members);
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1 + statements.length + 1, void 0);
        if (!(membersPrologue === undefined)) {
            const __gotots_argument_238 = result;
            const __gotots_store_292 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_293 = (Transformer__from_transformers.Factory(__gotots_store_292.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_239 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_293, "NodeFactory"), membersPrologue);
            result = __gotots_argument_238.append(void 0, [__gotots_argument_239]);
        }
        result = result.append(void 0, [updatedClass]);
        result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, statements, void 0);
        const __gotots_store_294 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_295 = (Transformer__from_transformers.Factory(__gotots_store_294.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_295, "NodeFactory"), result);
    }
    static $go$private$estransforms$visitClassElement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindConstructor$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, node, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return classFieldsTransformer.$go$private$estransforms$visitConstructorDeclaration($argument0, $argument1);
                }, node);
                break;
            }
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, node, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return classFieldsTransformer.$go$private$estransforms$visitMethodOrAccessorDeclaration($argument0, $argument1);
                }, node);
                break;
            }
            case KindPropertyDeclaration$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, node, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return classFieldsTransformer.$go$private$estransforms$visitPropertyDeclaration($argument0, $argument1);
                }, node);
                break;
            }
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, node, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return classFieldsTransformer.$go$private$estransforms$visitClassStaticBlockDeclaration($argument0, $argument1);
                }, node);
                break;
            }
            case KindComputedPropertyName$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitComputedPropertyName(tx, Node__from_ast.AsComputedPropertyName(node));
                break;
            }
            case KindSemicolonClassElement$constant__from_ast(): {
                return node;
                break;
            }
            default: {
                if (IsModifierLike__from_ast(node)) {
                    return classFieldsTransformer.$go$private$estransforms$visitModifier(tx, node);
                }
                return classFieldsTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitClassExpression(tx: classFieldsTransformer | undefined, node: {
        value: ClassExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_25 = tx;
        const __gotots_store_24 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_20 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_24, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_21 = ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: classFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return classFieldsTransformer.$go$private$estransforms$visitClassExpressionInNewClassLexicalEnvironment($argument0, $argument1, $argument2);
        };
        return classFieldsTransformer.$go$private$estransforms$visitInNewClassLexicalEnvironment(__gotots_receiver_25, __gotots_argument_20, __gotots_argument_21);
    }
    static $go$private$estransforms$visitClassExpressionInNewClassLexicalEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, facts: classFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let classExpr: {
            value: ClassExpression__from_ast;
        } | undefined = Node__from_ast.AsClassExpression(node);
        let isDecoratedClassDeclaration = !(((void classFacts,
            facts.$value & classFactsClassWasDecorated$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int));
        const __gotots_store_303 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (!(EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_303.Transformer), node) === undefined)) {
            const __gotots_store_304 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classThis = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_304.Transformer), node);
        }
        let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((void classFacts,
            facts.$value & classFactsNeedsClassConstructorReference$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int))) {
            let __gotots_logical_result_5 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || classFieldsTransformer.$go$private$estransforms$nodeHasTransformPrivateStaticElementsFlag(tx, node));
            if (__gotots_logical_result_5) {
                const __gotots_store_305 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_logical_result_5 = !(EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_305.Transformer), node) === undefined);
            }
            if (__gotots_logical_result_5) {
                const __gotots_store_306 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_306.Transformer), node);
                (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = classThis;
                temp = classThis;
            }
            else {
                const __gotots_store_307 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                temp = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_307.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
                if (classFieldsTransformer.$go$private$estransforms$classExpressionNeedsBlockScopedTemp(tx)) {
                    const __gotots_store_308 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_308.Transformer), temp);
                }
                else {
                    const __gotots_store_309 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_309.Transformer), temp);
                }
                const __gotots_receiver_77 = temp;
                const __gotots_store_310 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_243 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_310.Transformer));
                (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = Node__from_ast.Clone(__gotots_receiver_77, __gotots_argument_243);
            }
        }
        let staticPropertiesOrClassStaticBlocks = classFieldsTransformer.$go$private$estransforms$getStaticPropertiesAndClassStaticBlock(tx, node);
        let isClassWithConstructorReference = false;
        let hasTransformableStatics = false;
        let deferTempDeclaration = false;
        if (!isDecoratedClassDeclaration) {
            isClassWithConstructorReference = classFieldsTransformer.$go$private$estransforms$classContainsConstructorReference(tx, node);
            hasTransformableStatics = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || classFieldsTransformer.$go$private$estransforms$nodeHasTransformPrivateStaticElementsFlag(tx, node)) && Some$PointerTo_Named_ast$Node(staticPropertiesOrClassStaticBlocks, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return IsClassStaticBlockDeclaration__from_ast(n) || IsPrivateIdentifierClassElementDeclaration__from_ast(n) || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializers && IsInitializedProperty__from_ast(n));
            });
            let willHavePrivatePendingExpressions = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks && Some$PointerTo_Named_ast$Node(Node__from_ast.Members(node), (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return IsPrivateIdentifierClassElementDeclaration__from_ast(n) && !HasStaticModifier__from_ast(n) && classFieldsTransformer.$go$private$estransforms$shouldTransformClassElementToWeakMap(tx, n);
            });
            let willNeedTempWrapper = hasTransformableStatics || willHavePrivatePendingExpressions;
            if (isClassWithConstructorReference && willNeedTempWrapper && (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) {
                const __gotots_store_311 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                temp = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_311.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
                deferTempDeclaration = true;
                const __gotots_receiver_78 = temp;
                const __gotots_store_312 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_244 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_312.Transformer));
                (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = Node__from_ast.Clone(__gotots_receiver_78, __gotots_argument_244);
            }
            {
                let alias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
                if (isClassWithConstructorReference && willNeedTempWrapper && !(alias === undefined)) {
                    const __gotots_store_314 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
                    const __gotots_store_313 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_store_314.store(EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_313.Transformer), node), alias);
                }
            }
        }
        const __gotots_receiver_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor;
        const __gotots_store_315: ClassExpression__from_ast["ClassLikeBase"] = (classExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_245 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_315, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_79, __gotots_argument_245);
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).heritageClauseVisitor, (classExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_results_5 = classFieldsTransformer.$go$private$estransforms$transformClassMembers(tx, node);
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_5[0];
        let membersPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_5[1];
        if (deferTempDeclaration) {
            if (classFieldsTransformer.$go$private$estransforms$classExpressionNeedsBlockScopedTemp(tx)) {
                const __gotots_store_316 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_316.Transformer), temp);
            }
            else {
                const __gotots_store_317 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_317.Transformer), temp);
            }
        }
        const __gotots_store_318 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_319 = (Transformer__from_transformers.Factory(__gotots_store_318.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let classExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_319, "NodeFactory"), classExpr, modifiers, ClassExpression__from_ast.Name(classExpr), void 0, heritageClauses, members);
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(membersPrologue === undefined)) {
            expressions = expressions.append(void 0, [membersPrologue]);
        }
        if (!isDecoratedClassDeclaration) {
            if (hasTransformableStatics || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
                if (temp === undefined) {
                    const __gotots_store_320 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    temp = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_320.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
                    if (classFieldsTransformer.$go$private$estransforms$classExpressionNeedsBlockScopedTemp(tx)) {
                        const __gotots_store_321 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddLexicalDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_321.Transformer), temp);
                    }
                    else {
                        const __gotots_store_322 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_322.Transformer), temp);
                    }
                    const __gotots_receiver_80 = temp;
                    const __gotots_store_323 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_246 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_323.Transformer));
                    (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor = Node__from_ast.Clone(__gotots_receiver_80, __gotots_argument_246);
                    if (isClassWithConstructorReference) {
                        const __gotots_store_325 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases;
                        const __gotots_store_324 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        __gotots_store_325.store(EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_324.Transformer), node), (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                    }
                }
                const __gotots_argument_247 = expressions;
                const __gotots_store_326 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_248 = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_326.Transformer), temp, classExpression);
                expressions = __gotots_argument_247.append(void 0, [__gotots_argument_248]);
                expressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(expressions, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions, void 0);
                expressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(expressions, classFieldsTransformer.$go$private$estransforms$generateInitializedPropertyExpressionsOrClassStaticBlock(tx, staticPropertiesOrClassStaticBlocks, temp), void 0);
                const __gotots_argument_250 = expressions;
                const __gotots_receiver_81 = temp;
                const __gotots_store_327 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_249 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_327.Transformer));
                const __gotots_argument_251 = Node__from_ast.Clone(__gotots_receiver_81, __gotots_argument_249);
                expressions = __gotots_argument_250.append(void 0, [__gotots_argument_251]);
            }
            else {
                expressions = expressions.append(void 0, [classExpression]);
            }
        }
        else {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions.length > 0) {
                const __gotots_range_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                    let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                    const __gotots_argument_252 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements;
                    const __gotots_store_328 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_329 = (Transformer__from_transformers.Factory(__gotots_store_328.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_253 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_329, "NodeFactory"), expr);
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements = __gotots_argument_252.append(void 0, [__gotots_argument_253]);
                }
            }
            if (staticPropertiesOrClassStaticBlocks.length > 0) {
                const __gotots_store_330 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let classThisOrName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_330.Transformer), node);
                if (classThisOrName === undefined) {
                    const __gotots_store_331 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    classThisOrName = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_331.Transformer), node);
                }
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements = classFieldsTransformer.$go$private$estransforms$addPropertyOrClassStaticBlockStatements(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements, staticPropertiesOrClassStaticBlocks, classThisOrName);
            }
            if (!(temp === undefined)) {
                const __gotots_argument_254 = expressions;
                const __gotots_store_332 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_255 = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_332.Transformer), temp, classExpression);
                expressions = __gotots_argument_254.append(void 0, [__gotots_argument_255]);
            }
            else {
                let __gotots_logical_result_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks;
                if (__gotots_logical_result_6) {
                    const __gotots_store_333 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_logical_result_6 = !(EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_333.Transformer), node) === undefined);
                }
                if (__gotots_logical_result_6) {
                    const __gotots_argument_258 = expressions;
                    const __gotots_store_334 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_82 = Transformer__from_transformers.Factory(__gotots_store_334.Transformer);
                    const __gotots_store_335 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_256 = EmitContext__from_printer.ClassThis(Transformer__from_transformers.EmitContext(__gotots_store_335.Transformer), node);
                    const __gotots_argument_257 = classExpression;
                    const __gotots_argument_259 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_82, __gotots_argument_256, __gotots_argument_257);
                    expressions = __gotots_argument_258.append(void 0, [__gotots_argument_259]);
                }
                else {
                    expressions = expressions.append(void 0, [classExpression]);
                }
            }
        }
        if (expressions.length > 1) {
            const __gotots_store_336 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_336.Transformer), classExpression, EFIndented$constant__from_printer());
            const __gotots_range_3 = expressions;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                const __gotots_store_337 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_337.Transformer), expr, EFStartOnNewLine$constant__from_printer());
            }
        }
        const __gotots_store_338 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_338.Transformer), expressions);
    }
    static $go$private$estransforms$visitClassStaticBlockDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            const __gotots_store_227 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_227.Transformer), node);
        }
        return void 0;
    }
    static $go$private$estransforms$visitComputedPropertyName(tx: classFieldsTransformer | undefined, node: {
        value: ComputedPropertyName__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedLexicalEnvironment: classLexicalEnv | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment;
        let savedInsideComputedPropertyName = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName = true;
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous === undefined)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previous;
        }
        const __gotots_store_228 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_228.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = savedLexicalEnvironment;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName = savedInsideComputedPropertyName;
        const __gotots_store_229 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_230 = (Transformer__from_transformers.Factory(__gotots_store_229.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_230, "NodeFactory"), node, classFieldsTransformer.$go$private$estransforms$injectPendingExpressions(tx, expression));
    }
    static $go$private$estransforms$visitConstructorDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer === undefined)) {
            return classFieldsTransformer.$go$private$estransforms$transformConstructor(tx, Node__from_ast.AsConstructorDeclaration(node), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer);
        }
        const __gotots_store_219 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_219.Transformer), node);
    }
    static $go$private$estransforms$visitDestructuringAssignmentTarget(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsObjectLiteralExpression__from_ast(node) || IsArrayLiteralExpression__from_ast(node)) {
            return classFieldsTransformer.$go$private$estransforms$visitAssignmentPattern(tx, node);
        }
        if (IsPropertyAccessExpression__from_ast(node) && IsPrivateIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)))) {
            return classFieldsTransformer.$go$private$estransforms$wrapPrivateIdentifierForDestructuringTarget(tx, node);
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && IsSuperProperty__from_ast(node) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            let data: classLexicalEnvironment | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
            if (!(((void classFacts,
                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                ===
                    ((void classFacts,
                        0) as int))) {
                return classFieldsTransformer.$go$private$estransforms$visitInvalidSuperProperty(tx, node);
            }
            if (!((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference === undefined)) {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsElementAccessExpression__from_ast(node)) {
                    const __gotots_store_481 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    name = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_481.Transformer), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                }
                else if (IsPropertyAccessExpression__from_ast(node) && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)))) {
                    const __gotots_store_482 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    name = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(__gotots_store_482.Transformer), PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)));
                }
                if (!(name === undefined)) {
                    const __gotots_store_483 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_483.Transformer));
                    const __gotots_store_484 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let setExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectSetCall(Transformer__from_transformers.Factory(__gotots_store_484.Transformer), (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference, name, temp, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                    const __gotots_store_485 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    return NodeFactory__from_printer.NewAssignmentTargetWrapper(Transformer__from_transformers.Factory(__gotots_store_485.Transformer), temp, setExpr);
                }
            }
        }
        const __gotots_store_486 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_486.Transformer), node);
    }
    static $go$private$estransforms$visitDiscardedValue(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPrefixUnaryExpression$constant__from_ast():
            case KindPostfixUnaryExpression$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitPreOrPostfixUnaryExpression(tx, node, true);
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitBinaryExpression(tx, Node__from_ast.AsBinaryExpression(node), true);
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitParenthesizedExpression(tx, Node__from_ast.AsParenthesizedExpression(node), true);
                break;
            }
            default: {
                return classFieldsTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitEachChildOfNode(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_202 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_202.Transformer), node);
    }
    static $go$private$estransforms$visitElementAccessExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined);
        if (__gotots_logical_result_1) {
            const __gotots_store_71 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_71 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_71, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_1 = IsSuperProperty__from_ast(__gotots_argument_71);
        }
        if (__gotots_logical_result_1 && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            let data: classLexicalEnvironment | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
            if (!(((void classFacts,
                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                ===
                    ((void classFacts,
                        0) as int))) {
                const __gotots_receiver_36 = tx;
                const __gotots_store_72 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_72 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_72, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return classFieldsTransformer.$go$private$estransforms$visitInvalidSuperProperty(__gotots_receiver_36, __gotots_argument_72);
            }
            if (!((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference === undefined)) {
                const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_37 = Transformer__from_transformers.Factory(__gotots_store_73.Transformer);
                const __gotots_argument_73 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference;
                const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_74 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_74.Transformer), ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                const __gotots_argument_75 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
                let superProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(__gotots_receiver_37, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
                const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_75.Transformer), superProperty, ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression);
                Node__from_ast.$storageOf(((superProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                return superProperty;
            }
        }
        const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_38 = Transformer__from_transformers.Visitor(__gotots_store_76.Transformer);
        const __gotots_store_77 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                ElementAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_76 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_77, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_38, __gotots_argument_76);
    }
    static $go$private$estransforms$visitExportAssignment(tx: classFieldsTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_55 = Transformer__from_transformers.EmitContext(__gotots_store_53.Transformer);
        const __gotots_store_54 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_56 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_54, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57)) {
            let assignedName = "";
            if (!(node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
                assignedName = "default";
            }
            const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_58 = Transformer__from_transformers.EmitContext(__gotots_store_55.Transformer);
            const __gotots_store_56 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_59 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_56, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_60 = true;
            const __gotots_argument_61 = assignedName;
            node = Node__from_ast.AsExportAssignment(transformNamedEvaluation(__gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61));
        }
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_31 = Transformer__from_transformers.Visitor(__gotots_store_57.Transformer);
        const __gotots_store_58 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_62 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_58, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_31, __gotots_argument_62);
    }
    static $go$private$estransforms$visitExpressionStatement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(ExpressionStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).Expression) && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            const __gotots_store_172 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    ExpressionStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).StatementBase)).NodeBase));
            return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_172, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_174 = (Transformer__from_transformers.Factory(__gotots_store_173.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "NodeFactory"), node, NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, ExpressionStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).Expression));
    }
    static $go$private$estransforms$visitExpressionWithTypeArgumentsInHeritageClause(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let facts = classFactsNone$constant();
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            facts = (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts;
        }
        if (!(((void classFacts,
            facts.$value & classFactsNeedsClassSuperReference$constant().$value) as int)
            ===
                ((void classFacts,
                    0) as int))) {
            const __gotots_store_208 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_208.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
            const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_209.Transformer), temp);
            (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference = temp;
            const __gotots_store_210 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_211 = (Transformer__from_transformers.Factory(__gotots_store_210.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "NodeFactory");
            const __gotots_argument_188 = node;
            const __gotots_store_212 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_63 = Transformer__from_transformers.Factory(__gotots_store_212.Transformer);
            const __gotots_argument_186 = temp;
            const __gotots_store_213 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_187 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_213.Transformer), ExpressionWithTypeArguments__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression);
            const __gotots_argument_189 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_63, __gotots_argument_186, __gotots_argument_187);
            const __gotots_argument_190 = void 0;
            return NodeFactory__from_ast.UpdateExpressionWithTypeArguments(__gotots_receiver_64, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190);
        }
        const __gotots_receiver_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).heritageClauseVisitor;
        const __gotots_store_214 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                ExpressionWithTypeArguments__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_191 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_214, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_65, __gotots_argument_191);
    }
    static $go$private$estransforms$visitForStatement(tx: classFieldsTransformer | undefined, node: {
        value: ForStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_197 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let condition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_197.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
        let incrementor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        let saved = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = true;
        const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_61 = Transformer__from_transformers.EmitContext(__gotots_store_198.Transformer);
        const __gotots_argument_179 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement;
        const __gotots_store_199 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_180 = Transformer__from_transformers.Visitor(__gotots_store_199.Transformer);
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.VisitIterationBody(__gotots_receiver_61, __gotots_argument_179, __gotots_argument_180);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = saved;
        const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_201 = (Transformer__from_transformers.Factory(__gotots_store_200.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateForStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory"), node, initializer, condition, incrementor, body);
    }
    static $go$private$estransforms$visitForSubstitution(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
            return classFieldsTransformer.$go$private$estransforms$visitIdentifier(tx, Node__from_ast.AsIdentifier(node));
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast() && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node)))) {
            return classFieldsTransformer.$go$private$estransforms$visitPropertyAccessExpressionForSubstitution(tx, Node__from_ast.AsPropertyAccessExpression(node));
        }
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).substitutionVisitor, node);
    }
    static $go$private$estransforms$visitFunctionExpressionOrDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined)) {
            const __gotots_store_206 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_206.Transformer), node);
            if (!tsonicTypeScriptRuntime.sameLocation(original, node) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer === undefined)) {
                const __gotots_range_0 = Node__from_ast.Members((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer);
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    if (tsonicTypeScriptRuntime.sameLocation(EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_207.Transformer), member), original)
                        && IsStatic__from_ast(member)) {
                        return classFieldsTransformer.$go$private$estransforms$visitEachChildOfNode(tx, node);
                    }
                }
            }
        }
        return classFieldsTransformer.$go$private$estransforms$setCurrentClassElementAnd(tx, void 0, ($argument0: classFieldsTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return classFieldsTransformer.$go$private$estransforms$visitEachChildOfNode($argument0, $argument1);
        }, node);
    }
    static $go$private$estransforms$visitHeritageClause(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindHeritageClause$constant__from_ast(): {
                return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).heritageClauseVisitor, node);
                break;
            }
            case KindExpressionWithTypeArguments$constant__from_ast(): {
                return classFieldsTransformer.$go$private$estransforms$visitExpressionWithTypeArgumentsInHeritageClause(tx, Node__from_ast.AsExpressionWithTypeArguments(node));
                break;
            }
            default: {
                return classFieldsTransformer.$go$private$estransforms$visit(tx, node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitIdentifier(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_253 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_67 = Transformer__from_transformers.EmitContext(__gotots_store_253.Transformer);
        const __gotots_store_254 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_216 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_254, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_217 = EmitContext__from_printer.MostOriginal(__gotots_receiver_67, __gotots_argument_216);
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_68).GetReferencedValueDeclaration(__gotots_argument_217);
        if (!(declaration === undefined)) {
            {
                const __gotots_results_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases.lookupOk(declaration);
                let alias: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_3[0];
                let ok = __gotots_results_3[1];
                let __gotots_logical_result_3 = ok;
                if (__gotots_logical_result_3) {
                    const __gotots_store_255 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_logical_result_3 = Set__from_collections.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_255, "enclosingClassDeclarations"), declaration);
                }
                if (__gotots_logical_result_3) {
                    const __gotots_receiver_69 = alias;
                    const __gotots_store_256 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_218 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_256.Transformer));
                    let clone: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_69, __gotots_argument_218);
                    const __gotots_store_257 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_257.Transformer), clone, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                    (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                        Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                    const __gotots_store_258 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_258.Transformer), clone, TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                    (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                        Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                    return clone;
                }
            }
        }
        const __gotots_store_259 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_259, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    static $go$private$estransforms$visitInNewClassLexicalEnvironment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: (($0: classFieldsTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: classFacts) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedCurrentClassContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer;
        let savedPendingExpressions = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions;
        let savedLexicalEnvironment: classLexicalEnv | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer = node;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        classFieldsTransformer.$go$private$estransforms$startClassLexicalEnvironment(tx);
        const __gotots_store_296 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_296.Transformer), node);
        const __gotots_store_297 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_297, "enclosingClassDeclarations"), original);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks || classFieldsTransformer.$go$private$estransforms$nodeHasTransformPrivateStaticElementsFlag(tx, node)) {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
            if (!(name === undefined) && IsIdentifier__from_ast(name)) {
                (classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className = name;
            }
            else {
                const __gotots_store_298 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.AssignedName(Transformer__from_transformers.EmitContext(__gotots_store_298.Transformer), node);
                if (!(assignedName === undefined)) {
                    if (IsStringLiteral__from_ast(assignedName)) {
                        {
                            const __gotots_store_299 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let textSourceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.TextSource(Transformer__from_transformers.EmitContext(__gotots_store_299.Transformer), assignedName);
                            if (!(textSourceNode === undefined) && IsIdentifier__from_ast(textSourceNode)) {
                                (classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className = textSourceNode;
                            }
                            else if (IsIdentifierText__from_scanner(Node__from_ast.Text(assignedName), LanguageVariantStandard$constant__from_core())) {
                                const __gotots_store_300 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_301 = (Transformer__from_transformers.Factory(__gotots_store_300.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                let prefixName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_301, "NodeFactory"), Node__from_ast.Text(assignedName));
                                (classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.className = prefixName;
                            }
                        }
                    }
                }
            }
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            let privateInstanceMethodsAndAccessors = classFieldsTransformer.$go$private$estransforms$getPrivateInstanceMethodsAndAccessors(tx, node);
            if (privateInstanceMethodsAndAccessors.length > 0) {
                (classFieldsTransformer.$go$private$estransforms$getPrivateIdentifierEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data.weakSetName = classFieldsTransformer.$go$private$estransforms$createHoistedVariableForClass(tx, "instances", Node__from_ast.Name(privateInstanceMethodsAndAccessors.get(0)), "");
            }
        }
        let facts = classFieldsTransformer.$go$private$estransforms$getClassFacts(tx, node);
        if (!(facts.$value === classFactsNone$constant().$value)) {
            (classFieldsTransformer.$go$private$estransforms$getClassLexicalEnvironment(tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts = facts;
        }
        const __gotots_callee_4 = visitor;
        const __gotots_argument_240 = tx;
        const __gotots_argument_241 = node;
        const __gotots_argument_242 = facts;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_240, __gotots_argument_241, __gotots_argument_242);
        const __gotots_store_302 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set__from_collections.Delete<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_302, "enclosingClassDeclarations"), original);
        classFieldsTransformer.$go$private$estransforms$endClassLexicalEnvironment(tx);
        Assert__from_debug((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment
            ===
                savedLexicalEnvironment, RuntimeSlice.nil<GoInterface | undefined>());
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassContainer = savedCurrentClassContainer;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = savedPendingExpressions;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = savedLexicalEnvironment;
        return result;
    }
    static $go$private$estransforms$visitInvalidSuperProperty(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPropertyAccessExpression__from_ast(node)) {
            const __gotots_store_340 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_341 = (Transformer__from_transformers.Factory(__gotots_store_340.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_83 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_341, "NodeFactory");
            const __gotots_argument_260 = Node__from_ast.AsPropertyAccessExpression(node);
            const __gotots_store_342 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_261 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_342.Transformer));
            const __gotots_argument_262 = void 0;
            const __gotots_argument_263 = Node__from_ast.Name(node);
            const __gotots_argument_264 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags;
            return NodeFactory__from_ast.UpdatePropertyAccessExpression(__gotots_receiver_83, __gotots_argument_260, __gotots_argument_261, __gotots_argument_262, __gotots_argument_263, __gotots_argument_264);
        }
        const __gotots_store_343 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_344 = (Transformer__from_transformers.Factory(__gotots_store_343.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_84 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_344, "NodeFactory");
        const __gotots_argument_265 = Node__from_ast.AsElementAccessExpression(node);
        const __gotots_store_345 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_266 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_345.Transformer));
        const __gotots_argument_267 = void 0;
        const __gotots_store_346 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_268 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_346.Transformer), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
        const __gotots_argument_269 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags;
        return NodeFactory__from_ast.UpdateElementAccessExpression(__gotots_receiver_84, __gotots_argument_265, __gotots_argument_266, __gotots_argument_267, __gotots_argument_268, __gotots_argument_269);
    }
    static $go$private$estransforms$visitMethodOrAccessorDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(!HasDecorators__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        if (!IsPrivateIdentifierClassElementDeclaration__from_ast(node) || !classFieldsTransformer.$go$private$estransforms$shouldTransformClassElementToWeakMap(tx, node)) {
            return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor, node);
        }
        let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, Node__from_ast.Name(node));
        Assert__from_debug(!(info === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Undeclared private name for property declaration.")]));
        if (!((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<privateIdentifierInfo>).value.isValid) {
            return node;
        }
        let functionName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$getHoistedFunctionName(tx, node);
        if (!(functionName === undefined)) {
            let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$extractNonStaticNonAccessorModifiers(tx, node);
            const __gotots_store_220 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_220.Transformer));
            let saved = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = false;
            const __gotots_store_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_66 = Transformer__from_transformers.EmitContext(__gotots_store_221.Transformer);
            const __gotots_argument_196 = Node__from_ast.Body(node);
            const __gotots_store_222 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_197 = Transformer__from_transformers.Visitor(__gotots_store_222.Transformer);
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_66, __gotots_argument_196, __gotots_argument_197);
            const __gotots_store_223 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let params: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_223.Transformer), Node__from_ast.ParameterList(node));
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inIterationStatement = saved;
            const __gotots_store_224 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_225 = (Transformer__from_transformers.Factory(__gotots_store_224.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let funcExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "NodeFactory"), modifiers, BodyBase__from_ast.$storageOf(((Node__from_ast.BodyData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase__from_ast>).value).AsteriskToken, functionName, void 0, params, void 0, void 0, body);
            const __gotots_store_226 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_226.Transformer), functionName, funcExpr);
            classFieldsTransformer.$go$private$estransforms$addPendingExpressions(tx, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([assignment]));
        }
        return void 0;
    }
    static $go$private$estransforms$visitModifier(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAccessorKeyword$constant__from_ast()) {
            if (classFieldsTransformer.$go$private$estransforms$shouldTransformAutoAccessorsInCurrentClass(tx)) {
                return void 0;
            }
            return node;
        }
        if (IsModifier__from_ast(node)) {
            return node;
        }
        return void 0;
    }
    static $go$private$estransforms$visitObjectAssignmentElement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(!(node === undefined) && IsObjectBindingOrAssignmentElement__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        if (IsSpreadAssignment__from_ast(node)) {
            return classFieldsTransformer.$go$private$estransforms$visitAssignmentRestProperty(tx, node);
        }
        if (IsShorthandPropertyAssignment__from_ast(node)) {
            return classFieldsTransformer.$go$private$estransforms$visitShorthandAssignmentProperty(tx, node);
        }
        if (IsPropertyAssignment__from_ast(node)) {
            return classFieldsTransformer.$go$private$estransforms$visitAssignmentProperty(tx, node);
        }
        const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_12.Transformer), node);
    }
    static $go$private$estransforms$visitParameterDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_39 = Transformer__from_transformers.EmitContext(__gotots_store_41.Transformer);
        const __gotots_store_42 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_40 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_42, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41)) {
            const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_42 = Transformer__from_transformers.EmitContext(__gotots_store_43.Transformer);
            const __gotots_store_44 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_43 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_44, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_44 = false;
            const __gotots_argument_45 = "";
            node = Node__from_ast.AsParameterDeclaration(transformNamedEvaluation(__gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45));
        }
        const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_29 = Transformer__from_transformers.Visitor(__gotots_store_45.Transformer);
        const __gotots_store_46 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_46 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_46, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_29, __gotots_argument_46);
    }
    static $go$private$estransforms$visitParenthesizedExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (discarded) {
            let expression__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, ParenthesizedExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
            const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), node, expression__shadow_1);
        }
        const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_143.Transformer), ParenthesizedExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
        const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_145 = (Transformer__from_transformers.Factory(__gotots_store_144.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeFactory"), node, expression);
    }
    static $go$private$estransforms$visitPreOrPostfixUnaryExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, discarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let operator = 0;
        let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsPrefixUnaryExpression__from_ast(node)) {
            operator = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator;
            operand = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
        }
        else {
            operator = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
            operand = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
        }
        if (operator === KindPlusPlusToken$constant__from_ast() || operator === KindMinusMinusToken$constant__from_ast()) {
            let operandSkipped: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(operand);
            if (IsPropertyAccessExpression__from_ast(operandSkipped) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(operandSkipped))) {
                let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, Node__from_ast.Name(operandSkipped));
                if (!(info === undefined)) {
                    const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_78.Transformer), Node__from_ast.Expression(operandSkipped));
                    const __gotots_results_0 = classFieldsTransformer.$go$private$estransforms$createCopiableReceiverExpr(tx, receiver);
                    let readExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[0];
                    let initializeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[1];
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAccessHelper(tx, info, readExpression);
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!IsPrefixUnaryExpression__from_ast(node) && !discarded) {
                        const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        temp = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_79.Transformer));
                        const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_80.Transformer), temp);
                    }
                    const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_77 = Transformer__from_transformers.Factory(__gotots_store_81.Transformer);
                    const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_78 = Transformer__from_transformers.EmitContext(__gotots_store_82.Transformer);
                    const __gotots_argument_79 = node;
                    const __gotots_argument_80 = expression;
                    const __gotots_argument_81 = temp;
                    expression = expandPreOrPostfixIncrementOrDecrementExpression(__gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
                    let assignReceiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = readExpression;
                    if (!(initializeExpression === undefined)) {
                        assignReceiver = initializeExpression;
                    }
                    expression = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAssignment(tx, info, assignReceiver, expression, KindEqualsToken$constant__from_ast());
                    const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_83.Transformer), expression, node);
                    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    if (!(temp === undefined)) {
                        const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        expression = NodeFactory__from_printer.NewCommaExpression(Transformer__from_transformers.Factory(__gotots_store_84.Transformer), expression, temp);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    }
                    return expression;
                }
            }
            else if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && IsSuperProperty__from_ast(operandSkipped) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
                let data: classLexicalEnvironment | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
                if (!(((void classFacts,
                    (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                    ===
                        ((void classFacts,
                            0) as int))) {
                    let visitedExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$visitInvalidSuperProperty(tx, operandSkipped);
                    if (IsPrefixUnaryExpression__from_ast(node)) {
                        const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_86 = (Transformer__from_transformers.Factory(__gotots_store_85.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        return NodeFactory__from_ast.UpdatePrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeFactory"), Node__from_ast.AsPrefixUnaryExpression(node), PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator, visitedExpr);
                    }
                    const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_88 = (Transformer__from_transformers.Factory(__gotots_store_87.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.UpdatePostfixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "NodeFactory"), Node__from_ast.AsPostfixUnaryExpression(node), visitedExpr, (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator);
                }
                if (!((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference === undefined)) {
                    let setterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    let getterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (IsPropertyAccessExpression__from_ast(operandSkipped)) {
                        if (IsIdentifier__from_ast(Node__from_ast.Name(operandSkipped))) {
                            const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            getterName = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(__gotots_store_89.Transformer), Node__from_ast.Name(operandSkipped));
                            setterName = getterName;
                        }
                    }
                    else if (IsElementAccessExpression__from_ast(operandSkipped)) {
                        if (IsSimpleInlineableExpression__from_transformers(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(operandSkipped) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression)) {
                            getterName = ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(operandSkipped) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression;
                            setterName = getterName;
                        }
                        else {
                            const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            getterName = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_90.Transformer));
                            const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_91.Transformer), getterName);
                            const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_39 = Transformer__from_transformers.Factory(__gotots_store_92.Transformer);
                            const __gotots_argument_82 = getterName;
                            const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_83 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_93.Transformer), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(operandSkipped) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                            setterName = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_39, __gotots_argument_82, __gotots_argument_83);
                        }
                    }
                    if (!(setterName === undefined) && !(getterName === undefined)) {
                        const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(Transformer__from_transformers.Factory(__gotots_store_94.Transformer), (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference, getterName, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((operandSkipped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!discarded) {
                            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            temp = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_95.Transformer));
                            const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_96.Transformer), temp);
                        }
                        const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_84 = Transformer__from_transformers.Factory(__gotots_store_97.Transformer);
                        const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_85 = Transformer__from_transformers.EmitContext(__gotots_store_98.Transformer);
                        const __gotots_argument_86 = node;
                        const __gotots_argument_87 = expression;
                        const __gotots_argument_88 = temp;
                        expression = expandPreOrPostfixIncrementOrDecrementExpression(__gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88);
                        const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        expression = NodeFactory__from_printer.NewReflectSetCall(Transformer__from_transformers.Factory(__gotots_store_99.Transformer), (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference, setterName, expression, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor);
                        const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_100.Transformer), expression, node);
                        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        if (!(temp === undefined)) {
                            const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            expression = NodeFactory__from_printer.NewCommaExpression(Transformer__from_transformers.Factory(__gotots_store_101.Transformer), expression, temp);
                            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        }
                        return expression;
                    }
                }
            }
        }
        const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_102.Transformer), node);
    }
    static $go$private$estransforms$visitPrivateIdentifier(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks) {
            return node;
        }
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode === undefined) && IsStatement__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode)) {
            return node;
        }
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_60 = (Transformer__from_transformers.Factory(__gotots_store_59.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeFactory"), "");
        const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_61.Transformer), result, node);
        return result;
    }
    static $go$private$estransforms$visitPropertyAccessExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(node))) {
            let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, PropertyAccessExpression__from_ast.Name(node));
            if (!(info === undefined)) {
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAccess(tx, info, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
                const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_32 = Transformer__from_transformers.EmitContext(__gotots_store_62.Transformer);
                const __gotots_argument_63 = result;
                const __gotots_store_63 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_64 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_63, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                EmitContext__from_printer.SetOriginal(__gotots_receiver_32, __gotots_argument_63, __gotots_argument_64);
                Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                return result;
            }
        }
        let __gotots_logical_result_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined);
        if (__gotots_logical_result_0) {
            const __gotots_store_64 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_65 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_64, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_0 = IsSuperProperty__from_ast(__gotots_argument_65);
        }
        if (__gotots_logical_result_0 && IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(node)) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            let data: classLexicalEnvironment | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
            if (!(((void classFacts,
                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                ===
                    ((void classFacts,
                        0) as int))) {
                const __gotots_receiver_33 = tx;
                const __gotots_store_65 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_66 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_65, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return classFieldsTransformer.$go$private$estransforms$visitInvalidSuperProperty(__gotots_receiver_33, __gotots_argument_66);
            }
            if (!((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference === undefined)) {
                const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_34 = Transformer__from_transformers.Factory(__gotots_store_66.Transformer);
                const __gotots_argument_67 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superClassReference;
                const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_68 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(__gotots_store_67.Transformer), PropertyAccessExpression__from_ast.Name(node));
                const __gotots_argument_69 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
                let superProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewReflectGetCall(__gotots_receiver_34, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
                const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_68.Transformer), superProperty, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
                Node__from_ast.$storageOf(((superProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                return superProperty;
            }
        }
        if (IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(node))) {
            return classFieldsTransformer.$go$private$estransforms$visitPropertyAccessExpressionForSubstitution(tx, node);
        }
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_35 = Transformer__from_transformers.Visitor(__gotots_store_69.Transformer);
        const __gotots_store_70 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_70 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_70, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_35, __gotots_argument_70);
    }
    static $go$private$estransforms$visitPropertyAccessExpressionForSubstitution(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_260 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_260.Transformer), PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
        if (!tsonicTypeScriptRuntime.sameLocation(expression, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression)) {
            const __gotots_store_261 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_262 = (Transformer__from_transformers.Factory(__gotots_store_261.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdatePropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_262, "NodeFactory"), node, expression, PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).QuestionDotToken, PropertyAccessExpression__from_ast.Name(node), (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
        }
        const __gotots_store_263 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PropertyAccessExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_263, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    static $go$private$estransforms$visitPropertyAssignment(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_22 = Transformer__from_transformers.EmitContext(__gotots_store_25.Transformer);
        const __gotots_store_26 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertyAssignment__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NodeBase));
        const __gotots_argument_23 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_26, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_22, __gotots_argument_23, __gotots_argument_24)) {
            const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_25 = Transformer__from_transformers.EmitContext(__gotots_store_27.Transformer);
            const __gotots_store_28 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                PropertyAssignment__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NodeBase));
            const __gotots_argument_26 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_28, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_27 = false;
            const __gotots_argument_28 = "";
            node = Node__from_ast.AsPropertyAssignment(transformNamedEvaluation(__gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28));
        }
        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_26 = Transformer__from_transformers.Visitor(__gotots_store_29.Transformer);
        const __gotots_store_30 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertyAssignment__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NodeBase));
        const __gotots_argument_29 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_30, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_26, __gotots_argument_29);
    }
    static $go$private$estransforms$visitPropertyDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let propDecl: {
            value: PropertyDeclaration__from_ast;
        } | undefined = Node__from_ast.AsPropertyDeclaration(node);
        if (IsAutoAccessorPropertyDeclaration__from_ast(node) && (classFieldsTransformer.$go$private$estransforms$shouldTransformAutoAccessorsInCurrentClass(tx) || HasStaticModifier__from_ast(node) && classFieldsTransformer.$go$private$estransforms$shouldAlwaysTransformPrivateStaticElements(tx, node))) {
            return classFieldsTransformer.$go$private$estransforms$transformAutoAccessor(tx, propDecl);
        }
        return classFieldsTransformer.$go$private$estransforms$transformFieldInitializer(tx, propDecl);
    }
    static $go$private$estransforms$visitPropertyName(tx: classFieldsTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsComputedPropertyName__from_ast(name)) {
            return classFieldsTransformer.$go$private$estransforms$visitComputedPropertyName(tx, Node__from_ast.AsComputedPropertyName(name));
        }
        const __gotots_store_608 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_608.Transformer), name);
    }
    static $go$private$estransforms$visitShorthandAssignmentProperty(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_244 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_209 = Transformer__from_transformers.EmitContext(__gotots_store_244.Transformer);
        const __gotots_argument_210 = node;
        const __gotots_argument_211 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_209, __gotots_argument_210, __gotots_argument_211)) {
            const __gotots_store_245 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_212 = Transformer__from_transformers.EmitContext(__gotots_store_245.Transformer);
            const __gotots_argument_213 = node;
            const __gotots_argument_214 = false;
            const __gotots_argument_215 = "";
            node = transformNamedEvaluation(__gotots_argument_212, __gotots_argument_213, __gotots_argument_214, __gotots_argument_215);
        }
        const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_246.Transformer), node);
    }
    static $go$private$estransforms$visitSourceFile(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_14 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_14, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment = void 0;
        const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_21 = Transformer__from_transformers.EmitContext(__gotots_store_15.Transformer);
        const __gotots_store_16 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_14 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_16, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_binary_operand_0 = EmitContext__from_printer.EmitFlags(__gotots_receiver_21, __gotots_argument_14);
        const __gotots_binary_operand_1 = EFTransformPrivateStaticElements$constant__from_printer();
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateStaticElementsInFile = !((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0 === 0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases = GoMap.make(0, []);
        const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Clear$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "enclosingClassDeclarations"));
        const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_22 = Transformer__from_transformers.Visitor(__gotots_store_18.Transformer);
        const __gotots_store_19 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_15 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_19, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_22, __gotots_argument_15);
        const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_23 = Transformer__from_transformers.EmitContext(__gotots_store_20.Transformer);
        const __gotots_argument_16 = visited;
        const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_17 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_21.Transformer));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_23, __gotots_argument_16, __gotots_argument_17);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classAliases = GoMap.nil();
        const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Clear$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "enclosingClassDeclarations"));
        return visited;
    }
    static $go$private$estransforms$visitTaggedTemplateExpression(tx: classFieldsTransformer | undefined, node: {
        value: TaggedTemplateExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPropertyAccessExpression__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag) && IsPrivateIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag))) && !(classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag))) === undefined)) {
            const __gotots_results_2 = classFieldsTransformer.$go$private$estransforms$createCallBinding(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
            let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_2[0];
            let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_2[1];
            const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_176 = (Transformer__from_transformers.Factory(__gotots_store_175.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "NodeFactory");
            const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_178 = (Transformer__from_transformers.Factory(__gotots_store_177.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "NodeFactory");
            const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_151 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_179.Transformer), target);
            const __gotots_argument_152 = void 0;
            const __gotots_store_180 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_181 = (Transformer__from_transformers.Factory(__gotots_store_180.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_153 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "NodeFactory"), "bind");
            const __gotots_argument_154 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_156 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_53, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154);
            const __gotots_argument_157 = void 0;
            const __gotots_argument_158 = void 0;
            const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_183 = (Transformer__from_transformers.Factory(__gotots_store_182.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory");
            const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_slice_element_0 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_184.Transformer), thisArg);
            const __gotots_argument_155 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            const __gotots_argument_159 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_54, __gotots_argument_155);
            const __gotots_argument_160 = NodeFlagsNone$constant__from_ast();
            let bindExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_55, __gotots_argument_156, __gotots_argument_157, __gotots_argument_158, __gotots_argument_159, __gotots_argument_160);
            const __gotots_store_185 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_186 = (Transformer__from_transformers.Factory(__gotots_store_185.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_56 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "NodeFactory");
            const __gotots_argument_161 = node;
            const __gotots_argument_162 = bindExpr;
            const __gotots_argument_163 = void 0;
            const __gotots_argument_164 = void 0;
            const __gotots_store_187 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_165 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_187.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
            const __gotots_argument_166 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            return NodeFactory__from_ast.UpdateTaggedTemplateExpression(__gotots_receiver_56, __gotots_argument_161, __gotots_argument_162, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165, __gotots_argument_166);
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && IsSuperProperty__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag) && isStaticPropertyDeclarationOrClassStaticBlock((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined) && !((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor === undefined)) {
            const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_57 = Transformer__from_transformers.Factory(__gotots_store_188.Transformer);
            const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_167 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_189.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
            const __gotots_argument_168 = (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classConstructor;
            const __gotots_argument_169 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let invocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionBindCall(__gotots_receiver_57, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169);
            const __gotots_store_190 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_58 = Transformer__from_transformers.EmitContext(__gotots_store_190.Transformer);
            const __gotots_argument_170 = invocation;
            const __gotots_store_191 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_171 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_191, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_58, __gotots_argument_170, __gotots_argument_171);
            Node__from_ast.$storageOf(((invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_193 = (Transformer__from_transformers.Factory(__gotots_store_192.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_59 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory");
            const __gotots_argument_172 = node;
            const __gotots_argument_173 = invocation;
            const __gotots_argument_174 = void 0;
            const __gotots_argument_175 = void 0;
            const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_176 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_194.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
            const __gotots_argument_177 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            return NodeFactory__from_ast.UpdateTaggedTemplateExpression(__gotots_receiver_59, __gotots_argument_172, __gotots_argument_173, __gotots_argument_174, __gotots_argument_175, __gotots_argument_176, __gotots_argument_177);
        }
        const __gotots_store_195 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_60 = Transformer__from_transformers.Visitor(__gotots_store_195.Transformer);
        const __gotots_store_196 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_178 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_196, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_60, __gotots_argument_178);
    }
    static $go$private$estransforms$visitThisExpression(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).insideComputedPropertyName && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformThisInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            if (((void classFacts,
                (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                ===
                    ((void classFacts,
                        0) as int) || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators) {
                {
                    let classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$tryGetClassThisNoContainer(tx);
                    if (!(classThis === undefined)) {
                        return classThis;
                    }
                }
            }
        }
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformThisInStaticInitializers && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement === undefined) && (IsClassStaticBlockDeclaration__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) || (IsPropertyDeclaration__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement) && HasStaticModifier__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentClassElement))) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment === undefined) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data === undefined)) {
            {
                let classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$tryGetClassThisNoContainer(tx);
                if (!(classThis === undefined)) {
                    return classThis;
                }
            }
            if (!(((void classFacts,
                (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalEnvironment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).facts.$value & classFactsClassWasDecorated$constant().$value) as int)
                ===
                    ((void classFacts,
                        0) as int)) && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators) {
                const __gotots_store_203 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_204 = (Transformer__from_transformers.Factory(__gotots_store_203.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_62 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "NodeFactory");
                const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_185 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_205.Transformer));
                return NodeFactory__from_ast.NewParenthesizedExpression(__gotots_receiver_62, __gotots_argument_185);
            }
        }
        return node;
    }
    static $go$private$estransforms$visitVariableDeclaration(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_31 = Transformer__from_transformers.EmitContext(__gotots_store_35.Transformer);
        const __gotots_store_36 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_32 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_36, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName;
        if (isNamedEvaluationAnd(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33)) {
            const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_34 = Transformer__from_transformers.EmitContext(__gotots_store_37.Transformer);
            const __gotots_store_38 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_35 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_38, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_36 = false;
            const __gotots_argument_37 = "";
            node = Node__from_ast.AsVariableDeclaration(transformNamedEvaluation(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37));
        }
        const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_28 = Transformer__from_transformers.Visitor(__gotots_store_39.Transformer);
        const __gotots_store_40 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_38 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_40, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_28, __gotots_argument_38);
    }
    static $go$private$estransforms$visitVariableStatement(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedPendingStatements = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_27 = Transformer__from_transformers.Visitor(__gotots_store_31.Transformer);
        const __gotots_store_32 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_30 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_32, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visitedNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_27, __gotots_argument_30);
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements.length > 0) {
            let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1 + (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements.length, void 0);
            result = result.append(void 0, [visitedNode]);
            result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements, void 0);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements = savedPendingStatements;
            const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_34 = (Transformer__from_transformers.Factory(__gotots_store_33.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), result);
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingStatements = savedPendingStatements;
        return visitedNode;
    }
    static $go$private$estransforms$wrapPrivateIdentifierForDestructuringTarget(tx: classFieldsTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let prop: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(node);
        const __gotots_store_616 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_616.Transformer), node);
        let info: tsonicTypeScriptRuntime.Location<privateIdentifierInfo> | undefined = classFieldsTransformer.$go$private$estransforms$accessPrivateIdentifier(tx, PropertyAccessExpression__from_ast.Name(prop));
        if (info === undefined) {
            const __gotots_store_617 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_617.Transformer), node);
        }
        let receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyAccessExpression__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression;
        let isThisOrSuperProperty = Node__from_ast.$storageOf(((PropertyAccessExpression__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast() || Node__from_ast.$storageOf(((PropertyAccessExpression__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast();
        if (isThisOrSuperProperty || !IsSimpleCopiableExpression__from_transformers(PropertyAccessExpression__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression)) {
            const __gotots_store_618 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            receiver = NodeFactory__from_printer.NewTempVariableEx(Transformer__from_transformers.Factory(__gotots_store_618.Transformer), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
            const __gotots_store_619 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_619.Transformer), receiver);
            const __gotots_argument_435 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions;
            const __gotots_store_620 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_135 = Transformer__from_transformers.Factory(__gotots_store_620.Transformer);
            const __gotots_argument_433 = receiver;
            const __gotots_store_621 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_434 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_621.Transformer), PropertyAccessExpression__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression);
            const __gotots_argument_436 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_135, __gotots_argument_433, __gotots_argument_434);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingExpressions = __gotots_argument_435.append(void 0, [__gotots_argument_436]);
        }
        let assignExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = classFieldsTransformer.$go$private$estransforms$createPrivateIdentifierAssignment(tx, info, receiver, parameter, KindEqualsToken$constant__from_ast());
        const __gotots_store_622 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewAssignmentTargetWrapper(Transformer__from_transformers.Factory(__gotots_store_622.Transformer), parameter, assignExpr);
    }
}
export function newClassFieldsTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let languageVersion = CompilerOptions__from_core.GetEmitScriptTarget((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions);
    let useDefineForClassFields = CompilerOptions__from_core.GetUseDefineForClassFields((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions);
    if (languageVersion >= ScriptTargetESNext$constant__from_core() && useDefineForClassFields) {
        return void 0;
    }
    let tx: classFieldsTransformer | undefined = new classFieldsTransformer(Transformer__from_transformers.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, false, false, false, false, false, false, false, false, Tristate_IsTrue__from_core(((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0, void 0, void 0, GoMap.nil(), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    }), false, false, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingSet = !useDefineForClassFields;
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < ScriptTargetES2022$constant__from_core();
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializers = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingSet || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformInitializersUsingDefine;
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < ScriptTargetES2022$constant__from_core();
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformAutoAccessors = languageVersion < ScriptTargetESNext$constant__from_core();
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformThisInStaticInitializers = languageVersion < ScriptTargetES2022$constant__from_core();
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformSuperInStaticInitializers = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldTransformThisInStaticInitializers;
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let result: Transformer__from_transformers | undefined = Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
    const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(__gotots_store_1.Transformer);
    const __gotots_receiver_2 = tx;
    const __gotots_argument_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitModifier(__gotots_receiver_2, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifierVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_3, __gotots_argument_2);
    const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_5 = Transformer__from_transformers.EmitContext(__gotots_store_2.Transformer);
    const __gotots_receiver_4 = tx;
    const __gotots_argument_3 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitDiscardedValue(__gotots_receiver_4, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_5, __gotots_argument_3);
    const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_7 = Transformer__from_transformers.EmitContext(__gotots_store_3.Transformer);
    const __gotots_receiver_6 = tx;
    const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitHeritageClause(__gotots_receiver_6, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).heritageClauseVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_7, __gotots_argument_4);
    const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_9 = Transformer__from_transformers.EmitContext(__gotots_store_4.Transformer);
    const __gotots_receiver_8 = tx;
    const __gotots_argument_5 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitAssignmentTarget(__gotots_receiver_8, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).assignmentTargetVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_9, __gotots_argument_5);
    const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_11 = Transformer__from_transformers.EmitContext(__gotots_store_5.Transformer);
    const __gotots_receiver_10 = tx;
    const __gotots_argument_6 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitClassElement(__gotots_receiver_10, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).classElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_11, __gotots_argument_6);
    const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_13 = Transformer__from_transformers.EmitContext(__gotots_store_6.Transformer);
    const __gotots_receiver_12 = tx;
    const __gotots_argument_7 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitAccessorFieldResult(__gotots_receiver_12, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).accessorFieldResultVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_13, __gotots_argument_7);
    const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_15 = Transformer__from_transformers.EmitContext(__gotots_store_7.Transformer);
    const __gotots_receiver_14 = tx;
    const __gotots_argument_8 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitArrayAssignmentElement(__gotots_receiver_14, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).arrayAssignmentElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_15, __gotots_argument_8);
    const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_17 = Transformer__from_transformers.EmitContext(__gotots_store_8.Transformer);
    const __gotots_receiver_16 = tx;
    const __gotots_argument_9 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitObjectAssignmentElement(__gotots_receiver_16, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).objectAssignmentElementVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_17, __gotots_argument_9);
    const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_19 = Transformer__from_transformers.EmitContext(__gotots_store_9.Transformer);
    const __gotots_receiver_18 = tx;
    const __gotots_argument_10 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return classFieldsTransformer.$go$private$estransforms$visitForSubstitution(__gotots_receiver_18, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).substitutionVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_19, __gotots_argument_10);
    const __gotots_receiver_20 = tx;
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isAnonymousClassNeedingAssignedName = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return classFieldsTransformer.$go$private$estransforms$isAnonymousClassNeedingAssignedNameWorker(__gotots_receiver_20, $argument0);
    };
    return result;
}
export function createPrivateStaticFieldInitializer(factory: {
    value: NodeFactory__from_printer;
} | undefined, variableName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (initializer === undefined) {
        initializer = NodeFactory__from_printer.NewVoidZeroExpression(factory);
    }
    const __gotots_receiver_163 = factory;
    const __gotots_argument_545 = variableName;
    const __gotots_store_743 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_162 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_743, "NodeFactory");
    const __gotots_store_744 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_161 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_744, "NodeFactory");
    const __gotots_store_745 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_160 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_745, "NodeFactory");
    const __gotots_argument_537 = void 0;
    const __gotots_store_746 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_538 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_746, "NodeFactory"), "value");
    const __gotots_argument_539 = void 0;
    const __gotots_argument_540 = void 0;
    const __gotots_argument_541 = initializer;
    const __gotots_slice_element_6 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_160, __gotots_argument_537, __gotots_argument_538, __gotots_argument_539, __gotots_argument_540, __gotots_argument_541);
    const __gotots_argument_542 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6]);
    const __gotots_argument_543 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_161, __gotots_argument_542);
    const __gotots_argument_544 = false;
    const __gotots_argument_546 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_162, __gotots_argument_543, __gotots_argument_544);
    return NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_163, __gotots_argument_545, __gotots_argument_546);
}
export function createPrivateInstanceFieldInitializer(factory: {
    value: NodeFactory__from_printer;
} | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, weakMapName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (initializer === undefined) {
        initializer = NodeFactory__from_printer.NewVoidZeroExpression(factory);
    }
    const __gotots_receiver_159 = factory;
    const __gotots_argument_534 = weakMapName;
    const __gotots_store_742 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_535 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_742, "NodeFactory"), "set");
    const __gotots_argument_536 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([receiver, initializer]);
    return NodeFactory__from_printer.NewMethodCall(__gotots_receiver_159, __gotots_argument_534, __gotots_argument_535, __gotots_argument_536);
}
export function createPrivateInstanceMethodInitializer(factory: {
    value: NodeFactory__from_printer;
} | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, weakSetName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_receiver_158 = factory;
    const __gotots_argument_531 = weakSetName;
    const __gotots_store_738 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_532 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_738, "NodeFactory"), "add");
    const __gotots_argument_533 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([receiver]);
    return NodeFactory__from_printer.NewMethodCall(__gotots_receiver_158, __gotots_argument_531, __gotots_argument_532, __gotots_argument_533);
}
export function isStaticPropertyDeclarationOrClassStaticBlock(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsClassStaticBlockDeclaration__from_ast(node) || (IsPropertyDeclaration__from_ast(node) && HasStaticModifier__from_ast(node));
}
export function classHasClassThisAssignment(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    const __gotots_range_14 = Node__from_ast.Members(node);
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_14.length; __gotots_range_index_13++) {
        const __gotots_range_value_15 = __gotots_range_14.get(__gotots_range_index_13);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
        if (isClassThisAssignmentBlock(emitContext, member)) {
            return true;
        }
    }
    return false;
}
export function isNonStaticMethodOrAccessorWithPrivateName(member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !IsStatic__from_ast(member) && (IsMethodOrAccessor__from_ast(member) || IsAutoAccessorPropertyDeclaration__from_ast(member)) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(member));
}
export function createMemberAccessForPropertyName(factory: {
    value: NodeFactory__from_printer;
} | undefined, emitContext: {
    value: EmitContext__from_printer;
} | undefined, receiver: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsComputedPropertyName__from_ast(name)) {
        const __gotots_store_747 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let expression__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_747, "NodeFactory"), receiver, void 0, Node__from_ast.Expression(name), NodeFlagsNone$constant__from_ast());
        Node__from_ast.$storageOf(((expression__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return expression__shadow_1;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsIdentifier__from_ast(name) || IsPrivateIdentifier__from_ast(name)) {
        const __gotots_store_748 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        expression = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_748, "NodeFactory"), receiver, void 0, name, NodeFlagsNone$constant__from_ast());
    }
    else {
        const __gotots_store_749 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        expression = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_749, "NodeFactory"), receiver, void 0, name, NodeFlagsNone$constant__from_ast());
    }
    EmitContext__from_printer.SetCommentRange(emitContext, expression, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    EmitContext__from_printer.SetSourceMapRange(emitContext, expression, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    EmitContext__from_printer.AddEmitFlags(emitContext, expression, EFNoNestedSourceMaps$constant__from_printer());
    return expression;
}
export function shouldBeCapturedInTempVariable(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(node);
    switch (Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
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
export function flattenCommaList(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): iter__from_gostdlib.Seq<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): void => {
        flattenCommaListWorker(node, __go_yield);
    });
}
export function flattenCommaListWorker(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_yield: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    if (IsParenthesizedExpression__from_ast(node) && NodeIsSynthesized__from_ast(node)) {
        return flattenCommaListWorker(Node__from_ast.Expression(node), __go_yield);
    }
    else if (IsCommaExpression__from_ast((void Node__from_ast.AsNode,
        node))) {
        return flattenCommaListWorker(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, __go_yield) && flattenCommaListWorker(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, __go_yield);
    }
    else {
        const __gotots_callee_9 = __go_yield;
        const __gotots_argument_478 = node;
        return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_478);
    }
}
export function findComputedPropertyNameCacheAssignment(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined {
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(name);
    for (;;) {
        node = SkipOuterExpressions__from_ast(node, 0);
        if (IsBinaryExpression__from_ast(node) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            node = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
            continue;
        }
        if (IsAssignmentExpression__from_ast(node, true) && IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
            return Node__from_ast.AsBinaryExpression(node);
        }
        break;
    }
    return void 0;
}
export function expandPreOrPostfixIncrementOrDecrementExpression(factory: {
    value: NodeFactory__from_printer;
} | undefined, emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, resultVariable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let operator = 0;
    let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsPrefixUnaryExpression__from_ast(node)) {
        operator = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator;
        operand = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
    }
    else {
        operator = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
        operand = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
    }
    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(factory);
    EmitContext__from_printer.AddVariableDeclaration(emitContext, temp);
    expression = NodeFactory__from_printer.NewAssignmentExpression(factory, temp, expression);
    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((operand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    let operation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsPrefixUnaryExpression__from_ast(node)) {
        const __gotots_store_265 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        operation = NodeFactory__from_ast.NewPrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_265, "NodeFactory"), operator, temp);
    }
    else {
        const __gotots_store_266 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        operation = NodeFactory__from_ast.NewPostfixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_266, "NodeFactory"), temp, operator);
    }
    Node__from_ast.$storageOf(((operation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    if (!(resultVariable === undefined)) {
        operation = NodeFactory__from_printer.NewAssignmentExpression(factory, resultVariable, operation);
        Node__from_ast.$storageOf(((operation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    }
    expression = NodeFactory__from_printer.NewCommaExpression(factory, expression, operation);
    Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    if (IsPostfixUnaryExpression__from_ast(node)) {
        expression = NodeFactory__from_printer.NewCommaExpression(factory, expression, temp);
        Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    }
    return expression;
}
