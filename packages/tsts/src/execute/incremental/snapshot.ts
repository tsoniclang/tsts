export interface FileInfo {
  readonly version: string;
  readonly signature: string;
  readonly affectsGlobalScope: boolean;
  readonly impliedNodeFormat: string | undefined;
}

export enum SnapshotFileEmitKind {
  None = 0,
  Js = 1 << 0,
  JsMap = 1 << 1,
  JsInlineMap = 1 << 2,
  DtsErrors = 1 << 3,
  DtsEmit = 1 << 4,
  DtsMap = 1 << 5,
  Dts = DtsErrors | DtsEmit,
  AllJs = Js | JsMap | JsInlineMap,
  AllDtsEmit = DtsEmit | DtsMap,
  AllDts = Dts | DtsMap,
  All = AllJs | AllDts,
}

export interface EmitOptions {
  readonly sourceMap: boolean;
  readonly inlineSourceMap: boolean;
  readonly declaration: boolean;
  readonly composite: boolean;
  readonly declarationMap: boolean;
  readonly emitDeclarationOnly: boolean;
}

export interface EmitSignature {
  readonly signature: string | undefined;
  readonly signatureWithDifferentOptions: readonly string[] | undefined;
}

export interface BuildInfoDiagnosticWithFileName {
  readonly file: string | undefined;
  readonly noFile: boolean;
  readonly pos: number;
  readonly end: number;
  readonly code: number;
  readonly category: string;
  readonly messageKey: string;
  readonly messageArgs: readonly string[];
  readonly messageChain: readonly BuildInfoDiagnosticWithFileName[];
  readonly relatedInformation: readonly BuildInfoDiagnosticWithFileName[];
  readonly reportsUnnecessary: boolean;
  readonly reportsDeprecated: boolean;
  readonly skippedOnNoEmit: boolean;
  readonly repopulateInfo: unknown;
}

export interface DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic = unknown> {
  readonly diagnostics: readonly Diagnostic[];
  readonly buildInfoDiagnostics: readonly BuildInfoDiagnosticWithFileName[];
}

export interface ProgramSnapshot<Diagnostic = unknown> {
  readonly version: string;
  readonly fileInfos: ReadonlyMap<string, FileInfo>;
  readonly options: unknown;
  readonly root: readonly string[];
  readonly referencedBy?: ReadonlyMap<string, ReadonlySet<string>>;
  readonly references?: ReadonlyMap<string, ReadonlySet<string>>;
  readonly changedFilesSet?: ReadonlySet<string>;
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly emitDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly latestChangedDtsFile: string | undefined;
  readonly errors: readonly Diagnostic[];
  readonly checkPending: boolean;
}

export function computeHash(text: string, hashWithText: boolean): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hash = `${(h2 >>> 0).toString(16).padStart(8, "0")}${(h1 >>> 0).toString(16).padStart(8, "0")}`;
  return hashWithText ? `${hash}-${text}` : hash;
}

export function getFileEmitKind(options: EmitOptions): SnapshotFileEmitKind {
  let result = SnapshotFileEmitKind.Js;
  if (options.sourceMap) result |= SnapshotFileEmitKind.JsMap;
  if (options.inlineSourceMap) result |= SnapshotFileEmitKind.JsInlineMap;
  if (options.declaration || options.composite) result |= SnapshotFileEmitKind.Dts;
  if (options.declarationMap) result |= SnapshotFileEmitKind.DtsMap;
  if (options.emitDeclarationOnly) result &= SnapshotFileEmitKind.AllDts;
  return result;
}

export function getPendingEmitKind(emitKind: SnapshotFileEmitKind, oldEmitKind: SnapshotFileEmitKind): SnapshotFileEmitKind {
  if (oldEmitKind === emitKind) return SnapshotFileEmitKind.None;
  if (oldEmitKind === 0 || emitKind === 0) return emitKind;
  const diff = oldEmitKind ^ emitKind;
  let result = SnapshotFileEmitKind.None;
  if ((diff & SnapshotFileEmitKind.AllJs) !== 0) result |= emitKind & SnapshotFileEmitKind.AllJs;
  if ((diff & SnapshotFileEmitKind.DtsErrors) !== 0) result |= emitKind & SnapshotFileEmitKind.AllDts;
  if ((diff & SnapshotFileEmitKind.AllDtsEmit) !== 0) result |= emitKind & SnapshotFileEmitKind.AllDtsEmit;
  return result;
}

export function getPendingEmitKindWithOptions(options: EmitOptions, oldOptions: EmitOptions): SnapshotFileEmitKind {
  return getPendingEmitKind(getFileEmitKind(options), getFileEmitKind(oldOptions));
}

export function getNewEmitSignature(signature: EmitSignature, oldOptions: EmitOptions, newOptions: EmitOptions): EmitSignature {
  if (oldOptions.declarationMap === newOptions.declarationMap) return signature;
  if (signature.signatureWithDifferentOptions === undefined) {
    return { signature: undefined, signatureWithDifferentOptions: signature.signature === undefined ? [] : [signature.signature] };
  }
  return { signature: signature.signatureWithDifferentOptions[0], signatureWithDifferentOptions: undefined };
}

export function createProgramSnapshot<Diagnostic>(snapshot: ProgramSnapshot<Diagnostic>): ProgramSnapshot<Diagnostic> {
  const out: ProgramSnapshot<Diagnostic> = {
    version: snapshot.version,
    fileInfos: new Map(snapshot.fileInfos),
    options: snapshot.options,
    root: [...snapshot.root],
    semanticDiagnosticsPerFile: new Map(snapshot.semanticDiagnosticsPerFile),
    emitDiagnosticsPerFile: new Map(snapshot.emitDiagnosticsPerFile),
    pendingEmit: new Map(snapshot.pendingEmit),
    latestChangedDtsFile: snapshot.latestChangedDtsFile,
    errors: [...snapshot.errors],
    checkPending: snapshot.checkPending,
  };
  if (snapshot.referencedBy !== undefined) Object.assign(out, { referencedBy: cloneSetMap(snapshot.referencedBy) });
  if (snapshot.references !== undefined) Object.assign(out, { references: cloneSetMap(snapshot.references) });
  if (snapshot.changedFilesSet !== undefined) Object.assign(out, { changedFilesSet: new Set(snapshot.changedFilesSet) });
  return out;
}

export function cloneSetMap(map: ReadonlyMap<string, ReadonlySet<string>>): ReadonlyMap<string, ReadonlySet<string>> {
  const clone = new Map<string, ReadonlySet<string>>();
  for (const [key, value] of map) clone.set(key, new Set(value));
  return clone;
}

export function buildReferencedByMap(references: ReadonlyMap<string, ReadonlySet<string>>): ReadonlyMap<string, ReadonlySet<string>> {
  const referencedBy = new Map<string, Set<string>>();
  for (const [file, refs] of references) {
    for (const ref of refs) {
      let set = referencedBy.get(ref);
      if (set === undefined) {
        set = new Set<string>();
        referencedBy.set(ref, set);
      }
      set.add(file);
    }
  }
  return referencedBy;
}

export function withReferenceMaps<Diagnostic>(
  snapshot: ProgramSnapshot<Diagnostic>,
  references: ReadonlyMap<string, ReadonlySet<string>>,
): ProgramSnapshot<Diagnostic> {
  return createProgramSnapshot({
    ...snapshot,
    references,
    referencedBy: buildReferencedByMap(references),
  });
}

export function changedFiles(oldSnapshot: ProgramSnapshot, newSnapshot: ProgramSnapshot): readonly string[] {
  const changed: string[] = [];
  for (const [file, info] of newSnapshot.fileInfos) {
    const oldInfo = oldSnapshot.fileInfos.get(file);
    if (oldInfo === undefined || oldInfo.version !== info.version || oldInfo.signature !== info.signature) {
      changed.push(file);
    }
  }
  for (const file of oldSnapshot.fileInfos.keys()) {
    if (!newSnapshot.fileInfos.has(file)) changed.push(file);
  }
  return changed;
}
