export interface ProgramSnapshotFileInfo {
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
  readonly fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>;
  readonly options: ReadonlyMap<string, unknown>;
  readonly root: readonly string[];
  readonly referencedBy: ReadonlyMap<string, ReadonlySet<string>> | undefined;
  readonly references: ReadonlyMap<string, ReadonlySet<string>> | undefined;
  readonly changedFilesSet: ReadonlySet<string> | undefined;
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly emitDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly emitSignatures: ReadonlyMap<string, EmitSignature>;
  readonly latestChangedDtsFile: string | undefined;
  readonly errors: readonly Diagnostic[];
  readonly checkPending: boolean;
}

class ProgramSnapshotData<Diagnostic> implements ProgramSnapshot<Diagnostic> {
  readonly version: string;
  readonly fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>;
  readonly options: ReadonlyMap<string, unknown>;
  readonly root: readonly string[];
  readonly referencedBy: ReadonlyMap<string, ReadonlySet<string>> | undefined;
  readonly references: ReadonlyMap<string, ReadonlySet<string>> | undefined;
  readonly changedFilesSet: ReadonlySet<string> | undefined;
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly emitDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly emitSignatures: ReadonlyMap<string, EmitSignature>;
  readonly latestChangedDtsFile: string | undefined;
  readonly errors: readonly Diagnostic[];
  readonly checkPending: boolean;

  constructor(
    version: string,
    fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>,
    options: ReadonlyMap<string, unknown>,
    root: readonly string[],
    semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
    emitDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
    pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>,
    emitSignatures: ReadonlyMap<string, EmitSignature>,
    latestChangedDtsFile: string | undefined,
    errors: readonly Diagnostic[],
    checkPending: boolean,
    referencedBy: ReadonlyMap<string, ReadonlySet<string>> | undefined = undefined,
    references: ReadonlyMap<string, ReadonlySet<string>> | undefined = undefined,
    changedFilesSet: ReadonlySet<string> | undefined = undefined,
  ) {
    this.version = version;
    this.fileInfos = fileInfos;
    this.options = options;
    this.root = root;
    this.semanticDiagnosticsPerFile = semanticDiagnosticsPerFile;
    this.emitDiagnosticsPerFile = emitDiagnosticsPerFile;
    this.pendingEmit = pendingEmit;
    this.emitSignatures = emitSignatures;
    this.latestChangedDtsFile = latestChangedDtsFile;
    this.errors = errors;
    this.checkPending = checkPending;
    this.referencedBy = referencedBy;
    this.references = references;
    this.changedFilesSet = changedFilesSet;
  }
}

export function computeHash(text: string, hashWithText: boolean): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charCodeAt(i);
    h1 = multiplySignedInt32(h1 ^ ch, 2654435761);
    h2 = multiplySignedInt32(h2 ^ ch, 1597334677);
  }
  h1 = multiplySignedInt32(h1 ^ (h1 >>> 16), 2246822507) ^ multiplySignedInt32(h2 ^ (h2 >>> 13), 3266489909);
  h2 = multiplySignedInt32(h2 ^ (h2 >>> 16), 2246822507) ^ multiplySignedInt32(h1 ^ (h1 >>> 13), 3266489909);
  const hash = `${(h2 >>> 0).toString(16).padStart(8, "0")}${(h1 >>> 0).toString(16).padStart(8, "0")}`;
  return hashWithText ? `${hash}-${text}` : hash;
}

function multiplySignedInt32(left: number, right: number): number {
  const leftLow = left & 0xffff;
  const leftHigh = left >>> 16;
  const rightLow = right & 0xffff;
  const rightHigh = right >>> 16;
  return ((leftLow * rightLow) + (((leftHigh * rightLow + leftLow * rightHigh) & 0xffff) << 16)) | 0;
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
  return createProgramSnapshotFromParts(
    snapshot.version,
    snapshot.fileInfos,
    snapshot.options,
    snapshot.root,
    snapshot.semanticDiagnosticsPerFile,
    snapshot.emitDiagnosticsPerFile,
    snapshot.pendingEmit,
    snapshot.emitSignatures,
    snapshot.latestChangedDtsFile,
    snapshot.errors,
    snapshot.checkPending,
    snapshot.referencedBy,
    snapshot.references,
    snapshot.changedFilesSet,
  );
}

export function createProgramSnapshotFromParts<Diagnostic>(
  version: string,
  fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>,
  options: ReadonlyMap<string, unknown>,
  root: readonly string[],
  semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
  emitDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
  pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>,
  emitSignatures: ReadonlyMap<string, EmitSignature>,
  latestChangedDtsFile: string | undefined,
  errors: readonly Diagnostic[],
  checkPending: boolean,
  referencedBy: ReadonlyMap<string, ReadonlySet<string>> | undefined = undefined,
  references: ReadonlyMap<string, ReadonlySet<string>> | undefined = undefined,
  changedFilesSet: ReadonlySet<string> | undefined = undefined,
): ProgramSnapshot<Diagnostic> {
  return new ProgramSnapshotData(
    version,
    new Map(fileInfos),
    options,
    [...root],
    new Map(semanticDiagnosticsPerFile),
    new Map(emitDiagnosticsPerFile),
    new Map(pendingEmit),
    new Map(emitSignatures),
    latestChangedDtsFile,
    [...errors],
    checkPending,
    referencedBy === undefined ? undefined : cloneSetMap(referencedBy),
    references === undefined ? undefined : cloneSetMap(references),
    changedFilesSet === undefined ? undefined : new Set(changedFilesSet),
  );
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
  return createProgramSnapshotFromParts(
    snapshot.version,
    snapshot.fileInfos,
    snapshot.options,
    snapshot.root,
    snapshot.semanticDiagnosticsPerFile,
    snapshot.emitDiagnosticsPerFile,
    snapshot.pendingEmit,
    snapshot.emitSignatures,
    snapshot.latestChangedDtsFile,
    snapshot.errors,
    snapshot.checkPending,
    buildReferencedByMap(references),
    references,
    snapshot.changedFilesSet,
  );
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
