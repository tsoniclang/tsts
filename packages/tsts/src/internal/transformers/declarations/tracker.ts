import type { bool } from "../../../go/scalars.js";
import { GoAppend, GoEqualStrict, GoNilSlice, GoZeroPointer, type GoPtr, type GoSlice } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend } from "../../../go/compat.js";
import type { Node } from "../../ast/spine.js";
import type { SourceFile } from "../../ast/ast.js";
import { Node_Symbol } from "../../ast/ast.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import { Diagnostic_AddRelatedInfo } from "../../ast/diagnostic.js";
import type { Symbol } from "../../ast/symbol.js";
import type { SymbolFlags } from "../../ast/generated/flags.js";
import { SymbolFlagsTypeParameter } from "../../ast/symbolflags.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import * as diagnostics from "../../diagnostics/generated/messages.js";
import type { EmitResolver, SymbolAccessibilityResult } from "../../printer/emitresolver.js";
import type { SymbolTracker } from "../../nodebuilder/types.js";
import { SymbolAccessibilityAccessible, SymbolAccessibilityNotResolved } from "../../printer/emitresolver.js";
import {
  IsExportAssignment,
  IsVariableDeclaration,
} from "../../ast/generated/predicates.js";
import {
  GetNameOfDeclaration,
  GetSourceFileOfNode,
} from "../../ast/utilities.js";
import { GetTextOfNode, DeclarationNameToString } from "../../scanner/utilities.js";
import { NewDiagnosticForNode } from "../../checker/utilities.js";
import { AppendIfUnique } from "../../core/core.js";
import { Find, Filter } from "../../core/core.js";
import { AsExportAssignment } from "../../ast/generated/casts.js";
import { createGetIsolatedDeclarationErrors, type GetSymbolAccessibilityDiagnostic } from "./diagnostics.js";
import type { DeclarationEmitHost } from "./transform.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
import { GoSliceMake } from "../../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::type::SymbolTrackerImpl","kind":"type","status":"implemented","sigHash":"3d0b1e2bb9b95fe041f24a5d5e940015e3814938b736ed7ca2618eba6fa1b31e"}
 *
 * Go source:
 * SymbolTrackerImpl struct {
 * 	resolver      printer.EmitResolver
 * 	state         *SymbolTrackerSharedState
 * 	host          DeclarationEmitHost
 * 	fallbackStack []*ast.Node
 *
 * 	getIsolatedDeclarationError func(node *ast.Node) *ast.Diagnostic
 * }
 */
export interface SymbolTrackerImpl {
  resolver: GoInterface<EmitResolver>;
  state: GoPtr<SymbolTrackerSharedState>;
  host: GoInterface<DeclarationEmitHost>;
  fallbackStack: GoSlice<GoPtr<Node>>;
  getIsolatedDeclarationError: GoFunc<(node: GoPtr<Node>) => GoPtr<Diagnostic>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.PopErrorFallbackNode","kind":"method","status":"implemented","sigHash":"90f19bc603d22090fded656ac08c3667636b79e2600528f1229f81c18a13778c"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) PopErrorFallbackNode() {
 * 	s.fallbackStack = s.fallbackStack[:len(s.fallbackStack)-1]
 * }
 */
export function SymbolTrackerImpl_PopErrorFallbackNode(receiver: GoPtr<SymbolTrackerImpl>): void {
  receiver!.fallbackStack = receiver!.fallbackStack.slice(0, receiver!.fallbackStack.length - 1);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.PushErrorFallbackNode","kind":"method","status":"implemented","sigHash":"cd5831ef7626964602aa9db77efa68a23ca971c5b82fa0d839a6aa5cd78b7146"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) PushErrorFallbackNode(node *ast.Node) {
 * 	s.fallbackStack = append(s.fallbackStack, node)
 * }
 */
export function SymbolTrackerImpl_PushErrorFallbackNode(receiver: GoPtr<SymbolTrackerImpl>, node: GoPtr<Node>): void {
  receiver!.fallbackStack = GoSliceAppend(receiver!.fallbackStack, node, GoPointerValueOps<Node>());
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportCyclicStructureError","kind":"method","status":"implemented","sigHash":"9d9f594254bf7cd3078f2dab3cd87bf40831e05082ea7b5c6beaaaf832eedef6"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportCyclicStructureError() {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback()))
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportCyclicStructureError(receiver: GoPtr<SymbolTrackerImpl>): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver)));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportInaccessibleThisError","kind":"method","status":"implemented","sigHash":"8ea8751183063e6bf4f06bfa1951f3d8808374b9c14967973bd4d9d0b7ef79c9"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportInaccessibleThisError() {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), "this"))
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportInaccessibleThisError(receiver: GoPtr<SymbolTrackerImpl>): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver), "this"));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportInaccessibleUniqueSymbolError","kind":"method","status":"implemented","sigHash":"53605b429b3c438dbb315d8dc21e238faf89cef0d11c0822953bd834cc2beb3c"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportInaccessibleUniqueSymbolError() {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), "unique symbol"))
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportInaccessibleUniqueSymbolError(receiver: GoPtr<SymbolTrackerImpl>): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver), "unique symbol"));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportInferenceFallback","kind":"method","status":"implemented","sigHash":"bbc904ca0ae9e82770ed5e4ec62f1c32e9050794e5e48057ff13110a9aadf380"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportInferenceFallback(node *ast.Node) {
 * 	if !s.state.isolatedDeclarations {
 * 		return
 * 	}
 * 	if ast.GetSourceFileOfNode(node) != s.state.currentSourceFile {
 * 		return // Nested error on a declaration in another file - ignore, will be reemitted if file is in the output file set
 * 	}
 * 	if s.state.resolver.IsExpandoFunctionDeclarationUnsafe(node) { // within a node builder call that should already lock the checker, use the unsafe call
 * 		s.state.reportExpandoFunctionErrors(node)
 * 	}
 * 	s.state.addDiagnostic(s.getIsolatedDeclarationError(node))
 * }
 */
export function SymbolTrackerImpl_ReportInferenceFallback(receiver: GoPtr<SymbolTrackerImpl>, node: GoPtr<Node>): void {
  if (!receiver!.state!.isolatedDeclarations) {
    return;
  }
  if (GetSourceFileOfNode(node) !== receiver!.state!.currentSourceFile) {
    return; // Nested error on a declaration in another file - ignore, will be reemitted if file is in the output file set
  }
  if (receiver!.state!.resolver!.IsExpandoFunctionDeclarationUnsafe(node)) { // within a node builder call that should already lock the checker, use the unsafe call
    receiver!.state!.reportExpandoFunctionErrors!(node);
  }
  SymbolTrackerSharedState_addDiagnostic(receiver!.state, receiver!.getIsolatedDeclarationError!(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportLikelyUnsafeImportRequiredError","kind":"method","status":"implemented","sigHash":"bd0914b951bbac0cce54d9251145488b42ab46bc3f6f6d13213d83b45982c6e9"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportLikelyUnsafeImportRequiredError(specifier string, symbolName string) {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		if symbolName != "" {
 * 			s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), specifier, symbolName))
 * 		} else {
 * 			s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, s.errorDeclarationNameWithFallback(), specifier))
 * 		}
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportLikelyUnsafeImportRequiredError(receiver: GoPtr<SymbolTrackerImpl>, specifier: string, symbolName: string): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    if (symbolName !== "") {
      SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver), specifier, symbolName));
    } else {
      SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver), specifier));
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportNonSerializableProperty","kind":"method","status":"implemented","sigHash":"187a0e0b40c641667f6bd242e51c27baaa6cc7e69a3ea7ab10037a5911c3ce08"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportNonSerializableProperty(propertyName string) {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName))
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportNonSerializableProperty(receiver: GoPtr<SymbolTrackerImpl>, propertyName: string): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportNonlocalAugmentation","kind":"method","status":"implemented","sigHash":"851f13bddb99469f5fd9533c6884a35cafbf20ecb3de1a189e26a6d1bd199ccb"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol) {
 * 	primaryDeclaration := core.Find(parentSymbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) == containingFile })
 * 	augmentingDeclarations := core.Filter(augmentingSymbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) != containingFile })
 * 	if primaryDeclaration != nil && len(augmentingDeclarations) > 0 {
 * 		for _, augmentations := range augmentingDeclarations {
 * 			diag := createDiagnosticForNode(augmentations, diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized)
 * 			related := createDiagnosticForNode(primaryDeclaration, diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)
 * 			diag.AddRelatedInfo(related)
 * 			s.state.addDiagnostic(diag)
 * 		}
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportNonlocalAugmentation(receiver: GoPtr<SymbolTrackerImpl>, containingFile: GoPtr<SourceFile>, parentSymbol: GoPtr<Symbol>, augmentingSymbol: GoPtr<Symbol>): void {
  const primaryDeclaration = Find(parentSymbol!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (d: GoPtr<Node>): bool => GetSourceFileOfNode(d) === containingFile, GoZeroPointer<Node>);
  const augmentingDeclarations = Filter(augmentingSymbol!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()), (d: GoPtr<Node>): bool => GetSourceFileOfNode(d) !== containingFile);
  if (primaryDeclaration !== undefined && augmentingDeclarations.length > 0) {
    for (const augmentations of augmentingDeclarations) {
      const diag = createDiagnosticForNode(augmentations, diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized);
      const related = createDiagnosticForNode(primaryDeclaration, diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file);
      Diagnostic_AddRelatedInfo(diag, related);
      SymbolTrackerSharedState_addDiagnostic(receiver!.state, diag);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportPrivateInBaseOfClassExpression","kind":"method","status":"implemented","sigHash":"a4dd3a2c2740daeaa87a2aad553be604300a9099213e2439ed242badf24214e6"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportPrivateInBaseOfClassExpression(propertyName string) {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		diag := createDiagnosticForNode(location, diagnostics.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected, propertyName)
 * 		if ast.IsVariableDeclaration(location.Parent) {
 * 			related := createDiagnosticForNode(location, diagnostics.Add_a_type_annotation_to_the_variable_0, s.errorDeclarationNameWithFallback())
 * 			diag.AddRelatedInfo(related)
 * 		}
 * 		s.state.addDiagnostic(diag)
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportPrivateInBaseOfClassExpression(receiver: GoPtr<SymbolTrackerImpl>, propertyName: string): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    const diag = createDiagnosticForNode(location, diagnostics.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected, propertyName);
    if (IsVariableDeclaration(location!.Parent)) {
      const related = createDiagnosticForNode(location, diagnostics.Add_a_type_annotation_to_the_variable_0, SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver));
      Diagnostic_AddRelatedInfo(diag, related);
    }
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, diag);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.ReportTruncationError","kind":"method","status":"implemented","sigHash":"eda7f07f4d7d3675c420d0c3816bbebbb5e5ab6e95068cad6ec485a96c50de97"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) ReportTruncationError() {
 * 	location := s.errorLocation()
 * 	if location != nil {
 * 		s.state.addDiagnostic(createDiagnosticForNode(location, diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed))
 * 	}
 * }
 */
export function SymbolTrackerImpl_ReportTruncationError(receiver: GoPtr<SymbolTrackerImpl>): void {
  const location = SymbolTrackerImpl_errorLocation(receiver);
  if (location !== undefined) {
    SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(location, diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.errorFallbackNode","kind":"method","status":"implemented","sigHash":"9a80f08a849883cba0d20e7d368f5c7ebd77d3a0f1969b25ef892d36d533846a"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) errorFallbackNode() *ast.Node {
 * 	if len(s.fallbackStack) >= 1 {
 * 		return s.fallbackStack[len(s.fallbackStack)-1]
 * 	}
 * 	return nil
 * }
 */
export function SymbolTrackerImpl_errorFallbackNode(receiver: GoPtr<SymbolTrackerImpl>): GoPtr<Node> {
  if (receiver!.fallbackStack.length >= 1) {
    return receiver!.fallbackStack[receiver!.fallbackStack.length - 1];
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.errorLocation","kind":"method","status":"implemented","sigHash":"3e39b16b506db94adb4861816a5c312ba0a4a0fe8f4b9e7c183cb6eae9bd3217"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) errorLocation() *ast.Node {
 * 	location := s.state.errorNameNode
 * 	if location == nil {
 * 		location = s.errorFallbackNode()
 * 	}
 * 	return location
 * }
 */
export function SymbolTrackerImpl_errorLocation(receiver: GoPtr<SymbolTrackerImpl>): GoPtr<Node> {
  const location = receiver!.state!.errorNameNode;
  if (location === undefined) {
    return SymbolTrackerImpl_errorFallbackNode(receiver);
  }
  return location;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.errorDeclarationNameWithFallback","kind":"method","status":"implemented","sigHash":"ee3c9b02820d3d068dcde13bae810e581e92d5ff1b8a5b14363e49cec4ab554f"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) errorDeclarationNameWithFallback() string {
 * 	if s.state.errorNameNode != nil {
 * 		return scanner.DeclarationNameToString(s.state.errorNameNode)
 * 	}
 * 	if s.errorFallbackNode() != nil && ast.GetNameOfDeclaration(s.errorFallbackNode()) != nil {
 * 		return scanner.DeclarationNameToString(ast.GetNameOfDeclaration(s.errorFallbackNode()))
 * 	}
 * 	if s.errorFallbackNode() != nil && ast.IsExportAssignment(s.errorFallbackNode()) {
 * 		if s.errorFallbackNode().AsExportAssignment().IsExportEquals {
 * 			return "export="
 * 		}
 * 		return "default"
 * 	}
 * 	return "(Missing)" // same fallback declarationNameToString uses when node is zero-width (ie, nameless)
 * }
 */
export function SymbolTrackerImpl_errorDeclarationNameWithFallback(receiver: GoPtr<SymbolTrackerImpl>): string {
  if (receiver!.state!.errorNameNode !== undefined) {
    return DeclarationNameToString(receiver!.state!.errorNameNode);
  }
  const fallback = SymbolTrackerImpl_errorFallbackNode(receiver);
  if (fallback !== undefined && GetNameOfDeclaration(fallback) !== undefined) {
    return DeclarationNameToString(GetNameOfDeclaration(fallback));
  }
  if (fallback !== undefined && IsExportAssignment(fallback)) {
    if (AsExportAssignment(fallback)!.IsExportEquals) {
      return "export=";
    }
    return "default";
  }
  return "(Missing)";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.TrackSymbol","kind":"method","status":"implemented","sigHash":"113974df74cc34350e09bf63a05fbf0216edade2da7d3ba8aa0f523703441863"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
 * 	if symbol.Flags&ast.SymbolFlagsTypeParameter != 0 {
 * 		return false
 * 	}
 * 	issuedDiagnostic := s.handleSymbolAccessibilityError(s.resolver.IsSymbolAccessible(symbol, enclosingDeclaration, meaning /*shouldComputeAliasToMarkVisible* /, true))
 * 	return issuedDiagnostic
 * }
 */
export function SymbolTrackerImpl_TrackSymbol(receiver: GoPtr<SymbolTrackerImpl>, symbol_: GoPtr<Symbol>, enclosingDeclaration: GoPtr<Node>, meaning: SymbolFlags): bool {
  if ((symbol_!.Flags & SymbolFlagsTypeParameter) !== 0) {
    return false;
  }
  const issuedDiagnostic = SymbolTrackerImpl_handleSymbolAccessibilityError(receiver, receiver!.resolver!.IsSymbolAccessible(symbol_, enclosingDeclaration, meaning, /*shouldComputeAliasToMarkVisible*/ true));
  return issuedDiagnostic;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerImpl.handleSymbolAccessibilityError","kind":"method","status":"implemented","sigHash":"a174529489817fb4fc80c0b3990343708a4335b4216642ecbf93f6655fa85d23"}
 *
 * Go source:
 * func (s *SymbolTrackerImpl) handleSymbolAccessibilityError(symbolAccessibilityResult printer.SymbolAccessibilityResult) bool {
 * 	if symbolAccessibilityResult.Accessibility == printer.SymbolAccessibilityAccessible {
 * 		// Add aliases back onto the possible imports list if they're not there so we can try them again with updated visibility info
 * 		if len(symbolAccessibilityResult.AliasesToMakeVisible) > 0 {
 * 			for _, ref := range symbolAccessibilityResult.AliasesToMakeVisible {
 * 				s.state.lateMarkedStatements = core.AppendIfUnique(s.state.lateMarkedStatements, ref)
 * 			}
 * 		}
 * 		// TODO: Do all these accessibility checks inside/after the first pass in the checker when declarations are enabled, if possible
 *
 * 		// The checker should issue errors on unresolvable names, skip the declaration emit error for using a private/unreachable name for those
 * 	} else if symbolAccessibilityResult.Accessibility != printer.SymbolAccessibilityNotResolved {
 * 		// Report error
 * 		errorInfo := s.state.getSymbolAccessibilityDiagnostic(symbolAccessibilityResult)
 * 		if errorInfo != nil {
 * 			info := *errorInfo
 * 			diagNode := symbolAccessibilityResult.ErrorNode
 * 			if diagNode == nil {
 * 				diagNode = errorInfo.errorNode
 * 			}
 * 			if info.typeName != nil {
 * 				s.state.addDiagnostic(createDiagnosticForNode(diagNode, info.diagnosticMessage, scanner.GetTextOfNode(info.typeName), symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName))
 * 			} else {
 * 				s.state.addDiagnostic(createDiagnosticForNode(diagNode, info.diagnosticMessage, symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName))
 * 			}
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function SymbolTrackerImpl_handleSymbolAccessibilityError(receiver: GoPtr<SymbolTrackerImpl>, symbolAccessibilityResult: SymbolAccessibilityResult): bool {
  if (symbolAccessibilityResult.Accessibility === SymbolAccessibilityAccessible) {
    if (symbolAccessibilityResult.AliasesToMakeVisible.length > 0) {
      for (const ref of symbolAccessibilityResult.AliasesToMakeVisible) {
        receiver!.state!.lateMarkedStatements = AppendIfUnique(receiver!.state!.lateMarkedStatements, ref, GoEqualStrict);
      }
    }
  } else if (symbolAccessibilityResult.Accessibility !== SymbolAccessibilityNotResolved) {
    const errorInfo = receiver!.state!.getSymbolAccessibilityDiagnostic!(symbolAccessibilityResult);
    if (errorInfo !== undefined) {
      const info = { ...errorInfo };
      let diagNode = symbolAccessibilityResult.ErrorNode;
      if (diagNode === undefined) {
        diagNode = errorInfo.errorNode;
      }
      if (info.typeName !== undefined) {
        SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(diagNode, info.diagnosticMessage, GetTextOfNode(info.typeName), symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName));
      } else {
        SymbolTrackerSharedState_addDiagnostic(receiver!.state, createDiagnosticForNode(diagNode, info.diagnosticMessage, symbolAccessibilityResult.ErrorSymbolName, symbolAccessibilityResult.ErrorModuleName));
      }
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::func::createDiagnosticForNode","kind":"func","status":"implemented","sigHash":"6cf225f51d25f062d9fd1b3c0bb27fe6744e9d928f43e08b3167e655a83fe1b6"}
 *
 * Go source:
 * func createDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 	return checker.NewDiagnosticForNode(node, message, args...)
 * }
 */
export function createDiagnosticForNode(node: GoPtr<Node>, message: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Diagnostic> {
  return NewDiagnosticForNode(node, message, ...args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::type::SymbolTrackerSharedState","kind":"type","status":"implemented","sigHash":"8c711a26a398f5bad45673c42d10033ec0fd6d3db12f385fe80f621193ade3f3"}
 *
 * Go source:
 * SymbolTrackerSharedState struct {
 * 	lateMarkedStatements             []*ast.Node
 * 	diagnostics                      []*ast.Diagnostic
 * 	getSymbolAccessibilityDiagnostic GetSymbolAccessibilityDiagnostic
 * 	errorNameNode                    *ast.Node
 * 	isolatedDeclarations             bool
 * 	stripInternal                    bool
 * 	currentSourceFile                *ast.SourceFile
 * 	resolver                         printer.EmitResolver
 * 	reportExpandoFunctionErrors      func(node *ast.Node)
 * }
 */
export interface SymbolTrackerSharedState {
  lateMarkedStatements: GoSlice<GoPtr<Node>>;
  diagnostics: GoSlice<GoPtr<Diagnostic>>;
  getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
  errorNameNode: GoPtr<Node>;
  isolatedDeclarations: bool;
  stripInternal: bool;
  currentSourceFile: GoPtr<SourceFile>;
  resolver: GoInterface<EmitResolver>;
  reportExpandoFunctionErrors: GoFunc<(node: GoPtr<Node>) => void>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::method::SymbolTrackerSharedState.addDiagnostic","kind":"method","status":"implemented","sigHash":"0c16fbbcc7d9e2924c9f45048318efe4bd792c7c3ed32ca443e6871fde22bea5"}
 *
 * Go source:
 * func (s *SymbolTrackerSharedState) addDiagnostic(diag *ast.Diagnostic) {
 * 	s.diagnostics = append(s.diagnostics, diag)
 * }
 */
export function SymbolTrackerSharedState_addDiagnostic(receiver: GoPtr<SymbolTrackerSharedState>, diag: GoPtr<Diagnostic>): void {
  receiver!.diagnostics = GoSliceAppend(receiver!.diagnostics, diag, GoPointerValueOps<Diagnostic>());
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/declarations/tracker.go::func::NewSymbolTracker","kind":"func","status":"implemented","sigHash":"1df09c76e742797809ff1f1ca303e88fb68cdb4917cafb34c046da876e4cc51f"}
 *
 * Go source:
 * func NewSymbolTracker(host DeclarationEmitHost, resolver printer.EmitResolver, state *SymbolTrackerSharedState) *SymbolTrackerImpl {
 * 	tracker := &SymbolTrackerImpl{host: host, resolver: resolver, state: state, getIsolatedDeclarationError: createGetIsolatedDeclarationErrors(resolver)}
 * 	return tracker
 * }
 */
export function NewSymbolTracker(host: GoInterface<DeclarationEmitHost>, resolver: GoInterface<EmitResolver>, state: GoPtr<SymbolTrackerSharedState>): GoPtr<SymbolTrackerImpl> {
  const tracker: SymbolTrackerImpl = {
    host: host,
    resolver: resolver,
    state: state,
    fallbackStack: GoNilSlice(),
    getIsolatedDeclarationError: createGetIsolatedDeclarationErrors(resolver),
  };
  return tracker;
}

/**
 * Adapter: converts a GoPtr<SymbolTrackerImpl> to a SymbolTracker interface object.
 * This is the TS equivalent of Go's implicit interface satisfaction for *SymbolTrackerImpl.
 */
export function SymbolTrackerImpl_AsSymbolTracker(receiver: GoPtr<SymbolTrackerImpl>): SymbolTracker {
  return {
    TrackSymbol: (symbol_, enclosingDeclaration, meaning) => SymbolTrackerImpl_TrackSymbol(receiver, symbol_, enclosingDeclaration, meaning),
    ReportInaccessibleThisError: () => SymbolTrackerImpl_ReportInaccessibleThisError(receiver),
    ReportPrivateInBaseOfClassExpression: (propertyName) => SymbolTrackerImpl_ReportPrivateInBaseOfClassExpression(receiver, propertyName),
    ReportInaccessibleUniqueSymbolError: () => SymbolTrackerImpl_ReportInaccessibleUniqueSymbolError(receiver),
    ReportCyclicStructureError: () => SymbolTrackerImpl_ReportCyclicStructureError(receiver),
    ReportLikelyUnsafeImportRequiredError: (specifier, symbolName) => SymbolTrackerImpl_ReportLikelyUnsafeImportRequiredError(receiver, specifier, symbolName),
    ReportTruncationError: () => SymbolTrackerImpl_ReportTruncationError(receiver),
    ReportNonlocalAugmentation: (containingFile, parentSymbol, augmentingSymbol) => SymbolTrackerImpl_ReportNonlocalAugmentation(receiver, containingFile, parentSymbol, augmentingSymbol),
    ReportNonSerializableProperty: (propertyName) => SymbolTrackerImpl_ReportNonSerializableProperty(receiver, propertyName),
    ReportInferenceFallback: (node) => SymbolTrackerImpl_ReportInferenceFallback(receiver, node),
    PushErrorFallbackNode: (node) => SymbolTrackerImpl_PushErrorFallbackNode(receiver, node),
    PopErrorFallbackNode: () => SymbolTrackerImpl_PopErrorFallbackNode(receiver),
  };
}
