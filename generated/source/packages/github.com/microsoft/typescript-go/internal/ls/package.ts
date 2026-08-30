import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { KeywordCompletionFilters } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { Kind as Kind__from_ast } from "../ast/package.js";
import type { CompletionItemKind as CompletionItemKind__from_lsproto, VSClassifiedTextRun as VSClassifiedTextRun__from_lsproto } from "../lsp/lsproto/package.js";
import type { bool, gostring, int, int16, int32 } from "@gotots/runtime/scalars.js";
import { CodeFixProvider } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions.js";
import { fixClassIncorrectlyImplementsInterfaceFixID$string, getAllCodeActionsToFixClassIncorrectlyImplementsInterface, getCodeActionsToFixClassIncorrectlyImplementsInterface } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions_fixclassincorrectlyimplementsinterface.js";
import { fixMissingTypeAnnotationOnExportsFixID$string, getAllIsolatedDeclarationsCodeActions, getIsolatedDeclarationsCodeActions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions_fixmissingtypeannotation.js";
import { getAllImportCodeActions, getImportCodeActions, importFixID$string } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions_importfixes.js";
import { CompletionKindGlobal$constant, CompletionKindMemberLike$constant, CompletionKindNone$constant, CompletionKindObjectPropertyDeclaration$constant, CompletionKindPropertyAccess$constant, CompletionKindString$constant, KeywordCompletionFiltersAll$constant, KeywordCompletionFiltersClassElementKeywords$constant, KeywordCompletionFiltersConstructorParameterKeywords$constant, KeywordCompletionFiltersFunctionLikeBodyKeywords$constant, KeywordCompletionFiltersInterfaceElementKeywords$constant, KeywordCompletionFiltersLast$constant, KeywordCompletionFiltersNone$constant, KeywordCompletionFiltersTypeAssertionKeywords$constant, KeywordCompletionFiltersTypeKeyword$constant, KeywordCompletionFiltersTypeKeywords$constant, SortTextAutoImportSuggestions$constant, SortTextGlobalsOrKeywords$constant, SortTextLocalDeclarationPriority$constant, SortTextLocationPriority$constant, SortTextMemberDeclaredBySpreadAssignment$constant, SortTextOptionalMember$constant, SortTextSuggestedClassMembers$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import { displayPartsWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/displaypartswriter.js";
import { ExportKindDefault$constant, ExportKindExportEquals$constant, ExportKindNamed$constant, ImpExpKindExport$constant, ImpExpKindImport$constant, ImpExpKindUnknown$constant, ModuleReferenceKindImplicit$constant, ModuleReferenceKindImport$constant, ModuleReferenceKindReference$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/importTracker.js";
import { NewSetFromItems$Named_ast$Kind, NewSetFromItems$int32 } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAssertsKeyword$constant as KindAssertsKeyword$constant__from_ast, KindBigIntKeyword$constant as KindBigIntKeyword$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFirstKeyword$constant as KindFirstKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindInferKeyword$constant as KindInferKeyword$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindLastKeyword$constant as KindLastKeyword$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTypeOfKeyword$constant as KindTypeOfKeyword$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast } from "../ast/package.js";
import { SyncMap as SyncMap__from_collections } from "../collections/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../diagnostics/package.js";
import { CompletionItemKindKeyword$constant as CompletionItemKindKeyword$constant__from_lsproto, CompletionItem as CompletionItem__from_lsproto, SemanticTokenModifierAbstract$constant as SemanticTokenModifierAbstract$constant__from_lsproto, SemanticTokenModifierAsync$constant as SemanticTokenModifierAsync$constant__from_lsproto, SemanticTokenModifierDeclaration$constant as SemanticTokenModifierDeclaration$constant__from_lsproto, SemanticTokenModifierDefaultLibrary$constant as SemanticTokenModifierDefaultLibrary$constant__from_lsproto, SemanticTokenModifierDefinition$constant as SemanticTokenModifierDefinition$constant__from_lsproto, SemanticTokenModifierDeprecated$constant as SemanticTokenModifierDeprecated$constant__from_lsproto, SemanticTokenModifierDocumentation$constant as SemanticTokenModifierDocumentation$constant__from_lsproto, SemanticTokenModifierModification$constant as SemanticTokenModifierModification$constant__from_lsproto, SemanticTokenModifierReadonly$constant as SemanticTokenModifierReadonly$constant__from_lsproto, SemanticTokenModifierStatic$constant as SemanticTokenModifierStatic$constant__from_lsproto, SemanticTokenModifier as SemanticTokenModifier__from_lsproto, SemanticTokenTypeClass$constant as SemanticTokenTypeClass$constant__from_lsproto, SemanticTokenTypeComment$constant as SemanticTokenTypeComment$constant__from_lsproto, SemanticTokenTypeDecorator$constant as SemanticTokenTypeDecorator$constant__from_lsproto, SemanticTokenTypeEnum$constant as SemanticTokenTypeEnum$constant__from_lsproto, SemanticTokenTypeEnumMember$constant as SemanticTokenTypeEnumMember$constant__from_lsproto, SemanticTokenTypeEvent$constant as SemanticTokenTypeEvent$constant__from_lsproto, SemanticTokenTypeFunction$constant as SemanticTokenTypeFunction$constant__from_lsproto, SemanticTokenTypeInterface$constant as SemanticTokenTypeInterface$constant__from_lsproto, SemanticTokenTypeKeyword$constant as SemanticTokenTypeKeyword$constant__from_lsproto, SemanticTokenTypeLabel$constant as SemanticTokenTypeLabel$constant__from_lsproto, SemanticTokenTypeMacro$constant as SemanticTokenTypeMacro$constant__from_lsproto, SemanticTokenTypeMethod$constant as SemanticTokenTypeMethod$constant__from_lsproto, SemanticTokenTypeNamespace$constant as SemanticTokenTypeNamespace$constant__from_lsproto, SemanticTokenTypeNumber$constant as SemanticTokenTypeNumber$constant__from_lsproto, SemanticTokenTypeOperator$constant as SemanticTokenTypeOperator$constant__from_lsproto, SemanticTokenTypeParameter$constant as SemanticTokenTypeParameter$constant__from_lsproto, SemanticTokenTypeProperty$constant as SemanticTokenTypeProperty$constant__from_lsproto, SemanticTokenTypeRegexp$constant as SemanticTokenTypeRegexp$constant__from_lsproto, SemanticTokenTypeString$constant as SemanticTokenTypeString$constant__from_lsproto, SemanticTokenTypeStruct$constant as SemanticTokenTypeStruct$constant__from_lsproto, SemanticTokenTypeType$constant as SemanticTokenTypeType$constant__from_lsproto, SemanticTokenTypeTypeParameter$constant as SemanticTokenTypeTypeParameter$constant__from_lsproto, SemanticTokenTypeVariable$constant as SemanticTokenTypeVariable$constant__from_lsproto } from "../lsp/lsproto/package.js";
import { TokenToString as TokenToString__from_scanner } from "../scanner/package.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMap } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    CompletionKindGlobal = CompletionKindGlobal$constant();
    CompletionKindMemberLike = CompletionKindMemberLike$constant();
    CompletionKindNone = CompletionKindNone$constant();
    CompletionKindObjectPropertyDeclaration = CompletionKindObjectPropertyDeclaration$constant();
    CompletionKindPropertyAccess = CompletionKindPropertyAccess$constant();
    CompletionKindString = CompletionKindString$constant();
    ExportKindDefault = ExportKindDefault$constant();
    ExportKindExportEquals = ExportKindExportEquals$constant();
    ExportKindNamed = ExportKindNamed$constant();
    ImpExpKindExport = ImpExpKindExport$constant();
    ImpExpKindImport = ImpExpKindImport$constant();
    ImpExpKindUnknown = ImpExpKindUnknown$constant();
    KeywordCompletionFiltersAll = KeywordCompletionFiltersAll$constant();
    KeywordCompletionFiltersClassElementKeywords = KeywordCompletionFiltersClassElementKeywords$constant();
    KeywordCompletionFiltersConstructorParameterKeywords = KeywordCompletionFiltersConstructorParameterKeywords$constant();
    KeywordCompletionFiltersFunctionLikeBodyKeywords = KeywordCompletionFiltersFunctionLikeBodyKeywords$constant();
    KeywordCompletionFiltersInterfaceElementKeywords = KeywordCompletionFiltersInterfaceElementKeywords$constant();
    KeywordCompletionFiltersLast = KeywordCompletionFiltersLast$constant();
    KeywordCompletionFiltersNone = KeywordCompletionFiltersNone$constant();
    KeywordCompletionFiltersTypeAssertionKeywords = KeywordCompletionFiltersTypeAssertionKeywords$constant();
    KeywordCompletionFiltersTypeKeyword = KeywordCompletionFiltersTypeKeyword$constant();
    KeywordCompletionFiltersTypeKeywords = KeywordCompletionFiltersTypeKeywords$constant();
    ModuleReferenceKindImplicit = ModuleReferenceKindImplicit$constant();
    ModuleReferenceKindImport = ModuleReferenceKindImport$constant();
    ModuleReferenceKindReference = ModuleReferenceKindReference$constant();
    SortTextAutoImportSuggestions = SortTextAutoImportSuggestions$constant();
    SortTextGlobalsOrKeywords = SortTextGlobalsOrKeywords$constant();
    SortTextLocalDeclarationPriority = SortTextLocalDeclarationPriority$constant();
    SortTextLocationPriority = SortTextLocationPriority$constant();
    SortTextMemberDeclaredBySpreadAssignment = SortTextMemberDeclaredBySpreadAssignment$constant();
    SortTextOptionalMember = SortTextOptionalMember$constant();
    SortTextSuggestedClassMembers = SortTextSuggestedClassMembers$constant();
    $state.ErrNeedsAutoImports = void 0;
    $state.ErrNoSourceFile = void 0;
    $state.ErrNoTokenAtPosition = void 0;
    $state.FixClassIncorrectlyImplementsInterfaceProvider = void 0;
    $state.ImportFixProvider = void 0;
    $state.IsolatedDeclarationsFixProvider = void 0;
    $state.TriggerCharacters = RuntimeSlice.nil<gostring>();
    $state.allCommitCharacters = RuntimeSlice.nil<gostring>();
    $state.allKeywordCompletions = void 0;
    $state.canHaveTypeAnnotationKinds = GoMap.nil<Kind__from_ast, bool>(false);
    $state.codeFixProviders = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CodeFixProvider> | undefined>();
    $state.declarationEmitNodeBuilderFlags = 0;
    $state.emptyCommitCharacters = RuntimeSlice.nil<gostring>();
    $state.fixClassIncorrectlyImplementsInterfaceErrorCodes = RuntimeSlice.nil<int32>();
    $state.importFixErrorCodes = RuntimeSlice.nil<int32>();
    $state.isolatedDeclarationsFixErrorCodes = RuntimeSlice.nil<int32>();
    $state.jsDocTagCompletionItems = void 0;
    $state.jsDocTagNameCompletionItems = void 0;
    $state.jsDocTagNames = RuntimeSlice.nil<gostring>();
    $state.jsxTagWordPattern = void 0;
    $state.keywordCompletionsCache = SyncMap__from_collections.$zeroStorage<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>();
    $state.noCommaCommitCharacters = RuntimeSlice.nil<gostring>();
    $state.quoteReplacer = void 0;
    $state.tokenModifiers = RuntimeSlice.nil<gostring>();
    $state.tokenTypes = RuntimeSlice.nil<gostring>();
    $state.typeKeywords = void 0;
    $state.wordSeparators = void 0;
    {
        $state.ErrNoSourceFile = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("source file not found"));
    }
    {
        $state.ErrNoTokenAtPosition = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("no token found at position"));
    }
    {
        void 0;
    }
    {
        $state.fixClassIncorrectlyImplementsInterfaceErrorCodes = RuntimeSlice.literal<int32>([Message__from_diagnostics.Code($state__diagnostics.Class_0_incorrectly_implements_interface_1), Message__from_diagnostics.Code($state__diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass)]);
    }
    {
        $state.isolatedDeclarationsFixErrorCodes = RuntimeSlice.literal<int32>([Message__from_diagnostics.Code($state__diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function), Message__from_diagnostics.Code($state__diagnostics.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_supported_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations), Message__from_diagnostics.Code($state__diagnostics.Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit)]);
    }
    {
        $state.canHaveTypeAnnotationKinds = GoMap.make<int16, bool>(false, 12, [[KindGetAccessor$constant__from_ast(), true], [KindMethodDeclaration$constant__from_ast(), true], [KindPropertyDeclaration$constant__from_ast(), true], [KindFunctionDeclaration$constant__from_ast(), true], [KindFunctionExpression$constant__from_ast(), true], [KindArrowFunction$constant__from_ast(), true], [KindVariableDeclaration$constant__from_ast(), true], [KindParameter$constant__from_ast(), true], [KindExportAssignment$constant__from_ast(), true], [KindClassDeclaration$constant__from_ast(), true], [KindObjectBindingPattern$constant__from_ast(), true], [KindArrayBindingPattern$constant__from_ast(), true]]);
    }
    {
        $state.declarationEmitNodeBuilderFlags = 531469;
    }
    {
        $state.IsolatedDeclarationsFixProvider =
            tsonicTypeScriptRuntime.location<CodeFixProvider>(new CodeFixProvider($state.isolatedDeclarationsFixErrorCodes, getIsolatedDeclarationsCodeActions, RuntimeSlice.literal<gostring>([fixMissingTypeAnnotationOnExportsFixID$string]), getAllIsolatedDeclarationsCodeActions));
    }
    {
        $state.importFixErrorCodes = RuntimeSlice.literal<int32>([Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Did_you_mean_1), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_namespace_0), Message__from_diagnostics.Code($state__diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead), Message__from_diagnostics.Code($state__diagnostics.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here), Message__from_diagnostics.Code($state__diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer), Message__from_diagnostics.Code($state__diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig), Message__from_diagnostics.Code($state__diagnostics.Cannot_find_namespace_0_Did_you_mean_1), Message__from_diagnostics.Code($state__diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements), Message__from_diagnostics.Code($state__diagnostics.This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found)]);
    }
    {
        $state.ErrNeedsAutoImports = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("completion list needs auto imports"));
    }
    {
        $state.FixClassIncorrectlyImplementsInterfaceProvider =
            tsonicTypeScriptRuntime.location<CodeFixProvider>(new CodeFixProvider($state.fixClassIncorrectlyImplementsInterfaceErrorCodes, getCodeActionsToFixClassIncorrectlyImplementsInterface, RuntimeSlice.literal<gostring>([fixClassIncorrectlyImplementsInterfaceFixID$string]), getAllCodeActionsToFixClassIncorrectlyImplementsInterface));
    }
    {
        $state.ImportFixProvider =
            tsonicTypeScriptRuntime.location<CodeFixProvider>(new CodeFixProvider($state.importFixErrorCodes, getImportCodeActions, RuntimeSlice.literal<gostring>([importFixID$string]), getAllImportCodeActions));
    }
    {
        $state.codeFixProviders = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<CodeFixProvider> | undefined>([$state.ImportFixProvider, $state.IsolatedDeclarationsFixProvider, $state.FixClassIncorrectlyImplementsInterfaceProvider]);
    }
    {
        $state.TriggerCharacters = RuntimeSlice.literal<gostring>([".", "\"", "'", "`", "/", "@", "<", "#", " "]);
    }
    {
        $state.allCommitCharacters = RuntimeSlice.literal<gostring>([".", ",", ";"]);
    }
    {
        $state.noCommaCommitCharacters = RuntimeSlice.literal<gostring>([".", ";"]);
    }
    {
        $state.emptyCommitCharacters = RuntimeSlice.literal<gostring>([]);
    }
    {
        $state.wordSeparators = NewSetFromItems$int32(RuntimeSlice.literal<int32>([96, 126, 33, 64, 37, 94, 38, 42, 40, 41, 45, 61, 43, 91, 123, 93, 125, 92, 124, 59, 58, 39, 34, 44, 46, 60, 62, 47, 63]));
    }
    {
        const __gotots_struct_0 = SyncMap__from_collections.$zero<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>();
        $state.keywordCompletionsCache = SyncMap__from_collections.$storageOf<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>(__gotots_struct_0);
    }
    {
        $state.allKeywordCompletions = sync__from_gostdlib.OnceValue<RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>((): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
            let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(0, 85, void 0);
            for (let i = KindFirstKeyword$constant__from_ast(); i <= KindLastKeyword$constant__from_ast(); i = i + 1) {
                result = result.append(void 0, [
                    tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(TokenToString__from_scanner(i), void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindKeyword$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("15"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0)),
                ]);
            }
            return result;
        });
    }
    {
        $state.jsDocTagNames = RuntimeSlice.literal<gostring>(["abstract", "access", "alias", "argument", "async", "augments", "author", "borrows", "callback", "class", "classdesc", "constant", "constructor", "constructs", "copyright", "default", "deprecated", "description", "emits", "enum", "event", "example", "exports", "extends", "external", "field", "file", "fileoverview", "fires", "function", "generator", "global", "hideconstructor", "host", "ignore", "implements", "import", "inheritdoc", "inner", "instance", "interface", "kind", "lends", "license", "link", "linkcode", "linkplain", "listens", "member", "memberof", "method", "mixes", "module", "name", "namespace", "overload", "override", "package", "param", "private", "prop", "property", "protected", "public", "readonly", "requires", "returns", "satisfies", "see", "since", "static", "summary", "template", "this", "throws", "todo", "tutorial", "type", "typedef", "var", "variation", "version", "virtual", "yields"]);
    }
    {
        $state.jsDocTagNameCompletionItems = sync__from_gostdlib.OnceValue<RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>((): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
            let items = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(0, $state.jsDocTagNames.length, void 0);
            const __gotots_range_0 = $state.jsDocTagNames;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let tagName = __gotots_range_value_0;
                let item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined = tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(tagName, void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindKeyword$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
                items = items.append(void 0, [item]);
            }
            return items;
        });
    }
    {
        $state.jsDocTagCompletionItems = sync__from_gostdlib.OnceValue<RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>((): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> => {
            let items = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(0, $state.jsDocTagNames.length, void 0);
            const __gotots_range_1 = $state.jsDocTagNames;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let tagName = __gotots_range_value_1;
                let item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined = tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto("@" + tagName, void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindKeyword$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
                items = items.append(void 0, [item]);
            }
            return items;
        });
    }
    {
        new displayPartsWriter(named_strings.StringsBuilderOperations.$zero(), RuntimeSlice.nil<{
            value: VSClassifiedTextRun__from_lsproto;
        } | undefined>(), false, "");
    }
    {
        void 0;
    }
    {
        $state.jsxTagWordPattern =
            tsonicTypeScriptRuntime.location<gostring>("[a-zA-Z0-9:\\-\\._$]*");
    }
    {
        $state.tokenTypes = RuntimeSlice.literal<gostring>([SemanticTokenTypeNamespace$constant__from_lsproto().$value, SemanticTokenTypeClass$constant__from_lsproto().$value, SemanticTokenTypeEnum$constant__from_lsproto().$value, SemanticTokenTypeInterface$constant__from_lsproto().$value, SemanticTokenTypeStruct$constant__from_lsproto().$value, SemanticTokenTypeTypeParameter$constant__from_lsproto().$value, SemanticTokenTypeType$constant__from_lsproto().$value, SemanticTokenTypeParameter$constant__from_lsproto().$value, SemanticTokenTypeVariable$constant__from_lsproto().$value, SemanticTokenTypeProperty$constant__from_lsproto().$value, SemanticTokenTypeEnumMember$constant__from_lsproto().$value, SemanticTokenTypeDecorator$constant__from_lsproto().$value, SemanticTokenTypeEvent$constant__from_lsproto().$value, SemanticTokenTypeFunction$constant__from_lsproto().$value, SemanticTokenTypeMethod$constant__from_lsproto().$value, SemanticTokenTypeMacro$constant__from_lsproto().$value, SemanticTokenTypeLabel$constant__from_lsproto().$value, SemanticTokenTypeComment$constant__from_lsproto().$value, SemanticTokenTypeString$constant__from_lsproto().$value, SemanticTokenTypeKeyword$constant__from_lsproto().$value, SemanticTokenTypeNumber$constant__from_lsproto().$value, SemanticTokenTypeRegexp$constant__from_lsproto().$value, SemanticTokenTypeOperator$constant__from_lsproto().$value]);
    }
    {
        $state.tokenModifiers = RuntimeSlice.literal<gostring>([SemanticTokenModifierDeclaration$constant__from_lsproto().$value, SemanticTokenModifierDefinition$constant__from_lsproto().$value, SemanticTokenModifierReadonly$constant__from_lsproto().$value, SemanticTokenModifierStatic$constant__from_lsproto().$value, SemanticTokenModifierDeprecated$constant__from_lsproto().$value, SemanticTokenModifierAbstract$constant__from_lsproto().$value, SemanticTokenModifierAsync$constant__from_lsproto().$value, SemanticTokenModifierModification$constant__from_lsproto().$value, SemanticTokenModifierDocumentation$constant__from_lsproto().$value, SemanticTokenModifierDefaultLibrary$constant__from_lsproto().$value, ((void SemanticTokenModifier__from_lsproto,
                "local") as string),
        ]);
    }
    {
        const __gotots_conversion_0 = strings__from_gostdlib.NewReplacer(RuntimeSlice.literal<gostring>(["'", "\\'", "\\\"", "\""]));
        $state.quoteReplacer = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<strings__from_gostdlib.Replacer>(__gotots_conversion_0, (): strings__from_gostdlib.Replacer => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: strings__from_gostdlib.Replacer): void => {
                named_strings.StringsReplacerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
    }
    {
        $state.typeKeywords = NewSetFromItems$Named_ast$Kind(RuntimeSlice.literal<Kind__from_ast>([KindAnyKeyword$constant__from_ast(), KindAssertsKeyword$constant__from_ast(), KindBigIntKeyword$constant__from_ast(), KindBooleanKeyword$constant__from_ast(), KindFalseKeyword$constant__from_ast(), KindInferKeyword$constant__from_ast(), KindKeyOfKeyword$constant__from_ast(), KindNeverKeyword$constant__from_ast(), KindNullKeyword$constant__from_ast(), KindNumberKeyword$constant__from_ast(), KindObjectKeyword$constant__from_ast(), KindReadonlyKeyword$constant__from_ast(), KindStringKeyword$constant__from_ast(), KindSymbolKeyword$constant__from_ast(), KindTypeOfKeyword$constant__from_ast(), KindTrueKeyword$constant__from_ast(), KindVoidKeyword$constant__from_ast(), KindUndefinedKeyword$constant__from_ast(), KindUniqueKeyword$constant__from_ast(), KindUnknownKeyword$constant__from_ast()]));
    }
}
export { CodeAction, CodeFixContext, CodeFixProvider, CombinedCodeActions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions.js";
export { CompletionItem, CompletionKind, CompletionKindGlobal$constant, CompletionKindMemberLike$constant, CompletionKindNone$constant, CompletionKindObjectPropertyDeclaration$constant, CompletionKindPropertyAccess$constant, CompletionKindString$constant, CompletionList, DeprecateSortText, KeywordCompletionFilters, KeywordCompletionFiltersAll$constant, KeywordCompletionFiltersClassElementKeywords$constant, KeywordCompletionFiltersConstructorParameterKeywords$constant, KeywordCompletionFiltersFunctionLikeBodyKeywords$constant, KeywordCompletionFiltersInterfaceElementKeywords$constant, KeywordCompletionFiltersLast$constant, KeywordCompletionFiltersNone$constant, KeywordCompletionFiltersTypeAssertionKeywords$constant, KeywordCompletionFiltersTypeKeyword$constant, KeywordCompletionFiltersTypeKeywords$constant, SortText, SortTextAutoImportSuggestions$constant, SortTextGlobalsOrKeywords$constant, SortTextLocalDeclarationPriority$constant, SortTextLocationPriority$constant, SortTextMemberDeclaredBySpreadAssignment$constant, SortTextOptionalMember$constant, SortTextSuggestedClassMembers$constant, SourceSwitchCases$string } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
export { CrossProjectOrchestrator, CrossProjectOrchestrator$contract, CrossProjectOrchestrator$is, Project, Project$contract, Project$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/crossproject.js";
export { Definition, DefinitionKind, NewSymbolAndEntries, ReferenceEntry, SignatureUsage, SignatureUsage$Storage, SymbolAndEntries, SymbolAndEntriesData } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
export { Host, Host$contract, Host$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/host.js";
export { ExportInfo, ExportKind, ExportKindDefault$constant, ExportKindExportEquals$constant, ExportKindNamed$constant, ImpExpKind, ImpExpKindExport$constant, ImpExpKindImport$constant, ImpExpKindUnknown$constant, ImportExportSymbol, ImportTracker, ImportsResult, LocationAndSymbol, LocationAndSymbol$Storage, ModuleReference, ModuleReference$Storage, ModuleReferenceKind, ModuleReferenceKindImplicit$constant, ModuleReferenceKindImport$constant, ModuleReferenceKindReference$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/importTracker.js";
export { LanguageService, NewLanguageService } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/languageservice.js";
export { ClientSupportsDocumentChanges, ClientSupportsRenameResourceOperations, ClientSupportsWillRenameFiles, RenameInfo } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/rename.js";
export { SemanticTokensLegend } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/semantictokens.js";
export { CandidateOrTypeInfo } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/signaturehelp.js";
export { DeclarationInfo, DeclarationInfo$Storage, ProvideWorkspaceSymbols } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/symbols.js";
export { IsInString, PossibleTypeArgumentInfo, RangeContainsRange } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/utilities.js";
export let CompletionKindGlobal: ReturnType<typeof CompletionKindGlobal$constant>;
export let CompletionKindMemberLike: ReturnType<typeof CompletionKindMemberLike$constant>;
export let CompletionKindNone: ReturnType<typeof CompletionKindNone$constant>;
export let CompletionKindObjectPropertyDeclaration: ReturnType<typeof CompletionKindObjectPropertyDeclaration$constant>;
export let CompletionKindPropertyAccess: ReturnType<typeof CompletionKindPropertyAccess$constant>;
export let CompletionKindString: ReturnType<typeof CompletionKindString$constant>;
export let ExportKindDefault: ReturnType<typeof ExportKindDefault$constant>;
export let ExportKindExportEquals: ReturnType<typeof ExportKindExportEquals$constant>;
export let ExportKindNamed: ReturnType<typeof ExportKindNamed$constant>;
export let ImpExpKindExport: ReturnType<typeof ImpExpKindExport$constant>;
export let ImpExpKindImport: ReturnType<typeof ImpExpKindImport$constant>;
export let ImpExpKindUnknown: ReturnType<typeof ImpExpKindUnknown$constant>;
export let KeywordCompletionFiltersAll: ReturnType<typeof KeywordCompletionFiltersAll$constant>;
export let KeywordCompletionFiltersClassElementKeywords: ReturnType<typeof KeywordCompletionFiltersClassElementKeywords$constant>;
export let KeywordCompletionFiltersConstructorParameterKeywords: ReturnType<typeof KeywordCompletionFiltersConstructorParameterKeywords$constant>;
export let KeywordCompletionFiltersFunctionLikeBodyKeywords: ReturnType<typeof KeywordCompletionFiltersFunctionLikeBodyKeywords$constant>;
export let KeywordCompletionFiltersInterfaceElementKeywords: ReturnType<typeof KeywordCompletionFiltersInterfaceElementKeywords$constant>;
export let KeywordCompletionFiltersLast: ReturnType<typeof KeywordCompletionFiltersLast$constant>;
export let KeywordCompletionFiltersNone: ReturnType<typeof KeywordCompletionFiltersNone$constant>;
export let KeywordCompletionFiltersTypeAssertionKeywords: ReturnType<typeof KeywordCompletionFiltersTypeAssertionKeywords$constant>;
export let KeywordCompletionFiltersTypeKeyword: ReturnType<typeof KeywordCompletionFiltersTypeKeyword$constant>;
export let KeywordCompletionFiltersTypeKeywords: ReturnType<typeof KeywordCompletionFiltersTypeKeywords$constant>;
export let ModuleReferenceKindImplicit: ReturnType<typeof ModuleReferenceKindImplicit$constant>;
export let ModuleReferenceKindImport: ReturnType<typeof ModuleReferenceKindImport$constant>;
export let ModuleReferenceKindReference: ReturnType<typeof ModuleReferenceKindReference$constant>;
export let SortTextAutoImportSuggestions: ReturnType<typeof SortTextAutoImportSuggestions$constant>;
export let SortTextGlobalsOrKeywords: ReturnType<typeof SortTextGlobalsOrKeywords$constant>;
export let SortTextLocalDeclarationPriority: ReturnType<typeof SortTextLocalDeclarationPriority$constant>;
export let SortTextLocationPriority: ReturnType<typeof SortTextLocationPriority$constant>;
export let SortTextMemberDeclaredBySpreadAssignment: ReturnType<typeof SortTextMemberDeclaredBySpreadAssignment$constant>;
export let SortTextOptionalMember: ReturnType<typeof SortTextOptionalMember$constant>;
export let SortTextSuggestedClassMembers: ReturnType<typeof SortTextSuggestedClassMembers$constant>;
export { $state };
