import type { bool } from "../../go/scalars.js";
import { existsSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { FS } from "../vfs/vfs.js";
import { embedded, wrapFS, libPath } from "./embed.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::constGroup::Embedded","kind":"constGroup","status":"implemented","sigHash":"f83bb3a895de36d262628c2ffa89238eeb5aeda78485d347176df8c732d05e94"}
 * @tsgo-override {"category":"bundled-asset-mode","allow":["initializer"],"reason":"The TypeScript runtime always ships the embedded standard-library assets, while the pinned Go source also has an exact noembed build-tag variant.","goInitializer":"[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93]=>Embedded={\"kind\":\"boolean\",\"value\":false}|[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92]=>Embedded={\"kind\":\"boolean\",\"value\":true}","tsInitializer":"Embedded={\"kind\":\"boolean\",\"value\":true}"}
 *
 * Go source:
 * const Embedded = embedded
 */
export const Embedded: bool = embedded;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::WrapFS","kind":"func","status":"implemented","sigHash":"fbf63e8f5730e4d4ad448c39a6c9dda36bacb6620125539a16dba50e8b31bd5b"}
 *
 * Go source:
 * func WrapFS(fs vfs.FS) vfs.FS {
 * 	return wrapFS(fs)
 * }
 */
export function WrapFS(fs: GoInterface<FS>): GoInterface<FS> {
  return wrapFS(fs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::LibPath","kind":"func","status":"implemented","sigHash":"9a8bb91147a81a624745284df1b9a8267be434906aaaaebb60cd8f93f5e43e9e"}
 *
 * Go source:
 * func LibPath() string {
 * 	return libPath()
 * }
 */
export function LibPath(): string {
  return libPath();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::varGroup::bundledSourceDir","kind":"varGroup","status":"implemented","sigHash":"b04d87ddb555f4f8ab4973fdb51e25a7181608b9b4ed6b381d65b9c27c293de1"}
 *
 * Go source:
 * var bundledSourceDir = sync.OnceValue(func() string {
 * 	_, filename, _, ok := runtime.Caller(0)
 * 	if !ok {
 * 		panic("bundled: could not get current filename")
 * 	}
 * 	return filepath.Dir(filepath.FromSlash(filename))
 * })
 */
export let bundledSourceDir: GoFunc<() => string> = (() => {
  let value: string | undefined;
  return (): string => {
    if (value === undefined) {
      const dir = path.dirname(fileURLToPath(import.meta.url));
      if (existsSync(path.join(dir, "libs"))) {
        value = dir;
      } else {
        const sourceDir = path.resolve(dir, "../../../../src/internal/bundled");
        value = existsSync(path.join(sourceDir, "libs")) ? sourceDir : dir;
      }
    }
    return value;
  };
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::varGroup::testingLibPath","kind":"varGroup","status":"implemented","sigHash":"ae9c824e9f3290815693dc17b3238b5880e487333e8412ef76295efaa320ebbe"}
 *
 * Go source:
 * var testingLibPath = sync.OnceValue(func() string {
 * 	if !testing.Testing() {
 * 		panic("bundled: TestingLibPath should only be called during tests")
 * 	}
 * 	return tspath.NormalizeSlashes(filepath.Join(bundledSourceDir(), "libs"))
 * })
 */
export let testingLibPath: GoFunc<() => string> = (() => {
  let value: string | undefined;
  return (): string => {
    value ??= path.join(bundledSourceDir!(), "libs").replaceAll(path.sep, "/");
    return value;
  };
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::TestingLibPath","kind":"func","status":"implemented","sigHash":"ba7ce2ebda507afa53f7209bee1e8a78eaa40816a03b43b1e4b5aca77cea70b4"}
 *
 * Go source:
 * func TestingLibPath() string {
 * 	return testingLibPath()
 * }
 */
export function TestingLibPath(): string {
  return testingLibPath!();
}
