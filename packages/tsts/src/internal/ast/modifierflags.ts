import type { uint } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/modifierflags.go::type::ModifierFlags","kind":"type","status":"implemented","sigHash":"5761566c75ca7f87cc211846287e7507067a63fd484abeffb48b077a6c99ab92"}
 *
 * Go source:
 * ModifierFlags uint32
 */
export type ModifierFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/modifierflags.go::constGroup::ModifierFlagsNone+ModifierFlagsPublic+ModifierFlagsPrivate+ModifierFlagsProtected+ModifierFlagsReadonly+ModifierFlagsOverride+ModifierFlagsExport+ModifierFlagsAbstract+ModifierFlagsAmbient+ModifierFlagsStatic+ModifierFlagsAccessor+ModifierFlagsAsync+ModifierFlagsDefault+ModifierFlagsConst+ModifierFlagsIn+ModifierFlagsOut+ModifierFlagsDecorator+ModifierFlagsDeprecated+ModifierFlagsJSDocPublic+ModifierFlagsJSDocPrivate+ModifierFlagsJSDocProtected+ModifierFlagsJSDocReadonly+ModifierFlagsJSDocOverride+ModifierFlagsHasComputedJSDocModifiers+ModifierFlagsHasComputedFlags+ModifierFlagsSyntacticOrJSDocModifiers+ModifierFlagsSyntacticOnlyModifiers+ModifierFlagsSyntacticModifiers+ModifierFlagsJSDocCacheOnlyModifiers+ModifierFlagsJSDocOnlyModifiers+ModifierFlagsNonCacheOnlyModifiers+ModifierFlagsAccessibilityModifier+ModifierFlagsParameterPropertyModifier+ModifierFlagsNonPublicAccessibilityModifier+ModifierFlagsTypeScriptModifier+ModifierFlagsExportDefault+ModifierFlagsAll+ModifierFlagsModifier+ModifierFlagsJavaScript","kind":"constGroup","status":"implemented","sigHash":"f0903af70e78772bb6c1da70148f696961a13f6e21176c00d2a8e41ec472fbb5"}
 *
 * Go source:
 * const (
 * 	ModifierFlagsNone ModifierFlags = 0
 * 	// Syntactic/JSDoc modifiers
 * 	ModifierFlagsPublic    ModifierFlags = 1 << 0 // Property/Method
 * 	ModifierFlagsPrivate   ModifierFlags = 1 << 1 // Property/Method
 * 	ModifierFlagsProtected ModifierFlags = 1 << 2 // Property/Method
 * 	ModifierFlagsReadonly  ModifierFlags = 1 << 3 // Property/Method
 * 	ModifierFlagsOverride  ModifierFlags = 1 << 4 // Override method
 * 	// Syntactic-only modifiers
 * 	ModifierFlagsExport    ModifierFlags = 1 << 5  // Declarations
 * 	ModifierFlagsAbstract  ModifierFlags = 1 << 6  // Class/Method/ConstructSignature
 * 	ModifierFlagsAmbient   ModifierFlags = 1 << 7  // Declarations (declare keyword)
 * 	ModifierFlagsStatic    ModifierFlags = 1 << 8  // Property/Method
 * 	ModifierFlagsAccessor  ModifierFlags = 1 << 9  // Property
 * 	ModifierFlagsAsync     ModifierFlags = 1 << 10 // Property/Method/Function
 * 	ModifierFlagsDefault   ModifierFlags = 1 << 11 // Function/Class (export default declaration)
 * 	ModifierFlagsConst     ModifierFlags = 1 << 12 // Const enum
 * 	ModifierFlagsIn        ModifierFlags = 1 << 13 // Contravariance modifier
 * 	ModifierFlagsOut       ModifierFlags = 1 << 14 // Covariance modifier
 * 	ModifierFlagsDecorator ModifierFlags = 1 << 15 // Contains a decorator
 * 	// JSDoc-only modifiers
 * 	ModifierFlagsDeprecated ModifierFlags = 1 << 16 // Deprecated tag
 * 	// Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
 * 	ModifierFlagsJSDocPublic               ModifierFlags = 1 << 23 // if this value changes, `selectEffectiveModifierFlags` must change accordingly
 * 	ModifierFlagsJSDocPrivate              ModifierFlags = 1 << 24
 * 	ModifierFlagsJSDocProtected            ModifierFlags = 1 << 25
 * 	ModifierFlagsJSDocReadonly             ModifierFlags = 1 << 26
 * 	ModifierFlagsJSDocOverride             ModifierFlags = 1 << 27
 * 	ModifierFlagsHasComputedJSDocModifiers ModifierFlags = 1 << 28 // Indicates the computed modifier flags include modifiers from JSDoc.
 * 	ModifierFlagsHasComputedFlags          ModifierFlags = 1 << 29 // Modifier flags have been computed
 * 
 * 	ModifierFlagsSyntacticOrJSDocModifiers = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsOverride
 * 	ModifierFlagsSyntacticOnlyModifiers    = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsAbstract | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator
 * 	ModifierFlagsSyntacticModifiers        = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers
 * 	ModifierFlagsJSDocCacheOnlyModifiers   = ModifierFlagsJSDocPublic | ModifierFlagsJSDocPrivate | ModifierFlagsJSDocProtected | ModifierFlagsJSDocReadonly | ModifierFlagsJSDocOverride
 * 	ModifierFlagsJSDocOnlyModifiers        = ModifierFlagsDeprecated
 * 	ModifierFlagsNonCacheOnlyModifiers     = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers | ModifierFlagsJSDocOnlyModifiers
 * 
 * 	ModifierFlagsAccessibilityModifier = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected
 * 	// Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
 * 	ModifierFlagsParameterPropertyModifier      = ModifierFlagsAccessibilityModifier | ModifierFlagsReadonly | ModifierFlagsOverride
 * 	ModifierFlagsNonPublicAccessibilityModifier = ModifierFlagsPrivate | ModifierFlagsProtected
 * 
 * 	ModifierFlagsTypeScriptModifier = ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsConst | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut
 * 	ModifierFlagsExportDefault      = ModifierFlagsExport | ModifierFlagsDefault
 * 	ModifierFlagsAll                = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsStatic | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsDeprecated | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator
 * 	ModifierFlagsModifier           = ModifierFlagsAll & ^ModifierFlagsDecorator
 * 	ModifierFlagsJavaScript         = ModifierFlagsExport | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault
 * )
 */
export const ModifierFlagsNone: ModifierFlags = 0;
// Syntactic/JSDoc modifiers
export const ModifierFlagsPublic: ModifierFlags = 1 << 0; // Property/Method
export const ModifierFlagsPrivate: ModifierFlags = 1 << 1; // Property/Method
export const ModifierFlagsProtected: ModifierFlags = 1 << 2; // Property/Method
export const ModifierFlagsReadonly: ModifierFlags = 1 << 3; // Property/Method
export const ModifierFlagsOverride: ModifierFlags = 1 << 4; // Override method
// Syntactic-only modifiers
export const ModifierFlagsExport: ModifierFlags = 1 << 5; // Declarations
export const ModifierFlagsAbstract: ModifierFlags = 1 << 6; // Class/Method/ConstructSignature
export const ModifierFlagsAmbient: ModifierFlags = 1 << 7; // Declarations (declare keyword)
export const ModifierFlagsStatic: ModifierFlags = 1 << 8; // Property/Method
export const ModifierFlagsAccessor: ModifierFlags = 1 << 9; // Property
export const ModifierFlagsAsync: ModifierFlags = 1 << 10; // Property/Method/Function
export const ModifierFlagsDefault: ModifierFlags = 1 << 11; // Function/Class (export default declaration)
export const ModifierFlagsConst: ModifierFlags = 1 << 12; // Const enum
export const ModifierFlagsIn: ModifierFlags = 1 << 13; // Contravariance modifier
export const ModifierFlagsOut: ModifierFlags = 1 << 14; // Covariance modifier
export const ModifierFlagsDecorator: ModifierFlags = 1 << 15; // Contains a decorator
// JSDoc-only modifiers
export const ModifierFlagsDeprecated: ModifierFlags = 1 << 16; // Deprecated tag
// Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
export const ModifierFlagsJSDocPublic: ModifierFlags = 1 << 23;
export const ModifierFlagsJSDocPrivate: ModifierFlags = 1 << 24;
export const ModifierFlagsJSDocProtected: ModifierFlags = 1 << 25;
export const ModifierFlagsJSDocReadonly: ModifierFlags = 1 << 26;
export const ModifierFlagsJSDocOverride: ModifierFlags = 1 << 27;
export const ModifierFlagsHasComputedJSDocModifiers: ModifierFlags = 1 << 28; // Indicates the computed modifier flags include modifiers from JSDoc.
export const ModifierFlagsHasComputedFlags: ModifierFlags = 1 << 29; // Modifier flags have been computed
export const ModifierFlagsSyntacticOrJSDocModifiers: ModifierFlags = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsOverride;
export const ModifierFlagsSyntacticOnlyModifiers: ModifierFlags = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsAbstract | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator;
export const ModifierFlagsSyntacticModifiers: ModifierFlags = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers;
export const ModifierFlagsJSDocCacheOnlyModifiers: ModifierFlags = ModifierFlagsJSDocPublic | ModifierFlagsJSDocPrivate | ModifierFlagsJSDocProtected | ModifierFlagsJSDocReadonly | ModifierFlagsJSDocOverride;
export const ModifierFlagsJSDocOnlyModifiers: ModifierFlags = ModifierFlagsDeprecated;
export const ModifierFlagsNonCacheOnlyModifiers: ModifierFlags = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers | ModifierFlagsJSDocOnlyModifiers;
export const ModifierFlagsAccessibilityModifier: ModifierFlags = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected;
export const ModifierFlagsParameterPropertyModifier: ModifierFlags = ModifierFlagsAccessibilityModifier | ModifierFlagsReadonly | ModifierFlagsOverride;
export const ModifierFlagsNonPublicAccessibilityModifier: ModifierFlags = ModifierFlagsPrivate | ModifierFlagsProtected;
export const ModifierFlagsTypeScriptModifier: ModifierFlags = ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsConst | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut;
export const ModifierFlagsExportDefault: ModifierFlags = ModifierFlagsExport | ModifierFlagsDefault;
export const ModifierFlagsAll: ModifierFlags = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsStatic | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsDeprecated | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator;
export const ModifierFlagsModifier: ModifierFlags = (ModifierFlagsAll & ~ModifierFlagsDecorator) >>> 0;
export const ModifierFlagsJavaScript: ModifierFlags = ModifierFlagsExport | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault;

import type { Kind } from "./generated/kinds.js";
import {
  KindAbstractKeyword,
  KindAccessorKeyword,
  KindAsyncKeyword,
  KindConstKeyword,
  KindDeclareKeyword,
  KindDecorator,
  KindDefaultKeyword,
  KindExportKeyword,
  KindInKeyword,
  KindOutKeyword,
  KindOverrideKeyword,
  KindPrivateKeyword,
  KindProtectedKeyword,
  KindPublicKeyword,
  KindReadonlyKeyword,
  KindStaticKeyword,
} from "./generated/kinds.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { Node } from "./spine.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/utilities.go::func::ModifierToFlag","kind":"func","status":"implemented","sigHash":"58cf09e20f2fc84d1f7e7ceae03afd109b00f3284f70ae0f00774dd5bfc4b878"}
 *
 * Go source:
 * func ModifierToFlag(token Kind) ModifierFlags {
 * 	switch token {
 * 	case KindStaticKeyword:
 * 		return ModifierFlagsStatic
 * 	...
 * 	}
 * 	return ModifierFlagsNone
 * }
 */
export function ModifierToFlag(token: Kind): ModifierFlags {
  switch (token) {
    case KindStaticKeyword:
      return ModifierFlagsStatic;
    case KindPublicKeyword:
      return ModifierFlagsPublic;
    case KindProtectedKeyword:
      return ModifierFlagsProtected;
    case KindPrivateKeyword:
      return ModifierFlagsPrivate;
    case KindAbstractKeyword:
      return ModifierFlagsAbstract;
    case KindAccessorKeyword:
      return ModifierFlagsAccessor;
    case KindExportKeyword:
      return ModifierFlagsExport;
    case KindDeclareKeyword:
      return ModifierFlagsAmbient;
    case KindConstKeyword:
      return ModifierFlagsConst;
    case KindDefaultKeyword:
      return ModifierFlagsDefault;
    case KindAsyncKeyword:
      return ModifierFlagsAsync;
    case KindReadonlyKeyword:
      return ModifierFlagsReadonly;
    case KindOverrideKeyword:
      return ModifierFlagsOverride;
    case KindInKeyword:
      return ModifierFlagsIn;
    case KindOutKeyword:
      return ModifierFlagsOut;
    case KindDecorator:
      return ModifierFlagsDecorator;
  }
  return ModifierFlagsNone;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/utilities.go::func::ModifiersToFlags","kind":"func","status":"implemented","sigHash":"bf456fe687f51bf75e93125c2f9626af2ded45dabe6e445d7531c56399c38a76"}
 *
 * Go source:
 * func ModifiersToFlags(modifiers []*Node) ModifierFlags {
 * 	var flags ModifierFlags
 * 	for _, modifier := range modifiers {
 * 		flags |= ModifierToFlag(modifier.Kind)
 * 	}
 * 	return flags
 * }
 */
export function ModifiersToFlags(modifiers: GoSlice<GoPtr<Node>>): ModifierFlags {
  let flags: ModifierFlags = 0;
  for (const modifier of modifiers) {
    flags = (flags | ModifierToFlag(modifier!.Kind)) >>> 0;
  }
  return flags;
}
