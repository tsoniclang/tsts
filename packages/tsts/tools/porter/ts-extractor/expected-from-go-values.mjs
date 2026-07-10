import {
  descriptorFromProfileType,
  goResults,
  goTypeTextToDescriptor,
  goTypeToDescriptor,
  isInternal,
  ref,
  resolveImportPath,
  resolveKnownSelectorType,
  resolveKnownTypeName,
  resolveNamed,
  splitTopLevelList,
  splitTopLevelOperator,
  typeParamIndexOf,
} from "./expected-from-go-types.mjs";

function goFunctionReturn(unit, ctx, explicitTypeArgs = []) {
  const allTypeParamDetails = unit.typeParameterDetails ?? [];
  const typeParamIndex = typeParamIndexOf(allTypeParamDetails);
  const functionCtx = { ...ctx, typeParamIndex };
  const ret = goResults(unit.results, functionCtx);
  if (explicitTypeArgs.length === 0 || allTypeParamDetails.length === 0) return ret;
  const substitutions = new Map();
  explicitTypeArgs.forEach((arg, index) => substitutions.set(index, arg));
  return substituteTypeParams(ret, substitutions);
}

function substituteTypeParams(desc, substitutions) {
  if (!desc || typeof desc !== "object") return desc;
  if (desc.t === "tp") return substitutions.get(desc.i) ?? desc;
  if (desc.t === "ref") return ref(desc.id, desc.args.map((a) => substituteTypeParams(a, substitutions)));
  if (desc.t === "array") return { ...desc, element: substituteTypeParams(desc.element, substitutions) };
  if (desc.t === "tuple") return { ...desc, elements: desc.elements.map((e) => substituteTypeParams(e, substitutions)) };
  if (desc.t === "union" || desc.t === "intersect") return { ...desc, members: desc.members.map((m) => substituteTypeParams(m, substitutions)) };
  if (desc.t === "fn") {
    return {
      ...desc,
      params: desc.params.map((p) => ({ ...p, type: substituteTypeParams(p.type, substitutions) })),
      ret: substituteTypeParams(desc.ret, substitutions),
    };
  }
  if (desc.t === "object") {
    return {
      ...desc,
      members: desc.members.map((m) => (m.type ? { ...m, type: substituteTypeParams(m.type, substitutions) } : m)),
    };
  }
  return desc;
}

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

  if (source.startsWith("(") && source.endsWith(")")) {
    const inner = source.slice(1, -1).trim();
    if (splitTopLevelList(inner).length === 1) {
      const inferred = inferValueTypeFromText(inner, ctx);
      if (inferred) return inferred;
    }
  }
  if (/^[+\-^]/.test(source)) {
    const inferred = inferValueTypeFromText(source.slice(1), ctx);
    if (inferred) return inferred;
  }

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
  for (const op of ["*", "+", "-", "/", "%", "<<", ">>", "&", "|", "^"]) {
    const split = splitTopLevelOperator(source, op);
    if (!split) continue;
    const left = inferValueTypeFromText(split[0], ctx);
    const right = inferValueTypeFromText(split[1], ctx);
    if (!left || !right) continue;
    if (left.t === "ref" && left.id === "packages/tsts/src/go/time.ts::Duration") return left;
    if (right.t === "ref" && right.id === "packages/tsts/src/go/time.ts::Duration") return right;
    if (JSON.stringify(left) === JSON.stringify(right)) return left;
    if (left.t === "ref" && terminalNameFromId(left.id) !== "int" && right.t === "ref" && terminalNameFromId(right.id) === "int") return left;
    if (right.t === "ref" && terminalNameFromId(right.id) !== "int" && left.t === "ref" && terminalNameFromId(left.id) === "int") return right;
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
    const supplied = args[0].replace(/\.\.\.\s*$/, "");
    const suppliedType = inferValueTypeFromText(supplied, ctx);
    const itemType = suppliedType?.t === "ref" && terminalNameFromId(suppliedType.id) === "GoSlice"
      ? suppliedType.args[0]
      : suppliedType;
    if (itemType) {
      return ref(`${ctx.index.compat}::${ctx.index.bridge.pointer}`, [
        ref(`${ctx.index.tsRoot}/internal/collections/set.ts::Set`, [itemType]),
      ]);
    }
  }
  if (pkg === "core" && name === "Map" && args.length === 2) {
    const callback = args[1].match(/^func\s*\([^)]*\)\s+([^\s{]+)\s*\{/);
    if (callback) {
      return ref(`${ctx.index.compat}::${ctx.index.bridge.slice}`, [goTypeTextToDescriptor(callback[1], ctx)]);
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

export function valueSpecType(spec, ctx, ordinal = 0) {
  if (spec.type) return goTypeToDescriptor(spec.type, ctx);
  const values = spec.values ?? [];
  const selected = values[ordinal] ?? (values.length === 1 ? values[0] : undefined);
  if (selected !== undefined && hasResolvableValueReference(selected, ctx)) {
    const inferredFromReference = inferValueTypeFromText(selected, ctx);
    if (inferredFromReference) return inferredFromReference;
  }
  const inferred = (spec.inferredValueTypes ?? [])[ordinal] ?? (spec.inferredValueTypes ?? []).find(Boolean);
  const inferredDescriptor = inferred ? goTypeToDescriptor(inferred, ctx) : null;
  if (inferredDescriptor && !descriptorHasTypeParam(inferredDescriptor)) return inferredDescriptor;
  for (const value of selected ? [selected] : values) {
    const inferredFromValue = inferValueTypeFromText(value, ctx);
    if (inferredFromValue) return inferredFromValue;
  }
  return inferredDescriptor;
}

function hasResolvableValueReference(source, ctx) {
  for (const match of String(source).matchAll(/\b([A-Za-z_]\w*)(?:\.([A-Za-z_]\w*))?\b/g)) {
    const found = match[2] === undefined
      ? ctx.index.valueSpecs.has(`${ctx.importPath}::${match[1]}`)
      : ctx.index.valueSpecs.has(`${resolveImportPath(match[1], ctx)}::${match[2]}`);
    if (found) return true;
  }
  return false;
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
