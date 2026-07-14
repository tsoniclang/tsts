import type { bool, int } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { Node, SourceFile } from "../ast/ast.js";
import type { Declaration, EntityName, IdentifierNode, ImportDeclaration, SignatureDeclaration } from "../ast/ast_generated.js";
import type { ModifierFlags } from "../ast/modifierflags.js";
import type { Symbol } from "../ast/symbol.js";
import type { SymbolFlags } from "../ast/symbolflags.js";
import type { ReferenceResolver } from "../binder/referenceresolver.js";
import type { ResolutionMode } from "../core/compileroptions.js";
import type { Result } from "../evaluator/evaluator.js";
import type { Flags, InternalFlags, SymbolTracker } from "../nodebuilder/types.js";
import type { EmitContext } from "./emitcontext.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::type::SymbolAccessibility","kind":"type","status":"implemented","sigHash":"2cbfbbca836bc49cf958e93d05edbdf2c684cbb8f7b6cf3a19a601f14c666ca3"}
 *
 * Go source:
 * SymbolAccessibility int32
 */
export type SymbolAccessibility = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::constGroup::SymbolAccessibilityAccessible+SymbolAccessibilityNotAccessible+SymbolAccessibilityCannotBeNamed+SymbolAccessibilityNotResolved","kind":"constGroup","status":"implemented","sigHash":"b2b72ed4c544eebbb54ffec465895ab8b64787dc75682ae7c8aa50aebaaa3ac6"}
 *
 * Go source:
 * const (
 * 	SymbolAccessibilityAccessible SymbolAccessibility = iota
 * 	SymbolAccessibilityNotAccessible
 * 	SymbolAccessibilityCannotBeNamed
 * 	SymbolAccessibilityNotResolved
 * )
 */
export const SymbolAccessibilityAccessible: SymbolAccessibility = 0 as SymbolAccessibility;
export const SymbolAccessibilityNotAccessible: SymbolAccessibility = 1 as SymbolAccessibility;
export const SymbolAccessibilityCannotBeNamed: SymbolAccessibility = 2 as SymbolAccessibility;
export const SymbolAccessibilityNotResolved: SymbolAccessibility = 3 as SymbolAccessibility;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::type::SymbolAccessibilityResult","kind":"type","status":"implemented","sigHash":"00556446a858d112bf92c5da8266b3090e54e2dc1280b3c9ec3ab1030867bd37"}
 *
 * Go source:
 * SymbolAccessibilityResult struct {
 * 	Accessibility        SymbolAccessibility
 * 	AliasesToMakeVisible []*ast.Node // aliases that need to have this symbol visible
 * 	ErrorSymbolName      string      // Optional - symbol name that results in error
 * 	ErrorNode            *ast.Node   // Optional - node that results in error
 * 	ErrorModuleName      string      // Optional - If the symbol is not visible from module, module's name
 * }
 */
export interface SymbolAccessibilityResult {
  Accessibility: SymbolAccessibility;
  AliasesToMakeVisible: GoSlice<GoPtr<Node>>;
  ErrorSymbolName: string;
  ErrorNode: GoPtr<Node>;
  ErrorModuleName: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::type::TypeReferenceSerializationKind","kind":"type","status":"implemented","sigHash":"f3a0f93e0a5119b3210c60b4147de2a384c4dc7a986352e89cc14742c8fc4c20"}
 *
 * Go source:
 * TypeReferenceSerializationKind int32
 */
export type TypeReferenceSerializationKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::constGroup::TypeReferenceSerializationKindUnknown+TypeReferenceSerializationKindTypeWithConstructSignatureAndValue+TypeReferenceSerializationKindVoidNullableOrNeverType+TypeReferenceSerializationKindNumberLikeType+TypeReferenceSerializationKindBigIntLikeType+TypeReferenceSerializationKindStringLikeType+TypeReferenceSerializationKindBooleanType+TypeReferenceSerializationKindArrayLikeType+TypeReferenceSerializationKindESSymbolType+TypeReferenceSerializationKindPromise+TypeReferenceSerializationKindTypeWithCallSignature+TypeReferenceSerializationKindObjectType","kind":"constGroup","status":"implemented","sigHash":"0b3124cf930a2f789f2dd27efe6c68965caa6099fdf2cef23d900ddb2a0eb840"}
 *
 * Go source:
 * const (
 * 	// The TypeReferenceNode could not be resolved.
 * 	// The type name should be emitted using a safe fallback.
 * 	TypeReferenceSerializationKindUnknown = iota
 * 
 * 	// The TypeReferenceNode resolves to a type with a constructor
 * 	// function that can be reached at runtime (e.g. a `class`
 * 	// declaration or a `var` declaration for the static side
 * 	// of a type, such as the global `Promise` type in lib.d.ts).
 * 	TypeReferenceSerializationKindTypeWithConstructSignatureAndValue
 * 
 * 	// The TypeReferenceNode resolves to a Void-like, Nullable, or Never type.
 * 	TypeReferenceSerializationKindVoidNullableOrNeverType
 * 
 * 	// The TypeReferenceNode resolves to a Number-like type.
 * 	TypeReferenceSerializationKindNumberLikeType
 * 
 * 	// The TypeReferenceNode resolves to a BigInt-like type.
 * 	TypeReferenceSerializationKindBigIntLikeType
 * 
 * 	// The TypeReferenceNode resolves to a String-like type.
 * 	TypeReferenceSerializationKindStringLikeType
 * 
 * 	// The TypeReferenceNode resolves to a Boolean-like type.
 * 	TypeReferenceSerializationKindBooleanType
 * 
 * 	// The TypeReferenceNode resolves to an Array-like type.
 * 	TypeReferenceSerializationKindArrayLikeType
 * 
 * 	// The TypeReferenceNode resolves to the ESSymbol type.
 * 	TypeReferenceSerializationKindESSymbolType
 * 
 * 	// The TypeReferenceNode resolved to the global Promise constructor symbol.
 * 	TypeReferenceSerializationKindPromise
 * 
 * 	// The TypeReferenceNode resolves to a Function type or a type with call signatures.
 * 	TypeReferenceSerializationKindTypeWithCallSignature
 * 
 * 	// The TypeReferenceNode resolves to any other type.
 * 	TypeReferenceSerializationKindObjectType
 * )
 */
export const TypeReferenceSerializationKindUnknown: int = 0 as int;
export const TypeReferenceSerializationKindTypeWithConstructSignatureAndValue: int = 1 as int;
export const TypeReferenceSerializationKindVoidNullableOrNeverType: int = 2 as int;
export const TypeReferenceSerializationKindNumberLikeType: int = 3 as int;
export const TypeReferenceSerializationKindBigIntLikeType: int = 4 as int;
export const TypeReferenceSerializationKindStringLikeType: int = 5 as int;
export const TypeReferenceSerializationKindBooleanType: int = 6 as int;
export const TypeReferenceSerializationKindArrayLikeType: int = 7 as int;
export const TypeReferenceSerializationKindESSymbolType: int = 8 as int;
export const TypeReferenceSerializationKindPromise: int = 9 as int;
export const TypeReferenceSerializationKindTypeWithCallSignature: int = 10 as int;
export const TypeReferenceSerializationKindObjectType: int = 11 as int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitresolver.go::type::EmitResolver","kind":"type","status":"implemented","sigHash":"20ef9f912a65d513d2bb244fc98d5a80384e58f6ac2a0d2b57b534878931e0f5"}
 *
 * Go source:
 * EmitResolver interface {
 * 	binder.ReferenceResolver
 * 	IsReferencedAliasDeclaration(node *ast.Node) bool
 * 	IsValueAliasDeclaration(node *ast.Node) bool
 * 	IsTopLevelValueImportEqualsWithEntityName(node *ast.Node) bool
 * 	MarkLinkedReferencesRecursively(file *ast.SourceFile)
 * 	GetExternalModuleFileFromDeclaration(node *ast.Node) *ast.SourceFile
 * 	GetEffectiveDeclarationFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags
 * 	GetResolutionModeOverride(node *ast.Node) core.ResolutionMode
 * 
 * 	// decorator metadata
 * 	GetTypeReferenceSerializationKind(name *ast.EntityName, serialScope *ast.Node) TypeReferenceSerializationKind
 * 
 * 	// const enum inlining
 * 	GetConstantValue(node *ast.Node) any
 * 
 * 	// JSX Emit
 * 	GetJsxFactoryEntity(location *ast.Node) *ast.Node
 * 	GetJsxFragmentFactoryEntity(location *ast.Node) *ast.Node
 * 	SetReferencedImportDeclaration(node *ast.IdentifierNode, ref *ast.Declaration) // for overriding the reference resolver behavior for generated identifiers
 * 
 * 	// declaration emit checker functionality projections
 * 	PrecalculateDeclarationEmitVisibility(file *ast.SourceFile)
 * 	IsSymbolAccessible(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, shouldComputeAliasToMarkVisible bool) SymbolAccessibilityResult
 * 	IsEntityNameVisible(entityName *ast.Node, enclosingDeclaration *ast.Node) SymbolAccessibilityResult // previously SymbolVisibilityResult in strada - ErrorModuleName never set
 * 	IsExpandoFunctionDeclaration(node *ast.Node) bool
 * 	IsExpandoFunctionDeclarationUnsafe(node *ast.Node) bool
 * 	IsLiteralConstDeclaration(node *ast.Node) bool
 * 	RequiresAddingImplicitUndefined(node *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool
 * 	IsDeclarationVisible(node *ast.Node) bool
 * 	IsImportRequiredByAugmentation(decl *ast.ImportDeclaration) bool
 * 	IsDefinitelyReferenceToGlobalSymbolObject(node *ast.Node) bool
 * 	IsImplementationOfOverload(node *ast.SignatureDeclaration) bool
 * 	GetEnumMemberValue(node *ast.Node) evaluator.Result
 * 	IsLateBound(node *ast.Node) bool
 * 	IsOptionalParameter(node *ast.Node) bool
 * 	GetBaseDeclarationsForPropertyDeclaration(node *ast.Node) []*ast.Node
 *
 * 	// isolatedDeclarations-specific declaration emit
 * 	GetPropertiesOfContainerFunction(node *ast.Node) []*ast.Symbol
 * 	RequiresAddingImplicitUndefinedUnsafe(node *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool
 * 
 * 	// Node construction for declaration emit
 * 	CreateTypeOfDeclaration(emitContext *EmitContext, declaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node
 * 	CreateReturnTypeOfSignatureDeclaration(emitContext *EmitContext, signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node
 * 	CreateTypeParametersOfSignatureDeclaration(emitContext *EmitContext, signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node
 * 	CreateLiteralConstValue(emitContext *EmitContext, node *ast.Node, tracker nodebuilder.SymbolTracker) *ast.Node
 * 	CreateTypeOfExpression(emitContext *EmitContext, expression *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node
 * 	CreateLateBoundIndexSignatures(emitContext *EmitContext, container *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node
 * 	TryJSTypeNodeToTypeNode(emitContext *EmitContext, typeNode *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node
 * }
 */
export interface EmitResolver extends ReferenceResolver {
  IsReferencedAliasDeclaration(node: GoPtr<Node>): bool;
  IsValueAliasDeclaration(node: GoPtr<Node>): bool;
  IsTopLevelValueImportEqualsWithEntityName(node: GoPtr<Node>): bool;
  MarkLinkedReferencesRecursively(file: GoPtr<SourceFile>): void;
  GetExternalModuleFileFromDeclaration(node: GoPtr<Node>): GoPtr<SourceFile>;
  GetEffectiveDeclarationFlags(node: GoPtr<Node>, flags: ModifierFlags): ModifierFlags;
  GetResolutionModeOverride(node: GoPtr<Node>): ResolutionMode;
  GetTypeReferenceSerializationKind(name: GoPtr<EntityName>, serialScope: GoPtr<Node>): TypeReferenceSerializationKind;
  GetConstantValue(node: GoPtr<Node>): GoInterface<unknown>;
  GetJsxFactoryEntity(location: GoPtr<Node>): GoPtr<Node>;
  GetJsxFragmentFactoryEntity(location: GoPtr<Node>): GoPtr<Node>;
  SetReferencedImportDeclaration(node: GoPtr<IdentifierNode>, ref: GoPtr<Declaration>): void;
  PrecalculateDeclarationEmitVisibility(file: GoPtr<SourceFile>): void;
  IsSymbolAccessible(symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags, shouldComputeAliasToMarkVisible: bool): SymbolAccessibilityResult;
  IsEntityNameVisible(entityName: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>): SymbolAccessibilityResult;
  IsExpandoFunctionDeclaration(node: GoPtr<Node>): bool;
  IsExpandoFunctionDeclarationUnsafe(node: GoPtr<Node>): bool;
  IsLiteralConstDeclaration(node: GoPtr<Node>): bool;
  RequiresAddingImplicitUndefined(node: GoPtr<Node>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>): bool;
  IsDeclarationVisible(node: GoPtr<Node>): bool;
  IsImportRequiredByAugmentation(decl: GoPtr<ImportDeclaration>): bool;
  IsDefinitelyReferenceToGlobalSymbolObject(node: GoPtr<Node>): bool;
  IsImplementationOfOverload(node: GoPtr<SignatureDeclaration>): bool;
  GetEnumMemberValue(node: GoPtr<Node>): Result;
  IsLateBound(node: GoPtr<Node>): bool;
  IsOptionalParameter(node: GoPtr<Node>): bool;
  GetBaseDeclarationsForPropertyDeclaration(node: GoPtr<Node>): GoSlice<GoPtr<Node>>;
  GetPropertiesOfContainerFunction(node: GoPtr<Node>): GoSlice<GoPtr<Symbol>>;
  RequiresAddingImplicitUndefinedUnsafe(node: GoPtr<Node>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>): bool;
  CreateTypeOfDeclaration(emitContext: GoPtr<EmitContext>, declaration: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node>;
  CreateReturnTypeOfSignatureDeclaration(emitContext: GoPtr<EmitContext>, signatureDeclaration: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node>;
  CreateTypeParametersOfSignatureDeclaration(emitContext: GoPtr<EmitContext>, signatureDeclaration: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoSlice<GoPtr<Node>>;
  CreateLiteralConstValue(emitContext: GoPtr<EmitContext>, node: GoPtr<Node>, tracker: GoInterface<SymbolTracker>): GoPtr<Node>;
  CreateTypeOfExpression(emitContext: GoPtr<EmitContext>, expression: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node>;
  CreateLateBoundIndexSignatures(emitContext: GoPtr<EmitContext>, container: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoSlice<GoPtr<Node>>;
  TryJSTypeNodeToTypeNode(emitContext: GoPtr<EmitContext>, typeNode: GoPtr<Node>, enclosingDeclaration: GoPtr<Node>, flags: Flags, internalFlags: InternalFlags, tracker: GoInterface<SymbolTracker>): GoPtr<Node>;
}
