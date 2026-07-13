import type { bool } from "../../go/scalars.js";
import type { FS } from "../vfs/vfs.js";
import { FS as OSFS } from "../vfs/osvfs/os.js";
import { CombinePaths, GetDirectoryPath, NormalizeSlashes } from "../tspath/path.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::constGroup::embedded","kind":"constGroup","status":"implemented","sigHash":"4c71f07d139be967c63073fca793530940c74775bb8902e2816a1d12ec2bd08f"}
 *
 * Go source:
 * const embedded = false
 */
export const embedded: bool = false;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::func::wrapFS","kind":"func","status":"implemented","sigHash":"47cfe8da7e0cd5cc2c1c0216f3222db8d8e58c9f41164fe2c18174a5c0f956af"}
 *
 * Go source:
 * func wrapFS(fs vfs.FS) vfs.FS {
 * 	return fs
 * }
 */
export function wrapFS(fs: GoInterface<FS>): GoInterface<FS> {
  return fs;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::varGroup::executableDir","kind":"varGroup","status":"implemented","sigHash":"aa8e3ebfca7d9cccb7ab7ee05165d0f86d20f1ef76c330b62a12e5bcba7feaf9"}
 *
 * Go source:
 * var executableDir = sync.OnceValue(func() string {
 * 	exe, err := os.Executable()
 * 	if err != nil {
 * 		panic(fmt.Sprintf("bundled: failed to get executable path: %v", err))
 * 	}
 * 	exe = tspath.NormalizeSlashes(exe)
 * 	exe = osvfs.FS().Realpath(exe)
 * 	return tspath.GetDirectoryPath(exe)
 * })
 */
export let executableDir: GoFunc<() => string> = (() => {
  let value: string | undefined;
  return (): string => {
    value ??= GetDirectoryPath(OSFS()!.Realpath(NormalizeSlashes(process.execPath)));
    return value;
  };
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::varGroup::libPath","kind":"varGroup","status":"implemented","sigHash":"ad0b589440958694bb78420c9845cb5295abbbd5d5d968a09b8ae66a4d24a2c9"}
 *
 * Go source:
 * var libPath = sync.OnceValue(func() string {
 * 	if testing.Testing() {
 * 		return TestingLibPath()
 * 	}
 * 	dir := executableDir()
 * 
 * 	libdts := tspath.CombinePaths(dir, "lib.d.ts")
 * 	if info := osvfs.FS().Stat(libdts); info == nil {
 * 		panic(fmt.Sprintf("bundled: %v does not exist; this executable may be misplaced", libdts))
 * 	}
 * 
 * 	return dir
 * })
 */
export let libPath: GoFunc<() => string> = (() => {
  let value: string | undefined;
  return (): string => {
    if (value === undefined) {
      const dir = executableDir!();
      const libdts = CombinePaths(dir, "lib.d.ts");
      if (OSFS()!.Stat(libdts) === undefined) {
        throw new globalThis.Error(`bundled: ${libdts} does not exist; this executable may be misplaced`);
      }
      value = dir;
    }
    return value;
  };
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::func::IsBundled","kind":"func","status":"implemented","sigHash":"3f477cfe9b05ddb51898d09813758cfacd213c1117616d19ee277dc5e15bc096"}
 *
 * Go source:
 * func IsBundled(path string) bool {
 * 	return false
 * }
 */
export function IsBundled(path: string): bool {
  return false;
}
