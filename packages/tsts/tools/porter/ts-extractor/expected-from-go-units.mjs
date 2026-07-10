import {
  goParams,
  goResults,
  goTypeToDescriptor,
  receiverTypeParams,
  resolveImportPath,
  typeParamDescriptors,
  typeParamIndexOf,
} from "./expected-from-go-types.mjs";
import { valueSpecType } from "./expected-from-go-values.mjs";

function receiverMethodMembers(unit, ctx) {
  const methods = ctx.index.receiverMethods.get(`${ctx.importPath}::${unit.name}`) ?? [];
  return methods.map(({ unit: method, importPath, fileImports }) => {
    const receiverParams = receiverTypeParams(method, ctx.index, importPath);
    const allTypeParamDetails = [...receiverParams, ...(method.typeParameterDetails ?? [])];
    const methodCtx = { ...ctx, importPath, fileImports, typeParamIndex: typeParamIndexOf(allTypeParamDetails) };
    return {
      name: method.name,
      optional: true,
      type: {
        t: "fn",
        params: goParams(method.parameters, methodCtx).map((p) => ({ type: p.type, rest: p.rest })),
        ret: goResults(method.results, methodCtx),
      },
    };
  });
}

function goEmbeddedMembers(unit, ctx) {
  const out = [];
  let ordinal = 0;
  const directNames = directMemberNames(unit);
  for (const member of unit.members ?? []) {
    if (member.kind !== "embeddedField" && member.kind !== "embeddedInterface") continue;
    out.push({ name: `__tsgoEmbedded${ordinal++}`, optional: true, type: goTypeToDescriptor(member.typeExpr, ctx) });
    const embedded = resolveGoTypeUnit(member.typeExpr, ctx);
    if (embedded?.unit) {
      const embeddedCtx = {
        ...ctx,
        importPath: embedded.importPath,
        fileImports: embedded.fileImports,
        typeParamIndex: typeParamIndexOf(embedded.unit.typeParameterDetails),
      };
      if (embedded.unit.typeKind === "interface") {
        out.push(...goExpandedInterfaceMembers(embedded.unit, embeddedCtx).filter((m) => !directNames.has(m.name)).map((m) => ({ ...m, optional: true })));
      }
      out.push(...receiverMethodMembers(embedded.unit, embeddedCtx).filter((m) => !directNames.has(m.name)).map((m) => ({ ...m, optional: true })));
    } else {
      out.push(...externalInterfaceMembers(member.typeExpr, ctx).filter((m) => !directNames.has(m.name)).map((m) => ({ ...m, optional: true })));
    }
  }
  return out;
}

function directMemberNames(unit) {
  const names = new Set();
  for (const member of unit.members ?? []) {
    if (member.kind === "embeddedField" || member.kind === "embeddedInterface") continue;
    if (member.name) names.add(member.name);
    for (const name of member.names ?? []) names.add(name);
  }
  for (const method of unit.methods ?? []) {
    if (method.name) names.add(method.name);
  }
  return names;
}

function externalInterfaceMembers(expr, ctx) {
  const key = externalTypeKey(expr, ctx);
  if (!key) return [];
  return (ctx.index.externalInterfaceMembers[key] ?? []).map((m) => ({ name: m.name, type: m.type }));
}

function externalTypeKey(expr, ctx) {
  if (!expr) return undefined;
  if (expr.kind === "pointer" || expr.kind === "paren" || expr.kind === "instantiation") return externalTypeKey(expr.element, ctx);
  if (expr.kind !== "selector") return undefined;
  const importPath = resolveImportPath(expr.package, ctx);
  return `${importPath}.${expr.name}`;
}

function resolveGoTypeUnit(expr, ctx) {
  if (!expr) return undefined;
  if (expr.kind === "pointer" || expr.kind === "paren" || expr.kind === "instantiation") return resolveGoTypeUnit(expr.element, ctx);
  if (expr.kind === "ident") return ctx.index.typeUnits.get(`${ctx.importPath}::${expr.name}`);
  if (expr.kind === "selector") {
    const importPath = resolveImportPath(expr.package, ctx);
    return ctx.index.typeUnits.get(`${importPath}::${expr.name}`);
  }
  return undefined;
}

function goInterfaceDeclaredMembers(unit, ctx) {
  let blank = 0;
  return (unit.members ?? [])
    .filter((m) => m.name && (m.kind === "field" || m.kind === "method"))
    .map((m) => ({
      name: m.name === "_" ? `__tsgoBlank${blank++}` : m.name,
      optional: m.name === "_" ? true : undefined,
      type: goTypeToDescriptor(m.typeExpr, ctx),
    }));
}

function goExpandedInterfaceMembers(unit, ctx, seen = new Set()) {
  const key = `${ctx.importPath}::${unit.name}`;
  if (seen.has(key)) return [];
  seen.add(key);
  const members = [...goInterfaceDeclaredMembers(unit, ctx), ...receiverMethodMembers(unit, ctx)];
  for (const member of unit.members ?? []) {
    if (member.kind !== "embeddedInterface") continue;
    const embedded = resolveGoTypeUnit(member.typeExpr, ctx);
    if (embedded?.unit?.typeKind !== "interface") continue;
    const embeddedCtx = {
      ...ctx,
      importPath: embedded.importPath,
      fileImports: embedded.fileImports,
      typeParamIndex: typeParamIndexOf(embedded.unit.typeParameterDetails),
    };
    members.push(...goExpandedInterfaceMembers(embedded.unit, embeddedCtx, seen).map((m) => ({ ...m, optional: true })));
  }
  return members;
}

// Build the expected descriptor for a Go unit (same shape as the actual side).
export function goUnitDescriptor(unit, index) {
  const importPath = unit.file?.importPath ?? unit.metadata?.importPath ?? "";
  const fileImports = unit.file?.imports ?? unit.imports ?? [];
  const baseCtx = { index, importPath, fileImports, typeParamIndex: new Map() };

  if (unit.kind === "func" || unit.kind === "method") {
    // A Go method on a generic type carries no method-level type params, but the
    // TS port puts the receiver type's params on the function. Prepend them.
    const receiverParams = unit.kind === "method" ? receiverTypeParams(unit, index, importPath) : [];
    const allTypeParamDetails = [...receiverParams, ...(unit.typeParameterDetails ?? [])];
    const tpIndex = typeParamIndexOf(allTypeParamDetails);
    const ctx = { ...baseCtx, typeParamIndex: tpIndex };
    const params = [];
    if (unit.kind === "method" && unit.receiverType) {
      params.push({ type: goTypeToDescriptor(unit.receiverType, ctx), rest: false });
    }
    params.push(...goParams(unit.parameters, ctx).map((p) => ({ type: p.type, rest: p.rest })));
    return {
      kind: "func",
      params,
      ret: goResults(unit.results, ctx),
      typeParams: typeParamDescriptors(allTypeParamDetails, ctx),
    };
  }

  if (unit.kind === "type") {
    const tpIndex = typeParamIndexOf(unit.typeParameterDetails);
    const ctx = { ...baseCtx, typeParamIndex: tpIndex };
    if (unit.typeKind === "struct" || unit.typeKind === "interface") {
      const members = [
        ...goInterfaceDeclaredMembers(unit, ctx),
        ...goEmbeddedMembers(unit, ctx),
        ...receiverMethodMembers(unit, ctx),
      ];
      if (unit.typeKind === "struct" && unit.typeExpression?.kind === "struct" && (unit.typeExpression.members ?? []).length === 0) {
        members.push({ name: "__tsgoEmpty", optional: true, type: { t: "kw", kw: "never" } });
      }
      return { kind: "interface", typeParams: typeParamDescriptors(unit.typeParameterDetails, ctx), members };
    }
    // alias / named type
    return {
      kind: "alias",
      typeParams: typeParamDescriptors(unit.typeParameterDetails, ctx),
      type: unit.typeExpression ? goTypeToDescriptor(unit.typeExpression, ctx) : { t: "kw", kw: "unknown" },
    };
  }

  if (unit.kind === "constGroup" || unit.kind === "varGroup") {
    const ctx = baseCtx;
    const decls = [];
    for (const spec of unit.valueSpecs ?? []) {
      (spec.names ?? []).forEach((name, ordinal) => {
        const constantValue = spec.constantValues?.[ordinal] ?? (spec.constantValues?.length === 1 ? spec.constantValues[0] : undefined);
        decls.push({
          name,
          type: valueSpecType(spec, ctx, ordinal),
          value: constantValue?.supported ? canonicalGoConstantValue(constantValue) : simpleGoLiteralValue(spec.values?.[ordinal]),
          valueIssue: unit.kind === "constGroup" && constantValue !== undefined && !constantValue.supported
            ? constantValue.reason ?? "unsupported Go constant initializer"
            : undefined,
        });
      });
    }
    return { kind: "value", decls };
  }

  return { kind: "other" };
}

function canonicalGoConstantValue(report) {
  if (report.kind === "boolean") return { kind: "boolean", value: report.exact === "true" };
  if (report.kind === "string") return { kind: "string", value: report.exact };
  if (report.kind === "number") return { kind: "number", value: normalizeRationalText(report.exact) };
  return { kind: report.kind, value: report.exact };
}

function normalizeRationalText(text) {
  const source = String(text);
  const slash = source.indexOf("/");
  if (slash < 0) return source;
  const numerator = BigInt(source.slice(0, slash));
  const denominator = BigInt(source.slice(slash + 1));
  const divisor = bigintGcd(numerator, denominator);
  const normalizedNumerator = numerator / divisor;
  const normalizedDenominator = denominator / divisor;
  return normalizedDenominator === 1n ? String(normalizedNumerator) : `${normalizedNumerator}/${normalizedDenominator}`;
}

function bigintGcd(left, right) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) [a, b] = [b, a % b];
  return a === 0n ? 1n : a;
}

function simpleGoLiteralValue(value) {
  if (typeof value !== "string") return undefined;
  if (value === "true" || value === "false") return { kind: "boolean", value: value === "true" };
  if (/^(?:0|[1-9][0-9_]*)(?:\.[0-9_]+)?$/.test(value)) {
    return { kind: "number", value: value.replaceAll("_", "") };
  }
  if (/^"(?:[^"\\]|\\.)*"$/.test(value)) {
    try {
      return { kind: "string", value: JSON.parse(value) };
    } catch {
      return undefined;
    }
  }
  return undefined;
}
