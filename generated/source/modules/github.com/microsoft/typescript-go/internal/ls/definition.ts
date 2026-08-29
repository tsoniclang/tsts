import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BindingElement as BindingElement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LocationLink as LocationLink__from_lsproto, Location$Storage as Location__from_lsproto$Storage, Range$Storage as Range__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { CanHaveSymbol as CanHaveSymbol__from_ast, FindAncestor as FindAncestor__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetInvokedExpression as GetInvokedExpression__from_ast, GetTextOfPropertyName as GetTextOfPropertyName__from_ast, HasStaticModifier as HasStaticModifier__from_ast, InternalSymbolNameConstructor$string as InternalSymbolNameConstructor$string__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsCallLikeExpression as IsCallLikeExpression__from_ast, IsCallSignatureDeclaration as IsCallSignatureDeclaration__from_ast, IsClassElement as IsClassElement__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsConstructSignatureDeclaration as IsConstructSignatureDeclaration__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsConstructorTypeNode as IsConstructorTypeNode__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsFunctionTypeNode as IsFunctionTypeNode__from_ast, IsIdentifier as IsIdentifier__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsObjectLiteralElement as IsObjectLiteralElement__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPropertyName as IsPropertyName__from_ast, IsRightSideOfPropertyAccess as IsRightSideOfPropertyAccess__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindFirstKeyword$constant as KindFirstKeyword$constant__from_ast, KindLastKeyword$constant as KindLastKeyword$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SkipParentheses as SkipParentheses__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TryGetTextOfPropertyName as TryGetTextOfPropertyName__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, ContextFlagsIgnoreNodeInferences$constant as ContextFlagsIgnoreNodeInferences$constant__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, Location as Location__from_lsproto, Range as Range__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { AppendIfUnique$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Concatenate$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Concatenate.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { Map$PointerTo_Named_lsproto$LocationLink$Named_lsproto$Location } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { OrElse$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { Some$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { getContainingObjectLiteralElement } from "./utilities.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function getDeclarationNameForKeyword(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind >= KindFirstKeyword$constant__from_ast() && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind <= KindLastKeyword$constant__from_ast()) {
        if (IsVariableDeclarationList__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            {
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
                if (!(decl === undefined) && !(Node__from_ast.Name(decl) === undefined)) {
                    return Node__from_ast.Name(decl);
                }
            }
        }
        else if (!(Node__from_ast.DeclarationData(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined) && !(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined) && Node__from_ast.Pos(node) < Node__from_ast.Pos(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
            return Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
    }
    return node;
}
export class fileRange {
    declare private readonly $goType: void;
    public constructor(public fileName: gostring, public fileRange: TextRange__from_core) {
    }
    static $copy($source: fileRange): fileRange {
        return new fileRange($source.fileName, TextRange__from_core.$copy($source.fileRange));
    }
    static $equal($left: fileRange, $right: fileRange): bool {
        return $left.fileName === $right.fileName && TextRange__from_core.$equal($left.fileRange, $right.fileRange);
    }
    static $hash($source: fileRange): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.fileName));
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash($source.fileRange));
        return $hash;
    }
    declare private readonly then?: never;
}
export function createLocationsFromLinks(links: RuntimeSlice<{
    value: LocationLink__from_lsproto;
} | undefined>): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto {
    let locations = Map$PointerTo_Named_lsproto$LocationLink$Named_lsproto$Location(links, (link: {
        value: LocationLink__from_lsproto;
    } | undefined): Location__from_lsproto => {
        return Location__from_lsproto.$fromStorage({
            Uri: (link ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TargetUri.$value,
            Range: Range__from_lsproto.$storageOf(Range__from_lsproto.$copy((link ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TargetSelectionRange))
        });
    });
    const locations$location = tsonicTypeScriptRuntime.boundLocation({}, () => locations, locations$next => locations = locations$next);
    return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$fromStorage({
        Locations: locations$location,
        Location: void 0,
        DefinitionLinks: void 0
    });
}
export function getDeclarationsFromLocation(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsIdentifier__from_ast(node) && IsShorthandPropertyAssignment__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        let shorthandSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetResolvedSymbol(c, node);
        let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(shorthandSymbol === undefined)) {
            declarations = Symbol__from_ast.$storageOf(((shorthandSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        }
        let contextualDeclarations = getDeclarationsFromObjectLiteralElement(c, node);
        return Concatenate$PointerTo_Named_ast$Node(declarations, contextualDeclarations);
    }
    if (IsPropertyName__from_ast(node) && IsBindingElement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsObjectBindingPattern__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        let bindingEl: {
            value: BindingElement__from_ast;
        } | undefined = Node__from_ast.AsBindingElement(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        if ((bindingEl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined &&
            tsonicTypeScriptRuntime.sameLocation(node, OrElse$PointerTo_Named_ast$Node((bindingEl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName, Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)))) {
            {
                const __gotots_results_0 = TryGetTextOfPropertyName__from_ast(node);
                let name = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(c, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    let types = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([t]);
                    if (Type__from_checker.IsUnion(t)) {
                        types = Type__from_checker.Types(t);
                    }
                    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    const __gotots_range_2 = types;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                        let unionType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_2;
                        {
                            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(c, unionType, name);
                            if (!(prop === undefined)) {
                                result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, void 0);
                            }
                        }
                    }
                    return result;
                }
            }
        }
    }
    node = getDeclarationNameForKeyword(node);
    {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, node);
        if (!(__go_symbol === undefined)) {
            if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (19)) >>> 0 === 0 && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructorKeyword$constant__from_ast()) {
                {
                    let __go_constructor: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.lookup(InternalSymbolNameConstructor$string__from_ast);
                    if (!(__go_constructor === undefined)) {
                        __go_symbol = __go_constructor;
                    }
                }
            }
            if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
                {
                    const __gotots_results_1 = Checker__from_checker.ResolveAlias(c, __go_symbol);
                    let resolved: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        __go_symbol = resolved;
                    }
                }
            }
            let objectLiteralElementDeclarations = getDeclarationsFromObjectLiteralElement(c, node);
            if (objectLiteralElementDeclarations.length > 0) {
                return objectLiteralElementDeclarations;
            }
            if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            }
        }
    }
    {
        let indexInfos = Checker__from_checker.GetIndexSignaturesAtLocation(c, node);
        if (indexInfos.length !== 0) {
            return indexInfos;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function getDeclarationsFromObjectLiteralElement(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainingObjectLiteralElement(node);
    if (element === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(c, Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ContextFlagsNone$constant__from_checker());
    if (contextualType === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let properties = Checker__from_checker.GetPropertySymbolsFromContextualType(c, element, contextualType, false);
    if (Some$PointerTo_Named_ast$Symbol(properties, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsObjectLiteralElement__from_ast(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration), node);
    })) {
        {
            let withoutNodeInferencesType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(c, Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ContextFlagsIgnoreNodeInferences$constant__from_checker());
            if (!(withoutNodeInferencesType === undefined)) {
                {
                    let withoutNodeInferencesProperties = Checker__from_checker.GetPropertySymbolsFromContextualType(c, element, withoutNodeInferencesType, false);
                    if (withoutNodeInferencesProperties.length > 0) {
                        properties = withoutNodeInferencesProperties;
                    }
                }
            }
        }
    }
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_3 = properties;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_3;
        result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, void 0);
    }
    return result;
}
export function getAncestorCallLikeExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !IsRightSideOfPropertyAccess__from_ast(n);
    });
    let callLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (!(callLike === undefined) && IsCallLikeExpression__from_ast(callLike) &&
        tsonicTypeScriptRuntime.sameLocation(GetInvokedExpression__from_ast(callLike), target)) {
        return callLike;
    }
    return void 0;
}
export function tryGetSignatureDeclaration(typeChecker: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = void 0;
    let callLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAncestorCallLikeExpression(node);
    if (!(callLike === undefined)) {
        signature = Checker__from_checker.GetResolvedSignature(typeChecker, callLike);
    }
    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (!(signature === undefined) && !(Signature__from_checker.Declaration(signature) === undefined)) {
        declaration = Signature__from_checker.Declaration(signature);
        if (IsFunctionLike__from_ast(declaration) && !IsFunctionTypeNode__from_ast(declaration)) {
            return declaration;
        }
    }
    return void 0;
}
export function isJsxConstructorLike(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    __gotots_control_target_0: {
        if (IsConstructorDeclaration__from_ast(node) || IsConstructorTypeNode__from_ast(node) || IsCallSignatureDeclaration__from_ast(node) || IsConstructSignatureDeclaration__from_ast(node)) {
            return true;
        }
        else {
            return false;
        }
    }
}
export function symbolMatchesSignature(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, calledDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (__go_symbol === undefined || calledDeclaration === undefined) {
        return false;
    }
    let calledSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(calledDeclaration);
    if (tsonicTypeScriptRuntime.sameLocation(__go_symbol, calledSymbol)
        || !(calledSymbol === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(__go_symbol, Symbol__from_ast.$storageOf(((calledSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
        return true;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((calledDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    return !(parent === undefined) && (IsAssignmentExpression__from_ast(parent, false) || !IsCallLikeExpression__from_ast(parent) && CanHaveSymbol__from_ast(parent) &&
        tsonicTypeScriptRuntime.sameLocation(__go_symbol, Node__from_ast.Symbol(parent)));
}
export function getSymbolForOverriddenMember(typeChecker: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let classElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsClassElement__from_ast);
    if (classElement === undefined || Node__from_ast.Name(classElement) === undefined) {
        return void 0;
    }
    let baseDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(classElement, IsClassLike__from_ast);
    if (baseDeclaration === undefined) {
        return void 0;
    }
    let baseTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassExtendsHeritageElement__from_ast(baseDeclaration);
    if (baseTypeNode === undefined) {
        return void 0;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(Node__from_ast.Expression(baseTypeNode));
    let base: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
    if (IsClassExpression__from_ast(expression)) {
        base = Node__from_ast.Symbol(expression);
    }
    else {
        base = Checker__from_checker.GetSymbolAtLocation(typeChecker, expression);
    }
    if (base === undefined) {
        return void 0;
    }
    let name = GetTextOfPropertyName__from_ast(Node__from_ast.Name(classElement));
    if (HasStaticModifier__from_ast(classElement)) {
        return Checker__from_checker.GetPropertyOfType(typeChecker, Checker__from_checker.GetTypeOfSymbol(typeChecker, base), name);
    }
    return Checker__from_checker.GetPropertyOfType(typeChecker, Checker__from_checker.GetDeclaredTypeOfSymbol(typeChecker, base), name);
}
export function getTypeOfSymbolAtLocation(c: {
    value: Checker__from_checker;
} | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbolAtLocation(c, __go_symbol, node);
    if (tsonicTypeScriptRuntime.sameLocation(Type__from_checker.Symbol(t), __go_symbol)
        || !(Type__from_checker.Symbol(t) === undefined) && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsVariableDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration), Symbol__from_ast.$storageOf(((Type__from_checker.Symbol(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
        let sigs = Checker__from_checker.GetCallSignatures(c, t);
        if (sigs.length === 1) {
            return Checker__from_checker.GetReturnTypeOfSignature(c, sigs.get(0));
        }
    }
    return t;
}
export function getDeclarationsFromType(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_0 = Type__from_checker.Distributed(t);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let t__shadow_1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_0;
        if (!(Type__from_checker.Symbol(t__shadow_1) === undefined)) {
            const __gotots_range_1 = Symbol__from_ast.$storageOf(((Type__from_checker.Symbol(t__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                result = AppendIfUnique$PointerTo_Named_ast$Node(result, decl);
            }
        }
    }
    return result;
}
