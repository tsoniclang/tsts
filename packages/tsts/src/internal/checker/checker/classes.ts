import type { bool } from "../../../go/scalars.js";
import type { GoPtr } from "../../../go/compat.js";
import { Every, Some } from "../../core/core.js";
import type { Node } from "../../ast/spine.js";
import { Node_Body, Node_Initializer, Node_Expression, Node_Members } from "../../ast/ast.js";
import type { ImportAttributes } from "../../ast/generated/data.js";
import { AsImportAttribute } from "../../ast/generated/casts.js";
import { IsConstructorDeclaration, IsPropertyDeclaration, IsInterfaceDeclaration } from "../../ast/generated/predicates.js";
import { Node_Text } from "../../ast/ast.js";
import type { ModifierFlags } from "../../ast/modifierflags.js";
import { ModifierFlagsProtected } from "../../ast/modifierflags.js";
import { IsStringLiteralLike, NodeIsPresent, IsClassLike, IsFunctionLikeDeclaration, GetContainingClass, FindAncestorOrQuit, FindAncestorTrue, FindAncestorFalse, FindAncestorQuit, GetExtendsHeritageClauseElements, IsEntityNameExpression, HasStaticModifier, HasDecorators } from "../../ast/utilities.js";
import type { FindAncestorResult } from "../../ast/utilities.js";
import type { Symbol, SymbolTable } from "../../ast/symbol.js";
import { SymbolFlagsClass, SymbolFlagsInterface, SymbolFlagsType } from "../../ast/symbolflags.js";
import { CheckFlagsSynthetic, CheckFlagsPartial } from "../../ast/checkflags.js";
import { SymbolFlagsOptional, NodeFlagsContainsThis } from "../../ast/generated/flags.js";
import type { ResolutionMode } from "../../core/compileroptions.js";
import { ResolutionModeNone, ResolutionModeESM, ResolutionModeCommonJS } from "../../core/compileroptions.js";
import { TextRange_ContainsInclusive } from "../../core/text.js";
import { Node_Pos, Node_Name } from "../../ast/spine.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import { Diagnostic_AddRelatedInfo } from "../../ast/diagnostic.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import {
  Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require,
  X_resolution_mode_is_the_only_valid_key_for_type_import_attributes,
  X_resolution_mode_should_be_either_require_or_import,
  X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten,
  This_spread_always_overwrites_this_property,
  Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class,
} from "../../diagnostics/generated/messages.js";
import type { Type } from "../types.js";
import { Type_AsInterfaceType } from "../types.js";
import { getDeclarationModifierFlagsFromSymbol, getDeclarationModifierFlagsFromSymbolEx, NewDiagnosticForNode } from "../utilities.js";
import {
  Checker_checkClassLikeDeclaration,
  Checker_getSymbolOfDeclaration,
  Checker_getTypeOfSymbol,
  Checker_forEachProperty,
  Checker_getParentOfSymbol,
  Checker_getDeclaredTypeOfSymbol,
  Checker_isPropertyAbstractOrInterface,
  Checker_isPropertyInClassDerivedFrom,
  Checker_resolveEntityName,
  Checker_registerForUnusedIdentifiersCheck,
} from "./symbols.js";
import { Checker_getPropertiesOfType } from "./types.js";
import { Checker_checkNodeDeferred } from "./syntax-checking.js";
import { Checker_checkSourceElements, Checker_error } from "./support.js";
import { Checker_getDeclaredTypeOfClassOrInterface, Checker_hasBaseType } from "./types.js";
import { Checker_grammarErrorOnNode } from "../grammarchecks.js";
import type { Checker } from "./state.js";
import { Checker_checkClassExpressionExternalHelpers } from "../checker.js";

import type { GoFunc } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceMake } from "../../../go/compat.js";
import { GoSliceLoad } from "../../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getResolutionModeOverride","kind":"method","status":"implemented","sigHash":"7e0c42fe06d7edb996ccecf014152878148d7b5a6adaa597f78189aa937c483a"}
 *
 * Go source:
 * func (c *Checker) getResolutionModeOverride(node *ast.ImportAttributes, reportErrors bool) core.ResolutionMode {
 * 	if len(node.Attributes.Nodes) != 1 {
 * 		if reportErrors {
 * 			c.grammarErrorOnNode(node.AsNode(), diagnostics.Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require)
 * 		}
 * 		return core.ResolutionModeNone
 * 	}
 * 	elem := node.Attributes.Nodes[0]
 * 	if !ast.IsStringLiteralLike(elem.Name()) {
 * 		return core.ResolutionModeNone
 * 	}
 * 	if elem.Name().Text() != "resolution-mode" {
 * 		if reportErrors {
 * 			c.grammarErrorOnNode(elem.Name(), diagnostics.X_resolution_mode_is_the_only_valid_key_for_type_import_attributes)
 * 		}
 * 		return core.ResolutionModeNone
 * 	}
 * 	value := elem.AsImportAttribute().Value
 * 	if !ast.IsStringLiteralLike(value) {
 * 		return core.ResolutionModeNone
 * 	}
 * 	if value.Text() != "import" && value.Text() != "require" {
 * 		if reportErrors {
 * 			c.grammarErrorOnNode(value, diagnostics.X_resolution_mode_should_be_either_require_or_import)
 * 		}
 * 		return core.ResolutionModeNone
 * 	}
 * 	if value.Text() == "import" {
 * 		return core.ResolutionModeESM
 * 	}
 * 	return core.ResolutionModeCommonJS
 * }
 */
export function Checker_getResolutionModeOverride(receiver: GoPtr<Checker>, node: GoPtr<ImportAttributes>, reportErrors: bool): ResolutionMode {
  if (node!.Attributes!.Nodes.length !== 1) {
    if (reportErrors) {
      Checker_grammarErrorOnNode(receiver, node, Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require);
    }
    return ResolutionModeNone;
  }
  const elem = GoSliceLoad(node!.Attributes!.Nodes, 0, GoPointerValueOps<Node>());
  if (!IsStringLiteralLike(Node_Name(elem))) {
    return ResolutionModeNone;
  }
  if (Node_Text(Node_Name(elem)) !== "resolution-mode") {
    if (reportErrors) {
      Checker_grammarErrorOnNode(receiver, Node_Name(elem), X_resolution_mode_is_the_only_valid_key_for_type_import_attributes);
    }
    return ResolutionModeNone;
  }
  const value = AsImportAttribute(elem)!.Value;
  if (!IsStringLiteralLike(value)) {
    return ResolutionModeNone;
  }
  if (Node_Text(value) !== "import" && Node_Text(value) !== "require") {
    if (reportErrors) {
      Checker_grammarErrorOnNode(receiver, value, X_resolution_mode_should_be_either_require_or_import);
    }
    return ResolutionModeNone;
  }
  if (Node_Text(value) === "import") {
    return ResolutionModeESM;
  }
  return ResolutionModeCommonJS;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.arePropertiesAbstractOrInterface","kind":"method","status":"implemented","sigHash":"01937021dd3fe6a0bf9564d8d2beda1239172f783261fbb04670d72246921e16"}
 *
 * Go source:
 * func (c *Checker) arePropertiesAbstractOrInterface(base *ast.Symbol, baseDeclarationFlags ast.ModifierFlags) bool {
 * 	if base.CheckFlags&ast.CheckFlagsSynthetic != 0 {
 * 		return core.Some(base.Declarations, func(d *ast.Node) bool { return c.isPropertyAbstractOrInterface(d, baseDeclarationFlags) })
 * 	}
 * 	return core.Every(base.Declarations, func(d *ast.Node) bool { return c.isPropertyAbstractOrInterface(d, baseDeclarationFlags) })
 * }
 */
export function Checker_arePropertiesAbstractOrInterface(receiver: GoPtr<Checker>, base: GoPtr<Symbol>, baseDeclarationFlags: ModifierFlags): bool {
  if ((base!.CheckFlags & CheckFlagsSynthetic) !== 0) {
    return Some(base!.Declarations, (d: GoPtr<Node>): bool => Checker_isPropertyAbstractOrInterface(receiver, d, baseDeclarationFlags));
  }
  return Every(base!.Declarations, (d: GoPtr<Node>): bool => Checker_isPropertyAbstractOrInterface(receiver, d, baseDeclarationFlags));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkClassExpression","kind":"method","status":"implemented","sigHash":"9a545536ff28711ea40162393524a13ba58e2fec0b4b23bb36cf09742f33b23c"}
 *
 * Go source:
 * func (c *Checker) checkClassExpression(node *ast.Node) *Type {
 * 	c.checkClassLikeDeclaration(node)
 * 	c.checkNodeDeferred(node)
 * 	c.checkClassExpressionExternalHelpers(node)
 * 	return c.getTypeOfSymbol(c.getSymbolOfDeclaration(node))
 * }
 */
export function Checker_checkClassExpression(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  Checker_checkClassLikeDeclaration(receiver, node);
  Checker_checkNodeDeferred(receiver, node);
  Checker_checkClassExpressionExternalHelpers(receiver, node);
  return Checker_getTypeOfSymbol(receiver, Checker_getSymbolOfDeclaration(receiver, node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkClassExpressionDeferred","kind":"method","status":"implemented","sigHash":"144cca04f17a5d11426b1bcb3ec77be7da6b04fd31f8461248860aeddc7bb688"}
 *
 * Go source:
 * func (c *Checker) checkClassExpressionDeferred(node *ast.Node) {
 * 	c.checkSourceElements(node.Members())
 * 	c.registerForUnusedIdentifiersCheck(node)
 * }
 */
export function Checker_checkClassExpressionDeferred(receiver: GoPtr<Checker>, node: GoPtr<Node>): void {
  Checker_checkSourceElements(receiver, Node_Members(node) ?? GoSliceMake(0, 0, GoPointerValueOps<Node>()));
  Checker_registerForUnusedIdentifiersCheck(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.getDeclaringClass","kind":"method","status":"implemented","sigHash":"015659b276639180496b01aab0a59047b91a4f3809ae957f1450cb83250a7422"}
 *
 * Go source:
 * func (c *Checker) getDeclaringClass(prop *ast.Symbol) *Type {
 * 	if prop.Parent != nil && prop.Parent.Flags&ast.SymbolFlagsClass != 0 {
 * 		return c.getDeclaredTypeOfSymbol(c.getParentOfSymbol(prop))
 * 	}
 * 	return nil
 * }
 */
export function Checker_getDeclaringClass(receiver: GoPtr<Checker>, prop: GoPtr<Symbol>): GoPtr<Type> {
  if (prop!.Parent !== undefined && (prop!.Parent!.Flags & SymbolFlagsClass) !== 0) {
    return Checker_getDeclaredTypeOfSymbol(receiver, Checker_getParentOfSymbol(receiver, prop));
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isValidOverrideOf","kind":"method","status":"implemented","sigHash":"5abcbba5336dd09ba01607ef97598283104a2d3654075b77b1441fce9d897505"}
 *
 * Go source:
 * func (c *Checker) isValidOverrideOf(sourceProp *ast.Symbol, targetProp *ast.Symbol) bool {
 * 	return !c.forEachProperty(targetProp, func(tp *ast.Symbol) bool {
 * 		if getDeclarationModifierFlagsFromSymbol(tp)&ast.ModifierFlagsProtected != 0 {
 * 			return !c.isPropertyInClassDerivedFrom(sourceProp, c.getDeclaringClass(tp))
 * 		}
 * 		return false
 * 	})
 * }
 */
export function Checker_isValidOverrideOf(receiver: GoPtr<Checker>, sourceProp: GoPtr<Symbol>, targetProp: GoPtr<Symbol>): bool {
  return !Checker_forEachProperty(receiver, targetProp, (tp: GoPtr<Symbol>): bool => {
    if ((getDeclarationModifierFlagsFromSymbol(tp) & ModifierFlagsProtected) !== 0) {
      return !Checker_isPropertyInClassDerivedFrom(receiver, sourceProp, Checker_getDeclaringClass(receiver, tp));
    }
    return false;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isNodeUsedDuringClassInitialization","kind":"method","status":"implemented","sigHash":"562764416302843dffdaf044f977d79b8034f6261ee34ba473da928f193ca6ea"}
 *
 * Go source:
 * func (c *Checker) isNodeUsedDuringClassInitialization(node *ast.Node) bool {
 * 	return ast.FindAncestorOrQuit(node, func(element *ast.Node) ast.FindAncestorResult {
 * 		if ast.IsConstructorDeclaration(element) && ast.NodeIsPresent(element.Body()) || ast.IsPropertyDeclaration(element) {
 * 			return ast.FindAncestorTrue
 * 		} else if ast.IsClassLike(element) || ast.IsFunctionLikeDeclaration(element) {
 * 			return ast.FindAncestorQuit
 * 		}
 * 		return ast.FindAncestorFalse
 * 	}) != nil
 * }
 */
export function Checker_isNodeUsedDuringClassInitialization(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  return FindAncestorOrQuit(node, (element: GoPtr<Node>): FindAncestorResult => {
    if ((IsConstructorDeclaration(element) && NodeIsPresent(Node_Body(element))) || IsPropertyDeclaration(element)) {
      return FindAncestorTrue;
    } else if (IsClassLike(element) || IsFunctionLikeDeclaration(element)) {
      return FindAncestorQuit;
    }
    return FindAncestorFalse;
  }) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isNodeWithinClass","kind":"method","status":"implemented","sigHash":"1c43417bac561d9afbfcd113abd1dcd1bc742cd242df0998742a72313b7620d8"}
 *
 * Go source:
 * func (c *Checker) isNodeWithinClass(node *ast.Node, classDeclaration *ast.Node) bool {
 * 	return c.forEachEnclosingClass(node, func(n *ast.Node) bool { return n == classDeclaration })
 * }
 */
export function Checker_isNodeWithinClass(receiver: GoPtr<Checker>, node: GoPtr<Node>, classDeclaration: GoPtr<Node>): bool {
  return Checker_forEachEnclosingClass(receiver, node, (n: GoPtr<Node>): bool => n === classDeclaration);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.forEachEnclosingClass","kind":"method","status":"implemented","sigHash":"34d0ab9e2c969c9319a4cdab5ced974d2bbda073f564c6dfc59a766d52cb588d"}
 *
 * Go source:
 * func (c *Checker) forEachEnclosingClass(node *ast.Node, callback func(node *ast.Node) bool) bool {
 * 	containingClass := ast.GetContainingClass(node)
 * 	for containingClass != nil {
 * 		result := callback(containingClass)
 * 		if result {
 * 			return true
 * 		}
 * 		containingClass = ast.GetContainingClass(containingClass)
 * 	}
 * 	return false
 * }
 */
export function Checker_forEachEnclosingClass(receiver: GoPtr<Checker>, node: GoPtr<Node>, callback: GoFunc<(node: GoPtr<Node>) => bool>): bool {
  let containingClass = GetContainingClass(node);
  for (;;) {
    if (containingClass === undefined) {
      break;
    }
    const result = callback!(containingClass);
    if (result) {
      return true;
    }
    containingClass = GetContainingClass(containingClass);
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isClassDerivedFromDeclaringClasses","kind":"method","status":"implemented","sigHash":"0c504b0a20639313fa928b99aed338ca094d0b408720ebe0a9fc98e6445f7086"}
 *
 * Go source:
 * func (c *Checker) isClassDerivedFromDeclaringClasses(checkClass *Type, prop *ast.Symbol, writing bool) bool {
 * 	return !c.forEachProperty(prop, func(p *ast.Symbol) bool {
 * 		if getDeclarationModifierFlagsFromSymbolEx(p, writing)&ast.ModifierFlagsProtected != 0 {
 * 			return !c.hasBaseType(checkClass, c.getDeclaringClass(p))
 * 		}
 * 		return false
 * 	})
 * }
 */
export function Checker_isClassDerivedFromDeclaringClasses(receiver: GoPtr<Checker>, checkClass: GoPtr<Type>, prop: GoPtr<Symbol>, writing: bool): bool {
  return !Checker_forEachProperty(receiver, prop, (p: GoPtr<Symbol>): bool => {
    if ((getDeclarationModifierFlagsFromSymbolEx(p, writing) & ModifierFlagsProtected) !== 0) {
      return !Checker_hasBaseType(receiver, checkClass, Checker_getDeclaringClass(receiver, p));
    }
    return false;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkThisInStaticClassFieldInitializerInDecoratedClass","kind":"method","status":"implemented","sigHash":"e2500996bcbd2817a8c5a429b30ae59ffc477c267fc4033c02a041feaec33ea5"}
 *
 * Go source:
 * func (c *Checker) checkThisInStaticClassFieldInitializerInDecoratedClass(thisExpression *ast.Node, container *ast.Node) {
 * 	if ast.IsPropertyDeclaration(container) && ast.HasStaticModifier(container) && c.legacyDecorators {
 * 		initializer := container.Initializer()
 * 		if initializer != nil && initializer.Loc.ContainsInclusive(thisExpression.Pos()) && ast.HasDecorators(container.Parent) {
 * 			c.error(thisExpression, diagnostics.Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class)
 * 		}
 * 	}
 * }
 */
export function Checker_checkThisInStaticClassFieldInitializerInDecoratedClass(receiver: GoPtr<Checker>, thisExpression: GoPtr<Node>, container: GoPtr<Node>): void {
  if (IsPropertyDeclaration(container) && HasStaticModifier(container) && receiver!.legacyDecorators) {
    const initializer = Node_Initializer(container);
    if (initializer !== undefined && TextRange_ContainsInclusive(initializer!.Loc, Node_Pos(thisExpression)) && HasDecorators(container!.Parent)) {
      Checker_error(receiver, thisExpression, Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.checkSpreadPropOverrides","kind":"method","status":"implemented","sigHash":"5cbf43942ade7f24a44b8e857aaad6046c344e96f3e4ed13ea8f70cee1888e6b"}
 *
 * Go source:
 * func (c *Checker) checkSpreadPropOverrides(t *Type, props ast.SymbolTable, spread *ast.Node) {
 * 	for _, right := range c.getPropertiesOfType(t) {
 * 		if right.Flags&ast.SymbolFlagsOptional == 0 && right.CheckFlags&ast.CheckFlagsPartial == 0 {
 * 			if left := props[right.Name]; left != nil {
 * 				diagnostic := c.error(left.ValueDeclaration, diagnostics.X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten, left.Name)
 * 				diagnostic.AddRelatedInfo(NewDiagnosticForNode(spread, diagnostics.This_spread_always_overwrites_this_property))
 * 			}
 * 		}
 * 	}
 * }
 */
export function Checker_checkSpreadPropOverrides(receiver: GoPtr<Checker>, t: GoPtr<Type>, props: SymbolTable, spread: GoPtr<Node>): void {
  for (const right of Checker_getPropertiesOfType(receiver, t)) {
    if ((right!.Flags & SymbolFlagsOptional) === 0 && (right!.CheckFlags & CheckFlagsPartial) === 0) {
      const left = props.get(right!.Name);
      if (left !== undefined) {
        const diagnostic = Checker_error(receiver, left!.ValueDeclaration, X_0_is_specified_more_than_once_so_this_usage_will_be_overwritten, left!.Name);
        Diagnostic_AddRelatedInfo(diagnostic, NewDiagnosticForNode(spread, This_spread_always_overwrites_this_property));
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/checker.go::method::Checker.isThislessInterface","kind":"method","status":"implemented","sigHash":"a64366bfd507cd60ccd42d96ed4aea38d33d845d6c2f1bd2ab6b49d195109317"}
 *
 * Go source:
 * func (c *Checker) isThislessInterface(symbol *ast.Symbol) bool {
 * 	for _, declaration := range symbol.Declarations {
 * 		if ast.IsInterfaceDeclaration(declaration) {
 * 			if declaration.Flags&ast.NodeFlagsContainsThis != 0 {
 * 				return false
 * 			}
 * 			baseTypeNodes := ast.GetExtendsHeritageClauseElements(declaration)
 * 			for _, node := range baseTypeNodes {
 * 				if ast.IsEntityNameExpression(node.Expression()) {
 * 					baseSymbol := c.resolveEntityName(node.Expression(), ast.SymbolFlagsType, true /*ignoreErrors* /, false, nil)
 * 					if baseSymbol == nil || baseSymbol.Flags&ast.SymbolFlagsInterface == 0 || c.getDeclaredTypeOfClassOrInterface(baseSymbol).AsInterfaceType().thisType != nil {
 * 						return false
 * 					}
 * 				}
 * 			}
 * 		}
 * 	}
 * 	return true
 * }
 */
export function Checker_isThislessInterface(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): bool {
  for (const declaration of symbol_!.Declarations ?? GoSliceMake(0, 0, GoPointerValueOps<Node>())) {
    if (IsInterfaceDeclaration(declaration)) {
      if ((declaration!.Flags & NodeFlagsContainsThis) !== 0) {
        return false;
      }
      const baseTypeNodes = GetExtendsHeritageClauseElements(declaration);
      for (const node of baseTypeNodes) {
        if (IsEntityNameExpression(Node_Expression(node))) {
          const baseSymbol = Checker_resolveEntityName(receiver, Node_Expression(node), SymbolFlagsType, true, false, undefined);
          if (baseSymbol === undefined || (baseSymbol!.Flags & SymbolFlagsInterface) === 0 || Type_AsInterfaceType(Checker_getDeclaredTypeOfClassOrInterface(receiver, baseSymbol))!.thisType !== undefined) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
