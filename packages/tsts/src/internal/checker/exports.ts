import type { bool, int } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { Node } from "../ast/ast.js";
import { Node_Symbol, Node_Text } from "../ast/ast.js";
import type { ImportAttributes } from "../ast/ast_generated.js";
import type { ModifierFlags } from "../ast/modifierflags.js";
import type { Symbol } from "../ast/symbol.js";
import type { SymbolFlags } from "../ast/symbolflags.js";
import { FindAncestor, GetFirstIdentifier, GetSourceFileOfNode, IsDeclaration } from "../ast/utilities.js";
import type { ResolutionMode } from "../core/compileroptions.js";
import { LinkStore_Has, LinkStore_TryGet } from "../core/linkstore.js";
import type { Message } from "../diagnostics/diagnostics.js";
import type { Checker, UnionReduction } from "./checker/state.js";
import { CheckModeNormal, isTupleType } from "./checker/state.js";
import { Checker_getApparentType, Checker_getBaseTypeOfLiteralType, Checker_getBaseTypes, Checker_getContextualTypeForObjectLiteralElement, Checker_getPropertiesOfType, Checker_getTypeFromTypeNode, Checker_getUnionType, Checker_getUnionTypeEx, Checker_getWidenedLiteralType, Checker_getWidenedType, Checker_isArrayLikeType, Checker_removeMissingOrUndefinedType } from "./checker/types.js";
import { Checker_getDeclaredTypeOfSymbol, Checker_getEffectiveDeclarationFlags, Checker_getGlobalSymbol, Checker_getImmediateAliasedSymbol, Checker_getIndexInfoOfType, Checker_getIndexInfosOfType, Checker_getMergedSymbol, Checker_getPropertyOfType, Checker_getResolvedSymbol, Checker_getSymbolFlags, Checker_getTypeOfPropertyOfContextualType, Checker_getTypeOfPropertyOfType, Checker_getTypeOfSymbol, Checker_getTypeOnlyAliasDeclaration, Checker_isPropertyAccessible, Checker_resolveExternalModuleName, Checker_resolveExternalModuleSymbol } from "./checker/symbols.js";
import { Checker_fillMissingTypeArguments, Checker_getBaseConstructorTypeOfClass, Checker_getConstraintOfTypeParameter, Checker_getContextualTypeForArgumentAtIndex, Checker_getDefaultFromTypeParameter, Checker_getIndexSignaturesAtLocation, Checker_getLocalTypeParametersOfClassOrInterfaceOrTypeAlias, Checker_getMinTypeArgumentCount, Checker_getRestTypeOfSignature, Checker_getResolvedSignature, Checker_getReturnTypeOfSignature, Checker_getSignaturesOfType, Checker_getTypeArguments, Checker_typeHasCallOrConstructSignatures } from "./checker/signatures.js";
import { Checker_getBaseConstraintOfType } from "./checker/inference.js";
import { Checker_getResolutionModeOverride } from "./checker/classes.js";
import { Checker_GetEmitResolver } from "./checker/support.js";
import { Checker_isContextSensitive } from "./checker/support-queries.js";
import { Checker_tryFindAmbientModule } from "./checker/modules.js";
import { EmitResolver_RequiresAddingImplicitUndefined } from "./emitresolver.js";
import { Checker_getTypePredicateOfSignature, Checker_hasEffectiveRestParameter, Checker_isTypeAssignableTo } from "./relater.js";
import { Checker_typePredicateToString } from "./printer.js";
import { Checker_getExpandedParameters } from "./nodebuilderimpl.js";
import { Checker_getJsxFragmentFactoryEntity, Checker_getJsxNamespace } from "./jsx.js";
import { getDeclarationModifierFlagsFromSymbol, getPropertyNameFromType, isTypeUsableAsPropertyName } from "./utilities.js";
import type { ContextFlags, IndexInfo, Signature, SignatureKind, Type, TypePredicate } from "./types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetStringType","kind":"method","status":"implemented","sigHash":"db019c1478830dd05eb6b682bc00180d4c92d73dcc9d07a1100694019ea48738"}
 *
 * Go source:
 * func (c *Checker) GetStringType() *Type {
 * 	return c.stringType
 * }
 */
export function Checker_GetStringType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.stringType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetNumberType","kind":"method","status":"implemented","sigHash":"45af1cffa156330f2364b7a76b018ea87fd38e35a6237615c82c507ec18bf974"}
 *
 * Go source:
 * func (c *Checker) GetNumberType() *Type {
 * 	return c.numberType
 * }
 */
export function Checker_GetNumberType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.numberType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBooleanType","kind":"method","status":"implemented","sigHash":"5c496219ec0a423e26e81524b30b3aefd0a04849d0cfcf2b271beba9ab6e7080"}
 *
 * Go source:
 * func (c *Checker) GetBooleanType() *Type {
 * 	return c.booleanType
 * }
 */
export function Checker_GetBooleanType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.booleanType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetVoidType","kind":"method","status":"implemented","sigHash":"640315ff80faa8472a83f95306086699a4d4940d25af388cfe1300541d0746d4"}
 *
 * Go source:
 * func (c *Checker) GetVoidType() *Type {
 * 	return c.voidType
 * }
 */
export function Checker_GetVoidType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.voidType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetUndefinedType","kind":"method","status":"implemented","sigHash":"5d53e7f8b0df619fbb0521225f23448bf4ea0046a20834675d94227bc572ef47"}
 *
 * Go source:
 * func (c *Checker) GetUndefinedType() *Type {
 * 	return c.undefinedType
 * }
 */
export function Checker_GetUndefinedType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.undefinedType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetNullType","kind":"method","status":"implemented","sigHash":"fcbe6ffeabacf743e69ebd55b55d5ebc51f5b60853ff06666348cae4033d605e"}
 *
 * Go source:
 * func (c *Checker) GetNullType() *Type {
 * 	return c.nullType
 * }
 */
export function Checker_GetNullType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.nullType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetAnyType","kind":"method","status":"implemented","sigHash":"ceb20b645d3b90f7c91f1897a2803173b439f061261cfd6bf32bb810332a42cd"}
 *
 * Go source:
 * func (c *Checker) GetAnyType() *Type {
 * 	return c.anyType
 * }
 */
export function Checker_GetAnyType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.anyType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetErrorType","kind":"method","status":"implemented","sigHash":"2be1394eb094e7b00627459a299a46cc70f6b86258ae27ae02e131b0cd74e5d7"}
 *
 * Go source:
 * func (c *Checker) GetErrorType() *Type {
 * 	return c.errorType
 * }
 */
export function Checker_GetErrorType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.errorType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetNeverType","kind":"method","status":"implemented","sigHash":"32f5573cf0d1bf1ee68773fc32f207306a5fcef2e804be773e51dd08d95f38f3"}
 *
 * Go source:
 * func (c *Checker) GetNeverType() *Type {
 * 	return c.neverType
 * }
 */
export function Checker_GetNeverType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.neverType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetUnknownType","kind":"method","status":"implemented","sigHash":"b5a260319fa2b9414fb068c5e1fe430b2a3021cb0e7c52ca5185e0589aacab6f"}
 *
 * Go source:
 * func (c *Checker) GetUnknownType() *Type {
 * 	return c.unknownType
 * }
 */
export function Checker_GetUnknownType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.unknownType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBigIntType","kind":"method","status":"implemented","sigHash":"fc8782d5bcd23e3b3945ca279aeceb246246b5f14360a842609e74a1cd0ce4e4"}
 *
 * Go source:
 * func (c *Checker) GetBigIntType() *Type {
 * 	return c.bigintType
 * }
 */
export function Checker_GetBigIntType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.bigintType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetESSymbolType","kind":"method","status":"implemented","sigHash":"89e2990845a65a38e2b3adce9cf4c0e964d26967751ac6decb46e6f1a708408e"}
 *
 * Go source:
 * func (c *Checker) GetESSymbolType() *Type {
 * 	return c.esSymbolType
 * }
 */
export function Checker_GetESSymbolType(receiver: GoPtr<Checker>): GoPtr<Type> {
  return receiver!.esSymbolType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBaseTypeOfLiteralType","kind":"method","status":"implemented","sigHash":"8c0d6eabf8f103473b833bae12a33d685751582a7cc01f3053f94a8f8a3d2e45"}
 *
 * Go source:
 * func (c *Checker) GetBaseTypeOfLiteralType(t *Type) *Type {
 * 	return c.getBaseTypeOfLiteralType(t)
 * }
 */
export function Checker_GetBaseTypeOfLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getBaseTypeOfLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetUnknownSymbol","kind":"method","status":"implemented","sigHash":"1bf39502b1d583282d78d69f767d3517890757e9de47c04bfb1b5abd8759c90f"}
 *
 * Go source:
 * func (c *Checker) GetUnknownSymbol() *ast.Symbol {
 * 	return c.unknownSymbol
 * }
 */
export function Checker_GetUnknownSymbol(receiver: GoPtr<Checker>): GoPtr<Symbol> {
  return receiver!.unknownSymbol;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetUnionType","kind":"method","status":"implemented","sigHash":"3cc277d9a375252083042eda762be895e983ac8ce77770c2155423e19bf9a8fb"}
 *
 * Go source:
 * func (c *Checker) GetUnionType(types []*Type) *Type {
 * 	return c.getUnionType(types)
 * }
 */
export function Checker_GetUnionType(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>): GoPtr<Type> {
  return Checker_getUnionType(receiver, types);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetNameTypeOfSymbol","kind":"method","status":"implemented","sigHash":"006cceac4ab5cf886aa32ab1fb715434bc08f48b96edd65969e571473fe2496b"}
 *
 * Go source:
 * func (c *Checker) GetNameTypeOfSymbol(symbol *ast.Symbol) *Type {
 * 	if !c.valueSymbolLinks.Has(symbol) {
 * 		return nil
 * 	}
 * 	return c.valueSymbolLinks.TryGet(symbol).nameType
 * }
 */
export function Checker_GetNameTypeOfSymbol(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  if (!LinkStore_Has(receiver!.valueSymbolLinks, symbol_)) {
    return undefined;
  }
  return LinkStore_TryGet(receiver!.valueSymbolLinks, symbol_)!.v.nameType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::func::IsTypeUsableAsPropertyName","kind":"func","status":"implemented","sigHash":"ca27b6563010d1e87662eee0257adab4ae96515907e4ddb3f3040f17af45b37f"}
 *
 * Go source:
 * func IsTypeUsableAsPropertyName(t *Type) bool {
 * 	return isTypeUsableAsPropertyName(t)
 * }
 */
export function IsTypeUsableAsPropertyName(t: GoPtr<Type>): bool {
  return isTypeUsableAsPropertyName(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::func::GetPropertyNameFromType","kind":"func","status":"implemented","sigHash":"a22cbf3c5a0b5370d332e239e7ab796cd7f8e7a3589d46e88cca4d0f92a0bd82"}
 *
 * Go source:
 * func GetPropertyNameFromType(t *Type) string {
 * 	return getPropertyNameFromType(t)
 * }
 */
export function GetPropertyNameFromType(t: GoPtr<Type>): string {
  return getPropertyNameFromType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetGlobalSymbol","kind":"method","status":"implemented","sigHash":"588b2c8092099fa399707f84799daa8d78cfe7b84616972d94e6b26efe0ada24"}
 *
 * Go source:
 * func (c *Checker) GetGlobalSymbol(name string, meaning ast.SymbolFlags, diagnostic *diagnostics.Message) *ast.Symbol {
 * 	return c.getGlobalSymbol(name, meaning, diagnostic)
 * }
 */
export function Checker_GetGlobalSymbol(receiver: GoPtr<Checker>, name: string, meaning: SymbolFlags, diagnostic: GoPtr<Message>): GoPtr<Symbol> {
  return Checker_getGlobalSymbol(receiver, name, meaning, diagnostic);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetMergedSymbol","kind":"method","status":"implemented","sigHash":"b4d49bcf1de52a31344eb29c60b45bf3edf66007167aef95b2235f8349dc1e3c"}
 *
 * Go source:
 * func (c *Checker) GetMergedSymbol(symbol *ast.Symbol) *ast.Symbol {
 * 	return c.getMergedSymbol(symbol)
 * }
 */
export function Checker_GetMergedSymbol(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Symbol> {
  return Checker_getMergedSymbol(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.TryFindAmbientModule","kind":"method","status":"implemented","sigHash":"f84ce0380cb14b22c3edd081cc7e0a7ac66974397c6b78e8616ca79bc26e936f"}
 *
 * Go source:
 * func (c *Checker) TryFindAmbientModule(moduleName string) *ast.Symbol {
 * 	return c.tryFindAmbientModule(moduleName, true /* withAugmentations * /)
 * }
 */
export function Checker_TryFindAmbientModule(receiver: GoPtr<Checker>, moduleName: string): GoPtr<Symbol> {
  return Checker_tryFindAmbientModule(receiver, moduleName, true /* withAugmentations */);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetImmediateAliasedSymbol","kind":"method","status":"implemented","sigHash":"ffd3224869a3d387ff7204bec215242a0b76ac398515e69165ab1e9eb55bda82"}
 *
 * Go source:
 * func (c *Checker) GetImmediateAliasedSymbol(symbol *ast.Symbol) *ast.Symbol {
 * 	return c.getImmediateAliasedSymbol(symbol)
 * }
 */
export function Checker_GetImmediateAliasedSymbol(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Symbol> {
  return Checker_getImmediateAliasedSymbol(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeOnlyAliasDeclaration","kind":"method","status":"implemented","sigHash":"52e542552ea632877e11564324b841dfa0cde9e6aa6e590678ff225751b37f43"}
 *
 * Go source:
 * func (c *Checker) GetTypeOnlyAliasDeclaration(symbol *ast.Symbol) *ast.Node {
 * 	return c.getTypeOnlyAliasDeclaration(symbol)
 * }
 */
export function Checker_GetTypeOnlyAliasDeclaration(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Node> {
  return Checker_getTypeOnlyAliasDeclaration(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.ResolveExternalModuleName","kind":"method","status":"implemented","sigHash":"9f041214cd941330bf756b2e89f318f06ca079c4ce0541acde19b849c61640a4"}
 *
 * Go source:
 * func (c *Checker) ResolveExternalModuleName(moduleSpecifier *ast.Node) *ast.Symbol {
 * 	return c.resolveExternalModuleName(moduleSpecifier, moduleSpecifier, true /*ignoreErrors* /)
 * }
 */
export function Checker_ResolveExternalModuleName(receiver: GoPtr<Checker>, moduleSpecifier: GoPtr<Node>): GoPtr<Symbol> {
  return Checker_resolveExternalModuleName(receiver, moduleSpecifier, moduleSpecifier, true /*ignoreErrors*/);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.ResolveExternalModuleSymbol","kind":"method","status":"implemented","sigHash":"accde15f3db69573d87f3c16af365ae2fa6f3ff4fa662de8f89525871a52e3df"}
 *
 * Go source:
 * func (c *Checker) ResolveExternalModuleSymbol(moduleSymbol *ast.Symbol) *ast.Symbol {
 * 	return c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias* /)
 * }
 */
export function Checker_ResolveExternalModuleSymbol(receiver: GoPtr<Checker>, moduleSymbol: GoPtr<Symbol>): GoPtr<Symbol> {
  return Checker_resolveExternalModuleSymbol(receiver, moduleSymbol, false /*dontResolveAlias*/);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeFromTypeNode","kind":"method","status":"implemented","sigHash":"a5aa5d240d23c04e8eccf68154adedb57fa4c0d7f3b276227c4234fa86d6d6e0"}
 *
 * Go source:
 * func (c *Checker) GetTypeFromTypeNode(node *ast.Node) *Type {
 * 	return c.getTypeFromTypeNode(node)
 * }
 */
export function Checker_GetTypeFromTypeNode(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Type> {
  return Checker_getTypeFromTypeNode(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.IsArrayLikeType","kind":"method","status":"implemented","sigHash":"fb84e941ea65cf0a6e0024e99f829993492e72a912c44f93ce2414eb75d8b1f4"}
 *
 * Go source:
 * func (c *Checker) IsArrayLikeType(t *Type) bool {
 * 	return c.isArrayLikeType(t)
 * }
 */
export function Checker_IsArrayLikeType(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_isArrayLikeType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetPropertiesOfType","kind":"method","status":"implemented","sigHash":"5dadddb3acead50fe38305e9995fd7faaaa1fae8d558c7154f1fc276404a0ea7"}
 *
 * Go source:
 * func (c *Checker) GetPropertiesOfType(t *Type) []*ast.Symbol {
 * 	return c.getPropertiesOfType(t)
 * }
 */
export function Checker_GetPropertiesOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Symbol>> {
  return Checker_getPropertiesOfType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetPropertyOfType","kind":"method","status":"implemented","sigHash":"5c7f45961fb2b004102e406c6d94b938de737588c52880bc2aa42a7d32121fe7"}
 *
 * Go source:
 * func (c *Checker) GetPropertyOfType(t *Type, name string) *ast.Symbol {
 * 	return c.getPropertyOfType(t, name)
 * }
 */
export function Checker_GetPropertyOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>, name: string): GoPtr<Symbol> {
  return Checker_getPropertyOfType(receiver, t, name);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.TypeHasCallOrConstructSignatures","kind":"method","status":"implemented","sigHash":"a1114b1d6232e6cb531c280117f3d3bc849ab02c9441ddb6b174de27996418bb"}
 *
 * Go source:
 * func (c *Checker) TypeHasCallOrConstructSignatures(t *Type) bool {
 * 	return c.typeHasCallOrConstructSignatures(t)
 * }
 */
export function Checker_TypeHasCallOrConstructSignatures(receiver: GoPtr<Checker>, t: GoPtr<Type>): bool {
  return Checker_typeHasCallOrConstructSignatures(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.IsPropertyAccessible","kind":"method","status":"implemented","sigHash":"c07abb979a1056eb19e4d98d2d5425bcd30b315ed295688314c42bfc2c6ca4ff"}
 *
 * Go source:
 * func (c *Checker) IsPropertyAccessible(node *ast.Node, isSuper bool, isWrite bool, containingType *Type, property *ast.Symbol) bool {
 * 	return c.isPropertyAccessible(node, isSuper, isWrite, containingType, property)
 * }
 */
export function Checker_IsPropertyAccessible(receiver: GoPtr<Checker>, node: GoPtr<Node>, isSuper: bool, isWrite: bool, containingType: GoPtr<Type>, property: GoPtr<Symbol>): bool {
  return Checker_isPropertyAccessible(receiver, node, isSuper, isWrite, containingType, property);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeOfPropertyOfContextualType","kind":"method","status":"implemented","sigHash":"28653a9fc7e5133847658f41ea09f83823f4154e95a6b7f813ebe4e36daf4a9a"}
 *
 * Go source:
 * func (c *Checker) GetTypeOfPropertyOfContextualType(t *Type, name string) *Type {
 * 	return c.getTypeOfPropertyOfContextualType(t, name)
 * }
 */
export function Checker_GetTypeOfPropertyOfContextualType(receiver: GoPtr<Checker>, t: GoPtr<Type>, name: string): GoPtr<Type> {
  return Checker_getTypeOfPropertyOfContextualType(receiver, t, name);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::func::GetDeclarationModifierFlagsFromSymbol","kind":"func","status":"implemented","sigHash":"dd4806997ce7524da77b5531d538951b2d90a0f9c486a800d48b037b426d5349"}
 *
 * Go source:
 * func GetDeclarationModifierFlagsFromSymbol(s *ast.Symbol) ast.ModifierFlags {
 * 	return getDeclarationModifierFlagsFromSymbol(s)
 * }
 */
export function GetDeclarationModifierFlagsFromSymbol(s: GoPtr<Symbol>): ModifierFlags {
  return getDeclarationModifierFlagsFromSymbol(s);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.WasCanceled","kind":"method","status":"implemented","sigHash":"246ee33eb1f756c291c5710af646cbe6542a3f81d39f4d77ca0224b01fd6828a"}
 *
 * Go source:
 * func (c *Checker) WasCanceled() bool {
 * 	return c.wasCanceled
 * }
 */
export function Checker_WasCanceled(receiver: GoPtr<Checker>): bool {
  return receiver!.wasCanceled;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetSignaturesOfType","kind":"method","status":"implemented","sigHash":"2543a3830393dfbc072a81d16ae721c0fc32adb8e54f8e1924c2201365a4cc2c"}
 *
 * Go source:
 * func (c *Checker) GetSignaturesOfType(t *Type, kind SignatureKind) []*Signature {
 * 	return c.getSignaturesOfType(t, kind)
 * }
 */
export function Checker_GetSignaturesOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>, kind: SignatureKind): GoSlice<GoPtr<Signature>> {
  return Checker_getSignaturesOfType(receiver, t, kind);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetDeclaredTypeOfSymbol","kind":"method","status":"implemented","sigHash":"a193b3d0c31c3c2e81c4e0c648d5699004db814e8e56b67a4cb924263e9ea015"}
 *
 * Go source:
 * func (c *Checker) GetDeclaredTypeOfSymbol(symbol *ast.Symbol) *Type {
 * 	return c.getDeclaredTypeOfSymbol(symbol)
 * }
 */
export function Checker_GetDeclaredTypeOfSymbol(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  return Checker_getDeclaredTypeOfSymbol(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeOfSymbol","kind":"method","status":"implemented","sigHash":"d8e160e1e45f4b30739b7b0d428739e020868b9414acca3d84718190736aa04a"}
 *
 * Go source:
 * func (c *Checker) GetTypeOfSymbol(symbol *ast.Symbol) *Type {
 * 	return c.getTypeOfSymbol(symbol)
 * }
 */
export function Checker_GetTypeOfSymbol(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoPtr<Type> {
  return Checker_getTypeOfSymbol(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetConstraintOfTypeParameter","kind":"method","status":"implemented","sigHash":"350ec9a3d6d5791d019856b21c2bf349bfc413b72b5593beeae715c8237aba90"}
 *
 * Go source:
 * func (c *Checker) GetConstraintOfTypeParameter(typeParameter *Type) *Type {
 * 	return c.getConstraintOfTypeParameter(typeParameter)
 * }
 */
export function Checker_GetConstraintOfTypeParameter(receiver: GoPtr<Checker>, typeParameter: GoPtr<Type>): GoPtr<Type> {
  return Checker_getConstraintOfTypeParameter(receiver, typeParameter);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetDefaultFromTypeParameter","kind":"method","status":"implemented","sigHash":"3c146b7c586e540e7ec9a511b50fd785eb1010a919f66b2023b9c7ae69ce7315"}
 *
 * Go source:
 * func (c *Checker) GetDefaultFromTypeParameter(typeParameter *Type) *Type {
 * 	return c.getDefaultFromTypeParameter(typeParameter)
 * }
 */
export function Checker_GetDefaultFromTypeParameter(receiver: GoPtr<Checker>, typeParameter: GoPtr<Type>): GoPtr<Type> {
  return Checker_getDefaultFromTypeParameter(receiver, typeParameter);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetResolutionModeOverride","kind":"method","status":"implemented","sigHash":"47b1c6a8b7bf3815e9f017a31474e14eb572bd2d4aa8e97ab87dd6b78316d6c2"}
 *
 * Go source:
 * func (c *Checker) GetResolutionModeOverride(node *ast.ImportAttributes, reportErrors bool) core.ResolutionMode {
 * 	return c.getResolutionModeOverride(node, reportErrors)
 * }
 */
export function Checker_GetResolutionModeOverride(receiver: GoPtr<Checker>, node: GoPtr<ImportAttributes>, reportErrors: bool): ResolutionMode {
  return Checker_getResolutionModeOverride(receiver, node, reportErrors);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetEffectiveDeclarationFlags","kind":"method","status":"implemented","sigHash":"52b5369c5bae83c774e3e66c14a2b2cf2570b761e24e5dc8b341309eec74a48b"}
 *
 * Go source:
 * func (c *Checker) GetEffectiveDeclarationFlags(n *ast.Node, flagsToCheck ast.ModifierFlags) ast.ModifierFlags {
 * 	return c.getEffectiveDeclarationFlags(n, flagsToCheck)
 * }
 */
export function Checker_GetEffectiveDeclarationFlags(receiver: GoPtr<Checker>, n: GoPtr<Node>, flagsToCheck: ModifierFlags): ModifierFlags {
  return Checker_getEffectiveDeclarationFlags(receiver, n, flagsToCheck);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBaseConstraintOfType","kind":"method","status":"implemented","sigHash":"bbbbecb6ba55a14859eb2d37ff3dc0ed1274afafcca581a8bcae7056b5864813"}
 *
 * Go source:
 * func (c *Checker) GetBaseConstraintOfType(t *Type) *Type {
 * 	return c.getBaseConstraintOfType(t)
 * }
 */
export function Checker_GetBaseConstraintOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getBaseConstraintOfType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypePredicateOfSignature","kind":"method","status":"implemented","sigHash":"160c13eac9cc825e72e004d4993dddc21fa23e80c22bc3a050ec9c516340e3b0"}
 *
 * Go source:
 * func (c *Checker) GetTypePredicateOfSignature(sig *Signature) *TypePredicate {
 * 	return c.getTypePredicateOfSignature(sig)
 * }
 */
export function Checker_GetTypePredicateOfSignature(receiver: GoPtr<Checker>, sig: GoPtr<Signature>): GoPtr<TypePredicate> {
  return Checker_getTypePredicateOfSignature(receiver, sig);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::func::IsTupleType","kind":"func","status":"implemented","sigHash":"fc12bfcae2ff4b9c35a43a269ce5e7764af19119b3dc7db59404543f45769056"}
 *
 * Go source:
 * func IsTupleType(t *Type) bool {
 * 	return isTupleType(t)
 * }
 */
export function IsTupleType(t: GoPtr<Type>): bool {
  return isTupleType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetReturnTypeOfSignature","kind":"method","status":"implemented","sigHash":"5bf1b806e8a4bc06895a47d6e24e4b86aa0f52b24465df52ab16d04604590e91"}
 *
 * Go source:
 * func (c *Checker) GetReturnTypeOfSignature(sig *Signature) *Type {
 * 	return c.getReturnTypeOfSignature(sig)
 * }
 */
export function Checker_GetReturnTypeOfSignature(receiver: GoPtr<Checker>, sig: GoPtr<Signature>): GoPtr<Type> {
  return Checker_getReturnTypeOfSignature(receiver, sig);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.HasEffectiveRestParameter","kind":"method","status":"implemented","sigHash":"3e298abb97936ed036f928b0e8cb971992a7344bc2a1867140ed8c80f6dd1e32"}
 *
 * Go source:
 * func (c *Checker) HasEffectiveRestParameter(signature *Signature) bool {
 * 	return c.hasEffectiveRestParameter(signature)
 * }
 */
export function Checker_HasEffectiveRestParameter(receiver: GoPtr<Checker>, signature: GoPtr<Signature>): bool {
  return Checker_hasEffectiveRestParameter(receiver, signature);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias","kind":"method","status":"implemented","sigHash":"b3476ffd3cd8fb0c435456edc0d8f2445cd02161054e69429333a5a746d174b6"}
 *
 * Go source:
 * func (c *Checker) GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol *ast.Symbol) []*Type {
 * 	return c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
 * }
 */
export function Checker_GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): GoSlice<GoPtr<Type>> {
  return Checker_getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetContextualTypeForObjectLiteralElement","kind":"method","status":"implemented","sigHash":"6a4816b09d2b0ac85e5c43517f19011a5d9d14323c48f77daf1f6ee590ecc1fd"}
 *
 * Go source:
 * func (c *Checker) GetContextualTypeForObjectLiteralElement(element *ast.Node, contextFlags ContextFlags) *Type {
 * 	return c.getContextualTypeForObjectLiteralElement(element, contextFlags)
 * }
 */
export function Checker_GetContextualTypeForObjectLiteralElement(receiver: GoPtr<Checker>, element: GoPtr<Node>, contextFlags: ContextFlags): GoPtr<Type> {
  return Checker_getContextualTypeForObjectLiteralElement(receiver, element, contextFlags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.TypePredicateToString","kind":"method","status":"implemented","sigHash":"5fba1ba5caa5cf51ca3ded04ff9a9cd9c5a4c52649bfa901c80dfdbe15c0e86d"}
 *
 * Go source:
 * func (c *Checker) TypePredicateToString(t *TypePredicate) string {
 * 	return c.typePredicateToString(t)
 * }
 */
export function Checker_TypePredicateToString(receiver: GoPtr<Checker>, t: GoPtr<TypePredicate>): string {
  return Checker_typePredicateToString(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetExpandedParameters","kind":"method","status":"implemented","sigHash":"995306b4f0b037e2dacc99b33ea7b020594e19e51c5293d40d9ae05ac2bebfad"}
 *
 * Go source:
 * func (c *Checker) GetExpandedParameters(signature *Signature, skipUnionExpanding bool) [][]*ast.Symbol {
 * 	return c.getExpandedParameters(signature, skipUnionExpanding)
 * }
 */
export function Checker_GetExpandedParameters(receiver: GoPtr<Checker>, signature: GoPtr<Signature>, skipUnionExpanding: bool): GoSlice<GoSlice<GoPtr<Symbol>>> {
  return Checker_getExpandedParameters(receiver, signature, skipUnionExpanding);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetResolvedSignature","kind":"method","status":"implemented","sigHash":"199bf327aa605ac4f46dbbdd1883b4d69ae25ae43f480c1775320e5641f8adac"}
 *
 * Go source:
 * func (c *Checker) GetResolvedSignature(node *ast.Node) *Signature {
 * 	return c.getResolvedSignature(node, nil, CheckModeNormal)
 * }
 */
export function Checker_GetResolvedSignature(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Signature> {
  return Checker_getResolvedSignature(receiver, node, undefined, CheckModeNormal);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeOfPropertyOfType","kind":"method","status":"implemented","sigHash":"bf7e579fe782f5b955442e52036c9877425786585d15d7ad8d33d73fefbf4fc3"}
 *
 * Go source:
 * func (c *Checker) GetTypeOfPropertyOfType(t *Type, name string) *Type {
 * 	return c.getTypeOfPropertyOfType(t, name)
 * }
 */
export function Checker_GetTypeOfPropertyOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>, name: string): GoPtr<Type> {
  return Checker_getTypeOfPropertyOfType(receiver, t, name);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetContextualTypeForArgumentAtIndex","kind":"method","status":"implemented","sigHash":"7624e082ef2f5d173cfee23537c895345e9cbd2bbf01c284287ddaf48cdb1218"}
 *
 * Go source:
 * func (c *Checker) GetContextualTypeForArgumentAtIndex(node *ast.Node, argIndex int) *Type {
 * 	return c.getContextualTypeForArgumentAtIndex(node, argIndex)
 * }
 */
export function Checker_GetContextualTypeForArgumentAtIndex(receiver: GoPtr<Checker>, node: GoPtr<Node>, argIndex: int): GoPtr<Type> {
  return Checker_getContextualTypeForArgumentAtIndex(receiver, node, argIndex);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetIndexSignaturesAtLocation","kind":"method","status":"implemented","sigHash":"0023824bdef28da47e1baf1556a0003b2588bd5eacacb2f9ac0dced027fe1dca"}
 *
 * Go source:
 * func (c *Checker) GetIndexSignaturesAtLocation(node *ast.Node) []*ast.Node {
 * 	return c.getIndexSignaturesAtLocation(node)
 * }
 */
export function Checker_GetIndexSignaturesAtLocation(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoSlice<GoPtr<Node>> {
  return Checker_getIndexSignaturesAtLocation(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetResolvedSymbol","kind":"method","status":"implemented","sigHash":"8fea2f91b74f4b573a987489222a629557ba9b7fd30b2efaf744276c0dbce1ad"}
 *
 * Go source:
 * func (c *Checker) GetResolvedSymbol(node *ast.Node) *ast.Symbol {
 * 	return c.getResolvedSymbol(node)
 * }
 */
export function Checker_GetResolvedSymbol(receiver: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Symbol> {
  return Checker_getResolvedSymbol(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetJsxNamespace","kind":"method","status":"implemented","sigHash":"8b6a38949c498a7cc5752ce76bc7bcdff29db472329d458d5a9beffb75bdd005"}
 *
 * Go source:
 * func (c *Checker) GetJsxNamespace(location *ast.Node) string {
 * 	return c.getJsxNamespace(location)
 * }
 */
export function Checker_GetJsxNamespace(receiver: GoPtr<Checker>, location: GoPtr<Node>): string {
  return Checker_getJsxNamespace(receiver, location);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetJsxFragmentFactory","kind":"method","status":"implemented","sigHash":"23352382a4789fd2ff1ebc986af2682659fd766517c7559a1595ef835ee89ec4"}
 *
 * Go source:
 * func (c *Checker) GetJsxFragmentFactory(location *ast.Node) string {
 * 	entity := c.getJsxFragmentFactoryEntity(location)
 * 	if entity != nil {
 * 		return ast.GetFirstIdentifier(entity).Text()
 * 	}
 * 	return ""
 * }
 */
export function Checker_GetJsxFragmentFactory(receiver: GoPtr<Checker>, location: GoPtr<Node>): string {
  const entity = Checker_getJsxFragmentFactoryEntity(receiver, location);
  if (entity !== undefined) {
    return Node_Text(GetFirstIdentifier(entity));
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.ResolveName","kind":"method","status":"implemented","sigHash":"dad4ab91ef0148affc8367e3b9291776daed8078561744c4903c8b2d23d83bfc"}
 *
 * Go source:
 * func (c *Checker) ResolveName(name string, location *ast.Node, meaning ast.SymbolFlags, excludeGlobals bool) *ast.Symbol {
 * 	return c.resolveName(location, name, meaning, nil, true, excludeGlobals)
 * }
 */
export function Checker_ResolveName(receiver: GoPtr<Checker>, name: string, location: GoPtr<Node>, meaning: SymbolFlags, excludeGlobals: bool): GoPtr<Symbol> {
  return receiver!.resolveName!(location, name, meaning, undefined, true as bool, excludeGlobals);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetSymbolFlags","kind":"method","status":"implemented","sigHash":"09b5db9ad9c5721adc13f5529853920e91f4b7934790ed7fe734e8b09d135627"}
 *
 * Go source:
 * func (c *Checker) GetSymbolFlags(symbol *ast.Symbol) ast.SymbolFlags {
 * 	return c.getSymbolFlags(symbol)
 * }
 */
export function Checker_GetSymbolFlags(receiver: GoPtr<Checker>, symbol_: GoPtr<Symbol>): SymbolFlags {
  return Checker_getSymbolFlags(receiver, symbol_);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBaseTypes","kind":"method","status":"implemented","sigHash":"0c278fdf202724806b74b5dea361160fbba2308e30d9bf79503d6c848b27aba2"}
 *
 * Go source:
 * func (c *Checker) GetBaseTypes(t *Type) []*Type {
 * 	return c.getBaseTypes(t)
 * }
 */
export function Checker_GetBaseTypes(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  return Checker_getBaseTypes(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetApparentType","kind":"method","status":"implemented","sigHash":"014077be37d2c05c1e5770982979f79d2e40dc3c8a8956b97cdc9236b6a3b08f"}
 *
 * Go source:
 * func (c *Checker) GetApparentType(t *Type) *Type {
 * 	return c.getApparentType(t)
 * }
 */
export function Checker_GetApparentType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getApparentType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetBaseConstructorTypeOfClass","kind":"method","status":"implemented","sigHash":"ea317e9187ece7c911635f48d6efe6cc42f27dd2bd71ccc1767e70f60ba19fb8"}
 *
 * Go source:
 * func (c *Checker) GetBaseConstructorTypeOfClass(t *Type) *Type {
 * 	return c.getBaseConstructorTypeOfClass(t)
 * }
 */
export function Checker_GetBaseConstructorTypeOfClass(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getBaseConstructorTypeOfClass(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetRestTypeOfSignature","kind":"method","status":"implemented","sigHash":"fea6032ea6d9fc0596bf06c4fe25a937fe8b2ac2df34683f62eec3c027d579db"}
 *
 * Go source:
 * func (c *Checker) GetRestTypeOfSignature(sig *Signature) *Type {
 * 	return c.getRestTypeOfSignature(sig)
 * }
 */
export function Checker_GetRestTypeOfSignature(receiver: GoPtr<Checker>, sig: GoPtr<Signature>): GoPtr<Type> {
  return Checker_getRestTypeOfSignature(receiver, sig);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetTypeArguments","kind":"method","status":"implemented","sigHash":"d85d0a69bb794bf36f7e11babc2b1539fc6f2203db97110a370cab708edcb3df"}
 *
 * Go source:
 * func (c *Checker) GetTypeArguments(t *Type) []*Type {
 * 	return c.getTypeArguments(t)
 * }
 */
export function Checker_GetTypeArguments(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<Type>> {
  return Checker_getTypeArguments(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetIndexInfoOfType","kind":"method","status":"implemented","sigHash":"12d9e1423af714e7c04441651b3c9a46c80d5e880d8983ee1ffc362761c84bae"}
 *
 * Go source:
 * func (c *Checker) GetIndexInfoOfType(t *Type, keyType *Type) *IndexInfo {
 * 	return c.getIndexInfoOfType(t, keyType)
 * }
 */
export function Checker_GetIndexInfoOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>, keyType: GoPtr<Type>): GoPtr<IndexInfo> {
  return Checker_getIndexInfoOfType(receiver, t, keyType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetIndexInfosOfType","kind":"method","status":"implemented","sigHash":"8998a315d84ae915a80a9a7ca908a079f98829f653dd03de4bf12dadb92c9e5c"}
 *
 * Go source:
 * func (c *Checker) GetIndexInfosOfType(t *Type) []*IndexInfo {
 * 	return c.getIndexInfosOfType(t)
 * }
 */
export function Checker_GetIndexInfosOfType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoSlice<GoPtr<IndexInfo>> {
  return Checker_getIndexInfosOfType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.IsContextSensitive","kind":"method","status":"implemented","sigHash":"cfe08baa73b28197381c47732eaa01e1e140a1346dbbbf12a0376e9757e849f8"}
 *
 * Go source:
 * func (c *Checker) IsContextSensitive(node *ast.Node) bool {
 * 	return c.isContextSensitive(node)
 * }
 */
export function Checker_IsContextSensitive(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  return Checker_isContextSensitive(receiver, node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.FillMissingTypeArguments","kind":"method","status":"implemented","sigHash":"9838f5c4343e3112344b8d4c4e55c059aa15b9451a6efe47150d20f4bdc445ff"}
 *
 * Go source:
 * func (c *Checker) FillMissingTypeArguments(typeArguments []*Type, typeParameters []*Type, minTypeArgumentCount int, isJavaScriptImplicitAny bool) []*Type {
 * 	return c.fillMissingTypeArguments(typeArguments, typeParameters, minTypeArgumentCount, isJavaScriptImplicitAny)
 * }
 */
export function Checker_FillMissingTypeArguments(receiver: GoPtr<Checker>, typeArguments: GoSlice<GoPtr<Type>>, typeParameters: GoSlice<GoPtr<Type>>, minTypeArgumentCount: int, isJavaScriptImplicitAny: bool): GoSlice<GoPtr<Type>> {
  return Checker_fillMissingTypeArguments(receiver, typeArguments, typeParameters, minTypeArgumentCount, isJavaScriptImplicitAny);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetMinTypeArgumentCount","kind":"method","status":"implemented","sigHash":"2c9142bc91e8de4b761eeb7c7b686d50f9ed9317bb5d3c523b8a65522897f457"}
 *
 * Go source:
 * func (c *Checker) GetMinTypeArgumentCount(typeParameters []*Type) int {
 * 	return c.getMinTypeArgumentCount(typeParameters)
 * }
 */
export function Checker_GetMinTypeArgumentCount(receiver: GoPtr<Checker>, typeParameters: GoSlice<GoPtr<Type>>): int {
  return Checker_getMinTypeArgumentCount(receiver, typeParameters);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetWidenedLiteralType","kind":"method","status":"implemented","sigHash":"ce711cfc323c11f17c1abe1669126c60ac87f157b5643db0264d5bbabbf26d8b"}
 *
 * Go source:
 * func (c *Checker) GetWidenedLiteralType(t *Type) *Type {
 * 	return c.getWidenedLiteralType(t)
 * }
 */
export function Checker_GetWidenedLiteralType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getWidenedLiteralType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.IsTypeAssignableTo","kind":"method","status":"implemented","sigHash":"9468ee8439b2efaeca598959b53bb9c56c764bb4cba8e572201ca375b7538582"}
 *
 * Go source:
 * func (c *Checker) IsTypeAssignableTo(source *Type, target *Type) bool {
 * 	return c.isTypeAssignableTo(source, target)
 * }
 */
export function Checker_IsTypeAssignableTo(receiver: GoPtr<Checker>, source: GoPtr<Type>, target: GoPtr<Type>): bool {
  return Checker_isTypeAssignableTo(receiver, source, target);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetUnionTypeEx","kind":"method","status":"implemented","sigHash":"3c0c4bff5d4062029716d2b7e64ced259dd64ecf9d9cf60a98c1b2bcda6fab82"}
 *
 * Go source:
 * func (c *Checker) GetUnionTypeEx(types []*Type, unionReduction UnionReduction) *Type {
 * 	return c.getUnionTypeEx(types, unionReduction, nil, nil)
 * }
 */
export function Checker_GetUnionTypeEx(receiver: GoPtr<Checker>, types: GoSlice<GoPtr<Type>>, unionReduction: UnionReduction): GoPtr<Type> {
  return Checker_getUnionTypeEx(receiver, types, unionReduction, undefined, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.RequiresAddingImplicitUndefined","kind":"method","status":"implemented","sigHash":"00a90dadba25b302220601f28cef87398dc37f197f5fe8df0222285969eca169"}
 *
 * Go source:
 * func (c *Checker) RequiresAddingImplicitUndefined(node *ast.Node) bool {
 * 	enclosingDeclaration := ast.FindAncestor(node, ast.IsDeclaration)
 * 	if enclosingDeclaration == nil {
 * 		enclosingDeclaration = ast.GetSourceFileOfNode(node).AsNode()
 * 	}
 * 	symbol := node.Symbol()
 * 	if symbol == nil {
 * 		return false
 * 	}
 * 	return c.GetEmitResolver().RequiresAddingImplicitUndefined(node, symbol, enclosingDeclaration)
 * }
 */
export function Checker_RequiresAddingImplicitUndefined(receiver: GoPtr<Checker>, node: GoPtr<Node>): bool {
  let enclosingDeclaration = FindAncestor(node, IsDeclaration);
  if (enclosingDeclaration === undefined) {
    enclosingDeclaration = GetSourceFileOfNode(node) as GoPtr<Node>;
  }
  const symbol_ = Node_Symbol(node);
  if (symbol_ === undefined) {
    return false;
  }
  return EmitResolver_RequiresAddingImplicitUndefined(Checker_GetEmitResolver(receiver), node, symbol_, enclosingDeclaration);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.RemoveMissingOrUndefinedType","kind":"method","status":"implemented","sigHash":"675d60ee4df38b7993fe331b3e9d07b567a6a7ca9dbdcdbc66ecf75dede36f75"}
 *
 * Go source:
 * func (c *Checker) RemoveMissingOrUndefinedType(t *Type) *Type {
 * 	return c.removeMissingOrUndefinedType(t)
 * }
 */
export function Checker_RemoveMissingOrUndefinedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_removeMissingOrUndefinedType(receiver, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/exports.go::method::Checker.GetWidenedType","kind":"method","status":"implemented","sigHash":"d7c493ede4334a26133d73d0deec634878889d67f05068ba4000b112ab8a70d2"}
 *
 * Go source:
 * func (c *Checker) GetWidenedType(t *Type) *Type {
 * 	return c.getWidenedType(t)
 * }
 */
export function Checker_GetWidenedType(receiver: GoPtr<Checker>, t: GoPtr<Type>): GoPtr<Type> {
  return Checker_getWidenedType(receiver, t);
}
