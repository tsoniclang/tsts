import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export interface FileFixture {
  readonly path: string;
  readonly relativePath: string;
  readonly content: string;
}

export interface Fixture {
  name(): string;
  path(): string;
  skipIfNotExist(skip: (message: string) => void): void;
  readFile(fail?: (message: string) => never): string;
}

export function fromFile(name: string, path: string): Fixture {
  return new FromFileFixture(name, path);
}

export function fromString(name: string, path: string, contents: string): Fixture {
  return new FromStringFixture(name, path, contents);
}

class FromFileFixture implements Fixture {
  private contents: string | undefined;
  private readError: Error | undefined;

  constructor(
    private readonly nameValue: string,
    private readonly pathValue: string,
  ) {}

  name(): string { return this.nameValue; }
  path(): string { return this.pathValue; }

  skipIfNotExist(skip: (message: string) => void): void {
    if (!existsSync(this.pathValue)) skip(`Test fixture ${JSON.stringify(this.pathValue)} does not exist`);
  }

  readFile(fail: (message: string) => never = message => { throw new Error(message); }): string {
    if (this.contents !== undefined) return this.contents;
    if (this.readError !== undefined) throw this.readError;
    try {
      this.contents = readFileSync(this.pathValue, "utf8");
      return this.contents;
    } catch (error) {
      this.readError = error instanceof Error ? error : new Error(String(error));
      return fail(`Failed to read test fixture ${JSON.stringify(this.pathValue)}: ${this.readError.message}`);
    }
  }
}

class FromStringFixture implements Fixture {
  constructor(
    private readonly nameValue: string,
    private readonly pathValue: string,
    private readonly contentsValue: string,
  ) {}

  name(): string { return this.nameValue; }
  path(): string { return this.pathValue; }
  skipIfNotExist(_skip: (message: string) => void): void {}
  readFile(): string { return this.contentsValue; }
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
