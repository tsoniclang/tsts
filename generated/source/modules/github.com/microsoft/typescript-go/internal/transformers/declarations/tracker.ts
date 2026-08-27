import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { DeclarationEmitHost } from "./transform.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, Node as Node__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewDiagnosticForNode as NewDiagnosticForNode__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { SymbolAccessibilityAccessible$constant as SymbolAccessibilityAccessible$constant__from_printer, SymbolAccessibilityNotResolved$constant as SymbolAccessibilityNotResolved$constant__from_printer, SymbolAccessibilityResult as SymbolAccessibilityResult__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { DeclarationNameToString as DeclarationNameToString__from_scanner, GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { AppendIfUnique$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { SymbolAccessibilityDiagnostic, createGetIsolatedDeclarationErrors } from "./diagnostics.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class SymbolTrackerImpl {
    declare private readonly $goType: void;
    public constructor(public resolver: EmitResolver__from_printer | undefined, public state: {
        value: SymbolTrackerSharedState;
    } | undefined, public host: DeclarationEmitHost | undefined, public fallbackStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public getIsolatedDeclarationError: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined) {
    }
    static $copy($source: SymbolTrackerImpl): SymbolTrackerImpl {
        return new SymbolTrackerImpl($source.resolver, $source.state, $source.host, $source.fallbackStack, $source.getIsolatedDeclarationError);
    }
    declare private readonly then?: never;
    static PopErrorFallbackNode(s: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.slice(0, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.length - 1, null);
    }
    static PushErrorFallbackNode(s: {
        value: SymbolTrackerImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.append(void 0, [node]);
    }
    static ReportCyclicStructureError(s: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s))])));
        }
    }
    static ReportInaccessibleThisError(s: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s)), new GoInterfaceAdapter("this")])));
        }
    }
    static ReportInaccessibleUniqueSymbolError(s: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s)), new GoInterfaceAdapter("unique symbol")])));
        }
    }
    static ReportInferenceFallback(s: {
        value: SymbolTrackerImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isolatedDeclarations) {
            return;
        }
        if (!tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(node), ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile)) {
            return;
        }
        const __gotots_receiver_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolver;
        const __gotots_argument_0 = node;
        if (goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_0).IsExpandoFunctionDeclarationUnsafe(__gotots_argument_0)) {
            const __gotots_callee_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportExpandoFunctionErrors;
            const __gotots_argument_1 = node;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        }
        const __gotots_receiver_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state;
        const __gotots_callee_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getIsolatedDeclarationError;
        const __gotots_argument_2 = node;
        const __gotots_argument_3 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        SymbolTrackerSharedState.$go$private$declarations$addDiagnostic(__gotots_receiver_1, __gotots_argument_3);
    }
    static ReportLikelyUnsafeImportRequiredError(s: {
        value: SymbolTrackerImpl;
    } | undefined, specifier: gostring, symbolName: gostring): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            if (symbolName !== "") {
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s)), new GoInterfaceAdapter(specifier), new GoInterfaceAdapter(symbolName)])));
            }
            else {
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s)), new GoInterfaceAdapter(specifier)])));
            }
        }
    }
    static ReportNonSerializableProperty(s: {
        value: SymbolTrackerImpl;
    } | undefined, propertyName: gostring): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propertyName)])));
        }
    }
    static ReportNonlocalAugmentation(s: {
        value: SymbolTrackerImpl;
    } | undefined, containingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, augmentingSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        let primaryDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((parentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(d), containingFile);
        });
        let augmentingDeclarations = Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((augmentingSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(d), containingFile);
        });
        if (!(primaryDeclaration === undefined) && augmentingDeclarations.length > 0) {
            const __gotots_range_1 = augmentingDeclarations;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let augmentations: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(augmentations, $state__diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized, RuntimeSlice.nil<GoInterface | undefined>());
                let related: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(primaryDeclaration, $state__diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file, RuntimeSlice.nil<GoInterface | undefined>());
                Diagnostic__from_ast.AddRelatedInfo(diag, related);
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, diag);
            }
        }
    }
    static ReportPrivateInBaseOfClassExpression(s: {
        value: SymbolTrackerImpl;
    } | undefined, propertyName: gostring): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(location, $state__diagnostics.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propertyName)]));
            if (IsVariableDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                let related: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(location, $state__diagnostics.Add_a_type_annotation_to_the_variable_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(SymbolTrackerImpl.$go$private$declarations$errorDeclarationNameWithFallback(s))]));
                Diagnostic__from_ast.AddRelatedInfo(diag, related);
            }
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, diag);
        }
    }
    static ReportTruncationError(s: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolTrackerImpl.$go$private$declarations$errorLocation(s);
        if (!(location === undefined)) {
            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(location, $state__diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed, RuntimeSlice.nil<GoInterface | undefined>()));
        }
    }
    static TrackSymbol(s: {
        value: SymbolTrackerImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning: SymbolFlags__from_ast): bool {
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
            return false;
        }
        const __gotots_receiver_3 = s;
        const __gotots_receiver_2 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolver;
        const __gotots_argument_5 = __go_symbol;
        const __gotots_argument_6 = enclosingDeclaration;
        const __gotots_argument_7 = meaning;
        const __gotots_argument_8 = true;
        const __gotots_argument_9 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_2).IsSymbolAccessible(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
        let issuedDiagnostic = SymbolTrackerImpl.$go$private$declarations$handleSymbolAccessibilityError(__gotots_receiver_3, __gotots_argument_9);
        return issuedDiagnostic;
    }
    static $go$private$declarations$errorDeclarationNameWithFallback(s: {
        value: SymbolTrackerImpl;
    } | undefined): gostring {
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode === undefined)) {
            return DeclarationNameToString__from_scanner(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode);
        }
        if (!(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s) === undefined) && !(GetNameOfDeclaration__from_ast(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s)) === undefined)) {
            return DeclarationNameToString__from_scanner(GetNameOfDeclaration__from_ast(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s)));
        }
        if (!(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s) === undefined) && IsExportAssignment__from_ast(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s))) {
            if ((Node__from_ast.AsExportAssignment(SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
                return "export=";
            }
            return "default";
        }
        return "(Missing)";
    }
    static $go$private$declarations$errorFallbackNode(s: {
        value: SymbolTrackerImpl;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.length >= 1) {
            return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.get((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fallbackStack.length - 1);
        }
        return void 0;
    }
    static $go$private$declarations$errorLocation(s: {
        value: SymbolTrackerImpl;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode;
        if (location === undefined) {
            location = SymbolTrackerImpl.$go$private$declarations$errorFallbackNode(s);
        }
        return location;
    }
    static $go$private$declarations$handleSymbolAccessibilityError(s: {
        value: SymbolTrackerImpl;
    } | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): bool {
        if (symbolAccessibilityResult.Accessibility === SymbolAccessibilityAccessible$constant__from_printer()) {
            if (symbolAccessibilityResult.AliasesToMakeVisible.length > 0) {
                const __gotots_range_0 = symbolAccessibilityResult.AliasesToMakeVisible;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements = AppendIfUnique$PointerTo_Named_ast$Node(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements, ref);
                }
            }
        }
        else if (!(symbolAccessibilityResult.Accessibility === SymbolAccessibilityNotResolved$constant__from_printer())) {
            const __gotots_callee_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
            const __gotots_argument_4 = SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult);
            let errorInfo: SymbolAccessibilityDiagnostic | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
            if (!(errorInfo === undefined)) {
                let info = SymbolAccessibilityDiagnostic.$copy(SymbolAccessibilityDiagnostic.$copy((errorInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
                let diagNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = symbolAccessibilityResult.ErrorNode;
                if (diagNode === undefined) {
                    diagNode = (errorInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errorNode;
                }
                if (!(info.typeName === undefined)) {
                    SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(diagNode, info.diagnosticMessage, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(GetTextOfNode__from_scanner(info.typeName)), new GoInterfaceAdapter(symbolAccessibilityResult.ErrorSymbolName), new GoInterfaceAdapter(symbolAccessibilityResult.ErrorModuleName)])));
                }
                else {
                    SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.state, createDiagnosticForNode(diagNode, info.diagnosticMessage, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(symbolAccessibilityResult.ErrorSymbolName), new GoInterfaceAdapter(symbolAccessibilityResult.ErrorModuleName)])));
                }
                return true;
            }
        }
        return false;
    }
}
export function createDiagnosticForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return NewDiagnosticForNode__from_checker(node, message, args);
}
export class SymbolTrackerSharedState {
    declare private readonly $goType: void;
    public constructor(public lateMarkedStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public getSymbolAccessibilityDiagnostic: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined, public errorNameNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public isolatedDeclarations: bool, public stripInternal: bool, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public resolver: EmitResolver__from_printer | undefined, public reportExpandoFunctionErrors: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined) {
    }
    static $copy($source: SymbolTrackerSharedState): SymbolTrackerSharedState {
        return new SymbolTrackerSharedState($source.lateMarkedStatements, $source.diagnostics, $source.getSymbolAccessibilityDiagnostic, $source.errorNameNode, $source.isolatedDeclarations, $source.stripInternal, $source.currentSourceFile, $source.resolver, $source.reportExpandoFunctionErrors);
    }
    declare private readonly then?: never;
    static $go$private$declarations$addDiagnostic(s: {
        value: SymbolTrackerSharedState;
    } | undefined, diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics.append(void 0, [diag]);
    }
}
export function NewSymbolTracker(host: DeclarationEmitHost | undefined, resolver: EmitResolver__from_printer | undefined, state: {
    value: SymbolTrackerSharedState;
} | undefined): {
    value: SymbolTrackerImpl;
} | undefined {
    let tracker: {
        value: SymbolTrackerImpl;
    } | undefined = { value: new SymbolTrackerImpl(resolver, state, host, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), createGetIsolatedDeclarationErrors(resolver)) };
    return tracker;
}
