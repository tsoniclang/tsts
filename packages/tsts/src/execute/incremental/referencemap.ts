/**
 * Project reference map.
 *
 * Port of TS-Go `internal/execute/incremental/referencemap.go`.
 */

import type { Path } from "../../tspath/index.js";

export class ReferenceMap {
  private readonly references = new Map<Path, ReadonlySet<Path>>();
  private referencedBy: Map<Path, Set<Path>> | undefined;

  storeReferences(path: Path, refs: ReadonlySet<Path>): void {
    this.references.set(path, new Set(refs));
    this.referencedBy = undefined;
  }

  getReferences(path: Path): { refs: ReadonlySet<Path> | undefined; ok: boolean } {
    const refs = this.references.get(path);
    if (refs === undefined) return { refs: undefined, ok: false };
    return { refs, ok: true };
  }

  getPathsWithReferences(): readonly Path[] {
    return [...this.references.keys()];
  }

  getReferencedBy(path: Path): IterableIterator<Path> {
    const referencedBy = this.getReferencedByMap();
    const refs = referencedBy.get(path);
    if (refs === undefined) return [][Symbol.iterator]();
    return refs.values();
  }

  private getReferencedByMap(): Map<Path, Set<Path>> {
    if (this.referencedBy !== undefined) return this.referencedBy;

    const referencedBy = new Map<Path, Set<Path>>();
    for (const [key, value] of this.references) {
      for (const ref of value) {
        let set = referencedBy.get(ref);
        if (set === undefined) {
          set = new Set<Path>();
          referencedBy.set(ref, set);
        }
        set.add(key);
      }
    }
    this.referencedBy = referencedBy;
    return referencedBy;
  }
}
