// Source-level imports, declarations, and module identity for TS signatures.

// --- helpers ------------------------------------------------------------------

const sliceText = (api, text, node) => (node ? text.slice(api.Node_Pos(node), api.Node_End(node)).trim() : "");
const identText = (n) => (n ? n.Text : undefined);
const isExported = (api, node) =>
  (node.modifiers?.Nodes ?? node.modifiers ?? []).some?.((m) => m.Kind === api.Kinds.KindExportKeyword) ?? false;

// Derive a keyword type's TS spelling from its Kind name: KindStringKeyword -> "string".
function keywordOf(api, kind) {
  const name = api.kindName.get(kind);
  if (!name || !name.endsWith("Keyword")) return undefined;
  return name.slice("Kind".length, name.length - "Keyword".length).toLowerCase();
}

// --- import map ---------------------------------------------------------------

// Returns { named: Map<local,{module,imported}>, namespaces: Map<alias,{module}> }.
export function buildImportMap(api, sourceFile) {
  const named = new Map();
  const namespaces = new Map();
  for (const st of sourceFile.Statements?.Nodes ?? []) {
    if (st.Kind !== api.Kinds.KindImportDeclaration) continue;
    const imp = api.Casts.AsImportDeclaration(st);
    const module = imp.ModuleSpecifier?.Text;
    const clause = imp.ImportClause;
    if (!module || !clause) continue;
    if (clause.name) named.set(clause.name.Text, { module, imported: "default" });
    const nb = clause.NamedBindings;
    if (!nb) continue;
    if (nb.Kind === api.Kinds.KindNamespaceImport) {
      const alias = api.Casts.AsNamespaceImport(nb)?.name?.Text;
      if (alias) namespaces.set(alias, { module });
    } else if (nb.Kind === api.Kinds.KindNamedImports) {
      for (const el of nb.Elements?.Nodes ?? []) {
        const spec = api.Casts.AsImportSpecifier(el);
        const local = spec.name?.Text;
        const imported = spec.PropertyName?.Text ?? local;
        if (local) named.set(local, { module, imported });
      }
    }
  }
  return { named, namespaces };
}

// Type-producing declarations defined in this file (for local:: identity).
export function buildLocalTypeNames(api, sourceFile) {
  const names = new Set();
  for (const st of sourceFile.Statements?.Nodes ?? []) {
    const k = st.Kind;
    if (k === api.Kinds.KindInterfaceDeclaration || k === api.Kinds.KindTypeAliasDeclaration ||
        k === api.Kinds.KindClassDeclaration || k === api.Kinds.KindEnumDeclaration) {
      const decl = api.Casts.AsNode ? st : st;
      const nm = decl.name?.Text;
      if (nm) names.add(nm);
    }
  }
  return names;
}

// Resolve an import specifier to a canonical module id. Relative specifiers are
// resolved against the current module and normalized to a repo-relative .ts path,
// so a type's identity is its DEFINING module regardless of how it's referenced
// (a `local::` definition and an `import { X } from "./self.js"` collapse to the
// same id). Bare/package specifiers are kept verbatim.
function resolveModuleId(spec, fromModuleId) {
  if (!spec.startsWith(".")) return spec.replace(/\.js$/, ".ts");
  const fromDir = posixDirname(fromModuleId);
  const joined = posixNormalize(`${fromDir}/${spec}`);
  return joined.replace(/\.js$/, ".ts");
}

function posixDirname(p) {
  const i = p.lastIndexOf("/");
  return i < 0 ? "." : p.slice(0, i);
}

function posixNormalize(p) {
  const parts = [];
  for (const seg of p.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts.join("/");
}

// Extract re-export edges from a parsed file:
//   export { A, b as c } from "./mod.js"  -> named: localName -> "<mod>::<srcName>"
//   export * from "./mod.js"              -> star: ["<mod>"]
// Module specifiers are resolved to repo-relative .ts module ids.
export function extractReexports(api, sourceFile, moduleId) {
  const named = new Map();
  const star = [];
  for (const st of sourceFile.Statements?.Nodes ?? []) {
    if (st.Kind !== api.Kinds.KindExportDeclaration) continue;
    const ed = api.Casts.AsExportDeclaration(st);
    const spec = ed.ModuleSpecifier?.Text;
    if (!spec) continue; // local re-export (no module) — not a cross-module edge
    const srcModule = resolveModuleId(spec, moduleId);
    const clause = ed.ExportClause;
    if (!clause) {
      star.push(srcModule);
    } else if (clause.Kind === api.Kinds.KindNamedExports) {
      for (const el of clause.Elements?.Nodes ?? []) {
        const sp = api.Casts.AsExportSpecifier(el);
        const local = sp.name?.Text;
        const srcName = sp.PropertyName?.Text ?? local;
        if (local) named.set(local, `${srcModule}::${srcName}`);
      }
    }
  }
  return { named, star };
}

// Exported type-producing declaration names in a parsed file (interface / type
// alias / class / enum). Used to resolve types that exist in TS (e.g. generated
// AST types) but are not @tsgo-unit-tracked, to their real defining module.
export function extractTypeDecls(api, sourceFile) {
  const K = api.Kinds;
  const names = [];
  for (const st of sourceFile.Statements?.Nodes ?? []) {
    if (
      st.Kind === K.KindInterfaceDeclaration || st.Kind === K.KindTypeAliasDeclaration ||
      st.Kind === K.KindClassDeclaration || st.Kind === K.KindEnumDeclaration
    ) {
      if (st.name?.Text) names.push(st.name.Text);
    }
  }
  return names;
}

export { sliceText, identText, isExported, keywordOf, resolveModuleId };
