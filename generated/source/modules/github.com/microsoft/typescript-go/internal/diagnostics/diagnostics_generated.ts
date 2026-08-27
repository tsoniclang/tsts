import type { Key, Message } from "./diagnostics.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/state.js";
export function keyToMessage(key: Key): {
    value: Message;
} | undefined {
    switch (key.$value) {
        case "Unterminated_string_literal_1002": {
            return $state.Unterminated_string_literal;
            break;
        }
        case "Identifier_expected_1003": {
            return $state.Identifier_expected;
            break;
        }
        case "_0_expected_1005": {
            return $state.X_0_expected;
            break;
        }
        case "A_file_cannot_have_a_reference_to_itself_1006": {
            return $state.A_file_cannot_have_a_reference_to_itself;
            break;
        }
        case "The_parser_expected_to_find_a_1_to_match_the_0_token_here_1007": {
            return $state.The_parser_expected_to_find_a_1_to_match_the_0_token_here;
            break;
        }
        case "Trailing_comma_not_allowed_1009": {
            return $state.Trailing_comma_not_allowed;
            break;
        }
        case "Asterisk_Slash_expected_1010": {
            return $state.Asterisk_Slash_expected;
            break;
        }
        case "An_element_access_expression_should_take_an_argument_1011": {
            return $state.An_element_access_expression_should_take_an_argument;
            break;
        }
        case "Unexpected_token_1012": {
            return $state.Unexpected_token;
            break;
        }
        case "A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma_1013": {
            return $state.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma;
            break;
        }
        case "A_rest_parameter_must_be_last_in_a_parameter_list_1014": {
            return $state.A_rest_parameter_must_be_last_in_a_parameter_list;
            break;
        }
        case "Parameter_cannot_have_question_mark_and_initializer_1015": {
            return $state.Parameter_cannot_have_question_mark_and_initializer;
            break;
        }
        case "A_required_parameter_cannot_follow_an_optional_parameter_1016": {
            return $state.A_required_parameter_cannot_follow_an_optional_parameter;
            break;
        }
        case "An_index_signature_cannot_have_a_rest_parameter_1017": {
            return $state.An_index_signature_cannot_have_a_rest_parameter;
            break;
        }
        case "An_index_signature_parameter_cannot_have_an_accessibility_modifier_1018": {
            return $state.An_index_signature_parameter_cannot_have_an_accessibility_modifier;
            break;
        }
        case "An_index_signature_parameter_cannot_have_a_question_mark_1019": {
            return $state.An_index_signature_parameter_cannot_have_a_question_mark;
            break;
        }
        case "An_index_signature_parameter_cannot_have_an_initializer_1020": {
            return $state.An_index_signature_parameter_cannot_have_an_initializer;
            break;
        }
        case "An_index_signature_must_have_a_type_annotation_1021": {
            return $state.An_index_signature_must_have_a_type_annotation;
            break;
        }
        case "An_index_signature_parameter_must_have_a_type_annotation_1022": {
            return $state.An_index_signature_parameter_must_have_a_type_annotation;
            break;
        }
        case "readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature_1024": {
            return $state.X_readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature;
            break;
        }
        case "An_index_signature_cannot_have_a_trailing_comma_1025": {
            return $state.An_index_signature_cannot_have_a_trailing_comma;
            break;
        }
        case "Accessibility_modifier_already_seen_1028": {
            return $state.Accessibility_modifier_already_seen;
            break;
        }
        case "_0_modifier_must_precede_1_modifier_1029": {
            return $state.X_0_modifier_must_precede_1_modifier;
            break;
        }
        case "_0_modifier_already_seen_1030": {
            return $state.X_0_modifier_already_seen;
            break;
        }
        case "_0_modifier_cannot_appear_on_class_elements_of_this_kind_1031": {
            return $state.X_0_modifier_cannot_appear_on_class_elements_of_this_kind;
            break;
        }
        case "super_must_be_followed_by_an_argument_list_or_member_access_1034": {
            return $state.X_super_must_be_followed_by_an_argument_list_or_member_access;
            break;
        }
        case "Only_ambient_modules_can_use_quoted_names_1035": {
            return $state.Only_ambient_modules_can_use_quoted_names;
            break;
        }
        case "Statements_are_not_allowed_in_ambient_contexts_1036": {
            return $state.Statements_are_not_allowed_in_ambient_contexts;
            break;
        }
        case "A_declare_modifier_cannot_be_used_in_an_already_ambient_context_1038": {
            return $state.A_declare_modifier_cannot_be_used_in_an_already_ambient_context;
            break;
        }
        case "Initializers_are_not_allowed_in_ambient_contexts_1039": {
            return $state.Initializers_are_not_allowed_in_ambient_contexts;
            break;
        }
        case "_0_modifier_cannot_be_used_in_an_ambient_context_1040": {
            return $state.X_0_modifier_cannot_be_used_in_an_ambient_context;
            break;
        }
        case "_0_modifier_cannot_be_used_here_1042": {
            return $state.X_0_modifier_cannot_be_used_here;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_module_or_namespace_element_1044": {
            return $state.X_0_modifier_cannot_appear_on_a_module_or_namespace_element;
            break;
        }
        case "Top_level_declarations_in_d_ts_files_must_start_with_either_a_declare_or_export_modifier_1046": {
            return $state.Top_level_declarations_in_d_ts_files_must_start_with_either_a_declare_or_export_modifier;
            break;
        }
        case "A_rest_parameter_cannot_be_optional_1047": {
            return $state.A_rest_parameter_cannot_be_optional;
            break;
        }
        case "A_rest_parameter_cannot_have_an_initializer_1048": {
            return $state.A_rest_parameter_cannot_have_an_initializer;
            break;
        }
        case "A_set_accessor_must_have_exactly_one_parameter_1049": {
            return $state.A_set_accessor_must_have_exactly_one_parameter;
            break;
        }
        case "A_set_accessor_cannot_have_an_optional_parameter_1051": {
            return $state.A_set_accessor_cannot_have_an_optional_parameter;
            break;
        }
        case "A_set_accessor_parameter_cannot_have_an_initializer_1052": {
            return $state.A_set_accessor_parameter_cannot_have_an_initializer;
            break;
        }
        case "A_set_accessor_cannot_have_rest_parameter_1053": {
            return $state.A_set_accessor_cannot_have_rest_parameter;
            break;
        }
        case "A_get_accessor_cannot_have_parameters_1054": {
            return $state.A_get_accessor_cannot_have_parameters;
            break;
        }
        case "Type_0_is_not_a_valid_async_function_return_type_in_ES5_because_it_does_not_refer_to_a_Promise_compa_1055": {
            return $state.Type_0_is_not_a_valid_async_function_return_type_in_ES5_because_it_does_not_refer_to_a_Promise_compatible_constructor_value;
            break;
        }
        case "Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher_1056": {
            return $state.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher;
            break;
        }
        case "The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_t_1058": {
            return $state.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member;
            break;
        }
        case "A_promise_must_have_a_then_method_1059": {
            return $state.A_promise_must_have_a_then_method;
            break;
        }
        case "The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback_1060": {
            return $state.The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback;
            break;
        }
        case "Enum_member_must_have_initializer_1061": {
            return $state.Enum_member_must_have_initializer;
            break;
        }
        case "Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method_1062": {
            return $state.Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method;
            break;
        }
        case "An_export_assignment_cannot_be_used_in_a_namespace_1063": {
            return $state.An_export_assignment_cannot_be_used_in_a_namespace;
            break;
        }
        case "The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_wri_1064": {
            return $state.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0;
            break;
        }
        case "The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_1065": {
            return $state.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type;
            break;
        }
        case "In_ambient_enum_declarations_member_initializer_must_be_constant_expression_1066": {
            return $state.In_ambient_enum_declarations_member_initializer_must_be_constant_expression;
            break;
        }
        case "Unexpected_token_A_constructor_method_accessor_or_property_was_expected_1068": {
            return $state.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
            break;
        }
        case "Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces_1069": {
            return $state.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_type_member_1070": {
            return $state.X_0_modifier_cannot_appear_on_a_type_member;
            break;
        }
        case "_0_modifier_cannot_appear_on_an_index_signature_1071": {
            return $state.X_0_modifier_cannot_appear_on_an_index_signature;
            break;
        }
        case "A_0_modifier_cannot_be_used_with_an_import_declaration_1079": {
            return $state.A_0_modifier_cannot_be_used_with_an_import_declaration;
            break;
        }
        case "Invalid_reference_directive_syntax_1084": {
            return $state.Invalid_reference_directive_syntax;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_constructor_declaration_1089": {
            return $state.X_0_modifier_cannot_appear_on_a_constructor_declaration;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_parameter_1090": {
            return $state.X_0_modifier_cannot_appear_on_a_parameter;
            break;
        }
        case "Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement_1091": {
            return $state.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement;
            break;
        }
        case "Type_parameters_cannot_appear_on_a_constructor_declaration_1092": {
            return $state.Type_parameters_cannot_appear_on_a_constructor_declaration;
            break;
        }
        case "Type_annotation_cannot_appear_on_a_constructor_declaration_1093": {
            return $state.Type_annotation_cannot_appear_on_a_constructor_declaration;
            break;
        }
        case "An_accessor_cannot_have_type_parameters_1094": {
            return $state.An_accessor_cannot_have_type_parameters;
            break;
        }
        case "A_set_accessor_cannot_have_a_return_type_annotation_1095": {
            return $state.A_set_accessor_cannot_have_a_return_type_annotation;
            break;
        }
        case "An_index_signature_must_have_exactly_one_parameter_1096": {
            return $state.An_index_signature_must_have_exactly_one_parameter;
            break;
        }
        case "_0_list_cannot_be_empty_1097": {
            return $state.X_0_list_cannot_be_empty;
            break;
        }
        case "Type_parameter_list_cannot_be_empty_1098": {
            return $state.Type_parameter_list_cannot_be_empty;
            break;
        }
        case "Type_argument_list_cannot_be_empty_1099": {
            return $state.Type_argument_list_cannot_be_empty;
            break;
        }
        case "Invalid_use_of_0_in_strict_mode_1100": {
            return $state.Invalid_use_of_0_in_strict_mode;
            break;
        }
        case "with_statements_are_not_allowed_in_strict_mode_1101": {
            return $state.X_with_statements_are_not_allowed_in_strict_mode;
            break;
        }
        case "delete_cannot_be_called_on_an_identifier_in_strict_mode_1102": {
            return $state.X_delete_cannot_be_called_on_an_identifier_in_strict_mode;
            break;
        }
        case "for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules_1103": {
            return $state.X_for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules;
            break;
        }
        case "A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement_1104": {
            return $state.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
            break;
        }
        case "A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement_1105": {
            return $state.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement;
            break;
        }
        case "The_left_hand_side_of_a_for_of_statement_may_not_be_async_1106": {
            return $state.The_left_hand_side_of_a_for_of_statement_may_not_be_async;
            break;
        }
        case "Jump_target_cannot_cross_function_boundary_1107": {
            return $state.Jump_target_cannot_cross_function_boundary;
            break;
        }
        case "A_return_statement_can_only_be_used_within_a_function_body_1108": {
            return $state.A_return_statement_can_only_be_used_within_a_function_body;
            break;
        }
        case "Expression_expected_1109": {
            return $state.Expression_expected;
            break;
        }
        case "Type_expected_1110": {
            return $state.Type_expected;
            break;
        }
        case "Private_field_0_must_be_declared_in_an_enclosing_class_1111": {
            return $state.Private_field_0_must_be_declared_in_an_enclosing_class;
            break;
        }
        case "A_default_clause_cannot_appear_more_than_once_in_a_switch_statement_1113": {
            return $state.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement;
            break;
        }
        case "Duplicate_label_0_1114": {
            return $state.Duplicate_label_0;
            break;
        }
        case "A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement_1115": {
            return $state.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;
            break;
        }
        case "A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement_1116": {
            return $state.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement;
            break;
        }
        case "An_object_literal_cannot_have_multiple_properties_with_the_same_name_1117": {
            return $state.An_object_literal_cannot_have_multiple_properties_with_the_same_name;
            break;
        }
        case "An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name_1118": {
            return $state.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name;
            break;
        }
        case "An_object_literal_cannot_have_property_and_accessor_with_the_same_name_1119": {
            return $state.An_object_literal_cannot_have_property_and_accessor_with_the_same_name;
            break;
        }
        case "An_export_assignment_cannot_have_modifiers_1120": {
            return $state.An_export_assignment_cannot_have_modifiers;
            break;
        }
        case "Octal_literals_are_not_allowed_Use_the_syntax_0_1121": {
            return $state.Octal_literals_are_not_allowed_Use_the_syntax_0;
            break;
        }
        case "Variable_declaration_list_cannot_be_empty_1123": {
            return $state.Variable_declaration_list_cannot_be_empty;
            break;
        }
        case "Digit_expected_1124": {
            return $state.Digit_expected;
            break;
        }
        case "Hexadecimal_digit_expected_1125": {
            return $state.Hexadecimal_digit_expected;
            break;
        }
        case "Unexpected_end_of_text_1126": {
            return $state.Unexpected_end_of_text;
            break;
        }
        case "Invalid_character_1127": {
            return $state.Invalid_character;
            break;
        }
        case "Declaration_or_statement_expected_1128": {
            return $state.Declaration_or_statement_expected;
            break;
        }
        case "Statement_expected_1129": {
            return $state.Statement_expected;
            break;
        }
        case "case_or_default_expected_1130": {
            return $state.X_case_or_default_expected;
            break;
        }
        case "Property_or_signature_expected_1131": {
            return $state.Property_or_signature_expected;
            break;
        }
        case "Enum_member_expected_1132": {
            return $state.Enum_member_expected;
            break;
        }
        case "Variable_declaration_expected_1134": {
            return $state.Variable_declaration_expected;
            break;
        }
        case "Argument_expression_expected_1135": {
            return $state.Argument_expression_expected;
            break;
        }
        case "Property_assignment_expected_1136": {
            return $state.Property_assignment_expected;
            break;
        }
        case "Expression_or_comma_expected_1137": {
            return $state.Expression_or_comma_expected;
            break;
        }
        case "Parameter_declaration_expected_1138": {
            return $state.Parameter_declaration_expected;
            break;
        }
        case "Type_parameter_declaration_expected_1139": {
            return $state.Type_parameter_declaration_expected;
            break;
        }
        case "Type_argument_expected_1140": {
            return $state.Type_argument_expected;
            break;
        }
        case "String_literal_expected_1141": {
            return $state.String_literal_expected;
            break;
        }
        case "Line_break_not_permitted_here_1142": {
            return $state.Line_break_not_permitted_here;
            break;
        }
        case "or_expected_1144": {
            return $state.X_or_expected;
            break;
        }
        case "or_JSX_element_expected_1145": {
            return $state.X_or_JSX_element_expected;
            break;
        }
        case "Declaration_expected_1146": {
            return $state.Declaration_expected;
            break;
        }
        case "Import_declarations_in_a_namespace_cannot_reference_a_module_1147": {
            return $state.Import_declarations_in_a_namespace_cannot_reference_a_module;
            break;
        }
        case "Cannot_use_imports_exports_or_module_augmentations_when_module_is_none_1148": {
            return $state.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none;
            break;
        }
        case "File_name_0_differs_from_already_included_file_name_1_only_in_casing_1149": {
            return $state.File_name_0_differs_from_already_included_file_name_1_only_in_casing;
            break;
        }
        case "_0_declarations_must_be_initialized_1155": {
            return $state.X_0_declarations_must_be_initialized;
            break;
        }
        case "_0_declarations_can_only_be_declared_inside_a_block_1156": {
            return $state.X_0_declarations_can_only_be_declared_inside_a_block;
            break;
        }
        case "Unterminated_template_literal_1160": {
            return $state.Unterminated_template_literal;
            break;
        }
        case "Unterminated_regular_expression_literal_1161": {
            return $state.Unterminated_regular_expression_literal;
            break;
        }
        case "An_object_member_cannot_be_declared_optional_1162": {
            return $state.An_object_member_cannot_be_declared_optional;
            break;
        }
        case "A_yield_expression_is_only_allowed_in_a_generator_body_1163": {
            return $state.A_yield_expression_is_only_allowed_in_a_generator_body;
            break;
        }
        case "Computed_property_names_are_not_allowed_in_enums_1164": {
            return $state.Computed_property_names_are_not_allowed_in_enums;
            break;
        }
        case "A_computed_property_name_in_an_ambient_context_must_refer_to_an_expression_whose_type_is_a_literal_t_1165": {
            return $state.A_computed_property_name_in_an_ambient_context_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type;
            break;
        }
        case "A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_1166": {
            return $state.A_computed_property_name_in_a_class_property_declaration_must_have_a_simple_literal_type_or_a_unique_symbol_type;
            break;
        }
        case "A_computed_property_name_in_a_method_overload_must_refer_to_an_expression_whose_type_is_a_literal_ty_1168": {
            return $state.A_computed_property_name_in_a_method_overload_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type;
            break;
        }
        case "A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_1169": {
            return $state.A_computed_property_name_in_an_interface_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type;
            break;
        }
        case "A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type__1170": {
            return $state.A_computed_property_name_in_a_type_literal_must_refer_to_an_expression_whose_type_is_a_literal_type_or_a_unique_symbol_type;
            break;
        }
        case "A_comma_expression_is_not_allowed_in_a_computed_property_name_1171": {
            return $state.A_comma_expression_is_not_allowed_in_a_computed_property_name;
            break;
        }
        case "extends_clause_already_seen_1172": {
            return $state.X_extends_clause_already_seen;
            break;
        }
        case "extends_clause_must_precede_implements_clause_1173": {
            return $state.X_extends_clause_must_precede_implements_clause;
            break;
        }
        case "Classes_can_only_extend_a_single_class_1174": {
            return $state.Classes_can_only_extend_a_single_class;
            break;
        }
        case "implements_clause_already_seen_1175": {
            return $state.X_implements_clause_already_seen;
            break;
        }
        case "Interface_declaration_cannot_have_implements_clause_1176": {
            return $state.Interface_declaration_cannot_have_implements_clause;
            break;
        }
        case "Binary_digit_expected_1177": {
            return $state.Binary_digit_expected;
            break;
        }
        case "Octal_digit_expected_1178": {
            return $state.Octal_digit_expected;
            break;
        }
        case "Unexpected_token_expected_1179": {
            return $state.Unexpected_token_expected;
            break;
        }
        case "Property_destructuring_pattern_expected_1180": {
            return $state.Property_destructuring_pattern_expected;
            break;
        }
        case "Array_element_destructuring_pattern_expected_1181": {
            return $state.Array_element_destructuring_pattern_expected;
            break;
        }
        case "A_destructuring_declaration_must_have_an_initializer_1182": {
            return $state.A_destructuring_declaration_must_have_an_initializer;
            break;
        }
        case "An_implementation_cannot_be_declared_in_ambient_contexts_1183": {
            return $state.An_implementation_cannot_be_declared_in_ambient_contexts;
            break;
        }
        case "Modifiers_cannot_appear_here_1184": {
            return $state.Modifiers_cannot_appear_here;
            break;
        }
        case "Merge_conflict_marker_encountered_1185": {
            return $state.Merge_conflict_marker_encountered;
            break;
        }
        case "A_rest_element_cannot_have_an_initializer_1186": {
            return $state.A_rest_element_cannot_have_an_initializer;
            break;
        }
        case "A_parameter_property_may_not_be_declared_using_a_binding_pattern_1187": {
            return $state.A_parameter_property_may_not_be_declared_using_a_binding_pattern;
            break;
        }
        case "Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement_1188": {
            return $state.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement;
            break;
        }
        case "The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer_1189": {
            return $state.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer;
            break;
        }
        case "The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer_1190": {
            return $state.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer;
            break;
        }
        case "An_import_declaration_cannot_have_modifiers_1191": {
            return $state.An_import_declaration_cannot_have_modifiers;
            break;
        }
        case "Module_0_has_no_default_export_1192": {
            return $state.Module_0_has_no_default_export;
            break;
        }
        case "An_export_declaration_cannot_have_modifiers_1193": {
            return $state.An_export_declaration_cannot_have_modifiers;
            break;
        }
        case "Export_declarations_are_not_permitted_in_a_namespace_1194": {
            return $state.Export_declarations_are_not_permitted_in_a_namespace;
            break;
        }
        case "export_Asterisk_does_not_re_export_a_default_1195": {
            return $state.X_export_Asterisk_does_not_re_export_a_default;
            break;
        }
        case "Catch_clause_variable_type_annotation_must_be_any_or_unknown_if_specified_1196": {
            return $state.Catch_clause_variable_type_annotation_must_be_any_or_unknown_if_specified;
            break;
        }
        case "Catch_clause_variable_cannot_have_an_initializer_1197": {
            return $state.Catch_clause_variable_cannot_have_an_initializer;
            break;
        }
        case "An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive_1198": {
            return $state.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive;
            break;
        }
        case "Unterminated_Unicode_escape_sequence_1199": {
            return $state.Unterminated_Unicode_escape_sequence;
            break;
        }
        case "Line_terminator_not_permitted_before_arrow_1200": {
            return $state.Line_terminator_not_permitted_before_arrow;
            break;
        }
        case "Import_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_import_Asterisk_as_1202": {
            return $state.Import_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead;
            break;
        }
        case "Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or__1203": {
            return $state.Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or_another_module_format_instead;
            break;
        }
        case "Re_exporting_a_type_when_0_is_enabled_requires_using_export_type_1205": {
            return $state.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type;
            break;
        }
        case "Decorators_are_not_valid_here_1206": {
            return $state.Decorators_are_not_valid_here;
            break;
        }
        case "Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name_1207": {
            return $state.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name;
            break;
        }
        case "Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0_1209": {
            return $state.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0;
            break;
        }
        case "Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of__1210": {
            return $state.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode;
            break;
        }
        case "A_class_declaration_without_the_default_modifier_must_have_a_name_1211": {
            return $state.A_class_declaration_without_the_default_modifier_must_have_a_name;
            break;
        }
        case "Identifier_expected_0_is_a_reserved_word_in_strict_mode_1212": {
            return $state.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
            break;
        }
        case "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_stric_1213": {
            return $state.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
            break;
        }
        case "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode_1214": {
            return $state.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
            break;
        }
        case "Invalid_use_of_0_Modules_are_automatically_in_strict_mode_1215": {
            return $state.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
            break;
        }
        case "Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules_1216": {
            return $state.Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules;
            break;
        }
        case "Export_assignment_is_not_supported_when_module_flag_is_system_1218": {
            return $state.Export_assignment_is_not_supported_when_module_flag_is_system;
            break;
        }
        case "Generators_are_not_allowed_in_an_ambient_context_1221": {
            return $state.Generators_are_not_allowed_in_an_ambient_context;
            break;
        }
        case "An_overload_signature_cannot_be_declared_as_a_generator_1222": {
            return $state.An_overload_signature_cannot_be_declared_as_a_generator;
            break;
        }
        case "_0_tag_already_specified_1223": {
            return $state.X_0_tag_already_specified;
            break;
        }
        case "Signature_0_must_be_a_type_predicate_1224": {
            return $state.Signature_0_must_be_a_type_predicate;
            break;
        }
        case "Cannot_find_parameter_0_1225": {
            return $state.Cannot_find_parameter_0;
            break;
        }
        case "Type_predicate_0_is_not_assignable_to_1_1226": {
            return $state.Type_predicate_0_is_not_assignable_to_1;
            break;
        }
        case "Parameter_0_is_not_in_the_same_position_as_parameter_1_1227": {
            return $state.Parameter_0_is_not_in_the_same_position_as_parameter_1;
            break;
        }
        case "A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods_1228": {
            return $state.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods;
            break;
        }
        case "A_type_predicate_cannot_reference_a_rest_parameter_1229": {
            return $state.A_type_predicate_cannot_reference_a_rest_parameter;
            break;
        }
        case "A_type_predicate_cannot_reference_element_0_in_a_binding_pattern_1230": {
            return $state.A_type_predicate_cannot_reference_element_0_in_a_binding_pattern;
            break;
        }
        case "An_export_assignment_must_be_at_the_top_level_of_a_file_or_module_declaration_1231": {
            return $state.An_export_assignment_must_be_at_the_top_level_of_a_file_or_module_declaration;
            break;
        }
        case "An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module_1232": {
            return $state.An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module;
            break;
        }
        case "An_export_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module_1233": {
            return $state.An_export_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module;
            break;
        }
        case "An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file_1234": {
            return $state.An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file;
            break;
        }
        case "A_namespace_declaration_is_only_allowed_at_the_top_level_of_a_namespace_or_module_1235": {
            return $state.A_namespace_declaration_is_only_allowed_at_the_top_level_of_a_namespace_or_module;
            break;
        }
        case "The_return_type_of_a_property_decorator_function_must_be_either_void_or_any_1236": {
            return $state.The_return_type_of_a_property_decorator_function_must_be_either_void_or_any;
            break;
        }
        case "The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any_1237": {
            return $state.The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any;
            break;
        }
        case "Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression_1238": {
            return $state.Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression;
            break;
        }
        case "Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression_1239": {
            return $state.Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression;
            break;
        }
        case "Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression_1240": {
            return $state.Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression;
            break;
        }
        case "Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression_1241": {
            return $state.Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression;
            break;
        }
        case "abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration_1242": {
            return $state.X_abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration;
            break;
        }
        case "_0_modifier_cannot_be_used_with_1_modifier_1243": {
            return $state.X_0_modifier_cannot_be_used_with_1_modifier;
            break;
        }
        case "Abstract_methods_can_only_appear_within_an_abstract_class_1244": {
            return $state.Abstract_methods_can_only_appear_within_an_abstract_class;
            break;
        }
        case "Method_0_cannot_have_an_implementation_because_it_is_marked_abstract_1245": {
            return $state.Method_0_cannot_have_an_implementation_because_it_is_marked_abstract;
            break;
        }
        case "An_interface_property_cannot_have_an_initializer_1246": {
            return $state.An_interface_property_cannot_have_an_initializer;
            break;
        }
        case "A_type_literal_property_cannot_have_an_initializer_1247": {
            return $state.A_type_literal_property_cannot_have_an_initializer;
            break;
        }
        case "A_class_member_cannot_have_the_0_keyword_1248": {
            return $state.A_class_member_cannot_have_the_0_keyword;
            break;
        }
        case "A_decorator_can_only_decorate_a_method_implementation_not_an_overload_1249": {
            return $state.A_decorator_can_only_decorate_a_method_implementation_not_an_overload;
            break;
        }
        case "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_1250": {
            return $state.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5;
            break;
        }
        case "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Class_definiti_1251": {
            return $state.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Class_definitions_are_automatically_in_strict_mode;
            break;
        }
        case "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Modules_are_au_1252": {
            return $state.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Modules_are_automatically_in_strict_mode;
            break;
        }
        case "Abstract_properties_can_only_appear_within_an_abstract_class_1253": {
            return $state.Abstract_properties_can_only_appear_within_an_abstract_class;
            break;
        }
        case "A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_or_literal_enum_refere_1254": {
            return $state.A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_or_literal_enum_reference;
            break;
        }
        case "A_definite_assignment_assertion_is_not_permitted_in_this_context_1255": {
            return $state.A_definite_assignment_assertion_is_not_permitted_in_this_context;
            break;
        }
        case "A_required_element_cannot_follow_an_optional_element_1257": {
            return $state.A_required_element_cannot_follow_an_optional_element;
            break;
        }
        case "A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration_1258": {
            return $state.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration;
            break;
        }
        case "Module_0_can_only_be_default_imported_using_the_1_flag_1259": {
            return $state.Module_0_can_only_be_default_imported_using_the_1_flag;
            break;
        }
        case "Keywords_cannot_contain_escape_characters_1260": {
            return $state.Keywords_cannot_contain_escape_characters;
            break;
        }
        case "Already_included_file_name_0_differs_from_file_name_1_only_in_casing_1261": {
            return $state.Already_included_file_name_0_differs_from_file_name_1_only_in_casing;
            break;
        }
        case "Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module_1262": {
            return $state.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module;
            break;
        }
        case "Declarations_with_initializers_cannot_also_have_definite_assignment_assertions_1263": {
            return $state.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions;
            break;
        }
        case "Declarations_with_definite_assignment_assertions_must_also_have_type_annotations_1264": {
            return $state.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations;
            break;
        }
        case "A_rest_element_cannot_follow_another_rest_element_1265": {
            return $state.A_rest_element_cannot_follow_another_rest_element;
            break;
        }
        case "An_optional_element_cannot_follow_a_rest_element_1266": {
            return $state.An_optional_element_cannot_follow_a_rest_element;
            break;
        }
        case "Property_0_cannot_have_an_initializer_because_it_is_marked_abstract_1267": {
            return $state.Property_0_cannot_have_an_initializer_because_it_is_marked_abstract;
            break;
        }
        case "An_index_signature_parameter_type_must_be_string_number_symbol_or_a_template_literal_type_1268": {
            return $state.An_index_signature_parameter_type_must_be_string_number_symbol_or_a_template_literal_type;
            break;
        }
        case "Cannot_use_export_import_on_a_type_or_type_only_namespace_when_0_is_enabled_1269": {
            return $state.Cannot_use_export_import_on_a_type_or_type_only_namespace_when_0_is_enabled;
            break;
        }
        case "Decorator_function_return_type_0_is_not_assignable_to_type_1_1270": {
            return $state.Decorator_function_return_type_0_is_not_assignable_to_type_1;
            break;
        }
        case "Decorator_function_return_type_is_0_but_is_expected_to_be_void_or_any_1271": {
            return $state.Decorator_function_return_type_is_0_but_is_expected_to_be_void_or_any;
            break;
        }
        case "A_type_referenced_in_a_decorated_signature_must_be_imported_with_import_type_or_a_namespace_import_w_1272": {
            return $state.A_type_referenced_in_a_decorated_signature_must_be_imported_with_import_type_or_a_namespace_import_when_isolatedModules_and_emitDecoratorMetadata_are_enabled;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_type_parameter_1273": {
            return $state.X_0_modifier_cannot_appear_on_a_type_parameter;
            break;
        }
        case "_0_modifier_can_only_appear_on_a_type_parameter_of_a_class_interface_or_type_alias_1274": {
            return $state.X_0_modifier_can_only_appear_on_a_type_parameter_of_a_class_interface_or_type_alias;
            break;
        }
        case "accessor_modifier_can_only_appear_on_a_property_declaration_1275": {
            return $state.X_accessor_modifier_can_only_appear_on_a_property_declaration;
            break;
        }
        case "An_accessor_property_cannot_be_declared_optional_1276": {
            return $state.An_accessor_property_cannot_be_declared_optional;
            break;
        }
        case "_0_modifier_can_only_appear_on_a_type_parameter_of_a_function_method_or_class_1277": {
            return $state.X_0_modifier_can_only_appear_on_a_type_parameter_of_a_function_method_or_class;
            break;
        }
        case "The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_0_1278": {
            return $state.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_0;
            break;
        }
        case "The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_at_least_0_1279": {
            return $state.The_runtime_will_invoke_the_decorator_with_1_arguments_but_the_decorator_expects_at_least_0;
            break;
        }
        case "Namespaces_are_not_allowed_in_global_script_files_when_0_is_enabled_If_this_file_is_not_intended_to__1280": {
            return $state.Namespaces_are_not_allowed_in_global_script_files_when_0_is_enabled_If_this_file_is_not_intended_to_be_a_global_script_set_moduleDetection_to_force_or_add_an_empty_export_statement;
            break;
        }
        case "Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead_1281": {
            return $state.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead;
            break;
        }
        case "An_export_declaration_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers__1282": {
            return $state.An_export_declaration_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type;
            break;
        }
        case "An_export_declaration_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolve_1283": {
            return $state.An_export_declaration_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration;
            break;
        }
        case "An_export_default_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_1284": {
            return $state.An_export_default_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type;
            break;
        }
        case "An_export_default_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_1285": {
            return $state.An_export_default_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration;
            break;
        }
        case "ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_1286": {
            return $state.ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax;
            break;
        }
        case "A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimM_1287": {
            return $state.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled;
            break;
        }
        case "An_import_alias_cannot_resolve_to_a_type_or_type_only_declaration_when_verbatimModuleSyntax_is_enabl_1288": {
            return $state.An_import_alias_cannot_resolve_to_a_type_or_type_only_declaration_when_verbatimModuleSyntax_is_enabled;
            break;
        }
        case "_0_resolves_to_a_type_only_declaration_and_must_be_marked_type_only_in_this_file_before_re_exporting_1289": {
            return $state.X_0_resolves_to_a_type_only_declaration_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enabled_Consider_using_import_type_where_0_is_imported;
            break;
        }
        case "_0_resolves_to_a_type_only_declaration_and_must_be_marked_type_only_in_this_file_before_re_exporting_1290": {
            return $state.X_0_resolves_to_a_type_only_declaration_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enabled_Consider_using_export_type_0_as_default;
            break;
        }
        case "_0_resolves_to_a_type_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enable_1291": {
            return $state.X_0_resolves_to_a_type_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enabled_Consider_using_import_type_where_0_is_imported;
            break;
        }
        case "_0_resolves_to_a_type_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enable_1292": {
            return $state.X_0_resolves_to_a_type_and_must_be_marked_type_only_in_this_file_before_re_exporting_when_1_is_enabled_Consider_using_export_type_0_as_default;
            break;
        }
        case "ECMAScript_module_syntax_is_not_allowed_in_a_CommonJS_module_when_module_is_set_to_preserve_1293": {
            return $state.ECMAScript_module_syntax_is_not_allowed_in_a_CommonJS_module_when_module_is_set_to_preserve;
            break;
        }
        case "This_syntax_is_not_allowed_when_erasableSyntaxOnly_is_enabled_1294": {
            return $state.This_syntax_is_not_allowed_when_erasableSyntaxOnly_is_enabled;
            break;
        }
        case "ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_Adjus_1295": {
            return $state.ECMAScript_imports_and_exports_cannot_be_written_in_a_CommonJS_file_under_verbatimModuleSyntax_Adjust_the_type_field_in_the_nearest_package_json_to_make_this_file_an_ECMAScript_module_or_adjust_your_verbatimModuleSyntax_module_and_moduleResolution_settings_in_TypeScript;
            break;
        }
        case "with_statements_are_not_allowed_in_an_async_function_block_1300": {
            return $state.X_with_statements_are_not_allowed_in_an_async_function_block;
            break;
        }
        case "await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules_1308": {
            return $state.X_await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules;
            break;
        }
        case "The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level_1309": {
            return $state.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level;
            break;
        }
        case "Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_1312": {
            return $state.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern;
            break;
        }
        case "The_body_of_an_if_statement_cannot_be_the_empty_statement_1313": {
            return $state.The_body_of_an_if_statement_cannot_be_the_empty_statement;
            break;
        }
        case "Global_module_exports_may_only_appear_in_module_files_1314": {
            return $state.Global_module_exports_may_only_appear_in_module_files;
            break;
        }
        case "Global_module_exports_may_only_appear_in_declaration_files_1315": {
            return $state.Global_module_exports_may_only_appear_in_declaration_files;
            break;
        }
        case "Global_module_exports_may_only_appear_at_top_level_1316": {
            return $state.Global_module_exports_may_only_appear_at_top_level;
            break;
        }
        case "A_parameter_property_cannot_be_declared_using_a_rest_parameter_1317": {
            return $state.A_parameter_property_cannot_be_declared_using_a_rest_parameter;
            break;
        }
        case "An_abstract_accessor_cannot_have_an_implementation_1318": {
            return $state.An_abstract_accessor_cannot_have_an_implementation;
            break;
        }
        case "A_default_export_can_only_be_used_in_an_ECMAScript_style_module_1319": {
            return $state.A_default_export_can_only_be_used_in_an_ECMAScript_style_module;
            break;
        }
        case "Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member_1320": {
            return $state.Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member;
            break;
        }
        case "Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_cal_1321": {
            return $state.Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member;
            break;
        }
        case "Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_con_1322": {
            return $state.Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member;
            break;
        }
        case "Dynamic_imports_are_only_supported_when_the_module_flag_is_set_to_es2020_es2022_esnext_commonjs_amd__1323": {
            return $state.Dynamic_imports_are_only_supported_when_the_module_flag_is_set_to_es2020_es2022_esnext_commonjs_amd_system_umd_node16_node18_node20_or_nodenext;
            break;
        }
        case "Dynamic_imports_only_support_a_second_argument_when_the_module_option_is_set_to_esnext_node16_node18_1324": {
            return $state.Dynamic_imports_only_support_a_second_argument_when_the_module_option_is_set_to_esnext_node16_node18_node20_nodenext_or_preserve;
            break;
        }
        case "Argument_of_dynamic_import_cannot_be_spread_element_1325": {
            return $state.Argument_of_dynamic_import_cannot_be_spread_element;
            break;
        }
        case "This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot__1326": {
            return $state.This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot_have_type_arguments;
            break;
        }
        case "String_literal_with_double_quotes_expected_1327": {
            return $state.String_literal_with_double_quotes_expected;
            break;
        }
        case "Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_li_1328": {
            return $state.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal;
            break;
        }
        case "_0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write__1329": {
            return $state.X_0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0;
            break;
        }
        case "A_property_of_an_interface_or_type_literal_whose_type_is_a_unique_symbol_type_must_be_readonly_1330": {
            return $state.A_property_of_an_interface_or_type_literal_whose_type_is_a_unique_symbol_type_must_be_readonly;
            break;
        }
        case "A_property_of_a_class_whose_type_is_a_unique_symbol_type_must_be_both_static_and_readonly_1331": {
            return $state.A_property_of_a_class_whose_type_is_a_unique_symbol_type_must_be_both_static_and_readonly;
            break;
        }
        case "A_variable_whose_type_is_a_unique_symbol_type_must_be_const_1332": {
            return $state.A_variable_whose_type_is_a_unique_symbol_type_must_be_const;
            break;
        }
        case "unique_symbol_types_may_not_be_used_on_a_variable_declaration_with_a_binding_name_1333": {
            return $state.X_unique_symbol_types_may_not_be_used_on_a_variable_declaration_with_a_binding_name;
            break;
        }
        case "unique_symbol_types_are_only_allowed_on_variables_in_a_variable_statement_1334": {
            return $state.X_unique_symbol_types_are_only_allowed_on_variables_in_a_variable_statement;
            break;
        }
        case "unique_symbol_types_are_not_allowed_here_1335": {
            return $state.X_unique_symbol_types_are_not_allowed_here;
            break;
        }
        case "An_index_signature_parameter_type_cannot_be_a_literal_type_or_generic_type_Consider_using_a_mapped_o_1337": {
            return $state.An_index_signature_parameter_type_cannot_be_a_literal_type_or_generic_type_Consider_using_a_mapped_object_type_instead;
            break;
        }
        case "infer_declarations_are_only_permitted_in_the_extends_clause_of_a_conditional_type_1338": {
            return $state.X_infer_declarations_are_only_permitted_in_the_extends_clause_of_a_conditional_type;
            break;
        }
        case "Module_0_does_not_refer_to_a_value_but_is_used_as_a_value_here_1339": {
            return $state.Module_0_does_not_refer_to_a_value_but_is_used_as_a_value_here;
            break;
        }
        case "Module_0_does_not_refer_to_a_type_but_is_used_as_a_type_here_Did_you_mean_typeof_import_0_1340": {
            return $state.Module_0_does_not_refer_to_a_type_but_is_used_as_a_type_here_Did_you_mean_typeof_import_0;
            break;
        }
        case "Class_constructor_may_not_be_an_accessor_1341": {
            return $state.Class_constructor_may_not_be_an_accessor;
            break;
        }
        case "The_import_meta_meta_property_is_only_allowed_when_the_module_option_is_es2020_es2022_esnext_system__1343": {
            return $state.The_import_meta_meta_property_is_only_allowed_when_the_module_option_is_es2020_es2022_esnext_system_node16_node18_node20_or_nodenext;
            break;
        }
        case "A_label_is_not_allowed_here_1344": {
            return $state.A_label_is_not_allowed_here;
            break;
        }
        case "An_expression_of_type_void_cannot_be_tested_for_truthiness_1345": {
            return $state.An_expression_of_type_void_cannot_be_tested_for_truthiness;
            break;
        }
        case "This_parameter_is_not_allowed_with_use_strict_directive_1346": {
            return $state.This_parameter_is_not_allowed_with_use_strict_directive;
            break;
        }
        case "use_strict_directive_cannot_be_used_with_non_simple_parameter_list_1347": {
            return $state.X_use_strict_directive_cannot_be_used_with_non_simple_parameter_list;
            break;
        }
        case "Non_simple_parameter_declared_here_1348": {
            return $state.Non_simple_parameter_declared_here;
            break;
        }
        case "use_strict_directive_used_here_1349": {
            return $state.X_use_strict_directive_used_here;
            break;
        }
        case "Print_the_final_configuration_instead_of_building_1350": {
            return $state.Print_the_final_configuration_instead_of_building;
            break;
        }
        case "An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal_1351": {
            return $state.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal;
            break;
        }
        case "A_bigint_literal_cannot_use_exponential_notation_1352": {
            return $state.A_bigint_literal_cannot_use_exponential_notation;
            break;
        }
        case "A_bigint_literal_must_be_an_integer_1353": {
            return $state.A_bigint_literal_must_be_an_integer;
            break;
        }
        case "readonly_type_modifier_is_only_permitted_on_array_and_tuple_literal_types_1354": {
            return $state.X_readonly_type_modifier_is_only_permitted_on_array_and_tuple_literal_types;
            break;
        }
        case "A_const_assertion_can_only_be_applied_to_references_to_enum_members_or_string_number_boolean_array_o_1355": {
            return $state.A_const_assertion_can_only_be_applied_to_references_to_enum_members_or_string_number_boolean_array_or_object_literals;
            break;
        }
        case "Did_you_mean_to_mark_this_function_as_async_1356": {
            return $state.Did_you_mean_to_mark_this_function_as_async;
            break;
        }
        case "An_enum_member_name_must_be_followed_by_a_or_1357": {
            return $state.An_enum_member_name_must_be_followed_by_a_or;
            break;
        }
        case "Tagged_template_expressions_are_not_permitted_in_an_optional_chain_1358": {
            return $state.Tagged_template_expressions_are_not_permitted_in_an_optional_chain;
            break;
        }
        case "Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here_1359": {
            return $state.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here;
            break;
        }
        case "Type_0_does_not_satisfy_the_expected_type_1_1360": {
            return $state.Type_0_does_not_satisfy_the_expected_type_1;
            break;
        }
        case "_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type_1361": {
            return $state.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type;
            break;
        }
        case "_0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type_1362": {
            return $state.X_0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type;
            break;
        }
        case "A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both_1363": {
            return $state.A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both;
            break;
        }
        case "Convert_to_type_only_export_1364": {
            return $state.Convert_to_type_only_export;
            break;
        }
        case "Convert_all_re_exported_types_to_type_only_exports_1365": {
            return $state.Convert_all_re_exported_types_to_type_only_exports;
            break;
        }
        case "Split_into_two_separate_import_declarations_1366": {
            return $state.Split_into_two_separate_import_declarations;
            break;
        }
        case "Split_all_invalid_type_only_imports_1367": {
            return $state.Split_all_invalid_type_only_imports;
            break;
        }
        case "Class_constructor_may_not_be_a_generator_1368": {
            return $state.Class_constructor_may_not_be_a_generator;
            break;
        }
        case "Did_you_mean_0_1369": {
            return $state.Did_you_mean_0;
            break;
        }
        case "await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_fi_1375": {
            return $state.X_await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module;
            break;
        }
        case "_0_was_imported_here_1376": {
            return $state.X_0_was_imported_here;
            break;
        }
        case "_0_was_exported_here_1377": {
            return $state.X_0_was_exported_here;
            break;
        }
        case "Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_n_1378": {
            return $state.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_node18_node20_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher;
            break;
        }
        case "An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type_1379": {
            return $state.An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type;
            break;
        }
        case "An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type_1380": {
            return $state.An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type;
            break;
        }
        case "Unexpected_token_Did_you_mean_or_rbrace_1381": {
            return $state.Unexpected_token_Did_you_mean_or_rbrace;
            break;
        }
        case "Unexpected_token_Did_you_mean_or_gt_1382": {
            return $state.Unexpected_token_Did_you_mean_or_gt;
            break;
        }
        case "Function_type_notation_must_be_parenthesized_when_used_in_a_union_type_1385": {
            return $state.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type;
            break;
        }
        case "Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type_1386": {
            return $state.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type;
            break;
        }
        case "Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type_1387": {
            return $state.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
            break;
        }
        case "Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type_1388": {
            return $state.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
            break;
        }
        case "_0_is_not_allowed_as_a_variable_declaration_name_1389": {
            return $state.X_0_is_not_allowed_as_a_variable_declaration_name;
            break;
        }
        case "_0_is_not_allowed_as_a_parameter_name_1390": {
            return $state.X_0_is_not_allowed_as_a_parameter_name;
            break;
        }
        case "An_import_alias_cannot_use_import_type_1392": {
            return $state.An_import_alias_cannot_use_import_type;
            break;
        }
        case "Imported_via_0_from_file_1_1393": {
            return $state.Imported_via_0_from_file_1;
            break;
        }
        case "Imported_via_0_from_file_1_with_packageId_2_1394": {
            return $state.Imported_via_0_from_file_1_with_packageId_2;
            break;
        }
        case "Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions_1395": {
            return $state.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions;
            break;
        }
        case "Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions_1396": {
            return $state.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions;
            break;
        }
        case "Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions_1397": {
            return $state.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions;
            break;
        }
        case "Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions_1398": {
            return $state.Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions;
            break;
        }
        case "File_is_included_via_import_here_1399": {
            return $state.File_is_included_via_import_here;
            break;
        }
        case "Referenced_via_0_from_file_1_1400": {
            return $state.Referenced_via_0_from_file_1;
            break;
        }
        case "File_is_included_via_reference_here_1401": {
            return $state.File_is_included_via_reference_here;
            break;
        }
        case "Type_library_referenced_via_0_from_file_1_1402": {
            return $state.Type_library_referenced_via_0_from_file_1;
            break;
        }
        case "Type_library_referenced_via_0_from_file_1_with_packageId_2_1403": {
            return $state.Type_library_referenced_via_0_from_file_1_with_packageId_2;
            break;
        }
        case "File_is_included_via_type_library_reference_here_1404": {
            return $state.File_is_included_via_type_library_reference_here;
            break;
        }
        case "Library_referenced_via_0_from_file_1_1405": {
            return $state.Library_referenced_via_0_from_file_1;
            break;
        }
        case "File_is_included_via_library_reference_here_1406": {
            return $state.File_is_included_via_library_reference_here;
            break;
        }
        case "Matched_by_include_pattern_0_in_1_1407": {
            return $state.Matched_by_include_pattern_0_in_1;
            break;
        }
        case "File_is_matched_by_include_pattern_specified_here_1408": {
            return $state.File_is_matched_by_include_pattern_specified_here;
            break;
        }
        case "Part_of_files_list_in_tsconfig_json_1409": {
            return $state.Part_of_files_list_in_tsconfig_json;
            break;
        }
        case "File_is_matched_by_files_list_specified_here_1410": {
            return $state.File_is_matched_by_files_list_specified_here;
            break;
        }
        case "Output_from_referenced_project_0_included_because_1_specified_1411": {
            return $state.Output_from_referenced_project_0_included_because_1_specified;
            break;
        }
        case "Output_from_referenced_project_0_included_because_module_is_specified_as_none_1412": {
            return $state.Output_from_referenced_project_0_included_because_module_is_specified_as_none;
            break;
        }
        case "File_is_output_from_referenced_project_specified_here_1413": {
            return $state.File_is_output_from_referenced_project_specified_here;
            break;
        }
        case "Source_from_referenced_project_0_included_because_1_specified_1414": {
            return $state.Source_from_referenced_project_0_included_because_1_specified;
            break;
        }
        case "Source_from_referenced_project_0_included_because_module_is_specified_as_none_1415": {
            return $state.Source_from_referenced_project_0_included_because_module_is_specified_as_none;
            break;
        }
        case "File_is_source_from_referenced_project_specified_here_1416": {
            return $state.File_is_source_from_referenced_project_specified_here;
            break;
        }
        case "Entry_point_of_type_library_0_specified_in_compilerOptions_1417": {
            return $state.Entry_point_of_type_library_0_specified_in_compilerOptions;
            break;
        }
        case "Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1_1418": {
            return $state.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1;
            break;
        }
        case "File_is_entry_point_of_type_library_specified_here_1419": {
            return $state.File_is_entry_point_of_type_library_specified_here;
            break;
        }
        case "Entry_point_for_implicit_type_library_0_1420": {
            return $state.Entry_point_for_implicit_type_library_0;
            break;
        }
        case "Entry_point_for_implicit_type_library_0_with_packageId_1_1421": {
            return $state.Entry_point_for_implicit_type_library_0_with_packageId_1;
            break;
        }
        case "Library_0_specified_in_compilerOptions_1422": {
            return $state.Library_0_specified_in_compilerOptions;
            break;
        }
        case "File_is_library_specified_here_1423": {
            return $state.File_is_library_specified_here;
            break;
        }
        case "Default_library_1424": {
            return $state.Default_library;
            break;
        }
        case "Default_library_for_target_0_1425": {
            return $state.Default_library_for_target_0;
            break;
        }
        case "File_is_default_library_for_target_specified_here_1426": {
            return $state.File_is_default_library_for_target_specified_here;
            break;
        }
        case "Root_file_specified_for_compilation_1427": {
            return $state.Root_file_specified_for_compilation;
            break;
        }
        case "File_is_output_of_project_reference_source_0_1428": {
            return $state.File_is_output_of_project_reference_source_0;
            break;
        }
        case "File_redirects_to_file_0_1429": {
            return $state.File_redirects_to_file_0;
            break;
        }
        case "The_file_is_in_the_program_because_Colon_1430": {
            return $state.The_file_is_in_the_program_because_Colon;
            break;
        }
        case "for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_1431": {
            return $state.X_for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module;
            break;
        }
        case "Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_nod_1432": {
            return $state.Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_node18_node20_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher;
            break;
        }
        case "Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters_1433": {
            return $state.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters;
            break;
        }
        case "Unexpected_keyword_or_identifier_1434": {
            return $state.Unexpected_keyword_or_identifier;
            break;
        }
        case "Unknown_keyword_or_identifier_Did_you_mean_0_1435": {
            return $state.Unknown_keyword_or_identifier_Did_you_mean_0;
            break;
        }
        case "Decorators_must_precede_the_name_and_all_keywords_of_property_declarations_1436": {
            return $state.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations;
            break;
        }
        case "Namespace_must_be_given_a_name_1437": {
            return $state.Namespace_must_be_given_a_name;
            break;
        }
        case "Interface_must_be_given_a_name_1438": {
            return $state.Interface_must_be_given_a_name;
            break;
        }
        case "Type_alias_must_be_given_a_name_1439": {
            return $state.Type_alias_must_be_given_a_name;
            break;
        }
        case "Variable_declaration_not_allowed_at_this_location_1440": {
            return $state.Variable_declaration_not_allowed_at_this_location;
            break;
        }
        case "Cannot_start_a_function_call_in_a_type_annotation_1441": {
            return $state.Cannot_start_a_function_call_in_a_type_annotation;
            break;
        }
        case "Expected_for_property_initializer_1442": {
            return $state.Expected_for_property_initializer;
            break;
        }
        case "Module_declaration_names_may_only_use_or_quoted_strings_1443": {
            return $state.Module_declaration_names_may_only_use_or_quoted_strings;
            break;
        }
        case "_0_resolves_to_a_type_only_declaration_and_must_be_re_exported_using_a_type_only_re_export_when_1_is_1448": {
            return $state.X_0_resolves_to_a_type_only_declaration_and_must_be_re_exported_using_a_type_only_re_export_when_1_is_enabled;
            break;
        }
        case "Preserve_unused_imported_values_in_the_JavaScript_output_that_would_otherwise_be_removed_1449": {
            return $state.Preserve_unused_imported_values_in_the_JavaScript_output_that_would_otherwise_be_removed;
            break;
        }
        case "Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments_1450": {
            return $state.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments;
            break;
        }
        case "Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member__1451": {
            return $state.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression;
            break;
        }
        case "resolution_mode_should_be_either_require_or_import_1453": {
            return $state.X_resolution_mode_should_be_either_require_or_import;
            break;
        }
        case "resolution_mode_can_only_be_set_for_type_only_imports_1454": {
            return $state.X_resolution_mode_can_only_be_set_for_type_only_imports;
            break;
        }
        case "resolution_mode_is_the_only_valid_key_for_type_import_assertions_1455": {
            return $state.X_resolution_mode_is_the_only_valid_key_for_type_import_assertions;
            break;
        }
        case "Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require_1456": {
            return $state.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require;
            break;
        }
        case "Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk_1457": {
            return $state.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk;
            break;
        }
        case "File_is_ECMAScript_module_because_0_has_field_type_with_value_module_1458": {
            return $state.File_is_ECMAScript_module_because_0_has_field_type_with_value_module;
            break;
        }
        case "File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module_1459": {
            return $state.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module;
            break;
        }
        case "File_is_CommonJS_module_because_0_does_not_have_field_type_1460": {
            return $state.File_is_CommonJS_module_because_0_does_not_have_field_type;
            break;
        }
        case "File_is_CommonJS_module_because_package_json_was_not_found_1461": {
            return $state.File_is_CommonJS_module_because_package_json_was_not_found;
            break;
        }
        case "resolution_mode_is_the_only_valid_key_for_type_import_attributes_1463": {
            return $state.X_resolution_mode_is_the_only_valid_key_for_type_import_attributes;
            break;
        }
        case "Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require_1464": {
            return $state.Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require;
            break;
        }
        case "The_import_meta_meta_property_is_not_allowed_in_files_which_will_build_into_CommonJS_output_1470": {
            return $state.The_import_meta_meta_property_is_not_allowed_in_files_which_will_build_into_CommonJS_output;
            break;
        }
        case "Module_0_cannot_be_imported_using_this_construct_The_specifier_only_resolves_to_an_ES_module_which_c_1471": {
            return $state.Module_0_cannot_be_imported_using_this_construct_The_specifier_only_resolves_to_an_ES_module_which_cannot_be_imported_with_require_Use_an_ECMAScript_import_instead;
            break;
        }
        case "catch_or_finally_expected_1472": {
            return $state.X_catch_or_finally_expected;
            break;
        }
        case "An_import_declaration_can_only_be_used_at_the_top_level_of_a_module_1473": {
            return $state.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module;
            break;
        }
        case "An_export_declaration_can_only_be_used_at_the_top_level_of_a_module_1474": {
            return $state.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module;
            break;
        }
        case "Control_what_method_is_used_to_detect_module_format_JS_files_1475": {
            return $state.Control_what_method_is_used_to_detect_module_format_JS_files;
            break;
        }
        case "auto_Colon_Treat_files_with_imports_exports_import_meta_jsx_with_jsx_Colon_react_jsx_or_esm_format_w_1476": {
            return $state.X_auto_Colon_Treat_files_with_imports_exports_import_meta_jsx_with_jsx_Colon_react_jsx_or_esm_format_with_module_Colon_node16_as_modules;
            break;
        }
        case "An_instantiation_expression_cannot_be_followed_by_a_property_access_1477": {
            return $state.An_instantiation_expression_cannot_be_followed_by_a_property_access;
            break;
        }
        case "Identifier_or_string_literal_expected_1478": {
            return $state.Identifier_or_string_literal_expected;
            break;
        }
        case "The_current_file_is_a_CommonJS_module_whose_imports_will_produce_require_calls_however_the_reference_1479": {
            return $state.The_current_file_is_a_CommonJS_module_whose_imports_will_produce_require_calls_however_the_referenced_file_is_an_ECMAScript_module_and_cannot_be_imported_with_require_Consider_writing_a_dynamic_import_0_call_instead;
            break;
        }
        case "To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_create_a_local_packag_1480": {
            return $state.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_create_a_local_package_json_file_with_type_Colon_module;
            break;
        }
        case "To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_add_the_field_type_Co_1481": {
            return $state.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_add_the_field_type_Colon_module_to_1;
            break;
        }
        case "To_convert_this_file_to_an_ECMAScript_module_add_the_field_type_Colon_module_to_0_1482": {
            return $state.To_convert_this_file_to_an_ECMAScript_module_add_the_field_type_Colon_module_to_0;
            break;
        }
        case "To_convert_this_file_to_an_ECMAScript_module_create_a_local_package_json_file_with_type_Colon_module_1483": {
            return $state.To_convert_this_file_to_an_ECMAScript_module_create_a_local_package_json_file_with_type_Colon_module;
            break;
        }
        case "_0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled_1484": {
            return $state.X_0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled;
            break;
        }
        case "_0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_verbatimMo_1485": {
            return $state.X_0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled;
            break;
        }
        case "Decorator_used_before_export_here_1486": {
            return $state.Decorator_used_before_export_here;
            break;
        }
        case "Octal_escape_sequences_are_not_allowed_Use_the_syntax_0_1487": {
            return $state.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0;
            break;
        }
        case "Escape_sequence_0_is_not_allowed_1488": {
            return $state.Escape_sequence_0_is_not_allowed;
            break;
        }
        case "Decimals_with_leading_zeros_are_not_allowed_1489": {
            return $state.Decimals_with_leading_zeros_are_not_allowed;
            break;
        }
        case "File_appears_to_be_binary_1490": {
            return $state.File_appears_to_be_binary;
            break;
        }
        case "_0_modifier_cannot_appear_on_a_using_declaration_1491": {
            return $state.X_0_modifier_cannot_appear_on_a_using_declaration;
            break;
        }
        case "_0_declarations_may_not_have_binding_patterns_1492": {
            return $state.X_0_declarations_may_not_have_binding_patterns;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_cannot_be_a_using_declaration_1493": {
            return $state.The_left_hand_side_of_a_for_in_statement_cannot_be_a_using_declaration;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_cannot_be_an_await_using_declaration_1494": {
            return $state.The_left_hand_side_of_a_for_in_statement_cannot_be_an_await_using_declaration;
            break;
        }
        case "_0_modifier_cannot_appear_on_an_await_using_declaration_1495": {
            return $state.X_0_modifier_cannot_appear_on_an_await_using_declaration;
            break;
        }
        case "Identifier_string_literal_or_number_literal_expected_1496": {
            return $state.Identifier_string_literal_or_number_literal_expected;
            break;
        }
        case "Expression_must_be_enclosed_in_parentheses_to_be_used_as_a_decorator_1497": {
            return $state.Expression_must_be_enclosed_in_parentheses_to_be_used_as_a_decorator;
            break;
        }
        case "Invalid_syntax_in_decorator_1498": {
            return $state.Invalid_syntax_in_decorator;
            break;
        }
        case "Unknown_regular_expression_flag_1499": {
            return $state.Unknown_regular_expression_flag;
            break;
        }
        case "Duplicate_regular_expression_flag_1500": {
            return $state.Duplicate_regular_expression_flag;
            break;
        }
        case "This_regular_expression_flag_is_only_available_when_targeting_0_or_later_1501": {
            return $state.This_regular_expression_flag_is_only_available_when_targeting_0_or_later;
            break;
        }
        case "The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously_1502": {
            return $state.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously;
            break;
        }
        case "Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later_1503": {
            return $state.Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later;
            break;
        }
        case "Subpattern_flags_must_be_present_when_there_is_a_minus_sign_1504": {
            return $state.Subpattern_flags_must_be_present_when_there_is_a_minus_sign;
            break;
        }
        case "Incomplete_quantifier_Digit_expected_1505": {
            return $state.Incomplete_quantifier_Digit_expected;
            break;
        }
        case "Numbers_out_of_order_in_quantifier_1506": {
            return $state.Numbers_out_of_order_in_quantifier;
            break;
        }
        case "There_is_nothing_available_for_repetition_1507": {
            return $state.There_is_nothing_available_for_repetition;
            break;
        }
        case "Unexpected_0_Did_you_mean_to_escape_it_with_backslash_1508": {
            return $state.Unexpected_0_Did_you_mean_to_escape_it_with_backslash;
            break;
        }
        case "This_regular_expression_flag_cannot_be_toggled_within_a_subpattern_1509": {
            return $state.This_regular_expression_flag_cannot_be_toggled_within_a_subpattern;
            break;
        }
        case "k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets_1510": {
            return $state.X_k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets;
            break;
        }
        case "q_is_only_available_inside_character_class_1511": {
            return $state.X_q_is_only_available_inside_character_class;
            break;
        }
        case "c_must_be_followed_by_an_ASCII_letter_1512": {
            return $state.X_c_must_be_followed_by_an_ASCII_letter;
            break;
        }
        case "Undetermined_character_escape_1513": {
            return $state.Undetermined_character_escape;
            break;
        }
        case "Expected_a_capturing_group_name_1514": {
            return $state.Expected_a_capturing_group_name;
            break;
        }
        case "Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other_1515": {
            return $state.Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other;
            break;
        }
        case "A_character_class_range_must_not_be_bounded_by_another_character_class_1516": {
            return $state.A_character_class_range_must_not_be_bounded_by_another_character_class;
            break;
        }
        case "Range_out_of_order_in_character_class_1517": {
            return $state.Range_out_of_order_in_character_class;
            break;
        }
        case "Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_characte_1518": {
            return $state.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class;
            break;
        }
        case "Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead_1519": {
            return $state.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead;
            break;
        }
        case "Expected_a_class_set_operand_1520": {
            return $state.Expected_a_class_set_operand;
            break;
        }
        case "q_must_be_followed_by_string_alternatives_enclosed_in_braces_1521": {
            return $state.X_q_must_be_followed_by_string_alternatives_enclosed_in_braces;
            break;
        }
        case "A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backs_1522": {
            return $state.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash;
            break;
        }
        case "Expected_a_Unicode_property_name_1523": {
            return $state.Expected_a_Unicode_property_name;
            break;
        }
        case "Unknown_Unicode_property_name_1524": {
            return $state.Unknown_Unicode_property_name;
            break;
        }
        case "Expected_a_Unicode_property_value_1525": {
            return $state.Expected_a_Unicode_property_value;
            break;
        }
        case "Unknown_Unicode_property_value_1526": {
            return $state.Unknown_Unicode_property_value;
            break;
        }
        case "Expected_a_Unicode_property_name_or_value_1527": {
            return $state.Expected_a_Unicode_property_name_or_value;
            break;
        }
        case "Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_t_1528": {
            return $state.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set;
            break;
        }
        case "Unknown_Unicode_property_name_or_value_1529": {
            return $state.Unknown_Unicode_property_name_or_value;
            break;
        }
        case "Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v__1530": {
            return $state.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set;
            break;
        }
        case "_0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces_1531": {
            return $state.X_0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces;
            break;
        }
        case "There_is_no_capturing_group_named_0_in_this_regular_expression_1532": {
            return $state.There_is_no_capturing_group_named_0_in_this_regular_expression;
            break;
        }
        case "This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_r_1533": {
            return $state.This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_regular_expression;
            break;
        }
        case "This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regul_1534": {
            return $state.This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regular_expression;
            break;
        }
        case "This_character_cannot_be_escaped_in_a_regular_expression_1535": {
            return $state.This_character_cannot_be_escaped_in_a_regular_expression;
            break;
        }
        case "Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended__1536": {
            return $state.Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended_as_an_escape_sequence_use_the_syntax_0_instead;
            break;
        }
        case "Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_1537": {
            return $state.Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class;
            break;
        }
        case "Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_se_1538": {
            return $state.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set;
            break;
        }
        case "A_bigint_literal_cannot_be_used_as_a_property_name_1539": {
            return $state.A_bigint_literal_cannot_be_used_as_a_property_name;
            break;
        }
        case "A_namespace_declaration_should_not_be_declared_using_the_module_keyword_Please_use_the_namespace_key_1540": {
            return $state.A_namespace_declaration_should_not_be_declared_using_the_module_keyword_Please_use_the_namespace_keyword_instead;
            break;
        }
        case "Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribut_1541": {
            return $state.Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute;
            break;
        }
        case "Type_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute_1542": {
            return $state.Type_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute;
            break;
        }
        case "Importing_a_JSON_file_into_an_ECMAScript_module_requires_a_type_Colon_json_import_attribute_when_mod_1543": {
            return $state.Importing_a_JSON_file_into_an_ECMAScript_module_requires_a_type_Colon_json_import_attribute_when_module_is_set_to_0;
            break;
        }
        case "Named_imports_from_a_JSON_file_into_an_ECMAScript_module_are_not_allowed_when_module_is_set_to_0_1544": {
            return $state.Named_imports_from_a_JSON_file_into_an_ECMAScript_module_are_not_allowed_when_module_is_set_to_0;
            break;
        }
        case "using_declarations_are_not_allowed_in_ambient_contexts_1545": {
            return $state.X_using_declarations_are_not_allowed_in_ambient_contexts;
            break;
        }
        case "await_using_declarations_are_not_allowed_in_ambient_contexts_1546": {
            return $state.X_await_using_declarations_are_not_allowed_in_ambient_contexts;
            break;
        }
        case "using_declarations_are_not_allowed_in_case_or_default_clauses_unless_contained_within_a_block_1547": {
            return $state.X_using_declarations_are_not_allowed_in_case_or_default_clauses_unless_contained_within_a_block;
            break;
        }
        case "await_using_declarations_are_not_allowed_in_case_or_default_clauses_unless_contained_within_a_block_1548": {
            return $state.X_await_using_declarations_are_not_allowed_in_case_or_default_clauses_unless_contained_within_a_block;
            break;
        }
        case "Ignore_the_tsconfig_found_and_build_with_commandline_options_and_files_1549": {
            return $state.Ignore_the_tsconfig_found_and_build_with_commandline_options_and_files;
            break;
        }
        case "The_types_of_0_are_incompatible_between_these_types_2200": {
            return $state.The_types_of_0_are_incompatible_between_these_types;
            break;
        }
        case "The_types_returned_by_0_are_incompatible_between_these_types_2201": {
            return $state.The_types_returned_by_0_are_incompatible_between_these_types;
            break;
        }
        case "Call_signature_return_types_0_and_1_are_incompatible_2202": {
            return $state.Call_signature_return_types_0_and_1_are_incompatible;
            break;
        }
        case "Construct_signature_return_types_0_and_1_are_incompatible_2203": {
            return $state.Construct_signature_return_types_0_and_1_are_incompatible;
            break;
        }
        case "Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1_2204": {
            return $state.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1;
            break;
        }
        case "Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1_2205": {
            return $state.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1;
            break;
        }
        case "The_type_modifier_cannot_be_used_on_a_named_import_when_import_type_is_used_on_its_import_statement_2206": {
            return $state.The_type_modifier_cannot_be_used_on_a_named_import_when_import_type_is_used_on_its_import_statement;
            break;
        }
        case "The_type_modifier_cannot_be_used_on_a_named_export_when_export_type_is_used_on_its_export_statement_2207": {
            return $state.The_type_modifier_cannot_be_used_on_a_named_export_when_export_type_is_used_on_its_export_statement;
            break;
        }
        case "This_type_parameter_might_need_an_extends_0_constraint_2208": {
            return $state.This_type_parameter_might_need_an_extends_0_constraint;
            break;
        }
        case "The_project_root_is_ambiguous_but_is_required_to_resolve_export_map_entry_0_in_file_1_Supply_the_roo_2209": {
            return $state.The_project_root_is_ambiguous_but_is_required_to_resolve_export_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate;
            break;
        }
        case "The_project_root_is_ambiguous_but_is_required_to_resolve_import_map_entry_0_in_file_1_Supply_the_roo_2210": {
            return $state.The_project_root_is_ambiguous_but_is_required_to_resolve_import_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate;
            break;
        }
        case "Add_extends_constraint_2211": {
            return $state.Add_extends_constraint;
            break;
        }
        case "Add_extends_constraint_to_all_type_parameters_2212": {
            return $state.Add_extends_constraint_to_all_type_parameters;
            break;
        }
        case "Duplicate_identifier_0_2300": {
            return $state.Duplicate_identifier_0;
            break;
        }
        case "Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor_2301": {
            return $state.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor;
            break;
        }
        case "Static_members_cannot_reference_class_type_parameters_2302": {
            return $state.Static_members_cannot_reference_class_type_parameters;
            break;
        }
        case "Circular_definition_of_import_alias_0_2303": {
            return $state.Circular_definition_of_import_alias_0;
            break;
        }
        case "Cannot_find_name_0_2304": {
            return $state.Cannot_find_name_0;
            break;
        }
        case "Module_0_has_no_exported_member_1_2305": {
            return $state.Module_0_has_no_exported_member_1;
            break;
        }
        case "File_0_is_not_a_module_2306": {
            return $state.File_0_is_not_a_module;
            break;
        }
        case "Cannot_find_module_0_or_its_corresponding_type_declarations_2307": {
            return $state.Cannot_find_module_0_or_its_corresponding_type_declarations;
            break;
        }
        case "Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambig_2308": {
            return $state.Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity;
            break;
        }
        case "An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements_2309": {
            return $state.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements;
            break;
        }
        case "Type_0_recursively_references_itself_as_a_base_type_2310": {
            return $state.Type_0_recursively_references_itself_as_a_base_type;
            break;
        }
        case "Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function_2311": {
            return $state.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function;
            break;
        }
        case "An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_me_2312": {
            return $state.An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_members;
            break;
        }
        case "Type_parameter_0_has_a_circular_constraint_2313": {
            return $state.Type_parameter_0_has_a_circular_constraint;
            break;
        }
        case "Generic_type_0_requires_1_type_argument_s_2314": {
            return $state.Generic_type_0_requires_1_type_argument_s;
            break;
        }
        case "Type_0_is_not_generic_2315": {
            return $state.Type_0_is_not_generic;
            break;
        }
        case "Global_type_0_must_be_a_class_or_interface_type_2316": {
            return $state.Global_type_0_must_be_a_class_or_interface_type;
            break;
        }
        case "Global_type_0_must_have_1_type_parameter_s_2317": {
            return $state.Global_type_0_must_have_1_type_parameter_s;
            break;
        }
        case "Cannot_find_global_type_0_2318": {
            return $state.Cannot_find_global_type_0;
            break;
        }
        case "Named_property_0_of_types_1_and_2_are_not_identical_2319": {
            return $state.Named_property_0_of_types_1_and_2_are_not_identical;
            break;
        }
        case "Interface_0_cannot_simultaneously_extend_types_1_and_2_2320": {
            return $state.Interface_0_cannot_simultaneously_extend_types_1_and_2;
            break;
        }
        case "Excessive_stack_depth_comparing_types_0_and_1_2321": {
            return $state.Excessive_stack_depth_comparing_types_0_and_1;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_2322": {
            return $state.Type_0_is_not_assignable_to_type_1;
            break;
        }
        case "Cannot_redeclare_exported_variable_0_2323": {
            return $state.Cannot_redeclare_exported_variable_0;
            break;
        }
        case "Property_0_is_missing_in_type_1_2324": {
            return $state.Property_0_is_missing_in_type_1;
            break;
        }
        case "Property_0_is_private_in_type_1_but_not_in_type_2_2325": {
            return $state.Property_0_is_private_in_type_1_but_not_in_type_2;
            break;
        }
        case "Types_of_property_0_are_incompatible_2326": {
            return $state.Types_of_property_0_are_incompatible;
            break;
        }
        case "Property_0_is_optional_in_type_1_but_required_in_type_2_2327": {
            return $state.Property_0_is_optional_in_type_1_but_required_in_type_2;
            break;
        }
        case "Types_of_parameters_0_and_1_are_incompatible_2328": {
            return $state.Types_of_parameters_0_and_1_are_incompatible;
            break;
        }
        case "Index_signature_for_type_0_is_missing_in_type_1_2329": {
            return $state.Index_signature_for_type_0_is_missing_in_type_1;
            break;
        }
        case "_0_and_1_index_signatures_are_incompatible_2330": {
            return $state.X_0_and_1_index_signatures_are_incompatible;
            break;
        }
        case "this_cannot_be_referenced_in_a_module_or_namespace_body_2331": {
            return $state.X_this_cannot_be_referenced_in_a_module_or_namespace_body;
            break;
        }
        case "this_cannot_be_referenced_in_current_location_2332": {
            return $state.X_this_cannot_be_referenced_in_current_location;
            break;
        }
        case "this_cannot_be_referenced_in_a_static_property_initializer_2334": {
            return $state.X_this_cannot_be_referenced_in_a_static_property_initializer;
            break;
        }
        case "super_can_only_be_referenced_in_a_derived_class_2335": {
            return $state.X_super_can_only_be_referenced_in_a_derived_class;
            break;
        }
        case "super_cannot_be_referenced_in_constructor_arguments_2336": {
            return $state.X_super_cannot_be_referenced_in_constructor_arguments;
            break;
        }
        case "Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors_2337": {
            return $state.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors;
            break;
        }
        case "super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_der_2338": {
            return $state.X_super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class;
            break;
        }
        case "Property_0_does_not_exist_on_type_1_2339": {
            return $state.Property_0_does_not_exist_on_type_1;
            break;
        }
        case "Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword_2340": {
            return $state.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword;
            break;
        }
        case "Property_0_is_private_and_only_accessible_within_class_1_2341": {
            return $state.Property_0_is_private_and_only_accessible_within_class_1;
            break;
        }
        case "This_syntax_requires_an_imported_helper_named_1_which_does_not_exist_in_0_Consider_upgrading_your_ve_2343": {
            return $state.This_syntax_requires_an_imported_helper_named_1_which_does_not_exist_in_0_Consider_upgrading_your_version_of_0;
            break;
        }
        case "Type_0_does_not_satisfy_the_constraint_1_2344": {
            return $state.Type_0_does_not_satisfy_the_constraint_1;
            break;
        }
        case "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345": {
            return $state.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1;
            break;
        }
        case "Call_target_does_not_contain_any_signatures_2346": {
            return $state.Call_target_does_not_contain_any_signatures;
            break;
        }
        case "Untyped_function_calls_may_not_accept_type_arguments_2347": {
            return $state.Untyped_function_calls_may_not_accept_type_arguments;
            break;
        }
        case "Value_of_type_0_is_not_callable_Did_you_mean_to_include_new_2348": {
            return $state.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new;
            break;
        }
        case "This_expression_is_not_callable_2349": {
            return $state.This_expression_is_not_callable;
            break;
        }
        case "Only_a_void_function_can_be_called_with_the_new_keyword_2350": {
            return $state.Only_a_void_function_can_be_called_with_the_new_keyword;
            break;
        }
        case "This_expression_is_not_constructable_2351": {
            return $state.This_expression_is_not_constructable;
            break;
        }
        case "Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the__2352": {
            return $state.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first;
            break;
        }
        case "Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1_2353": {
            return $state.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1;
            break;
        }
        case "This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found_2354": {
            return $state.This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found;
            break;
        }
        case "A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value_2355": {
            return $state.A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value;
            break;
        }
        case "An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type_2356": {
            return $state.An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type;
            break;
        }
        case "The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access_2357": {
            return $state.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access;
            break;
        }
        case "The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_paramete_2358": {
            return $state.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter;
            break;
        }
        case "The_right_hand_side_of_an_instanceof_expression_must_be_either_of_type_any_a_class_function_or_other_2359": {
            return $state.The_right_hand_side_of_an_instanceof_expression_must_be_either_of_type_any_a_class_function_or_other_type_assignable_to_the_Function_interface_type_or_an_object_type_with_a_Symbol_hasInstance_method;
            break;
        }
        case "The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type_2362": {
            return $state.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type;
            break;
        }
        case "The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type_2363": {
            return $state.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type;
            break;
        }
        case "The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access_2364": {
            return $state.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access;
            break;
        }
        case "Operator_0_cannot_be_applied_to_types_1_and_2_2365": {
            return $state.Operator_0_cannot_be_applied_to_types_1_and_2;
            break;
        }
        case "Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined_2366": {
            return $state.Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined;
            break;
        }
        case "This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap_2367": {
            return $state.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap;
            break;
        }
        case "Type_parameter_name_cannot_be_0_2368": {
            return $state.Type_parameter_name_cannot_be_0;
            break;
        }
        case "A_parameter_property_is_only_allowed_in_a_constructor_implementation_2369": {
            return $state.A_parameter_property_is_only_allowed_in_a_constructor_implementation;
            break;
        }
        case "A_rest_parameter_must_be_of_an_array_type_2370": {
            return $state.A_rest_parameter_must_be_of_an_array_type;
            break;
        }
        case "A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation_2371": {
            return $state.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation;
            break;
        }
        case "Parameter_0_cannot_reference_itself_2372": {
            return $state.Parameter_0_cannot_reference_itself;
            break;
        }
        case "Parameter_0_cannot_reference_identifier_1_declared_after_it_2373": {
            return $state.Parameter_0_cannot_reference_identifier_1_declared_after_it;
            break;
        }
        case "Duplicate_index_signature_for_type_0_2374": {
            return $state.Duplicate_index_signature_for_type_0;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefi_2375": {
            return $state.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
            break;
        }
        case "A_super_call_must_be_the_first_statement_in_the_constructor_to_refer_to_super_or_this_when_a_derived_2376": {
            return $state.A_super_call_must_be_the_first_statement_in_the_constructor_to_refer_to_super_or_this_when_a_derived_class_contains_initialized_properties_parameter_properties_or_private_identifiers;
            break;
        }
        case "Constructors_for_derived_classes_must_contain_a_super_call_2377": {
            return $state.Constructors_for_derived_classes_must_contain_a_super_call;
            break;
        }
        case "A_get_accessor_must_return_a_value_2378": {
            return $state.A_get_accessor_must_return_a_value;
            break;
        }
        case "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_tr_2379": {
            return $state.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
            break;
        }
        case "Overload_signatures_must_all_be_exported_or_non_exported_2383": {
            return $state.Overload_signatures_must_all_be_exported_or_non_exported;
            break;
        }
        case "Overload_signatures_must_all_be_ambient_or_non_ambient_2384": {
            return $state.Overload_signatures_must_all_be_ambient_or_non_ambient;
            break;
        }
        case "Overload_signatures_must_all_be_public_private_or_protected_2385": {
            return $state.Overload_signatures_must_all_be_public_private_or_protected;
            break;
        }
        case "Overload_signatures_must_all_be_optional_or_required_2386": {
            return $state.Overload_signatures_must_all_be_optional_or_required;
            break;
        }
        case "Function_overload_must_be_static_2387": {
            return $state.Function_overload_must_be_static;
            break;
        }
        case "Function_overload_must_not_be_static_2388": {
            return $state.Function_overload_must_not_be_static;
            break;
        }
        case "Function_implementation_name_must_be_0_2389": {
            return $state.Function_implementation_name_must_be_0;
            break;
        }
        case "Constructor_implementation_is_missing_2390": {
            return $state.Constructor_implementation_is_missing;
            break;
        }
        case "Function_implementation_is_missing_or_not_immediately_following_the_declaration_2391": {
            return $state.Function_implementation_is_missing_or_not_immediately_following_the_declaration;
            break;
        }
        case "Multiple_constructor_implementations_are_not_allowed_2392": {
            return $state.Multiple_constructor_implementations_are_not_allowed;
            break;
        }
        case "Duplicate_function_implementation_2393": {
            return $state.Duplicate_function_implementation;
            break;
        }
        case "This_overload_signature_is_not_compatible_with_its_implementation_signature_2394": {
            return $state.This_overload_signature_is_not_compatible_with_its_implementation_signature;
            break;
        }
        case "Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local_2395": {
            return $state.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local;
            break;
        }
        case "Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters_2396": {
            return $state.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters;
            break;
        }
        case "Declaration_name_conflicts_with_built_in_global_identifier_0_2397": {
            return $state.Declaration_name_conflicts_with_built_in_global_identifier_0;
            break;
        }
        case "constructor_cannot_be_used_as_a_parameter_property_name_2398": {
            return $state.X_constructor_cannot_be_used_as_a_parameter_property_name;
            break;
        }
        case "Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference_2399": {
            return $state.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference;
            break;
        }
        case "Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference_2400": {
            return $state.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference;
            break;
        }
        case "A_super_call_must_be_a_root_level_statement_within_a_constructor_of_a_derived_class_that_contains_in_2401": {
            return $state.A_super_call_must_be_a_root_level_statement_within_a_constructor_of_a_derived_class_that_contains_initialized_properties_parameter_properties_or_private_identifiers;
            break;
        }
        case "Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference_2402": {
            return $state.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference;
            break;
        }
        case "Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_t_2403": {
            return $state.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation_2404": {
            return $state.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any_2405": {
            return $state.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access_2406": {
            return $state.The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access;
            break;
        }
        case "The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter_but_2407": {
            return $state.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter_but_here_has_type_0;
            break;
        }
        case "Setters_cannot_return_a_value_2408": {
            return $state.Setters_cannot_return_a_value;
            break;
        }
        case "Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class_2409": {
            return $state.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class;
            break;
        }
        case "The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any_2410": {
            return $state.The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any;
            break;
        }
        case "Property_0_of_type_1_is_not_assignable_to_2_index_type_3_2411": {
            return $state.Property_0_of_type_1_is_not_assignable_to_2_index_type_3;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefi_2412": {
            return $state.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target;
            break;
        }
        case "_0_index_type_1_is_not_assignable_to_2_index_type_3_2413": {
            return $state.X_0_index_type_1_is_not_assignable_to_2_index_type_3;
            break;
        }
        case "Class_name_cannot_be_0_2414": {
            return $state.Class_name_cannot_be_0;
            break;
        }
        case "Class_0_incorrectly_extends_base_class_1_2415": {
            return $state.Class_0_incorrectly_extends_base_class_1;
            break;
        }
        case "Property_0_in_type_1_is_not_assignable_to_the_same_property_in_base_type_2_2416": {
            return $state.Property_0_in_type_1_is_not_assignable_to_the_same_property_in_base_type_2;
            break;
        }
        case "Class_static_side_0_incorrectly_extends_base_class_static_side_1_2417": {
            return $state.Class_static_side_0_incorrectly_extends_base_class_static_side_1;
            break;
        }
        case "Type_of_computed_property_s_value_is_0_which_is_not_assignable_to_type_1_2418": {
            return $state.Type_of_computed_property_s_value_is_0_which_is_not_assignable_to_type_1;
            break;
        }
        case "Types_of_construct_signatures_are_incompatible_2419": {
            return $state.Types_of_construct_signatures_are_incompatible;
            break;
        }
        case "Class_0_incorrectly_implements_interface_1_2420": {
            return $state.Class_0_incorrectly_implements_interface_1;
            break;
        }
        case "A_class_can_only_implement_an_object_type_or_intersection_of_object_types_with_statically_known_memb_2422": {
            return $state.A_class_can_only_implement_an_object_type_or_intersection_of_object_types_with_statically_known_members;
            break;
        }
        case "Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_access_2423": {
            return $state.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
            break;
        }
        case "Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_functi_2425": {
            return $state.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
            break;
        }
        case "Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_functi_2426": {
            return $state.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
            break;
        }
        case "Interface_name_cannot_be_0_2427": {
            return $state.Interface_name_cannot_be_0;
            break;
        }
        case "All_declarations_of_0_must_have_identical_type_parameters_2428": {
            return $state.All_declarations_of_0_must_have_identical_type_parameters;
            break;
        }
        case "Interface_0_incorrectly_extends_interface_1_2430": {
            return $state.Interface_0_incorrectly_extends_interface_1;
            break;
        }
        case "Enum_name_cannot_be_0_2431": {
            return $state.Enum_name_cannot_be_0;
            break;
        }
        case "In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enu_2432": {
            return $state.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element;
            break;
        }
        case "A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433": {
            return $state.A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged;
            break;
        }
        case "A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged_2434": {
            return $state.A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged;
            break;
        }
        case "Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces_2435": {
            return $state.Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces;
            break;
        }
        case "Ambient_module_declaration_cannot_specify_relative_module_name_2436": {
            return $state.Ambient_module_declaration_cannot_specify_relative_module_name;
            break;
        }
        case "Module_0_is_hidden_by_a_local_declaration_with_the_same_name_2437": {
            return $state.Module_0_is_hidden_by_a_local_declaration_with_the_same_name;
            break;
        }
        case "Import_name_cannot_be_0_2438": {
            return $state.Import_name_cannot_be_0;
            break;
        }
        case "Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relati_2439": {
            return $state.Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name;
            break;
        }
        case "Import_declaration_conflicts_with_local_declaration_of_0_2440": {
            return $state.Import_declaration_conflicts_with_local_declaration_of_0;
            break;
        }
        case "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_2441": {
            return $state.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module;
            break;
        }
        case "Types_have_separate_declarations_of_a_private_property_0_2442": {
            return $state.Types_have_separate_declarations_of_a_private_property_0;
            break;
        }
        case "Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2_2443": {
            return $state.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2;
            break;
        }
        case "Property_0_is_protected_in_type_1_but_public_in_type_2_2444": {
            return $state.Property_0_is_protected_in_type_1_but_public_in_type_2;
            break;
        }
        case "Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses_2445": {
            return $state.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses;
            break;
        }
        case "Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_This_is_an_instance_of_cl_2446": {
            return $state.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_This_is_an_instance_of_class_2;
            break;
        }
        case "The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead_2447": {
            return $state.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead;
            break;
        }
        case "Block_scoped_variable_0_used_before_its_declaration_2448": {
            return $state.Block_scoped_variable_0_used_before_its_declaration;
            break;
        }
        case "Class_0_used_before_its_declaration_2449": {
            return $state.Class_0_used_before_its_declaration;
            break;
        }
        case "Enum_0_used_before_its_declaration_2450": {
            return $state.Enum_0_used_before_its_declaration;
            break;
        }
        case "Cannot_redeclare_block_scoped_variable_0_2451": {
            return $state.Cannot_redeclare_block_scoped_variable_0;
            break;
        }
        case "An_enum_member_cannot_have_a_numeric_name_2452": {
            return $state.An_enum_member_cannot_have_a_numeric_name;
            break;
        }
        case "Variable_0_is_used_before_being_assigned_2454": {
            return $state.Variable_0_is_used_before_being_assigned;
            break;
        }
        case "Type_alias_0_circularly_references_itself_2456": {
            return $state.Type_alias_0_circularly_references_itself;
            break;
        }
        case "Type_alias_name_cannot_be_0_2457": {
            return $state.Type_alias_name_cannot_be_0;
            break;
        }
        case "An_AMD_module_cannot_have_multiple_name_assignments_2458": {
            return $state.An_AMD_module_cannot_have_multiple_name_assignments;
            break;
        }
        case "Module_0_declares_1_locally_but_it_is_not_exported_2459": {
            return $state.Module_0_declares_1_locally_but_it_is_not_exported;
            break;
        }
        case "Module_0_declares_1_locally_but_it_is_exported_as_2_2460": {
            return $state.Module_0_declares_1_locally_but_it_is_exported_as_2;
            break;
        }
        case "Type_0_is_not_an_array_type_2461": {
            return $state.Type_0_is_not_an_array_type;
            break;
        }
        case "A_rest_element_must_be_last_in_a_destructuring_pattern_2462": {
            return $state.A_rest_element_must_be_last_in_a_destructuring_pattern;
            break;
        }
        case "A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature_2463": {
            return $state.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature;
            break;
        }
        case "A_computed_property_name_must_be_of_type_string_number_symbol_or_any_2464": {
            return $state.A_computed_property_name_must_be_of_type_string_number_symbol_or_any;
            break;
        }
        case "this_cannot_be_referenced_in_a_computed_property_name_2465": {
            return $state.X_this_cannot_be_referenced_in_a_computed_property_name;
            break;
        }
        case "super_cannot_be_referenced_in_a_computed_property_name_2466": {
            return $state.X_super_cannot_be_referenced_in_a_computed_property_name;
            break;
        }
        case "A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type_2467": {
            return $state.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type;
            break;
        }
        case "Cannot_find_global_value_0_2468": {
            return $state.Cannot_find_global_value_0;
            break;
        }
        case "The_0_operator_cannot_be_applied_to_type_symbol_2469": {
            return $state.The_0_operator_cannot_be_applied_to_type_symbol;
            break;
        }
        case "Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher_2472": {
            return $state.Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher;
            break;
        }
        case "Enum_declarations_must_all_be_const_or_non_const_2473": {
            return $state.Enum_declarations_must_all_be_const_or_non_const;
            break;
        }
        case "const_enum_member_initializers_must_be_constant_expressions_2474": {
            return $state.X_const_enum_member_initializers_must_be_constant_expressions;
            break;
        }
        case "const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_im_2475": {
            return $state.X_const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment_or_type_query;
            break;
        }
        case "A_const_enum_member_can_only_be_accessed_using_a_string_literal_2476": {
            return $state.A_const_enum_member_can_only_be_accessed_using_a_string_literal;
            break;
        }
        case "const_enum_member_initializer_was_evaluated_to_a_non_finite_value_2477": {
            return $state.X_const_enum_member_initializer_was_evaluated_to_a_non_finite_value;
            break;
        }
        case "const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN_2478": {
            return $state.X_const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN;
            break;
        }
        case "let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations_2480": {
            return $state.X_let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations;
            break;
        }
        case "Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1_2481": {
            return $state.Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1;
            break;
        }
        case "The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation_2483": {
            return $state.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation;
            break;
        }
        case "Export_declaration_conflicts_with_exported_declaration_of_0_2484": {
            return $state.Export_declaration_conflicts_with_exported_declaration_of_0;
            break;
        }
        case "The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access_2487": {
            return $state.The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access;
            break;
        }
        case "Type_0_must_have_a_Symbol_iterator_method_that_returns_an_iterator_2488": {
            return $state.Type_0_must_have_a_Symbol_iterator_method_that_returns_an_iterator;
            break;
        }
        case "An_iterator_must_have_a_next_method_2489": {
            return $state.An_iterator_must_have_a_next_method;
            break;
        }
        case "The_type_returned_by_the_0_method_of_an_iterator_must_have_a_value_property_2490": {
            return $state.The_type_returned_by_the_0_method_of_an_iterator_must_have_a_value_property;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern_2491": {
            return $state.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern;
            break;
        }
        case "Cannot_redeclare_identifier_0_in_catch_clause_2492": {
            return $state.Cannot_redeclare_identifier_0_in_catch_clause;
            break;
        }
        case "Tuple_type_0_of_length_1_has_no_element_at_index_2_2493": {
            return $state.Tuple_type_0_of_length_1_has_no_element_at_index_2;
            break;
        }
        case "Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher_2494": {
            return $state.Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher;
            break;
        }
        case "Type_0_is_not_an_array_type_or_a_string_type_2495": {
            return $state.Type_0_is_not_an_array_type_or_a_string_type;
            break;
        }
        case "The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES5_Consider_using_a_standard_func_2496": {
            return $state.The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES5_Consider_using_a_standard_function_expression;
            break;
        }
        case "This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_2497": {
            return $state.This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_referencing_its_default_export;
            break;
        }
        case "Module_0_uses_export_and_cannot_be_used_with_export_Asterisk_2498": {
            return $state.Module_0_uses_export_and_cannot_be_used_with_export_Asterisk;
            break;
        }
        case "An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments_2499": {
            return $state.An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments;
            break;
        }
        case "A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments_2500": {
            return $state.A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments;
            break;
        }
        case "A_rest_element_cannot_contain_a_binding_pattern_2501": {
            return $state.A_rest_element_cannot_contain_a_binding_pattern;
            break;
        }
        case "_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation_2502": {
            return $state.X_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation;
            break;
        }
        case "Cannot_find_namespace_0_2503": {
            return $state.Cannot_find_namespace_0;
            break;
        }
        case "Type_0_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator_2504": {
            return $state.Type_0_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator;
            break;
        }
        case "A_generator_cannot_have_a_void_type_annotation_2505": {
            return $state.A_generator_cannot_have_a_void_type_annotation;
            break;
        }
        case "_0_is_referenced_directly_or_indirectly_in_its_own_base_expression_2506": {
            return $state.X_0_is_referenced_directly_or_indirectly_in_its_own_base_expression;
            break;
        }
        case "Type_0_is_not_a_constructor_function_type_2507": {
            return $state.Type_0_is_not_a_constructor_function_type;
            break;
        }
        case "No_base_constructor_has_the_specified_number_of_type_arguments_2508": {
            return $state.No_base_constructor_has_the_specified_number_of_type_arguments;
            break;
        }
        case "Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_2509": {
            return $state.Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_known_members;
            break;
        }
        case "Base_constructors_must_all_have_the_same_return_type_2510": {
            return $state.Base_constructors_must_all_have_the_same_return_type;
            break;
        }
        case "Cannot_create_an_instance_of_an_abstract_class_2511": {
            return $state.Cannot_create_an_instance_of_an_abstract_class;
            break;
        }
        case "Overload_signatures_must_all_be_abstract_or_non_abstract_2512": {
            return $state.Overload_signatures_must_all_be_abstract_or_non_abstract;
            break;
        }
        case "Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression_2513": {
            return $state.Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression;
            break;
        }
        case "A_tuple_type_cannot_be_indexed_with_a_negative_value_2514": {
            return $state.A_tuple_type_cannot_be_indexed_with_a_negative_value;
            break;
        }
        case "Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2_2515": {
            return $state.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2;
            break;
        }
        case "All_declarations_of_an_abstract_method_must_be_consecutive_2516": {
            return $state.All_declarations_of_an_abstract_method_must_be_consecutive;
            break;
        }
        case "Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type_2517": {
            return $state.Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type;
            break;
        }
        case "A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard_2518": {
            return $state.A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard;
            break;
        }
        case "An_async_iterator_must_have_a_next_method_2519": {
            return $state.An_async_iterator_must_have_a_next_method;
            break;
        }
        case "Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions_2520": {
            return $state.Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions;
            break;
        }
        case "The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES5_Consider_using_a_sta_2522": {
            return $state.The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES5_Consider_using_a_standard_function_or_method;
            break;
        }
        case "yield_expressions_cannot_be_used_in_a_parameter_initializer_2523": {
            return $state.X_yield_expressions_cannot_be_used_in_a_parameter_initializer;
            break;
        }
        case "await_expressions_cannot_be_used_in_a_parameter_initializer_2524": {
            return $state.X_await_expressions_cannot_be_used_in_a_parameter_initializer;
            break;
        }
        case "A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface_2526": {
            return $state.A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface;
            break;
        }
        case "The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary_2527": {
            return $state.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary;
            break;
        }
        case "A_module_cannot_have_multiple_default_exports_2528": {
            return $state.A_module_cannot_have_multiple_default_exports;
            break;
        }
        case "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_func_2529": {
            return $state.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_functions;
            break;
        }
        case "Property_0_is_incompatible_with_index_signature_2530": {
            return $state.Property_0_is_incompatible_with_index_signature;
            break;
        }
        case "Object_is_possibly_null_2531": {
            return $state.Object_is_possibly_null;
            break;
        }
        case "Object_is_possibly_undefined_2532": {
            return $state.Object_is_possibly_undefined;
            break;
        }
        case "Object_is_possibly_null_or_undefined_2533": {
            return $state.Object_is_possibly_null_or_undefined;
            break;
        }
        case "A_function_returning_never_cannot_have_a_reachable_end_point_2534": {
            return $state.A_function_returning_never_cannot_have_a_reachable_end_point;
            break;
        }
        case "Type_0_cannot_be_used_to_index_type_1_2536": {
            return $state.Type_0_cannot_be_used_to_index_type_1;
            break;
        }
        case "Type_0_has_no_matching_index_signature_for_type_1_2537": {
            return $state.Type_0_has_no_matching_index_signature_for_type_1;
            break;
        }
        case "Type_0_cannot_be_used_as_an_index_type_2538": {
            return $state.Type_0_cannot_be_used_as_an_index_type;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_not_a_variable_2539": {
            return $state.Cannot_assign_to_0_because_it_is_not_a_variable;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_a_read_only_property_2540": {
            return $state.Cannot_assign_to_0_because_it_is_a_read_only_property;
            break;
        }
        case "Index_signature_in_type_0_only_permits_reading_2542": {
            return $state.Index_signature_in_type_0_only_permits_reading;
            break;
        }
        case "Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_me_2543": {
            return $state.Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_meta_property_reference;
            break;
        }
        case "Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta__2544": {
            return $state.Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta_property_reference;
            break;
        }
        case "A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any_2545": {
            return $state.A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any;
            break;
        }
        case "The_type_returned_by_the_0_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value_pro_2547": {
            return $state.The_type_returned_by_the_0_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value_property;
            break;
        }
        case "Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator_2548": {
            return $state.Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator;
            break;
        }
        case "Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns__2549": {
            return $state.Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator;
            break;
        }
        case "Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_c_2550": {
            return $state.Property_0_does_not_exist_on_type_1_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_2_or_later;
            break;
        }
        case "Property_0_does_not_exist_on_type_1_Did_you_mean_2_2551": {
            return $state.Property_0_does_not_exist_on_type_1_Did_you_mean_2;
            break;
        }
        case "Cannot_find_name_0_Did_you_mean_1_2552": {
            return $state.Cannot_find_name_0_Did_you_mean_1;
            break;
        }
        case "Computed_values_are_not_permitted_in_an_enum_with_string_valued_members_2553": {
            return $state.Computed_values_are_not_permitted_in_an_enum_with_string_valued_members;
            break;
        }
        case "Expected_0_arguments_but_got_1_2554": {
            return $state.Expected_0_arguments_but_got_1;
            break;
        }
        case "Expected_at_least_0_arguments_but_got_1_2555": {
            return $state.Expected_at_least_0_arguments_but_got_1;
            break;
        }
        case "A_spread_argument_must_either_have_a_tuple_type_or_be_passed_to_a_rest_parameter_2556": {
            return $state.A_spread_argument_must_either_have_a_tuple_type_or_be_passed_to_a_rest_parameter;
            break;
        }
        case "Expected_0_type_arguments_but_got_1_2558": {
            return $state.Expected_0_type_arguments_but_got_1;
            break;
        }
        case "Type_0_has_no_properties_in_common_with_type_1_2559": {
            return $state.Type_0_has_no_properties_in_common_with_type_1;
            break;
        }
        case "Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it_2560": {
            return $state.Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it;
            break;
        }
        case "Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_writ_2561": {
            return $state.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2;
            break;
        }
        case "Base_class_expressions_cannot_reference_class_type_parameters_2562": {
            return $state.Base_class_expressions_cannot_reference_class_type_parameters;
            break;
        }
        case "The_containing_function_or_module_body_is_too_large_for_control_flow_analysis_2563": {
            return $state.The_containing_function_or_module_body_is_too_large_for_control_flow_analysis;
            break;
        }
        case "Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor_2564": {
            return $state.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor;
            break;
        }
        case "Property_0_is_used_before_being_assigned_2565": {
            return $state.Property_0_is_used_before_being_assigned;
            break;
        }
        case "A_rest_element_cannot_have_a_property_name_2566": {
            return $state.A_rest_element_cannot_have_a_property_name;
            break;
        }
        case "Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations_2567": {
            return $state.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
            break;
        }
        case "Property_0_may_not_exist_on_type_1_Did_you_mean_2_2568": {
            return $state.Property_0_may_not_exist_on_type_1_Did_you_mean_2;
            break;
        }
        case "Could_not_find_name_0_Did_you_mean_1_2570": {
            return $state.Could_not_find_name_0_Did_you_mean_1;
            break;
        }
        case "Object_is_of_type_unknown_2571": {
            return $state.Object_is_of_type_unknown;
            break;
        }
        case "A_rest_element_type_must_be_an_array_type_2574": {
            return $state.A_rest_element_type_must_be_an_array_type;
            break;
        }
        case "No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments_2575": {
            return $state.No_overload_expects_0_arguments_but_overloads_do_exist_that_expect_either_1_or_2_arguments;
            break;
        }
        case "Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead_2576": {
            return $state.Property_0_does_not_exist_on_type_1_Did_you_mean_to_access_the_static_member_2_instead;
            break;
        }
        case "Return_type_annotation_circularly_references_itself_2577": {
            return $state.Return_type_annotation_circularly_references_itself;
            break;
        }
        case "Unused_ts_expect_error_directive_2578": {
            return $state.Unused_ts_expect_error_directive;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashno_2580": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slash_2581": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_type_2582": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_2583": {
            return $state.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_2584": {
            return $state.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom;
            break;
        }
        case "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Do_you_need_to_change_your_target_library_2585": {
            return $state.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_es2015_or_later;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_a_constant_2588": {
            return $state.Cannot_assign_to_0_because_it_is_a_constant;
            break;
        }
        case "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589": {
            return $state.Type_instantiation_is_excessively_deep_and_possibly_infinite;
            break;
        }
        case "Expression_produces_a_union_type_that_is_too_complex_to_represent_2590": {
            return $state.Expression_produces_a_union_type_that_is_too_complex_to_represent;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashno_2591": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slash_2592": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_type_2593": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig;
            break;
        }
        case "This_module_is_declared_with_export_and_can_only_be_used_with_a_default_import_when_using_the_0_flag_2594": {
            return $state.This_module_is_declared_with_export_and_can_only_be_used_with_a_default_import_when_using_the_0_flag;
            break;
        }
        case "_0_can_only_be_imported_by_using_a_default_import_2595": {
            return $state.X_0_can_only_be_imported_by_using_a_default_import;
            break;
        }
        case "_0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import_2596": {
            return $state.X_0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
            break;
        }
        case "_0_can_only_be_imported_by_using_a_require_call_or_by_using_a_default_import_2597": {
            return $state.X_0_can_only_be_imported_by_using_a_require_call_or_by_using_a_default_import;
            break;
        }
        case "_0_can_only_be_imported_by_using_a_require_call_or_by_turning_on_the_esModuleInterop_flag_and_using__2598": {
            return $state.X_0_can_only_be_imported_by_using_a_require_call_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
            break;
        }
        case "JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist_2602": {
            return $state.JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist;
            break;
        }
        case "Property_0_in_type_1_is_not_assignable_to_type_2_2603": {
            return $state.Property_0_in_type_1_is_not_assignable_to_type_2;
            break;
        }
        case "JSX_element_type_0_does_not_have_any_construct_or_call_signatures_2604": {
            return $state.JSX_element_type_0_does_not_have_any_construct_or_call_signatures;
            break;
        }
        case "Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property_2606": {
            return $state.Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property;
            break;
        }
        case "JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property_2607": {
            return $state.JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property;
            break;
        }
        case "The_global_type_JSX_0_may_not_have_more_than_one_property_2608": {
            return $state.The_global_type_JSX_0_may_not_have_more_than_one_property;
            break;
        }
        case "JSX_spread_child_must_be_an_array_type_2609": {
            return $state.JSX_spread_child_must_be_an_array_type;
            break;
        }
        case "_0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property_2610": {
            return $state.X_0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property;
            break;
        }
        case "_0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor_2611": {
            return $state.X_0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor;
            break;
        }
        case "Property_0_will_overwrite_the_base_property_in_1_If_this_is_intentional_add_an_initializer_Otherwise_2612": {
            return $state.Property_0_will_overwrite_the_base_property_in_1_If_this_is_intentional_add_an_initializer_Otherwise_add_a_declare_modifier_or_remove_the_redundant_declaration;
            break;
        }
        case "Module_0_has_no_default_export_Did_you_mean_to_use_import_1_from_0_instead_2613": {
            return $state.Module_0_has_no_default_export_Did_you_mean_to_use_import_1_from_0_instead;
            break;
        }
        case "Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead_2614": {
            return $state.Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead;
            break;
        }
        case "Type_of_property_0_circularly_references_itself_in_mapped_type_1_2615": {
            return $state.Type_of_property_0_circularly_references_itself_in_mapped_type_1;
            break;
        }
        case "_0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import_2616": {
            return $state.X_0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import;
            break;
        }
        case "_0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_us_2617": {
            return $state.X_0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
            break;
        }
        case "Source_has_0_element_s_but_target_requires_1_2618": {
            return $state.Source_has_0_element_s_but_target_requires_1;
            break;
        }
        case "Source_has_0_element_s_but_target_allows_only_1_2619": {
            return $state.Source_has_0_element_s_but_target_allows_only_1;
            break;
        }
        case "Target_requires_0_element_s_but_source_may_have_fewer_2620": {
            return $state.Target_requires_0_element_s_but_source_may_have_fewer;
            break;
        }
        case "Target_allows_only_0_element_s_but_source_may_have_more_2621": {
            return $state.Target_allows_only_0_element_s_but_source_may_have_more;
            break;
        }
        case "Source_provides_no_match_for_required_element_at_position_0_in_target_2623": {
            return $state.Source_provides_no_match_for_required_element_at_position_0_in_target;
            break;
        }
        case "Source_provides_no_match_for_variadic_element_at_position_0_in_target_2624": {
            return $state.Source_provides_no_match_for_variadic_element_at_position_0_in_target;
            break;
        }
        case "Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target_2625": {
            return $state.Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target;
            break;
        }
        case "Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target_2626": {
            return $state.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target;
            break;
        }
        case "Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target_2627": {
            return $state.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_an_enum_2628": {
            return $state.Cannot_assign_to_0_because_it_is_an_enum;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_a_class_2629": {
            return $state.Cannot_assign_to_0_because_it_is_a_class;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_a_function_2630": {
            return $state.Cannot_assign_to_0_because_it_is_a_function;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_a_namespace_2631": {
            return $state.Cannot_assign_to_0_because_it_is_a_namespace;
            break;
        }
        case "Cannot_assign_to_0_because_it_is_an_import_2632": {
            return $state.Cannot_assign_to_0_because_it_is_an_import;
            break;
        }
        case "JSX_property_access_expressions_cannot_include_JSX_namespace_names_2633": {
            return $state.JSX_property_access_expressions_cannot_include_JSX_namespace_names;
            break;
        }
        case "_0_index_signatures_are_incompatible_2634": {
            return $state.X_0_index_signatures_are_incompatible;
            break;
        }
        case "Type_0_has_no_signatures_for_which_the_type_argument_list_is_applicable_2635": {
            return $state.Type_0_has_no_signatures_for_which_the_type_argument_list_is_applicable;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_as_implied_by_variance_annotation_2636": {
            return $state.Type_0_is_not_assignable_to_type_1_as_implied_by_variance_annotation;
            break;
        }
        case "Variance_annotations_are_only_supported_in_type_aliases_for_object_function_constructor_and_mapped_t_2637": {
            return $state.Variance_annotations_are_only_supported_in_type_aliases_for_object_function_constructor_and_mapped_types;
            break;
        }
        case "Type_0_may_represent_a_primitive_value_which_is_not_permitted_as_the_right_operand_of_the_in_operato_2638": {
            return $state.Type_0_may_represent_a_primitive_value_which_is_not_permitted_as_the_right_operand_of_the_in_operator;
            break;
        }
        case "React_components_cannot_include_JSX_namespace_names_2639": {
            return $state.React_components_cannot_include_JSX_namespace_names;
            break;
        }
        case "Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity_2649": {
            return $state.Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity;
            break;
        }
        case "Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1_and__2650": {
            return $state.Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1_and_2_more;
            break;
        }
        case "A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_memb_2651": {
            return $state.A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums;
            break;
        }
        case "Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_d_2652": {
            return $state.Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead;
            break;
        }
        case "Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1_2653": {
            return $state.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1;
            break;
        }
        case "Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2_2654": {
            return $state.Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2;
            break;
        }
        case "Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2_and_3_more_2655": {
            return $state.Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2_and_3_more;
            break;
        }
        case "Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1_2656": {
            return $state.Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1;
            break;
        }
        case "JSX_expressions_must_have_one_parent_element_2657": {
            return $state.JSX_expressions_must_have_one_parent_element;
            break;
        }
        case "Type_0_provides_no_match_for_the_signature_1_2658": {
            return $state.Type_0_provides_no_match_for_the_signature_1;
            break;
        }
        case "super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_highe_2659": {
            return $state.X_super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher;
            break;
        }
        case "super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions_2660": {
            return $state.X_super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions;
            break;
        }
        case "Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module_2661": {
            return $state.Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module;
            break;
        }
        case "Cannot_find_name_0_Did_you_mean_the_static_member_1_0_2662": {
            return $state.Cannot_find_name_0_Did_you_mean_the_static_member_1_0;
            break;
        }
        case "Cannot_find_name_0_Did_you_mean_the_instance_member_this_0_2663": {
            return $state.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0;
            break;
        }
        case "Invalid_module_name_in_augmentation_module_0_cannot_be_found_2664": {
            return $state.Invalid_module_name_in_augmentation_module_0_cannot_be_found;
            break;
        }
        case "Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augm_2665": {
            return $state.Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented;
            break;
        }
        case "Exports_and_export_assignments_are_not_permitted_in_module_augmentations_2666": {
            return $state.Exports_and_export_assignments_are_not_permitted_in_module_augmentations;
            break;
        }
        case "Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_mod_2667": {
            return $state.Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_module;
            break;
        }
        case "export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always__2668": {
            return $state.X_export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible;
            break;
        }
        case "Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_2669": {
            return $state.Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations;
            break;
        }
        case "Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambien_2670": {
            return $state.Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context;
            break;
        }
        case "Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity_2671": {
            return $state.Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity;
            break;
        }
        case "Cannot_assign_a_0_constructor_type_to_a_1_constructor_type_2672": {
            return $state.Cannot_assign_a_0_constructor_type_to_a_1_constructor_type;
            break;
        }
        case "Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration_2673": {
            return $state.Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration;
            break;
        }
        case "Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration_2674": {
            return $state.Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration;
            break;
        }
        case "Cannot_extend_a_class_0_Class_constructor_is_marked_as_private_2675": {
            return $state.Cannot_extend_a_class_0_Class_constructor_is_marked_as_private;
            break;
        }
        case "Accessors_must_both_be_abstract_or_non_abstract_2676": {
            return $state.Accessors_must_both_be_abstract_or_non_abstract;
            break;
        }
        case "A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type_2677": {
            return $state.A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type;
            break;
        }
        case "Type_0_is_not_comparable_to_type_1_2678": {
            return $state.Type_0_is_not_comparable_to_type_1;
            break;
        }
        case "A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void_2679": {
            return $state.A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void;
            break;
        }
        case "A_0_parameter_must_be_the_first_parameter_2680": {
            return $state.A_0_parameter_must_be_the_first_parameter;
            break;
        }
        case "A_constructor_cannot_have_a_this_parameter_2681": {
            return $state.A_constructor_cannot_have_a_this_parameter;
            break;
        }
        case "this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_2683": {
            return $state.X_this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation;
            break;
        }
        case "The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1_2684": {
            return $state.The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1;
            break;
        }
        case "The_this_types_of_each_signature_are_incompatible_2685": {
            return $state.The_this_types_of_each_signature_are_incompatible;
            break;
        }
        case "_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead_2686": {
            return $state.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead;
            break;
        }
        case "All_declarations_of_0_must_have_identical_modifiers_2687": {
            return $state.All_declarations_of_0_must_have_identical_modifiers;
            break;
        }
        case "Cannot_find_type_definition_file_for_0_2688": {
            return $state.Cannot_find_type_definition_file_for_0;
            break;
        }
        case "Cannot_extend_an_interface_0_Did_you_mean_implements_2689": {
            return $state.Cannot_extend_an_interface_0_Did_you_mean_implements;
            break;
        }
        case "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0_2690": {
            return $state.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0;
            break;
        }
        case "_0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible_2692": {
            return $state.X_0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible;
            break;
        }
        case "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_2693": {
            return $state.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here;
            break;
        }
        case "Namespace_0_has_no_exported_member_1_2694": {
            return $state.Namespace_0_has_no_exported_member_1;
            break;
        }
        case "Left_side_of_comma_operator_is_unused_and_has_no_side_effects_2695": {
            return $state.Left_side_of_comma_operator_is_unused_and_has_no_side_effects;
            break;
        }
        case "The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead_2696": {
            return $state.The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead;
            break;
        }
        case "An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_in_2697": {
            return $state.An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option;
            break;
        }
        case "Spread_types_may_only_be_created_from_object_types_2698": {
            return $state.Spread_types_may_only_be_created_from_object_types;
            break;
        }
        case "Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1_2699": {
            return $state.Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1;
            break;
        }
        case "Rest_types_may_only_be_created_from_object_types_2700": {
            return $state.Rest_types_may_only_be_created_from_object_types;
            break;
        }
        case "The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access_2701": {
            return $state.The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access;
            break;
        }
        case "_0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here_2702": {
            return $state.X_0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here;
            break;
        }
        case "The_operand_of_a_delete_operator_must_be_a_property_reference_2703": {
            return $state.The_operand_of_a_delete_operator_must_be_a_property_reference;
            break;
        }
        case "The_operand_of_a_delete_operator_cannot_be_a_read_only_property_2704": {
            return $state.The_operand_of_a_delete_operator_cannot_be_a_read_only_property;
            break;
        }
        case "An_async_function_or_method_in_ES5_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_2705": {
            return $state.An_async_function_or_method_in_ES5_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option;
            break;
        }
        case "Required_type_parameters_may_not_follow_optional_type_parameters_2706": {
            return $state.Required_type_parameters_may_not_follow_optional_type_parameters;
            break;
        }
        case "Generic_type_0_requires_between_1_and_2_type_arguments_2707": {
            return $state.Generic_type_0_requires_between_1_and_2_type_arguments;
            break;
        }
        case "Cannot_use_namespace_0_as_a_value_2708": {
            return $state.Cannot_use_namespace_0_as_a_value;
            break;
        }
        case "Cannot_use_namespace_0_as_a_type_2709": {
            return $state.Cannot_use_namespace_0_as_a_type;
            break;
        }
        case "_0_are_specified_twice_The_attribute_named_0_will_be_overwritten_2710": {
            return $state.X_0_are_specified_twice_The_attribute_named_0_will_be_overwritten;
            break;
        }
        case "A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES20_2711": {
            return $state.A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option;
            break;
        }
        case "A_dynamic_import_call_in_ES5_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_t_2712": {
            return $state.A_dynamic_import_call_in_ES5_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option;
            break;
        }
        case "Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_p_2713": {
            return $state.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1;
            break;
        }
        case "The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context_2714": {
            return $state.The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context;
            break;
        }
        case "Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor_2715": {
            return $state.Abstract_property_0_in_class_1_cannot_be_accessed_in_the_constructor;
            break;
        }
        case "Type_parameter_0_has_a_circular_default_2716": {
            return $state.Type_parameter_0_has_a_circular_default;
            break;
        }
        case "Subsequent_property_declarations_must_have_the_same_type_Property_0_must_be_of_type_1_but_here_has_t_2717": {
            return $state.Subsequent_property_declarations_must_have_the_same_type_Property_0_must_be_of_type_1_but_here_has_type_2;
            break;
        }
        case "Duplicate_property_0_2718": {
            return $state.Duplicate_property_0;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated_2719": {
            return $state.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated;
            break;
        }
        case "Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclas_2720": {
            return $state.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass;
            break;
        }
        case "Cannot_invoke_an_object_which_is_possibly_null_2721": {
            return $state.Cannot_invoke_an_object_which_is_possibly_null;
            break;
        }
        case "Cannot_invoke_an_object_which_is_possibly_undefined_2722": {
            return $state.Cannot_invoke_an_object_which_is_possibly_undefined;
            break;
        }
        case "Cannot_invoke_an_object_which_is_possibly_null_or_undefined_2723": {
            return $state.Cannot_invoke_an_object_which_is_possibly_null_or_undefined;
            break;
        }
        case "_0_has_no_exported_member_named_1_Did_you_mean_2_2724": {
            return $state.X_0_has_no_exported_member_named_1_Did_you_mean_2;
            break;
        }
        case "Class_name_cannot_be_Object_when_targeting_ES5_and_above_with_module_0_2725": {
            return $state.Class_name_cannot_be_Object_when_targeting_ES5_and_above_with_module_0;
            break;
        }
        case "Cannot_find_lib_definition_for_0_2726": {
            return $state.Cannot_find_lib_definition_for_0;
            break;
        }
        case "Cannot_find_lib_definition_for_0_Did_you_mean_1_2727": {
            return $state.Cannot_find_lib_definition_for_0_Did_you_mean_1;
            break;
        }
        case "_0_is_declared_here_2728": {
            return $state.X_0_is_declared_here;
            break;
        }
        case "Property_0_is_used_before_its_initialization_2729": {
            return $state.Property_0_is_used_before_its_initialization;
            break;
        }
        case "An_arrow_function_cannot_have_a_this_parameter_2730": {
            return $state.An_arrow_function_cannot_have_a_this_parameter;
            break;
        }
        case "Implicit_conversion_of_a_symbol_to_a_string_will_fail_at_runtime_Consider_wrapping_this_expression_i_2731": {
            return $state.Implicit_conversion_of_a_symbol_to_a_string_will_fail_at_runtime_Consider_wrapping_this_expression_in_String;
            break;
        }
        case "Cannot_find_module_0_Consider_using_resolveJsonModule_to_import_module_with_json_extension_2732": {
            return $state.Cannot_find_module_0_Consider_using_resolveJsonModule_to_import_module_with_json_extension;
            break;
        }
        case "Property_0_was_also_declared_here_2733": {
            return $state.Property_0_was_also_declared_here;
            break;
        }
        case "Are_you_missing_a_semicolon_2734": {
            return $state.Are_you_missing_a_semicolon;
            break;
        }
        case "Did_you_mean_for_0_to_be_constrained_to_type_new_args_Colon_any_1_2735": {
            return $state.Did_you_mean_for_0_to_be_constrained_to_type_new_args_Colon_any_1;
            break;
        }
        case "Operator_0_cannot_be_applied_to_type_1_2736": {
            return $state.Operator_0_cannot_be_applied_to_type_1;
            break;
        }
        case "BigInt_literals_are_not_available_when_targeting_lower_than_ES2020_2737": {
            return $state.BigInt_literals_are_not_available_when_targeting_lower_than_ES2020;
            break;
        }
        case "An_outer_value_of_this_is_shadowed_by_this_container_2738": {
            return $state.An_outer_value_of_this_is_shadowed_by_this_container;
            break;
        }
        case "Type_0_is_missing_the_following_properties_from_type_1_Colon_2_2739": {
            return $state.Type_0_is_missing_the_following_properties_from_type_1_Colon_2;
            break;
        }
        case "Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more_2740": {
            return $state.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more;
            break;
        }
        case "Property_0_is_missing_in_type_1_but_required_in_type_2_2741": {
            return $state.Property_0_is_missing_in_type_1_but_required_in_type_2;
            break;
        }
        case "The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_a_2742": {
            return $state.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary;
            break;
        }
        case "No_overload_expects_0_type_arguments_but_overloads_do_exist_that_expect_either_1_or_2_type_arguments_2743": {
            return $state.No_overload_expects_0_type_arguments_but_overloads_do_exist_that_expect_either_1_or_2_type_arguments;
            break;
        }
        case "Type_parameter_defaults_can_only_reference_previously_declared_type_parameters_2744": {
            return $state.Type_parameter_defaults_can_only_reference_previously_declared_type_parameters;
            break;
        }
        case "This_JSX_tag_s_0_prop_expects_type_1_which_requires_multiple_children_but_only_a_single_child_was_pr_2745": {
            return $state.This_JSX_tag_s_0_prop_expects_type_1_which_requires_multiple_children_but_only_a_single_child_was_provided;
            break;
        }
        case "This_JSX_tag_s_0_prop_expects_a_single_child_of_type_1_but_multiple_children_were_provided_2746": {
            return $state.This_JSX_tag_s_0_prop_expects_a_single_child_of_type_1_but_multiple_children_were_provided;
            break;
        }
        case "_0_components_don_t_accept_text_as_child_elements_Text_in_JSX_has_the_type_string_but_the_expected_t_2747": {
            return $state.X_0_components_don_t_accept_text_as_child_elements_Text_in_JSX_has_the_type_string_but_the_expected_type_of_1_is_2;
            break;
        }
        case "Cannot_access_ambient_const_enums_when_0_is_enabled_2748": {
            return $state.Cannot_access_ambient_const_enums_when_0_is_enabled;
            break;
        }
        case "_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0_2749": {
            return $state.X_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0;
            break;
        }
        case "The_implementation_signature_is_declared_here_2750": {
            return $state.The_implementation_signature_is_declared_here;
            break;
        }
        case "Circularity_originates_in_type_at_this_location_2751": {
            return $state.Circularity_originates_in_type_at_this_location;
            break;
        }
        case "The_first_export_default_is_here_2752": {
            return $state.The_first_export_default_is_here;
            break;
        }
        case "Another_export_default_is_here_2753": {
            return $state.Another_export_default_is_here;
            break;
        }
        case "super_may_not_use_type_arguments_2754": {
            return $state.X_super_may_not_use_type_arguments;
            break;
        }
        case "No_constituent_of_type_0_is_callable_2755": {
            return $state.No_constituent_of_type_0_is_callable;
            break;
        }
        case "Not_all_constituents_of_type_0_are_callable_2756": {
            return $state.Not_all_constituents_of_type_0_are_callable;
            break;
        }
        case "Type_0_has_no_call_signatures_2757": {
            return $state.Type_0_has_no_call_signatures;
            break;
        }
        case "Each_member_of_the_union_type_0_has_signatures_but_none_of_those_signatures_are_compatible_with_each_2758": {
            return $state.Each_member_of_the_union_type_0_has_signatures_but_none_of_those_signatures_are_compatible_with_each_other;
            break;
        }
        case "No_constituent_of_type_0_is_constructable_2759": {
            return $state.No_constituent_of_type_0_is_constructable;
            break;
        }
        case "Not_all_constituents_of_type_0_are_constructable_2760": {
            return $state.Not_all_constituents_of_type_0_are_constructable;
            break;
        }
        case "Type_0_has_no_construct_signatures_2761": {
            return $state.Type_0_has_no_construct_signatures;
            break;
        }
        case "Each_member_of_the_union_type_0_has_construct_signatures_but_none_of_those_signatures_are_compatible_2762": {
            return $state.Each_member_of_the_union_type_0_has_construct_signatures_but_none_of_those_signatures_are_compatible_with_each_other;
            break;
        }
        case "Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_s_2763": {
            return $state.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_for_of_will_always_send_0;
            break;
        }
        case "Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_al_2764": {
            return $state.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_spread_will_always_send_0;
            break;
        }
        case "Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring__2765": {
            return $state.Cannot_iterate_value_because_the_next_method_of_its_iterator_expects_type_1_but_array_destructuring_will_always_send_0;
            break;
        }
        case "Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_co_2766": {
            return $state.Cannot_delegate_iteration_to_value_because_the_next_method_of_its_iterator_expects_type_1_but_the_containing_generator_will_always_send_0;
            break;
        }
        case "The_0_property_of_an_iterator_must_be_a_method_2767": {
            return $state.The_0_property_of_an_iterator_must_be_a_method;
            break;
        }
        case "The_0_property_of_an_async_iterator_must_be_a_method_2768": {
            return $state.The_0_property_of_an_async_iterator_must_be_a_method;
            break;
        }
        case "No_overload_matches_this_call_2769": {
            return $state.No_overload_matches_this_call;
            break;
        }
        case "The_last_overload_gave_the_following_error_2770": {
            return $state.The_last_overload_gave_the_following_error;
            break;
        }
        case "The_last_overload_is_declared_here_2771": {
            return $state.The_last_overload_is_declared_here;
            break;
        }
        case "Overload_0_of_1_2_gave_the_following_error_2772": {
            return $state.Overload_0_of_1_2_gave_the_following_error;
            break;
        }
        case "Did_you_forget_to_use_await_2773": {
            return $state.Did_you_forget_to_use_await;
            break;
        }
        case "This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_2774": {
            return $state.This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_instead;
            break;
        }
        case "Assertions_require_every_name_in_the_call_target_to_be_declared_with_an_explicit_type_annotation_2775": {
            return $state.Assertions_require_every_name_in_the_call_target_to_be_declared_with_an_explicit_type_annotation;
            break;
        }
        case "Assertions_require_the_call_target_to_be_an_identifier_or_qualified_name_2776": {
            return $state.Assertions_require_the_call_target_to_be_an_identifier_or_qualified_name;
            break;
        }
        case "The_operand_of_an_increment_or_decrement_operator_may_not_be_an_optional_property_access_2777": {
            return $state.The_operand_of_an_increment_or_decrement_operator_may_not_be_an_optional_property_access;
            break;
        }
        case "The_target_of_an_object_rest_assignment_may_not_be_an_optional_property_access_2778": {
            return $state.The_target_of_an_object_rest_assignment_may_not_be_an_optional_property_access;
            break;
        }
        case "The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access_2779": {
            return $state.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access;
            break;
        }
        case "The_left_hand_side_of_a_for_in_statement_may_not_be_an_optional_property_access_2780": {
            return $state.The_left_hand_side_of_a_for_in_statement_may_not_be_an_optional_property_access;
            break;
        }
        case "The_left_hand_side_of_a_for_of_statement_may_not_be_an_optional_property_access_2781": {
            return $state.The_left_hand_side_of_a_for_of_statement_may_not_be_an_optional_property_access;
            break;
        }
        case "_0_needs_an_explicit_type_annotation_2782": {
            return $state.X_0_needs_an_explicit_type_annotation;
            break;
        }
        case "_0_is_specified_more_than_once_so_this_usage_will_be_overwritten_2783": {
            return $state.X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten;
            break;
        }
        case "get_and_set_accessors_cannot_declare_this_parameters_2784": {
            return $state.X_get_and_set_accessors_cannot_declare_this_parameters;
            break;
        }
        case "This_spread_always_overwrites_this_property_2785": {
            return $state.This_spread_always_overwrites_this_property;
            break;
        }
        case "_0_cannot_be_used_as_a_JSX_component_2786": {
            return $state.X_0_cannot_be_used_as_a_JSX_component;
            break;
        }
        case "Its_return_type_0_is_not_a_valid_JSX_element_2787": {
            return $state.Its_return_type_0_is_not_a_valid_JSX_element;
            break;
        }
        case "Its_instance_type_0_is_not_a_valid_JSX_element_2788": {
            return $state.Its_instance_type_0_is_not_a_valid_JSX_element;
            break;
        }
        case "Its_element_type_0_is_not_a_valid_JSX_element_2789": {
            return $state.Its_element_type_0_is_not_a_valid_JSX_element;
            break;
        }
        case "The_operand_of_a_delete_operator_must_be_optional_2790": {
            return $state.The_operand_of_a_delete_operator_must_be_optional;
            break;
        }
        case "Exponentiation_cannot_be_performed_on_bigint_values_unless_the_target_option_is_set_to_es2016_or_lat_2791": {
            return $state.Exponentiation_cannot_be_performed_on_bigint_values_unless_the_target_option_is_set_to_es2016_or_later;
            break;
        }
        case "Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_nodenext_or_to_add_aliases_t_2792": {
            return $state.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_nodenext_or_to_add_aliases_to_the_paths_option;
            break;
        }
        case "The_call_would_have_succeeded_against_this_implementation_but_implementation_signatures_of_overloads_2793": {
            return $state.The_call_would_have_succeeded_against_this_implementation_but_implementation_signatures_of_overloads_are_not_externally_visible;
            break;
        }
        case "Expected_0_arguments_but_got_1_Did_you_forget_to_include_void_in_your_type_argument_to_Promise_2794": {
            return $state.Expected_0_arguments_but_got_1_Did_you_forget_to_include_void_in_your_type_argument_to_Promise;
            break;
        }
        case "The_intrinsic_keyword_can_only_be_used_to_declare_compiler_provided_intrinsic_types_2795": {
            return $state.The_intrinsic_keyword_can_only_be_used_to_declare_compiler_provided_intrinsic_types;
            break;
        }
        case "It_is_likely_that_you_are_missing_a_comma_to_separate_these_two_template_expressions_They_form_a_tag_2796": {
            return $state.It_is_likely_that_you_are_missing_a_comma_to_separate_these_two_template_expressions_They_form_a_tagged_template_expression_which_cannot_be_invoked;
            break;
        }
        case "A_mixin_class_that_extends_from_a_type_variable_containing_an_abstract_construct_signature_must_also_2797": {
            return $state.A_mixin_class_that_extends_from_a_type_variable_containing_an_abstract_construct_signature_must_also_be_declared_abstract;
            break;
        }
        case "The_declaration_was_marked_as_deprecated_here_2798": {
            return $state.The_declaration_was_marked_as_deprecated_here;
            break;
        }
        case "Type_produces_a_tuple_type_that_is_too_large_to_represent_2799": {
            return $state.Type_produces_a_tuple_type_that_is_too_large_to_represent;
            break;
        }
        case "Expression_produces_a_tuple_type_that_is_too_large_to_represent_2800": {
            return $state.Expression_produces_a_tuple_type_that_is_too_large_to_represent;
            break;
        }
        case "This_condition_will_always_return_true_since_this_0_is_always_defined_2801": {
            return $state.This_condition_will_always_return_true_since_this_0_is_always_defined;
            break;
        }
        case "Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es201_2802": {
            return $state.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher;
            break;
        }
        case "Cannot_assign_to_private_method_0_Private_methods_are_not_writable_2803": {
            return $state.Cannot_assign_to_private_method_0_Private_methods_are_not_writable;
            break;
        }
        case "Duplicate_identifier_0_Static_and_instance_elements_cannot_share_the_same_private_name_2804": {
            return $state.Duplicate_identifier_0_Static_and_instance_elements_cannot_share_the_same_private_name;
            break;
        }
        case "Private_accessor_was_defined_without_a_getter_2806": {
            return $state.Private_accessor_was_defined_without_a_getter;
            break;
        }
        case "This_syntax_requires_an_imported_helper_named_1_with_2_parameters_which_is_not_compatible_with_the_o_2807": {
            return $state.This_syntax_requires_an_imported_helper_named_1_with_2_parameters_which_is_not_compatible_with_the_one_in_0_Consider_upgrading_your_version_of_0;
            break;
        }
        case "A_get_accessor_must_be_at_least_as_accessible_as_the_setter_2808": {
            return $state.A_get_accessor_must_be_at_least_as_accessible_as_the_setter;
            break;
        }
        case "Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_d_2809": {
            return $state.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_whole_assignment_in_parentheses;
            break;
        }
        case "Expected_1_argument_but_got_0_new_Promise_needs_a_JSDoc_hint_to_produce_a_resolve_that_can_be_called_2810": {
            return $state.Expected_1_argument_but_got_0_new_Promise_needs_a_JSDoc_hint_to_produce_a_resolve_that_can_be_called_without_arguments;
            break;
        }
        case "Initializer_for_property_0_2811": {
            return $state.Initializer_for_property_0;
            break;
        }
        case "Property_0_does_not_exist_on_type_1_Try_changing_the_lib_compiler_option_to_include_dom_2812": {
            return $state.Property_0_does_not_exist_on_type_1_Try_changing_the_lib_compiler_option_to_include_dom;
            break;
        }
        case "Class_declaration_cannot_implement_overload_list_for_0_2813": {
            return $state.Class_declaration_cannot_implement_overload_list_for_0;
            break;
        }
        case "Function_with_bodies_can_only_merge_with_classes_that_are_ambient_2814": {
            return $state.Function_with_bodies_can_only_merge_with_classes_that_are_ambient;
            break;
        }
        case "arguments_cannot_be_referenced_in_property_initializers_or_class_static_initialization_blocks_2815": {
            return $state.X_arguments_cannot_be_referenced_in_property_initializers_or_class_static_initialization_blocks;
            break;
        }
        case "Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class_2816": {
            return $state.Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class;
            break;
        }
        case "Property_0_has_no_initializer_and_is_not_definitely_assigned_in_a_class_static_block_2817": {
            return $state.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_a_class_static_block;
            break;
        }
        case "Duplicate_identifier_0_Compiler_reserves_name_1_when_emitting_super_references_in_static_initializer_2818": {
            return $state.Duplicate_identifier_0_Compiler_reserves_name_1_when_emitting_super_references_in_static_initializers;
            break;
        }
        case "Namespace_name_cannot_be_0_2819": {
            return $state.Namespace_name_cannot_be_0;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_Did_you_mean_2_2820": {
            return $state.Type_0_is_not_assignable_to_type_1_Did_you_mean_2;
            break;
        }
        case "Import_assertions_are_only_supported_when_the_module_option_is_set_to_esnext_node18_node20_nodenext__2821": {
            return $state.Import_assertions_are_only_supported_when_the_module_option_is_set_to_esnext_node18_node20_nodenext_or_preserve;
            break;
        }
        case "Import_assertions_cannot_be_used_with_type_only_imports_or_exports_2822": {
            return $state.Import_assertions_cannot_be_used_with_type_only_imports_or_exports;
            break;
        }
        case "Import_attributes_are_only_supported_when_the_module_option_is_set_to_esnext_node18_node20_nodenext__2823": {
            return $state.Import_attributes_are_only_supported_when_the_module_option_is_set_to_esnext_node18_node20_nodenext_or_preserve;
            break;
        }
        case "Cannot_find_namespace_0_Did_you_mean_1_2833": {
            return $state.Cannot_find_namespace_0_Did_you_mean_1;
            break;
        }
        case "Relative_import_paths_need_explicit_file_extensions_in_ECMAScript_imports_when_moduleResolution_is_n_2834": {
            return $state.Relative_import_paths_need_explicit_file_extensions_in_ECMAScript_imports_when_moduleResolution_is_node16_or_nodenext_Consider_adding_an_extension_to_the_import_path;
            break;
        }
        case "Relative_import_paths_need_explicit_file_extensions_in_ECMAScript_imports_when_moduleResolution_is_n_2835": {
            return $state.Relative_import_paths_need_explicit_file_extensions_in_ECMAScript_imports_when_moduleResolution_is_node16_or_nodenext_Did_you_mean_0;
            break;
        }
        case "Import_assertions_are_not_allowed_on_statements_that_compile_to_CommonJS_require_calls_2836": {
            return $state.Import_assertions_are_not_allowed_on_statements_that_compile_to_CommonJS_require_calls;
            break;
        }
        case "Import_assertion_values_must_be_string_literal_expressions_2837": {
            return $state.Import_assertion_values_must_be_string_literal_expressions;
            break;
        }
        case "All_declarations_of_0_must_have_identical_constraints_2838": {
            return $state.All_declarations_of_0_must_have_identical_constraints;
            break;
        }
        case "This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value_2839": {
            return $state.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value;
            break;
        }
        case "An_interface_cannot_extend_a_primitive_type_like_0_It_can_only_extend_other_named_object_types_2840": {
            return $state.An_interface_cannot_extend_a_primitive_type_like_0_It_can_only_extend_other_named_object_types;
            break;
        }
        case "_0_is_an_unused_renaming_of_1_Did_you_intend_to_use_it_as_a_type_annotation_2842": {
            return $state.X_0_is_an_unused_renaming_of_1_Did_you_intend_to_use_it_as_a_type_annotation;
            break;
        }
        case "We_can_only_write_a_type_for_0_by_adding_a_type_for_the_entire_parameter_here_2843": {
            return $state.We_can_only_write_a_type_for_0_by_adding_a_type_for_the_entire_parameter_here;
            break;
        }
        case "Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor_2844": {
            return $state.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor;
            break;
        }
        case "This_condition_will_always_return_0_2845": {
            return $state.This_condition_will_always_return_0;
            break;
        }
        case "A_declaration_file_cannot_be_imported_without_import_type_Did_you_mean_to_import_an_implementation_f_2846": {
            return $state.A_declaration_file_cannot_be_imported_without_import_type_Did_you_mean_to_import_an_implementation_file_0_instead;
            break;
        }
        case "The_right_hand_side_of_an_instanceof_expression_must_not_be_an_instantiation_expression_2848": {
            return $state.The_right_hand_side_of_an_instanceof_expression_must_not_be_an_instantiation_expression;
            break;
        }
        case "Target_signature_provides_too_few_arguments_Expected_0_or_more_but_got_1_2849": {
            return $state.Target_signature_provides_too_few_arguments_Expected_0_or_more_but_got_1;
            break;
        }
        case "The_initializer_of_a_using_declaration_must_be_either_an_object_with_a_Symbol_dispose_method_or_be_n_2850": {
            return $state.The_initializer_of_a_using_declaration_must_be_either_an_object_with_a_Symbol_dispose_method_or_be_null_or_undefined;
            break;
        }
        case "The_initializer_of_an_await_using_declaration_must_be_either_an_object_with_a_Symbol_asyncDispose_or_2851": {
            return $state.The_initializer_of_an_await_using_declaration_must_be_either_an_object_with_a_Symbol_asyncDispose_or_Symbol_dispose_method_or_be_null_or_undefined;
            break;
        }
        case "await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules_2852": {
            return $state.X_await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules;
            break;
        }
        case "await_using_statements_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_th_2853": {
            return $state.X_await_using_statements_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module;
            break;
        }
        case "Top_level_await_using_statements_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_sys_2854": {
            return $state.Top_level_await_using_statements_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_node18_node20_nodenext_or_preserve_and_the_target_option_is_set_to_es2017_or_higher;
            break;
        }
        case "Class_field_0_defined_by_the_parent_class_is_not_accessible_in_the_child_class_via_super_2855": {
            return $state.Class_field_0_defined_by_the_parent_class_is_not_accessible_in_the_child_class_via_super;
            break;
        }
        case "Import_attributes_are_not_allowed_on_statements_that_compile_to_CommonJS_require_calls_2856": {
            return $state.Import_attributes_are_not_allowed_on_statements_that_compile_to_CommonJS_require_calls;
            break;
        }
        case "Import_attributes_cannot_be_used_with_type_only_imports_or_exports_2857": {
            return $state.Import_attributes_cannot_be_used_with_type_only_imports_or_exports;
            break;
        }
        case "Import_attribute_values_must_be_string_literal_expressions_2858": {
            return $state.Import_attribute_values_must_be_string_literal_expressions;
            break;
        }
        case "Excessive_complexity_comparing_types_0_and_1_2859": {
            return $state.Excessive_complexity_comparing_types_0_and_1;
            break;
        }
        case "The_left_hand_side_of_an_instanceof_expression_must_be_assignable_to_the_first_argument_of_the_right_2860": {
            return $state.The_left_hand_side_of_an_instanceof_expression_must_be_assignable_to_the_first_argument_of_the_right_hand_side_s_Symbol_hasInstance_method;
            break;
        }
        case "An_object_s_Symbol_hasInstance_method_must_return_a_boolean_value_for_it_to_be_used_on_the_right_han_2861": {
            return $state.An_object_s_Symbol_hasInstance_method_must_return_a_boolean_value_for_it_to_be_used_on_the_right_hand_side_of_an_instanceof_expression;
            break;
        }
        case "Type_0_is_generic_and_can_only_be_indexed_for_reading_2862": {
            return $state.Type_0_is_generic_and_can_only_be_indexed_for_reading;
            break;
        }
        case "A_class_cannot_extend_a_primitive_type_like_0_Classes_can_only_extend_constructable_values_2863": {
            return $state.A_class_cannot_extend_a_primitive_type_like_0_Classes_can_only_extend_constructable_values;
            break;
        }
        case "A_class_cannot_implement_a_primitive_type_like_0_It_can_only_implement_other_named_object_types_2864": {
            return $state.A_class_cannot_implement_a_primitive_type_like_0_It_can_only_implement_other_named_object_types;
            break;
        }
        case "Import_0_conflicts_with_local_value_so_must_be_declared_with_a_type_only_import_when_isolatedModules_2865": {
            return $state.Import_0_conflicts_with_local_value_so_must_be_declared_with_a_type_only_import_when_isolatedModules_is_enabled;
            break;
        }
        case "Import_0_conflicts_with_global_value_used_in_this_file_so_must_be_declared_with_a_type_only_import_w_2866": {
            return $state.Import_0_conflicts_with_global_value_used_in_this_file_so_must_be_declared_with_a_type_only_import_when_isolatedModules_is_enabled;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_2867": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun;
            break;
        }
        case "Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_2868": {
            return $state.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_and_then_add_bun_to_the_types_field_in_your_tsconfig;
            break;
        }
        case "Right_operand_of_is_unreachable_because_the_left_operand_is_never_nullish_2869": {
            return $state.Right_operand_of_is_unreachable_because_the_left_operand_is_never_nullish;
            break;
        }
        case "This_binary_expression_is_never_nullish_Are_you_missing_parentheses_2870": {
            return $state.This_binary_expression_is_never_nullish_Are_you_missing_parentheses;
            break;
        }
        case "This_expression_is_always_nullish_2871": {
            return $state.This_expression_is_always_nullish;
            break;
        }
        case "This_kind_of_expression_is_always_truthy_2872": {
            return $state.This_kind_of_expression_is_always_truthy;
            break;
        }
        case "This_kind_of_expression_is_always_falsy_2873": {
            return $state.This_kind_of_expression_is_always_falsy;
            break;
        }
        case "This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found_2874": {
            return $state.This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found;
            break;
        }
        case "This_JSX_tag_requires_the_module_path_0_to_exist_but_none_could_be_found_Make_sure_you_have_types_fo_2875": {
            return $state.This_JSX_tag_requires_the_module_path_0_to_exist_but_none_could_be_found_Make_sure_you_have_types_for_the_appropriate_package_installed;
            break;
        }
        case "This_relative_import_path_is_unsafe_to_rewrite_because_it_looks_like_a_file_name_but_actually_resolv_2876": {
            return $state.This_relative_import_path_is_unsafe_to_rewrite_because_it_looks_like_a_file_name_but_actually_resolves_to_0;
            break;
        }
        case "This_import_uses_a_0_extension_to_resolve_to_an_input_TypeScript_file_but_will_not_be_rewritten_duri_2877": {
            return $state.This_import_uses_a_0_extension_to_resolve_to_an_input_TypeScript_file_but_will_not_be_rewritten_during_emit_because_it_is_not_a_relative_path;
            break;
        }
        case "This_import_path_is_unsafe_to_rewrite_because_it_resolves_to_another_project_and_the_relative_path_b_2878": {
            return $state.This_import_path_is_unsafe_to_rewrite_because_it_resolves_to_another_project_and_the_relative_path_between_the_projects_output_files_is_not_the_same_as_the_relative_path_between_its_input_files;
            break;
        }
        case "Using_JSX_fragments_requires_fragment_factory_0_to_be_in_scope_but_it_could_not_be_found_2879": {
            return $state.Using_JSX_fragments_requires_fragment_factory_0_to_be_in_scope_but_it_could_not_be_found;
            break;
        }
        case "Import_assertions_have_been_replaced_by_import_attributes_Use_with_instead_of_assert_2880": {
            return $state.Import_assertions_have_been_replaced_by_import_attributes_Use_with_instead_of_assert;
            break;
        }
        case "This_expression_is_never_nullish_2881": {
            return $state.This_expression_is_never_nullish;
            break;
        }
        case "Cannot_find_module_or_type_declarations_for_side_effect_import_of_0_2882": {
            return $state.Cannot_find_module_or_type_declarations_for_side_effect_import_of_0;
            break;
        }
        case "The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883": {
            return $state.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_type_annotation_is_necessary;
            break;
        }
        case "Import_declaration_0_is_using_private_name_1_4000": {
            return $state.Import_declaration_0_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_exported_class_has_or_is_using_private_name_1_4002": {
            return $state.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1_4004": {
            return $state.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4006": {
            return $state.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4008": {
            return $state.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4010": {
            return $state.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4012": {
            return $state.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4014": {
            return $state.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_exported_function_has_or_is_using_private_name_1_4016": {
            return $state.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
            break;
        }
        case "Implements_clause_of_exported_class_0_has_or_is_using_private_name_1_4019": {
            return $state.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1;
            break;
        }
        case "extends_clause_of_exported_class_0_has_or_is_using_private_name_1_4020": {
            return $state.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
            break;
        }
        case "extends_clause_of_exported_class_has_or_is_using_private_name_0_4021": {
            return $state.X_extends_clause_of_exported_class_has_or_is_using_private_name_0;
            break;
        }
        case "extends_clause_of_exported_interface_0_has_or_is_using_private_name_1_4022": {
            return $state.X_extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
            break;
        }
        case "Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023": {
            return $state.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Exported_variable_0_has_or_is_using_name_1_from_private_module_2_4024": {
            return $state.Exported_variable_0_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Exported_variable_0_has_or_is_using_private_name_1_4025": {
            return $state.Exported_variable_0_has_or_is_using_private_name_1;
            break;
        }
        case "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot__4026": {
            return $state.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4027": {
            return $state.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Public_static_property_0_of_exported_class_has_or_is_using_private_name_1_4028": {
            return $state.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_name_4029": {
            return $state.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4030": {
            return $state.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Public_property_0_of_exported_class_has_or_is_using_private_name_1_4031": {
            return $state.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2_4032": {
            return $state.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Property_0_of_exported_interface_has_or_is_using_private_name_1_4033": {
            return $state.Property_0_of_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_mod_4034": {
            return $state.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1_4035": {
            return $state.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2_4036": {
            return $state.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1_4037": {
            return $state.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_modul_4038": {
            return $state.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_4039": {
            return $state.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1_4040": {
            return $state.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_4041": {
            return $state.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2_4042": {
            return $state.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1_4043": {
            return $state.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_mod_4044": {
            return $state.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0_4045": {
            return $state.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4046": {
            return $state.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0_4047": {
            return $state.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4048": {
            return $state.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0_4049": {
            return $state.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module__4050": {
            return $state.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named;
            break;
        }
        case "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4051": {
            return $state.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0_4052": {
            return $state.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_c_4053": {
            return $state.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named;
            break;
        }
        case "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4054": {
            return $state.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0_4055": {
            return $state.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4056": {
            return $state.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0_4057": {
            return $state.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
            break;
        }
        case "Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named_4058": {
            return $state.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named;
            break;
        }
        case "Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1_4059": {
            return $state.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1;
            break;
        }
        case "Return_type_of_exported_function_has_or_is_using_private_name_0_4060": {
            return $state.Return_type_of_exported_function_has_or_is_using_private_name_0;
            break;
        }
        case "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_can_4061": {
            return $state.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2_4062": {
            return $state.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1_4063": {
            return $state.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_mod_4064": {
            return $state.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4065": {
            return $state.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4066": {
            return $state.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4067": {
            return $state.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module__4068": {
            return $state.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4069": {
            return $state.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4070": {
            return $state.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_c_4071": {
            return $state.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4072": {
            return $state.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4073": {
            return $state.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4074": {
            return $state.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4075": {
            return $state.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4076": {
            return $state.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2_4077": {
            return $state.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_exported_function_has_or_is_using_private_name_1_4078": {
            return $state.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
            break;
        }
        case "Exported_type_alias_0_has_or_is_using_private_name_1_4081": {
            return $state.Exported_type_alias_0_has_or_is_using_private_name_1;
            break;
        }
        case "Default_export_of_the_module_has_or_is_using_private_name_0_4082": {
            return $state.Default_export_of_the_module_has_or_is_using_private_name_0;
            break;
        }
        case "Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1_4083": {
            return $state.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
            break;
        }
        case "Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2_4084": {
            return $state.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2;
            break;
        }
        case "Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1_4085": {
            return $state.Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4091": {
            return $state.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1_4092": {
            return $state.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094": {
            return $state.Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected;
            break;
        }
        case "Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_4095": {
            return $state.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4096": {
            return $state.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Public_static_method_0_of_exported_class_has_or_is_using_private_name_1_4097": {
            return $state.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4098": {
            return $state.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4099": {
            return $state.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Public_method_0_of_exported_class_has_or_is_using_private_name_1_4100": {
            return $state.Public_method_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case "Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2_4101": {
            return $state.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Method_0_of_exported_interface_has_or_is_using_private_name_1_4102": {
            return $state.Method_0_of_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case "Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1_4103": {
            return $state.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1;
            break;
        }
        case "The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1_4104": {
            return $state.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1;
            break;
        }
        case "Private_or_protected_member_0_cannot_be_accessed_on_a_type_parameter_4105": {
            return $state.Private_or_protected_member_0_cannot_be_accessed_on_a_type_parameter;
            break;
        }
        case "Parameter_0_of_accessor_has_or_is_using_private_name_1_4106": {
            return $state.Parameter_0_of_accessor_has_or_is_using_private_name_1;
            break;
        }
        case "Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2_4107": {
            return $state.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2;
            break;
        }
        case "Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4108": {
            return $state.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named;
            break;
        }
        case "Type_arguments_for_0_circularly_reference_themselves_4109": {
            return $state.Type_arguments_for_0_circularly_reference_themselves;
            break;
        }
        case "Tuple_type_arguments_circularly_reference_themselves_4110": {
            return $state.Tuple_type_arguments_circularly_reference_themselves;
            break;
        }
        case "Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0_4111": {
            return $state.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0;
            break;
        }
        case "This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another__4112": {
            return $state.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class;
            break;
        }
        case "This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_4113": {
            return $state.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0;
            break;
        }
        case "This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0_4114": {
            return $state.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0;
            break;
        }
        case "This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0_4115": {
            return $state.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0;
            break;
        }
        case "This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared__4116": {
            return $state.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0;
            break;
        }
        case "This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_Did_you__4117": {
            return $state.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1;
            break;
        }
        case "The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized_4118": {
            return $state.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized;
            break;
        }
        case "This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_4119": {
            return $state.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0;
            break;
        }
        case "This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_4120": {
            return $state.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0;
            break;
        }
        case "This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_4121": {
            return $state.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class;
            break;
        }
        case "This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base__4122": {
            return $state.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0;
            break;
        }
        case "This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base__4123": {
            return $state.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1;
            break;
        }
        case "Compiler_option_0_of_value_1_is_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_w_4124": {
            return $state.Compiler_option_0_of_value_1_is_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next;
            break;
        }
        case "Each_declaration_of_0_1_differs_in_its_value_where_2_was_expected_but_3_was_given_4125": {
            return $state.Each_declaration_of_0_1_differs_in_its_value_where_2_was_expected_but_3_was_given;
            break;
        }
        case "One_value_of_0_1_is_the_string_2_and_the_other_is_assumed_to_be_an_unknown_numeric_value_4126": {
            return $state.One_value_of_0_1_is_the_string_2_and_the_other_is_assumed_to_be_an_unknown_numeric_value;
            break;
        }
        case "This_member_cannot_have_an_override_modifier_because_its_name_is_dynamic_4127": {
            return $state.This_member_cannot_have_an_override_modifier_because_its_name_is_dynamic;
            break;
        }
        case "This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_name_is_dynamic_4128": {
            return $state.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_name_is_dynamic;
            break;
        }
        case "The_current_host_does_not_support_the_0_option_5001": {
            return $state.The_current_host_does_not_support_the_0_option;
            break;
        }
        case "Option_0_requires_value_to_be_greater_than_1_5002": {
            return $state.Option_0_requires_value_to_be_greater_than_1;
            break;
        }
        case "Cannot_find_the_common_subdirectory_path_for_the_input_files_5009": {
            return $state.Cannot_find_the_common_subdirectory_path_for_the_input_files;
            break;
        }
        case "File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0_5010": {
            return $state.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
            break;
        }
        case "The_common_source_directory_of_0_is_1_The_rootDir_setting_must_be_explicitly_set_to_this_or_another__5011": {
            return $state.The_common_source_directory_of_0_is_1_The_rootDir_setting_must_be_explicitly_set_to_this_or_another_path_to_adjust_your_output_s_file_layout;
            break;
        }
        case "Cannot_read_file_0_Colon_1_5012": {
            return $state.Cannot_read_file_0_Colon_1;
            break;
        }
        case "Unknown_compiler_option_0_5023": {
            return $state.Unknown_compiler_option_0;
            break;
        }
        case "Compiler_option_0_requires_a_value_of_type_1_5024": {
            return $state.Compiler_option_0_requires_a_value_of_type_1;
            break;
        }
        case "Unknown_compiler_option_0_Did_you_mean_1_5025": {
            return $state.Unknown_compiler_option_0_Did_you_mean_1;
            break;
        }
        case "Could_not_write_file_0_Colon_1_5033": {
            return $state.Could_not_write_file_0_Colon_1;
            break;
        }
        case "Option_project_cannot_be_mixed_with_source_files_on_a_command_line_5042": {
            return $state.Option_project_cannot_be_mixed_with_source_files_on_a_command_line;
            break;
        }
        case "Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES_5047": {
            return $state.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher;
            break;
        }
        case "Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided_5051": {
            return $state.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided;
            break;
        }
        case "Option_0_cannot_be_specified_without_specifying_option_1_5052": {
            return $state.Option_0_cannot_be_specified_without_specifying_option_1;
            break;
        }
        case "Option_0_cannot_be_specified_with_option_1_5053": {
            return $state.Option_0_cannot_be_specified_with_option_1;
            break;
        }
        case "A_tsconfig_json_file_is_already_defined_at_Colon_0_5054": {
            return $state.A_tsconfig_json_file_is_already_defined_at_Colon_0;
            break;
        }
        case "Cannot_write_file_0_because_it_would_overwrite_input_file_5055": {
            return $state.Cannot_write_file_0_because_it_would_overwrite_input_file;
            break;
        }
        case "Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files_5056": {
            return $state.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files;
            break;
        }
        case "Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0_5057": {
            return $state.Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0;
            break;
        }
        case "The_specified_path_does_not_exist_Colon_0_5058": {
            return $state.The_specified_path_does_not_exist_Colon_0;
            break;
        }
        case "Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier_5059": {
            return $state.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier;
            break;
        }
        case "Pattern_0_can_have_at_most_one_Asterisk_character_5061": {
            return $state.Pattern_0_can_have_at_most_one_Asterisk_character;
            break;
        }
        case "Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character_5062": {
            return $state.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character;
            break;
        }
        case "Substitutions_for_pattern_0_should_be_an_array_5063": {
            return $state.Substitutions_for_pattern_0_should_be_an_array;
            break;
        }
        case "Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2_5064": {
            return $state.Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2;
            break;
        }
        case "File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildca_5065": {
            return $state.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
            break;
        }
        case "Substitutions_for_pattern_0_shouldn_t_be_an_empty_array_5066": {
            return $state.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array;
            break;
        }
        case "Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name_5067": {
            return $state.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name;
            break;
        }
        case "Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript__5068": {
            return $state.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig;
            break;
        }
        case "Option_0_cannot_be_specified_without_specifying_option_1_or_option_2_5069": {
            return $state.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
            break;
        }
        case "Option_resolveJsonModule_cannot_be_specified_when_moduleResolution_is_set_to_classic_5070": {
            return $state.Option_resolveJsonModule_cannot_be_specified_when_moduleResolution_is_set_to_classic;
            break;
        }
        case "Option_resolveJsonModule_cannot_be_specified_when_module_is_set_to_none_system_or_umd_5071": {
            return $state.Option_resolveJsonModule_cannot_be_specified_when_module_is_set_to_none_system_or_umd;
            break;
        }
        case "Unknown_build_option_0_5072": {
            return $state.Unknown_build_option_0;
            break;
        }
        case "Build_option_0_requires_a_value_of_type_1_5073": {
            return $state.Build_option_0_requires_a_value_of_type_1;
            break;
        }
        case "Option_incremental_is_only_valid_with_a_known_configuration_file_like_tsconfig_json_or_when_tsBuildI_5074": {
            return $state.Option_incremental_is_only_valid_with_a_known_configuration_file_like_tsconfig_json_or_when_tsBuildInfoFile_is_explicitly_provided;
            break;
        }
        case "_0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_5075": {
            return $state.X_0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2;
            break;
        }
        case "_0_and_1_operations_cannot_be_mixed_without_parentheses_5076": {
            return $state.X_0_and_1_operations_cannot_be_mixed_without_parentheses;
            break;
        }
        case "Unknown_build_option_0_Did_you_mean_1_5077": {
            return $state.Unknown_build_option_0_Did_you_mean_1;
            break;
        }
        case "Unknown_watch_option_0_5078": {
            return $state.Unknown_watch_option_0;
            break;
        }
        case "Unknown_watch_option_0_Did_you_mean_1_5079": {
            return $state.Unknown_watch_option_0_Did_you_mean_1;
            break;
        }
        case "Watch_option_0_requires_a_value_of_type_1_5080": {
            return $state.Watch_option_0_requires_a_value_of_type_1;
            break;
        }
        case "Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0_5081": {
            return $state.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0;
            break;
        }
        case "_0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1_5082": {
            return $state.X_0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1;
            break;
        }
        case "Cannot_read_file_0_5083": {
            return $state.Cannot_read_file_0;
            break;
        }
        case "A_tuple_member_cannot_be_both_optional_and_rest_5085": {
            return $state.A_tuple_member_cannot_be_both_optional_and_rest;
            break;
        }
        case "A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_c_5086": {
            return $state.A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_colon_rather_than_after_the_type;
            break;
        }
        case "A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type_5087": {
            return $state.A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type;
            break;
        }
        case "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088": {
            return $state.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary;
            break;
        }
        case "Option_0_cannot_be_specified_when_option_jsx_is_1_5089": {
            return $state.Option_0_cannot_be_specified_when_option_jsx_is_1;
            break;
        }
        case "Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash_5090": {
            return $state.Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash;
            break;
        }
        case "Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled_5091": {
            return $state.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled;
            break;
        }
        case "The_root_value_of_a_0_file_must_be_an_object_5092": {
            return $state.The_root_value_of_a_0_file_must_be_an_object;
            break;
        }
        case "Compiler_option_0_may_only_be_used_with_build_5093": {
            return $state.Compiler_option_0_may_only_be_used_with_build;
            break;
        }
        case "Compiler_option_0_may_not_be_used_with_build_5094": {
            return $state.Compiler_option_0_may_not_be_used_with_build;
            break;
        }
        case "Option_0_can_only_be_used_when_module_is_set_to_preserve_commonjs_or_es2015_or_later_5095": {
            return $state.Option_0_can_only_be_used_when_module_is_set_to_preserve_commonjs_or_es2015_or_later;
            break;
        }
        case "Option_allowImportingTsExtensions_can_only_be_used_when_one_of_noEmit_emitDeclarationOnly_or_rewrite_5096": {
            return $state.Option_allowImportingTsExtensions_can_only_be_used_when_one_of_noEmit_emitDeclarationOnly_or_rewriteRelativeImportExtensions_is_set;
            break;
        }
        case "An_import_path_can_only_end_with_a_0_extension_when_allowImportingTsExtensions_is_enabled_5097": {
            return $state.An_import_path_can_only_end_with_a_0_extension_when_allowImportingTsExtensions_is_enabled;
            break;
        }
        case "Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler_5098": {
            return $state.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler;
            break;
        }
        case "Option_0_is_deprecated_and_will_stop_functioning_in_TypeScript_1_Specify_compilerOption_ignoreDeprec_5101": {
            return $state.Option_0_is_deprecated_and_will_stop_functioning_in_TypeScript_1_Specify_compilerOption_ignoreDeprecations_Colon_2_to_silence_this_error;
            break;
        }
        case "Option_0_has_been_removed_Please_remove_it_from_your_configuration_5102": {
            return $state.Option_0_has_been_removed_Please_remove_it_from_your_configuration;
            break;
        }
        case "Invalid_value_for_ignoreDeprecations_5103": {
            return $state.Invalid_value_for_ignoreDeprecations;
            break;
        }
        case "Option_0_is_redundant_and_cannot_be_specified_with_option_1_5104": {
            return $state.Option_0_is_redundant_and_cannot_be_specified_with_option_1;
            break;
        }
        case "Option_verbatimModuleSyntax_cannot_be_used_when_module_is_set_to_UMD_AMD_or_System_5105": {
            return $state.Option_verbatimModuleSyntax_cannot_be_used_when_module_is_set_to_UMD_AMD_or_System;
            break;
        }
        case "Use_0_instead_5106": {
            return $state.Use_0_instead;
            break;
        }
        case "Option_0_1_is_deprecated_and_will_stop_functioning_in_TypeScript_2_Specify_compilerOption_ignoreDepr_5107": {
            return $state.Option_0_1_is_deprecated_and_will_stop_functioning_in_TypeScript_2_Specify_compilerOption_ignoreDeprecations_Colon_3_to_silence_this_error;
            break;
        }
        case "Option_0_1_has_been_removed_Please_remove_it_from_your_configuration_5108": {
            return $state.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration;
            break;
        }
        case "Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1_5109": {
            return $state.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1;
            break;
        }
        case "Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1_5110": {
            return $state.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1;
            break;
        }
        case "Visit_https_Colon_Slash_Slashaka_ms_Slashts6_for_migration_information_5111": {
            return $state.Visit_https_Colon_Slash_Slashaka_ms_Slashts6_for_migration_information;
            break;
        }
        case "tsconfig_json_is_present_but_will_not_be_loaded_if_files_are_specified_on_commandline_Use_ignoreConf_5112": {
            return $state.X_tsconfig_json_is_present_but_will_not_be_loaded_if_files_are_specified_on_commandline_Use_ignoreConfig_to_skip_this_error;
            break;
        }
        case "Generates_a_sourcemap_for_each_corresponding_d_ts_file_6000": {
            return $state.Generates_a_sourcemap_for_each_corresponding_d_ts_file;
            break;
        }
        case "Concatenate_and_emit_output_to_single_file_6001": {
            return $state.Concatenate_and_emit_output_to_single_file;
            break;
        }
        case "Generates_corresponding_d_ts_file_6002": {
            return $state.Generates_corresponding_d_ts_file;
            break;
        }
        case "Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations_6004": {
            return $state.Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations;
            break;
        }
        case "Watch_input_files_6005": {
            return $state.Watch_input_files;
            break;
        }
        case "Redirect_output_structure_to_the_directory_6006": {
            return $state.Redirect_output_structure_to_the_directory;
            break;
        }
        case "Do_not_erase_const_enum_declarations_in_generated_code_6007": {
            return $state.Do_not_erase_const_enum_declarations_in_generated_code;
            break;
        }
        case "Do_not_emit_outputs_if_any_errors_were_reported_6008": {
            return $state.Do_not_emit_outputs_if_any_errors_were_reported;
            break;
        }
        case "Do_not_emit_comments_to_output_6009": {
            return $state.Do_not_emit_comments_to_output;
            break;
        }
        case "Do_not_emit_outputs_6010": {
            return $state.Do_not_emit_outputs;
            break;
        }
        case "Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typech_6011": {
            return $state.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking;
            break;
        }
        case "Skip_type_checking_of_declaration_files_6012": {
            return $state.Skip_type_checking_of_declaration_files;
            break;
        }
        case "Do_not_resolve_the_real_path_of_symlinks_6013": {
            return $state.Do_not_resolve_the_real_path_of_symlinks;
            break;
        }
        case "Only_emit_d_ts_declaration_files_6014": {
            return $state.Only_emit_d_ts_declaration_files;
            break;
        }
        case "Specify_ECMAScript_target_version_6015": {
            return $state.Specify_ECMAScript_target_version;
            break;
        }
        case "Specify_module_code_generation_6016": {
            return $state.Specify_module_code_generation;
            break;
        }
        case "Print_this_message_6017": {
            return $state.Print_this_message;
            break;
        }
        case "Print_the_compiler_s_version_6019": {
            return $state.Print_the_compiler_s_version;
            break;
        }
        case "Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json_6020": {
            return $state.Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json;
            break;
        }
        case "Syntax_Colon_0_6023": {
            return $state.Syntax_Colon_0;
            break;
        }
        case "options_6024": {
            return $state.X_options;
            break;
        }
        case "file_6025": {
            return $state.X_file;
            break;
        }
        case "Examples_Colon_0_6026": {
            return $state.Examples_Colon_0;
            break;
        }
        case "Options_Colon_6027": {
            return $state.Options_Colon;
            break;
        }
        case "Version_0_6029": {
            return $state.Version_0;
            break;
        }
        case "Insert_command_line_options_and_files_from_a_file_6030": {
            return $state.Insert_command_line_options_and_files_from_a_file;
            break;
        }
        case "Starting_compilation_in_watch_mode_6031": {
            return $state.Starting_compilation_in_watch_mode;
            break;
        }
        case "File_change_detected_Starting_incremental_compilation_6032": {
            return $state.File_change_detected_Starting_incremental_compilation;
            break;
        }
        case "KIND_6034": {
            return $state.KIND;
            break;
        }
        case "FILE_6035": {
            return $state.FILE;
            break;
        }
        case "VERSION_6036": {
            return $state.VERSION;
            break;
        }
        case "LOCATION_6037": {
            return $state.LOCATION;
            break;
        }
        case "DIRECTORY_6038": {
            return $state.DIRECTORY;
            break;
        }
        case "STRATEGY_6039": {
            return $state.STRATEGY;
            break;
        }
        case "FILE_OR_DIRECTORY_6040": {
            return $state.FILE_OR_DIRECTORY;
            break;
        }
        case "Errors_Files_6041": {
            return $state.Errors_Files;
            break;
        }
        case "Generates_corresponding_map_file_6043": {
            return $state.Generates_corresponding_map_file;
            break;
        }
        case "Compiler_option_0_expects_an_argument_6044": {
            return $state.Compiler_option_0_expects_an_argument;
            break;
        }
        case "Unterminated_quoted_string_in_response_file_0_6045": {
            return $state.Unterminated_quoted_string_in_response_file_0;
            break;
        }
        case "Argument_for_0_option_must_be_Colon_1_6046": {
            return $state.Argument_for_0_option_must_be_Colon_1;
            break;
        }
        case "Locale_must_be_an_IETF_BCP_47_language_tag_Examples_Colon_0_1_6048": {
            return $state.Locale_must_be_an_IETF_BCP_47_language_tag_Examples_Colon_0_1;
            break;
        }
        case "Unable_to_open_file_0_6050": {
            return $state.Unable_to_open_file_0;
            break;
        }
        case "Corrupted_locale_file_0_6051": {
            return $state.Corrupted_locale_file_0;
            break;
        }
        case "Raise_error_on_expressions_and_declarations_with_an_implied_any_type_6052": {
            return $state.Raise_error_on_expressions_and_declarations_with_an_implied_any_type;
            break;
        }
        case "File_0_not_found_6053": {
            return $state.File_0_not_found;
            break;
        }
        case "File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1_6054": {
            return $state.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1;
            break;
        }
        case "Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures_6055": {
            return $state.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures;
            break;
        }
        case "Do_not_emit_declarations_for_code_that_has_an_internal_annotation_6056": {
            return $state.Do_not_emit_declarations_for_code_that_has_an_internal_annotation;
            break;
        }
        case "Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir_6058": {
            return $state.Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir;
            break;
        }
        case "File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files_6059": {
            return $state.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files;
            break;
        }
        case "Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix_6060": {
            return $state.Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix;
            break;
        }
        case "NEWLINE_6061": {
            return $state.NEWLINE;
            break;
        }
        case "Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line_6064": {
            return $state.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line;
            break;
        }
        case "Enables_experimental_support_for_ES7_decorators_6065": {
            return $state.Enables_experimental_support_for_ES7_decorators;
            break;
        }
        case "Enables_experimental_support_for_emitting_type_metadata_for_decorators_6066": {
            return $state.Enables_experimental_support_for_emitting_type_metadata_for_decorators;
            break;
        }
        case "Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file_6070": {
            return $state.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file;
            break;
        }
        case "Successfully_created_a_tsconfig_json_file_6071": {
            return $state.Successfully_created_a_tsconfig_json_file;
            break;
        }
        case "Suppress_excess_property_checks_for_object_literals_6072": {
            return $state.Suppress_excess_property_checks_for_object_literals;
            break;
        }
        case "Stylize_errors_and_messages_using_color_and_context_experimental_6073": {
            return $state.Stylize_errors_and_messages_using_color_and_context_experimental;
            break;
        }
        case "Do_not_report_errors_on_unused_labels_6074": {
            return $state.Do_not_report_errors_on_unused_labels;
            break;
        }
        case "Report_error_when_not_all_code_paths_in_function_return_a_value_6075": {
            return $state.Report_error_when_not_all_code_paths_in_function_return_a_value;
            break;
        }
        case "Report_errors_for_fallthrough_cases_in_switch_statement_6076": {
            return $state.Report_errors_for_fallthrough_cases_in_switch_statement;
            break;
        }
        case "Do_not_report_errors_on_unreachable_code_6077": {
            return $state.Do_not_report_errors_on_unreachable_code;
            break;
        }
        case "Disallow_inconsistently_cased_references_to_the_same_file_6078": {
            return $state.Disallow_inconsistently_cased_references_to_the_same_file;
            break;
        }
        case "Specify_library_files_to_be_included_in_the_compilation_6079": {
            return $state.Specify_library_files_to_be_included_in_the_compilation;
            break;
        }
        case "Specify_JSX_code_generation_6080": {
            return $state.Specify_JSX_code_generation;
            break;
        }
        case "Only_amd_and_system_modules_are_supported_alongside_0_6082": {
            return $state.Only_amd_and_system_modules_are_supported_alongside_0;
            break;
        }
        case "Base_directory_to_resolve_non_absolute_module_names_6083": {
            return $state.Base_directory_to_resolve_non_absolute_module_names;
            break;
        }
        case "Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react__6084": {
            return $state.Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react_JSX_emit;
            break;
        }
        case "Enable_tracing_of_the_name_resolution_process_6085": {
            return $state.Enable_tracing_of_the_name_resolution_process;
            break;
        }
        case "Resolving_module_0_from_1_6086": {
            return $state.Resolving_module_0_from_1;
            break;
        }
        case "Explicitly_specified_module_resolution_kind_Colon_0_6087": {
            return $state.Explicitly_specified_module_resolution_kind_Colon_0;
            break;
        }
        case "Module_resolution_kind_is_not_specified_using_0_6088": {
            return $state.Module_resolution_kind_is_not_specified_using_0;
            break;
        }
        case "Module_name_0_was_successfully_resolved_to_1_6089": {
            return $state.Module_name_0_was_successfully_resolved_to_1;
            break;
        }
        case "Module_name_0_was_not_resolved_6090": {
            return $state.Module_name_0_was_not_resolved;
            break;
        }
        case "paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0_6091": {
            return $state.X_paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0;
            break;
        }
        case "Module_name_0_matched_pattern_1_6092": {
            return $state.Module_name_0_matched_pattern_1;
            break;
        }
        case "Trying_substitution_0_candidate_module_location_Colon_1_6093": {
            return $state.Trying_substitution_0_candidate_module_location_Colon_1;
            break;
        }
        case "Resolving_module_name_0_relative_to_base_url_1_2_6094": {
            return $state.Resolving_module_name_0_relative_to_base_url_1_2;
            break;
        }
        case "Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1_6095": {
            return $state.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1;
            break;
        }
        case "File_0_does_not_exist_6096": {
            return $state.File_0_does_not_exist;
            break;
        }
        case "File_0_exists_use_it_as_a_name_resolution_result_6097": {
            return $state.File_0_exists_use_it_as_a_name_resolution_result;
            break;
        }
        case "Loading_module_0_from_node_modules_folder_target_file_types_Colon_1_6098": {
            return $state.Loading_module_0_from_node_modules_folder_target_file_types_Colon_1;
            break;
        }
        case "Found_package_json_at_0_6099": {
            return $state.Found_package_json_at_0;
            break;
        }
        case "package_json_does_not_have_a_0_field_6100": {
            return $state.X_package_json_does_not_have_a_0_field;
            break;
        }
        case "package_json_has_0_field_1_that_references_2_6101": {
            return $state.X_package_json_has_0_field_1_that_references_2;
            break;
        }
        case "Allow_javascript_files_to_be_compiled_6102": {
            return $state.Allow_javascript_files_to_be_compiled;
            break;
        }
        case "Checking_if_0_is_the_longest_matching_prefix_for_1_2_6104": {
            return $state.Checking_if_0_is_the_longest_matching_prefix_for_1_2;
            break;
        }
        case "Expected_type_of_0_field_in_package_json_to_be_1_got_2_6105": {
            return $state.Expected_type_of_0_field_in_package_json_to_be_1_got_2;
            break;
        }
        case "baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1_6106": {
            return $state.X_baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1;
            break;
        }
        case "rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0_6107": {
            return $state.X_rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0;
            break;
        }
        case "Longest_matching_prefix_for_0_is_1_6108": {
            return $state.Longest_matching_prefix_for_0_is_1;
            break;
        }
        case "Loading_0_from_the_root_dir_1_candidate_location_2_6109": {
            return $state.Loading_0_from_the_root_dir_1_candidate_location_2;
            break;
        }
        case "Trying_other_entries_in_rootDirs_6110": {
            return $state.Trying_other_entries_in_rootDirs;
            break;
        }
        case "Module_resolution_using_rootDirs_has_failed_6111": {
            return $state.Module_resolution_using_rootDirs_has_failed;
            break;
        }
        case "Do_not_emit_use_strict_directives_in_module_output_6112": {
            return $state.Do_not_emit_use_strict_directives_in_module_output;
            break;
        }
        case "Enable_strict_null_checks_6113": {
            return $state.Enable_strict_null_checks;
            break;
        }
        case "Unknown_option_excludes_Did_you_mean_exclude_6114": {
            return $state.Unknown_option_excludes_Did_you_mean_exclude;
            break;
        }
        case "Raise_error_on_this_expressions_with_an_implied_any_type_6115": {
            return $state.Raise_error_on_this_expressions_with_an_implied_any_type;
            break;
        }
        case "Resolving_type_reference_directive_0_containing_file_1_root_directory_2_6116": {
            return $state.Resolving_type_reference_directive_0_containing_file_1_root_directory_2;
            break;
        }
        case "Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2_6119": {
            return $state.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2;
            break;
        }
        case "Type_reference_directive_0_was_not_resolved_6120": {
            return $state.Type_reference_directive_0_was_not_resolved;
            break;
        }
        case "Resolving_with_primary_search_path_0_6121": {
            return $state.Resolving_with_primary_search_path_0;
            break;
        }
        case "Root_directory_cannot_be_determined_skipping_primary_search_paths_6122": {
            return $state.Root_directory_cannot_be_determined_skipping_primary_search_paths;
            break;
        }
        case "Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set_6123": {
            return $state.Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set;
            break;
        }
        case "Type_declaration_files_to_be_included_in_compilation_6124": {
            return $state.Type_declaration_files_to_be_included_in_compilation;
            break;
        }
        case "Looking_up_in_node_modules_folder_initial_location_0_6125": {
            return $state.Looking_up_in_node_modules_folder_initial_location_0;
            break;
        }
        case "Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_mod_6126": {
            return $state.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder;
            break;
        }
        case "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1_6127": {
            return $state.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1;
            break;
        }
        case "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set_6128": {
            return $state.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set;
            break;
        }
        case "Resolving_real_path_for_0_result_1_6130": {
            return $state.Resolving_real_path_for_0_result_1;
            break;
        }
        case "Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system_6131": {
            return $state.Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system;
            break;
        }
        case "File_name_0_has_a_1_extension_stripping_it_6132": {
            return $state.File_name_0_has_a_1_extension_stripping_it;
            break;
        }
        case "_0_is_declared_but_its_value_is_never_read_6133": {
            return $state.X_0_is_declared_but_its_value_is_never_read;
            break;
        }
        case "Report_errors_on_unused_locals_6134": {
            return $state.Report_errors_on_unused_locals;
            break;
        }
        case "Report_errors_on_unused_parameters_6135": {
            return $state.Report_errors_on_unused_parameters;
            break;
        }
        case "The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files_6136": {
            return $state.The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files;
            break;
        }
        case "Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1_6137": {
            return $state.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1;
            break;
        }
        case "Property_0_is_declared_but_its_value_is_never_read_6138": {
            return $state.Property_0_is_declared_but_its_value_is_never_read;
            break;
        }
        case "Import_emit_helpers_from_tslib_6139": {
            return $state.Import_emit_helpers_from_tslib;
            break;
        }
        case "Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using__6140": {
            return $state.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2;
            break;
        }
        case "Parse_in_strict_mode_and_emit_use_strict_for_each_source_file_6141": {
            return $state.Parse_in_strict_mode_and_emit_use_strict_for_each_source_file;
            break;
        }
        case "Module_0_was_resolved_to_1_but_jsx_is_not_set_6142": {
            return $state.Module_0_was_resolved_to_1_but_jsx_is_not_set;
            break;
        }
        case "Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1_6144": {
            return $state.Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1;
            break;
        }
        case "Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h_6146": {
            return $state.Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h;
            break;
        }
        case "Resolution_for_module_0_was_found_in_cache_from_location_1_6147": {
            return $state.Resolution_for_module_0_was_found_in_cache_from_location_1;
            break;
        }
        case "Directory_0_does_not_exist_skipping_all_lookups_in_it_6148": {
            return $state.Directory_0_does_not_exist_skipping_all_lookups_in_it;
            break;
        }
        case "Show_diagnostic_information_6149": {
            return $state.Show_diagnostic_information;
            break;
        }
        case "Show_verbose_diagnostic_information_6150": {
            return $state.Show_verbose_diagnostic_information;
            break;
        }
        case "Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file_6151": {
            return $state.Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file;
            break;
        }
        case "Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap__6152": {
            return $state.Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap_to_be_set;
            break;
        }
        case "Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule_6153": {
            return $state.Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule;
            break;
        }
        case "Print_names_of_generated_files_part_of_the_compilation_6154": {
            return $state.Print_names_of_generated_files_part_of_the_compilation;
            break;
        }
        case "Print_names_of_files_part_of_the_compilation_6155": {
            return $state.Print_names_of_files_part_of_the_compilation;
            break;
        }
        case "The_locale_used_when_displaying_messages_to_the_user_e_g_en_us_6156": {
            return $state.The_locale_used_when_displaying_messages_to_the_user_e_g_en_us;
            break;
        }
        case "Do_not_generate_custom_helper_functions_like_extends_in_compiled_output_6157": {
            return $state.Do_not_generate_custom_helper_functions_like_extends_in_compiled_output;
            break;
        }
        case "Do_not_include_the_default_library_file_lib_d_ts_6158": {
            return $state.Do_not_include_the_default_library_file_lib_d_ts;
            break;
        }
        case "Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files_6159": {
            return $state.Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files;
            break;
        }
        case "Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files_6160": {
            return $state.Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files;
            break;
        }
        case "List_of_folders_to_include_type_definitions_from_6161": {
            return $state.List_of_folders_to_include_type_definitions_from;
            break;
        }
        case "Disable_size_limitations_on_JavaScript_projects_6162": {
            return $state.Disable_size_limitations_on_JavaScript_projects;
            break;
        }
        case "The_character_set_of_the_input_files_6163": {
            return $state.The_character_set_of_the_input_files;
            break;
        }
        case "Skipping_module_0_that_looks_like_an_absolute_URI_target_file_types_Colon_1_6164": {
            return $state.Skipping_module_0_that_looks_like_an_absolute_URI_target_file_types_Colon_1;
            break;
        }
        case "Do_not_truncate_error_messages_6165": {
            return $state.Do_not_truncate_error_messages;
            break;
        }
        case "Output_directory_for_generated_declaration_files_6166": {
            return $state.Output_directory_for_generated_declaration_files;
            break;
        }
        case "A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl_6167": {
            return $state.A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl;
            break;
        }
        case "List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime_6168": {
            return $state.List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime;
            break;
        }
        case "Show_all_compiler_options_6169": {
            return $state.Show_all_compiler_options;
            break;
        }
        case "Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file_6170": {
            return $state.Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file;
            break;
        }
        case "Command_line_Options_6171": {
            return $state.Command_line_Options;
            break;
        }
        case "Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_6179": {
            return $state.Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5;
            break;
        }
        case "Enable_all_strict_type_checking_options_6180": {
            return $state.Enable_all_strict_type_checking_options;
            break;
        }
        case "Scoped_package_detected_looking_in_0_6182": {
            return $state.Scoped_package_detected_looking_in_0;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_6183": {
            return $state.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package__6184": {
            return $state.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3;
            break;
        }
        case "Enable_strict_checking_of_function_types_6186": {
            return $state.Enable_strict_checking_of_function_types;
            break;
        }
        case "Enable_strict_checking_of_property_initialization_in_classes_6187": {
            return $state.Enable_strict_checking_of_property_initialization_in_classes;
            break;
        }
        case "Numeric_separators_are_not_allowed_here_6188": {
            return $state.Numeric_separators_are_not_allowed_here;
            break;
        }
        case "Multiple_consecutive_numeric_separators_are_not_permitted_6189": {
            return $state.Multiple_consecutive_numeric_separators_are_not_permitted;
            break;
        }
        case "Whether_to_keep_outdated_console_output_in_watch_mode_instead_of_clearing_the_screen_6191": {
            return $state.Whether_to_keep_outdated_console_output_in_watch_mode_instead_of_clearing_the_screen;
            break;
        }
        case "All_imports_in_import_declaration_are_unused_6192": {
            return $state.All_imports_in_import_declaration_are_unused;
            break;
        }
        case "Found_1_error_Watching_for_file_changes_6193": {
            return $state.Found_1_error_Watching_for_file_changes;
            break;
        }
        case "Found_0_errors_Watching_for_file_changes_6194": {
            return $state.Found_0_errors_Watching_for_file_changes;
            break;
        }
        case "Resolve_keyof_to_string_valued_property_names_only_no_numbers_or_symbols_6195": {
            return $state.Resolve_keyof_to_string_valued_property_names_only_no_numbers_or_symbols;
            break;
        }
        case "_0_is_declared_but_never_used_6196": {
            return $state.X_0_is_declared_but_never_used;
            break;
        }
        case "Include_modules_imported_with_json_extension_6197": {
            return $state.Include_modules_imported_with_json_extension;
            break;
        }
        case "All_destructured_elements_are_unused_6198": {
            return $state.All_destructured_elements_are_unused;
            break;
        }
        case "All_variables_are_unused_6199": {
            return $state.All_variables_are_unused;
            break;
        }
        case "Definitions_of_the_following_identifiers_conflict_with_those_in_another_file_Colon_0_6200": {
            return $state.Definitions_of_the_following_identifiers_conflict_with_those_in_another_file_Colon_0;
            break;
        }
        case "Conflicts_are_in_this_file_6201": {
            return $state.Conflicts_are_in_this_file;
            break;
        }
        case "Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0_6202": {
            return $state.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0;
            break;
        }
        case "_0_was_also_declared_here_6203": {
            return $state.X_0_was_also_declared_here;
            break;
        }
        case "and_here_6204": {
            return $state.X_and_here;
            break;
        }
        case "All_type_parameters_are_unused_6205": {
            return $state.All_type_parameters_are_unused;
            break;
        }
        case "package_json_has_a_typesVersions_field_with_version_specific_path_mappings_6206": {
            return $state.X_package_json_has_a_typesVersions_field_with_version_specific_path_mappings;
            break;
        }
        case "package_json_does_not_have_a_typesVersions_entry_that_matches_version_0_6207": {
            return $state.X_package_json_does_not_have_a_typesVersions_entry_that_matches_version_0;
            break;
        }
        case "package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_ma_6208": {
            return $state.X_package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2;
            break;
        }
        case "package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range_6209": {
            return $state.X_package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range;
            break;
        }
        case "An_argument_for_0_was_not_provided_6210": {
            return $state.An_argument_for_0_was_not_provided;
            break;
        }
        case "An_argument_matching_this_binding_pattern_was_not_provided_6211": {
            return $state.An_argument_matching_this_binding_pattern_was_not_provided;
            break;
        }
        case "Did_you_mean_to_call_this_expression_6212": {
            return $state.Did_you_mean_to_call_this_expression;
            break;
        }
        case "Did_you_mean_to_use_new_with_this_expression_6213": {
            return $state.Did_you_mean_to_use_new_with_this_expression;
            break;
        }
        case "Enable_strict_bind_call_and_apply_methods_on_functions_6214": {
            return $state.Enable_strict_bind_call_and_apply_methods_on_functions;
            break;
        }
        case "Using_compiler_options_of_project_reference_redirect_0_6215": {
            return $state.Using_compiler_options_of_project_reference_redirect_0;
            break;
        }
        case "Found_1_error_6216": {
            return $state.Found_1_error;
            break;
        }
        case "Found_0_errors_6217": {
            return $state.Found_0_errors;
            break;
        }
        case "Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2_6218": {
            return $state.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2;
            break;
        }
        case "Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3_6219": {
            return $state.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3;
            break;
        }
        case "package_json_had_a_falsy_0_field_6220": {
            return $state.X_package_json_had_a_falsy_0_field;
            break;
        }
        case "Disable_use_of_source_files_instead_of_declaration_files_from_referenced_projects_6221": {
            return $state.Disable_use_of_source_files_instead_of_declaration_files_from_referenced_projects;
            break;
        }
        case "Emit_class_fields_with_Define_instead_of_Set_6222": {
            return $state.Emit_class_fields_with_Define_instead_of_Set;
            break;
        }
        case "Generates_a_CPU_profile_6223": {
            return $state.Generates_a_CPU_profile;
            break;
        }
        case "Disable_solution_searching_for_this_project_6224": {
            return $state.Disable_solution_searching_for_this_project;
            break;
        }
        case "Specify_strategy_for_watching_file_Colon_FixedPollingInterval_default_PriorityPollingInterval_Dynami_6225": {
            return $state.Specify_strategy_for_watching_file_Colon_FixedPollingInterval_default_PriorityPollingInterval_DynamicPriorityPolling_FixedChunkSizePolling_UseFsEvents_UseFsEventsOnParentDirectory;
            break;
        }
        case "Specify_strategy_for_watching_directory_on_platforms_that_don_t_support_recursive_watching_natively__6226": {
            return $state.Specify_strategy_for_watching_directory_on_platforms_that_don_t_support_recursive_watching_natively_Colon_UseFsEvents_default_FixedPollingInterval_DynamicPriorityPolling_FixedChunkSizePolling;
            break;
        }
        case "Specify_strategy_for_creating_a_polling_watch_when_it_fails_to_create_using_file_system_events_Colon_6227": {
            return $state.Specify_strategy_for_creating_a_polling_watch_when_it_fails_to_create_using_file_system_events_Colon_FixedInterval_default_PriorityInterval_DynamicPriority_FixedChunkSize;
            break;
        }
        case "Tag_0_expects_at_least_1_arguments_but_the_JSX_factory_2_provides_at_most_3_6229": {
            return $state.Tag_0_expects_at_least_1_arguments_but_the_JSX_factory_2_provides_at_most_3;
            break;
        }
        case "Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line_6230": {
            return $state.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line;
            break;
        }
        case "Could_not_resolve_the_path_0_with_the_extensions_Colon_1_6231": {
            return $state.Could_not_resolve_the_path_0_with_the_extensions_Colon_1;
            break;
        }
        case "Declaration_augments_declaration_in_another_file_This_cannot_be_serialized_6232": {
            return $state.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized;
            break;
        }
        case "This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_fil_6233": {
            return $state.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file;
            break;
        }
        case "This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without_6234": {
            return $state.This_expression_is_not_callable_because_it_is_a_get_accessor_Did_you_mean_to_use_it_without;
            break;
        }
        case "Disable_loading_referenced_projects_6235": {
            return $state.Disable_loading_referenced_projects;
            break;
        }
        case "Arguments_for_the_rest_parameter_0_were_not_provided_6236": {
            return $state.Arguments_for_the_rest_parameter_0_were_not_provided;
            break;
        }
        case "Generates_an_event_trace_and_a_list_of_types_6237": {
            return $state.Generates_an_event_trace_and_a_list_of_types;
            break;
        }
        case "Specify_the_module_specifier_to_be_used_to_import_the_jsx_and_jsxs_factory_functions_from_eg_react_6238": {
            return $state.Specify_the_module_specifier_to_be_used_to_import_the_jsx_and_jsxs_factory_functions_from_eg_react;
            break;
        }
        case "File_0_exists_according_to_earlier_cached_lookups_6239": {
            return $state.File_0_exists_according_to_earlier_cached_lookups;
            break;
        }
        case "File_0_does_not_exist_according_to_earlier_cached_lookups_6240": {
            return $state.File_0_does_not_exist_according_to_earlier_cached_lookups;
            break;
        }
        case "Resolution_for_type_reference_directive_0_was_found_in_cache_from_location_1_6241": {
            return $state.Resolution_for_type_reference_directive_0_was_found_in_cache_from_location_1;
            break;
        }
        case "Resolving_type_reference_directive_0_containing_file_1_6242": {
            return $state.Resolving_type_reference_directive_0_containing_file_1;
            break;
        }
        case "Interpret_optional_property_types_as_written_rather_than_adding_undefined_6243": {
            return $state.Interpret_optional_property_types_as_written_rather_than_adding_undefined;
            break;
        }
        case "Modules_6244": {
            return $state.Modules;
            break;
        }
        case "File_Management_6245": {
            return $state.File_Management;
            break;
        }
        case "Emit_6246": {
            return $state.Emit;
            break;
        }
        case "JavaScript_Support_6247": {
            return $state.JavaScript_Support;
            break;
        }
        case "Type_Checking_6248": {
            return $state.Type_Checking;
            break;
        }
        case "Editor_Support_6249": {
            return $state.Editor_Support;
            break;
        }
        case "Watch_and_Build_Modes_6250": {
            return $state.Watch_and_Build_Modes;
            break;
        }
        case "Compiler_Diagnostics_6251": {
            return $state.Compiler_Diagnostics;
            break;
        }
        case "Interop_Constraints_6252": {
            return $state.Interop_Constraints;
            break;
        }
        case "Backwards_Compatibility_6253": {
            return $state.Backwards_Compatibility;
            break;
        }
        case "Language_and_Environment_6254": {
            return $state.Language_and_Environment;
            break;
        }
        case "Projects_6255": {
            return $state.Projects;
            break;
        }
        case "Output_Formatting_6256": {
            return $state.Output_Formatting;
            break;
        }
        case "Completeness_6257": {
            return $state.Completeness;
            break;
        }
        case "_0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file_6258": {
            return $state.X_0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file;
            break;
        }
        case "Found_1_error_in_0_6259": {
            return $state.Found_1_error_in_0;
            break;
        }
        case "Found_0_errors_in_the_same_file_starting_at_Colon_1_6260": {
            return $state.Found_0_errors_in_the_same_file_starting_at_Colon_1;
            break;
        }
        case "Found_0_errors_in_1_files_6261": {
            return $state.Found_0_errors_in_1_files;
            break;
        }
        case "File_name_0_has_a_1_extension_looking_up_2_instead_6262": {
            return $state.File_name_0_has_a_1_extension_looking_up_2_instead;
            break;
        }
        case "Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set_6263": {
            return $state.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
            break;
        }
        case "Enable_importing_files_with_any_extension_provided_a_declaration_file_is_present_6264": {
            return $state.Enable_importing_files_with_any_extension_provided_a_declaration_file_is_present;
            break;
        }
        case "Resolving_type_reference_directive_for_program_that_specifies_custom_typeRoots_skipping_lookup_in_no_6265": {
            return $state.Resolving_type_reference_directive_for_program_that_specifies_custom_typeRoots_skipping_lookup_in_node_modules_folder;
            break;
        }
        case "Option_0_can_only_be_specified_on_command_line_6266": {
            return $state.Option_0_can_only_be_specified_on_command_line;
            break;
        }
        case "Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve_6270": {
            return $state.Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve;
            break;
        }
        case "Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1_6271": {
            return $state.Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1;
            break;
        }
        case "Invalid_import_specifier_0_has_no_possible_resolutions_6272": {
            return $state.Invalid_import_specifier_0_has_no_possible_resolutions;
            break;
        }
        case "package_json_scope_0_has_no_imports_defined_6273": {
            return $state.X_package_json_scope_0_has_no_imports_defined;
            break;
        }
        case "package_json_scope_0_explicitly_maps_specifier_1_to_null_6274": {
            return $state.X_package_json_scope_0_explicitly_maps_specifier_1_to_null;
            break;
        }
        case "package_json_scope_0_has_invalid_type_for_target_of_specifier_1_6275": {
            return $state.X_package_json_scope_0_has_invalid_type_for_target_of_specifier_1;
            break;
        }
        case "Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1_6276": {
            return $state.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1;
            break;
        }
        case "Resolution_of_non_relative_name_failed_trying_with_modern_Node_resolution_features_disabled_to_see_i_6277": {
            return $state.Resolution_of_non_relative_name_failed_trying_with_modern_Node_resolution_features_disabled_to_see_if_npm_library_needs_configuration_update;
            break;
        }
        case "There_are_types_at_0_but_this_result_could_not_be_resolved_when_respecting_package_json_exports_The__6278": {
            return $state.There_are_types_at_0_but_this_result_could_not_be_resolved_when_respecting_package_json_exports_The_1_library_may_need_to_update_its_package_json_or_typings;
            break;
        }
        case "Resolution_of_non_relative_name_failed_trying_with_moduleResolution_bundler_to_see_if_project_may_ne_6279": {
            return $state.Resolution_of_non_relative_name_failed_trying_with_moduleResolution_bundler_to_see_if_project_may_need_configuration_update;
            break;
        }
        case "There_are_types_at_0_but_this_result_could_not_be_resolved_under_your_current_moduleResolution_setti_6280": {
            return $state.There_are_types_at_0_but_this_result_could_not_be_resolved_under_your_current_moduleResolution_setting_Consider_updating_to_node16_nodenext_or_bundler;
            break;
        }
        case "package_json_has_a_peerDependencies_field_6281": {
            return $state.X_package_json_has_a_peerDependencies_field;
            break;
        }
        case "Found_peerDependency_0_with_1_version_6282": {
            return $state.Found_peerDependency_0_with_1_version;
            break;
        }
        case "Failed_to_find_peerDependency_0_6283": {
            return $state.Failed_to_find_peerDependency_0;
            break;
        }
        case "File_Layout_6284": {
            return $state.File_Layout;
            break;
        }
        case "Environment_Settings_6285": {
            return $state.Environment_Settings;
            break;
        }
        case "See_also_https_Colon_Slash_Slashaka_ms_Slashtsconfig_Slashmodule_6286": {
            return $state.See_also_https_Colon_Slash_Slashaka_ms_Slashtsconfig_Slashmodule;
            break;
        }
        case "For_nodejs_Colon_6287": {
            return $state.For_nodejs_Colon;
            break;
        }
        case "and_npm_install_D_types_Slashnode_6290": {
            return $state.X_and_npm_install_D_types_Slashnode;
            break;
        }
        case "Other_Outputs_6291": {
            return $state.Other_Outputs;
            break;
        }
        case "Stricter_Typechecking_Options_6292": {
            return $state.Stricter_Typechecking_Options;
            break;
        }
        case "Style_Options_6293": {
            return $state.Style_Options;
            break;
        }
        case "Recommended_Options_6294": {
            return $state.Recommended_Options;
            break;
        }
        case "Enable_project_compilation_6302": {
            return $state.Enable_project_compilation;
            break;
        }
        case "Composite_projects_may_not_disable_declaration_emit_6304": {
            return $state.Composite_projects_may_not_disable_declaration_emit;
            break;
        }
        case "Output_file_0_has_not_been_built_from_source_file_1_6305": {
            return $state.Output_file_0_has_not_been_built_from_source_file_1;
            break;
        }
        case "Referenced_project_0_must_have_setting_composite_Colon_true_6306": {
            return $state.Referenced_project_0_must_have_setting_composite_Colon_true;
            break;
        }
        case "File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_includ_6307": {
            return $state.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern;
            break;
        }
        case "Referenced_project_0_may_not_disable_emit_6310": {
            return $state.Referenced_project_0_may_not_disable_emit;
            break;
        }
        case "Project_0_is_out_of_date_because_output_1_is_older_than_input_2_6350": {
            return $state.Project_0_is_out_of_date_because_output_1_is_older_than_input_2;
            break;
        }
        case "Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2_6351": {
            return $state.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2;
            break;
        }
        case "Project_0_is_out_of_date_because_output_file_1_does_not_exist_6352": {
            return $state.Project_0_is_out_of_date_because_output_file_1_does_not_exist;
            break;
        }
        case "Failed_to_delete_file_0_6353": {
            return $state.Failed_to_delete_file_0;
            break;
        }
        case "Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies_6354": {
            return $state.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies;
            break;
        }
        case "Projects_in_this_build_Colon_0_6355": {
            return $state.Projects_in_this_build_Colon_0;
            break;
        }
        case "A_non_dry_build_would_delete_the_following_files_Colon_0_6356": {
            return $state.A_non_dry_build_would_delete_the_following_files_Colon_0;
            break;
        }
        case "A_non_dry_build_would_build_project_0_6357": {
            return $state.A_non_dry_build_would_build_project_0;
            break;
        }
        case "Building_project_0_6358": {
            return $state.Building_project_0;
            break;
        }
        case "Updating_output_timestamps_of_project_0_6359": {
            return $state.Updating_output_timestamps_of_project_0;
            break;
        }
        case "Project_0_is_up_to_date_6361": {
            return $state.Project_0_is_up_to_date;
            break;
        }
        case "Skipping_build_of_project_0_because_its_dependency_1_has_errors_6362": {
            return $state.Skipping_build_of_project_0_because_its_dependency_1_has_errors;
            break;
        }
        case "Project_0_can_t_be_built_because_its_dependency_1_has_errors_6363": {
            return $state.Project_0_can_t_be_built_because_its_dependency_1_has_errors;
            break;
        }
        case "Build_one_or_more_projects_and_their_dependencies_if_out_of_date_6364": {
            return $state.Build_one_or_more_projects_and_their_dependencies_if_out_of_date;
            break;
        }
        case "Delete_the_outputs_of_all_projects_6365": {
            return $state.Delete_the_outputs_of_all_projects;
            break;
        }
        case "Show_what_would_be_built_or_deleted_if_specified_with_clean_6367": {
            return $state.Show_what_would_be_built_or_deleted_if_specified_with_clean;
            break;
        }
        case "Option_build_must_be_the_first_command_line_argument_6369": {
            return $state.Option_build_must_be_the_first_command_line_argument;
            break;
        }
        case "Options_0_and_1_cannot_be_combined_6370": {
            return $state.Options_0_and_1_cannot_be_combined;
            break;
        }
        case "Updating_unchanged_output_timestamps_of_project_0_6371": {
            return $state.Updating_unchanged_output_timestamps_of_project_0;
            break;
        }
        case "A_non_dry_build_would_update_timestamps_for_output_of_project_0_6374": {
            return $state.A_non_dry_build_would_update_timestamps_for_output_of_project_0;
            break;
        }
        case "Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1_6377": {
            return $state.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1;
            break;
        }
        case "Composite_projects_may_not_disable_incremental_compilation_6379": {
            return $state.Composite_projects_may_not_disable_incremental_compilation;
            break;
        }
        case "Specify_file_to_store_incremental_compilation_information_6380": {
            return $state.Specify_file_to_store_incremental_compilation_information;
            break;
        }
        case "Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_curren_6381": {
            return $state.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2;
            break;
        }
        case "Skipping_build_of_project_0_because_its_dependency_1_was_not_built_6382": {
            return $state.Skipping_build_of_project_0_because_its_dependency_1_was_not_built;
            break;
        }
        case "Project_0_can_t_be_built_because_its_dependency_1_was_not_built_6383": {
            return $state.Project_0_can_t_be_built_because_its_dependency_1_was_not_built;
            break;
        }
        case "Have_recompiles_in_incremental_and_watch_assume_that_changes_within_a_file_will_only_affect_files_di_6384": {
            return $state.Have_recompiles_in_incremental_and_watch_assume_that_changes_within_a_file_will_only_affect_files_directly_depending_on_it;
            break;
        }
        case "_0_is_deprecated_6385": {
            return $state.X_0_is_deprecated;
            break;
        }
        case "Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_nativ_6386": {
            return $state.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found;
            break;
        }
        case "The_signature_0_of_1_is_deprecated_6387": {
            return $state.The_signature_0_of_1_is_deprecated;
            break;
        }
        case "Project_0_is_being_forcibly_rebuilt_6388": {
            return $state.Project_0_is_being_forcibly_rebuilt;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved_6389": {
            return $state.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved__6390": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved__6391": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved_6392": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_6393": {
            return $state.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_6394": {
            return $state.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4;
            break;
        }
        case "Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_not_resolved_6395": {
            return $state.Reusing_resolution_of_module_0_from_1_found_in_cache_from_location_2_it_was_not_resolved;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_succes_6396": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_succes_6397": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_successfully_resolved_to_3_with_Package_ID_4;
            break;
        }
        case "Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_not_re_6398": {
            return $state.Reusing_resolution_of_type_reference_directive_0_from_1_found_in_cache_from_location_2_it_was_not_resolved;
            break;
        }
        case "Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitte_6399": {
            return $state.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted;
            break;
        }
        case "Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_fil_6400": {
            return $state.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files;
            break;
        }
        case "Project_0_is_out_of_date_because_config_file_does_not_exist_6401": {
            return $state.Project_0_is_out_of_date_because_config_file_does_not_exist;
            break;
        }
        case "Resolving_in_0_mode_with_conditions_1_6402": {
            return $state.Resolving_in_0_mode_with_conditions_1;
            break;
        }
        case "Matched_0_condition_1_6403": {
            return $state.Matched_0_condition_1;
            break;
        }
        case "Using_0_subpath_1_with_target_2_6404": {
            return $state.Using_0_subpath_1_with_target_2;
            break;
        }
        case "Saw_non_matching_condition_0_6405": {
            return $state.Saw_non_matching_condition_0;
            break;
        }
        case "Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions_6406": {
            return $state.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions;
            break;
        }
        case "Allow_imports_to_include_TypeScript_file_extensions_Requires_moduleResolution_bundler_and_either_noE_6407": {
            return $state.Allow_imports_to_include_TypeScript_file_extensions_Requires_moduleResolution_bundler_and_either_noEmit_or_emitDeclarationOnly_to_be_set;
            break;
        }
        case "Use_the_package_json_exports_field_when_resolving_package_imports_6408": {
            return $state.Use_the_package_json_exports_field_when_resolving_package_imports;
            break;
        }
        case "Use_the_package_json_imports_field_when_resolving_imports_6409": {
            return $state.Use_the_package_json_imports_field_when_resolving_imports;
            break;
        }
        case "Conditions_to_set_in_addition_to_the_resolver_specific_defaults_when_resolving_imports_6410": {
            return $state.Conditions_to_set_in_addition_to_the_resolver_specific_defaults_when_resolving_imports;
            break;
        }
        case "true_when_moduleResolution_is_node16_nodenext_or_bundler_otherwise_false_6411": {
            return $state.X_true_when_moduleResolution_is_node16_nodenext_or_bundler_otherwise_false;
            break;
        }
        case "Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_6412": {
            return $state.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more;
            break;
        }
        case "Entering_conditional_exports_6413": {
            return $state.Entering_conditional_exports;
            break;
        }
        case "Resolved_under_condition_0_6414": {
            return $state.Resolved_under_condition_0;
            break;
        }
        case "Failed_to_resolve_under_condition_0_6415": {
            return $state.Failed_to_resolve_under_condition_0;
            break;
        }
        case "Exiting_conditional_exports_6416": {
            return $state.Exiting_conditional_exports;
            break;
        }
        case "Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0_6417": {
            return $state.Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0;
            break;
        }
        case "Searching_all_ancestor_node_modules_directories_for_fallback_extensions_Colon_0_6418": {
            return $state.Searching_all_ancestor_node_modules_directories_for_fallback_extensions_Colon_0;
            break;
        }
        case "Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors_6419": {
            return $state.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors;
            break;
        }
        case "Project_0_is_out_of_date_because_input_1_does_not_exist_6420": {
            return $state.Project_0_is_out_of_date_because_input_1_does_not_exist;
            break;
        }
        case "Rewrite_ts_tsx_mts_and_cts_file_extensions_in_relative_import_paths_to_their_JavaScript_equivalent_i_6421": {
            return $state.Rewrite_ts_tsx_mts_and_cts_file_extensions_in_relative_import_paths_to_their_JavaScript_equivalent_in_output_files;
            break;
        }
        case "Project_0_is_out_of_date_because_it_has_errors_6423": {
            return $state.Project_0_is_out_of_date_because_it_has_errors;
            break;
        }
        case "Multiple_module_exports_assignments_cannot_be_serialized_for_declaration_emit_6424": {
            return $state.Multiple_module_exports_assignments_cannot_be_serialized_for_declaration_emit;
            break;
        }
        case "Nested_CommonJS_export_constructs_cannot_be_serialized_for_declaration_emit_6425": {
            return $state.Nested_CommonJS_export_constructs_cannot_be_serialized_for_declaration_emit;
            break;
        }
        case "The_expected_type_comes_from_property_0_which_is_declared_here_on_type_1_6500": {
            return $state.The_expected_type_comes_from_property_0_which_is_declared_here_on_type_1;
            break;
        }
        case "The_expected_type_comes_from_this_index_signature_6501": {
            return $state.The_expected_type_comes_from_this_index_signature;
            break;
        }
        case "The_expected_type_comes_from_the_return_type_of_this_signature_6502": {
            return $state.The_expected_type_comes_from_the_return_type_of_this_signature;
            break;
        }
        case "Print_names_of_files_that_are_part_of_the_compilation_and_then_stop_processing_6503": {
            return $state.Print_names_of_files_that_are_part_of_the_compilation_and_then_stop_processing;
            break;
        }
        case "File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option_6504": {
            return $state.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option;
            break;
        }
        case "Print_names_of_files_and_the_reason_they_are_part_of_the_compilation_6505": {
            return $state.Print_names_of_files_and_the_reason_they_are_part_of_the_compilation;
            break;
        }
        case "Consider_adding_a_declare_modifier_to_this_class_6506": {
            return $state.Consider_adding_a_declare_modifier_to_this_class;
            break;
        }
        case "Allow_JavaScript_files_to_be_a_part_of_your_program_Use_the_checkJs_option_to_get_errors_from_these__6600": {
            return $state.Allow_JavaScript_files_to_be_a_part_of_your_program_Use_the_checkJs_option_to_get_errors_from_these_files;
            break;
        }
        case "Allow_import_x_from_y_when_a_module_doesn_t_have_a_default_export_6601": {
            return $state.Allow_import_x_from_y_when_a_module_doesn_t_have_a_default_export;
            break;
        }
        case "Allow_accessing_UMD_globals_from_modules_6602": {
            return $state.Allow_accessing_UMD_globals_from_modules;
            break;
        }
        case "Disable_error_reporting_for_unreachable_code_6603": {
            return $state.Disable_error_reporting_for_unreachable_code;
            break;
        }
        case "Disable_error_reporting_for_unused_labels_6604": {
            return $state.Disable_error_reporting_for_unused_labels;
            break;
        }
        case "Ensure_use_strict_is_always_emitted_6605": {
            return $state.Ensure_use_strict_is_always_emitted;
            break;
        }
        case "Have_recompiles_in_projects_that_use_incremental_and_watch_mode_assume_that_changes_within_a_file_wi_6606": {
            return $state.Have_recompiles_in_projects_that_use_incremental_and_watch_mode_assume_that_changes_within_a_file_will_only_affect_files_directly_depending_on_it;
            break;
        }
        case "Specify_the_base_directory_to_resolve_non_relative_module_names_6607": {
            return $state.Specify_the_base_directory_to_resolve_non_relative_module_names;
            break;
        }
        case "No_longer_supported_In_early_versions_manually_set_the_text_encoding_for_reading_files_6608": {
            return $state.No_longer_supported_In_early_versions_manually_set_the_text_encoding_for_reading_files;
            break;
        }
        case "Enable_error_reporting_in_type_checked_JavaScript_files_6609": {
            return $state.Enable_error_reporting_in_type_checked_JavaScript_files;
            break;
        }
        case "Enable_constraints_that_allow_a_TypeScript_project_to_be_used_with_project_references_6611": {
            return $state.Enable_constraints_that_allow_a_TypeScript_project_to_be_used_with_project_references;
            break;
        }
        case "Generate_d_ts_files_from_TypeScript_and_JavaScript_files_in_your_project_6612": {
            return $state.Generate_d_ts_files_from_TypeScript_and_JavaScript_files_in_your_project;
            break;
        }
        case "Specify_the_output_directory_for_generated_declaration_files_6613": {
            return $state.Specify_the_output_directory_for_generated_declaration_files;
            break;
        }
        case "Create_sourcemaps_for_d_ts_files_6614": {
            return $state.Create_sourcemaps_for_d_ts_files;
            break;
        }
        case "Output_compiler_performance_information_after_building_6615": {
            return $state.Output_compiler_performance_information_after_building;
            break;
        }
        case "Disables_inference_for_type_acquisition_by_looking_at_filenames_in_a_project_6616": {
            return $state.Disables_inference_for_type_acquisition_by_looking_at_filenames_in_a_project;
            break;
        }
        case "Reduce_the_number_of_projects_loaded_automatically_by_TypeScript_6617": {
            return $state.Reduce_the_number_of_projects_loaded_automatically_by_TypeScript;
            break;
        }
        case "Remove_the_20mb_cap_on_total_source_code_size_for_JavaScript_files_in_the_TypeScript_language_server_6618": {
            return $state.Remove_the_20mb_cap_on_total_source_code_size_for_JavaScript_files_in_the_TypeScript_language_server;
            break;
        }
        case "Opt_a_project_out_of_multi_project_reference_checking_when_editing_6619": {
            return $state.Opt_a_project_out_of_multi_project_reference_checking_when_editing;
            break;
        }
        case "Disable_preferring_source_files_instead_of_declaration_files_when_referencing_composite_projects_6620": {
            return $state.Disable_preferring_source_files_instead_of_declaration_files_when_referencing_composite_projects;
            break;
        }
        case "Emit_more_compliant_but_verbose_and_less_performant_JavaScript_for_iteration_6621": {
            return $state.Emit_more_compliant_but_verbose_and_less_performant_JavaScript_for_iteration;
            break;
        }
        case "Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files_6622": {
            return $state.Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files;
            break;
        }
        case "Only_output_d_ts_files_and_not_JavaScript_files_6623": {
            return $state.Only_output_d_ts_files_and_not_JavaScript_files;
            break;
        }
        case "Emit_design_type_metadata_for_decorated_declarations_in_source_files_6624": {
            return $state.Emit_design_type_metadata_for_decorated_declarations_in_source_files;
            break;
        }
        case "Disable_the_type_acquisition_for_JavaScript_projects_6625": {
            return $state.Disable_the_type_acquisition_for_JavaScript_projects;
            break;
        }
        case "Emit_additional_JavaScript_to_ease_support_for_importing_CommonJS_modules_This_enables_allowSyntheti_6626": {
            return $state.Emit_additional_JavaScript_to_ease_support_for_importing_CommonJS_modules_This_enables_allowSyntheticDefaultImports_for_type_compatibility;
            break;
        }
        case "Filters_results_from_the_include_option_6627": {
            return $state.Filters_results_from_the_include_option;
            break;
        }
        case "Remove_a_list_of_directories_from_the_watch_process_6628": {
            return $state.Remove_a_list_of_directories_from_the_watch_process;
            break;
        }
        case "Remove_a_list_of_files_from_the_watch_mode_s_processing_6629": {
            return $state.Remove_a_list_of_files_from_the_watch_mode_s_processing;
            break;
        }
        case "Enable_experimental_support_for_legacy_experimental_decorators_6630": {
            return $state.Enable_experimental_support_for_legacy_experimental_decorators;
            break;
        }
        case "Print_files_read_during_the_compilation_including_why_it_was_included_6631": {
            return $state.Print_files_read_during_the_compilation_including_why_it_was_included;
            break;
        }
        case "Output_more_detailed_compiler_performance_information_after_building_6632": {
            return $state.Output_more_detailed_compiler_performance_information_after_building;
            break;
        }
        case "Specify_one_or_more_path_or_node_module_references_to_base_configuration_files_from_which_settings_a_6633": {
            return $state.Specify_one_or_more_path_or_node_module_references_to_base_configuration_files_from_which_settings_are_inherited;
            break;
        }
        case "Specify_what_approach_the_watcher_should_use_if_the_system_runs_out_of_native_file_watchers_6634": {
            return $state.Specify_what_approach_the_watcher_should_use_if_the_system_runs_out_of_native_file_watchers;
            break;
        }
        case "Include_a_list_of_files_This_does_not_support_glob_patterns_as_opposed_to_include_6635": {
            return $state.Include_a_list_of_files_This_does_not_support_glob_patterns_as_opposed_to_include;
            break;
        }
        case "Build_all_projects_including_those_that_appear_to_be_up_to_date_6636": {
            return $state.Build_all_projects_including_those_that_appear_to_be_up_to_date;
            break;
        }
        case "Ensure_that_casing_is_correct_in_imports_6637": {
            return $state.Ensure_that_casing_is_correct_in_imports;
            break;
        }
        case "Emit_a_v8_CPU_profile_of_the_compiler_run_for_debugging_6638": {
            return $state.Emit_a_v8_CPU_profile_of_the_compiler_run_for_debugging;
            break;
        }
        case "Allow_importing_helper_functions_from_tslib_once_per_project_instead_of_including_them_per_file_6639": {
            return $state.Allow_importing_helper_functions_from_tslib_once_per_project_instead_of_including_them_per_file;
            break;
        }
        case "Skip_building_downstream_projects_on_error_in_upstream_project_6640": {
            return $state.Skip_building_downstream_projects_on_error_in_upstream_project;
            break;
        }
        case "Specify_a_list_of_glob_patterns_that_match_files_to_be_included_in_compilation_6641": {
            return $state.Specify_a_list_of_glob_patterns_that_match_files_to_be_included_in_compilation;
            break;
        }
        case "Save_tsbuildinfo_files_to_allow_for_incremental_compilation_of_projects_6642": {
            return $state.Save_tsbuildinfo_files_to_allow_for_incremental_compilation_of_projects;
            break;
        }
        case "Include_sourcemap_files_inside_the_emitted_JavaScript_6643": {
            return $state.Include_sourcemap_files_inside_the_emitted_JavaScript;
            break;
        }
        case "Include_source_code_in_the_sourcemaps_inside_the_emitted_JavaScript_6644": {
            return $state.Include_source_code_in_the_sourcemaps_inside_the_emitted_JavaScript;
            break;
        }
        case "Ensure_that_each_file_can_be_safely_transpiled_without_relying_on_other_imports_6645": {
            return $state.Ensure_that_each_file_can_be_safely_transpiled_without_relying_on_other_imports;
            break;
        }
        case "Specify_what_JSX_code_is_generated_6646": {
            return $state.Specify_what_JSX_code_is_generated;
            break;
        }
        case "Specify_the_JSX_factory_function_used_when_targeting_React_JSX_emit_e_g_React_createElement_or_h_6647": {
            return $state.Specify_the_JSX_factory_function_used_when_targeting_React_JSX_emit_e_g_React_createElement_or_h;
            break;
        }
        case "Specify_the_JSX_Fragment_reference_used_for_fragments_when_targeting_React_JSX_emit_e_g_React_Fragme_6648": {
            return $state.Specify_the_JSX_Fragment_reference_used_for_fragments_when_targeting_React_JSX_emit_e_g_React_Fragment_or_Fragment;
            break;
        }
        case "Specify_module_specifier_used_to_import_the_JSX_factory_functions_when_using_jsx_Colon_react_jsx_Ast_6649": {
            return $state.Specify_module_specifier_used_to_import_the_JSX_factory_functions_when_using_jsx_Colon_react_jsx_Asterisk;
            break;
        }
        case "Make_keyof_only_return_strings_instead_of_string_numbers_or_symbols_Legacy_option_6650": {
            return $state.Make_keyof_only_return_strings_instead_of_string_numbers_or_symbols_Legacy_option;
            break;
        }
        case "Specify_a_set_of_bundled_library_declaration_files_that_describe_the_target_runtime_environment_6651": {
            return $state.Specify_a_set_of_bundled_library_declaration_files_that_describe_the_target_runtime_environment;
            break;
        }
        case "Print_the_names_of_emitted_files_after_a_compilation_6652": {
            return $state.Print_the_names_of_emitted_files_after_a_compilation;
            break;
        }
        case "Print_all_of_the_files_read_during_the_compilation_6653": {
            return $state.Print_all_of_the_files_read_during_the_compilation;
            break;
        }
        case "Set_the_language_of_the_messaging_from_TypeScript_This_does_not_affect_emit_6654": {
            return $state.Set_the_language_of_the_messaging_from_TypeScript_This_does_not_affect_emit;
            break;
        }
        case "Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations_6655": {
            return $state.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations;
            break;
        }
        case "Specify_the_maximum_folder_depth_used_for_checking_JavaScript_files_from_node_modules_Only_applicabl_6656": {
            return $state.Specify_the_maximum_folder_depth_used_for_checking_JavaScript_files_from_node_modules_Only_applicable_with_allowJs;
            break;
        }
        case "Specify_what_module_code_is_generated_6657": {
            return $state.Specify_what_module_code_is_generated;
            break;
        }
        case "Specify_how_TypeScript_looks_up_a_file_from_a_given_module_specifier_6658": {
            return $state.Specify_how_TypeScript_looks_up_a_file_from_a_given_module_specifier;
            break;
        }
        case "Set_the_newline_character_for_emitting_files_6659": {
            return $state.Set_the_newline_character_for_emitting_files;
            break;
        }
        case "Disable_emitting_files_from_a_compilation_6660": {
            return $state.Disable_emitting_files_from_a_compilation;
            break;
        }
        case "Disable_generating_custom_helper_functions_like_extends_in_compiled_output_6661": {
            return $state.Disable_generating_custom_helper_functions_like_extends_in_compiled_output;
            break;
        }
        case "Disable_emitting_files_if_any_type_checking_errors_are_reported_6662": {
            return $state.Disable_emitting_files_if_any_type_checking_errors_are_reported;
            break;
        }
        case "Disable_truncating_types_in_error_messages_6663": {
            return $state.Disable_truncating_types_in_error_messages;
            break;
        }
        case "Enable_error_reporting_for_fallthrough_cases_in_switch_statements_6664": {
            return $state.Enable_error_reporting_for_fallthrough_cases_in_switch_statements;
            break;
        }
        case "Enable_error_reporting_for_expressions_and_declarations_with_an_implied_any_type_6665": {
            return $state.Enable_error_reporting_for_expressions_and_declarations_with_an_implied_any_type;
            break;
        }
        case "Ensure_overriding_members_in_derived_classes_are_marked_with_an_override_modifier_6666": {
            return $state.Ensure_overriding_members_in_derived_classes_are_marked_with_an_override_modifier;
            break;
        }
        case "Enable_error_reporting_for_codepaths_that_do_not_explicitly_return_in_a_function_6667": {
            return $state.Enable_error_reporting_for_codepaths_that_do_not_explicitly_return_in_a_function;
            break;
        }
        case "Enable_error_reporting_when_this_is_given_the_type_any_6668": {
            return $state.Enable_error_reporting_when_this_is_given_the_type_any;
            break;
        }
        case "Disable_adding_use_strict_directives_in_emitted_JavaScript_files_6669": {
            return $state.Disable_adding_use_strict_directives_in_emitted_JavaScript_files;
            break;
        }
        case "Disable_including_any_library_files_including_the_default_lib_d_ts_6670": {
            return $state.Disable_including_any_library_files_including_the_default_lib_d_ts;
            break;
        }
        case "Enforces_using_indexed_accessors_for_keys_declared_using_an_indexed_type_6671": {
            return $state.Enforces_using_indexed_accessors_for_keys_declared_using_an_indexed_type;
            break;
        }
        case "Disallow_import_s_require_s_or_reference_s_from_expanding_the_number_of_files_TypeScript_should_add__6672": {
            return $state.Disallow_import_s_require_s_or_reference_s_from_expanding_the_number_of_files_TypeScript_should_add_to_a_project;
            break;
        }
        case "Disable_strict_checking_of_generic_signatures_in_function_types_6673": {
            return $state.Disable_strict_checking_of_generic_signatures_in_function_types;
            break;
        }
        case "Add_undefined_to_a_type_when_accessed_using_an_index_6674": {
            return $state.Add_undefined_to_a_type_when_accessed_using_an_index;
            break;
        }
        case "Enable_error_reporting_when_local_variables_aren_t_read_6675": {
            return $state.Enable_error_reporting_when_local_variables_aren_t_read;
            break;
        }
        case "Raise_an_error_when_a_function_parameter_isn_t_read_6676": {
            return $state.Raise_an_error_when_a_function_parameter_isn_t_read;
            break;
        }
        case "Deprecated_setting_Use_outFile_instead_6677": {
            return $state.Deprecated_setting_Use_outFile_instead;
            break;
        }
        case "Specify_an_output_folder_for_all_emitted_files_6678": {
            return $state.Specify_an_output_folder_for_all_emitted_files;
            break;
        }
        case "Specify_a_file_that_bundles_all_outputs_into_one_JavaScript_file_If_declaration_is_true_also_designa_6679": {
            return $state.Specify_a_file_that_bundles_all_outputs_into_one_JavaScript_file_If_declaration_is_true_also_designates_a_file_that_bundles_all_d_ts_output;
            break;
        }
        case "Specify_a_set_of_entries_that_re_map_imports_to_additional_lookup_locations_6680": {
            return $state.Specify_a_set_of_entries_that_re_map_imports_to_additional_lookup_locations;
            break;
        }
        case "Specify_a_list_of_language_service_plugins_to_include_6681": {
            return $state.Specify_a_list_of_language_service_plugins_to_include;
            break;
        }
        case "Disable_erasing_const_enum_declarations_in_generated_code_6682": {
            return $state.Disable_erasing_const_enum_declarations_in_generated_code;
            break;
        }
        case "Disable_resolving_symlinks_to_their_realpath_This_correlates_to_the_same_flag_in_node_6683": {
            return $state.Disable_resolving_symlinks_to_their_realpath_This_correlates_to_the_same_flag_in_node;
            break;
        }
        case "Disable_wiping_the_console_in_watch_mode_6684": {
            return $state.Disable_wiping_the_console_in_watch_mode;
            break;
        }
        case "Enable_color_and_formatting_in_TypeScript_s_output_to_make_compiler_errors_easier_to_read_6685": {
            return $state.Enable_color_and_formatting_in_TypeScript_s_output_to_make_compiler_errors_easier_to_read;
            break;
        }
        case "Specify_the_object_invoked_for_createElement_This_only_applies_when_targeting_react_JSX_emit_6686": {
            return $state.Specify_the_object_invoked_for_createElement_This_only_applies_when_targeting_react_JSX_emit;
            break;
        }
        case "Specify_an_array_of_objects_that_specify_paths_for_projects_Used_in_project_references_6687": {
            return $state.Specify_an_array_of_objects_that_specify_paths_for_projects_Used_in_project_references;
            break;
        }
        case "Disable_emitting_comments_6688": {
            return $state.Disable_emitting_comments;
            break;
        }
        case "Enable_importing_json_files_6689": {
            return $state.Enable_importing_json_files;
            break;
        }
        case "Specify_the_root_folder_within_your_source_files_6690": {
            return $state.Specify_the_root_folder_within_your_source_files;
            break;
        }
        case "Allow_multiple_folders_to_be_treated_as_one_when_resolving_modules_6691": {
            return $state.Allow_multiple_folders_to_be_treated_as_one_when_resolving_modules;
            break;
        }
        case "Skip_type_checking_d_ts_files_that_are_included_with_TypeScript_6692": {
            return $state.Skip_type_checking_d_ts_files_that_are_included_with_TypeScript;
            break;
        }
        case "Skip_type_checking_all_d_ts_files_6693": {
            return $state.Skip_type_checking_all_d_ts_files;
            break;
        }
        case "Create_source_map_files_for_emitted_JavaScript_files_6694": {
            return $state.Create_source_map_files_for_emitted_JavaScript_files;
            break;
        }
        case "Specify_the_root_path_for_debuggers_to_find_the_reference_source_code_6695": {
            return $state.Specify_the_root_path_for_debuggers_to_find_the_reference_source_code;
            break;
        }
        case "Check_that_the_arguments_for_bind_call_and_apply_methods_match_the_original_function_6697": {
            return $state.Check_that_the_arguments_for_bind_call_and_apply_methods_match_the_original_function;
            break;
        }
        case "When_assigning_functions_check_to_ensure_parameters_and_the_return_values_are_subtype_compatible_6698": {
            return $state.When_assigning_functions_check_to_ensure_parameters_and_the_return_values_are_subtype_compatible;
            break;
        }
        case "When_type_checking_take_into_account_null_and_undefined_6699": {
            return $state.When_type_checking_take_into_account_null_and_undefined;
            break;
        }
        case "Check_for_class_properties_that_are_declared_but_not_set_in_the_constructor_6700": {
            return $state.Check_for_class_properties_that_are_declared_but_not_set_in_the_constructor;
            break;
        }
        case "Disable_emitting_declarations_that_have_internal_in_their_JSDoc_comments_6701": {
            return $state.Disable_emitting_declarations_that_have_internal_in_their_JSDoc_comments;
            break;
        }
        case "Disable_reporting_of_excess_property_errors_during_the_creation_of_object_literals_6702": {
            return $state.Disable_reporting_of_excess_property_errors_during_the_creation_of_object_literals;
            break;
        }
        case "Suppress_noImplicitAny_errors_when_indexing_objects_that_lack_index_signatures_6703": {
            return $state.Suppress_noImplicitAny_errors_when_indexing_objects_that_lack_index_signatures;
            break;
        }
        case "Synchronously_call_callbacks_and_update_the_state_of_directory_watchers_on_platforms_that_don_t_supp_6704": {
            return $state.Synchronously_call_callbacks_and_update_the_state_of_directory_watchers_on_platforms_that_don_t_support_recursive_watching_natively;
            break;
        }
        case "Set_the_JavaScript_language_version_for_emitted_JavaScript_and_include_compatible_library_declaratio_6705": {
            return $state.Set_the_JavaScript_language_version_for_emitted_JavaScript_and_include_compatible_library_declarations;
            break;
        }
        case "Log_paths_used_during_the_moduleResolution_process_6706": {
            return $state.Log_paths_used_during_the_moduleResolution_process;
            break;
        }
        case "Specify_the_path_to_tsbuildinfo_incremental_compilation_file_6707": {
            return $state.Specify_the_path_to_tsbuildinfo_incremental_compilation_file;
            break;
        }
        case "Specify_options_for_automatic_acquisition_of_declaration_files_6709": {
            return $state.Specify_options_for_automatic_acquisition_of_declaration_files;
            break;
        }
        case "Specify_multiple_folders_that_act_like_Slashnode_modules_Slash_types_6710": {
            return $state.Specify_multiple_folders_that_act_like_Slashnode_modules_Slash_types;
            break;
        }
        case "Specify_type_package_names_to_be_included_without_being_referenced_in_a_source_file_6711": {
            return $state.Specify_type_package_names_to_be_included_without_being_referenced_in_a_source_file;
            break;
        }
        case "Emit_ECMAScript_standard_compliant_class_fields_6712": {
            return $state.Emit_ECMAScript_standard_compliant_class_fields;
            break;
        }
        case "Enable_verbose_logging_6713": {
            return $state.Enable_verbose_logging;
            break;
        }
        case "Specify_how_directories_are_watched_on_systems_that_lack_recursive_file_watching_functionality_6714": {
            return $state.Specify_how_directories_are_watched_on_systems_that_lack_recursive_file_watching_functionality;
            break;
        }
        case "Specify_how_the_TypeScript_watch_mode_works_6715": {
            return $state.Specify_how_the_TypeScript_watch_mode_works;
            break;
        }
        case "Require_undeclared_properties_from_index_signatures_to_use_element_accesses_6717": {
            return $state.Require_undeclared_properties_from_index_signatures_to_use_element_accesses;
            break;
        }
        case "Specify_emit_Slashchecking_behavior_for_imports_that_are_only_used_for_types_6718": {
            return $state.Specify_emit_Slashchecking_behavior_for_imports_that_are_only_used_for_types;
            break;
        }
        case "Require_sufficient_annotation_on_exports_so_other_tools_can_trivially_generate_declaration_files_6719": {
            return $state.Require_sufficient_annotation_on_exports_so_other_tools_can_trivially_generate_declaration_files;
            break;
        }
        case "Built_in_iterators_are_instantiated_with_a_TReturn_type_of_undefined_instead_of_any_6720": {
            return $state.Built_in_iterators_are_instantiated_with_a_TReturn_type_of_undefined_instead_of_any;
            break;
        }
        case "Do_not_allow_runtime_constructs_that_are_not_part_of_ECMAScript_6721": {
            return $state.Do_not_allow_runtime_constructs_that_are_not_part_of_ECMAScript;
            break;
        }
        case "Default_catch_clause_variables_as_unknown_instead_of_any_6803": {
            return $state.Default_catch_clause_variables_as_unknown_instead_of_any;
            break;
        }
        case "Do_not_transform_or_elide_any_imports_or_exports_not_marked_as_type_only_ensuring_they_are_written_i_6804": {
            return $state.Do_not_transform_or_elide_any_imports_or_exports_not_marked_as_type_only_ensuring_they_are_written_in_the_output_file_s_format_based_on_the_module_setting;
            break;
        }
        case "Disable_full_type_checking_only_critical_parse_and_emit_errors_will_be_reported_6805": {
            return $state.Disable_full_type_checking_only_critical_parse_and_emit_errors_will_be_reported;
            break;
        }
        case "Check_side_effect_imports_6806": {
            return $state.Check_side_effect_imports;
            break;
        }
        case "This_operation_can_be_simplified_This_shift_is_identical_to_0_1_2_6807": {
            return $state.This_operation_can_be_simplified_This_shift_is_identical_to_0_1_2;
            break;
        }
        case "Enable_lib_replacement_6808": {
            return $state.Enable_lib_replacement;
            break;
        }
        case "Ensure_types_are_ordered_stably_and_deterministically_across_compilations_6809": {
            return $state.Ensure_types_are_ordered_stably_and_deterministically_across_compilations;
            break;
        }
        case "one_of_Colon_6900": {
            return $state.X_one_of_Colon;
            break;
        }
        case "one_or_more_Colon_6901": {
            return $state.X_one_or_more_Colon;
            break;
        }
        case "type_Colon_6902": {
            return $state.X_type_Colon;
            break;
        }
        case "default_Colon_6903": {
            return $state.X_default_Colon;
            break;
        }
        case "true_unless_strict_is_false_6905": {
            return $state.X_true_unless_strict_is_false;
            break;
        }
        case "false_unless_composite_is_set_6906": {
            return $state.X_false_unless_composite_is_set;
            break;
        }
        case "node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified_6907": {
            return $state.X_node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified;
            break;
        }
        case "if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk_6908": {
            return $state.X_if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk;
            break;
        }
        case "true_if_composite_false_otherwise_6909": {
            return $state.X_true_if_composite_false_otherwise;
            break;
        }
        case "Computed_from_the_list_of_input_files_6911": {
            return $state.Computed_from_the_list_of_input_files;
            break;
        }
        case "Platform_specific_6912": {
            return $state.Platform_specific;
            break;
        }
        case "You_can_learn_about_all_of_the_compiler_options_at_0_6913": {
            return $state.You_can_learn_about_all_of_the_compiler_options_at_0;
            break;
        }
        case "Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_conf_6914": {
            return $state.Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_config_watch_mode_with_Colon;
            break;
        }
        case "Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_tr_6915": {
            return $state.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0;
            break;
        }
        case "COMMON_COMMANDS_6916": {
            return $state.COMMON_COMMANDS;
            break;
        }
        case "ALL_COMPILER_OPTIONS_6917": {
            return $state.ALL_COMPILER_OPTIONS;
            break;
        }
        case "WATCH_OPTIONS_6918": {
            return $state.WATCH_OPTIONS;
            break;
        }
        case "BUILD_OPTIONS_6919": {
            return $state.BUILD_OPTIONS;
            break;
        }
        case "COMMON_COMPILER_OPTIONS_6920": {
            return $state.COMMON_COMPILER_OPTIONS;
            break;
        }
        case "COMMAND_LINE_FLAGS_6921": {
            return $state.COMMAND_LINE_FLAGS;
            break;
        }
        case "tsc_Colon_The_TypeScript_Compiler_6922": {
            return $state.X_tsc_Colon_The_TypeScript_Compiler;
            break;
        }
        case "Compiles_the_current_project_tsconfig_json_in_the_working_directory_6923": {
            return $state.Compiles_the_current_project_tsconfig_json_in_the_working_directory;
            break;
        }
        case "Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options_6924": {
            return $state.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options;
            break;
        }
        case "Build_a_composite_project_in_the_working_directory_6925": {
            return $state.Build_a_composite_project_in_the_working_directory;
            break;
        }
        case "Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory_6926": {
            return $state.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory;
            break;
        }
        case "Compiles_the_TypeScript_project_located_at_the_specified_path_6927": {
            return $state.Compiles_the_TypeScript_project_located_at_the_specified_path;
            break;
        }
        case "An_expanded_version_of_this_information_showing_all_possible_compiler_options_6928": {
            return $state.An_expanded_version_of_this_information_showing_all_possible_compiler_options;
            break;
        }
        case "Compiles_the_current_project_with_additional_settings_6929": {
            return $state.Compiles_the_current_project_with_additional_settings;
            break;
        }
        case "true_for_ES2022_and_above_including_ESNext_6930": {
            return $state.X_true_for_ES2022_and_above_including_ESNext;
            break;
        }
        case "List_of_file_name_suffixes_to_search_when_resolving_a_module_6931": {
            return $state.List_of_file_name_suffixes_to_search_when_resolving_a_module;
            break;
        }
        case "false_unless_checkJs_is_set_6932": {
            return $state.X_false_unless_checkJs_is_set;
            break;
        }
        case "Variable_0_implicitly_has_an_1_type_7005": {
            return $state.Variable_0_implicitly_has_an_1_type;
            break;
        }
        case "Parameter_0_implicitly_has_an_1_type_7006": {
            return $state.Parameter_0_implicitly_has_an_1_type;
            break;
        }
        case "Member_0_implicitly_has_an_1_type_7008": {
            return $state.Member_0_implicitly_has_an_1_type;
            break;
        }
        case "new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type_7009": {
            return $state.X_new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type;
            break;
        }
        case "_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type_7010": {
            return $state.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
            break;
        }
        case "Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type_7011": {
            return $state.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type;
            break;
        }
        case "This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation_7012": {
            return $state.This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation;
            break;
        }
        case "Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7013": {
            return $state.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type;
            break;
        }
        case "Function_type_which_lacks_return_type_annotation_implicitly_has_an_0_return_type_7014": {
            return $state.Function_type_which_lacks_return_type_annotation_implicitly_has_an_0_return_type;
            break;
        }
        case "Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number_7015": {
            return $state.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number;
            break;
        }
        case "Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type_7016": {
            return $state.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
            break;
        }
        case "Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_7017": {
            return $state.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature;
            break;
        }
        case "Object_literal_s_property_0_implicitly_has_an_1_type_7018": {
            return $state.Object_literal_s_property_0_implicitly_has_an_1_type;
            break;
        }
        case "Rest_parameter_0_implicitly_has_an_any_type_7019": {
            return $state.Rest_parameter_0_implicitly_has_an_any_type;
            break;
        }
        case "Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7020": {
            return $state.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type;
            break;
        }
        case "_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or__7022": {
            return $state.X_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer;
            break;
        }
        case "_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_reference_7023": {
            return $state.X_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions;
            break;
        }
        case "Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_ref_7024": {
            return $state.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions;
            break;
        }
        case "Generator_implicitly_has_yield_type_0_Consider_supplying_a_return_type_annotation_7025": {
            return $state.Generator_implicitly_has_yield_type_0_Consider_supplying_a_return_type_annotation;
            break;
        }
        case "JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026": {
            return $state.JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists;
            break;
        }
        case "Unreachable_code_detected_7027": {
            return $state.Unreachable_code_detected;
            break;
        }
        case "Unused_label_7028": {
            return $state.Unused_label;
            break;
        }
        case "Fallthrough_case_in_switch_7029": {
            return $state.Fallthrough_case_in_switch;
            break;
        }
        case "Not_all_code_paths_return_a_value_7030": {
            return $state.Not_all_code_paths_return_a_value;
            break;
        }
        case "Binding_element_0_implicitly_has_an_1_type_7031": {
            return $state.Binding_element_0_implicitly_has_an_1_type;
            break;
        }
        case "Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation_7032": {
            return $state.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation;
            break;
        }
        case "Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation_7033": {
            return $state.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation;
            break;
        }
        case "Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined_7034": {
            return $state.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined;
            break;
        }
        case "Try_npm_i_save_dev_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare__7035": {
            return $state.Try_npm_i_save_dev_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0;
            break;
        }
        case "Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0_7036": {
            return $state.Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0;
            break;
        }
        case "Enables_emit_interoperability_between_CommonJS_and_ES_Modules_via_creation_of_namespace_objects_for__7037": {
            return $state.Enables_emit_interoperability_between_CommonJS_and_ES_Modules_via_creation_of_namespace_objects_for_all_imports_Implies_allowSyntheticDefaultImports;
            break;
        }
        case "Type_originates_at_this_import_A_namespace_style_import_cannot_be_called_or_constructed_and_will_cau_7038": {
            return $state.Type_originates_at_this_import_A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime_Consider_using_a_default_import_or_import_require_here_instead;
            break;
        }
        case "Mapped_object_type_implicitly_has_an_any_template_type_7039": {
            return $state.Mapped_object_type_implicitly_has_an_any_template_type;
            break;
        }
        case "If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_S_7040": {
            return $state.If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_Slash_Slashgithub_com_SlashDefinitelyTyped_SlashDefinitelyTyped_Slashtree_Slashmaster_Slashtypes_Slash_1;
            break;
        }
        case "The_containing_arrow_function_captures_the_global_value_of_this_7041": {
            return $state.The_containing_arrow_function_captures_the_global_value_of_this;
            break;
        }
        case "Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used_7042": {
            return $state.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
            break;
        }
        case "Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage_7043": {
            return $state.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage_7044": {
            return $state.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage_7045": {
            return $state.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage_7046": {
            return $state.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage_7047": {
            return $state.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage_7048": {
            return $state.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage;
            break;
        }
        case "Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage_7049": {
            return $state.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage;
            break;
        }
        case "_0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage_7050": {
            return $state.X_0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage;
            break;
        }
        case "Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1_7051": {
            return $state.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1;
            break;
        }
        case "Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1_7052": {
            return $state.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1;
            break;
        }
        case "Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1_7053": {
            return $state.Element_implicitly_has_an_any_type_because_expression_of_type_0_can_t_be_used_to_index_type_1;
            break;
        }
        case "No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1_7054": {
            return $state.No_index_signature_with_a_parameter_of_type_0_was_found_on_type_1;
            break;
        }
        case "_0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type_7055": {
            return $state.X_0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type;
            break;
        }
        case "The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_ty_7056": {
            return $state.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed;
            break;
        }
        case "yield_expression_implicitly_results_in_an_any_type_because_its_containing_generator_lacks_a_return_t_7057": {
            return $state.X_yield_expression_implicitly_results_in_an_any_type_because_its_containing_generator_lacks_a_return_type_annotation;
            break;
        }
        case "If_the_0_package_actually_exposes_this_module_try_adding_a_new_declaration_d_ts_file_containing_decl_7058": {
            return $state.If_the_0_package_actually_exposes_this_module_try_adding_a_new_declaration_d_ts_file_containing_declare_module_1;
            break;
        }
        case "This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Use_an_as_expression_instead_7059": {
            return $state.This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Use_an_as_expression_instead;
            break;
        }
        case "This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Add_a_trailing_comma_or_explicit_cons_7060": {
            return $state.This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Add_a_trailing_comma_or_explicit_constraint;
            break;
        }
        case "A_mapped_type_may_not_declare_properties_or_methods_7061": {
            return $state.A_mapped_type_may_not_declare_properties_or_methods;
            break;
        }
        case "You_cannot_rename_this_element_8000": {
            return $state.You_cannot_rename_this_element;
            break;
        }
        case "You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library_8001": {
            return $state.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library;
            break;
        }
        case "import_can_only_be_used_in_TypeScript_files_8002": {
            return $state.X_import_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "export_can_only_be_used_in_TypeScript_files_8003": {
            return $state.X_export_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Type_parameter_declarations_can_only_be_used_in_TypeScript_files_8004": {
            return $state.Type_parameter_declarations_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "implements_clauses_can_only_be_used_in_TypeScript_files_8005": {
            return $state.X_implements_clauses_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "_0_declarations_can_only_be_used_in_TypeScript_files_8006": {
            return $state.X_0_declarations_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Type_aliases_can_only_be_used_in_TypeScript_files_8008": {
            return $state.Type_aliases_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "The_0_modifier_can_only_be_used_in_TypeScript_files_8009": {
            return $state.The_0_modifier_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Type_annotations_can_only_be_used_in_TypeScript_files_8010": {
            return $state.Type_annotations_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Type_arguments_can_only_be_used_in_TypeScript_files_8011": {
            return $state.Type_arguments_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Parameter_modifiers_can_only_be_used_in_TypeScript_files_8012": {
            return $state.Parameter_modifiers_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Non_null_assertions_can_only_be_used_in_TypeScript_files_8013": {
            return $state.Non_null_assertions_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Type_assertion_expressions_can_only_be_used_in_TypeScript_files_8016": {
            return $state.Type_assertion_expressions_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Signature_declarations_can_only_be_used_in_TypeScript_files_8017": {
            return $state.Signature_declarations_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Report_errors_in_js_files_8019": {
            return $state.Report_errors_in_js_files;
            break;
        }
        case "JSDoc_types_can_only_be_used_inside_documentation_comments_8020": {
            return $state.JSDoc_types_can_only_be_used_inside_documentation_comments;
            break;
        }
        case "JSDoc_typedef_tag_should_either_have_a_type_annotation_or_be_followed_by_property_or_member_tags_8021": {
            return $state.JSDoc_typedef_tag_should_either_have_a_type_annotation_or_be_followed_by_property_or_member_tags;
            break;
        }
        case "JSDoc_0_is_not_attached_to_a_class_8022": {
            return $state.JSDoc_0_is_not_attached_to_a_class;
            break;
        }
        case "JSDoc_0_1_does_not_match_the_extends_2_clause_8023": {
            return $state.JSDoc_0_1_does_not_match_the_extends_2_clause;
            break;
        }
        case "JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_8024": {
            return $state.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name;
            break;
        }
        case "Class_declarations_cannot_have_more_than_one_augments_or_extends_tag_8025": {
            return $state.Class_declarations_cannot_have_more_than_one_augments_or_extends_tag;
            break;
        }
        case "Expected_0_type_arguments_provide_these_with_an_extends_tag_8026": {
            return $state.Expected_0_type_arguments_provide_these_with_an_extends_tag;
            break;
        }
        case "Expected_0_1_type_arguments_provide_these_with_an_extends_tag_8027": {
            return $state.Expected_0_1_type_arguments_provide_these_with_an_extends_tag;
            break;
        }
        case "JSDoc_may_only_appear_in_the_last_parameter_of_a_signature_8028": {
            return $state.JSDoc_may_only_appear_in_the_last_parameter_of_a_signature;
            break;
        }
        case "JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_It_would_match_arguments_if_it_h_8029": {
            return $state.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_It_would_match_arguments_if_it_had_an_array_type;
            break;
        }
        case "A_JSDoc_type_tag_on_a_function_must_have_a_signature_with_the_correct_number_of_arguments_8030": {
            return $state.A_JSDoc_type_tag_on_a_function_must_have_a_signature_with_the_correct_number_of_arguments;
            break;
        }
        case "You_cannot_rename_a_module_via_a_global_import_8031": {
            return $state.You_cannot_rename_a_module_via_a_global_import;
            break;
        }
        case "Qualified_name_0_is_not_allowed_without_a_leading_param_object_1_8032": {
            return $state.Qualified_name_0_is_not_allowed_without_a_leading_param_object_1;
            break;
        }
        case "A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags_8033": {
            return $state.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags;
            break;
        }
        case "The_tag_was_first_specified_here_8034": {
            return $state.The_tag_was_first_specified_here;
            break;
        }
        case "You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder_8035": {
            return $state.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder;
            break;
        }
        case "You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder_8036": {
            return $state.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder;
            break;
        }
        case "Type_satisfaction_expressions_can_only_be_used_in_TypeScript_files_8037": {
            return $state.Type_satisfaction_expressions_can_only_be_used_in_TypeScript_files;
            break;
        }
        case "Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export_8038": {
            return $state.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export;
            break;
        }
        case "A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag_8039": {
            return $state.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag;
            break;
        }
        case "File_rename_is_not_supported_by_the_editor_8040": {
            return $state.File_rename_is_not_supported_by_the_editor;
            break;
        }
        case "Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_9005": {
            return $state.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit;
            break;
        }
        case "Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotati_9006": {
            return $state.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit;
            break;
        }
        case "Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations_9007": {
            return $state.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations_9008": {
            return $state.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations_9009": {
            return $state.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations_9010": {
            return $state.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations_9011": {
            return $state.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations_9012": {
            return $state.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case "Expression_type_can_t_be_inferred_with_isolatedDeclarations_9013": {
            return $state.Expression_type_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedD_9014": {
            return $state.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations;
            break;
        }
        case "Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations_9015": {
            return $state.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations_9016": {
            return $state.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Only_const_arrays_can_be_inferred_with_isolatedDeclarations_9017": {
            return $state.Only_const_arrays_can_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations_9018": {
            return $state.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations;
            break;
        }
        case "Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations_9019": {
            return $state.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations;
            break;
        }
        case "Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDecl_9020": {
            return $state.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations;
            break;
        }
        case "Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations_9021": {
            return $state.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations;
            break;
        }
        case "Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations_9022": {
            return $state.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations;
            break;
        }
        case "Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations__9023": {
            return $state.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function;
            break;
        }
        case "Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_sup_9025": {
            return $state.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_supported_with_isolatedDeclarations;
            break;
        }
        case "Declaration_emit_for_this_file_requires_preserving_this_import_for_augmentations_This_is_not_support_9026": {
            return $state.Declaration_emit_for_this_file_requires_preserving_this_import_for_augmentations_This_is_not_supported_with_isolatedDeclarations;
            break;
        }
        case "Add_a_type_annotation_to_the_variable_0_9027": {
            return $state.Add_a_type_annotation_to_the_variable_0;
            break;
        }
        case "Add_a_type_annotation_to_the_parameter_0_9028": {
            return $state.Add_a_type_annotation_to_the_parameter_0;
            break;
        }
        case "Add_a_type_annotation_to_the_property_0_9029": {
            return $state.Add_a_type_annotation_to_the_property_0;
            break;
        }
        case "Add_a_return_type_to_the_function_expression_9030": {
            return $state.Add_a_return_type_to_the_function_expression;
            break;
        }
        case "Add_a_return_type_to_the_function_declaration_9031": {
            return $state.Add_a_return_type_to_the_function_declaration;
            break;
        }
        case "Add_a_return_type_to_the_get_accessor_declaration_9032": {
            return $state.Add_a_return_type_to_the_get_accessor_declaration;
            break;
        }
        case "Add_a_type_to_parameter_of_the_set_accessor_declaration_9033": {
            return $state.Add_a_type_to_parameter_of_the_set_accessor_declaration;
            break;
        }
        case "Add_a_return_type_to_the_method_9034": {
            return $state.Add_a_return_type_to_the_method;
            break;
        }
        case "Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit_9035": {
            return $state.Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit;
            break;
        }
        case "Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it_9036": {
            return $state.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it;
            break;
        }
        case "Default_exports_can_t_be_inferred_with_isolatedDeclarations_9037": {
            return $state.Default_exports_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations_9038": {
            return $state.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations;
            break;
        }
        case "Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations_9039": {
            return $state.Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations;
            break;
        }
        case "JSX_attributes_must_only_be_assigned_a_non_empty_expression_17000": {
            return $state.JSX_attributes_must_only_be_assigned_a_non_empty_expression;
            break;
        }
        case "JSX_elements_cannot_have_multiple_attributes_with_the_same_name_17001": {
            return $state.JSX_elements_cannot_have_multiple_attributes_with_the_same_name;
            break;
        }
        case "Expected_corresponding_JSX_closing_tag_for_0_17002": {
            return $state.Expected_corresponding_JSX_closing_tag_for_0;
            break;
        }
        case "Cannot_use_JSX_unless_the_jsx_flag_is_provided_17004": {
            return $state.Cannot_use_JSX_unless_the_jsx_flag_is_provided;
            break;
        }
        case "A_constructor_cannot_contain_a_super_call_when_its_class_extends_null_17005": {
            return $state.A_constructor_cannot_contain_a_super_call_when_its_class_extends_null;
            break;
        }
        case "An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_ex_17006": {
            return $state.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses;
            break;
        }
        case "A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Con_17007": {
            return $state.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses;
            break;
        }
        case "JSX_element_0_has_no_corresponding_closing_tag_17008": {
            return $state.JSX_element_0_has_no_corresponding_closing_tag;
            break;
        }
        case "super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class_17009": {
            return $state.X_super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class;
            break;
        }
        case "Unknown_type_acquisition_option_0_17010": {
            return $state.Unknown_type_acquisition_option_0;
            break;
        }
        case "super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class_17011": {
            return $state.X_super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class;
            break;
        }
        case "_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2_17012": {
            return $state.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2;
            break;
        }
        case "Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constru_17013": {
            return $state.Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constructor;
            break;
        }
        case "JSX_fragment_has_no_corresponding_closing_tag_17014": {
            return $state.JSX_fragment_has_no_corresponding_closing_tag;
            break;
        }
        case "Expected_corresponding_closing_tag_for_JSX_fragment_17015": {
            return $state.Expected_corresponding_closing_tag_for_JSX_fragment;
            break;
        }
        case "The_jsxFragmentFactory_compiler_option_must_be_provided_to_use_JSX_fragments_with_the_jsxFactory_com_17016": {
            return $state.The_jsxFragmentFactory_compiler_option_must_be_provided_to_use_JSX_fragments_with_the_jsxFactory_compiler_option;
            break;
        }
        case "An_jsxFrag_pragma_is_required_when_using_an_jsx_pragma_with_JSX_fragments_17017": {
            return $state.An_jsxFrag_pragma_is_required_when_using_an_jsx_pragma_with_JSX_fragments;
            break;
        }
        case "Unknown_type_acquisition_option_0_Did_you_mean_1_17018": {
            return $state.Unknown_type_acquisition_option_0_Did_you_mean_1;
            break;
        }
        case "_0_at_the_end_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1_17019": {
            return $state.X_0_at_the_end_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1;
            break;
        }
        case "_0_at_the_start_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1_17020": {
            return $state.X_0_at_the_start_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1;
            break;
        }
        case "Unicode_escape_sequence_cannot_appear_here_17021": {
            return $state.Unicode_escape_sequence_cannot_appear_here;
            break;
        }
        case "Circularity_detected_while_resolving_configuration_Colon_0_18000": {
            return $state.Circularity_detected_while_resolving_configuration_Colon_0;
            break;
        }
        case "The_files_list_in_config_file_0_is_empty_18002": {
            return $state.The_files_list_in_config_file_0_is_empty;
            break;
        }
        case "No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2_18003": {
            return $state.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2;
            break;
        }
        case "No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer_18004": {
            return $state.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer;
            break;
        }
        case "Classes_may_not_have_a_field_named_constructor_18006": {
            return $state.Classes_may_not_have_a_field_named_constructor;
            break;
        }
        case "JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array_18007": {
            return $state.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array;
            break;
        }
        case "Private_identifiers_cannot_be_used_as_parameters_18009": {
            return $state.Private_identifiers_cannot_be_used_as_parameters;
            break;
        }
        case "An_accessibility_modifier_cannot_be_used_with_a_private_identifier_18010": {
            return $state.An_accessibility_modifier_cannot_be_used_with_a_private_identifier;
            break;
        }
        case "The_operand_of_a_delete_operator_cannot_be_a_private_identifier_18011": {
            return $state.The_operand_of_a_delete_operator_cannot_be_a_private_identifier;
            break;
        }
        case "constructor_is_a_reserved_word_18012": {
            return $state.X_constructor_is_a_reserved_word;
            break;
        }
        case "Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier_18013": {
            return $state.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier;
            break;
        }
        case "The_property_0_cannot_be_accessed_on_type_1_within_this_class_because_it_is_shadowed_by_another_priv_18014": {
            return $state.The_property_0_cannot_be_accessed_on_type_1_within_this_class_because_it_is_shadowed_by_another_private_identifier_with_the_same_spelling;
            break;
        }
        case "Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2_18015": {
            return $state.Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2;
            break;
        }
        case "Private_identifiers_are_not_allowed_outside_class_bodies_18016": {
            return $state.Private_identifiers_are_not_allowed_outside_class_bodies;
            break;
        }
        case "The_shadowing_declaration_of_0_is_defined_here_18017": {
            return $state.The_shadowing_declaration_of_0_is_defined_here;
            break;
        }
        case "The_declaration_of_0_that_you_probably_intended_to_use_is_defined_here_18018": {
            return $state.The_declaration_of_0_that_you_probably_intended_to_use_is_defined_here;
            break;
        }
        case "_0_modifier_cannot_be_used_with_a_private_identifier_18019": {
            return $state.X_0_modifier_cannot_be_used_with_a_private_identifier;
            break;
        }
        case "An_enum_member_cannot_be_named_with_a_private_identifier_18024": {
            return $state.An_enum_member_cannot_be_named_with_a_private_identifier;
            break;
        }
        case "can_only_be_used_at_the_start_of_a_file_18026": {
            return $state.X_can_only_be_used_at_the_start_of_a_file;
            break;
        }
        case "Compiler_reserves_name_0_when_emitting_private_identifier_downlevel_18027": {
            return $state.Compiler_reserves_name_0_when_emitting_private_identifier_downlevel;
            break;
        }
        case "Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher_18028": {
            return $state.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher;
            break;
        }
        case "Private_identifiers_are_not_allowed_in_variable_declarations_18029": {
            return $state.Private_identifiers_are_not_allowed_in_variable_declarations;
            break;
        }
        case "An_optional_chain_cannot_contain_private_identifiers_18030": {
            return $state.An_optional_chain_cannot_contain_private_identifiers;
            break;
        }
        case "The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituent_18031": {
            return $state.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents;
            break;
        }
        case "The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_pr_18032": {
            return $state.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some;
            break;
        }
        case "Type_0_is_not_assignable_to_type_1_as_required_for_computed_enum_member_values_18033": {
            return $state.Type_0_is_not_assignable_to_type_1_as_required_for_computed_enum_member_values;
            break;
        }
        case "Specify_the_JSX_fragment_factory_function_to_use_when_targeting_react_JSX_emit_with_jsxFactory_compi_18034": {
            return $state.Specify_the_JSX_fragment_factory_function_to_use_when_targeting_react_JSX_emit_with_jsxFactory_compiler_option_is_specified_e_g_Fragment;
            break;
        }
        case "Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name_18035": {
            return $state.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name;
            break;
        }
        case "Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_dec_18036": {
            return $state.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator;
            break;
        }
        case "await_expression_cannot_be_used_inside_a_class_static_block_18037": {
            return $state.X_await_expression_cannot_be_used_inside_a_class_static_block;
            break;
        }
        case "for_await_loops_cannot_be_used_inside_a_class_static_block_18038": {
            return $state.X_for_await_loops_cannot_be_used_inside_a_class_static_block;
            break;
        }
        case "Invalid_use_of_0_It_cannot_be_used_inside_a_class_static_block_18039": {
            return $state.Invalid_use_of_0_It_cannot_be_used_inside_a_class_static_block;
            break;
        }
        case "A_return_statement_cannot_be_used_inside_a_class_static_block_18041": {
            return $state.A_return_statement_cannot_be_used_inside_a_class_static_block;
            break;
        }
        case "_0_is_a_type_and_cannot_be_imported_in_JavaScript_files_Use_1_in_a_JSDoc_type_annotation_18042": {
            return $state.X_0_is_a_type_and_cannot_be_imported_in_JavaScript_files_Use_1_in_a_JSDoc_type_annotation;
            break;
        }
        case "Types_cannot_appear_in_export_declarations_in_JavaScript_files_18043": {
            return $state.Types_cannot_appear_in_export_declarations_in_JavaScript_files;
            break;
        }
        case "_0_is_automatically_exported_here_18044": {
            return $state.X_0_is_automatically_exported_here;
            break;
        }
        case "Properties_with_the_accessor_modifier_are_only_available_when_targeting_ECMAScript_2015_and_higher_18045": {
            return $state.Properties_with_the_accessor_modifier_are_only_available_when_targeting_ECMAScript_2015_and_higher;
            break;
        }
        case "_0_is_of_type_unknown_18046": {
            return $state.X_0_is_of_type_unknown;
            break;
        }
        case "_0_is_possibly_null_18047": {
            return $state.X_0_is_possibly_null;
            break;
        }
        case "_0_is_possibly_undefined_18048": {
            return $state.X_0_is_possibly_undefined;
            break;
        }
        case "_0_is_possibly_null_or_undefined_18049": {
            return $state.X_0_is_possibly_null_or_undefined;
            break;
        }
        case "The_value_0_cannot_be_used_here_18050": {
            return $state.The_value_0_cannot_be_used_here;
            break;
        }
        case "Compiler_option_0_cannot_be_given_an_empty_string_18051": {
            return $state.Compiler_option_0_cannot_be_given_an_empty_string;
            break;
        }
        case "Its_type_0_is_not_a_valid_JSX_element_type_18053": {
            return $state.Its_type_0_is_not_a_valid_JSX_element_type;
            break;
        }
        case "await_using_statements_cannot_be_used_inside_a_class_static_block_18054": {
            return $state.X_await_using_statements_cannot_be_used_inside_a_class_static_block;
            break;
        }
        case "_0_has_a_string_type_but_must_have_syntactically_recognizable_string_syntax_when_isolatedModules_is__18055": {
            return $state.X_0_has_a_string_type_but_must_have_syntactically_recognizable_string_syntax_when_isolatedModules_is_enabled;
            break;
        }
        case "Enum_member_following_a_non_literal_numeric_member_must_have_an_initializer_when_isolatedModules_is__18056": {
            return $state.Enum_member_following_a_non_literal_numeric_member_must_have_an_initializer_when_isolatedModules_is_enabled;
            break;
        }
        case "String_literal_import_and_export_names_are_not_supported_when_the_module_flag_is_set_to_es2015_or_es_18057": {
            return $state.String_literal_import_and_export_names_are_not_supported_when_the_module_flag_is_set_to_es2015_or_es2020;
            break;
        }
        case "Default_imports_are_not_allowed_in_a_deferred_import_18058": {
            return $state.Default_imports_are_not_allowed_in_a_deferred_import;
            break;
        }
        case "Named_imports_are_not_allowed_in_a_deferred_import_18059": {
            return $state.Named_imports_are_not_allowed_in_a_deferred_import;
            break;
        }
        case "Deferred_imports_are_only_supported_when_the_module_flag_is_set_to_esnext_or_preserve_18060": {
            return $state.Deferred_imports_are_only_supported_when_the_module_flag_is_set_to_esnext_or_preserve;
            break;
        }
        case "_0_is_not_a_valid_meta_property_for_keyword_import_Did_you_mean_meta_or_defer_18061": {
            return $state.X_0_is_not_a_valid_meta_property_for_keyword_import_Did_you_mean_meta_or_defer;
            break;
        }
        case "nodenext_if_module_is_nodenext_node16_if_module_is_node16_or_node18_otherwise_bundler_69010": {
            return $state.X_nodenext_if_module_is_nodenext_node16_if_module_is_node16_or_node18_otherwise_bundler;
            break;
        }
        case "File_is_a_CommonJS_module_it_may_be_converted_to_an_ES_module_80001": {
            return $state.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES_module;
            break;
        }
        case "This_constructor_function_may_be_converted_to_a_class_declaration_80002": {
            return $state.This_constructor_function_may_be_converted_to_a_class_declaration;
            break;
        }
        case "Import_may_be_converted_to_a_default_import_80003": {
            return $state.Import_may_be_converted_to_a_default_import;
            break;
        }
        case "JSDoc_types_may_be_moved_to_TypeScript_types_80004": {
            return $state.JSDoc_types_may_be_moved_to_TypeScript_types;
            break;
        }
        case "require_call_may_be_converted_to_an_import_80005": {
            return $state.X_require_call_may_be_converted_to_an_import;
            break;
        }
        case "This_may_be_converted_to_an_async_function_80006": {
            return $state.This_may_be_converted_to_an_async_function;
            break;
        }
        case "await_has_no_effect_on_the_type_of_this_expression_80007": {
            return $state.X_await_has_no_effect_on_the_type_of_this_expression;
            break;
        }
        case "Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accur_80008": {
            return $state.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers;
            break;
        }
        case "JSDoc_typedef_may_be_converted_to_TypeScript_type_80009": {
            return $state.JSDoc_typedef_may_be_converted_to_TypeScript_type;
            break;
        }
        case "JSDoc_typedefs_may_be_converted_to_TypeScript_types_80010": {
            return $state.JSDoc_typedefs_may_be_converted_to_TypeScript_types;
            break;
        }
        case "Add_missing_super_call_90001": {
            return $state.Add_missing_super_call;
            break;
        }
        case "Make_super_call_the_first_statement_in_the_constructor_90002": {
            return $state.Make_super_call_the_first_statement_in_the_constructor;
            break;
        }
        case "Change_extends_to_implements_90003": {
            return $state.Change_extends_to_implements;
            break;
        }
        case "Remove_unused_declaration_for_Colon_0_90004": {
            return $state.Remove_unused_declaration_for_Colon_0;
            break;
        }
        case "Remove_import_from_0_90005": {
            return $state.Remove_import_from_0;
            break;
        }
        case "Implement_interface_0_90006": {
            return $state.Implement_interface_0;
            break;
        }
        case "Implement_inherited_abstract_class_90007": {
            return $state.Implement_inherited_abstract_class;
            break;
        }
        case "Add_0_to_unresolved_variable_90008": {
            return $state.Add_0_to_unresolved_variable;
            break;
        }
        case "Remove_variable_statement_90010": {
            return $state.Remove_variable_statement;
            break;
        }
        case "Remove_template_tag_90011": {
            return $state.Remove_template_tag;
            break;
        }
        case "Remove_type_parameters_90012": {
            return $state.Remove_type_parameters;
            break;
        }
        case "Import_0_from_1_90013": {
            return $state.Import_0_from_1;
            break;
        }
        case "Change_0_to_1_90014": {
            return $state.Change_0_to_1;
            break;
        }
        case "Declare_property_0_90016": {
            return $state.Declare_property_0;
            break;
        }
        case "Add_index_signature_for_property_0_90017": {
            return $state.Add_index_signature_for_property_0;
            break;
        }
        case "Disable_checking_for_this_file_90018": {
            return $state.Disable_checking_for_this_file;
            break;
        }
        case "Ignore_this_error_message_90019": {
            return $state.Ignore_this_error_message;
            break;
        }
        case "Initialize_property_0_in_the_constructor_90020": {
            return $state.Initialize_property_0_in_the_constructor;
            break;
        }
        case "Initialize_static_property_0_90021": {
            return $state.Initialize_static_property_0;
            break;
        }
        case "Change_spelling_to_0_90022": {
            return $state.Change_spelling_to_0;
            break;
        }
        case "Declare_method_0_90023": {
            return $state.Declare_method_0;
            break;
        }
        case "Declare_static_method_0_90024": {
            return $state.Declare_static_method_0;
            break;
        }
        case "Prefix_0_with_an_underscore_90025": {
            return $state.Prefix_0_with_an_underscore;
            break;
        }
        case "Rewrite_as_the_indexed_access_type_0_90026": {
            return $state.Rewrite_as_the_indexed_access_type_0;
            break;
        }
        case "Declare_static_property_0_90027": {
            return $state.Declare_static_property_0;
            break;
        }
        case "Call_decorator_expression_90028": {
            return $state.Call_decorator_expression;
            break;
        }
        case "Add_async_modifier_to_containing_function_90029": {
            return $state.Add_async_modifier_to_containing_function;
            break;
        }
        case "Replace_infer_0_with_unknown_90030": {
            return $state.Replace_infer_0_with_unknown;
            break;
        }
        case "Replace_all_unused_infer_with_unknown_90031": {
            return $state.Replace_all_unused_infer_with_unknown;
            break;
        }
        case "Add_parameter_name_90034": {
            return $state.Add_parameter_name;
            break;
        }
        case "Declare_private_property_0_90035": {
            return $state.Declare_private_property_0;
            break;
        }
        case "Replace_0_with_Promise_1_90036": {
            return $state.Replace_0_with_Promise_1;
            break;
        }
        case "Fix_all_incorrect_return_type_of_an_async_functions_90037": {
            return $state.Fix_all_incorrect_return_type_of_an_async_functions;
            break;
        }
        case "Declare_private_method_0_90038": {
            return $state.Declare_private_method_0;
            break;
        }
        case "Remove_unused_destructuring_declaration_90039": {
            return $state.Remove_unused_destructuring_declaration;
            break;
        }
        case "Remove_unused_declarations_for_Colon_0_90041": {
            return $state.Remove_unused_declarations_for_Colon_0;
            break;
        }
        case "Declare_a_private_field_named_0_90053": {
            return $state.Declare_a_private_field_named_0;
            break;
        }
        case "Includes_imports_of_types_referenced_by_0_90054": {
            return $state.Includes_imports_of_types_referenced_by_0;
            break;
        }
        case "Remove_type_from_import_declaration_from_0_90055": {
            return $state.Remove_type_from_import_declaration_from_0;
            break;
        }
        case "Remove_type_from_import_of_0_from_1_90056": {
            return $state.Remove_type_from_import_of_0_from_1;
            break;
        }
        case "Add_import_from_0_90057": {
            return $state.Add_import_from_0;
            break;
        }
        case "Update_import_from_0_90058": {
            return $state.Update_import_from_0;
            break;
        }
        case "Export_0_from_module_1_90059": {
            return $state.Export_0_from_module_1;
            break;
        }
        case "Export_all_referenced_locals_90060": {
            return $state.Export_all_referenced_locals;
            break;
        }
        case "Update_modifiers_of_0_90061": {
            return $state.Update_modifiers_of_0;
            break;
        }
        case "Add_annotation_of_type_0_90062": {
            return $state.Add_annotation_of_type_0;
            break;
        }
        case "Add_return_type_0_90063": {
            return $state.Add_return_type_0;
            break;
        }
        case "Extract_base_class_to_variable_90064": {
            return $state.Extract_base_class_to_variable;
            break;
        }
        case "Extract_default_export_to_variable_90065": {
            return $state.Extract_default_export_to_variable;
            break;
        }
        case "Extract_binding_expressions_to_variable_90066": {
            return $state.Extract_binding_expressions_to_variable;
            break;
        }
        case "Add_all_missing_type_annotations_90067": {
            return $state.Add_all_missing_type_annotations;
            break;
        }
        case "Add_satisfies_and_an_inline_type_assertion_with_0_90068": {
            return $state.Add_satisfies_and_an_inline_type_assertion_with_0;
            break;
        }
        case "Extract_to_variable_and_replace_with_0_as_typeof_0_90069": {
            return $state.Extract_to_variable_and_replace_with_0_as_typeof_0;
            break;
        }
        case "Mark_array_literal_as_const_90070": {
            return $state.Mark_array_literal_as_const;
            break;
        }
        case "Annotate_types_of_properties_expando_function_in_a_namespace_90071": {
            return $state.Annotate_types_of_properties_expando_function_in_a_namespace;
            break;
        }
        case "Convert_function_to_an_ES2015_class_95001": {
            return $state.Convert_function_to_an_ES2015_class;
            break;
        }
        case "Convert_0_to_1_in_0_95003": {
            return $state.Convert_0_to_1_in_0;
            break;
        }
        case "Extract_to_0_in_1_95004": {
            return $state.Extract_to_0_in_1;
            break;
        }
        case "Extract_function_95005": {
            return $state.Extract_function;
            break;
        }
        case "Extract_constant_95006": {
            return $state.Extract_constant;
            break;
        }
        case "Extract_to_0_in_enclosing_scope_95007": {
            return $state.Extract_to_0_in_enclosing_scope;
            break;
        }
        case "Extract_to_0_in_1_scope_95008": {
            return $state.Extract_to_0_in_1_scope;
            break;
        }
        case "Annotate_with_type_from_JSDoc_95009": {
            return $state.Annotate_with_type_from_JSDoc;
            break;
        }
        case "Infer_type_of_0_from_usage_95011": {
            return $state.Infer_type_of_0_from_usage;
            break;
        }
        case "Infer_parameter_types_from_usage_95012": {
            return $state.Infer_parameter_types_from_usage;
            break;
        }
        case "Convert_to_default_import_95013": {
            return $state.Convert_to_default_import;
            break;
        }
        case "Install_0_95014": {
            return $state.Install_0;
            break;
        }
        case "Replace_import_with_0_95015": {
            return $state.Replace_import_with_0;
            break;
        }
        case "Use_synthetic_default_member_95016": {
            return $state.Use_synthetic_default_member;
            break;
        }
        case "Convert_to_ES_module_95017": {
            return $state.Convert_to_ES_module;
            break;
        }
        case "Add_undefined_type_to_property_0_95018": {
            return $state.Add_undefined_type_to_property_0;
            break;
        }
        case "Add_initializer_to_property_0_95019": {
            return $state.Add_initializer_to_property_0;
            break;
        }
        case "Add_definite_assignment_assertion_to_property_0_95020": {
            return $state.Add_definite_assignment_assertion_to_property_0;
            break;
        }
        case "Convert_all_type_literals_to_mapped_type_95021": {
            return $state.Convert_all_type_literals_to_mapped_type;
            break;
        }
        case "Add_all_missing_members_95022": {
            return $state.Add_all_missing_members;
            break;
        }
        case "Infer_all_types_from_usage_95023": {
            return $state.Infer_all_types_from_usage;
            break;
        }
        case "Delete_all_unused_declarations_95024": {
            return $state.Delete_all_unused_declarations;
            break;
        }
        case "Prefix_all_unused_declarations_with_where_possible_95025": {
            return $state.Prefix_all_unused_declarations_with_where_possible;
            break;
        }
        case "Fix_all_detected_spelling_errors_95026": {
            return $state.Fix_all_detected_spelling_errors;
            break;
        }
        case "Add_initializers_to_all_uninitialized_properties_95027": {
            return $state.Add_initializers_to_all_uninitialized_properties;
            break;
        }
        case "Add_definite_assignment_assertions_to_all_uninitialized_properties_95028": {
            return $state.Add_definite_assignment_assertions_to_all_uninitialized_properties;
            break;
        }
        case "Add_undefined_type_to_all_uninitialized_properties_95029": {
            return $state.Add_undefined_type_to_all_uninitialized_properties;
            break;
        }
        case "Change_all_jsdoc_style_types_to_TypeScript_95030": {
            return $state.Change_all_jsdoc_style_types_to_TypeScript;
            break;
        }
        case "Change_all_jsdoc_style_types_to_TypeScript_and_add_undefined_to_nullable_types_95031": {
            return $state.Change_all_jsdoc_style_types_to_TypeScript_and_add_undefined_to_nullable_types;
            break;
        }
        case "Implement_all_unimplemented_interfaces_95032": {
            return $state.Implement_all_unimplemented_interfaces;
            break;
        }
        case "Install_all_missing_types_packages_95033": {
            return $state.Install_all_missing_types_packages;
            break;
        }
        case "Rewrite_all_as_indexed_access_types_95034": {
            return $state.Rewrite_all_as_indexed_access_types;
            break;
        }
        case "Convert_all_to_default_imports_95035": {
            return $state.Convert_all_to_default_imports;
            break;
        }
        case "Make_all_super_calls_the_first_statement_in_their_constructor_95036": {
            return $state.Make_all_super_calls_the_first_statement_in_their_constructor;
            break;
        }
        case "Add_qualifier_to_all_unresolved_variables_matching_a_member_name_95037": {
            return $state.Add_qualifier_to_all_unresolved_variables_matching_a_member_name;
            break;
        }
        case "Change_all_extended_interfaces_to_implements_95038": {
            return $state.Change_all_extended_interfaces_to_implements;
            break;
        }
        case "Add_all_missing_super_calls_95039": {
            return $state.Add_all_missing_super_calls;
            break;
        }
        case "Implement_all_inherited_abstract_classes_95040": {
            return $state.Implement_all_inherited_abstract_classes;
            break;
        }
        case "Add_all_missing_async_modifiers_95041": {
            return $state.Add_all_missing_async_modifiers;
            break;
        }
        case "Add_ts_ignore_to_all_error_messages_95042": {
            return $state.Add_ts_ignore_to_all_error_messages;
            break;
        }
        case "Annotate_everything_with_types_from_JSDoc_95043": {
            return $state.Annotate_everything_with_types_from_JSDoc;
            break;
        }
        case "Add_to_all_uncalled_decorators_95044": {
            return $state.Add_to_all_uncalled_decorators;
            break;
        }
        case "Convert_all_constructor_functions_to_classes_95045": {
            return $state.Convert_all_constructor_functions_to_classes;
            break;
        }
        case "Generate_get_and_set_accessors_95046": {
            return $state.Generate_get_and_set_accessors;
            break;
        }
        case "Convert_require_to_import_95047": {
            return $state.Convert_require_to_import;
            break;
        }
        case "Convert_all_require_to_import_95048": {
            return $state.Convert_all_require_to_import;
            break;
        }
        case "Move_to_a_new_file_95049": {
            return $state.Move_to_a_new_file;
            break;
        }
        case "Remove_unreachable_code_95050": {
            return $state.Remove_unreachable_code;
            break;
        }
        case "Remove_all_unreachable_code_95051": {
            return $state.Remove_all_unreachable_code;
            break;
        }
        case "Add_missing_typeof_95052": {
            return $state.Add_missing_typeof;
            break;
        }
        case "Remove_unused_label_95053": {
            return $state.Remove_unused_label;
            break;
        }
        case "Remove_all_unused_labels_95054": {
            return $state.Remove_all_unused_labels;
            break;
        }
        case "Convert_0_to_mapped_object_type_95055": {
            return $state.Convert_0_to_mapped_object_type;
            break;
        }
        case "Convert_namespace_import_to_named_imports_95056": {
            return $state.Convert_namespace_import_to_named_imports;
            break;
        }
        case "Convert_named_imports_to_namespace_import_95057": {
            return $state.Convert_named_imports_to_namespace_import;
            break;
        }
        case "Add_or_remove_braces_in_an_arrow_function_95058": {
            return $state.Add_or_remove_braces_in_an_arrow_function;
            break;
        }
        case "Add_braces_to_arrow_function_95059": {
            return $state.Add_braces_to_arrow_function;
            break;
        }
        case "Remove_braces_from_arrow_function_95060": {
            return $state.Remove_braces_from_arrow_function;
            break;
        }
        case "Convert_default_export_to_named_export_95061": {
            return $state.Convert_default_export_to_named_export;
            break;
        }
        case "Convert_named_export_to_default_export_95062": {
            return $state.Convert_named_export_to_default_export;
            break;
        }
        case "Add_missing_enum_member_0_95063": {
            return $state.Add_missing_enum_member_0;
            break;
        }
        case "Add_all_missing_imports_95064": {
            return $state.Add_all_missing_imports;
            break;
        }
        case "Convert_to_async_function_95065": {
            return $state.Convert_to_async_function;
            break;
        }
        case "Convert_all_to_async_functions_95066": {
            return $state.Convert_all_to_async_functions;
            break;
        }
        case "Add_missing_call_parentheses_95067": {
            return $state.Add_missing_call_parentheses;
            break;
        }
        case "Add_all_missing_call_parentheses_95068": {
            return $state.Add_all_missing_call_parentheses;
            break;
        }
        case "Add_unknown_conversion_for_non_overlapping_types_95069": {
            return $state.Add_unknown_conversion_for_non_overlapping_types;
            break;
        }
        case "Add_unknown_to_all_conversions_of_non_overlapping_types_95070": {
            return $state.Add_unknown_to_all_conversions_of_non_overlapping_types;
            break;
        }
        case "Add_missing_new_operator_to_call_95071": {
            return $state.Add_missing_new_operator_to_call;
            break;
        }
        case "Add_missing_new_operator_to_all_calls_95072": {
            return $state.Add_missing_new_operator_to_all_calls;
            break;
        }
        case "Add_names_to_all_parameters_without_names_95073": {
            return $state.Add_names_to_all_parameters_without_names;
            break;
        }
        case "Enable_the_experimentalDecorators_option_in_your_configuration_file_95074": {
            return $state.Enable_the_experimentalDecorators_option_in_your_configuration_file;
            break;
        }
        case "Convert_parameters_to_destructured_object_95075": {
            return $state.Convert_parameters_to_destructured_object;
            break;
        }
        case "Extract_type_95077": {
            return $state.Extract_type;
            break;
        }
        case "Extract_to_type_alias_95078": {
            return $state.Extract_to_type_alias;
            break;
        }
        case "Extract_to_typedef_95079": {
            return $state.Extract_to_typedef;
            break;
        }
        case "Infer_this_type_of_0_from_usage_95080": {
            return $state.Infer_this_type_of_0_from_usage;
            break;
        }
        case "Add_const_to_unresolved_variable_95081": {
            return $state.Add_const_to_unresolved_variable;
            break;
        }
        case "Add_const_to_all_unresolved_variables_95082": {
            return $state.Add_const_to_all_unresolved_variables;
            break;
        }
        case "Add_await_95083": {
            return $state.Add_await;
            break;
        }
        case "Add_await_to_initializer_for_0_95084": {
            return $state.Add_await_to_initializer_for_0;
            break;
        }
        case "Fix_all_expressions_possibly_missing_await_95085": {
            return $state.Fix_all_expressions_possibly_missing_await;
            break;
        }
        case "Remove_unnecessary_await_95086": {
            return $state.Remove_unnecessary_await;
            break;
        }
        case "Remove_all_unnecessary_uses_of_await_95087": {
            return $state.Remove_all_unnecessary_uses_of_await;
            break;
        }
        case "Enable_the_jsx_flag_in_your_configuration_file_95088": {
            return $state.Enable_the_jsx_flag_in_your_configuration_file;
            break;
        }
        case "Add_await_to_initializers_95089": {
            return $state.Add_await_to_initializers;
            break;
        }
        case "Extract_to_interface_95090": {
            return $state.Extract_to_interface;
            break;
        }
        case "Convert_to_a_bigint_numeric_literal_95091": {
            return $state.Convert_to_a_bigint_numeric_literal;
            break;
        }
        case "Convert_all_to_bigint_numeric_literals_95092": {
            return $state.Convert_all_to_bigint_numeric_literals;
            break;
        }
        case "Convert_const_to_let_95093": {
            return $state.Convert_const_to_let;
            break;
        }
        case "Prefix_with_declare_95094": {
            return $state.Prefix_with_declare;
            break;
        }
        case "Prefix_all_incorrect_property_declarations_with_declare_95095": {
            return $state.Prefix_all_incorrect_property_declarations_with_declare;
            break;
        }
        case "Convert_to_template_string_95096": {
            return $state.Convert_to_template_string;
            break;
        }
        case "Add_export_to_make_this_file_into_a_module_95097": {
            return $state.Add_export_to_make_this_file_into_a_module;
            break;
        }
        case "Set_the_target_option_in_your_configuration_file_to_0_95098": {
            return $state.Set_the_target_option_in_your_configuration_file_to_0;
            break;
        }
        case "Set_the_module_option_in_your_configuration_file_to_0_95099": {
            return $state.Set_the_module_option_in_your_configuration_file_to_0;
            break;
        }
        case "Convert_invalid_character_to_its_html_entity_code_95100": {
            return $state.Convert_invalid_character_to_its_html_entity_code;
            break;
        }
        case "Convert_all_invalid_characters_to_HTML_entity_code_95101": {
            return $state.Convert_all_invalid_characters_to_HTML_entity_code;
            break;
        }
        case "Convert_all_const_to_let_95102": {
            return $state.Convert_all_const_to_let;
            break;
        }
        case "Convert_function_expression_0_to_arrow_function_95105": {
            return $state.Convert_function_expression_0_to_arrow_function;
            break;
        }
        case "Convert_function_declaration_0_to_arrow_function_95106": {
            return $state.Convert_function_declaration_0_to_arrow_function;
            break;
        }
        case "Fix_all_implicit_this_errors_95107": {
            return $state.Fix_all_implicit_this_errors;
            break;
        }
        case "Wrap_invalid_character_in_an_expression_container_95108": {
            return $state.Wrap_invalid_character_in_an_expression_container;
            break;
        }
        case "Wrap_all_invalid_characters_in_an_expression_container_95109": {
            return $state.Wrap_all_invalid_characters_in_an_expression_container;
            break;
        }
        case "Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file_95110": {
            return $state.Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file;
            break;
        }
        case "Add_a_return_statement_95111": {
            return $state.Add_a_return_statement;
            break;
        }
        case "Remove_braces_from_arrow_function_body_95112": {
            return $state.Remove_braces_from_arrow_function_body;
            break;
        }
        case "Wrap_the_following_body_with_parentheses_which_should_be_an_object_literal_95113": {
            return $state.Wrap_the_following_body_with_parentheses_which_should_be_an_object_literal;
            break;
        }
        case "Add_all_missing_return_statement_95114": {
            return $state.Add_all_missing_return_statement;
            break;
        }
        case "Remove_braces_from_all_arrow_function_bodies_with_relevant_issues_95115": {
            return $state.Remove_braces_from_all_arrow_function_bodies_with_relevant_issues;
            break;
        }
        case "Wrap_all_object_literal_with_parentheses_95116": {
            return $state.Wrap_all_object_literal_with_parentheses;
            break;
        }
        case "Move_labeled_tuple_element_modifiers_to_labels_95117": {
            return $state.Move_labeled_tuple_element_modifiers_to_labels;
            break;
        }
        case "Convert_overload_list_to_single_signature_95118": {
            return $state.Convert_overload_list_to_single_signature;
            break;
        }
        case "Generate_get_and_set_accessors_for_all_overriding_properties_95119": {
            return $state.Generate_get_and_set_accessors_for_all_overriding_properties;
            break;
        }
        case "Wrap_in_JSX_fragment_95120": {
            return $state.Wrap_in_JSX_fragment;
            break;
        }
        case "Wrap_all_unparented_JSX_in_JSX_fragment_95121": {
            return $state.Wrap_all_unparented_JSX_in_JSX_fragment;
            break;
        }
        case "Convert_arrow_function_or_function_expression_95122": {
            return $state.Convert_arrow_function_or_function_expression;
            break;
        }
        case "Convert_to_anonymous_function_95123": {
            return $state.Convert_to_anonymous_function;
            break;
        }
        case "Convert_to_named_function_95124": {
            return $state.Convert_to_named_function;
            break;
        }
        case "Convert_to_arrow_function_95125": {
            return $state.Convert_to_arrow_function;
            break;
        }
        case "Remove_parentheses_95126": {
            return $state.Remove_parentheses;
            break;
        }
        case "Could_not_find_a_containing_arrow_function_95127": {
            return $state.Could_not_find_a_containing_arrow_function;
            break;
        }
        case "Containing_function_is_not_an_arrow_function_95128": {
            return $state.Containing_function_is_not_an_arrow_function;
            break;
        }
        case "Could_not_find_export_statement_95129": {
            return $state.Could_not_find_export_statement;
            break;
        }
        case "This_file_already_has_a_default_export_95130": {
            return $state.This_file_already_has_a_default_export;
            break;
        }
        case "Could_not_find_import_clause_95131": {
            return $state.Could_not_find_import_clause;
            break;
        }
        case "Could_not_find_namespace_import_or_named_imports_95132": {
            return $state.Could_not_find_namespace_import_or_named_imports;
            break;
        }
        case "Selection_is_not_a_valid_type_node_95133": {
            return $state.Selection_is_not_a_valid_type_node;
            break;
        }
        case "No_type_could_be_extracted_from_this_type_node_95134": {
            return $state.No_type_could_be_extracted_from_this_type_node;
            break;
        }
        case "Could_not_find_property_for_which_to_generate_accessor_95135": {
            return $state.Could_not_find_property_for_which_to_generate_accessor;
            break;
        }
        case "Name_is_not_valid_95136": {
            return $state.Name_is_not_valid;
            break;
        }
        case "Can_only_convert_property_with_modifier_95137": {
            return $state.Can_only_convert_property_with_modifier;
            break;
        }
        case "Switch_each_misused_0_to_1_95138": {
            return $state.Switch_each_misused_0_to_1;
            break;
        }
        case "Convert_to_optional_chain_expression_95139": {
            return $state.Convert_to_optional_chain_expression;
            break;
        }
        case "Could_not_find_convertible_access_expression_95140": {
            return $state.Could_not_find_convertible_access_expression;
            break;
        }
        case "Could_not_find_matching_access_expressions_95141": {
            return $state.Could_not_find_matching_access_expressions;
            break;
        }
        case "Can_only_convert_logical_AND_access_chains_95142": {
            return $state.Can_only_convert_logical_AND_access_chains;
            break;
        }
        case "Add_void_to_Promise_resolved_without_a_value_95143": {
            return $state.Add_void_to_Promise_resolved_without_a_value;
            break;
        }
        case "Add_void_to_all_Promises_resolved_without_a_value_95144": {
            return $state.Add_void_to_all_Promises_resolved_without_a_value;
            break;
        }
        case "Use_element_access_for_0_95145": {
            return $state.Use_element_access_for_0;
            break;
        }
        case "Use_element_access_for_all_undeclared_properties_95146": {
            return $state.Use_element_access_for_all_undeclared_properties;
            break;
        }
        case "Delete_all_unused_imports_95147": {
            return $state.Delete_all_unused_imports;
            break;
        }
        case "Infer_function_return_type_95148": {
            return $state.Infer_function_return_type;
            break;
        }
        case "Return_type_must_be_inferred_from_a_function_95149": {
            return $state.Return_type_must_be_inferred_from_a_function;
            break;
        }
        case "Could_not_determine_function_return_type_95150": {
            return $state.Could_not_determine_function_return_type;
            break;
        }
        case "Could_not_convert_to_arrow_function_95151": {
            return $state.Could_not_convert_to_arrow_function;
            break;
        }
        case "Could_not_convert_to_named_function_95152": {
            return $state.Could_not_convert_to_named_function;
            break;
        }
        case "Could_not_convert_to_anonymous_function_95153": {
            return $state.Could_not_convert_to_anonymous_function;
            break;
        }
        case "Can_only_convert_string_concatenations_and_string_literals_95154": {
            return $state.Can_only_convert_string_concatenations_and_string_literals;
            break;
        }
        case "Selection_is_not_a_valid_statement_or_statements_95155": {
            return $state.Selection_is_not_a_valid_statement_or_statements;
            break;
        }
        case "Add_missing_function_declaration_0_95156": {
            return $state.Add_missing_function_declaration_0;
            break;
        }
        case "Add_all_missing_function_declarations_95157": {
            return $state.Add_all_missing_function_declarations;
            break;
        }
        case "Method_not_implemented_95158": {
            return $state.Method_not_implemented;
            break;
        }
        case "Function_not_implemented_95159": {
            return $state.Function_not_implemented;
            break;
        }
        case "Add_override_modifier_95160": {
            return $state.Add_override_modifier;
            break;
        }
        case "Remove_override_modifier_95161": {
            return $state.Remove_override_modifier;
            break;
        }
        case "Add_all_missing_override_modifiers_95162": {
            return $state.Add_all_missing_override_modifiers;
            break;
        }
        case "Remove_all_unnecessary_override_modifiers_95163": {
            return $state.Remove_all_unnecessary_override_modifiers;
            break;
        }
        case "Can_only_convert_named_export_95164": {
            return $state.Can_only_convert_named_export;
            break;
        }
        case "Add_missing_properties_95165": {
            return $state.Add_missing_properties;
            break;
        }
        case "Add_all_missing_properties_95166": {
            return $state.Add_all_missing_properties;
            break;
        }
        case "Add_missing_attributes_95167": {
            return $state.Add_missing_attributes;
            break;
        }
        case "Add_all_missing_attributes_95168": {
            return $state.Add_all_missing_attributes;
            break;
        }
        case "Add_undefined_to_optional_property_type_95169": {
            return $state.Add_undefined_to_optional_property_type;
            break;
        }
        case "Convert_named_imports_to_default_import_95170": {
            return $state.Convert_named_imports_to_default_import;
            break;
        }
        case "Delete_unused_param_tag_0_95171": {
            return $state.Delete_unused_param_tag_0;
            break;
        }
        case "Delete_all_unused_param_tags_95172": {
            return $state.Delete_all_unused_param_tags;
            break;
        }
        case "Rename_param_tag_name_0_to_1_95173": {
            return $state.Rename_param_tag_name_0_to_1;
            break;
        }
        case "Use_0_95174": {
            return $state.Use_0;
            break;
        }
        case "Use_Number_isNaN_in_all_conditions_95175": {
            return $state.Use_Number_isNaN_in_all_conditions;
            break;
        }
        case "Convert_typedef_to_TypeScript_type_95176": {
            return $state.Convert_typedef_to_TypeScript_type;
            break;
        }
        case "Convert_all_typedef_to_TypeScript_types_95177": {
            return $state.Convert_all_typedef_to_TypeScript_types;
            break;
        }
        case "Move_to_file_95178": {
            return $state.Move_to_file;
            break;
        }
        case "Cannot_move_to_file_selected_file_is_invalid_95179": {
            return $state.Cannot_move_to_file_selected_file_is_invalid;
            break;
        }
        case "Use_import_type_95180": {
            return $state.Use_import_type;
            break;
        }
        case "Use_type_0_95181": {
            return $state.Use_type_0;
            break;
        }
        case "Fix_all_with_type_only_imports_95182": {
            return $state.Fix_all_with_type_only_imports;
            break;
        }
        case "Cannot_move_statements_to_the_selected_file_95183": {
            return $state.Cannot_move_statements_to_the_selected_file;
            break;
        }
        case "Inline_variable_95184": {
            return $state.Inline_variable;
            break;
        }
        case "Could_not_find_variable_to_inline_95185": {
            return $state.Could_not_find_variable_to_inline;
            break;
        }
        case "Variables_with_multiple_declarations_cannot_be_inlined_95186": {
            return $state.Variables_with_multiple_declarations_cannot_be_inlined;
            break;
        }
        case "Add_missing_comma_for_object_member_completion_0_95187": {
            return $state.Add_missing_comma_for_object_member_completion_0;
            break;
        }
        case "Add_missing_parameter_to_0_95188": {
            return $state.Add_missing_parameter_to_0;
            break;
        }
        case "Add_missing_parameters_to_0_95189": {
            return $state.Add_missing_parameters_to_0;
            break;
        }
        case "Add_all_missing_parameters_95190": {
            return $state.Add_all_missing_parameters;
            break;
        }
        case "Add_optional_parameter_to_0_95191": {
            return $state.Add_optional_parameter_to_0;
            break;
        }
        case "Add_optional_parameters_to_0_95192": {
            return $state.Add_optional_parameters_to_0;
            break;
        }
        case "Add_all_optional_parameters_95193": {
            return $state.Add_all_optional_parameters;
            break;
        }
        case "Wrap_in_parentheses_95194": {
            return $state.Wrap_in_parentheses;
            break;
        }
        case "Wrap_all_invalid_decorator_expressions_in_parentheses_95195": {
            return $state.Wrap_all_invalid_decorator_expressions_in_parentheses;
            break;
        }
        case "Add_resolution_mode_import_attribute_95196": {
            return $state.Add_resolution_mode_import_attribute;
            break;
        }
        case "Add_resolution_mode_import_attribute_to_all_type_only_imports_that_need_it_95197": {
            return $state.Add_resolution_mode_import_attribute_to_all_type_only_imports_that_need_it;
            break;
        }
        case "Do_not_print_diagnostics_100000": {
            return $state.Do_not_print_diagnostics;
            break;
        }
        case "Run_in_single_threaded_mode_100001": {
            return $state.Run_in_single_threaded_mode;
            break;
        }
        case "Generate_pprof_CPU_Slashmemory_profiles_to_the_given_directory_100002": {
            return $state.Generate_pprof_CPU_Slashmemory_profiles_to_the_given_directory;
            break;
        }
        case "Set_the_number_of_checkers_per_project_100003": {
            return $state.Set_the_number_of_checkers_per_project;
            break;
        }
        case "4_unless_singleThreaded_is_passed_100004": {
            return $state.X_4_unless_singleThreaded_is_passed;
            break;
        }
        case "_0_references_100005": {
            return $state.X_0_references;
            break;
        }
        case "1_reference_100006": {
            return $state.X_1_reference;
            break;
        }
        case "_0_implementations_100007": {
            return $state.X_0_implementations;
            break;
        }
        case "1_implementation_100008": {
            return $state.X_1_implementation;
            break;
        }
        case "Set_the_number_of_projects_to_build_concurrently_100009": {
            return $state.Set_the_number_of_projects_to_build_concurrently;
            break;
        }
        case "Deduplicate_packages_with_the_same_name_and_version_100011": {
            return $state.Deduplicate_packages_with_the_same_name_and_version;
            break;
        }
        case "Loading_100012": {
            return $state.Loading;
            break;
        }
        case "Installing_types_for_0_100013": {
            return $state.Installing_types_for_0;
            break;
        }
        case "Project_0_100014": {
            return $state.Project_0;
            break;
        }
        case "Fix_All_100015": {
            return $state.Fix_All;
            break;
        }
        case "Organize_Imports_100016": {
            return $state.Organize_Imports;
            break;
        }
        case "Remove_Unused_Imports_100017": {
            return $state.Remove_Unused_Imports;
            break;
        }
        case "Sort_Imports_100018": {
            return $state.Sort_Imports;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
