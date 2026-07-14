import type { bool } from "../../go/scalars.js";
import { existsSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { FS } from "../vfs/vfs.js";
import { embedded, wrapFS, libPath } from "./embed.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::constGroup::Embedded","kind":"constGroup","status":"implemented","sigHash":"cd2b62f11e29615690ed73353f565ecbfafa61b3a70c13c0d4e983f73326e844"}
 * @tsgo-override {"category":"bundled-asset-mode","allow":["initializer"],"reason":"The TypeScript runtime always ships the embedded standard-library assets, while the pinned Go source also has an exact noembed build-tag variant.","goInitializer":"[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93]=>Embedded={\"kind\":\"boolean\",\"value\":false}|[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92]=>Embedded={\"kind\":\"boolean\",\"value\":true}","tsInitializer":"Embedded={\"kind\":\"boolean\",\"value\":true}"}
 *
 * Go source:
 * const Embedded = embedded
 */
export const Embedded: bool = embedded;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::WrapFS","kind":"func","status":"implemented","sigHash":"cf1a5abdd42113e030b229a9741bd8b284780574dace3ce9ef982cddcdbc6520"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::LibPath","kind":"func","status":"implemented","sigHash":"d8ffc11bed41fe087feafd9a89324d14aa753b8efaa30ec2d21f6c51b026370f"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::varGroup::bundledSourceDir","kind":"varGroup","status":"implemented","sigHash":"e595ef7d14d43a030b76450e608a4d8710f8a79ced9a5bf7ae381f85d2058852"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::varGroup::testingLibPath","kind":"varGroup","status":"implemented","sigHash":"51146c40b686670996e8f9021c0b0352ed6f03a87f69407c44371e00298d6b4b"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/bundled.go::func::TestingLibPath","kind":"func","status":"implemented","sigHash":"7ff722e9f2b81a46b8f800a0654d5b3f628d2893b22a7f150b5a06d8ecf8aab9"}
 *
 * Go source:
 * func TestingLibPath() string {
 * 	return testingLibPath()
 * }
 */
export function TestingLibPath(): string {
  return testingLibPath!();
}
