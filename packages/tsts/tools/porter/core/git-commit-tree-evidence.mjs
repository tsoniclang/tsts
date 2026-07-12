import { createHash } from "node:crypto";

const evidenceKeys = Object.freeze(["commitBodyBase64", "entries", "objectFormat", "revision", "schemaVersion"]);
const entryKeys = Object.freeze(["hash", "mode", "path", "type"]);
const leafModes = new Set(["100644", "100755", "120000", "160000"]);

export function buildGitCommitTreeEvidence({ commitBody, entries, objectFormat, revision }) {
  if (!Buffer.isBuffer(commitBody)) throw new Error("Git commit evidence commitBody must be a Buffer");
  return requireGitCommitTreeEvidence({
    schemaVersion: 1,
    objectFormat,
    revision,
    commitBodyBase64: commitBody.toString("base64"),
    entries,
  }, "Git commit tree evidence");
}

export function requireGitCommitTreeEvidence(value, label) {
  requireExactObject(value, evidenceKeys, label);
  if (value.schemaVersion !== 1) throw new Error(`${label}.schemaVersion must be 1`);
  if (value.objectFormat !== "sha1") throw new Error(`${label}.objectFormat must be 'sha1'`);
  requireSha1(value.revision, `${label}.revision`);
  if (typeof value.commitBodyBase64 !== "string" || value.commitBodyBase64 === "") {
    throw new Error(`${label}.commitBodyBase64 must be a non-empty canonical base64 string`);
  }
  const commitBody = Buffer.from(value.commitBodyBase64, "base64");
  if (commitBody.toString("base64") !== value.commitBodyBase64) {
    throw new Error(`${label}.commitBodyBase64 must be canonical base64`);
  }
  const revision = gitObjectHash("commit", commitBody);
  if (revision !== value.revision) throw new Error(`${label}.revision does not match the supplied commit object body`);
  const rootTree = commitTreeHeader(commitBody, label);
  const entries = requireGitTreeEntries(value.entries, `${label}.entries`);
  const actualRootTree = gitTreeHash(entries);
  if (actualRootTree !== rootTree) throw new Error(`${label}.entries do not reconstruct the commit's root tree`);
  return {
    schemaVersion: 1,
    objectFormat: "sha1",
    revision,
    commitBodyBase64: value.commitBodyBase64,
    entries,
  };
}

export function requireGitTreeEntries(value, label) {
  requireDenseArray(value, label);
  const normalized = [];
  let previousPath;
  for (const [index, entry] of value.entries()) {
    const entryLabel = `${label}[${index}]`;
    requireExactObject(entry, entryKeys, entryLabel);
    if (!leafModes.has(entry.mode)) throw new Error(`${entryLabel}.mode is invalid`);
    const expectedType = entry.mode === "160000" ? "commit" : "blob";
    if (entry.type !== expectedType) throw new Error(`${entryLabel}.type must be ${expectedType} for mode ${entry.mode}`);
    requireSha1(entry.hash, `${entryLabel}.hash`);
    requireCanonicalGitPath(entry.path, `${entryLabel}.path`);
    if (previousPath !== undefined && compareGitPaths(previousPath, entry.path) >= 0) {
      throw new Error(`${label} paths must be unique and in canonical Git tree order`);
    }
    previousPath = entry.path;
    normalized.push({ mode: entry.mode, type: entry.type, hash: entry.hash, path: entry.path });
  }
  return normalized;
}

export function gitTreeHash(entries) {
  const root = treeNode();
  for (const entry of entries) {
    const segments = entry.path.split("/");
    let node = root;
    for (const segment of segments.slice(0, -1)) {
      const existingLeaf = node.leaves.get(segment);
      if (existingLeaf !== undefined) throw new Error(`Git tree path '${entry.path}' traverses leaf '${segment}'`);
      const child = node.directories.get(segment) ?? treeNode();
      node.directories.set(segment, child);
      node = child;
    }
    const basename = segments.at(-1);
    if (node.directories.has(basename)) throw new Error(`Git tree path '${entry.path}' collides with a directory`);
    if (node.leaves.has(basename)) throw new Error(`Git tree path '${entry.path}' is duplicated`);
    node.leaves.set(basename, entry);
  }
  return hashTreeNode(root);
}

export function gitObjectHash(type, contents) {
  if (type !== "blob" && type !== "tree" && type !== "commit" && type !== "tag") {
    throw new Error(`unsupported Git object type '${type}'`);
  }
  if (!Buffer.isBuffer(contents)) throw new Error("Git object contents must be a Buffer");
  const header = Buffer.from(`${type} ${contents.length}\0`, "utf8");
  return createHash("sha1").update(header).update(contents).digest("hex");
}

function hashTreeNode(node) {
  const records = [];
  for (const [name, leaf] of node.leaves) records.push({ name, mode: leaf.mode, hash: leaf.hash, directory: false });
  for (const [name, child] of node.directories) records.push({ name, mode: "40000", hash: hashTreeNode(child), directory: true });
  records.sort((left, right) => compareTreeNames(left.name, left.directory, right.name, right.directory));
  const chunks = [];
  for (const record of records) {
    chunks.push(Buffer.from(`${record.mode} ${record.name}\0`, "utf8"));
    chunks.push(Buffer.from(record.hash, "hex"));
  }
  return gitObjectHash("tree", Buffer.concat(chunks));
}

function treeNode() {
  return { directories: new Map(), leaves: new Map() };
}

function commitTreeHeader(commitBody, label) {
  const lineEnd = commitBody.indexOf(0x0a);
  if (lineEnd < 0) throw new Error(`${label}.commitBodyBase64 has no commit headers`);
  const firstLine = commitBody.subarray(0, lineEnd).toString("ascii");
  const match = /^tree ([0-9a-f]{40})$/.exec(firstLine);
  if (match === null) throw new Error(`${label}.commitBodyBase64 must begin with one SHA-1 tree header`);
  return match[1];
}

function compareGitPaths(left, right) {
  const leftSegments = left.split("/");
  const rightSegments = right.split("/");
  const limit = Math.min(leftSegments.length, rightSegments.length);
  for (let index = 0; index < limit; index++) {
    const comparison = compareTreeNames(
      leftSegments[index],
      index < leftSegments.length - 1,
      rightSegments[index],
      index < rightSegments.length - 1,
    );
    if (comparison !== 0) return comparison;
  }
  return leftSegments.length - rightSegments.length;
}

function compareTreeNames(leftName, leftDirectory, rightName, rightDirectory) {
  return Buffer.compare(
    Buffer.from(`${leftName}${leftDirectory ? "/" : ""}`, "utf8"),
    Buffer.from(`${rightName}${rightDirectory ? "/" : ""}`, "utf8"),
  );
}

function requireCanonicalGitPath(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\\") || value.includes("\0") ||
      value.split("/").some((segment) => segment === "" || segment === "." || segment === "..") ||
      Buffer.from(value, "utf8").toString("utf8") !== value) {
    throw new Error(`${label} must be one canonical UTF-8 Git path`);
  }
}

function requireSha1(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{40}$/.test(value)) throw new Error(`${label} must be a lowercase SHA-1 object id`);
}

function requireExactObject(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new Error(`${label} must be one plain object`);
  }
  const actual = [];
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new Error(`${label} must contain only enumerable own data properties`);
    }
    actual.push(key);
  }
  actual.sort();
  const expected = [...expectedKeys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
}

function requireDenseArray(value, label) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) throw new Error(`${label} must be one array`);
  const keys = Reflect.ownKeys(value);
  if (keys.length !== value.length + 1 || keys.some((key) => key !== "length" && (!/^\d+$/.test(String(key)) || Number(key) >= value.length))) {
    throw new Error(`${label} must be a dense array with no extra properties`);
  }
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor?.enumerable !== true || !("value" in descriptor)) throw new Error(`${label}[${index}] must be an enumerable own data property`);
  }
}
