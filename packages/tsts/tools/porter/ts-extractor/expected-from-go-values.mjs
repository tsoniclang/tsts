import {
  isInternal,
  ref,
  resolveNamed,
  resolveSelector,
  goParams,
  goResults,
  receiverTypeParams,
  typeParamIndexOf,
  resolveKnownTypeName,
  resolveKnownSelectorType,
  descriptorFromProfileType,
  resolveImportPath,
  goFunctionReturn,
  typeParamDescriptors,
  goTypeToDescriptor,
  goTypeTextToDescriptor,
  splitTopLevelList,
} from "./expected-from-go-core.mjs";

function resolveFunctionReturn(name, ctx, explicitTypeArgs = []) {
  const found = ctx.index.functionUnits.get(`${ctx.importPath}::${name}`);
  return found ? goFunctionReturn(found.unit, { ...ctx, importPath: found.importPath, fileImports: found.fileImports }, explicitTypeArgs) : null;
}

function resolveSelectorFunctionReturn(pkg, name, ctx, explicitTypeArgs = []) {
  const importPath = resolveImportPath(pkg, ctx);
  if (!isInternal(importPath, ctx.index.goModule)) return null;
  const found = ctx.index.functionUnits.get(`${importPath}::${name}`);
  return found ? goFunctionReturn(found.unit, { ...ctx, importPath: found.importPath, fileImports: found.fileImports }, explicitTypeArgs) : null;
}

function resolveExternalFunctionReturn(pkg, name, ctx) {
  const importPath = resolveImportPath(pkg, ctx);
  return descriptorFromProfileType(ctx.index.externalFunctionReturns[`${importPath}.${name}`] ?? ctx.index.externalFunctionReturns[`${pkg}.${name}`]);
}

function resolveValueType(name, ctx, seen = new Set()) {
  const key = `${ctx.importPath}::${name}`;
  if (seen.has(key)) return null;
  const found = ctx.index.valueSpecs.get(key);
  if (!found) return null;
  seen.add(key);
  return valueSpecType(found.spec, { ...ctx, importPath: found.importPath, fileImports: found.fileImports, seenValues: seen }, found.ordinal);
}

function resolveSelectorValueType(pkg, name, ctx, seen = new Set()) {
  const importPath = resolveImportPath(pkg, ctx);
  if (!isInternal(importPath, ctx.index.goModule)) {
    return descriptorFromProfileType(ctx.index.externalValueTypes[`${importPath}.${name}`] ?? ctx.index.externalValueTypes[`${pkg}.${name}`]);
  }
  const key = `${importPath}::${name}`;
  if (seen.has(key)) return null;
  const found = ctx.index.valueSpecs.get(key);
  if (!found) return null;
  seen.add(key);
  return valueSpecType(found.spec, { ...ctx, importPath: found.importPath, fileImports: found.fileImports, seenValues: seen }, found.ordinal);
}

function inferValueTypeFromText(text, ctx) {
  const source = (text ?? "").trim();
  if (!source) return null;

  if (/^len\s*\(/.test(source)) return resolveNamed("int", ctx);
  if (/^diagnostics\.[A-Za-z_]\w*\.Code\s*\(\s*\)$/.test(source)) return resolveNamed("int32", ctx);

  const immediateFunc = source.match(/^func\s*\(\s*\)\s+([\s\S]*?)\s*\{/);
  if (immediateFunc) return goTypeTextToDescriptor(immediateFunc[1], ctx);

  const onceValue = source.match(/^sync\.OnceValue\s*\(\s*func\s*\(\s*\)\s+([\s\S]*?)\s*\{/);
  if (onceValue) {
    return { t: "fn", params: [], ret: goTypeTextToDescriptor(onceValue[1], ctx) };
  }

  if (source === "true" || source === "false") return resolveNamed("bool", ctx);
  if (/^[A-Za-z_]\w*$/.test(source)) {
    const valueType = resolveValueType(source, ctx, ctx.seenValues ?? new Set());
    if (valueType) return valueType;
  }
  const selectorValue = source.match(/^([A-Za-z_]\w*)\.([A-Za-z_]\w*)$/);
  if (selectorValue) {
    const valueType = resolveSelectorValueType(selectorValue[1], selectorValue[2], ctx, ctx.seenValues ?? new Set());
    if (valueType) return valueType;
  }
  if (/^[-+]?\d+(?:_\d+)*$/.test(source)) return resolveNamed("int", ctx);
  if (/^0[xX][0-9a-fA-F_]+$/.test(source)) return resolveNamed("int", ctx);
  if (/^(?:"(?:\\.|[^"\\])*"|`[^`]*`)$/.test(source)) return resolveNamed("string", ctx);
  if (/(^|[+\s])(?:"(?:\\.|[^"\\])*"|`[^`]*`)([+\s]|$)/.test(source)) return resolveNamed("string", ctx);

  for (const op of ["*", "+", "-", "/", "%", "<<", ">>", "&", "|", "^"]) {
    const split = splitTopLevelOperator(source, op);
    if (!split) continue;
    const left = inferValueTypeFromText(split[0], ctx);
    const right = inferValueTypeFromText(split[1], ctx);
    if (!left || !right) continue;
    if (left.t === "ref" && left.id === "packages/tsts/src/go/time.ts::Duration") return left;
    if (right.t === "ref" && right.id === "packages/tsts/src/go/time.ts::Duration") return right;
    return resolveNamed("int", ctx);
  }

  const explicitGenericCall = source.match(/^([A-Za-z_]\w*)\s*\[([\s\S]*?)\]\s*\(/);
  if (explicitGenericCall) {
    const args = splitTopLevelList(explicitGenericCall[2]).map((a) => goTypeTextToDescriptor(a, ctx));
    const ret = resolveFunctionReturn(explicitGenericCall[1], ctx, args);
    if (ret) return ret;
  }

  const explicitGenericSelectorCall = source.match(/^([A-Za-z_]\w*)\.([A-Za-z_]\w*)\s*\[([\s\S]*?)\]\s*\(/);
  if (explicitGenericSelectorCall) {
    const args = splitTopLevelList(explicitGenericSelectorCall[3]).map((a) => goTypeTextToDescriptor(a, ctx));
    const ret = resolveSelectorFunctionReturn(explicitGenericSelectorCall[1], explicitGenericSelectorCall[2], ctx, args);
    if (ret) return ret;
    const externalRet = resolveExternalFunctionReturn(explicitGenericSelectorCall[1], explicitGenericSelectorCall[2], ctx);
    if (externalRet) return externalRet;
  }

  const identConversion = source.match(/^([A-Za-z_]\w*)\s*\(/);
  if (identConversion) {
    const ret = resolveFunctionReturn(identConversion[1], ctx);
    if (ret) return ret;
    const ty = resolveKnownTypeName(identConversion[1], ctx);
    if (ty) return ty;
  }

  const selectorConversion = source.match(/^([A-Za-z_]\w*)\.([A-Za-z_]\w*)\s*\(/);
  if (selectorConversion) {
    const known = inferKnownSelectorCallReturn(selectorConversion[1], selectorConversion[2], source, ctx);
    if (known) return known;
    const ret = resolveSelectorFunctionReturn(selectorConversion[1], selectorConversion[2], ctx);
    if (ret) return ret;
    const externalRet = resolveExternalFunctionReturn(selectorConversion[1], selectorConversion[2], ctx);
    if (externalRet) return externalRet;
    return resolveKnownSelectorType(selectorConversion[1], selectorConversion[2], ctx);
  }

  const addressComposite = source.match(/^&\s*([A-Za-z_]\w*)\s*(?:\[.*?\])?\s*\{/);
  if (addressComposite) {
    const ty = resolveKnownTypeName(addressComposite[1], ctx);
    if (ty) return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [ty]);
  }

  const composite = source.match(/^([A-Za-z_]\w*)\s*(?:\[.*?\])?\s*\{/);
  if (composite) return resolveKnownTypeName(composite[1], ctx);

  const newCall = source.match(/^new\s*\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (newCall) {
    const ty = resolveKnownTypeName(newCall[1], ctx);
    if (ty) return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [ty]);
  }

  return null;
}

function inferKnownSelectorCallReturn(pkg, name, source, ctx) {
  const argsSource = source.slice(source.indexOf("(") + 1, source.lastIndexOf(")"));
  const args = splitTopLevelList(argsSource);
  if (pkg === "slices" && name === "Concat" && args.length > 0) {
    const first = inferValueTypeFromText(args[0], ctx);
    if (first?.t === "ref" && terminalNameFromId(first.id) === "GoSlice") return first;
    if (isGoPtrOf(first, "GoSlice")) return first.args[0];
  }
  if (pkg === "slices" && name === "Collect" && args.length === 1) {
    const key = inferKeysElementType(args[0], ctx);
    if (key) return ref(`${ctx.index.compat}::${ctx.index.bridge.slice}`, [key]);
  }
  if (pkg === "collections" && name === "NewOrderedMapFromList" && args.length === 1) {
    const arg = goTypeTextToDescriptor(args[0].replace(/\{[\s\S]*$/, ""), ctx);
    const sliceElement = arg?.t === "ref" && terminalNameFromId(arg.id) === "GoSlice" ? arg.args[0] : undefined;
    if (sliceElement?.t === "ref" && terminalNameFromId(sliceElement.id) === "MapEntry" && sliceElement.args.length === 2) {
      return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [
        ref(`${ctx.index.tsRoot}/internal/collections/ordered_map.ts::OrderedMap`, sliceElement.args),
      ]);
    }
  }
  if (pkg === "collections" && name === "NewSetFromItems" && args.length > 0) {
    const itemType = inferValueTypeFromText(args[0], ctx);
    if (itemType) {
      return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [
        ref(`${ctx.index.tsRoot}/internal/collections/set.ts::Set`, [itemType]),
      ]);
    }
  }
  return null;
}

function terminalNameFromId(id) {
  return String(id).slice(String(id).lastIndexOf("::") + 2);
}

function isGoPtrOf(desc, terminal) {
  return desc?.t === "ref" && terminalNameFromId(desc.id) === "GoPtr" && desc.args[0]?.t === "ref" && terminalNameFromId(desc.args[0].id) === terminal;
}

function inferKeysElementType(source, ctx) {
  const keysCall = source.trim().match(/^([A-Za-z_]\w*)\.Keys\s*\(\s*\)$/);
  if (!keysCall) return null;
  const receiver = inferValueTypeFromText(keysCall[1], ctx);
  const target = receiver?.t === "ref" && terminalNameFromId(receiver.id) === "GoPtr" ? receiver.args[0] : receiver;
  if (target?.t !== "ref") return null;
  const terminal = terminalNameFromId(target.id);
  if ((terminal === "OrderedMap" || terminal === "Set" || terminal === "SyncMap" || terminal === "SyncSet") && target.args.length > 0) {
    return target.args[0];
  }
  return null;
}

function splitTopLevelOperator(text, operator) {
  let depth = 0;
  for (let i = 0; i <= text.length - operator.length; i++) {
    const ch = text[i];
    if (ch === "[" || ch === "(" || ch === "{") depth++;
    else if (ch === "]" || ch === ")" || ch === "}") depth--;
    if (depth === 0 && text.slice(i, i + operator.length) === operator) {
      if ((operator === "<" || operator === ">") && text[i + 1] === operator) continue;
      return [text.slice(0, i).trim(), text.slice(i + operator.length).trim()];
    }
  }
  return undefined;
}

function valueSpecType(spec, ctx, ordinal = 0) {
  if (spec.type) return goTypeToDescriptor(spec.type, ctx);
  const inferred = (spec.inferredValueTypes ?? [])[ordinal] ?? (spec.inferredValueTypes ?? []).find(Boolean);
  const inferredDescriptor = inferred ? goTypeToDescriptor(inferred, ctx) : null;
  if (inferredDescriptor && !descriptorHasTypeParam(inferredDescriptor)) return inferredDescriptor;
  const values = spec.values ?? [];
  const selected = values[ordinal] ?? (values.length === 1 ? values[0] : undefined);
  for (const value of selected ? [selected] : values) {
    const inferredFromValue = inferValueTypeFromText(value, ctx);
    if (inferredFromValue) return inferredFromValue;
  }
  return inferredDescriptor;
}

function descriptorHasTypeParam(desc) {
  if (!desc || typeof desc !== "object") return false;
  if (desc.t === "tp") return true;
  if (desc.t === "ref") return desc.args.some(descriptorHasTypeParam);
  if (desc.t === "array") return descriptorHasTypeParam(desc.element);
  if (desc.t === "tuple") return desc.elements.some(descriptorHasTypeParam);
  if (desc.t === "union" || desc.t === "intersect") return desc.members.some(descriptorHasTypeParam);
  if (desc.t === "fn") return desc.params.some((p) => descriptorHasTypeParam(p.type)) || descriptorHasTypeParam(desc.ret);
  if (desc.t === "object") return desc.members.some((m) => descriptorHasTypeParam(m.type));
  return false;
}

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
      (spec.names ?? []).forEach((name, ordinal) => decls.push({ name, type: valueSpecType(spec, ctx, ordinal) }));
    }
    return { kind: "value", decls };
  }

  return { kind: "other" };
}
