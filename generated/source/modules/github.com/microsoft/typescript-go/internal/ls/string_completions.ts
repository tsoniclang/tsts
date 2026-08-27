import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ContextFlags as ContextFlags__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ModuleKind as ModuleKind__from_core, ModuleResolutionKind as ModuleResolutionKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ScriptElementKindModifier as ScriptElementKindModifier__from_lsutil, ScriptElementKind as ScriptElementKind__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreference__from_modulespecifiers, ModuleSpecifierEnding as ModuleSpecifierEnding__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { argumentInfoForCompletions } from "./completions.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CommentRange as CommentRange__from_ast, FindAncestor as FindAncestor__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, IsCallExpression as IsCallExpression__from_ast, IsIdentifier as IsIdentifier__from_ast, IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsLiteralTypeNode as IsLiteralTypeNode__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsStringLiteral as IsStringLiteral__from_ast, JsxAttribute as JsxAttribute__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast, WalkUpParenthesizedTypes as WalkUpParenthesizedTypes__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ContextFlagsIgnoreNodeInferences$constant as ContextFlagsIgnoreNodeInferences$constant__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, LiteralType as LiteralType__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleResolutionKindBundler$constant as ModuleResolutionKindBundler$constant__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ScriptElementKindDirectory$constant as ScriptElementKindDirectory$constant__from_lsutil, ScriptElementKindExternalModuleName$constant as ScriptElementKindExternalModuleName$constant__from_lsutil, ScriptElementKindModifierCjs$constant as ScriptElementKindModifierCjs$constant__from_lsutil, ScriptElementKindModifierCts$constant as ScriptElementKindModifierCts$constant__from_lsutil, ScriptElementKindModifierDcts$constant as ScriptElementKindModifierDcts$constant__from_lsutil, ScriptElementKindModifierDmts$constant as ScriptElementKindModifierDmts$constant__from_lsutil, ScriptElementKindModifierDts$constant as ScriptElementKindModifierDts$constant__from_lsutil, ScriptElementKindModifierJs$constant as ScriptElementKindModifierJs$constant__from_lsutil, ScriptElementKindModifierJson$constant as ScriptElementKindModifierJson$constant__from_lsutil, ScriptElementKindModifierJsx$constant as ScriptElementKindModifierJsx$constant__from_lsutil, ScriptElementKindModifierMjs$constant as ScriptElementKindModifierMjs$constant__from_lsutil, ScriptElementKindModifierMts$constant as ScriptElementKindModifierMts$constant__from_lsutil, ScriptElementKindModifierNone$constant as ScriptElementKindModifierNone$constant__from_lsutil, ScriptElementKindModifierTs$constant as ScriptElementKindModifierTs$constant__from_lsutil, ScriptElementKindModifierTsx$constant as ScriptElementKindModifierTsx$constant__from_lsutil, ScriptElementKindScriptElement$constant as ScriptElementKindScriptElement$constant__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { IsApplicableVersionedTypesKey as IsApplicableVersionedTypesKey__from___go_module, TryGetJSExtensionForFile as TryGetJSExtensionForFile__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetAllowedEndingsInPreferredOrder as GetAllowedEndingsInPreferredOrder__from_modulespecifiers, ImportModuleSpecifierPreference as ImportModuleSpecifierPreference__from_modulespecifiers, ModuleSpecifierEndingIndex$constant as ModuleSpecifierEndingIndex$constant__from_modulespecifiers, ModuleSpecifierEndingMinimal$constant as ModuleSpecifierEndingMinimal$constant__from_modulespecifiers, ModuleSpecifierEndingTsExtension$constant as ModuleSpecifierEndingTsExtension$constant__from_modulespecifiers, TryGetRealFileNameForNonJSDeclarationFileName as TryGetRealFileNameForNonJSDeclarationFileName__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson, JSONValueTypeObject$constant as JSONValueTypeObject$constant__from_packagejson, JSONValueTypeString$constant as JSONValueTypeString$constant__from_packagejson, JSONValue as JSONValue__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil, StripQuotes as StripQuotes__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GetSupportedExtensionsWithJsonIfResolveJsonModule as GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions, GetSupportedExtensions as GetSupportedExtensions__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { $state as $state__tspath, ChangeExtension as ChangeExtension__from_tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsBuildInfo$string as ExtensionTsBuildInfo$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetAnyExtensionFromPath as GetAnyExtensionFromPath__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, HasTrailingDirectorySeparator as HasTrailingDirectorySeparator__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, NormalizePath as NormalizePath__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath, ResolvePath as ResolvePath__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Get$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Keys$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { Set$AddIfAbsent$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Filter$Named_modulespecifiers$ModuleSpecifierEnding, Filter$PointerTo_Named_ast$Symbol, Filter$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Flatten$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Flatten.js";
import { Map$Named_ls$moduleCompletionNameAndKind$PointerTo_Named_ls$pathCompletion } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$Named_ls$moduleCompletionKind, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { getConstraintOfTypeArgumentProperty, getPropertiesForObjectExpression } from "./completions.js";
import { getContextualTypeFromParent, isInComment, skipConstraint } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash, GoMapValue, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class completionsFromTypes {
    declare private readonly $goType: void;
    public constructor(public types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, public isNewIdentifier: bool) {
    }
    declare private readonly then?: never;
}
export class completionsFromProperties {
    declare private readonly $goType: void;
    public constructor(public symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public hasIndexSignature: bool) {
    }
    declare private readonly then?: never;
}
export class pathCompletion {
    declare private readonly $goType: void;
    public constructor(public name: gostring, public kind: ScriptElementKind__from_lsutil, public extension: gostring, public textRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined) {
    }
    declare private readonly then?: never;
}
export class stringLiteralCompletions {
    declare private readonly $goType: void;
    public constructor(public fromTypes: completionsFromTypes | undefined, public fromProperties: completionsFromProperties | undefined, public fromPaths: RuntimeSlice<pathCompletion | undefined>) {
    }
    declare private readonly then?: never;
}
export function fromContextualType(contextFlags: ContextFlags__from_checker, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): completionsFromTypes | undefined {
    return toCompletionsFromTypes(getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags), void 0, typeChecker));
}
export function toCompletionsFromTypes(types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): completionsFromTypes | undefined {
    if (types.length === 0) {
        return void 0;
    }
    return new completionsFromTypes(types, false);
}
export function toStringLiteralCompletionsFromTypes(types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): stringLiteralCompletions | undefined {
    let result: completionsFromTypes | undefined = toCompletionsFromTypes(types);
    if (result === undefined) {
        return void 0;
    }
    return new stringLiteralCompletions(result, void 0, RuntimeSlice.nil<pathCompletion | undefined>());
}
export function fromUnionableLiteralType(grandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): stringLiteralCompletions | undefined {
    switch (Node__from_ast.$storageOf(((grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindCallExpression$constant__from_ast():
        case KindExpressionWithTypeArguments$constant__from_ast():
        case KindJsxOpeningElement$constant__from_ast():
        case KindJsxSelfClosingElement$constant__from_ast():
        case KindNewExpression$constant__from_ast():
        case KindTaggedTemplateExpression$constant__from_ast():
        case KindTypeReference$constant__from_ast(): {
            let typeArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, grandparent);
            });
            if (!(typeArgument === undefined)) {
                let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeArgumentConstraint(typeChecker, typeArgument);
                return new stringLiteralCompletions(new completionsFromTypes(getStringLiteralTypes(t, void 0, typeChecker), false), void 0, RuntimeSlice.nil<pathCompletion | undefined>());
            }
            return void 0;
            break;
        }
        case KindIndexedAccessType$constant__from_ast(): {
            let indexType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(grandparent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType;
            let objectType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(grandparent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType;
            if (!TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((indexType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainsInclusive(position__shadow_1)) {
                return void 0;
            }
            let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeFromTypeNode(typeChecker, objectType);
            return new stringLiteralCompletions(void 0, stringLiteralCompletionsFromProperties(t, typeChecker), RuntimeSlice.nil<pathCompletion | undefined>());
            break;
        }
        case KindUnionType$constant__from_ast(): {
            let result: stringLiteralCompletions | undefined = fromUnionableLiteralType(walkUpParentheses(Node__from_ast.$storageOf(((grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), parent, position__shadow_1, typeChecker);
            if (result === undefined) {
                return void 0;
            }
            let alreadyUsedTypes = getAlreadyUsedTypesInStringLiteralUnion(grandparent, parent);
            __gotots_control_target_0: {
                if (!((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fromProperties === undefined)) {
                    let result__shadow_1: completionsFromProperties | undefined = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fromProperties;
                    return new stringLiteralCompletions(void 0, new completionsFromProperties(Filter$PointerTo_Named_ast$Symbol((result__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbols, (s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                        return !Contains$SliceOf_string$string(alreadyUsedTypes, Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    }), (result__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasIndexSignature), RuntimeSlice.nil<pathCompletion | undefined>());
                }
                else if (!((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fromTypes === undefined)) {
                    let result__shadow_1: completionsFromTypes | undefined = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fromTypes;
                    return new stringLiteralCompletions(new completionsFromTypes(Filter$PointerTo_Named_checker$Type((result__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).types, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
                        return !Contains$SliceOf_string$string(alreadyUsedTypes, (($value: GoInterface | undefined): gostring => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })(LiteralType__from_checker.Value(Type__from_checker.AsLiteralType(t))));
                    }), false), void 0, RuntimeSlice.nil<pathCompletion | undefined>());
                }
                else {
                    return void 0;
                }
            }
            break;
        }
        case KindPropertySignature$constant__from_ast(): {
            return new stringLiteralCompletions(new completionsFromTypes(getStringLiteralTypes(getConstraintOfTypeArgumentProperty(grandparent, typeChecker), void 0, typeChecker), false), void 0, RuntimeSlice.nil<pathCompletion | undefined>());
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function stringLiteralCompletionsForObjectLiteral(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, objectLiteralExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): completionsFromProperties | undefined {
    let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, objectLiteralExpression, ContextFlagsNone$constant__from_checker());
    if (contextualType === undefined) {
        return void 0;
    }
    let completionsType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, objectLiteralExpression, ContextFlagsIgnoreNodeInferences$constant__from_checker());
    let symbols = getPropertiesForObjectExpression(contextualType, completionsType, objectLiteralExpression, typeChecker);
    return new completionsFromProperties(symbols, hasIndexSignature(contextualType, typeChecker));
}
export function stringLiteralCompletionsFromProperties(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): completionsFromProperties | undefined {
    return new completionsFromProperties(Filter$PointerTo_Named_ast$Symbol(Checker__from_checker.GetApparentProperties(typeChecker, t), (s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !(!(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsPrivateIdentifierClassElementDeclaration__from_ast(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
    }), hasIndexSignature(t, typeChecker));
}
export function addReplacementSpans(text: gostring, textStart: int, names: RuntimeSlice<moduleCompletionNameAndKind$Storage>): RuntimeSlice<pathCompletion | undefined> {
    let textRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined = getDirectoryFragmentRange(text, textStart);
    return Map$Named_ls$moduleCompletionNameAndKind$PointerTo_Named_ls$pathCompletion(names, (nameAndKind: moduleCompletionNameAndKind): pathCompletion | undefined => {
        return new pathCompletion(moduleCompletionNameAndKind.$storageOf(nameAndKind).name, moduletToScriptElementKind(new moduleCompletionKind(moduleCompletionNameAndKind.$storageOf(nameAndKind).kind)), moduleCompletionNameAndKind.$storageOf(nameAndKind).extension, textRange);
    });
}
export function moduletToScriptElementKind(kind: moduleCompletionKind): ScriptElementKind__from_lsutil {
    switch (kind.$value) {
        case 0: {
            return ScriptElementKindDirectory$constant__from_lsutil();
            break;
        }
        case 1: {
            return ScriptElementKindScriptElement$constant__from_lsutil();
            break;
        }
        case 2: {
            return ScriptElementKindExternalModuleName$constant__from_lsutil();
            break;
        }
    }
    const __gotots_argument_2 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unknown moduleCompletionKind: %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ls$moduleCompletionKind(kind)])));
    GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function isAnyDirectorySeparator(r: int32): bool {
    return r === 47 || r === 92;
}
export function getDirectoryFragmentRange(text: gostring, textStart: int): tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined {
    let index = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexFunc(text, isAnyDirectorySeparator)));
    let offset = 0;
    if (index !== -1) {
        offset = index + 1;
    }
    let length = text.length - offset;
    if (length === 0) {
        return void 0;
    }
    return tsonicTypeScriptRuntime.location<TextRange__from_core>(NewTextRange__from_core(textStart + offset, textStart + offset + length));
}
export function getFragmentDirectory(fragment: gostring): gostring {
    if (!containsSlash(fragment)) {
        return "";
    }
    if (HasTrailingDirectorySeparator__from_tspath(fragment)) {
        return fragment;
    }
    return GetDirectoryPath__from_tspath(fragment);
}
export function getPatternFromFirstMatchingCondition(target: ExportsOrImports__from_packagejson | undefined, conditions: RuntimeSlice<gostring>): gostring {
    if (JSONValue__from_packagejson.$storageOf(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).JSONValue)).Type === JSONValueTypeString$constant__from_packagejson()) {
        return JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).JSONValue).AsString();
    }
    if (JSONValue__from_packagejson.$storageOf(JSONValue__from_packagejson.$fromStorage(ExportsOrImports__from_packagejson.$storageOf((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).JSONValue)).Type === JSONValueTypeObject$constant__from_packagejson()) {
        let obj: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined = (target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AsObject();
        const __gotots_range_7 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Named_packagejson$ExportsOrImports(obj));
        if (__gotots_range_7 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        let __gotots_range_return_0: gostring = "";
        __gotots_range_7(($argument0: gostring): bool => {
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
            const __gotots_range_value_8 = $argument0;
            let condition = __gotots_range_value_8;
            if (condition === "default" || Contains$SliceOf_string$string(conditions, condition) || (Contains$SliceOf_string$string(conditions, "types") && IsApplicableVersionedTypesKey__from___go_module(condition))) {
                const __gotots_results_1 = OrderedMap$Get$string$Named_packagejson$ExportsOrImports(obj, condition);
                let pattern = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    __gotots_range_return_0 = getPatternFromFirstMatchingCondition(pattern, conditions);
                    __gotots_range_state_0 = 2;
                    return false;
                }
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_0 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_0 = -2;
    }
    return "";
}
export function getAmbientModuleCompletions(fragment: gostring, fragmentDirectory: gostring, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<gostring> {
    let ambientModules = Checker__from_checker.GetAmbientModules(typeChecker);
    let nonRelativeModuleNames = RuntimeSlice.nil<gostring>();
    const __gotots_range_5 = ambientModules;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_5;
        let moduleName = StripQuotes__from_stringutil(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        if (strings__from_gostdlib.HasPrefix(moduleName, fragment) && !strings__from_gostdlib.Contains(moduleName, "*")) {
            nonRelativeModuleNames = nonRelativeModuleNames.append("", [moduleName]);
        }
    }
    if (fragmentDirectory !== "") {
        let moduleNameWithSeparator = EnsureTrailingDirectorySeparator__from_tspath(fragmentDirectory);
        const __gotots_range_6 = nonRelativeModuleNames;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_index_6;
            const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
            let i = __gotots_range_value_6;
            let moduleName = __gotots_range_value_7;
            nonRelativeModuleNames.set(i, strings__from_gostdlib.TrimPrefix(moduleName, moduleNameWithSeparator));
        }
    }
    return nonRelativeModuleNames;
}
export function tryRemoveDirectoryPrefix(path: gostring, prefix: gostring, useCaseSensitiveFileNames: bool): tsonicTypeScriptRuntime.Location<gostring> | undefined {
    let canonicalPath = GetCanonicalFileName__from_tspath(path, useCaseSensitiveFileNames);
    let canonicalPrefix = GetCanonicalFileName__from_tspath(prefix, useCaseSensitiveFileNames);
    if (strings__from_gostdlib.HasPrefix(canonicalPath, canonicalPrefix)) {
        let withoutPrefix = goStringSlice(path, prefix.length);
        const withoutPrefix$location = tsonicTypeScriptRuntime.boundLocation({}, () => withoutPrefix, withoutPrefix$next => withoutPrefix = withoutPrefix$next);
        if (strings__from_gostdlib.HasPrefix(withoutPrefix, "/") || strings__from_gostdlib.HasPrefix(withoutPrefix, "\\")) {
            withoutPrefix = goStringSlice(withoutPrefix, 1);
        }
        return withoutPrefix$location;
    }
    return void 0;
}
export function getSupportedExtensionsForModuleResolution(options: {
    value: CompilerOptions__from_core;
} | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<gostring> {
    let extensions = RuntimeSlice.nil<gostring>();
    if (!(checker__shadow_1 === undefined)) {
        let ambientModules = Checker__from_checker.GetAmbientModules(checker__shadow_1);
        const __gotots_range_2 = ambientModules;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let __go_module__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_2;
            let name = StripQuotes__from_stringutil(Symbol__from_ast.$storageOf(((__go_module__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            if (!strings__from_gostdlib.HasPrefix(name, "*.") || strings__from_gostdlib.Contains(name, "/")) {
                continue;
            }
            extensions = extensions.append("", [goStringSlice(name, 1)]);
        }
    }
    let supportedExtensions = GetSupportedExtensions__from_tsoptions(options, RuntimeSlice.nil<FileExtensionInfo__from_tsoptions$Storage>());
    const __gotots_range_3 = supportedExtensions;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let ext = __gotots_range_value_3;
        extensions = goSliceAppendSlice<gostring>(extensions, ext, "");
    }
    let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(options);
    if (moduleResolutionUsesNodeModules(moduleResolution)) {
        return Flatten$string(GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions(options, RuntimeSlice.literal<RuntimeSlice<gostring>>([extensions])));
    }
    return extensions;
}
export function moduleResolutionUsesNodeModules(moduleResolution: ModuleResolutionKind__from_core): bool {
    return moduleResolution >= ModuleResolutionKindNode16$constant__from_core() && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core() || moduleResolution === ModuleResolutionKindBundler$constant__from_core();
}
export function isPathRelativeToScript(path: gostring): bool {
    return strings__from_gostdlib.HasPrefix(path, "./") || strings__from_gostdlib.HasPrefix(path, "../");
}
export function getBaseDirectoriesFromRootDirs(rootDirs: RuntimeSlice<gostring>, basePath: gostring, scriptDirectory: gostring, ignoreCase: bool): RuntimeSlice<gostring> {
    let normalizedRootDirs = RuntimeSlice.make<gostring>(rootDirs.length, null, "");
    const __gotots_range_8 = rootDirs;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
        const __gotots_range_value_9 = __gotots_range_index_7;
        const __gotots_range_value_10 = __gotots_range_8.get(__gotots_range_index_7);
        let i = __gotots_range_value_9;
        let rootDirectory = __gotots_range_value_10;
        let normalizedPath = "";
        if (IsRootedDiskPath__from_tspath(rootDirectory)) {
            normalizedPath = rootDirectory;
        }
        else {
            normalizedPath = CombinePaths__from_tspath(basePath, RuntimeSlice.literal<gostring>([rootDirectory]));
        }
        normalizedRootDirs.set(i, EnsureTrailingDirectorySeparator__from_tspath(NormalizePath__from_tspath(normalizedPath)));
    }
    let relativeDirectory = "";
    let comparePathsOptions = new ComparePathsOptions__from_tspath(!ignoreCase, basePath);
    const __gotots_range_9 = normalizedRootDirs;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
        const __gotots_range_value_11 = __gotots_range_9.get(__gotots_range_index_8);
        let rootDirectory = __gotots_range_value_11;
        if (ContainsPath__from_tspath(rootDirectory, scriptDirectory, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
            if (rootDirectory.length > scriptDirectory.length) {
                relativeDirectory = "";
            }
            else {
                relativeDirectory = goStringSlice(scriptDirectory, rootDirectory.length);
            }
            break;
        }
    }
    let directories = RuntimeSlice.nil<gostring>();
    const __gotots_range_10 = normalizedRootDirs;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
        const __gotots_range_value_12 = __gotots_range_10.get(__gotots_range_index_9);
        let rootDirectory = __gotots_range_value_12;
        directories = directories.append("", [RemoveTrailingDirectorySeparator__from_tspath(CombinePaths__from_tspath(rootDirectory, RuntimeSlice.literal<gostring>([relativeDirectory])))]);
    }
    directories = directories.append("", [RemoveTrailingDirectorySeparator__from_tspath(scriptDirectory)]);
    return deduplicateStrings(directories);
}
export function deduplicateStrings(slice: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    if (slice.length <= 1) {
        return slice;
    }
    let seen: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.make<gostring, bool>(false, 0, []);
    let result = RuntimeSlice.nil<gostring>();
    const __gotots_range_12 = slice;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
        const __gotots_range_value_14 = __gotots_range_12.get(__gotots_range_index_11);
        let s = __gotots_range_value_14;
        if (!seen.lookup(s)) {
            seen.store(s, true);
            result = result.append("", [s]);
        }
    }
    return result;
}
export function deduplicateModuleCompletions(completions: RuntimeSlice<moduleCompletionNameAndKind$Storage>): RuntimeSlice<moduleCompletionNameAndKind$Storage> {
    if (completions.length <= 1) {
        return completions;
    }
    class key {
        declare private readonly $goType: void;
        public constructor(public name: gostring, public kind: moduleCompletionKind, public extension: gostring) {
        }
        static $copy($source: key): key {
            return new key($source.name, $source.kind, $source.extension);
        }
        static $equal($left: key, $right: key): bool {
            return $left.name === $right.name && $left.kind.$value === $right.kind.$value && $left.extension === $right.extension;
        }
        static $hash($source: key): number {
            let $hash = 2166136261;
            $hash = GoMapHash.mix($hash, GoMapHash.string($source.name));
            $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind.$value));
            $hash = GoMapHash.mix($hash, GoMapHash.string($source.extension));
            return $hash;
        }
        declare private readonly then?: never;
    }
    class $goMap$MapOf_Named_key_To_bool extends GoMapValue<key, bool> {
        private constructor(private readonly zeroValue: bool, private readonly buckets: Map<number, [
            key,
            bool
        ][]> | undefined, private count: number) {
            super();
        }
        private static $zeroValue(): bool {
            return false;
        }
        private static $hash($key: key): number {
            return key.$hash($key);
        }
        private static $equal($left: key, $right: key): boolean {
            return key.$equal($left, $right);
        }
        private static $copyKey($key: key): key {
            return key.$copy($key);
        }
        private static $copyValue($value: bool): bool {
            return $value;
        }
        static nil(): $goMap$MapOf_Named_key_To_bool {
            return new $goMap$MapOf_Named_key_To_bool($goMap$MapOf_Named_key_To_bool.$zeroValue(), undefined, 0);
        }
        static make(size: number | bigint, entries: [
            key,
            bool
        ][]): $goMap$MapOf_Named_key_To_bool {
            const result: $goMap$MapOf_Named_key_To_bool = new $goMap$MapOf_Named_key_To_bool($goMap$MapOf_Named_key_To_bool.$zeroValue(), new Map<number, [
                key,
                bool
            ][]>, 0);
            for (const entry of entries) {
                result.store(entry[0], entry[1]);
            }
            return result;
        }
        private $find(key: key): [
            [
                key,
                bool
            ],
            [
                key,
                bool
            ][],
            number
        ] | undefined {
            const buckets = this.buckets;
            if (buckets === undefined) {
                return undefined;
            }
            const bucket = buckets.get($goMap$MapOf_Named_key_To_bool.$hash(key));
            if (bucket === undefined) {
                return undefined;
            }
            let index = 0;
            for (const entry of bucket) {
                if ($goMap$MapOf_Named_key_To_bool.$equal(entry[0], key)) {
                    return [entry, bucket, index];
                }
                index++;
            }
            return undefined;
        }
        lookup(key: key): bool {
            const found: [
                [
                    key,
                    bool
                ],
                [
                    key,
                    bool
                ][],
                number
            ] | undefined = this.$find(key);
            return $goMap$MapOf_Named_key_To_bool.$copyValue(found === undefined ? this.zeroValue : found[0][1]);
        }
        lookupOk(key: key): [
            bool,
            boolean
        ] {
            const found: [
                [
                    key,
                    bool
                ],
                [
                    key,
                    bool
                ][],
                number
            ] | undefined = this.$find(key);
            if (found === undefined) {
                return [$goMap$MapOf_Named_key_To_bool.$copyValue(this.zeroValue), false];
            }
            return [$goMap$MapOf_Named_key_To_bool.$copyValue(found[0][1]), true];
        }
        store(key: key, value: bool): void {
            const buckets: Map<number, [
                key,
                bool
            ][]> | undefined = this.buckets;
            if (buckets === undefined) {
                GoPanic.raiseRuntime("assignment to entry in nil map");
            }
            const hash: number = $goMap$MapOf_Named_key_To_bool.$hash(key);
            let bucket: [
                key,
                bool
            ][] | undefined = buckets.get(hash);
            if (bucket === undefined) {
                bucket = [];
                buckets.set(hash, bucket);
            }
            for (const entry of bucket) {
                if ($goMap$MapOf_Named_key_To_bool.$equal(entry[0], key)) {
                    entry[1] = $goMap$MapOf_Named_key_To_bool.$copyValue(value);
                    return;
                }
            }
            bucket.push([$goMap$MapOf_Named_key_To_bool.$copyKey(key), $goMap$MapOf_Named_key_To_bool.$copyValue(value)]);
            this.count++;
        }
        delete(key: key): void {
            const found: [
                [
                    key,
                    bool
                ],
                [
                    key,
                    bool
                ][],
                number
            ] | undefined = this.$find(key);
            if (found === undefined) {
                return;
            }
            found[1].splice(found[2], 1);
            if (found[1].length === 0) {
                if (!(this.buckets === undefined)) {
                    this.buckets.delete($goMap$MapOf_Named_key_To_bool.$hash(key));
                }
            }
            this.count--;
        }
        length(): number {
            return this.count;
        }
        isNil(): boolean {
            return this.buckets === undefined;
        }
        clear(): void {
            if (this.buckets === undefined) {
                return;
            }
            this.buckets.clear();
            this.count = 0;
        }
        keys(): key[] {
            const result: key[] = [];
            const buckets: Map<number, [
                key,
                bool
            ][]> | undefined = this.buckets;
            if (buckets === undefined) {
                return result;
            }
            for (const bucket of buckets.values()) {
                for (const entry of bucket) {
                    result.push(entry[0]);
                }
            }
            return result;
        }
    }
    let seen: GoMapValue<key, bool> = $goMap$MapOf_Named_key_To_bool.make(0, []);
    let result = RuntimeSlice.nil<moduleCompletionNameAndKind$Storage>();
    const __gotots_range_11 = completions;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
        const __gotots_range_value_13 = moduleCompletionNameAndKind.$copy(moduleCompletionNameAndKind.$fromStorage(__gotots_range_11.get(__gotots_range_index_10)));
        let c = __gotots_range_value_13;
        let k = new key(moduleCompletionNameAndKind.$storageOf(c).name, new moduleCompletionKind(moduleCompletionNameAndKind.$storageOf(c).kind), moduleCompletionNameAndKind.$storageOf(c).extension);
        if (!seen.lookup(k)) {
            seen.store(k, true);
            const __gotots_slice_build_0 = result;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, moduleCompletionNameAndKind.$storageOf(moduleCompletionNameAndKind.$copy(c)));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<moduleCompletionNameAndKind$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, moduleCompletionNameAndKind.$storageOf(moduleCompletionNameAndKind.$copy(moduleCompletionNameAndKind.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, moduleCompletionNameAndKind.$storageOf(moduleCompletionNameAndKind.$copy(c)));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, moduleCompletionNameAndKind.$storageOf(moduleCompletionNameAndKind.$zero()));
                }
            }
            result = __gotots_slice_build_1;
        }
    }
    return result;
}
export class moduleCompletionKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function moduleCompletionKindDirectory$constant(): moduleCompletionKind {
    return new moduleCompletionKind(0);
}
export function moduleCompletionKindFile$constant(): moduleCompletionKind {
    return new moduleCompletionKind(1);
}
export function moduleCompletionKindExternalModuleName$constant(): moduleCompletionKind {
    return new moduleCompletionKind(2);
}
export type moduleCompletionNameAndKind$Storage = {
    name: gostring;
    kind: int;
    extension: gostring;
};
export class moduleCompletionNameAndKind implements GoContainerStoredValue<moduleCompletionNameAndKind$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: moduleCompletionNameAndKind$Storage) {
    }
    public static $storageOf($source: moduleCompletionNameAndKind): moduleCompletionNameAndKind$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: moduleCompletionNameAndKind$Storage): moduleCompletionNameAndKind {
        return new moduleCompletionNameAndKind($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get kind(): moduleCompletionKind {
        return new moduleCompletionKind(this.$storage.kind);
    }
    public set kind($value: moduleCompletionKind) {
        this.$storage.kind = $value.$value;
    }
    public get extension(): gostring {
        return this.$storage.extension;
    }
    public set extension($value: gostring) {
        this.$storage.extension = $value;
    }
    declare readonly [$goContainerStorageType]: moduleCompletionNameAndKind$Storage;
    static $zero(): moduleCompletionNameAndKind {
        return new moduleCompletionNameAndKind({
            name: "",
            kind: ((void moduleCompletionKind,
                0) as int),
            extension: ""
        });
    }
    static $copy($source: moduleCompletionNameAndKind): moduleCompletionNameAndKind {
        return new moduleCompletionNameAndKind({
            name: $source.$storage.name,
            kind: ((void moduleCompletionKind,
                $source.$storage.kind) as int),
            extension: $source.$storage.extension
        });
    }
    declare private readonly then?: never;
}
export class moduleCompletionNameAndKindSet {
    declare private readonly $goType: void;
    public constructor(public names: GoMapValue<gostring, moduleCompletionNameAndKind>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$add(s: moduleCompletionNameAndKindSet | undefined, entry: moduleCompletionNameAndKind): void {
        const __gotots_results_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).names.lookupOk(moduleCompletionNameAndKind.$storageOf(entry).name);
        let existing = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (!ok || ((void moduleCompletionKind,
            moduleCompletionNameAndKind.$storageOf(existing).kind) as int)
            <
                ((void moduleCompletionKind,
                    moduleCompletionNameAndKind.$storageOf(entry).kind) as int)) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).names.store(moduleCompletionNameAndKind.$storageOf(entry).name, entry);
        }
    }
}
export class extensionOptions {
    declare private readonly $goType: void;
    public constructor(public extensionsToSearch: RuntimeSlice<gostring>, public referenceKind: referenceKind, public importingSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public endingPreference: ImportModuleSpecifierEndingPreference__from_modulespecifiers, public resolutionMode: ModuleKind__from_core) {
    }
    declare private readonly then?: never;
}
export class referenceKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function referenceKindFileName$constant(): referenceKind {
    return new referenceKind(0);
}
export function referenceKindModuleSpecifier$constant(): referenceKind {
    return new referenceKind(1);
}
export function getFileExtension(fileName: gostring): gostring {
    let extension = TryGetExtensionFromPath__from_tspath(fileName);
    if (extension === "") {
        extension = GetAnyExtensionFromPath__from_tspath(fileName, RuntimeSlice.nil<gostring>(), false);
    }
    return extension;
}
export function containsSlash(fragment: gostring): bool {
    return strings__from_gostdlib.Contains(fragment, "/");
}
export function withoutStartAndEnd(s: gostring, start: gostring, end: gostring): tsonicTypeScriptRuntime.Location<gostring> | undefined {
    const s$location = tsonicTypeScriptRuntime.boundLocation({}, () => s, s$next => s = s$next);
    if (strings__from_gostdlib.HasPrefix(s, start) && strings__from_gostdlib.HasSuffix(s, end) && s.length >= start.length + end.length) {
        s = goStringSlice(s, start.length, s.length - end.length);
        return s$location;
    }
    return void 0;
}
export function removeLeadingDirectorySeparator(path: gostring): gostring {
    return strings__from_gostdlib.TrimPrefix(path, "/");
}
export function getPossibleOriginalInputPathWithoutChangingExt(filePath: gostring, ignoreCase: bool, outputDir: gostring, getCommonSourceDirectory: (() => gostring) | undefined): gostring {
    if (outputDir !== "") {
        const __gotots_callee_5 = getCommonSourceDirectory;
        const __gotots_argument_3 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_argument_4 = RuntimeSlice.literal<gostring>([GetRelativePathFromDirectory__from_tspath(outputDir, filePath, new ComparePathsOptions__from_tspath(!ignoreCase, ""))]);
        return ResolvePath__from_tspath(__gotots_argument_3, __gotots_argument_4);
    }
    return filePath;
}
export function getFilenameWithExtensionOption(name: gostring, program: {
    value: Program__from_compiler;
} | undefined, extensionOptions__shadow_1: extensionOptions | undefined, isExportsOrImportsWildcard: bool): [
    gostring,
    gostring
] {
    let nonJSResult = TryGetRealFileNameForNonJSDeclarationFileName__from_modulespecifiers(name);
    if (nonJSResult !== "") {
        return [nonJSResult, TryGetExtensionFromPath__from_tspath(nonJSResult)];
    }
    if ((extensionOptions__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referenceKind.$value === referenceKindFileName$constant().$value) {
        return [name, TryGetExtensionFromPath__from_tspath(name)];
    }
    let allowedEndings = GetAllowedEndingsInPreferredOrder__from_modulespecifiers(new UserPreferences__from_modulespecifiers(new ImportModuleSpecifierPreference__from_modulespecifiers(""), (extensionOptions__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).endingPreference, RuntimeSlice.nil<gostring>()), new $goInterfaceAdapter$PointerTo_Named_compiler$Program(program), Program__from_compiler.Options(program), new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile((extensionOptions__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingSourceFile), "", (extensionOptions__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolutionMode);
    if (isExportsOrImportsWildcard) {
        allowedEndings = Filter$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings, (e: ModuleSpecifierEnding__from_modulespecifiers): bool => {
            return !(e === ModuleSpecifierEndingMinimal$constant__from_modulespecifiers()) && !(e === ModuleSpecifierEndingIndex$constant__from_modulespecifiers());
        });
    }
    if (allowedEndings.length > 0 && allowedEndings.get(0) === ModuleSpecifierEndingTsExtension$constant__from_modulespecifiers()) {
        if (FileExtensionIsOneOf__from_tspath(name, $state__tspath.SupportedTSImplementationExtensions)) {
            return [name, TryGetExtensionFromPath__from_tspath(name)];
        }
        let outputExtension__shadow_1 = TryGetJSExtensionForFile__from___go_module(name, Program__from_compiler.Options(program));
        if (outputExtension__shadow_1 !== "") {
            return [ChangeExtension__from_tspath(name, outputExtension__shadow_1), outputExtension__shadow_1];
        }
        return [name, TryGetExtensionFromPath__from_tspath(name)];
    }
    if (!isExportsOrImportsWildcard && allowedEndings.length > 0 && (allowedEndings.get(0) === ModuleSpecifierEndingMinimal$constant__from_modulespecifiers() || allowedEndings.get(0) === ModuleSpecifierEndingIndex$constant__from_modulespecifiers()) && FileExtensionIsOneOf__from_tspath(name, RuntimeSlice.literal<gostring>([ExtensionJs$string__from_tspath, ExtensionJsx$string__from_tspath, ExtensionTs$string__from_tspath, ExtensionTsx$string__from_tspath, ExtensionDts$string__from_tspath]))) {
        return [RemoveFileExtension__from_tspath(name), TryGetExtensionFromPath__from_tspath(name)];
    }
    let outputExtension = TryGetJSExtensionForFile__from___go_module(name, Program__from_compiler.Options(program));
    if (outputExtension !== "") {
        return [ChangeExtension__from_tspath(name, outputExtension), outputExtension];
    }
    return [name, TryGetExtensionFromPath__from_tspath(name)];
}
export function walkUpParentheses(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParenthesizedType$constant__from_ast(): {
            return WalkUpParenthesizedTypes__from_ast(node);
            break;
        }
        case KindParenthesizedExpression$constant__from_ast(): {
            return WalkUpParenthesizedExpressions__from_ast(node);
            break;
        }
        default: {
            return node;
            break;
        }
    }
}
export function getStringLiteralTypes(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, uniques: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    if (t === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    }
    if (uniques === undefined) {
        uniques =
            tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: GoMap.nil()
            }));
    }
    t = skipConstraint(t, typeChecker);
    if (Type__from_checker.IsUnion(t)) {
        let types = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
        const __gotots_range_0 = Type__from_checker.Types(t);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let elementType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_0;
            types = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(types, getStringLiteralTypes(elementType, uniques, typeChecker), void 0);
        }
        return types;
    }
    if (Type__from_checker.IsStringLiteral(t) && !Type__from_checker.IsEnumLiteral(t) && Set$AddIfAbsent$string(uniques, (($value: GoInterface | undefined): gostring => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(LiteralType__from_checker.Value(Type__from_checker.AsLiteralType(t))))) {
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([t]);
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
}
export function getAlreadyUsedTypesInStringLiteralUnion(union: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<gostring> {
    let typesList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = UnionOrIntersectionTypeNodeBase__from_ast.$storageOf(UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage(UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(union) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types;
    if (typesList === undefined) {
        return RuntimeSlice.nil<gostring>();
    }
    let values = RuntimeSlice.nil<gostring>();
    const __gotots_range_4 = NodeList__from_ast.$storageOf(((typesList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
        if (!tsonicTypeScriptRuntime.sameLocation(typeNode, current) && IsLiteralTypeNode__from_ast(typeNode) && IsStringLiteral__from_ast(LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal)) {
            values = values.append("", [Node__from_ast.Text(LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal)]);
        }
    }
    return values;
}
export function hasIndexSignature(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    return !(Checker__from_checker.GetStringIndexType(typeChecker, t) === undefined) || !(Checker__from_checker.GetNumberIndexType(typeChecker, t) === undefined);
}
export function isRequireCallArgument(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsCallExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && Node__from_ast.Arguments(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent).length > 0 &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Arguments(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent).get(0), node) && IsIdentifier__from_ast(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) && Node__from_ast.Text(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) === "require";
}
export function kindModifiersFromExtension(extension: gostring): ScriptElementKindModifier__from_lsutil {
    switch (extension) {
        case ExtensionDts$string__from_tspath: {
            return ScriptElementKindModifierDts$constant__from_lsutil();
            break;
        }
        case ExtensionJs$string__from_tspath: {
            return ScriptElementKindModifierJs$constant__from_lsutil();
            break;
        }
        case ExtensionJson$string__from_tspath: {
            return ScriptElementKindModifierJson$constant__from_lsutil();
            break;
        }
        case ExtensionJsx$string__from_tspath: {
            return ScriptElementKindModifierJsx$constant__from_lsutil();
            break;
        }
        case ExtensionTs$string__from_tspath: {
            return ScriptElementKindModifierTs$constant__from_lsutil();
            break;
        }
        case ExtensionTsx$string__from_tspath: {
            return ScriptElementKindModifierTsx$constant__from_lsutil();
            break;
        }
        case ExtensionDmts$string__from_tspath: {
            return ScriptElementKindModifierDmts$constant__from_lsutil();
            break;
        }
        case ExtensionMjs$string__from_tspath: {
            return ScriptElementKindModifierMjs$constant__from_lsutil();
            break;
        }
        case ExtensionMts$string__from_tspath: {
            return ScriptElementKindModifierMts$constant__from_lsutil();
            break;
        }
        case ExtensionDcts$string__from_tspath: {
            return ScriptElementKindModifierDcts$constant__from_lsutil();
            break;
        }
        case ExtensionCjs$string__from_tspath: {
            return ScriptElementKindModifierCjs$constant__from_lsutil();
            break;
        }
        case ExtensionCts$string__from_tspath: {
            return ScriptElementKindModifierCts$constant__from_lsutil();
            break;
        }
        case ExtensionTsBuildInfo$string__from_tspath: {
            const __gotots_argument_0 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Extension %v is unsupported.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(ExtensionTsBuildInfo$string__from_tspath)])));
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            break;
        }
        default: {
            return ScriptElementKindModifierNone$constant__from_lsutil();
            break;
        }
    }
}
export function getStringLiteralCompletionsFromSignature(call: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, argumentInfo: argumentInfoForCompletions | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): completionsFromTypes | undefined {
    let isNewIdentifier = false;
    let uniques = Set__from_collections.$fromStorage<gostring>({
        M: GoMap.nil()
    });
    const uniques$location = tsonicTypeScriptRuntime.boundLocation({}, () => uniques, uniques$next => uniques = uniques$next);
    let editingArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsJsxOpeningLikeElement__from_ast(call)) {
        editingArgument = FindAncestor__from_ast(Node__from_ast.$storageOf(((arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, IsJsxAttribute__from_ast);
        if (editingArgument === undefined) {
            const __gotots_argument_1 = new GoInterfaceAdapter("Expected jsx opening-like element to have a jsx attribute as ancestor.");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
    }
    else {
        editingArgument = arg;
    }
    let candidates = Checker__from_checker.GetCandidateSignaturesForStringLiteralCompletions(typeChecker, call, editingArgument);
    let types = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    const __gotots_range_1 = candidates;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let candidate: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_1;
        if (!Signature__from_checker.HasRestParameter(candidate) && (argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount > Signature__from_checker.Parameters(candidate).length) {
            continue;
        }
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeParameterAtPosition(typeChecker, candidate, (argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex);
        if (IsJsxOpeningLikeElement__from_ast(call)) {
            let propType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfPropertyOfType(typeChecker, t, Node__from_ast.Text(JsxAttribute__from_ast.Name(Node__from_ast.AsJsxAttribute(editingArgument))));
            if (!(propType === undefined)) {
                t = propType;
            }
        }
        isNewIdentifier = isNewIdentifier || Type__from_checker.IsString(t);
        types = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(types, getStringLiteralTypes(t, uniques$location, typeChecker), void 0);
    }
    if (types.length > 0) {
        return new completionsFromTypes(types, isNewIdentifier);
    }
    return void 0;
}
export function isInReferenceComment(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): bool {
    let commentRange: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = isInComment(file, position__shadow_1, GetTokenAtPosition__from_astnav(file, position__shadow_1));
    if (commentRange === undefined) {
        return false;
    }
    let commentText = goStringSlice(SourceFile__from_ast.Text(file), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((commentRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).Pos(), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((commentRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).End());
    return hasTripleSlashPrefix(commentText);
}
export function hasTripleSlashPrefix(commentText: gostring): bool {
    return strings__from_gostdlib.HasPrefix(commentText, "///") && strings__from_gostdlib.HasPrefix(strings__from_gostdlib.TrimSpace(goStringSlice(commentText, 3)), "<");
}
export function parseTripleSlashDirectiveFragment(text: gostring): [
    gostring,
    gostring,
    gostring,
    bool
] {
    let prefix: gostring = "";
    let kind: gostring = "";
    let toComplete: gostring = "";
    let ok: bool = false;
    let rest = text;
    if (!strings__from_gostdlib.HasPrefix(rest, "///")) {
        return ["", "", "", false];
    }
    rest = goStringSlice(rest, 3);
    rest = strings__from_gostdlib.TrimLeftFunc(rest, IsWhiteSpaceLike__from_stringutil);
    if (!strings__from_gostdlib.HasPrefix(rest, "<reference")) {
        return ["", "", "", false];
    }
    rest = goStringSlice(rest, 10);
    if (rest.length === 0 || !IsWhiteSpaceLike__from_stringutil(goStringIndex(rest, 0))) {
        return ["", "", "", false];
    }
    rest = strings__from_gostdlib.TrimLeftFunc(rest, IsWhiteSpaceLike__from_stringutil);
    if (strings__from_gostdlib.HasPrefix(rest, "path")) {
        kind = "path";
        rest = goStringSlice(rest, 4);
    }
    else if (strings__from_gostdlib.HasPrefix(rest, "types")) {
        kind = "types";
        rest = goStringSlice(rest, 5);
    }
    else {
        return ["", "", "", false];
    }
    rest = strings__from_gostdlib.TrimLeftFunc(rest, IsWhiteSpaceLike__from_stringutil);
    if (!strings__from_gostdlib.HasPrefix(rest, "=")) {
        return ["", "", "", false];
    }
    rest = goStringSlice(rest, 1);
    rest = strings__from_gostdlib.TrimLeftFunc(rest, IsWhiteSpaceLike__from_stringutil);
    if (rest.length === 0 || (goStringIndex(rest, 0) !== 39 && goStringIndex(rest, 0) !== 34)) {
        return ["", "", "", false];
    }
    rest = goStringSlice(rest, 1);
    if (strings__from_gostdlib.ContainsAny(rest, "'\"")) {
        return ["", "", "", false];
    }
    toComplete = rest;
    prefix = goStringSlice(text, 0, text.length - toComplete.length);
    return [prefix, kind, toComplete, true];
}
