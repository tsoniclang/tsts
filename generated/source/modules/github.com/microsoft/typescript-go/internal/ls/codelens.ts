import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CodeLensUserPreferences as CodeLensUserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, HasModifier as HasModifier__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isValidImplementationsCodeLensNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, userPrefs: CodeLensUserPreferences__from_lsutil): bool {
    {
        const __gotots_switch_tag_1 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_1 = -1;
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_1 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_1 = 0;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_1 === KindMethodSignature$constant__from_ast();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_1 = 1;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_1 === KindMethodDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_1 = 2;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_7 = false;
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_1 === KindClassDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_1 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_1 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_1 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_1 === KindPropertyDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_7) {
                __gotots_switch_selection_1 = 3;
            }
        }
        __gotots_control_target_1: {
            if (__gotots_switch_selection_1 === 0) {
                return true;
                break __gotots_control_target_1;
            }
            if (__gotots_switch_selection_1 === 1) {
                return Tristate_IsTrue__from_core(userPrefs.ImplementationsCodeLensShowOnInterfaceMethods) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast();
                break __gotots_control_target_1;
            }
            if (__gotots_switch_selection_1 === 2) {
                if (Tristate_IsTrue__from_core(userPrefs.ImplementationsCodeLensShowOnAllClassMethods) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
                    return !HasModifier__from_ast(node, ModifierFlagsPrivate$constant__from_ast()) && !(Node__from_ast.$storageOf(((Node__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPrivateIdentifier$constant__from_ast());
                }
                __gotots_switch_selection_1 = 3;
            }
            if (__gotots_switch_selection_1 === 3) {
                return HasModifier__from_ast(node, ModifierFlagsAbstract$constant__from_ast());
                break __gotots_control_target_1;
            }
        }
    }
    return false;
}
export function isValidReferenceLensNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, userPrefs: CodeLensUserPreferences__from_lsutil): bool {
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindVariableDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindClassDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindTypeAliasDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindEnumDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindEnumMember$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindMethodSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindPropertySignature$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                if (Tristate_IsTrue__from_core(userPrefs.ReferencesCodeLensShowOnAllFunctions)) {
                    return true;
                }
                __gotots_switch_selection_0 = 1;
            }
            if (__gotots_switch_selection_0 === 1) {
                return !((GetCombinedModifierFlags__from_ast(node) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                return true;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 3) {
                switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindClassDeclaration$constant__from_ast():
                    case KindInterfaceDeclaration$constant__from_ast():
                    case KindTypeLiteral$constant__from_ast(): {
                        return true;
                        break;
                    }
                }
                break __gotots_control_target_0;
            }
        }
    }
    return false;
}
