/**
 * Binder — M4b (codex-024359): the REAL recursive bind dispatch + container
 * stack + GetContainerFlags + declareSymbolEx merge engine + the
 * module/source-file/class member router.
 *
 * Faithful 1:1 re-port of microsoft/typescript-go `internal/binder/binder.go`.
 * The binder writes symbols, locals tables and parent pointers IN PLACE onto the
 * parsed AST, exactly as tsgo does — there is no side-table.
 *
 * STRUCTURE (mirrors binder.go):
 *   - bind(node)                  binder.go:579-752   single recursive dispatch
 *   - bindContainer(node, flags)  binder.go:1487-1635 the container stack
 *   - bindChildren(node)          binder.go:1655-1752 (flow branches → M4d)
 *   - bindEachChild(node)         binder.go:1754      child traversal + parents
 *   - GetContainerFlags(node)     binder.go:2568      single boundary source
 *   - declareSymbolEx(...)        binder.go:152-304   generic merge engine
 *   - declareModuleMember         binder.go:380       \
 *   - declareClassMember          binder.go:421        | the routers
 *   - declareSourceFileMember     binder.go:428        |
 *   - declareSymbolAndAddToSymbolTable binder.go:435  /  (dispatch by container)
 *
 * The control-flow GRAPH (FlowNode antecedents, bindCondition, loop labels) is
 * M4d: bindChildren collapses the flow-specific statement handlers to the plain
 * child traversal. External-module detection + import/export ALIAS binding + the
 * full multiple-default/enum-merge diagnostics are M4c: M4b binds a
 * non-external-module source file.
 *
 * Controlled-mutable `Binder` class: one instance per bind run, the same
 * sanctioned exception as the parser/scanner run-state.
 *
 * tsgo refs:
 *   - newSymbol                binder.go:136
 *   - addDeclarationToSymbol   binder.go:2530-2546
 *   - SetValueDeclaration      binder.go:2548-2557
 */

import {
  Kind,
  NodeFlags,
  SymbolFlags,
  forEachChild,
  exportAssignmentExpression,
  exportAssignmentIsExportEquals,
  exportDeclarationExportClause,
  getCombinedModifierFlags,
  getNodeLocals,
  getSymbolExports,
  getSymbolMembers,
  getSymbolParent,
  hasSyntacticModifier,
  isBigIntLiteral,
  isBindingPattern,
  isBlockOrCatchScoped,
  isClassExpression,
  isEntityNameExpression,
  isExportAssignment,
  isExportSpecifier,
  isExportDeclaration,
  isExternalModule,
  isExternalOrCommonJSModule,
  isFunctionLike,
  isIdentifier,
  isModuleBlock,
  isNamespaceExport,
  isNoSubstitutionTemplateLiteral,
  isNumericLiteral,
  isObjectLiteralOrClassExpressionMethodOrAccessor,
  isParameterDeclaration,
  isPartOfParameterDeclaration,
  isPrivateIdentifier,
  isSourceFile,
  isStatic,
  isStringLiteral,
  blockStatements,
  moduleExportNameIsDefault,
  nodeBody,
  nodeInitializer,
  nodeName,
  nodeParameters,
  nodeQuestionToken,
  nodeSymbol,
  setNodeFlags,
  setNodeLocals,
  setNodeLocalSymbol,
  setNodeNextContainer,
  setNodeParent,
  setNodeSymbol,
  setSymbolExportSymbol,
  setSymbolParent,
  sourceFileEndOfFileToken,
  sourceFileFileName,
  sourceFileStatementsRO,
  type Declaration,
  type Node,
  type ParameterDeclaration,
  type SourceFile,
  type Symbol,
  type SymbolTable,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { removeFileExtension } from "../tspath/index.js";
import { Diagnostics } from "../diagnostics/diagnostics_generated.js";
import { format } from "../diagnostics/index.js";

export interface BindDiagnostic {
  readonly message: string;
  readonly node: Node;
}

const allMeanings: SymbolFlags =
  SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias;

// tsgo InternalSymbolName values relevant to M4b/M4c (ast/symbol.go:49-67).
const InternalSymbolNameMissing = "__missing";
// M4c: the default-export / export-assignment / export-star reserved names.
const InternalSymbolNameDefault = "default";
const InternalSymbolNameExportEquals = "export=";
const InternalSymbolNameExportStar = "__export";

// Container-flag bitset (binder.go:17-43). The single source of truth for which
// nodes establish a container / block-scope / control-flow / locals boundary.
const enum ContainerFlags {
  None = 0,
  IsContainer = 1 << 0,
  IsBlockScopedContainer = 1 << 1,
  IsControlFlowContainer = 1 << 2,
  IsFunctionLike = 1 << 3,
  IsFunctionExpression = 1 << 4,
  HasLocals = 1 << 5,
  IsInterface = 1 << 6,
  IsObjectLiteralOrClassExpressionMethodOrAccessor = 1 << 7,
  IsThisContainer = 1 << 8,
  PropagatesThisKeyword = 1 << 9,
}

/**
 * Binds `sourceFile` in place (writing `node.symbol`, `node.locals`,
 * `node.parent`, and the real `Symbol` tables) and returns the binder
 * diagnostics. Mirrors tsgo's binder accumulating `bindDiagnostics` on the
 * source file (SourceFile.BindDiagnostics()); the substrate surfaces them as
 * the function result rather than as a side-table `BindResult`.
 */
export function bindSourceFile(sourceFile: SourceFile): readonly BindDiagnostic[] {
  return new Binder().bind(sourceFile);
}

/**
 * Reads the in-place symbol slot a declaration was bound to (tsgo
 * node.DeclarationData().Symbol).
 */
export function getSymbol(node: Declaration): Symbol | undefined {
  return node.symbol;
}

/**
 * Looks up `name` in `symbols`, filtered by `meaning`. Mirrors the meaning
 * refinement the name resolver applies when walking in-place `locals` /
 * `symbol.exports` / `symbol.members` tables.
 */
export function lookupSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags = allMeanings): Symbol | undefined {
  const symbol = symbols.get(name);
  if (symbol === undefined) {
    return undefined;
  }
  return ((symbol.flags ?? SymbolFlags.None) & meaning) === 0 ? undefined : symbol;
}

// GetContainerFlags (binder.go:2568) — the SINGLE boundary source. Verified
// per-kind against tsgo. Exported so the committed gate can assert flag sets.
export function getContainerFlags(node: Node): ContainerFlags {
  switch (node.kind) {
    case Kind.ClassExpression:
    case Kind.ClassDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ObjectLiteralExpression:
    case Kind.TypeLiteral:
    case Kind.JsxAttributes:
      return ContainerFlags.IsContainer;
    case Kind.InterfaceDeclaration:
      return ContainerFlags.IsContainer | ContainerFlags.IsInterface;
    case Kind.ModuleDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.MappedType:
    case Kind.IndexSignature:
      return ContainerFlags.IsContainer | ContainerFlags.HasLocals;
    case Kind.SourceFile:
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.MethodDeclaration:
      if (isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
        return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
          | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor
          | ContainerFlags.IsThisContainer;
      }
      // fallthrough to the function-like default.
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
        | ContainerFlags.IsFunctionLike | ContainerFlags.IsThisContainer;
    case Kind.Constructor:
    case Kind.FunctionDeclaration:
    case Kind.ClassStaticBlockDeclaration:
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
        | ContainerFlags.IsFunctionLike | ContainerFlags.IsThisContainer;
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.FunctionType:
    case Kind.ConstructSignature:
    case Kind.ConstructorType:
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
        | ContainerFlags.IsFunctionLike | ContainerFlags.PropagatesThisKeyword;
    case Kind.FunctionExpression:
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
        | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression | ContainerFlags.IsThisContainer;
    case Kind.ArrowFunction:
      return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals
        | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression | ContainerFlags.PropagatesThisKeyword;
    case Kind.ModuleBlock:
      return ContainerFlags.IsControlFlowContainer;
    case Kind.PropertyDeclaration:
      return propertyDeclarationHasInitializer(node)
        ? ContainerFlags.IsControlFlowContainer | ContainerFlags.IsThisContainer
        : ContainerFlags.None;
    case Kind.CatchClause:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.CaseBlock:
      return ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;
    case Kind.Block:
      // Blocks that are the body of a function or class-static-block are NOT a
      // block-scoped container of their own — the function-like is the locals
      // boundary, so the body block shares it.
      if (isFunctionLike(node.parent) || node.parent.kind === Kind.ClassStaticBlockDeclaration) {
        return ContainerFlags.None;
      }
      return ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;
  }
  return ContainerFlags.None;
}

class Binder {
  // Controlled-mutable run-state (the sanctioned exception — one instance per
  // bind run, same category as the parser/scanner state).
  #file: SourceFile | undefined = undefined;
  #container: Node | undefined = undefined;
  #blockScopeContainer: Node | undefined = undefined;
  #thisContainer: Node | undefined = undefined;
  #lastContainer: Node | undefined = undefined;
  #symbolCount = 0;
  readonly #classifiableNames: Set<string> = new Set<string>();
  readonly #diagnostics: BindDiagnostic[] = [];
  // Flow run-state — declared now (used by M4d, not M4b).
  #currentFlow: Node | undefined = undefined;

  bind(sourceFile: SourceFile): readonly BindDiagnostic[] {
    this.#file = sourceFile;
    this.#container = sourceFile;
    this.#thisContainer = sourceFile;
    this.#blockScopeContainer = sourceFile;
    this.#bind(sourceFile);
    return this.#diagnostics;
  }

  // tsgo binder.go:136 — newSymbol(flags, name).
  #newSymbol(flags: SymbolFlags, name: string): Symbol {
    this.#symbolCount += 1;
    return { name, flags, declarations: [] };
  }

  // tsgo binder.go:2530-2546 — addDeclarationToSymbol(symbol, node, symbolFlags).
  #addDeclarationToSymbol(symbol: Symbol, node: Node, symbolFlags: SymbolFlags): void {
    symbol.flags = (symbol.flags ?? SymbolFlags.None) | symbolFlags;
    setNodeSymbol(node, symbol);
    if (!symbol.declarations.includes(node)) {
      symbol.declarations.push(node);
    }
    if ((symbolFlags & SymbolFlags.Value) !== 0) {
      setValueDeclaration(symbol, node);
    }
  }

  // ───────────────────────────────────────────────────────────────────────
  // declareSymbol / declareSymbolEx (binder.go:152-304) — the GENERIC merge
  // engine. Looks up an existing symbol by name+table, merges (combine flags +
  // append declaration) when compatible, otherwise reports the faithful
  // duplicate/redeclaration diagnostic and creates a fresh symbol. No name- or
  // kind-specific hacks: every declaration routes through here.
  // ───────────────────────────────────────────────────────────────────────
  #declareSymbol(
    symbolTable: SymbolTable,
    parent: Symbol | undefined,
    node: Node,
    includes: SymbolFlags,
    excludes: SymbolFlags,
  ): Symbol {
    // isComputedName / isReplaceableByMethod are the JS-only declareSymbolEx
    // parameters (binder.go:156); they are never set on this port's reachable
    // paths, so both are false here. The default-export determination
    // (binder.go:158) decides whether this declaration is named "default" in the
    // export table.
    const isDefaultExport = hasSyntacticModifier(node, ModifierFlags.Default)
      || (isExportSpecifier(node) && moduleExportNameIsDefault(nodeName(node)));
    // The exported symbol for an `export default` function/class node is always
    // named "default" (binder.go:159-168).
    const name = (isDefaultExport && parent !== undefined)
      ? InternalSymbolNameDefault
      : getDeclarationName(node);
    let symbol: Symbol;
    if (name === InternalSymbolNameMissing) {
      symbol = this.#newSymbol(SymbolFlags.None, InternalSymbolNameMissing);
    } else {
      // Don't give the new symbol any flags yet — so it won't conflict with the
      // `excludes` flags we pass in.
      const existing = symbolTable.get(name);
      if ((includes & SymbolFlags.Classifiable) !== 0) {
        this.#classifiableNames.add(name);
      }
      if (existing === undefined) {
        symbol = this.#newSymbol(SymbolFlags.None, name);
        symbolTable.set(name, symbol);
      } else if (((existing.flags ?? SymbolFlags.None) & excludes) !== 0) {
        // Conflict (binder.go:209-294). The isReplaceableByMethod and
        // assignment-vs-variable merge exceptions (binder.go:210-217) are JS-only
        // and not reachable here, so we go straight to the diagnostic.
        const existingFlags = existing.flags ?? SymbolFlags.None;
        let message = (existingFlags & SymbolFlags.BlockScopedVariable) !== 0
          ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
          : Diagnostics.Duplicate_identifier_0;
        let messageNeedsName = true;
        // Enum declarations can only merge with namespace or other enum
        // declarations (binder.go:227-230) — a conflicting enum/non-enum pair.
        if ((existingFlags & SymbolFlags.Enum) !== 0 || (includes & SymbolFlags.Enum) !== 0) {
          message = Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
          messageNeedsName = false;
        }
        // A module cannot have multiple default exports (binder.go:231-251). The
        // symbol already has a declaration list, so a second default export (or a
        // second `export default <expr>`) conflicts.
        if (existing.declarations.length !== 0) {
          if (isDefaultExport) {
            message = Diagnostics.A_module_cannot_have_multiple_default_exports;
            messageNeedsName = false;
          } else if (isExportAssignment(node) && !exportAssignmentIsExportEquals(node)) {
            message = Diagnostics.A_module_cannot_have_multiple_default_exports;
            messageNeedsName = false;
          }
        }
        // Report on each prior declaration of the existing symbol AND on the
        // conflicting declaration (binder.go:266-285). Related-info attachment
        // (multipleDefaultExports / the Did_you_mean type-alias hint) is folded
        // into the flat BindDiagnostic message model, consistent with M4b.
        for (const declaration of existing.declarations) {
          const args = messageNeedsName ? [getDisplayName(declaration)] : [];
          this.#diagnostics.push({ message: format(message.message, args), node: declaration });
        }
        const args = messageNeedsName ? [getDisplayName(node)] : [];
        this.#diagnostics.push({ message: format(message.message, args), node });
        symbol = this.#newSymbol(SymbolFlags.None, name);
      } else {
        // Compatible: merge into the existing symbol.
        symbol = existing;
      }
    }
    this.#addDeclarationToSymbol(symbol, node, includes);
    const existingParent = getSymbolParent(symbol);
    if (existingParent === undefined) {
      if (parent !== undefined) {
        setSymbolParent(symbol, parent);
      }
    } else if (existingParent !== parent) {
      throw new Error("Existing symbol parent should match new one");
    }
    return symbol;
  }

  // ───────────────────────────────────────────────────────────────────────
  // The routers (binder.go:380-454). declareSymbolAndAddToSymbolTable
  // dispatches by the CONTAINER kind to the right declaration sink.
  // ───────────────────────────────────────────────────────────────────────

  // declareModuleMember (binder.go:380) — the full M4c form. Routes aliases and
  // exported members between the container's locals and its symbol's export table,
  // creating the local↔export DUAL symbol for an exported value/type member.
  #declareModuleMember(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
    const container = this.#container!;
    const hasExportModifier = (getCombinedModifierFlags(node) & ModifierFlags.Export) !== 0;
    if ((symbolFlags & SymbolFlags.Alias) !== 0) {
      // An export-specifier (or an exported `import =`) is an export; a plain
      // import-side alias is a local (binder.go:383-388).
      if (node.kind === Kind.ExportSpecifier || (node.kind === Kind.ImportEqualsDeclaration && hasExportModifier)) {
        return this.#declareSymbol(getSymbolExports(nodeSymbol(container)!), nodeSymbol(container), node, symbolFlags, symbolExcludes);
      }
      return this.#declareSymbol(getOrCreateLocals(container), undefined, node, symbolFlags, symbolExcludes);
    }
    // Exported module members get TWO symbols: a local symbol flagged ExportValue
    // and an associated export symbol with the real flags (binder.go:389-417).
    // (Ambient-module nesting is not in the M4c surface.)
    if (hasExportModifier || (container.flags & NodeFlags.ExportContext) !== 0) {
      if (!isLocalsContainer(container)
        || (hasSyntacticModifier(node, ModifierFlags.Default) && getDeclarationName(node) === InternalSymbolNameMissing)) {
        // No local symbol for an unnamed default (binder.go:405-408).
        return this.#declareSymbol(getSymbolExports(nodeSymbol(container)!), nodeSymbol(container), node, symbolFlags, symbolExcludes);
      }
      const exportKind = (symbolFlags & SymbolFlags.Value) !== 0 ? SymbolFlags.ExportValue : SymbolFlags.None;
      const local = this.#declareSymbol(getOrCreateLocals(container), undefined, node, exportKind, symbolExcludes);
      const exportSymbol = this.#declareSymbol(getSymbolExports(nodeSymbol(container)!), nodeSymbol(container), node, symbolFlags, symbolExcludes);
      setSymbolExportSymbol(local, exportSymbol);
      setNodeLocalSymbol(node, local);
      return local;
    }
    return this.#declareSymbol(getOrCreateLocals(container), undefined, node, symbolFlags, symbolExcludes);
  }

  // declareClassMember (binder.go:421) — static → the class symbol's exports,
  // instance → the class symbol's members.
  #declareClassMember(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
    const containerSymbol = nodeSymbol(this.#container)!;
    const table = isStatic(node) ? getSymbolExports(containerSymbol) : getSymbolMembers(containerSymbol);
    return this.#declareSymbol(table, containerSymbol, node, symbolFlags, symbolExcludes);
  }

  // declareSourceFileMember (binder.go:428) — an external (or CommonJS) module's
  // top-level members route through declareModuleMember so exports/locals split;
  // a script-mode file puts everything into the file's locals.
  #declareSourceFileMember(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
    if (isExternalOrCommonJSModule(this.#file!)) {
      return this.#declareModuleMember(node, symbolFlags, symbolExcludes);
    }
    return this.#declareSymbol(getOrCreateLocals(this.#file!), undefined, node, symbolFlags, symbolExcludes);
  }

  // declareSymbolAndAddToSymbolTable (binder.go:435) — the router.
  #declareSymbolAndAddToSymbolTable(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol | undefined {
    const container = this.#container!;
    switch (container.kind) {
      case Kind.ModuleDeclaration:
        return this.#declareModuleMember(node, symbolFlags, symbolExcludes);
      case Kind.SourceFile:
        return this.#declareSourceFileMember(node, symbolFlags, symbolExcludes);
      case Kind.ClassExpression:
      case Kind.ClassDeclaration:
        return this.#declareClassMember(node, symbolFlags, symbolExcludes);
      case Kind.EnumDeclaration:
        return this.#declareSymbol(getSymbolExports(nodeSymbol(container)!), nodeSymbol(container), node, symbolFlags, symbolExcludes);
      case Kind.TypeLiteral:
      case Kind.ObjectLiteralExpression:
      case Kind.InterfaceDeclaration:
      case Kind.JsxAttributes:
        return this.#declareSymbol(getSymbolMembers(nodeSymbol(container)!), nodeSymbol(container), node, symbolFlags, symbolExcludes);
      case Kind.FunctionType:
      case Kind.ConstructorType:
      case Kind.CallSignature:
      case Kind.ConstructSignature:
      case Kind.IndexSignature:
      case Kind.MethodDeclaration:
      case Kind.MethodSignature:
      case Kind.Constructor:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.ClassStaticBlockDeclaration:
      case Kind.TypeAliasDeclaration:
      case Kind.MappedType:
        return this.#declareSymbol(getOrCreateLocals(container), undefined, node, symbolFlags, symbolExcludes);
    }
    throw new Error("Unhandled case in declareSymbolAndAddToSymbolTable");
  }

  // bindBlockScopedDeclaration (binder.go:1254). A block-scoped declaration
  // (class/enum/let/const/interface/type alias) routes to its block-scope
  // container's locals — except a namespace member, or a top-level member of an
  // external module, which routes through declareModuleMember so exports split.
  #bindBlockScopedDeclaration(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): void {
    const blockScopeContainer = this.#blockScopeContainer!;
    switch (blockScopeContainer.kind) {
      case Kind.ModuleDeclaration:
        this.#declareModuleMember(node, symbolFlags, symbolExcludes);
        return;
      case Kind.SourceFile:
        if (isExternalOrCommonJSModule(this.#container!)) {
          this.#declareModuleMember(node, symbolFlags, symbolExcludes);
          return;
        }
        // fallthrough to locals.
        this.#declareSymbol(getOrCreateLocals(blockScopeContainer), undefined, node, symbolFlags, symbolExcludes);
        return;
      default:
        this.#declareSymbol(getOrCreateLocals(blockScopeContainer), undefined, node, symbolFlags, symbolExcludes);
    }
  }

  // bindAnonymousDeclaration (binder.go:1246) — a symbol that is NOT added to any
  // table (it lives only on the node + on a parent member/export table when the
  // flags say so). M4b uses it for class-expression/function-expression names.
  #bindAnonymousDeclaration(node: Node, symbolFlags: SymbolFlags, name: string): void {
    const symbol = this.#newSymbol(symbolFlags, name);
    if ((symbolFlags & (SymbolFlags.EnumMember | SymbolFlags.ClassMember)) !== 0) {
      const parentSymbol = nodeSymbol(this.#container);
      if (parentSymbol !== undefined) {
        setSymbolParent(symbol, parentSymbol);
      }
    }
    this.#addDeclarationToSymbol(symbol, node, symbolFlags);
  }

  // ───────────────────────────────────────────────────────────────────────
  // The recursive dispatch (binder.go:579-752). First bind the node to a symbol
  // (the declaration switch), then recurse into children (bindContainer when the
  // node opens a container, else bindChildren).
  // ───────────────────────────────────────────────────────────────────────
  #bind(node: Node | undefined): void {
    if (node === undefined) {
      return;
    }
    switch (node.kind) {
      case Kind.Parameter:
        this.#bindParameter(node);
        break;
      case Kind.VariableDeclaration:
      case Kind.BindingElement:
        this.#bindVariableDeclarationOrBindingElement(node);
        break;
      case Kind.PropertyDeclaration:
      case Kind.PropertySignature:
        this.#bindPropertyOrMethodOrAccessor(node, SymbolFlags.Property | optionalFlag(node), SymbolFlags.PropertyExcludes);
        break;
      case Kind.PropertyAssignment:
      case Kind.ShorthandPropertyAssignment:
        this.#bindPropertyOrMethodOrAccessor(node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
        break;
      case Kind.EnumMember:
        this.#bindPropertyOrMethodOrAccessor(node, SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes);
        break;
      case Kind.CallSignature:
      case Kind.ConstructSignature:
      case Kind.IndexSignature:
        this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.Signature, SymbolFlags.None);
        break;
      case Kind.MethodDeclaration:
      case Kind.MethodSignature:
        this.#bindPropertyOrMethodOrAccessor(
          node,
          SymbolFlags.Method | optionalFlag(node),
          isObjectLiteralMethod(node) ? SymbolFlags.PropertyExcludes : SymbolFlags.MethodExcludes,
        );
        break;
      case Kind.FunctionDeclaration:
        this.#bindBlockScopedDeclaration(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
        break;
      case Kind.Constructor:
        this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.Constructor, SymbolFlags.None);
        break;
      case Kind.GetAccessor:
        this.#bindPropertyOrMethodOrAccessor(node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes);
        break;
      case Kind.SetAccessor:
        this.#bindPropertyOrMethodOrAccessor(node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes);
        break;
      case Kind.TypeLiteral:
      case Kind.MappedType:
        this.#bindAnonymousDeclaration(node, SymbolFlags.TypeLiteral, "__type");
        break;
      case Kind.ObjectLiteralExpression:
        this.#bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, "__object");
        break;
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
        this.#bindFunctionExpression(node);
        break;
      case Kind.ClassExpression:
      case Kind.ClassDeclaration:
        this.#bindClassLikeDeclaration(node);
        break;
      case Kind.InterfaceDeclaration:
        this.#bindBlockScopedDeclaration(node, SymbolFlags.Interface, SymbolFlags.InterfaceExcludes);
        break;
      case Kind.TypeAliasDeclaration:
        this.#bindBlockScopedDeclaration(node, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
        break;
      case Kind.EnumDeclaration:
        this.#bindEnumDeclaration(node);
        break;
      case Kind.ModuleDeclaration:
        this.#bindModuleDeclaration(node);
        break;
      case Kind.ImportEqualsDeclaration:
      case Kind.NamespaceImport:
      case Kind.ImportSpecifier:
      case Kind.ExportSpecifier:
        this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
        break;
      case Kind.ImportClause:
        this.#bindImportClause(node);
        break;
      case Kind.ExportDeclaration:
        this.#bindExportDeclaration(node);
        break;
      case Kind.ExportAssignment:
        this.#bindExportAssignment(node);
        break;
      case Kind.SourceFile:
        this.#bindSourceFileIfExternalModule();
        break;
      case Kind.TypeParameter:
        this.#bindTypeParameter(node);
        break;
      default:
        break;
    }
    // Then recurse into the children. Terminal nodes (kind <= LastToken) have no
    // children, so as an optimization we don't process those.
    if (node.kind > Kind.LastToken) {
      const containerFlags = getContainerFlags(node);
      if (containerFlags === ContainerFlags.None) {
        this.#bindChildren(node);
      } else {
        this.#bindContainer(node, containerFlags);
      }
    }
  }

  // bindContainer (binder.go:1487) — the container stack. Saves/restores the
  // container / thisContainer / blockScopeContainer around the child recursion,
  // and eagerly creates locals for HasLocals containers.
  #bindContainer(node: Node, containerFlags: ContainerFlags): void {
    const saveContainer = this.#container;
    const saveThisContainer = this.#thisContainer;
    const savedBlockScopeContainer = this.#blockScopeContainer;

    if ((containerFlags & ContainerFlags.IsContainer) !== 0) {
      this.#container = node;
      this.#blockScopeContainer = node;
      if ((containerFlags & ContainerFlags.HasLocals) !== 0) {
        setNodeLocals(node, new Map<string, Symbol>());
        this.#addToContainerChain(node);
      }
    } else if ((containerFlags & ContainerFlags.IsBlockScopedContainer) !== 0) {
      this.#blockScopeContainer = node;
      // Block-scoped containers do NOT proactively create locals (binder.go:1519);
      // locals are created on demand by getOrCreateLocals when a child declares
      // a block-scoped name. addToContainerChain is still done.
      this.#addToContainerChain(node);
    }
    if ((containerFlags & ContainerFlags.IsThisContainer) !== 0) {
      this.#thisContainer = node;
    }

    // The control-flow GRAPH initialization (binder.go:1526-1601) is M4d. The
    // structural recursion is identical for control-flow / interface / default
    // arms: descend into children.
    this.#bindChildren(node);

    this.#container = saveContainer;
    this.#thisContainer = saveThisContainer;
    this.#blockScopeContainer = savedBlockScopeContainer;
  }

  // addToContainerChain (binder.go:2523) — keeps all locals-containers on a
  // declaration-order linked list (nextContainer).
  #addToContainerChain(next: Node): void {
    if (this.#lastContainer !== undefined) {
      setNodeNextContainer(this.#lastContainer, next);
    }
    this.#lastContainer = next;
  }

  // bindChildren (binder.go:1655) — M4b reduces the flow-specific statement
  // handlers (bindWhileStatement, bindIfStatement, …) to the structural child
  // traversal; only the functions-first hoisting order for statement containers
  // is structural and preserved (binder.go:1737/1740).
  #bindChildren(node: Node): void {
    switch (node.kind) {
      case Kind.SourceFile: {
        this.#bindEachStatementFunctionsFirst(node, sourceFileStatementsRO(node));
        const eof = sourceFileEndOfFileToken(node);
        if (eof !== undefined) {
          setNodeParent(eof, node);
          this.#bind(eof);
        }
        return;
      }
      case Kind.Block:
      case Kind.ModuleBlock:
        this.#bindEachStatementFunctionsFirst(node, statementList(node));
        return;
      default:
        this.#bindEachChild(node);
    }
  }

  // bindEachStatementFunctionsFirst (binder.go:1776) — bind function
  // declarations before other statements (hoisting order). Sets each statement's
  // parent to the container before binding (tsgo establishes parents in parse).
  #bindEachStatementFunctionsFirst(parent: Node, statements: readonly Node[]): void {
    for (const statement of statements) {
      if (statement.kind === Kind.FunctionDeclaration) {
        setNodeParent(statement, parent);
        this.#bind(statement);
      }
    }
    for (const statement of statements) {
      if (statement.kind !== Kind.FunctionDeclaration) {
        setNodeParent(statement, parent);
        this.#bind(statement);
      }
    }
  }

  // bindEachChild (binder.go:1754) — node.ForEachChild(b.bind). In tsgo parents
  // are established during parse; the tsts parser does not set them, so the
  // traversal sets each visited child's parent to the current node before
  // descending (the port-required language difference; faithful to tsgo where
  // every visited node has the parent chain the binder used for its decision).
  #bindEachChild(node: Node): void {
    forEachChild(node, (child) => {
      setNodeParent(child, node);
      this.#bind(child);
      return undefined;
    });
  }

  // ───────────────────────────────────────────────────────────────────────
  // Per-kind declaration binders (the bodies of the dispatch cases).
  // ───────────────────────────────────────────────────────────────────────

  // bindParameter (binder.go:1205).
  #bindParameter(node: Node): void {
    const name = nodeName(node);
    if (name !== undefined && isBindingPattern(name)) {
      const index = parameterIndex(node);
      this.#bindAnonymousDeclaration(node, SymbolFlags.FunctionScopedVariable, "__" + index.toString());
    } else {
      this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
    }
    // Parameter-property: also declare a property on the containing class.
    if (isParameterPropertyDeclaration(node)) {
      const classDeclaration = node.parent.parent;
      const classSymbol = nodeSymbol(classDeclaration);
      const flags = SymbolFlags.Property | (nodeQuestionToken(node) !== undefined ? SymbolFlags.Optional : SymbolFlags.None);
      this.#declareSymbol(getSymbolMembers(classSymbol!), classSymbol, node, flags, SymbolFlags.PropertyExcludes);
    }
  }

  // bindVariableDeclarationOrBindingElement (binder.go:1180).
  #bindVariableDeclarationOrBindingElement(node: Node): void {
    const name = nodeName(node);
    if (name !== undefined && !isBindingPattern(name)) {
      if (isBlockOrCatchScoped(node)) {
        this.#bindBlockScopedDeclaration(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
      } else if (isPartOfParameterDeclaration(node)) {
        this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
      } else {
        this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.FunctionScopedVariableExcludes);
      }
    }
  }

  // bindPropertyOrMethodOrAccessor (binder.go:985) — M4b form: route through the
  // table router (computed-name late binding is deferred).
  #bindPropertyOrMethodOrAccessor(node: Node, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): void {
    this.#declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
  }

  // bindFunctionExpression (binder.go:919).
  #bindFunctionExpression(node: Node): void {
    let bindingName = "__function";
    const name = nodeName(node);
    if (node.kind === Kind.FunctionExpression && name !== undefined && isIdentifier(name)) {
      bindingName = name.text;
    }
    this.#bindAnonymousDeclaration(node, SymbolFlags.Function, bindingName);
  }

  // bindClassLikeDeclaration (binder.go:953). Adds the implicit `prototype`
  // property to the class symbol's exports.
  #bindClassLikeDeclaration(node: Node): void {
    if (node.kind === Kind.ClassDeclaration) {
      this.#bindBlockScopedDeclaration(node, SymbolFlags.Class, SymbolFlags.ClassExcludes);
    } else {
      const name = nodeName(node);
      let nameText = "__class";
      if (name !== undefined && isIdentifier(name)) {
        nameText = name.text;
        this.#classifiableNames.add(nameText);
      }
      this.#bindAnonymousDeclaration(node, SymbolFlags.Class, nameText);
    }
    const symbol = nodeSymbol(node)!;
    const prototypeSymbol = this.#newSymbol(SymbolFlags.Property | SymbolFlags.Prototype, "prototype");
    const exports = getSymbolExports(symbol);
    const existingPrototype = exports.get("prototype");
    if (existingPrototype !== undefined) {
      this.#diagnostics.push({
        message: format(Diagnostics.Duplicate_identifier_0.message, ["prototype"]),
        node: existingPrototype.declarations[0]!,
      });
    }
    exports.set("prototype", prototypeSymbol);
    setSymbolParent(prototypeSymbol, symbol);
  }

  // bindEnumDeclaration (binder.go:1172) — M4b binds regular/const enums as
  // block-scoped declarations; members are bound in the EnumDeclaration
  // container via the router (KindEnumMember → exports).
  #bindEnumDeclaration(node: Node): void {
    if (isEnumConst(node)) {
      this.#bindBlockScopedDeclaration(node, SymbolFlags.ConstEnum, SymbolFlags.ConstEnumExcludes);
    } else {
      this.#bindBlockScopedDeclaration(node, SymbolFlags.RegularEnum, SymbolFlags.RegularEnumExcludes);
    }
  }

  // bindModuleDeclaration (binder.go:778) — non-ambient form: set the
  // export-context flag, then declare the module/namespace symbol. (Ambient
  // modules + module-instance-state/const-enum tracking are outside the M4c
  // surface.)
  #bindModuleDeclaration(node: Node): void {
    this.#setExportContextFlag(node);
    this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.ValueModule | SymbolFlags.NamespaceModule, SymbolFlags.None);
  }

  // bindSourceFileIfExternalModule (binder.go:761) — set the file's
  // export-context flag, then if the file is an external (or CommonJS) module give
  // it a SourceFile module symbol so top-level exported members route into
  // sourceFile.symbol.exports. (JSON-source-file handling is not in the surface.)
  #bindSourceFileIfExternalModule(): void {
    this.#setExportContextFlag(this.#file!);
    if (isExternalOrCommonJSModule(this.#file!)) {
      this.#bindSourceFileAsExternalModule();
    }
  }

  // bindSourceFileAsExternalModule (binder.go:774) — the module symbol is an
  // anonymous ValueModule named with the quoted, extension-stripped file name.
  #bindSourceFileAsExternalModule(): void {
    this.#bindAnonymousDeclaration(
      this.#file!,
      SymbolFlags.ValueModule,
      "\"" + removeFileExtension(sourceFileFileName(this.#file!)) + "\"",
    );
  }

  // setExportContextFlag (binder.go:893) — a declaration-file or ambient module
  // with no export declarations is an export context (implicit exports). The
  // M4c surface only handles non-ambient files/modules, so this consistently
  // CLEARS the flag, mirroring the else branch faithfully.
  #setExportContextFlag(node: Node): void {
    if ((node.flags & NodeFlags.Ambient) !== 0 && !hasExportDeclarations(node)) {
      setNodeFlags(node, node.flags | NodeFlags.ExportContext);
    } else {
      setNodeFlags(node, node.flags & ~NodeFlags.ExportContext);
    }
  }

  // bindImportClause (binder.go:843) — declare the default-import name; named
  // bindings are bound as their own (NamespaceImport / ImportSpecifier) nodes
  // during the child traversal.
  #bindImportClause(node: Node): void {
    if (nodeName(node) !== undefined) {
      this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
    }
  }

  // bindExportDeclaration (binder.go:849). `export *` and `export * as ns` land in
  // the container symbol's exports; a named `export { ... }` declaration is bound
  // through its ExportSpecifier children during the child traversal.
  #bindExportDeclaration(node: Node): void {
    const containerSymbol = nodeSymbol(this.#container);
    const exportClause = exportDeclarationExportClause(node);
    if (containerSymbol === undefined) {
      // `export *` in some block construct — no container symbol.
      this.#bindAnonymousDeclaration(node, SymbolFlags.ExportStar, getDeclarationName(node));
    } else if (exportClause === undefined) {
      // All `export *` declarations are collected in one __export symbol.
      this.#declareSymbol(getSymbolExports(containerSymbol), containerSymbol, node, SymbolFlags.ExportStar, SymbolFlags.None);
    } else if (isNamespaceExport(exportClause)) {
      this.#declareSymbol(getSymbolExports(containerSymbol), containerSymbol, exportClause, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
    }
  }

  // bindExportAssignment (binder.go:862). `export = x` / `export default <expr>`:
  // an alias when the expression is an entity-name/class expression, else a
  // value property. The symbol lands in the container symbol's exports.
  #bindExportAssignment(node: Node): void {
    const containerSymbol = nodeSymbol(this.#container);
    if (containerSymbol === undefined && isExportAssignment(node)) {
      // Incorrect export assignment in a block construct.
      this.#bindAnonymousDeclaration(node, SymbolFlags.Value, getDeclarationName(node));
    } else if (containerSymbol !== undefined) {
      const flags = expressionIsAlias(exportAssignmentExpression(node)) ? SymbolFlags.Alias : SymbolFlags.Property;
      const symbol = this.#declareSymbol(getSymbolExports(containerSymbol), containerSymbol, node, flags, SymbolFlags.All);
      if (exportAssignmentIsExportEquals(node)) {
        // Ensure export assignments have a ValueDeclaration set.
        setValueDeclaration(symbol, node);
      }
    }
  }

  // bindTypeParameter (binder.go:1269) — M4b non-infer form: route through the
  // table router (locals of the function/class container).
  #bindTypeParameter(node: Node): void {
    this.#declareSymbolAndAddToSymbolTable(node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
  }
}

// tsgo binder.go:2548-2557 — SetValueDeclaration (pure: writes the symbol's
// value declaration slot). Non-assignment declarations take precedence over
// assignment declarations; the M4b substrate only needs the first-writer rule.
function setValueDeclaration(symbol: Symbol, node: Node): void {
  if (symbol.valueDeclaration === undefined) {
    symbol.valueDeclaration = node;
  }
}

// ast.IsLocalsContainer (ast.go:1528) — a node that owns a locals table
// (LocalsContainerData != nil). In this port that is exactly the set of nodes
// GetContainerFlags marks HasLocals (SourceFile, ModuleDeclaration, function-/
// signature-likes, and the block-scoped loop/catch containers), so the boundary
// source is reused rather than re-enumerating the embedding set.
function isLocalsContainer(node: Node): boolean {
  return (getContainerFlags(node) & ContainerFlags.HasLocals) !== 0;
}

// ast.GetLocals(node) with eager creation for the block-scoped on-demand case.
// HasLocals containers already had locals created in bindContainer; block-scoped
// containers create them lazily here (binder.go declareSymbol(GetLocals(...))).
function getOrCreateLocals(node: Node): SymbolTable {
  const existing = getNodeLocals(node);
  if (existing !== undefined) {
    return existing;
  }
  const created: SymbolTable = new Map<string, Symbol>();
  setNodeLocals(node, created);
  return created;
}

// getDeclarationName (binder.go:308) — the declaration name is its `name` node's
// text (when a literal/identifier property name) else "__missing", with the
// reserved names for export-assignment / export-star / export-equals. The
// ambient-module / private-identifier / computed-name JS/declaration branches
// (binder.go:314-344) are not reachable in the M4c surface.
function getDeclarationName(node: Node): string {
  if (isExportAssignment(node)) {
    return exportAssignmentIsExportEquals(node) ? InternalSymbolNameExportEquals : InternalSymbolNameDefault;
  }
  const name = nodeName(node);
  if (name !== undefined) {
    if (isPropertyNameLiteralLike(name)) {
      return name.text;
    }
    return InternalSymbolNameMissing;
  }
  switch (node.kind) {
    case Kind.Constructor:
      return "__constructor";
    case Kind.CallSignature:
    case Kind.FunctionType:
      return "__call";
    case Kind.ConstructSignature:
    case Kind.ConstructorType:
      return "__new";
    case Kind.IndexSignature:
      return "__index";
    case Kind.ExportDeclaration:
      return InternalSymbolNameExportStar;
    case Kind.SourceFile:
      return InternalSymbolNameExportEquals;
  }
  return InternalSymbolNameMissing;
}

// getDisplayName (binder.go:364) — the name shown in diagnostics.
function getDisplayName(node: Node): string {
  const name = nodeName(node);
  if (name !== undefined && isPropertyNameLiteralLike(name)) {
    return name.text;
  }
  const declarationName = getDeclarationName(node);
  return declarationName === InternalSymbolNameMissing ? "(Missing)" : declarationName;
}

interface PropertyNameTextNode extends Node {
  readonly text: string;
}

// True when a property/declaration name is a literal whose `.text` is its name.
function isPropertyNameLiteralLike(name: Node): name is PropertyNameTextNode {
  return (
    isIdentifier(name)
    || isStringLiteral(name)
    || isNumericLiteral(name)
    || isPrivateIdentifier(name)
    || isNoSubstitutionTemplateLiteral(name)
    || isBigIntLiteral(name)
  );
}

// getOptionalSymbolFlagForNode (binder.go) — an optional `?` member contributes
// the Optional symbol flag.
function optionalFlag(node: Node): SymbolFlags {
  return nodeQuestionToken(node) !== undefined ? SymbolFlags.Optional : SymbolFlags.None;
}

// isObjectLiteralMethod (binder.go uses ast.IsObjectLiteralMethod) — a method
// declaration whose parent is an object literal.
function isObjectLiteralMethod(node: Node): boolean {
  return node.kind === Kind.MethodDeclaration && node.parent.kind === Kind.ObjectLiteralExpression;
}

// IsParameterPropertyDeclaration (utilities.go) — a parameter with an
// accessibility/readonly modifier inside a constructor.
function isParameterPropertyDeclaration(node: Node): boolean {
  return isParameterDeclaration(node)
    && hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier)
    && node.parent.kind === Kind.Constructor;
}

// The index of a parameter within its owning signature's parameter list
// (binder.go uses slices.Index(node.Parent.Parameters(), node)).
function parameterIndex(node: Node): number {
  return nodeParameters(node.parent).indexOf(node);
}

// const-enum detection (ast.IsEnumConst).
function isEnumConst(node: Node): boolean {
  return (node.flags & NodeFlags.Const) !== 0;
}

// ExpressionIsAlias (utilities.go:1834) — an export-assignment expression that
// aliases another declaration: an entity-name expression or a class expression.
function expressionIsAlias(node: Node): boolean {
  return isEntityNameExpression(node) || isClassExpression(node);
}

// hasExportDeclarations (binder.go:903) — whether a source file or module body
// contains a top-level `export …` / `export =` statement (drives the
// export-context flag for ambient declarations).
function hasExportDeclarations(node: Node): boolean {
  let statements: readonly Node[] = [];
  if (node.kind === Kind.SourceFile) {
    statements = sourceFileStatementsRO(node);
  } else if (node.kind === Kind.ModuleDeclaration) {
    const body = nodeBody(node);
    if (body !== undefined && isModuleBlock(body)) {
      statements = blockStatements(body);
    }
  }
  return statements.some((s) => isExportDeclaration(s) || isExportAssignment(s));
}

// The statement list of a Block / ModuleBlock.
function statementList(node: Node): readonly Node[] {
  return blockStatements(node);
}

// PropertyDeclaration initializer presence (GetContainerFlags KindPropertyDeclaration).
function propertyDeclarationHasInitializer(node: Node): boolean {
  return nodeInitializer(node) !== undefined;
}

export function assertBoundSourceFile(node: Node): asserts node is SourceFile {
  if (!isSourceFile(node)) {
    throw new Error("Expected SourceFile");
  }
}

export function assertBoundParameter(node: Node): asserts node is ParameterDeclaration {
  if (!isParameterDeclaration(node)) {
    throw new Error("Expected ParameterDeclaration");
  }
}
