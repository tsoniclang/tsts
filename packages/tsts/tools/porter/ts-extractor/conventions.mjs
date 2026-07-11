// Configurable Go->TS porting-convention engine.
//
// Conventions are exact, scoped Go-constraint spelling mappings. Runtime/type
// representation differences are never global conventions: they require a
// local snapshotted @tsgo-override on every affected declaration.
//
// Config shape:
//   "signatureCheck": { "conventions": {
//     "equivalences": [
//       { "as": "<token>", "match": [ {"id":"full/module.ts::Type"}, {"kw":"number"} ] }
//     ],
//   } }

// `c` is the conventions config object (profile.conventions).
import { descriptorShapeIssue } from "./type-descriptors/schema.mjs";

export function loadConventions(c = {}) {
  requireExactKeys(c, new Set(["goConstraintId", "equivalences"]), "signatureCheck.conventions", false);
  if (typeof c.goConstraintId !== "string" || !c.goConstraintId.includes("::")) {
    throw new Error("signatureCheck.conventions.goConstraintId must be one full module/name identity");
  }
  const equivalences = (c.equivalences ?? []).map((rule, ruleIndex) => {
    requireExactKeys(rule, new Set(["as", "scope", "match"]), `signature equivalence #${ruleIndex}`);
    if (typeof rule?.as !== "string" || rule.as === "") throw new Error(`signature equivalence #${ruleIndex} has no token`);
    if (!new Set(["constraint", "type"]).has(rule.scope)) throw new Error(`signature equivalence '${rule.as}' has invalid scope`);
    if (!Array.isArray(rule.match) || rule.match.length < 2) throw new Error(`signature equivalence '${rule.as}' must contain at least two exact forms`);
    const match = rule.match.map((predicate, predicateIndex) => validatePredicate(predicate, rule.as, predicateIndex));
    return { as: rule.as, match, scope: rule.scope };
  });
  return {
    goConstraintId: c.goConstraintId,
    // Each equivalence is SCOPED: "constraint" rules apply only when comparing
    // type-parameter constraints (so a Go numeric constraint can map to `number`
    // WITHOUT making a param `x: int` equal `x: number`); "type" rules apply to
    // ordinary positions. Scope is always explicit in the current contract.
    equivalences,
  };
}

function validatePredicate(predicate, token, index) {
  requireExactKeys(predicate, new Set(["id", "kw"]), `signature equivalence '${token}' predicate #${index}`, false);
  const keys = Object.keys(predicate);
  if (keys.length !== 1 || !new Set(["id", "kw"]).has(keys[0])) {
    throw new Error(`signature equivalence '${token}' predicate #${index} must contain exactly one of id or kw`);
  }
  const key = keys[0];
  const value = predicate[key];
  if (typeof value !== "string" || value === "") throw new Error(`signature equivalence '${token}' predicate #${index}.${key} must be non-empty`);
  if (key === "id" && !value.includes("::")) throw new Error(`signature equivalence '${token}' predicate #${index}.id must be a full identity`);
  return { [key]: value };
}

function requireExactKeys(value, allowed, label, requireAll = true) {
  if (value === null || typeof value !== "object" || Array.isArray(value) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error(`${label} must be a plain object`);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
  })) throw new Error(`${label} must contain only enumerable own data properties`);
  const unknown = keys.filter((key) => !allowed.has(key)).map(String).sort();
  if (unknown.length > 0) throw new Error(`${label} contains unknown current-contract key(s): ${unknown.join(", ")}`);
  if (!requireAll) return;
  const missing = [...allowed].filter((key) => !Object.hasOwn(value, key));
  if (missing.length > 0) throw new Error(`${label} is missing current-contract key(s): ${missing.join(", ")}`);
}

function matchesPredicate(d, p) {
  if (p.kw !== undefined) return d.t === "kw" && d.kw === p.kw;
  if (p.id !== undefined) return d.t === "ref" && d.id === p.id;
  return false;
}

function isGoConstraint(d, conv) {
  return d.t === "ref" && d.id === conv.goConstraintId && d.args.length === 1 &&
    d.args[0].t === "literal" && d.args[0].kind === "string";
}
function literalText(d) {
  return d?.t === "literal" && d.kind === "string" ? d.value : undefined;
}

function goConstraintText(d, conv) {
  if (isGoConstraint(d, conv)) return literalText(d.args[0]);
  if (d.t === "intersect") {
    const carrier = d.members.find((member) => isGoConstraint(member, conv));
    return carrier ? literalText(carrier.args[0]) : undefined;
  }
  return undefined;
}

function normalizeGoConstraint(d, conv) {
  const constraintText = goConstraintText(d, conv);
  if (!constraintText) return undefined;
  const marker = { t: "conv", token: `go-constraint:${constraintText}` };
  if (d.t !== "intersect") return marker;
  const carriers = d.members.filter((member) => !isGoConstraint(member, conv));
  return carriers.length === 0 ? marker : { t: "intersect", members: [marker, ...carriers] };
}

// Recursively normalize a type descriptor under the active conventions.
// `context` is "type" (ordinary positions) or "constraint" (type-param bounds);
// structural shape rules apply only to "type"; equivalences apply only to their
// own scope. Children are always normalized in "type" context (a constraint's
// inner types are ordinary types).
export function normalizeDescriptor(d, conv, context = "type") {
  if (!d || typeof d !== "object") return d;
  if (descriptorShapeIssue(d) !== undefined) return d;
  // Normalize children first (inner types are ordinary positions).
  let n;
  switch (d.t) {
    case "ref":
      n = { t: "ref", id: d.id, args: d.args.map((a) => normalizeDescriptor(a, conv, "type")) };
      break;
    case "array":
      n = { t: "array", element: normalizeDescriptor(d.element, conv, "type") };
      break;
    case "tuple":
      n = { t: "tuple", elements: d.elements.map((e) => normalizeDescriptor(e, conv, "type")) };
      break;
    case "namedTuple":
    case "optional":
    case "rest":
    case "operator":
      n = { ...d, type: normalizeDescriptor(d.type, conv, "type") };
      break;
    case "union":
    case "intersect":
      n = { t: d.t, members: d.members.map((m) => normalizeDescriptor(m, conv, "type")) };
      break;
    case "fn":
    case "constructor":
      n = {
        ...d,
        params: d.params.map((p) => ({ ...p, type: normalizeDescriptor(p.type, conv, "type") })),
        ret: normalizeDescriptor(d.ret, conv, "type"),
        typeParams: d.typeParams.map((p) => normalizeTypeParameter(p, conv)),
      };
      break;
    case "object":
      n = {
        t: "object",
        members: d.members.map((m) => m.unsupported ? m : { ...m, type: normalizeDescriptor(m.type, conv, "type") }),
      };
      break;
    case "goApprox":
      n = { t: "goApprox", type: normalizeDescriptor(d.type, conv, "type") };
      break;
    case "predicate":
      n = { ...d, type: normalizeDescriptor(d.type, conv, "type") };
      break;
    case "query":
      n = { ...d, args: d.args.map((argument) => normalizeDescriptor(argument, conv, "type")) };
      break;
    case "conditional":
      n = {
        ...d,
        check: normalizeDescriptor(d.check, conv, "type"),
        extends: normalizeDescriptor(d.extends, conv, "type"),
        trueType: normalizeDescriptor(d.trueType, conv, "type"),
        falseType: normalizeDescriptor(d.falseType, conv, "type"),
      };
      break;
    case "infer":
      n = { ...d, parameter: normalizeTypeParameter(d.parameter, conv) };
      break;
    case "indexed":
      n = {
        ...d,
        object: normalizeDescriptor(d.object, conv, "type"),
        index: normalizeDescriptor(d.index, conv, "type"),
      };
      break;
    case "mapped":
      n = {
        ...d,
        typeParam: normalizeTypeParameter(d.typeParam, conv),
        nameType: normalizeDescriptor(d.nameType, conv, "type"),
        valueType: normalizeDescriptor(d.valueType, conv, "type"),
        members: d.members.map((member) => normalizeMember(member, conv)),
      };
      break;
    case "template":
      n = { ...d, spans: d.spans.map((span) => ({ ...span, type: normalizeDescriptor(span.type, conv, "type") })) };
      break;
    case "import":
      n = {
        ...d,
        argument: normalizeDescriptor(d.argument, conv, "type"),
        args: d.args.map((argument) => normalizeDescriptor(argument, conv, "type")),
        attributes: d.attributes === null ? null : {
          ...d.attributes,
          entries: d.attributes.entries.map((entry) => ({ ...entry, value: normalizeDescriptor(entry.value, conv, "type") })),
        },
      };
      break;
    default:
      n = d;
  }

  if (context === "constraint") {
    const goConstraint = normalizeGoConstraint(n, conv);
    if (goConstraint) return goConstraint;
  }

  // Value-equivalence rules: collapse matching forms to a shared token, but only
  // rules whose scope matches the current context.
  for (const rule of conv.equivalences) {
    if (rule.scope === context && rule.match.some((p) => matchesPredicate(n, p))) return { t: "conv", token: rule.as };
  }
  return n;
}

function normalizeTypeParameter(parameter, conv) {
  return {
    ...parameter,
    constraint: normalizeDescriptor(parameter.constraint, conv, "constraint"),
    default: normalizeDescriptor(parameter.default, conv, "type"),
  };
}

function normalizeMember(member, conv) {
  return member.unsupported ? member : { ...member, type: normalizeDescriptor(member.type, conv, "type") };
}
