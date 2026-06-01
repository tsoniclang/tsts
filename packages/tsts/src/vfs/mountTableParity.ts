/**
 * VFS mount-table parity helpers.
 */

export interface MountEntry<TFileSystem> {
  readonly root: string;
  readonly fs: TFileSystem;
}

export interface MountTable<TFileSystem> {
  readonly mounts: MountEntry<TFileSystem>[];
}

export function createMountTable<TFileSystem>(): MountTable<TFileSystem> {
  return { mounts: [] };
}

export function addMount<TFileSystem>(table: MountTable<TFileSystem>, root: string, fs: TFileSystem): void {
  removeMount(table, root);
  table.mounts.push({ root: normalizeRoot(root), fs });
  table.mounts.sort((left, right) => right.root.length - left.root.length);
}

export function removeMount<TFileSystem>(table: MountTable<TFileSystem>, root: string): void {
  const normalized = normalizeRoot(root);
  for (let index = table.mounts.length - 1; index >= 0; index -= 1) {
    if (table.mounts[index]!.root === normalized) table.mounts.splice(index, 1);
  }
}

export function resolveMount<TFileSystem>(table: MountTable<TFileSystem>, path: string): MountEntry<TFileSystem> | undefined {
  const normalized = path.replace(/\\/g, "/");
  return table.mounts.find(mount => normalized === mount.root || normalized.startsWith(`${mount.root}/`));
}

export function relativeToMount<TFileSystem>(entry: MountEntry<TFileSystem>, path: string): string {
  const normalized = path.replace(/\\/g, "/");
  return normalized === entry.root ? "" : normalized.slice(entry.root.length + 1);
}

function normalizeRoot(root: string): string {
  return root.replace(/\\/g, "/").replace(/\/+$/, "");
}
