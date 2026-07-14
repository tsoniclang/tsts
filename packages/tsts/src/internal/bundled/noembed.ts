import type { bool } from "../../go/scalars.js";
import type { FS } from "../vfs/vfs.js";
import { FS as OSFS } from "../vfs/osvfs/os.js";
import { CombinePaths, GetDirectoryPath, NormalizeSlashes } from "../tspath/path.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::constGroup::embedded","kind":"constGroup","status":"implemented","sigHash":"251db7ad0106a586d61c0f795170c9ef23e3e831a67c7fa3f9d78397c9652c76"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::varGroup::executableDir","kind":"varGroup","status":"implemented","sigHash":"ac01689620902aba4fdbc7bb4d0756fc145e0e2df5b15e9e7091de34da286f54"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/bundled/noembed.go::varGroup::libPath","kind":"varGroup","status":"implemented","sigHash":"2ad6233f7b1f4194025688d16e1798bfd342d1c9117a70d18ccead8dafe1835b"}
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
