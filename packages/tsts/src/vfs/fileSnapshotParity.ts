/**
 * VFS file snapshot parity helpers.
 */

export interface FileSnapshot {
  readonly path: string;
  readonly text: string;
  readonly version: string;
}

export function createFileSnapshot(path: string, text: string): FileSnapshot {
  return { path, text, version: hashText(text) };
}

export function snapshotChanged(left: FileSnapshot | undefined, right: FileSnapshot): boolean {
  return left === undefined || left.version !== right.version;
}

function hashText(text: string): string {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  return String(hash >>> 0);
}
