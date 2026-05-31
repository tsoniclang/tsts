import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export interface FileFixture {
  readonly path: string;
  readonly relativePath: string;
  readonly content: string;
}

export function readFileFixture(root: string, relativePath: string): FileFixture {
  const path = join(root, relativePath);
  if (!existsSync(path)) throw new Error(`fixture not found: ${path}`);
  return { path, relativePath, content: readFileSync(path, "utf8") };
}

export function readFileFixtures(root: string, extension?: string): readonly FileFixture[] {
  const out: FileFixture[] = [];
  const visit = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      const stat = statSync(path);
      if (stat.isDirectory()) {
        visit(path);
      } else if (extension === undefined || path.endsWith(extension)) {
        out.push({ path, relativePath: relative(root, path).replace(/\\/g, "/"), content: readFileSync(path, "utf8") });
      }
    }
  };
  visit(root);
  return out.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}
