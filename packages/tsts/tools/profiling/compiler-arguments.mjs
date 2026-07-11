export function compilerOptionOccurrences(args, names) {
  assertArguments(args);
  const normalizedNames = new Set(names.map(normalizeOptionName));
  const occurrences = [];
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (token === "--") {
      occurrences.push({ index, name: "--", token, inlineValue: undefined, followingValue: undefined });
      continue;
    }
    const equals = token.indexOf("=");
    const optionToken = equals < 0 ? token : token.slice(0, equals);
    const name = normalizeOptionName(optionToken);
    if (!normalizedNames.has(name)) continue;
    occurrences.push({
      index,
      name,
      token,
      inlineValue: equals < 0 ? undefined : token.slice(equals + 1),
      followingValue: equals < 0 && index + 1 < args.length ? args[index + 1] : undefined,
    });
  }
  return occurrences;
}

export function hasCompilerOption(args, names) {
  return compilerOptionOccurrences(args, names).length !== 0;
}

export function requireBooleanCompilerOption(args, names, expected, label) {
  const occurrences = compilerOptionOccurrences(args, names);
  if (occurrences.length !== 1) throw new Error(`${label} must occur exactly once`);
  const value = booleanOccurrenceValue(occurrences[0]);
  if (value !== expected) throw new Error(`${label} must be ${String(expected)}`);
}

export function requireValueCompilerOption(args, names, label) {
  const occurrences = compilerOptionOccurrences(args, names);
  if (occurrences.length !== 1) throw new Error(`${label} must occur exactly once`);
  const occurrence = occurrences[0];
  const value = occurrence.inlineValue ?? occurrence.followingValue;
  if (typeof value !== "string" || value === "" || value.startsWith("-")) throw new Error(`${label} requires one explicit value`);
  return value;
}

export function validateBenchmarkCompilerArguments(args, label) {
  assertDirectCompilerArguments(args, label);
  const projectOccurrences = compilerOptionOccurrences(args, ["-p", "--project"]);
  const noEmitOccurrences = compilerOptionOccurrences(args, ["--noEmit"]);
  const incrementalOccurrences = compilerOptionOccurrences(args, ["--incremental"]);
  const project = requireValueCompilerOption(args, ["-p", "--project"], `${label} project option`);
  requireBooleanCompilerOption(args, ["--noEmit"], true, `${label} --noEmit`);
  requireBooleanCompilerOption(args, ["--incremental"], false, `${label} --incremental`);

  const consumed = new Set();
  markValueOccurrence(consumed, projectOccurrences[0]);
  markBooleanOccurrence(consumed, noEmitOccurrences[0]);
  markBooleanOccurrence(consumed, incrementalOccurrences[0]);
  for (let index = 0; index < args.length; index += 1) {
    if (!consumed.has(index)) throw new Error(`${label} contains unsupported compiler argument '${args[index]}'`);
  }
  return project;
}

export function assertDirectCompilerArguments(args, label) {
  assertArguments(args);
  const indirect = args.find((argument) => argument === "--" || argument.startsWith("@"));
  if (indirect !== undefined) throw new Error(`${label} cannot use compiler argument indirection '${indirect}'`);
}

function booleanOccurrenceValue(occurrence) {
  const raw = occurrence.inlineValue ?? booleanFollowingValue(occurrence.followingValue);
  if (raw === undefined) return true;
  const normalized = raw.toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  throw new Error(`${occurrence.token} has invalid boolean value '${raw}'`);
}

function booleanFollowingValue(value) {
  if (typeof value !== "string") return undefined;
  const normalized = value.toLowerCase();
  return normalized === "true" || normalized === "false" ? value : undefined;
}

function markValueOccurrence(consumed, occurrence) {
  consumed.add(occurrence.index);
  if (occurrence.inlineValue === undefined) consumed.add(occurrence.index + 1);
}

function markBooleanOccurrence(consumed, occurrence) {
  consumed.add(occurrence.index);
  if (occurrence.inlineValue === undefined && booleanFollowingValue(occurrence.followingValue) !== undefined) consumed.add(occurrence.index + 1);
}

function normalizeOptionName(value) {
  if (typeof value !== "string" || value === "") throw new Error("compiler option name is invalid");
  return value.toLowerCase();
}

function assertArguments(args) {
  if (!Array.isArray(args) || !args.every((entry) => typeof entry === "string" && entry !== "" && !entry.includes("\0") && !entry.includes("\n") && !entry.includes("\r"))) throw new Error("compiler arguments are invalid");
}
