export interface DiffLine {
  readonly kind: "same" | "added" | "removed";
  readonly text: string;
}

export interface DiffEntry {
  readonly content?: string;
  readonly mTime?: number;
  readonly isWritten?: boolean;
  readonly symlinkTarget?: string;
}

export interface Snapshot {
  readonly snap: ReadonlyMap<string, DiffEntry>;
  readonly defaultLibs: ReadonlySet<string>;
}

export interface FsDifferHost {
  entries(): Iterable<readonly [string, DiffEntry]>;
}

export class FSDiffer {
  private readonly host: FsDifferHost;
  private readonly defaultLibsProvider: (() => ReadonlySet<string>) | undefined;
  private readonly writtenFiles: Set<string>;
  private serializedDiffValue: Snapshot | undefined;

  constructor(
    host: FsDifferHost,
    defaultLibs?: () => ReadonlySet<string>,
    writtenFiles: Set<string> = new Set(),
  ) {
    this.host = host;
    this.defaultLibsProvider = defaultLibs;
    this.writtenFiles = writtenFiles;
  }

  serializedDiff(): Snapshot | undefined {
    return this.serializedDiffValue;
  }

  baselineFSWithDiff(): string {
    const snap = new Map<string, DiffEntry>();
    const diffs = new Map<string, string>();
    for (const [path, file] of this.host.entries()) {
      const entry = normalizeEntry(file, this.writtenFiles.has(path));
      snap.set(path, entry);
      this.addFsEntryDiff(diffs, entry, path);
    }
    if (this.serializedDiffValue !== undefined) {
      for (const path of this.serializedDiffValue.snap.keys()) {
        if (!snap.has(path)) this.addFsEntryDiff(diffs, undefined, path);
      }
    }
    const defaultLibs = new Set(this.defaultLibsProvider?.() ?? []);
    this.serializedDiffValue = { snap, defaultLibs };
    const lines: string[] = [];
    for (const path of [...diffs.keys()].sort()) {
      lines.push(`//// [${path}] ${diffs.get(path)}`);
    }
    this.writtenFiles.clear();
    return lines.join("\n") + "\n";
  }

  addFsEntryDiff(diffs: Map<string, string>, newEntry: DiffEntry | undefined, path: string): void {
    const oldEntry = this.serializedDiffValue?.snap.get(path);
    const oldDefaultLibs = this.serializedDiffValue?.defaultLibs;
    const currentDefaultLibs = this.defaultLibsProvider?.();
    if (oldEntry === undefined) {
      if (currentDefaultLibs?.has(path) === true) return;
      if (newEntry?.symlinkTarget !== undefined) diffs.set(path, `-> ${newEntry.symlinkTarget} *new*`);
      else diffs.set(path, `*new* \n${newEntry?.content ?? ""}`);
    } else if (newEntry === undefined) {
      diffs.set(path, "*deleted*");
    } else if ((newEntry.content ?? "") !== (oldEntry.content ?? "")) {
      diffs.set(path, `*modified* \n${newEntry.content ?? ""}`);
    } else if (newEntry.isWritten === true) {
      diffs.set(path, "*rewrite with same content*");
    } else if ((newEntry.mTime ?? 0) !== (oldEntry.mTime ?? 0)) {
      diffs.set(path, "*mTime changed*");
    } else if (oldDefaultLibs?.has(path) === true && currentDefaultLibs?.has(path) !== true) {
      diffs.set(path, `*Lib*\n${newEntry.content ?? ""}`);
    }
  }
}

const internalSymbolRegex = /\uFFFD@[^@]+@\d+/g;

export function sanitizeInternalSymbolName(text: string): string {
  if (!text.includes("\uFFFD@")) return text;
  return text.replace(internalSymbolRegex, (match) => {
    const idStart = match.lastIndexOf("@");
    return match.slice(0, idStart) + "@<symbolId>";
  });
}

export function diffLines(actual: readonly string[], expected: readonly string[]): readonly DiffLine[] {
  const out: DiffLine[] = [];
  let left = 0;
  let right = 0;
  while (left < actual.length || right < expected.length) {
    if (actual[left] === expected[right]) {
      out.push({ kind: "same", text: actual[left] ?? "" });
      left += 1;
      right += 1;
      continue;
    }
    if (right < expected.length) {
      out.push({ kind: "removed", text: expected[right]! });
      right += 1;
    }
    if (left < actual.length) {
      out.push({ kind: "added", text: actual[left]! });
      left += 1;
    }
  }
  return out;
}

export function formatDiff(diff: readonly DiffLine[]): string {
  return diff
    .map((line) => `${line.kind === "same" ? " " : line.kind === "added" ? "+" : "-"} ${line.text}`)
    .join("\n");
}

function normalizeEntry(entry: DiffEntry, isWritten: boolean): DiffEntry {
  if (entry.symlinkTarget !== undefined) return { symlinkTarget: entry.symlinkTarget };
  return {
    content: sanitizeInternalSymbolName(entry.content ?? ""),
    mTime: entry.mTime ?? 0,
    isWritten: entry.isWritten === true || isWritten,
  };
}
