// Configurable Go->TS porting-convention engine.
//
// Conventions are editable `a => b` equivalence rules in porter.config.json under
// `signatureConventions`. They normalize a type descriptor before comparison, so
// systematic porting conventions (Go constraint -> TS form, struct-keyed map ->
// string key, func field -> GoPtr<fn>, interface -> nilable, …) are ACCEPTED
// without per-unit overrides, while genuine drift still flags. The set is
// extensible: add a rule, no code change.
//
// Config shape:
//   "signatureConventions": {
//     "equivalences": [
//       { "as": "<token>", "match": [ {"name":"comparable"}, {"refName":"GoComparable"}, {"kw":"number"}, {"raw":"~uint32"}, {"rawIncludes":"~int"} ] }
//     ],
//     "structural": {
//       "acceptNullable": false,      // T | undefined  ==  T
//       "unwrapPtrFunc": true,        // GoPtr<(..)=>R>  ==  (..)=>R
//       "anyMapKey": true,            // GoMap<K,V> key compared as wildcard
//       "ptrValueEquivStruct": false  // GoPtr<X> == X  (interface/value origin)
//     }
//   }

import { terminalName } from "./ast-signatures.mjs";

// `c` is the conventions config object (profile.conventions).
export function loadConventions(c = {}) {
  return {
    equivalences: (c.equivalences ?? []).map((r) => ({ as: r.as, match: r.match ?? [] })),
    structural: {
      acceptNullable: c.structural?.acceptNullable === true,
      unwrapPtrFunc: c.structural?.unwrapPtrFunc === true,
      anyMapKey: c.structural?.anyMapKey === true,
      ptrValueEquivStruct: c.structural?.ptrValueEquivStruct === true,
      // A recognized Go constraint (one that normalizes to an `equivalences`
      // token) is acceptable even when the TS type param erases it (`<T>`).
      acceptErasedConstraints: c.structural?.acceptErasedConstraints === true,
      // The TS port may additively expose members the Go type lacks (accessor
      // aliases, computed fields). When set, extra TS members are not flagged.
      allowExtraMembers: c.structural?.allowExtraMembers === true,
    },
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

function isGoPtr(d) {
  return d.t === "ref" && terminalName(d.id) === "GoPtr" && d.args.length === 1;
}
function isGoMap(d) {
  return d.t === "ref" && terminalName(d.id) === "GoMap" && d.args.length === 2;
}

// Recursively normalize a type descriptor under the active conventions.
export function normalizeDescriptor(d, conv) {
  if (!d || typeof d !== "object") return d;
  // Normalize children first.
  let n;
  switch (d.t) {
    case "ref":
      n = { t: "ref", id: d.id, args: d.args.map((a) => normalizeDescriptor(a, conv)) };
      break;
    case "array":
      n = { t: "array", element: normalizeDescriptor(d.element, conv) };
      break;
    case "tuple":
      n = { t: "tuple", elements: d.elements.map((e) => normalizeDescriptor(e, conv)) };
      break;
    case "union":
    case "intersect":
      n = { t: d.t, members: d.members.map((m) => normalizeDescriptor(m, conv)) };
      break;
    case "fn":
      n = { t: "fn", params: d.params.map((p) => ({ ...p, type: normalizeDescriptor(p.type, conv) })), ret: normalizeDescriptor(d.ret, conv) };
      break;
    default:
      n = d;
  }

  // Structural conventions.
  const s = conv.structural;
  if (s.acceptNullable && n.t === "union") {
    const kept = n.members.filter((m) => !(m.t === "kw" && (m.kw === "undefined" || m.kw === "null")));
    n = kept.length === 1 ? kept[0] : { t: "union", members: kept };
  }
  if (s.unwrapPtrFunc && isGoPtr(n) && n.args[0].t === "fn") {
    n = n.args[0];
  }
  if (s.ptrValueEquivStruct && isGoPtr(n) && (n.args[0].t === "ref" || n.args[0].t === "raw")) {
    // Accept GoPtr<X> as X (Go interface/value -> nilable pointer in the port).
    n = n.args[0];
  }
  if (s.anyMapKey && isGoMap(n)) {
    n = { t: "ref", id: n.id, args: [{ t: "conv", token: "mapkey" }, n.args[1]] };
  }

  // Value-equivalence rules: collapse matching forms to a shared token.
  for (const rule of conv.equivalences) {
    if (rule.match.some((p) => matchesPredicate(n, p))) return { t: "conv", token: rule.as };
  }
  return n;
}
