import type { bool } from "../../go/scalars.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { statSync } from "node:fs";

function onceValue<T>(factory: () => T): () => T {
  let initialized = false;
  let value: T;
  return (): T => {
    if (!initialized) {
      value = factory();
      initialized = true;
    }
    return value;
  };
}

function statPath(path: string): { isFile(): bool; isDirectory(): bool } | undefined {
  try {
    return statSync(path);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: unknown }).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::varGroup::rootPath","kind":"varGroup","status":"implemented","sigHash":"d779ea1d3c4911edb0463e1b8f631ae2a0b3806c6524016734a195df1e74e654"}
 *
 * Go source:
 * var rootPath = sync.OnceValue(func() string {
 * 	_, filename, _, ok := runtime.Caller(0)
 * 	if !ok {
 * 		panic("could not get current filename")
 * 	}
 * 	filename = filepath.FromSlash(filename) // runtime.Caller always returns forward slashes; https://go.dev/issues/3335, https://go.dev/cl/603275
 * 
 * 	if strings.HasPrefix(filename, "github.com/") {
 * 		panic("repo root cannot be found when built with -trimpath")
 * 	}
 * 
 * 	if !filepath.IsAbs(filename) {
 * 		panic(filename + " is not an absolute path")
 * 	}
 * 
 * 	root := filepath.VolumeName(filename) + string(filepath.Separator)
 * 
 * 	dir := filepath.Dir(filename)
 * 	for {
 * 		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
 * 			return dir
 * 		}
 * 		if dir == root {
 * 			break
 * 		}
 * 		dir = filepath.Dir(dir)
 * 	}
 * 
 * 	panic("could not find go.mod above " + filename)
 * })
 */
export let rootPath: () => string = onceValue((): string => {
  const filename = fileURLToPath(import.meta.url);
  let dir = dirname(filename);
  for (;;) {
    const candidate = join(dir, "_vendor", "typescript-go");
    if (statPath(join(candidate, "go.mod"))?.isFile()) {
      return candidate;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new globalThis.Error("could not find pinned TS-Go root above " + filename);
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::func::RootPath","kind":"func","status":"implemented","sigHash":"25eabb046687ed118017fa3f0ed296e235701fbc559ebb753551a3f79b8465d5"}
 *
 * Go source:
 * func RootPath() string {
 * 	return rootPath()
 * }
 */
export function RootPath(): string {
  return rootPath();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::varGroup::typeScriptSubmodulePath","kind":"varGroup","status":"implemented","sigHash":"91cb05fb38dd4f01e4117c39aeedd05fd5b2e602e53755707615426e93fa012e"}
 *
 * Go source:
 * var typeScriptSubmodulePath = sync.OnceValue(func() string {
 * 	return filepath.Join(rootPath(), "_submodules", "TypeScript")
 * })
 */
export let typeScriptSubmodulePath: () => string = onceValue((): string => {
  return join(rootPath(), "_submodules", "TypeScript");
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::func::TypeScriptSubmodulePath","kind":"func","status":"implemented","sigHash":"5dedbac102d94ff7892b0c21a535de701ccb5467e95f58e05cdff68b37cd002d"}
 *
 * Go source:
 * func TypeScriptSubmodulePath() string {
 * 	return typeScriptSubmodulePath()
 * }
 */
export function TypeScriptSubmodulePath(): string {
  return typeScriptSubmodulePath();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::varGroup::testDataPath","kind":"varGroup","status":"implemented","sigHash":"e0df8ed1166ac3b7f5dd5cbeb09fd127aac6d6fb16a175f3f12d50ff29d43db9"}
 *
 * Go source:
 * var testDataPath = sync.OnceValue(func() string {
 * 	return filepath.Join(rootPath(), "testdata")
 * })
 */
export let testDataPath: () => string = onceValue((): string => {
  return join(rootPath(), "testdata");
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::func::TestDataPath","kind":"func","status":"implemented","sigHash":"d5378b1759e3413d0bb5f2afb79ea4be43f7bc2fdef4735a980a63ce687f3e34"}
 *
 * Go source:
 * func TestDataPath() string {
 * 	return testDataPath()
 * }
 */
export function TestDataPath(): string {
  return testDataPath();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::varGroup::typeScriptSubmoduleExists","kind":"varGroup","status":"implemented","sigHash":"cc06eaac839b13cb5cc480c5baa3c1b4cef221b53211155d9dffc93c75b43563"}
 *
 * Go source:
 * var typeScriptSubmoduleExists = sync.OnceValue(func() bool {
 * 	p := filepath.Join(typeScriptSubmodulePath(), "package.json")
 * 	if _, err := os.Stat(p); err != nil {
 * 		if os.IsNotExist(err) {
 * 			return false
 * 		}
 * 		panic(err)
 * 	}
 * 	return true
 * })
 */
export let typeScriptSubmoduleExists: () => bool = onceValue((): bool => {
  const packageJson = join(typeScriptSubmodulePath(), "package.json");
  return statPath(packageJson)?.isFile() === true;
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::func::TypeScriptSubmoduleExists","kind":"func","status":"implemented","sigHash":"451c0d34479719cd9f459227d93466aedc711f30647c68381e36bab012637fa3"}
 *
 * Go source:
 * func TypeScriptSubmoduleExists() bool {
 * 	return typeScriptSubmoduleExists()
 * }
 */
export function TypeScriptSubmoduleExists(): bool {
  return typeScriptSubmoduleExists();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::type::SkippableTest","kind":"type","status":"implemented","sigHash":"923ca98fd2e2042ae4e7c5115cc0f3fa24f09bd06599412aa46d1189da8dbdb6"}
 *
 * Go source:
 * SkippableTest interface {
 * 	Helper()
 * 	Skipf(format string, args ...any)
 * }
 */
export interface SkippableTest {
  Helper(): void;
  Skipf(format: string, ...args: Array<unknown>): void;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/repo/paths.go::func::SkipIfNoTypeScriptSubmodule","kind":"func","status":"implemented","sigHash":"e0ecd71cc0a337cb4c13b0b543ec5e35f461aca047653d2281ae6155e1619a8d"}
 *
 * Go source:
 * func SkipIfNoTypeScriptSubmodule(t SkippableTest) {
 * 	t.Helper()
 * 	if !typeScriptSubmoduleExists() {
 * 		t.Skipf("TypeScript submodule does not exist")
 * 	}
 * }
 */
export function SkipIfNoTypeScriptSubmodule(t: SkippableTest): void {
  t.Helper();
  if (!typeScriptSubmoduleExists()) {
    t.Skipf("TypeScript submodule does not exist");
  }
}
