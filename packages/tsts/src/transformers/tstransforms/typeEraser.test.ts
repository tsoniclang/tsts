// typeeraser.test.ts — Parity probe for the type-eraser's parameter-property
// modifier-erasure path (M2 Fork B migration).
//
// Background: typeeraser.ts (Kind.Parameter case) selects between preserving a
// constructor parameter-property's accessibility/readonly modifiers and erasing
// them:
//
//     let modifiers = isParameterPropertyDeclaration(node, this.parentNode!)
//       ? extractModifiers(this.emitContext(), getModifiers(n), ModifierFlags.ParameterPropertyModifier)
//       : undefined;
//
// Before the migration, the accessors.ts stub of isParameterPropertyDeclaration
// returned `false` UNCONDITIONALLY, so the ternary always took the `undefined`
// branch — parameter-property modifiers were never preserved (a dead path).
// The faithful ast/utilities.ts version (imported here through the same ast
// barrel the type-eraser uses) honours the real TS-Go rule: parameter +
// ParameterPropertyModifier + Constructor parent.
//
// This probe pins that gating decision at the exact predicate boundary the
// type-eraser branches on. The full transform + print round-trip is not
// asserted here because the runnable harness has no real printer EmitContext:
// the emit-js printer (emit-js/printer.ts) performs its own inline erasure and
// never runs this transformer, and Transformer's fallback EmitContext uses a
// stub factory/visitor that cannot reproduce faithful emitted output. So the
// preserve-vs-erase decision is pinned at the predicate that selects the
// branch (see ast/utilities.test.ts for the full predicate matrix). When a real
// printer EmitContext lands, this is the seam to grow into a transform+emit
// golden.
//
// Nodes are built via NodeObject (which `implements Node`) so we control the
// binder-computed `modifierFlags` the faithful predicates read — no
// escape-hatch cast.

import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  NodeObject,
  createIdentifier,
  createToken,
  createNodeArray,
  isParameterPropertyDeclaration,
  hasSyntacticModifier,
  modifiersToFlags,
  type ModifierSyntaxKind,
  type Node,
} from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";

// Mirror the binder-computed modifierFlags the faithful predicates read; the
// create* factory path does not derive them, so seed via NodeObject data.
function parameterProperty(modifierKinds: readonly ModifierSyntaxKind[], name: string): Node {
  const modifiers = createNodeArray(modifierKinds.map(kind => createToken(kind)));
  return new NodeObject(Kind.Parameter, {
    modifiers,
    name: createIdentifier(name),
    modifierFlags: modifiersToFlags(modifiers),
  });
}

export class TypeEraserParameterPropertyParityTests {
  // `class C { constructor(public x: number) {} }` — the public modifier on a
  // constructor parameter now drives the type-eraser's preserve branch (was
  // dead/always-erased before the migration).
  constructor_public_parameter_is_a_parameter_property(): void {
    const param = parameterProperty([Kind.PublicKeyword], "x");
    const ctor = new NodeObject(Kind.Constructor, { parameters: createNodeArray([param]) });

    // LIVE: the gating predicate selects extractModifiers(...) rather than undefined.
    Assert.True(isParameterPropertyDeclaration(param, ctor));
    // The ParameterPropertyModifier set the type-eraser extracts includes Public.
    Assert.True(hasSyntacticModifier(param, ModifierFlags.ParameterPropertyModifier));
  }

  // `public readonly` — both bits live in ParameterPropertyModifier.
  constructor_public_readonly_parameter_is_a_parameter_property(): void {
    const param = parameterProperty([Kind.PublicKeyword, Kind.ReadonlyKeyword], "x");
    const ctor = new NodeObject(Kind.Constructor, { parameters: createNodeArray([param]) });
    Assert.True(isParameterPropertyDeclaration(param, ctor));
  }

  // A plain `constructor(x: number)` parameter has no parameter-property
  // modifiers, so the type-eraser keeps taking the erase (`undefined`) branch.
  constructor_plain_parameter_is_not_a_parameter_property(): void {
    const plainParam = new NodeObject(Kind.Parameter, { name: createIdentifier("x") });
    const ctor = new NodeObject(Kind.Constructor, { parameters: createNodeArray([plainParam]) });
    Assert.False(isParameterPropertyDeclaration(plainParam, ctor));
  }

  // Same modifiers, but the parent is a method, not a Constructor: not a
  // parameter property (proves the stub's always-false regression is gone in
  // both directions — true under Constructor, false otherwise).
  public_parameter_under_non_constructor_parent_is_not_a_parameter_property(): void {
    const param = parameterProperty([Kind.PublicKeyword], "x");
    const method = new NodeObject(Kind.MethodDeclaration, { parameters: createNodeArray([param]) });
    Assert.False(isParameterPropertyDeclaration(param, method));
  }
}

A<TypeEraserParameterPropertyParityTests>().method((t) => t.constructor_public_parameter_is_a_parameter_property).add(FactAttribute);
A<TypeEraserParameterPropertyParityTests>().method((t) => t.constructor_public_readonly_parameter_is_a_parameter_property).add(FactAttribute);
A<TypeEraserParameterPropertyParityTests>().method((t) => t.constructor_plain_parameter_is_not_a_parameter_property).add(FactAttribute);
A<TypeEraserParameterPropertyParityTests>().method((t) => t.public_parameter_under_non_constructor_parent_is_not_a_parameter_property).add(FactAttribute);
