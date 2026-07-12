export function normalizeExternalFunctionDescriptor(descriptor, signatures, fixedPrefixCount = 0) {
  if (descriptor?.kind !== "func") return descriptor;
  if (!Array.isArray(signatures)) throw new Error("external Go function evidence must be one exact signature list");
  return {
    ...descriptor,
    signatures: (descriptor.signatures ?? []).map((signature, index) => {
      const evidence = signatures[index];
      return evidence === undefined ? signature : normalizeExternalCallableDescriptor(signature, evidence, fixedPrefixCount);
    }),
  };
}

export function normalizeExternalValueDescriptor(descriptor, contracts) {
  if (descriptor?.kind !== "value") return descriptor;
  if (!Array.isArray(contracts)) throw new Error("external Go value evidence must be one exact type-contract list");
  return {
    ...descriptor,
    decls: (descriptor.decls ?? []).map((declaration, index) => ({
      ...declaration,
      type: normalizeExternalTypeDescriptor(declaration.type, contracts[index]),
    })),
  };
}

export function normalizeExternalDeclarationDescriptor(descriptor, evidence) {
  if (descriptor === undefined || evidence === undefined) return descriptor;
  if (evidence.kind === "alias") {
    return descriptor.kind === "alias"
      ? { ...descriptor, type: normalizeExternalTypeDescriptor(descriptor.type, evidence.type) }
      : descriptor;
  }
  if (descriptor.kind === "alias" && descriptor.type?.t === "object") {
    return {
      ...descriptor,
      type: {
        ...descriptor.type,
        members: normalizeExternalDeclarationMembers(descriptor.type.members ?? [], evidence),
      },
    };
  }
  if (!new Set(["class", "interface"]).has(descriptor.kind)) return descriptor;
  const members = normalizeExternalDeclarationMembers(descriptor.members ?? [], evidence);
  const heritage = normalizeExternalHeritage(descriptor.heritage ?? [], evidence.heritage ?? []);
  if (descriptor.kind === "class") return { ...descriptor, heritage, members };
  return {
    ...descriptor,
    heritage,
    members,
    fragments: (descriptor.fragments ?? []).map((fragment) => ({
      ...fragment,
      heritage: normalizeExternalHeritage(fragment.heritage ?? [], evidence.heritage ?? []),
      members: normalizeExternalDeclarationMembers(fragment.members ?? [], evidence),
    })),
  };
}

export function mergeExternalEvidence(rows, label) {
  if (!Array.isArray(rows) || rows.length === 0) throw new Error(`${label} has no profiled source-evidence rows`);
  const seenProfiles = new Set();
  const normalized = rows.map((row, index) => {
    if (row === null || typeof row !== "object" || Array.isArray(row) || !Array.isArray(row.profiles)) {
      throw new Error(`${label} row #${index} has no exact profile set`);
    }
    if (row.profiles.length === 0 || row.profiles.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
      throw new Error(`${label} row #${index} has an invalid profile set`);
    }
    for (const profile of row.profiles) {
      if (seenProfiles.has(profile)) throw new Error(`${label} duplicates semantic profile '${profile}'`);
      seenProfiles.add(profile);
    }
    return { evidence: row.evidence, profiles: [...row.profiles].sort((left, right) => left - right) };
  });
  return mergeEvidenceRows(normalized, label);
}

function mergeEvidenceRows(rows, path) {
  const values = rows.map((row) => row.evidence);
  if (values.every(Array.isArray)) {
    const lengths = new Set(values.map((value) => value.length));
    if (lengths.size !== 1) throw profileDrift(path, rows, "array length");
    return values[0].map((_value, index) => mergeEvidenceRows(
      rows.map((row) => ({ ...row, evidence: row.evidence[index] })),
      `${path}[${index}]`,
    ));
  }
  if (values.some(Array.isArray)) throw profileDrift(path, rows, "value kind");
  if (values.every(isEvidenceObject)) {
    if (values.every(isSignatureEvidence)) return mergeSignatureEvidence(rows, path);
    if (values.every(isInterfaceEvidence)) return mergeInterfaceEvidence(rows, path);
    const keys = values.map((value) => Object.keys(value).sort());
    if (!keys.every((value) => JSON.stringify(value) === JSON.stringify(keys[0]))) {
      throw profileDrift(path, rows, "object fields");
    }
    return Object.fromEntries(keys[0].map((key) => [key, mergeEvidenceRows(
      rows.map((row) => ({ ...row, evidence: row.evidence[key] })),
      `${path}.${key}`,
    )]));
  }
  if (values.some(isEvidenceObject)) throw profileDrift(path, rows, "value kind");
  if (!values.every((value) => Object.is(value, values[0]))) throw profileDrift(path, rows, "value");
  return values[0];
}

function mergeSignatureEvidence(rows, path) {
  const sourceRows = rows.filter((row) => row.evidence.parameterNameProvenance === "source");
  for (const row of rows) requireSignatureEvidence(row.evidence);
  const merged = {};
  const keys = Object.keys(rows[0].evidence).sort();
  if (!rows.every((row) => JSON.stringify(Object.keys(row.evidence).sort()) === JSON.stringify(keys))) {
    throw profileDrift(path, rows, "signature fields");
  }
  for (const key of keys) {
    if (key === "parameterNameProvenance") {
      merged[key] = sourceRows.length > 0 ? "source" : "unavailable";
      continue;
    }
    if (key === "parameters") {
      const lengths = new Set(rows.map((row) => row.evidence.parameters.length));
      if (lengths.size !== 1) throw profileDrift(`${path}.parameters`, rows, "parameter count");
      merged.parameters = rows[0].evidence.parameters.map((_parameter, index) =>
        mergeParameterEvidence(rows, sourceRows, path, index));
      continue;
    }
    if (key === "results") {
      merged.results = mergeResultEvidence(rows, path);
      continue;
    }
    merged[key] = mergeEvidenceRows(
      rows.map((row) => ({ ...row, evidence: row.evidence[key] })),
      `${path}.${key}`,
    );
  }
  return merged;
}

function mergeParameterEvidence(rows, sourceRows, path, index) {
  const parameterRows = rows.map((row) => ({ ...row, evidence: row.evidence.parameters[index] }));
  const sourceParameterRows = sourceRows.map((row) => ({ ...row, evidence: row.evidence.parameters[index] }));
  const parameter = mergeObjectExcept(parameterRows, `${path}.parameters[${index}]`, new Set(["name"]));
  parameter.name = sourceParameterRows.length > 0
    ? mergeEvidenceRows(sourceParameterRows.map((row) => ({ ...row, evidence: row.evidence.name })), `${path}.parameters[${index}].name`)
    : rows[0].evidence.parameters[index].name;
  return parameter;
}

function mergeResultEvidence(rows, path) {
  const lengths = new Set(rows.map((row) => row.evidence.results.length));
  if (lengths.size !== 1) throw profileDrift(`${path}.results`, rows, "result count");
  return rows[0].evidence.results.map((_result, index) => {
    const resultRows = rows.map((row) => ({ ...row, evidence: row.evidence.results[index] }));
    const result = mergeObjectExcept(resultRows, `${path}.results[${index}]`, new Set(["name"]));
    result.name = rows[0].evidence.results[index].name;
    return result;
  });
}

function mergeInterfaceEvidence(rows, path) {
  for (const row of rows) {
    if (row.evidence.explicitMethodOrderProvenance !== "source" && row.evidence.explicitMethodOrderProvenance !== "canonical") {
      throw new Error(`${path} has invalid interface explicit-method-order provenance '${row.evidence.explicitMethodOrderProvenance}'`);
    }
  }
  const sourceRows = rows.filter((row) => row.evidence.explicitMethodOrderProvenance === "source");
  const selectedOrder = sourceRows.length > 0
    ? exactMethodOrder(sourceRows, `${path}.methods`)
    : [...methodEvidenceMap(rows[0], `${path}.methods`).keys()].sort();
  const maps = rows.map((row) => methodEvidenceMap(row, `${path}.methods`));
  const keySets = maps.map((map) => [...map.keys()].sort());
  if (!keySets.every((keys) => JSON.stringify(keys) === JSON.stringify(keySets[0]))) {
    throw profileDrift(`${path}.methods`, rows, "method identities");
  }
  const methods = selectedOrder.map((key) => mergeEvidenceRows(
    rows.map((row, index) => ({ ...row, evidence: maps[index].get(key) })),
    `${path}.methods[${key}]`,
  ));
  const merged = mergeObjectExcept(rows, path, new Set(["methods", "explicitMethodOrderProvenance"]));
  merged.methods = methods;
  merged.explicitMethodOrderProvenance = sourceRows.length > 0 ? "source" : "canonical";
  return merged;
}

function exactMethodOrder(rows, path) {
  const orders = rows.map((row) => row.evidence.methods.map(methodEvidenceKey));
  if (!orders.every((order) => JSON.stringify(order) === JSON.stringify(orders[0]))) {
    throw profileDrift(path, rows, "source method order");
  }
  return orders[0];
}

function methodEvidenceMap(row, path) {
  const map = new Map();
  for (const method of row.evidence.methods) {
    const key = methodEvidenceKey(method);
    if (map.has(key)) throw new Error(`${path} duplicates method '${key}' in profiles [${row.profiles.join(",")}]`);
    map.set(key, method);
  }
  return map;
}

function methodEvidenceKey(method) {
  if (!isEvidenceObject(method) || typeof method.name !== "string" || method.name === "") {
    throw new Error("external Go interface method evidence has no exact name");
  }
  return method.name;
}

function mergeObjectExcept(rows, path, omitted) {
  const keys = Object.keys(rows[0].evidence).filter((key) => !omitted.has(key)).sort();
  if (!rows.every((row) => JSON.stringify(Object.keys(row.evidence).filter((key) => !omitted.has(key)).sort()) === JSON.stringify(keys))) {
    throw profileDrift(path, rows, "object fields");
  }
  return Object.fromEntries(keys.map((key) => [key, mergeEvidenceRows(
    rows.map((row) => ({ ...row, evidence: row.evidence[key] })),
    `${path}.${key}`,
  )]));
}

function isSignatureEvidence(value) {
  return Object.hasOwn(value, "parameterNameProvenance") && Array.isArray(value.parameters) && Array.isArray(value.results);
}

function isInterfaceEvidence(value) {
  return value.kind === "interfaceShape" && Object.hasOwn(value, "explicitMethodOrderProvenance") && Array.isArray(value.methods);
}

function isEvidenceObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function profileDrift(path, rows, aspect) {
  return new Error(`${path} changes ${aspect} across semantic profiles ${rows.map((row) => `[${row.profiles.join(",")}]`).join(" versus ")}`);
}

export function normalizeExternalCallableDescriptor(descriptor, signature, fixedPrefixCount = 0) {
  requireSignatureEvidence(signature);
  if (descriptor === undefined || !Array.isArray(descriptor.params)) return descriptor;
  const params = descriptor.params.map((parameter, index) => {
    if (index < fixedPrefixCount) return parameter;
    const evidenceIndex = index - fixedPrefixCount;
    const evidence = signature.parameters[evidenceIndex];
    if (evidence === undefined) return parameter;
    const type = evidence.variadic === true && parameter.type?.t === "array"
      ? { ...parameter.type, element: normalizeExternalTypeDescriptor(parameter.type.element, evidence.type) }
      : normalizeExternalTypeDescriptor(parameter.type, evidence.type);
    return {
      ...parameter,
      name: signature.parameterNameProvenance === "unavailable" ? unavailableParameterName(evidenceIndex) : parameter.name,
      type,
    };
  });
  const ret = normalizeExternalResultDescriptor(descriptor.ret, signature.results);
  return { ...descriptor, params, ret };
}

export function normalizeExternalTypeDescriptor(descriptor, contract) {
  if (descriptor === undefined || contract === undefined) return descriptor;
  switch (contract.kind) {
    case "reference":
      if (descriptor.t !== "ref") return descriptor;
      return {
        ...descriptor,
        args: (descriptor.args ?? []).map((argument, index) =>
          normalizeExternalTypeDescriptor(argument, contract.typeArguments[index])),
      };
    case "carrier":
      if (descriptor.t !== "ref") return descriptor;
      return {
        ...descriptor,
        args: (descriptor.args ?? []).map((argument, index) =>
          index < contract.arguments.length ? normalizeExternalTypeDescriptor(argument, contract.arguments[index]) : argument),
      };
    case "pointer":
      if (descriptor.t !== "ref" || descriptor.args?.length !== 1) return descriptor;
      return { ...descriptor, args: [normalizeExternalTypeDescriptor(descriptor.args[0], contract.element)] };
    case "array":
      if (descriptor.t !== "ref" || descriptor.args?.length === 0) return descriptor;
      return {
        ...descriptor,
        args: [normalizeExternalTypeDescriptor(descriptor.args[0], contract.element), ...(descriptor.args ?? []).slice(1)],
      };
    case "tuple":
      if (descriptor.t !== "tuple") return descriptor;
      return {
        ...descriptor,
        elements: (descriptor.elements ?? []).map((element, index) =>
          normalizeExternalTypeDescriptor(element, contract.elements[index])),
      };
    case "struct":
      return normalizeExternalStructDescriptor(descriptor, contract);
    case "interfaceShape":
      return normalizeExternalInterfaceDescriptor(descriptor, contract);
    case "function":
      return descriptor.t === "fn" ? normalizeExternalCallableDescriptor(descriptor, contract.signature) : descriptor;
    case "union":
      if (descriptor.t !== "union") return descriptor;
      return {
        ...descriptor,
        members: (descriptor.members ?? []).map((member, index) =>
          normalizeExternalTypeDescriptor(member, contract.members[index])),
      };
    case "intersection":
      if (descriptor.t !== "intersect") return descriptor;
      return {
        ...descriptor,
        members: (descriptor.members ?? []).map((member, index) =>
          normalizeExternalTypeDescriptor(member, contract.members[index])),
      };
    case "approximation":
      return descriptor.t === "goApprox"
        ? { ...descriptor, type: normalizeExternalTypeDescriptor(descriptor.type, contract.type) }
        : descriptor;
    case "basic":
    case "typeParameter":
      return descriptor;
    default:
      throw new Error(`external Go evidence has unknown canonical contract '${contract.kind}'`);
  }
}

function normalizeExternalResultDescriptor(descriptor, results) {
  if (!Array.isArray(results)) throw new Error("external Go signature result evidence must be an exact array");
  if (results.length === 0) return descriptor;
  if (results.length === 1) return normalizeExternalTypeDescriptor(descriptor, results[0].type);
  if (descriptor?.t !== "tuple") return descriptor;
  return {
    ...descriptor,
    elements: (descriptor.elements ?? []).map((element, index) =>
      normalizeExternalTypeDescriptor(element, results[index]?.type)),
  };
}

function normalizeExternalStructDescriptor(descriptor, contract) {
  if (descriptor.t !== "object") return descriptor;
  return {
    ...descriptor,
    members: (descriptor.members ?? []).map((member, index) => {
      const field = contract.fields[index];
      return field === undefined ? member : { ...member, type: normalizeExternalTypeDescriptor(member.type, field.type) };
    }),
  };
}

function normalizeExternalInterfaceDescriptor(descriptor, contract) {
  const components = [];
  if (contract.methods.length > 0) components.push({ kind: "methods", methods: contract.methods });
  for (const embedded of contract.embedded) components.push({ kind: "embedded", type: embedded.type });
  if (components.length === 0) return descriptor;
  if (components.length === 1) return normalizeExternalInterfaceComponent(descriptor, components[0], contract.explicitMethodOrderProvenance);
  if (descriptor.t !== "intersect") return descriptor;
  return {
    ...descriptor,
    members: (descriptor.members ?? []).map((member, index) =>
      normalizeExternalInterfaceComponent(member, components[index], contract.explicitMethodOrderProvenance)),
  };
}

function normalizeExternalInterfaceComponent(descriptor, component, orderProvenance) {
  if (component === undefined) return descriptor;
  if (component.kind === "embedded") return normalizeExternalTypeDescriptor(descriptor, component.type);
  if (descriptor?.t !== "object") return descriptor;
  const evidenceByName = new Map(component.methods.map((method) => [method.name, method.signature]));
  let members = (descriptor.members ?? []).map((member) => {
    const evidence = evidenceByName.get(member.name);
    if (evidence === undefined || member.type?.t !== "fn") return member;
    return { ...member, type: normalizeExternalCallableDescriptor(member.type, evidence) };
  });
  if (orderProvenance === "canonical") members = [...members].sort((left, right) => memberKey(left).localeCompare(memberKey(right)));
  else if (orderProvenance !== "source") throw new Error(`external Go interface member-order provenance is invalid: '${orderProvenance}'`);
  return { ...descriptor, members };
}

function normalizeExternalDeclarationMembers(members, evidence) {
  const evidenceByKey = new Map((evidence.members ?? []).map((entry) => [entry.key, entry]));
  const normalized = members.map((member) => {
    if (member.name === "computed:global::__tsgoPointerMethodSet") {
      return { ...member, type: normalizePointerMethodSetDescriptor(member.type, evidence.pointerMethods ?? []) };
    }
    const entry = evidenceByKey.get(memberKey(member));
    return entry === undefined ? member : {
      ...member,
      type: normalizeExternalTypeDescriptor(member.type, entry.contract),
    };
  });
  const sourceKeys = new Set((evidence.members ?? [])
    .filter((entry) => entry.orderProvenance === "source")
    .map((entry) => entry.key));
  const canonicalKeys = new Set((evidence.members ?? [])
    .filter((entry) => entry.orderProvenance === "canonical")
    .map((entry) => entry.key));
  const source = normalized.filter((member) => sourceKeys.has(memberKey(member)));
  const canonical = normalized.filter((member) => canonicalKeys.has(memberKey(member)))
    .sort((left, right) => memberKey(left).localeCompare(memberKey(right)));
  const remaining = normalized.filter((member) => !sourceKeys.has(memberKey(member)) && !canonicalKeys.has(memberKey(member)));
  return [...source, ...canonical, ...remaining];
}

function normalizeExternalHeritage(heritage, contracts) {
  let contractIndex = 0;
  return heritage.map((clause) => ({
    ...clause,
    types: (clause.types ?? []).map((type) =>
      normalizeExternalTypeDescriptor(type, contracts[contractIndex++])),
  }));
}

function normalizePointerMethodSetDescriptor(descriptor, methods) {
  if (descriptor?.t !== "ref" || descriptor.args?.length !== 1 || descriptor.args[0]?.t !== "object") return descriptor;
  const evidenceByKey = new Map(methods.map((method) => [method.key, method.signature]));
  const members = (descriptor.args[0].members ?? []).map((member) => {
    const signature = evidenceByKey.get(memberKey(member));
    if (signature === undefined || member.type?.t !== "fn") return member;
    return { ...member, type: normalizeExternalCallableDescriptor(member.type, signature) };
  }).sort((left, right) => memberKey(left).localeCompare(memberKey(right)));
  return { ...descriptor, args: [{ ...descriptor.args[0], members }] };
}

function unavailableParameterName(index) {
  return `__tsgoExternalParameter${index}`;
}

function memberKey(member) {
  return `${member.kind ?? "property"}\0${member.name}`;
}

function requireSignatureEvidence(signature) {
  if (signature?.parameterNameProvenance !== "source" && signature?.parameterNameProvenance !== "unavailable") {
    throw new Error(`external Go parameter-name provenance is invalid: '${signature?.parameterNameProvenance}'`);
  }
  if (!Array.isArray(signature.parameters) || !Array.isArray(signature.results)) {
    throw new Error("external Go signature evidence is incomplete");
  }
}
