import { SnapshotFS, type FileHandle } from "./snapshotFs.js";

export interface Overlay {
  readonly fileName: string;
  readonly version: number;
  readonly content: string;
}

export class OverlayFS {
  private readonly base: SnapshotFS;
  private readonly overlays = new Map<string, Overlay>();

  constructor(base: SnapshotFS = new SnapshotFS(), overlays?: Iterable<Overlay>) {
    this.base = base;
    if (overlays !== undefined) {
      for (const overlay of overlays) this.overlays.set(normalize(overlay.fileName), overlay);
    }
  }

  open(fileName: string, content: string, version = 0): void {
    this.overlays.set(normalize(fileName), { fileName, content, version });
  }

  update(fileName: string, content: string, version = 0): void {
    if (!this.overlays.has(normalize(fileName))) throw new Error(`cannot update unopened file '${fileName}'`);
    this.open(fileName, content, version);
  }

  close(fileName: string): void {
    this.overlays.delete(normalize(fileName));
  }

  getFile(fileName: string): FileHandle | undefined {
    const overlay = this.overlays.get(normalize(fileName));
    if (overlay !== undefined) {
      const fs = new SnapshotFS([[overlay.fileName, overlay.content]]);
      return fs.getFile(overlay.fileName);
    }
    return this.base.getFile(fileName);
  }

  readFile(fileName: string): string | undefined {
    const overlay = this.overlays.get(normalize(fileName));
    return overlay?.content ?? this.base.readFile(fileName);
  }

  fileExists(fileName: string): boolean {
    return this.overlays.has(normalize(fileName)) || this.base.fileExists(fileName);
  }

  openFiles(): readonly string[] {
    return [...this.overlays.values()].map(overlay => overlay.fileName).sort();
  }

  snapshot(): SnapshotFS {
    const snapshot = this.base.clone();
    for (const overlay of this.overlays.values()) snapshot.openFile(overlay.fileName, overlay.content, overlay.version);
    return snapshot;
  }
}

export function newOverlayFS(base?: SnapshotFS, overlays?: Iterable<Overlay>): OverlayFS {
  return new OverlayFS(base, overlays);
}

function normalize(path: string): string {
  return path.replaceAll("\\", "/").replace(/\/+/g, "/");
}
