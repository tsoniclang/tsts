// Configurable Go->TS porting-convention engine.
//
// Conventions are exact, scoped Go-constraint spelling mappings. Runtime/type
// representation differences are never global conventions: they require a
// local snapshotted @tsgo-override on every affected declaration.
//
// Config shape:
//   "signatureCheck": { "conventions": {
//     "equivalences": [
//       { "as": "<token>", "match": [ {"name":"comparable"}, {"refName":"GoComparable"}, {"kw":"number"}, {"raw":"~uint32"}, {"rawIncludes":"~int"} ] }
//     ],
//   } }

import { terminalName } from "./ast-signatures.mjs";

// `c` is the conventions config object (profile.conventions).
export function loadConventions(c = {}) {
  if (c.structural !== undefined && Object.keys(c.structural).length > 0) {
    throw new Error("signatureCheck.conventions.structural is forbidden; use exact local @tsgo-override metadata for representation differences");
  }
  return {
    // Each equivalence is SCOPED: "constraint" rules apply only when comparing
    // type-parameter constraints (so a Go numeric constraint can map to `number`
    // WITHOUT making a param `x: int` equal `x: number`); "type" rules apply to
    // ordinary positions. Default scope is "constraint" (the safe default).
    equivalences: (c.equivalences ?? []).map((r) => ({ as: r.as, match: r.match ?? [], scope: r.scope ?? "constraint" })),
  };
}

function matchesPredicate(d, p) {
  if (p.kw !== undefined) return d.t === "kw" && d.kw === p.kw;
  if (p.raw !== undefined) return d.t === "raw" && d.text === p.raw;
  if (p.rawIncludes !== undefined) return d.t === "raw" && d.text.includes(p.rawIncludes);
  if (p.name !== undefined || p.refName !== undefined) {
    const want = p.name ?? p.refName;
    return d.t === "ref" && terminalName(d.id) === want;
  }
  return false;
}

function isGoConstraint(d) {
  return d.t === "ref" && terminalName(d.id) === "GoConstraint" && d.args.length === 1 && d.args[0].t === "lit";
}
function literalText(d) {
  if (d?.t !== "lit") return undefined;
  try {
    return JSON.parse(d.text);
  } catch {
    return undefined;
  }
}

function goConstraintText(d) {
  if (d.t === "raw" && d.text.includes("~")) return d.text;
  if (isGoConstraint(d)) return literalText(d.args[0]);
  if (d.t === "intersect") {
    const carrier = d.members.find(isGoConstraint);
    return carrier ? literalText(carrier.args[0]) : undefined;
  }
  return undefined;
}

function normalizeGoConstraint(d) {
  const constraintText = goConstraintText(d);
  if (!constraintText) return undefined;
  const marker = { t: "conv", token: `go-constraint:${constraintText}` };
  if (d.t !== "intersect") return marker;
  const carriers = d.members.filter((member) => !isGoConstraint(member));
  return carriers.length === 0 ? marker : { t: "intersect", members: [marker, ...carriers] };
}

// Recursively normalize a type descriptor under the active conventions.
// `context` is "type" (ordinary positions) or "constraint" (type-param bounds);
// structural shape rules apply only to "type"; equivalences apply only to their
// own scope. Children are always normalized in "type" context (a constraint's
// inner types are ordinary types).
export function normalizeDescriptor(d, conv, context = "type") {
  if (!d || typeof d !== "object") return d;
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
    case "union":
    case "intersect":
      n = { t: d.t, members: d.members.map((m) => normalizeDescriptor(m, conv, "type")) };
      break;
    case "fn":
      n = {
        ...d,
        params: d.params.map((p) => ({ ...p, type: normalizeDescriptor(p.type, conv, "type") })),
        ret: normalizeDescriptor(d.ret, conv, "type"),
        typeParams: (d.typeParams ?? []).map((p) => ({ constraint: normalizeDescriptor(p.constraint, conv, "constraint") })),
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
    default:
      n = d;
  }

  if (context === "constraint") {
    const goConstraint = normalizeGoConstraint(n);
    if (goConstraint) return goConstraint;
  }

  // Value-equivalence rules: collapse matching forms to a shared token, but only
  // rules whose scope matches the current context.
  for (const rule of conv.equivalences) {
    if (rule.scope === context && rule.match.some((p) => matchesPredicate(n, p))) return { t: "conv", token: rule.as };
  }
  return n;
}
