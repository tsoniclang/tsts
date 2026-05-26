/**
 * SymbolTracker implementation for declaration emit.
 *
 * Port of TS-Go `internal/transformers/declarations/tracker.go`.
 * Issues declaration-emit diagnostics when private/unreachable
 * symbols leak into the public surface during type serialization.
 */

import type { Node as AstNode, Diagnostic, Symbol as TsSymbol, SourceFile } from "../../ast/index.js";

export interface SymbolTrackerSharedState {
  lateMarkedStatements: AstNode[];
  diagnostics: Diagnostic[];
  getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
  errorNameNode: AstNode | undefined;
  isolatedDeclarations: boolean;
  stripInternal: boolean;
  currentSourceFile: SourceFile;
  resolver: EmitResolver;
  reportExpandoFunctionErrors: (node: AstNode) => void;
}

export type GetSymbolAccessibilityDiagnostic = (
  result: SymbolAccessibilityResult,
) => SymbolAccessibilityErrorInfo | undefined;

export interface SymbolAccessibilityResult {
  accessibility: number;
  aliasesToMakeVisible: readonly AstNode[];
  errorSymbolName: string;
  errorModuleName: string;
  errorNode: AstNode | undefined;
}

export interface SymbolAccessibilityErrorInfo {
  diagnosticMessage: DiagnosticMessage;
  errorNode: AstNode;
  typeName: AstNode | undefined;
}

// DiagnosticMessage type re-exported from the canonical diagnostics
// module so the tracker and the declarations/diagnostics callers
// agree on a single shape.
export type { DiagnosticMessage } from "../../diagnostics/types.js";

export interface EmitResolver {
  isSymbolAccessible(symbol: TsSymbol, enclosing: AstNode | undefined, meaning: number, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
  isDeclarationVisible(node: AstNode): boolean;
  isExpandoFunctionDeclarationUnsafe(node: AstNode): boolean;
}

export interface DeclarationEmitHost {
  getEffectiveDeclarationFlags(node: AstNode, flags: number): number;
}

export class SymbolTrackerImpl {
  readonly resolver: EmitResolver;
  readonly state: SymbolTrackerSharedState;
  readonly host: DeclarationEmitHost;
  fallbackStack: AstNode[];
  readonly getIsolatedDeclarationError: (node: AstNode) => Diagnostic;

  constructor(host: DeclarationEmitHost, resolver: EmitResolver, state: SymbolTrackerSharedState) {
    this.host = host;
    this.resolver = resolver;
    this.state = state;
    this.fallbackStack = [];
    this.getIsolatedDeclarationError = createGetIsolatedDeclarationErrors(resolver);
  }

  popErrorFallbackNode(): void {
    this.fallbackStack = this.fallbackStack.slice(0, -1);
  }

  pushErrorFallbackNode(node: AstNode): void {
    this.fallbackStack = [...this.fallbackStack, node];
  }

  reportCyclicStructureError(): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      this.state.diagnostics = [
        ...this.state.diagnostics,
        createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, [this.errorDeclarationNameWithFallback()]),
      ];
    }
  }

  reportInaccessibleThisError(): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      this.state.diagnostics = [
        ...this.state.diagnostics,
        createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, [this.errorDeclarationNameWithFallback(), "this"]),
      ];
    }
  }

  reportInaccessibleUniqueSymbolError(): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      this.state.diagnostics = [
        ...this.state.diagnostics,
        createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, [this.errorDeclarationNameWithFallback(), "unique symbol"]),
      ];
    }
  }

  reportInferenceFallback(node: AstNode): void {
    if (!this.state.isolatedDeclarations || isSourceFileJS(this.state.currentSourceFile)) return;
    if (getSourceFileOfNode(node) !== this.state.currentSourceFile) return;
    if (isVariableDeclaration(node) && this.state.resolver.isExpandoFunctionDeclarationUnsafe(node)) {
      this.state.reportExpandoFunctionErrors(node);
    } else {
      this.state.diagnostics = [...this.state.diagnostics, this.getIsolatedDeclarationError(node)];
    }
  }

  reportLikelyUnsafeImportRequiredError(specifier: string, symbolName: string): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      if (symbolName !== "") {
        this.state.diagnostics = [
          ...this.state.diagnostics,
          createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary, [this.errorDeclarationNameWithFallback(), specifier, symbolName]),
        ];
      } else {
        this.state.diagnostics = [
          ...this.state.diagnostics,
          createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, [this.errorDeclarationNameWithFallback(), specifier]),
        ];
      }
    }
  }

  reportNonSerializableProperty(propertyName: string): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      this.state.diagnostics = [
        ...this.state.diagnostics,
        createDiagnosticForNode(location, Diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, [propertyName]),
      ];
    }
  }

  reportNonlocalAugmentation(containingFile: SourceFile, parentSymbol: TsSymbol, augmentingSymbol: TsSymbol): void {
    const primaryDeclaration = symbolDeclarations(parentSymbol).find((d) => getSourceFileOfNode(d) === containingFile);
    const augmentingDeclarations = symbolDeclarations(augmentingSymbol).filter((d) => getSourceFileOfNode(d) !== containingFile);
    if (primaryDeclaration !== undefined && augmentingDeclarations.length > 0) {
      for (const augmentation of augmentingDeclarations) {
        const diag = createDiagnosticForNode(augmentation, Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized, []);
        const related = createDiagnosticForNode(primaryDeclaration, Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file, []);
        addRelatedInfo(diag, related);
        this.state.diagnostics = [...this.state.diagnostics, diag];
      }
    }
  }

  reportPrivateInBaseOfClassExpression(propertyName: string): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      const diag = createDiagnosticForNode(location, Diagnostics.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected, [propertyName]);
      const parent = nodeParent(location);
      if (parent !== undefined && isVariableDeclaration(parent)) {
        const related = createDiagnosticForNode(location, Diagnostics.Add_a_type_annotation_to_the_variable_0, [this.errorDeclarationNameWithFallback()]);
        addRelatedInfo(diag, related);
      }
      this.state.diagnostics = [...this.state.diagnostics, diag];
    }
  }

  reportTruncationError(): void {
    const location = this.errorLocation();
    if (location !== undefined) {
      this.state.diagnostics = [
        ...this.state.diagnostics,
        createDiagnosticForNode(location, Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed, []),
      ];
    }
  }

  errorFallbackNode(): AstNode | undefined {
    if (this.fallbackStack.length >= 1) return this.fallbackStack[this.fallbackStack.length - 1];
    return undefined;
  }

  errorLocation(): AstNode | undefined {
    return this.state.errorNameNode ?? this.errorFallbackNode();
  }

  errorDeclarationNameWithFallback(): string {
    if (this.state.errorNameNode !== undefined) return declarationNameToString(this.state.errorNameNode);
    const fallback = this.errorFallbackNode();
    if (fallback !== undefined && getNameOfDeclaration(fallback) !== undefined) {
      return declarationNameToString(getNameOfDeclaration(fallback)!);
    }
    if (fallback !== undefined && isExportAssignment(fallback)) {
      return exportAssignmentIsExportEquals(fallback) ? "export=" : "default";
    }
    return "(Missing)";
  }

  trackSymbol(symbol: TsSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): boolean {
    if ((symbolFlags(symbol) & SymbolFlags.TypeParameter) !== 0) return false;
    return this.handleSymbolAccessibilityError(this.resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, true));
  }

  handleSymbolAccessibilityError(result: SymbolAccessibilityResult): boolean {
    if (result.accessibility === SymbolAccessibility.Accessible) {
      if (result.aliasesToMakeVisible.length > 0) {
        for (const ref of result.aliasesToMakeVisible) {
          if (!this.state.lateMarkedStatements.includes(ref)) {
            this.state.lateMarkedStatements = [...this.state.lateMarkedStatements, ref];
          }
        }
      }
    } else if (result.accessibility !== SymbolAccessibility.NotResolved) {
      const errorInfo = this.state.getSymbolAccessibilityDiagnostic(result);
      if (errorInfo !== undefined) {
        const diagNode = result.errorNode ?? errorInfo.errorNode;
        const args = errorInfo.typeName !== undefined
          ? [getTextOfNode(errorInfo.typeName), result.errorSymbolName, result.errorModuleName]
          : [result.errorSymbolName, result.errorModuleName];
        this.state.diagnostics = [...this.state.diagnostics, createDiagnosticForNode(diagNode, errorInfo.diagnosticMessage, args)];
        return true;
      }
    }
    return false;
  }
}

export function newSymbolTracker(host: DeclarationEmitHost, resolver: EmitResolver, state: SymbolTrackerSharedState): SymbolTrackerImpl {
  return new SymbolTrackerImpl(host, resolver, state);
}

export function createDiagnosticForNode(node: AstNode, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic {
  return checkerNewDiagnosticForNode(node, message, args);
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

declare const Diagnostics: {
  The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary: DiagnosticMessage;
  The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary: DiagnosticMessage;
  The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary: DiagnosticMessage;
  The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary: DiagnosticMessage;
  The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized: DiagnosticMessage;
  Declaration_augments_declaration_in_another_file_This_cannot_be_serialized: DiagnosticMessage;
  This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file: DiagnosticMessage;
  Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected: DiagnosticMessage;
  Add_a_type_annotation_to_the_variable_0: DiagnosticMessage;
  The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed: DiagnosticMessage;
};

declare const SymbolFlags: { TypeParameter: number };
declare const SymbolAccessibility: { Accessible: number; NotResolved: number };

declare function symbolFlags(symbol: TsSymbol): number;
declare function symbolDeclarations(symbol: TsSymbol): readonly AstNode[];
declare function isSourceFileJS(file: SourceFile): boolean;
declare function getSourceFileOfNode(node: AstNode): SourceFile | undefined;
declare function isVariableDeclaration(node: AstNode): boolean;
declare function isExportAssignment(node: AstNode): boolean;
declare function exportAssignmentIsExportEquals(node: AstNode): boolean;
declare function declarationNameToString(node: AstNode): string;
declare function getNameOfDeclaration(node: AstNode): AstNode | undefined;
declare function nodeParent(node: AstNode): AstNode | undefined;
declare function addRelatedInfo(diag: Diagnostic, related: Diagnostic): void;
declare function checkerNewDiagnosticForNode(node: AstNode, message: DiagnosticMessage, args: readonly unknown[]): Diagnostic;
declare function getTextOfNode(node: AstNode): string;
declare function createGetIsolatedDeclarationErrors(resolver: EmitResolver): (node: AstNode) => Diagnostic;
