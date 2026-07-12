const DRAFT_07 = "http://json-schema.org/draft-07/schema#";
const SUPPORTED_KEYWORDS = new Set([
  "$ref",
  "$schema",
  "additionalProperties",
  "definitions",
  "description",
  "enum",
  "items",
  "maxItems",
  "minItems",
  "oneOf",
  "properties",
  "required",
  "title",
  "type",
]);
const SUPPORTED_TYPES = new Set(["array", "boolean", "integer", "null", "number", "object", "string"]);

export function validateJsonSchemaDocument(document, schema, documentName, schemaName) {
  assertSupportedSchema(schema);
  const failures = validateValue(document, schema, schema, "$", []);
  if (failures.length === 0) return;
  const shown = failures.slice(0, 12);
  const omitted = failures.length - shown.length;
  const suffix = omitted === 0 ? "" : `\n... ${omitted} more schema violation(s)`;
  throw new Error(`${documentName} does not conform to ${schemaName}:\n${shown.join("\n")}${suffix}`);
}

function assertSupportedSchema(schema) {
  assertSchemaNode(schema, "$", schema);
  if (schema.$schema !== DRAFT_07) {
    throw new Error(`AST JSON schema dialect must be exactly '${DRAFT_07}', got ${JSON.stringify(schema.$schema)}`);
  }
}

function assertSchemaNode(schema, schemaPath, rootSchema) {
  if (!isObject(schema)) throw new Error(`AST JSON schema node ${schemaPath} must be an object`);
  for (const keyword of Object.keys(schema)) {
    if (!SUPPORTED_KEYWORDS.has(keyword)) {
      throw new Error(`AST JSON schema node ${schemaPath} uses unsupported keyword '${keyword}'`);
    }
  }
  if (schema.$ref !== undefined) {
    if (typeof schema.$ref !== "string" || !schema.$ref.startsWith("#/")) {
      throw new Error(`AST JSON schema reference at ${schemaPath} must be a local JSON Pointer`);
    }
    resolveReference(rootSchema, schema.$ref);
  }
  if (schema.type !== undefined && (typeof schema.type !== "string" || !SUPPORTED_TYPES.has(schema.type))) {
    throw new Error(`AST JSON schema type at ${schemaPath} is unsupported: ${JSON.stringify(schema.type)}`);
  }
  if (schema.required !== undefined) {
    if (!Array.isArray(schema.required) || schema.required.some((name) => typeof name !== "string")) {
      throw new Error(`AST JSON schema required at ${schemaPath} must be an array of strings`);
    }
    if (new Set(schema.required).size !== schema.required.length) {
      throw new Error(`AST JSON schema required at ${schemaPath} contains duplicate names`);
    }
  }
  if (schema.enum !== undefined && (!Array.isArray(schema.enum) || schema.enum.length === 0)) {
    throw new Error(`AST JSON schema enum at ${schemaPath} must be a non-empty array`);
  }
  assertItemLimit(schema.minItems, "minItems", schemaPath);
  assertItemLimit(schema.maxItems, "maxItems", schemaPath);
  if (schema.minItems !== undefined && schema.maxItems !== undefined && schema.minItems > schema.maxItems) {
    throw new Error(`AST JSON schema minItems exceeds maxItems at ${schemaPath}`);
  }
  if (schema.properties !== undefined) {
    assertSchemaMap(schema.properties, `${schemaPath}/properties`, rootSchema);
  }
  if (schema.definitions !== undefined) {
    assertSchemaMap(schema.definitions, `${schemaPath}/definitions`, rootSchema);
  }
  if (schema.additionalProperties !== undefined) {
    if (schema.additionalProperties !== true && schema.additionalProperties !== false) {
      assertSchemaNode(schema.additionalProperties, `${schemaPath}/additionalProperties`, rootSchema);
    }
  }
  if (schema.items !== undefined) {
    assertSchemaNode(schema.items, `${schemaPath}/items`, rootSchema);
  }
  if (schema.oneOf !== undefined) {
    if (!Array.isArray(schema.oneOf) || schema.oneOf.length === 0) {
      throw new Error(`AST JSON schema oneOf at ${schemaPath} must be a non-empty array`);
    }
    for (const [index, alternative] of schema.oneOf.entries()) {
      assertSchemaNode(alternative, `${schemaPath}/oneOf/${index}`, rootSchema);
    }
  }
}

function assertSchemaMap(value, schemaPath, rootSchema) {
  if (!isObject(value)) throw new Error(`AST JSON schema map ${schemaPath} must be an object`);
  for (const [name, child] of Object.entries(value)) {
    assertSchemaNode(child, `${schemaPath}/${escapePointer(name)}`, rootSchema);
  }
}

function assertItemLimit(value, keyword, schemaPath) {
  if (value !== undefined && (!Number.isInteger(value) || value < 0)) {
    throw new Error(`AST JSON schema ${keyword} at ${schemaPath} must be a non-negative integer`);
  }
}

function validateValue(value, schema, rootSchema, valuePath, referenceStack) {
  if (schema.$ref !== undefined) {
    if (referenceStack.includes(schema.$ref)) {
      throw new Error(`AST JSON schema contains a recursive reference cycle through '${schema.$ref}'`);
    }
    return validateValue(
      value,
      resolveReference(rootSchema, schema.$ref),
      rootSchema,
      valuePath,
      [...referenceStack, schema.$ref],
    );
  }

  const failures = [];
  if (schema.oneOf !== undefined) {
    const matches = schema.oneOf.filter((alternative) => (
      validateValue(value, alternative, rootSchema, valuePath, referenceStack).length === 0
    )).length;
    if (matches !== 1) failures.push(`${valuePath} must match exactly one oneOf alternative; matched ${matches}`);
  }
  if (schema.enum !== undefined && !schema.enum.some((candidate) => jsonEqual(candidate, value))) {
    failures.push(`${valuePath} must be one of ${schema.enum.map((candidate) => JSON.stringify(candidate)).join(", ")}`);
  }
  if (schema.type !== undefined && !matchesType(value, schema.type)) {
    failures.push(`${valuePath} must be ${article(schema.type)} ${schema.type}; got ${jsonType(value)}`);
    return failures;
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      failures.push(`${valuePath} must contain at least ${schema.minItems} item(s); got ${value.length}`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      failures.push(`${valuePath} must contain at most ${schema.maxItems} item(s); got ${value.length}`);
    }
    if (schema.items !== undefined) {
      for (const [index, item] of value.entries()) {
        failures.push(...validateValue(item, schema.items, rootSchema, `${valuePath}/${index}`, referenceStack));
      }
    }
  }

  if (isObject(value)) {
    for (const requiredName of schema.required ?? []) {
      if (!Object.hasOwn(value, requiredName)) {
        failures.push(`${valuePath} is missing required property '${requiredName}'`);
      }
    }
    const properties = schema.properties ?? {};
    for (const [name, propertySchema] of Object.entries(properties)) {
      if (Object.hasOwn(value, name)) {
        failures.push(...validateValue(value[name], propertySchema, rootSchema, `${valuePath}/${escapePointer(name)}`, referenceStack));
      }
    }
    for (const [name, propertyValue] of Object.entries(value)) {
      if (Object.hasOwn(properties, name)) continue;
      if (schema.additionalProperties === false) {
        failures.push(`${valuePath} contains forbidden additional property '${name}'`);
      } else if (isObject(schema.additionalProperties)) {
        failures.push(...validateValue(
          propertyValue,
          schema.additionalProperties,
          rootSchema,
          `${valuePath}/${escapePointer(name)}`,
          referenceStack,
        ));
      }
    }
  }
  return failures;
}

function resolveReference(rootSchema, reference) {
  let current = rootSchema;
  for (const encoded of reference.slice(2).split("/")) {
    const name = encoded.replaceAll("~1", "/").replaceAll("~0", "~");
    if (!isObject(current) || !Object.hasOwn(current, name)) {
      throw new Error(`AST JSON schema reference '${reference}' does not resolve`);
    }
    current = current[name];
  }
  if (!isObject(current)) throw new Error(`AST JSON schema reference '${reference}' does not resolve to a schema object`);
  return current;
}

function matchesType(value, type) {
  switch (type) {
    case "array": return Array.isArray(value);
    case "boolean": return typeof value === "boolean";
    case "integer": return typeof value === "number" && Number.isInteger(value);
    case "null": return value === null;
    case "number": return typeof value === "number";
    case "object": return isObject(value);
    case "string": return typeof value === "string";
  }
  return false;
}

function jsonType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number" && Number.isInteger(value)) return "integer";
  return typeof value;
}

function jsonEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function article(type) {
  return type === "array" || type === "integer" || type === "object" ? "an" : "a";
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function escapePointer(value) {
  return value.replaceAll("~", "~0").replaceAll("/", "~1");
}
