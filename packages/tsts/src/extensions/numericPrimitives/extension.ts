/**
 * numeric-primitives — the reference compiler extension.
 *
 * Recognizes type references that resolve to a numeric primitive imported from
 * "@tsonic/core/types.js" and attaches a `NumericTypeFact` (source-language
 * intent) to the `TypeReferenceNode`. It runs at `afterCheckSourceFile` because
 * the reference→primitive decision needs symbol identity (binder + checker
 * scoping) so that shadowing by a local declaration correctly suppresses the
 * fact (spec "Checker Integration").
 *
 * Recognition rules (CONTEXT):
 *   - Named import:          import type { int } from "@tsonic/core/types.js"
 *   - Alias import:          import type { int as int32 } ...   (identity = int)
 *   - Namespace import:      import type * as T ...  →  T.int    (member = int)
 *   - Default import:        invalid — primitives are named exports; no fact.
 *   - Type-only allowed; a VALUE/runtime import of a type primitive used as a
 *     numeric type emits diagnostic 9100001.
 *   - Shadowing: a reference that resolves to a local declaration (not the
 *     imported primitive symbol) gets NO fact — normal TS scoping, no special
 *     shadowing diagnostic.
 *
 * The fact carries only source semantics; backend mapping is the consumer's job.
 *
 * Functional style: no mutable locals, no classes-for-logic; the only effects
 * are fact writes / diagnostic appends through the supplied context, which is
 * the extension contract.
 */

import {
  SymbolFlags,
  forEachChild,
  isIdentifier,
  isImportSpecifier,
  isNamespaceImport,
  isQualifiedName,
  isTypeReferenceNode,
  nodeLocals,
  nodeParent,
  type Identifier,
  type Node,
  type SourceFile,
  type Symbol as AstSymbol,
  type TypeReferenceNode,
} from "../../ast/index.js";
import type { Diagnostic, DiagnosticMessage } from "../../diagnostics/types.js";
import { DiagnosticCategory } from "../../enums/diagnosticCategory.enum.js";
import type { CompilerExtension } from "../host.js";
import type { ExtensionCheckContext } from "../contexts.js";
import {
  createExtensionImportIndex,
  type ImportBinding,
} from "../imports.js";
import { lookupPrimitive, type PrimitiveTableEntry } from "./primitiveTable.js";
import { NumericTypeFactKey, type NumericTypeFact } from "./facts.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** The module that exports the recognized numeric primitives. */
const PRIMITIVE_MODULE = "@tsonic/core/types.js";

const EXTENSION_ID = "numeric-primitives";

// Diagnostics owned by this extension (reserved range 9100000-9199999).
const NumericPrimitiveValueImport: DiagnosticMessage = {
  key: "Numeric_primitive_0_must_be_imported_with_import_type",
  code: 9100001,
  category: DiagnosticCategory.Error,
  message: "Numeric primitive '{0}' must be imported with 'import type'.",
};

// ---------------------------------------------------------------------------
// Source-file traversal
// ---------------------------------------------------------------------------

/**
 * Collect every `TypeReferenceNode` reachable from `root` (depth-first). Pure:
 * builds the list via reduction over children rather than mutating a closure.
 */
function collectTypeReferences(root: Node): readonly TypeReferenceNode[] {
  const here: readonly TypeReferenceNode[] = isTypeReferenceNode(root) ? [root] : [];
  const fromChildren: TypeReferenceNode[] = [];
  forEachChild(root, (child) => {
    for (const reference of collectTypeReferences(child)) {
      fromChildren.push(reference);
    }
    return undefined;
  });
  return [...here, ...fromChildren];
}

// ---------------------------------------------------------------------------
// Import-binding lookup helpers
// ---------------------------------------------------------------------------

/**
 * The entity-name identifier that names the referenced type:
 *   - plain `int`          → that Identifier
 *   - qualified `T.int`    → the right-hand Identifier (`int`)
 * Returns undefined for shapes we do not recognize.
 */
function typeNameIdentifier(reference: TypeReferenceNode): Identifier | undefined {
  const typeName = reference.typeName;
  if (isIdentifier(typeName)) return typeName;
  if (isQualifiedName(typeName)) return typeName.right;
  return undefined;
}

/** The qualifier identifier of a `T.int` reference (here `T`), else undefined. */
function namespaceQualifier(reference: TypeReferenceNode): Identifier | undefined {
  const typeName = reference.typeName;
  if (isQualifiedName(typeName) && isIdentifier(typeName.left)) return typeName.left;
  return undefined;
}

/**
 * The set of symbol meanings a TYPE-position name may denote: any type-space
 * symbol (class / interface / enum / type alias / type parameter) plus an
 * `Alias` (an import may stand in for a type). A value-only symbol (variable /
 * function) cannot satisfy a type reference and therefore never shadows one.
 */
const TYPE_MEANING = SymbolFlags.Type | SymbolFlags.Alias;

/**
 * Resolve a TYPE-position name to its symbol using the binder's authoritative
 * scope (`locals`) tables, honoring normal TypeScript scoping.
 *
 * The checker facade's `getSymbolAtLocation` resolves an identifier with VALUE
 * meaning, so for a type reference it cannot see a closer type-only declaration
 * (e.g. a local `type int = string`) shadowing an imported `int`. We instead
 * walk the parent chain from the reference outward and return the FIRST scope
 * binding of `name` that can denote a type. The closest such binding wins,
 * which is exactly how a local type alias shadows an imported primitive.
 */
function resolveTypeMeaningSymbol(name: string, location: Node): AstSymbol | undefined {
  for (let scope: Node | undefined = location; scope !== undefined; scope = nodeParent(scope)) {
    const locals = nodeLocals(scope);
    const candidate = locals?.get(name);
    if (candidate !== undefined && ((candidate.flags ?? 0) & TYPE_MEANING) !== 0) {
      return candidate;
    }
  }
  return undefined;
}

/**
 * Does this resolved symbol have a declaration that is an `ImportSpecifier`
 * bound under `localName` (the named/alias-import case)? When so, the imported
 * identity is the binding's `importedName`.
 */
function symbolIsNamedImport(symbol: AstSymbol, binding: ImportBinding): boolean {
  return symbol.declarations.some((declaration) =>
    isImportSpecifier(declaration) && declaration.name.text === binding.localName,
  );
}

/**
 * Does this resolved symbol have a declaration that is a `NamespaceImport`
 * bound under `localName` (the `import * as T` case)?
 */
function symbolIsNamespaceImport(symbol: AstSymbol, binding: ImportBinding): boolean {
  return symbol.declarations.some((declaration) =>
    isNamespaceImport(declaration) && declaration.name.text === binding.localName,
  );
}

// ---------------------------------------------------------------------------
// Fact + diagnostic construction
// ---------------------------------------------------------------------------

/** Build the per-node fact from a primitive table row + its source name. */
function factFor(sourceName: string, entry: PrimitiveTableEntry): NumericTypeFact {
  const base: NumericTypeFact = {
    sourceName,
    kind: entry.kind,
    runtimeBase: entry.runtimeBase,
    width: entry.width,
  };
  // exactOptionalPropertyTypes: only attach `signed` when the table defines it.
  return entry.signed === undefined ? base : { ...base, signed: entry.signed };
}

/** A diagnostic anchored to a node's source span, with the primitive name filled. */
function valueImportDiagnostic(
  sourceFile: SourceFile,
  reference: TypeReferenceNode,
  sourceName: string,
): Diagnostic {
  return {
    message: NumericPrimitiveValueImport,
    file: sourceFile,
    start: reference.pos,
    length: reference.end - reference.pos,
    category: NumericPrimitiveValueImport.category,
    code: NumericPrimitiveValueImport.code,
    text: `Numeric primitive '${sourceName}' must be imported with 'import type'.`,
  };
}

// ---------------------------------------------------------------------------
// Per-reference recognition
// ---------------------------------------------------------------------------

/**
 * For one type reference, decide whether it names an imported primitive and, if
 * so, attach the fact (and emit 9100001 for a value/runtime import). Identity is
 * resolved through the binder's scope tables with TYPE meaning, so normal
 * TypeScript scoping — including shadowing by a closer local type — decides it.
 */
function recognizeReference(
  context: ExtensionCheckContext,
  sourceFile: SourceFile,
  reference: TypeReferenceNode,
  primitiveBindings: readonly ImportBinding[],
): void {
  const identifier = typeNameIdentifier(reference);
  if (identifier === undefined) return;

  // Namespace member access `T.int`: match the qualifier to a namespace-import
  // binding and take the member name as the imported identity. The qualifier is
  // resolved with type meaning so a closer local `T` shadows the namespace.
  const qualifier = namespaceQualifier(reference);
  if (qualifier !== undefined) {
    const qualifierSymbol = resolveTypeMeaningSymbol(qualifier.text, qualifier);
    if (qualifierSymbol === undefined) return;
    const namespaceBinding = primitiveBindings.find(
      (binding) =>
        binding.importedName === "*" && symbolIsNamespaceImport(qualifierSymbol, binding),
    );
    if (namespaceBinding === undefined) return;
    attachIfPrimitive(context, sourceFile, reference, identifier.text, namespaceBinding);
    return;
  }

  // Plain reference `int`: resolve the type-meaning symbol and confirm it is the
  // named import. A local shadowing declaration (e.g. `type int = string`) binds
  // a closer scope, so its symbol — not an ImportSpecifier from the module — is
  // returned and the reference correctly yields no fact.
  const symbol = resolveTypeMeaningSymbol(identifier.text, identifier);
  if (symbol === undefined) return;
  const namedBinding = primitiveBindings.find(
    (binding) => binding.importedName !== "*" && symbolIsNamedImport(symbol, binding),
  );
  if (namedBinding === undefined) return;
  // The imported identity (not the local alias) is the source name.
  attachIfPrimitive(context, sourceFile, reference, namedBinding.importedName, namedBinding);
}

/**
 * Given a resolved source name and its binding, attach the numeric fact when
 * the name is a known primitive; if the binding is a value/runtime import,
 * emit the 9100001 diagnostic instead of silently accepting it.
 */
function attachIfPrimitive(
  context: ExtensionCheckContext,
  sourceFile: SourceFile,
  reference: TypeReferenceNode,
  sourceName: string,
  binding: ImportBinding,
): void {
  const entry = lookupPrimitive(sourceName);
  if (entry === undefined) return;

  if (!binding.isTypeOnly) {
    context.diagnostics.append(valueImportDiagnostic(sourceFile, reference, sourceName));
    return;
  }

  context.facts.setNodeFact(reference, NumericTypeFactKey, factFor(sourceName, entry));
}

// ---------------------------------------------------------------------------
// Extension definition
// ---------------------------------------------------------------------------

/**
 * The reference numeric-primitives extension. Stateless: all per-run state is
 * the program's fact store, reached through the context.
 */
export const numericPrimitivesExtension: CompilerExtension = {
  id: EXTENSION_ID,
  displayName: "Numeric Primitives",
  version: "1.0.0",

  afterCheckSourceFile(context: ExtensionCheckContext, sourceFile: SourceFile): void {
    const importIndex = createExtensionImportIndex();
    const primitiveBindings = importIndex.importsFrom(sourceFile, PRIMITIVE_MODULE);
    // No import from the primitive module → nothing to recognize (and no facts,
    // preserving the zero-cost path when the module is absent).
    if (primitiveBindings.length === 0) return;

    // Default imports of primitives are invalid (primitives are named exports);
    // they never match a named/namespace binding below, so they yield no fact.
    for (const reference of collectTypeReferences(sourceFile)) {
      recognizeReference(context, sourceFile, reference, primitiveBindings);
    }
  },
};
