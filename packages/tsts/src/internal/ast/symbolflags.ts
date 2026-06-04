import type { int, uint } from "@tsonic/core/types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/symbolflags.go::type::SymbolFlags","kind":"type","status":"stub","sigHash":"478f012c33c85d0057b773367c3fa3436c5802642845afcb65c8461cfa951468","bodyHash":"151ab65c3bc13f436b4340bff6ee9783ca55c52c0f3a65f6e5fa7d8a83531349"}
 *
 * Go source:
 * SymbolFlags uint32
 */
export type SymbolFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/symbolflags.go::constGroup::SymbolFlagsNone+SymbolFlagsFunctionScopedVariable+SymbolFlagsBlockScopedVariable+SymbolFlagsProperty+SymbolFlagsEnumMember+SymbolFlagsFunction+SymbolFlagsClass+SymbolFlagsInterface+SymbolFlagsConstEnum+SymbolFlagsRegularEnum+SymbolFlagsValueModule+SymbolFlagsNamespaceModule+SymbolFlagsTypeLiteral+SymbolFlagsObjectLiteral+SymbolFlagsMethod+SymbolFlagsConstructor+SymbolFlagsGetAccessor+SymbolFlagsSetAccessor+SymbolFlagsSignature+SymbolFlagsTypeParameter+SymbolFlagsTypeAlias+SymbolFlagsExportValue+SymbolFlagsAlias+SymbolFlagsPrototype+SymbolFlagsExportStar+SymbolFlagsOptional+SymbolFlagsTransient+SymbolFlagsAssignment+SymbolFlagsModuleExports+SymbolFlagsConstEnumOnlyModule+SymbolFlagsReplaceableByMethod+SymbolFlagsGlobalLookup+SymbolFlagsAll+SymbolFlagsEnum+SymbolFlagsVariable+SymbolFlagsValue+SymbolFlagsType+SymbolFlagsNamespace+SymbolFlagsModule+SymbolFlagsAccessor+SymbolFlagsFunctionScopedVariableExcludes+SymbolFlagsBlockScopedVariableExcludes+SymbolFlagsParameterExcludes+SymbolFlagsPropertyExcludes+SymbolFlagsEnumMemberExcludes+SymbolFlagsFunctionExcludes+SymbolFlagsClassExcludes+SymbolFlagsInterfaceExcludes+SymbolFlagsRegularEnumExcludes+SymbolFlagsConstEnumExcludes+SymbolFlagsValueModuleExcludes+SymbolFlagsNamespaceModuleExcludes+SymbolFlagsMethodExcludes+SymbolFlagsGetAccessorExcludes+SymbolFlagsSetAccessorExcludes+SymbolFlagsAccessorExcludes+SymbolFlagsTypeParameterExcludes+SymbolFlagsTypeAliasExcludes+SymbolFlagsAliasExcludes+SymbolFlagsModuleMember+SymbolFlagsExportHasLocal+SymbolFlagsBlockScoped+SymbolFlagsPropertyOrAccessor+SymbolFlagsClassMember+SymbolFlagsExportSupportsDefaultModifier+SymbolFlagsExportDoesNotSupportDefaultModifier+SymbolFlagsClassifiable+SymbolFlagsLateBindingContainer","kind":"constGroup","status":"stub","sigHash":"e33c0ef2c29ce44b42978953bbf03d3089350ab184045ca9badf8add51064c91","bodyHash":"3353f28370ead956862e648216f470bd5f84d556f2658cb4a6ed1be8ae5e0199"}
 *
 * Go source:
 * const (
 * 	SymbolFlagsNone                   SymbolFlags = 0
 * 	SymbolFlagsFunctionScopedVariable SymbolFlags = 1 << 0  // Variable (var) or parameter
 * 	SymbolFlagsBlockScopedVariable    SymbolFlags = 1 << 1  // A block-scoped variable (let or const)
 * 	SymbolFlagsProperty               SymbolFlags = 1 << 2  // Property or enum member
 * 	SymbolFlagsEnumMember             SymbolFlags = 1 << 3  // Enum member
 * 	SymbolFlagsFunction               SymbolFlags = 1 << 4  // Function
 * 	SymbolFlagsClass                  SymbolFlags = 1 << 5  // Class
 * 	SymbolFlagsInterface              SymbolFlags = 1 << 6  // Interface
 * 	SymbolFlagsConstEnum              SymbolFlags = 1 << 7  // Const enum
 * 	SymbolFlagsRegularEnum            SymbolFlags = 1 << 8  // Enum
 * 	SymbolFlagsValueModule            SymbolFlags = 1 << 9  // Instantiated module
 * 	SymbolFlagsNamespaceModule        SymbolFlags = 1 << 10 // Uninstantiated module
 * 	SymbolFlagsTypeLiteral            SymbolFlags = 1 << 11 // Type Literal or mapped type
 * 	SymbolFlagsObjectLiteral          SymbolFlags = 1 << 12 // Object Literal
 * 	SymbolFlagsMethod                 SymbolFlags = 1 << 13 // Method
 * 	SymbolFlagsConstructor            SymbolFlags = 1 << 14 // Constructor
 * 	SymbolFlagsGetAccessor            SymbolFlags = 1 << 15 // Get accessor
 * 	SymbolFlagsSetAccessor            SymbolFlags = 1 << 16 // Set accessor
 * 	SymbolFlagsSignature              SymbolFlags = 1 << 17 // Call, construct, or index signature
 * 	SymbolFlagsTypeParameter          SymbolFlags = 1 << 18 // Type parameter
 * 	SymbolFlagsTypeAlias              SymbolFlags = 1 << 19 // Type alias
 * 	SymbolFlagsExportValue            SymbolFlags = 1 << 20 // Exported value marker (see comment in declareModuleMember in binder)
 * 	SymbolFlagsAlias                  SymbolFlags = 1 << 21 // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
 * 	SymbolFlagsPrototype              SymbolFlags = 1 << 22 // Prototype property (no source representation)
 * 	SymbolFlagsExportStar             SymbolFlags = 1 << 23 // Export * declaration
 * 	SymbolFlagsOptional               SymbolFlags = 1 << 24 // Optional property
 * 	SymbolFlagsTransient              SymbolFlags = 1 << 25 // Transient symbol (created during type check)
 * 	SymbolFlagsAssignment             SymbolFlags = 1 << 26 // Assignment to property on function acting as declaration (eg `func.prop = 1`)
 * 	SymbolFlagsModuleExports          SymbolFlags = 1 << 27 // Symbol for CommonJS `module` of `module.exports`
 * 	SymbolFlagsConstEnumOnlyModule    SymbolFlags = 1 << 28 // Module contains only const enums or other modules with only const enums
 * 	SymbolFlagsReplaceableByMethod    SymbolFlags = 1 << 29
 * 	SymbolFlagsGlobalLookup           SymbolFlags = 1 << 30   // Flag to signal this is a global lookup
 * 	SymbolFlagsAll                    SymbolFlags = 1<<30 - 1 // All flags except SymbolFlagsGlobalLookup
 * 
 * 	SymbolFlagsEnum      = SymbolFlagsRegularEnum | SymbolFlagsConstEnum
 * 	SymbolFlagsVariable  = SymbolFlagsFunctionScopedVariable | SymbolFlagsBlockScopedVariable
 * 	SymbolFlagsValue     = SymbolFlagsVariable | SymbolFlagsProperty | SymbolFlagsEnumMember | SymbolFlagsObjectLiteral | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule | SymbolFlagsMethod | SymbolFlagsGetAccessor | SymbolFlagsSetAccessor
 * 	SymbolFlagsType      = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsEnumMember | SymbolFlagsTypeLiteral | SymbolFlagsTypeParameter | SymbolFlagsTypeAlias
 * 	SymbolFlagsNamespace = SymbolFlagsValueModule | SymbolFlagsNamespaceModule | SymbolFlagsEnum
 * 	SymbolFlagsModule    = SymbolFlagsValueModule | SymbolFlagsNamespaceModule
 * 	SymbolFlagsAccessor  = SymbolFlagsGetAccessor | SymbolFlagsSetAccessor
 * 
 * 	// Variables can be redeclared, but can not redeclare a block-scoped declaration with the
 * 	// same name, or any other value that is not a variable, e.g. ValueModule or Class
 * 	SymbolFlagsFunctionScopedVariableExcludes = SymbolFlagsValue & ^SymbolFlagsFunctionScopedVariable
 * 
 * 	// Block-scoped declarations are not allowed to be re-declared
 * 	// they can not merge with anything in the value space
 * 	SymbolFlagsBlockScopedVariableExcludes = SymbolFlagsValue
 * 
 * 	SymbolFlagsParameterExcludes                   = SymbolFlagsValue
 * 	SymbolFlagsPropertyExcludes                    = SymbolFlagsValue & ^SymbolFlagsProperty
 * 	SymbolFlagsEnumMemberExcludes                  = SymbolFlagsValue | SymbolFlagsType
 * 	SymbolFlagsFunctionExcludes                    = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsValueModule | SymbolFlagsClass)
 * 	SymbolFlagsClassExcludes                       = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsValueModule | SymbolFlagsInterface | SymbolFlagsFunction) // class-interface mergability done in checker.ts
 * 	SymbolFlagsInterfaceExcludes                   = SymbolFlagsType & ^(SymbolFlagsInterface | SymbolFlagsClass)
 * 	SymbolFlagsRegularEnumExcludes                 = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsRegularEnum | SymbolFlagsValueModule) // regular enums merge only with regular enums and modules
 * 	SymbolFlagsConstEnumExcludes                   = (SymbolFlagsValue | SymbolFlagsType) & ^SymbolFlagsConstEnum                              // const enums merge only with const enums
 * 	SymbolFlagsValueModuleExcludes                 = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsRegularEnum | SymbolFlagsValueModule)
 * 	SymbolFlagsNamespaceModuleExcludes             = SymbolFlagsNone
 * 	SymbolFlagsMethodExcludes                      = SymbolFlagsValue & ^SymbolFlagsMethod
 * 	SymbolFlagsGetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsSetAccessor
 * 	SymbolFlagsSetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsGetAccessor
 * 	SymbolFlagsAccessorExcludes                    = SymbolFlagsValue
 * 	SymbolFlagsTypeParameterExcludes               = SymbolFlagsType & ^SymbolFlagsTypeParameter
 * 	SymbolFlagsTypeAliasExcludes                   = SymbolFlagsType
 * 	SymbolFlagsAliasExcludes                       = SymbolFlagsAlias
 * 	SymbolFlagsModuleMember                        = SymbolFlagsVariable | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsModule | SymbolFlagsTypeAlias | SymbolFlagsAlias
 * 	SymbolFlagsExportHasLocal                      = SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule
 * 	SymbolFlagsBlockScoped                         = SymbolFlagsBlockScopedVariable | SymbolFlagsClass | SymbolFlagsEnum
 * 	SymbolFlagsPropertyOrAccessor                  = SymbolFlagsProperty | SymbolFlagsAccessor
 * 	SymbolFlagsClassMember                         = SymbolFlagsMethod | SymbolFlagsAccessor | SymbolFlagsProperty
 * 	SymbolFlagsExportSupportsDefaultModifier       = SymbolFlagsClass | SymbolFlagsFunction | SymbolFlagsInterface
 * 	SymbolFlagsExportDoesNotSupportDefaultModifier = ^SymbolFlagsExportSupportsDefaultModifier
 * 	// The set of things we consider semantically classifiable.  Used to speed up the LS during
 * 	// classification.
 * 	SymbolFlagsClassifiable         = SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsTypeAlias | SymbolFlagsInterface | SymbolFlagsTypeParameter | SymbolFlagsModule | SymbolFlagsAlias
 * 	SymbolFlagsLateBindingContainer = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsTypeLiteral | SymbolFlagsObjectLiteral | SymbolFlagsFunction
 * )
 */
export const SymbolFlagsNone: SymbolFlags = undefined as never;
export const SymbolFlagsFunctionScopedVariable: SymbolFlags = undefined as never;
export const SymbolFlagsBlockScopedVariable: SymbolFlags = undefined as never;
export const SymbolFlagsProperty: SymbolFlags = undefined as never;
export const SymbolFlagsEnumMember: SymbolFlags = undefined as never;
export const SymbolFlagsFunction: SymbolFlags = undefined as never;
export const SymbolFlagsClass: SymbolFlags = undefined as never;
export const SymbolFlagsInterface: SymbolFlags = undefined as never;
export const SymbolFlagsConstEnum: SymbolFlags = undefined as never;
export const SymbolFlagsRegularEnum: SymbolFlags = undefined as never;
export const SymbolFlagsValueModule: SymbolFlags = undefined as never;
export const SymbolFlagsNamespaceModule: SymbolFlags = undefined as never;
export const SymbolFlagsTypeLiteral: SymbolFlags = undefined as never;
export const SymbolFlagsObjectLiteral: SymbolFlags = undefined as never;
export const SymbolFlagsMethod: SymbolFlags = undefined as never;
export const SymbolFlagsConstructor: SymbolFlags = undefined as never;
export const SymbolFlagsGetAccessor: SymbolFlags = undefined as never;
export const SymbolFlagsSetAccessor: SymbolFlags = undefined as never;
export const SymbolFlagsSignature: SymbolFlags = undefined as never;
export const SymbolFlagsTypeParameter: SymbolFlags = undefined as never;
export const SymbolFlagsTypeAlias: SymbolFlags = undefined as never;
export const SymbolFlagsExportValue: SymbolFlags = undefined as never;
export const SymbolFlagsAlias: SymbolFlags = undefined as never;
export const SymbolFlagsPrototype: SymbolFlags = undefined as never;
export const SymbolFlagsExportStar: SymbolFlags = undefined as never;
export const SymbolFlagsOptional: SymbolFlags = undefined as never;
export const SymbolFlagsTransient: SymbolFlags = undefined as never;
export const SymbolFlagsAssignment: SymbolFlags = undefined as never;
export const SymbolFlagsModuleExports: SymbolFlags = undefined as never;
export const SymbolFlagsConstEnumOnlyModule: SymbolFlags = undefined as never;
export const SymbolFlagsReplaceableByMethod: SymbolFlags = undefined as never;
export const SymbolFlagsGlobalLookup: SymbolFlags = undefined as never;
export const SymbolFlagsAll: SymbolFlags = undefined as never;
export const SymbolFlagsEnum: int = undefined as never;
export const SymbolFlagsVariable: int = undefined as never;
export const SymbolFlagsValue: int = undefined as never;
export const SymbolFlagsType: int = undefined as never;
export const SymbolFlagsNamespace: int = undefined as never;
export const SymbolFlagsModule: int = undefined as never;
export const SymbolFlagsAccessor: int = undefined as never;
export const SymbolFlagsFunctionScopedVariableExcludes: int = undefined as never;
export const SymbolFlagsBlockScopedVariableExcludes: int = undefined as never;
export const SymbolFlagsParameterExcludes: int = undefined as never;
export const SymbolFlagsPropertyExcludes: int = undefined as never;
export const SymbolFlagsEnumMemberExcludes: int = undefined as never;
export const SymbolFlagsFunctionExcludes: int = undefined as never;
export const SymbolFlagsClassExcludes: int = undefined as never;
export const SymbolFlagsInterfaceExcludes: int = undefined as never;
export const SymbolFlagsRegularEnumExcludes: int = undefined as never;
export const SymbolFlagsConstEnumExcludes: int = undefined as never;
export const SymbolFlagsValueModuleExcludes: int = undefined as never;
export const SymbolFlagsNamespaceModuleExcludes: SymbolFlags = undefined as never;
export const SymbolFlagsMethodExcludes: int = undefined as never;
export const SymbolFlagsGetAccessorExcludes: int = undefined as never;
export const SymbolFlagsSetAccessorExcludes: int = undefined as never;
export const SymbolFlagsAccessorExcludes: int = undefined as never;
export const SymbolFlagsTypeParameterExcludes: int = undefined as never;
export const SymbolFlagsTypeAliasExcludes: int = undefined as never;
export const SymbolFlagsAliasExcludes: SymbolFlags = undefined as never;
export const SymbolFlagsModuleMember: int = undefined as never;
export const SymbolFlagsExportHasLocal: int = undefined as never;
export const SymbolFlagsBlockScoped: int = undefined as never;
export const SymbolFlagsPropertyOrAccessor: int = undefined as never;
export const SymbolFlagsClassMember: int = undefined as never;
export const SymbolFlagsExportSupportsDefaultModifier: int = undefined as never;
export const SymbolFlagsExportDoesNotSupportDefaultModifier: unknown = undefined as never;
export const SymbolFlagsClassifiable: int = undefined as never;
export const SymbolFlagsLateBindingContainer: int = undefined as never;
