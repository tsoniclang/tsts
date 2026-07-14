const booleanOption = "boolean";
const valueOption = "value";

const commandSchemas = Object.freeze({
  delta: schema(
    { from: valueOption, to: valueOption, out: valueOption },
    { required: ["from", "out", "to"] },
  ),
  "delta-verify": schema(
    { dir: valueOption, from: valueOption, to: valueOption },
    { required: ["dir", "from", "to"] },
  ),
  "generated-source-coverage": schema({ force: booleanOption }),
  bundled: schema({ write: booleanOption }),
  unicode: schema({ write: booleanOption }),
  scan: schema({}),
  status: schema({}),
  verify: schema({}),
  "reconcile-metadata": schema({ write: booleanOption, json: booleanOption }),
  "sig-check": schema({ id: valueOption, json: booleanOption, "no-gate": booleanOption }),
  scaffold: schema(
    {
      write: booleanOption,
      all: booleanOption,
      append: booleanOption,
      limit: valueOption,
      "go-path": valueOption,
      kind: valueOption,
    },
    {
      conflicts: [["all", "limit"]],
      requires: [["append", "write"]],
    },
  ),
  facades: schema(
    { check: booleanOption, out: valueOption, force: booleanOption },
    { conflicts: [["check", "out"], ["check", "force"]] },
  ),
  "large-files": schema(
    { "write-draft": booleanOption, force: booleanOption },
    {
      requires: [["force", "write-draft"]],
    },
  ),
  ast: schema(
    { write: booleanOption, force: booleanOption },
    { requires: [["force", "write"]] },
  ),
  diagnostics: schema(
    { write: booleanOption, force: booleanOption },
    { requires: [["force", "write"]] },
  ),
  "skeleton-check": schema({ "no-emit-temp": booleanOption, "no-compile": booleanOption }),
});

export const porterCommandNames = Object.freeze(Object.keys(commandSchemas));

export function parseCommandOptions(command, args) {
  if (typeof command !== "string" || !Object.hasOwn(commandSchemas, command)) {
    throw new Error(`unknown Porter command '${String(command)}'. Expected ${porterCommandNames.join(", ")}.`);
  }
  if (!Array.isArray(args)) throw new TypeError("Porter command arguments must be an array");

  const commandSchema = commandSchemas[command];
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (typeof argument !== "string") throw new TypeError(`porter ${command}: command arguments must be strings`);
    if (!argument.startsWith("--") || argument === "--") {
      throw new Error(`porter ${command}: unexpected positional argument '${argument}'`);
    }

    const name = argument.slice(2);
    if (!Object.hasOwn(commandSchema.options, name)) {
      throw new Error(`porter ${command}: unknown option '--${name}'`);
    }
    if (Object.hasOwn(options, name)) {
      throw new Error(`porter ${command}: duplicate option '--${name}'`);
    }

    const next = args[index + 1];
    if (commandSchema.options[name] === booleanOption) {
      if (next !== undefined && (typeof next !== "string" || !next.startsWith("--"))) {
        throw new Error(`porter ${command}: boolean option '--${name}' does not take a value`);
      }
      options[name] = true;
      continue;
    }

    if (next === undefined || typeof next !== "string" || next.startsWith("--") || next.trim() === "") {
      throw new Error(`porter ${command}: option '--${name}' requires a non-empty value`);
    }
    options[name] = next;
    index++;
  }

  for (const name of commandSchema.required) {
    if (!Object.hasOwn(options, name)) {
      throw new Error(`porter ${command}: required option '--${name}' is missing`);
    }
  }
  for (const [left, right] of commandSchema.conflicts) {
    if (Object.hasOwn(options, left) && Object.hasOwn(options, right)) {
      throw new Error(`porter ${command}: options '--${left}' and '--${right}' cannot be used together`);
    }
  }
  for (const [name, requirement] of commandSchema.requires) {
    if (Object.hasOwn(options, name) && !Object.hasOwn(options, requirement)) {
      throw new Error(`porter ${command}: option '--${name}' requires '--${requirement}'`);
    }
  }
  return options;
}

function schema(options, constraints = {}) {
  return Object.freeze({
    options: Object.freeze({ ...options }),
    required: Object.freeze([...(constraints.required ?? [])]),
    conflicts: freezePairs(constraints.conflicts),
    requires: freezePairs(constraints.requires),
  });
}

function freezePairs(pairs = []) {
  return Object.freeze(pairs.map((pair) => Object.freeze([...pair])));
}
