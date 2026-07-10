import type { bool, int } from "../../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../../go/compat.js";
import type { Closer } from "../../../go/io.js";
import * as strings from "../../../go/strings.js";
import * as fswatch from "../../fswatch/fswatch.js";
import { GetPathComponents, IsVolumeCharacter, NormalizeSlashes } from "../../tspath/path.js";

const CHAR_COLON: int = 0x3a;
const CHAR_DOLLAR: int = 0x24;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::type::WatchBackend","kind":"type","status":"implemented","sigHash":"ad815e0a21cc8c6e319df712880e433c1539399f1e25a7f19dfce9c6e00b2bdf","bodyHash":"9862ebbef206f3776ba05868b4910bc0b6fb536c1cc38b54b039f6dd6f400343"}
 *
 * Go source:
 * WatchBackend interface {
 * 	WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error)
 * 	WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error)
 * }
 */
export interface WatchBackend {
  WatchDirectory(dir: string, fn: fswatch.WatchCallback, recursive: bool, ignore: (arg0: string) => bool): [Closer, GoError];
  WatchDirectories(requests: GoSlice<WatchDirectoryRequest>): [GoSlice<Closer>, GoError];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::type::WatchDirectoryRequest","kind":"type","status":"implemented","sigHash":"993a94dad660958ac8e0acd76eb2ac6070adcb49b03f6b1a5abcab6113cb0938","bodyHash":"762ab4f30032ec84ac57bcbaa6914ab4583d0d89f71efcac4b162b2f52439667"}
 *
 * Go source:
 * WatchDirectoryRequest struct {
 * 	Dir       string
 * 	Callback  fswatch.WatchCallback
 * 	Recursive bool
 * 	Ignore    func(string) bool
 * }
 */
export interface WatchDirectoryRequest {
  Dir: string;
  Callback: fswatch.WatchCallback;
  Recursive: bool;
  Ignore: (arg0: string) => bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::type::CommandLineTestingWithWatchBackend","kind":"type","status":"implemented","sigHash":"acfc35fa62865379c9c04096769345e58214607c959d3cd4b9f8bee3d9c55716","bodyHash":"e78e1c99674201fc74421f3ac2a45ec9f536299156c12db09e5ace07a41d11c7"}
 *
 * Go source:
 * CommandLineTestingWithWatchBackend interface {
 * 	WatchBackend() WatchBackend
 * }
 */
export interface CommandLineTestingWithWatchBackend {
  WatchBackend(): WatchBackend;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::type::FSWatchBackend","kind":"type","status":"implemented","sigHash":"77bc63187164777c121ad7ecc82a5435e3ccdfb1d840633d3ab7382c969e19fa","bodyHash":"72719268d51d9dba17d4cbc7e41754bd6c920efb973b33ff01674f876e307123"}
 *
 * Go source:
 * FSWatchBackend struct{ Inner fswatch.Watcher }
 */
export interface FSWatchBackend {
  Inner: fswatch.Watcher;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::method::FSWatchBackend.WatchDirectory","kind":"method","status":"implemented","sigHash":"62fcaeac7e6582cc644653fde079547e2a8f64d7c4493c7a52660ee229aae1d7","bodyHash":"46131a5efea5b9a8524fee254ab1cbce7b2e411623f0707e5309b0f34d067081"}
 *
 * Go source:
 * func (b *FSWatchBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error) {
 * 	closers, err := b.WatchDirectories([]WatchDirectoryRequest{{
 * 		Dir:       dir,
 * 		Callback:  fn,
 * 		Recursive: recursive,
 * 		Ignore:    ignore,
 * 	}})
 * 	if err != nil {
 * 		return nil, err
 * 	}
 * 	return closers[0], nil
 * }
 */
export function FSWatchBackend_WatchDirectory(receiver: GoPtr<FSWatchBackend>, dir: string, fn: fswatch.WatchCallback, recursive: bool, ignore: (arg0: string) => bool): [Closer, GoError] {
  const [closers, err] = FSWatchBackend_WatchDirectories(receiver, [{
    Dir: dir,
    Callback: fn,
    Recursive: recursive,
    Ignore: ignore,
  }]);
  if (err !== undefined) {
    return [undefined as unknown as Closer, err];
  }
  return [closers[0]!, undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::method::FSWatchBackend.WatchDirectories","kind":"method","status":"implemented","sigHash":"1fb913c8f634fbadb46ce77d01db3db6db1748e404839140a5ed69ee0371fe69","bodyHash":"e674e3acda42d4de5a2f500bc6ab167d65032033d065b73fdc53713c3315a00d"}
 *
 * Go source:
 * func (b *FSWatchBackend) WatchDirectories(requests []WatchDirectoryRequest) ([]io.Closer, error) {
 * 	fswatchRequests := make([]fswatch.WatchDirectoryRequest, len(requests))
 * 	for i, request := range requests {
 * 		var opts []fswatch.WatchOption
 * 		if request.Recursive {
 * 			opts = append(opts, fswatch.WithRecursive())
 * 		}
 * 		if request.Ignore != nil {
 * 			opts = append(opts, fswatch.WithIgnore(request.Ignore))
 * 		}
 * 		fswatchRequests[i] = fswatch.WatchDirectoryRequest{
 * 			Dir:      request.Dir,
 * 			Callback: request.Callback,
 * 			Options:  opts,
 * 		}
 * 	}
 * 	watches, err := b.Inner.WatchDirectories(fswatchRequests)
 * 	if err != nil {
 * 		return nil, err
 * 	}
 * 	closers := make([]io.Closer, len(watches))
 * 	for i, watch := range watches {
 * 		closers[i] = watch
 * 	}
 * 	return closers, nil
 * }
 */
export function FSWatchBackend_WatchDirectories(receiver: GoPtr<FSWatchBackend>, requests: GoSlice<WatchDirectoryRequest>): [GoSlice<Closer>, GoError] {
  const fswatchRequests: GoSlice<fswatch.WatchDirectoryRequest> = [];
  for (const request of requests) {
    let opts: GoSlice<fswatch.WatchOption> = [];
    if (request.Recursive) {
      opts = [...opts, fswatch.WithRecursive()];
    }
    if (request.Ignore !== undefined) {
      opts = [...opts, fswatch.WithIgnore(request.Ignore)];
    }
    fswatchRequests.push({ Dir: request.Dir, Callback: request.Callback, Options: opts });
  }
  const [watches, err] = receiver!.Inner.WatchDirectories(fswatchRequests);
  if (err !== undefined) return [[], err];
  return [watches, undefined];
}

export function FSWatchBackend_as_WatchBackend(receiver: GoPtr<FSWatchBackend>): WatchBackend {
  return {
    WatchDirectory: (dir: string, fn: fswatch.WatchCallback, recursive: bool, ignore: (arg0: string) => bool): [Closer, GoError] =>
      FSWatchBackend_WatchDirectory(receiver, dir, fn, recursive, ignore),
    WatchDirectories: (requests: GoSlice<WatchDirectoryRequest>): [GoSlice<Closer>, GoError] =>
      FSWatchBackend_WatchDirectories(receiver, requests),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::func::ShouldIgnoreWatchPath","kind":"func","status":"implemented","sigHash":"d04d2045c4109da28b5717731de7abdadb0269ba82f0e1a5cb0d118d88d0c155","bodyHash":"04904092456cb5a08cb604c4d7c0b4d23186b09e4c95af325bc39fd3093928b9"}
 *
 * Go source:
 * func ShouldIgnoreWatchPath(path string) bool {
 * 	p := tspath.NormalizeSlashes(path)
 * 	return strings.HasSuffix(p, "/.git") ||
 * 		strings.Contains(p, "/.git/") ||
 * 		strings.Contains(p, "/node_modules/.") ||
 * 		strings.Contains(p, "/.#")
 * }
 */
export function ShouldIgnoreWatchPath(path: string): bool {
  const p = NormalizeSlashes(path);
  return (strings.HasSuffix(p, "/.git") ||
    strings.Contains(p, "/.git/") ||
    strings.Contains(p, "/node_modules/.") ||
    strings.Contains(p, "/.#")) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::func::CanWatchDirectory","kind":"func","status":"implemented","sigHash":"b98e85ad5209872b03b1050584d71a8111c223bed22bffb30d26c9f7e66555e2","bodyHash":"2c2abd9900a82b79218201e3005282ca5b42bc7b4c0cbd1aaf0d6715bda09a1e"}
 *
 * Go source:
 * func CanWatchDirectory(dir string) bool {
 * 	components := tspath.GetPathComponents(dir, "")
 * 	length := len(components)
 * 	if length <= 2 {
 * 		return false
 * 	}
 * 	rootLength := PerceivedOsRootLengthForWatching(components)
 * 	return length > rootLength+1
 * }
 */
export function CanWatchDirectory(dir: string): bool {
  const components = GetPathComponents(dir, "");
  const length = components.length;
  if (length <= 2) {
    return false as bool;
  }
  const rootLength = PerceivedOsRootLengthForWatching(components);
  return (length > rootLength + 1) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchbackend.go::func::PerceivedOsRootLengthForWatching","kind":"func","status":"implemented","sigHash":"246a06fd42c626ed7e7a706d38bf9407a76301eec6e4e6bd81907e015988962a","bodyHash":"83c3e8528ac3c1ead5200e3bfbe448c32e50bc59fc62a82bc6c61bace8506004"}
 *
 * Go source:
 * func PerceivedOsRootLengthForWatching(components []string) int {
 * 	length := len(components)
 * 	if length <= 1 {
 * 		return 1
 * 	}
 * 	root := components[0]
 * 	indexAfterOsRoot := 1
 * 	isDosStyle := len(root) >= 2 && tspath.IsVolumeCharacter(root[0]) && root[1] == ':'
 *
 * 	if root != "/" && !isDosStyle && len(components) > 1 {
 * 		if len(components[1]) >= 2 && tspath.IsVolumeCharacter(components[1][0]) && strings.HasSuffix(components[1], "$") {
 * 			if length == 2 {
 * 				return 2
 * 			}
 * 			indexAfterOsRoot = 2
 * 			isDosStyle = true
 * 		}
 * 	}
 *
 * 	if isDosStyle && (indexAfterOsRoot >= length || !strings.EqualFold(components[indexAfterOsRoot], "users")) {
 * 		return indexAfterOsRoot
 * 	}
 *
 * 	if indexAfterOsRoot < length && strings.EqualFold(components[indexAfterOsRoot], "workspaces") {
 * 		return indexAfterOsRoot + 1
 * 	}
 *
 * 	return indexAfterOsRoot + 2
 * }
 */
export function PerceivedOsRootLengthForWatching(components: GoSlice<string>): int {
  const length = components.length;
  if (length <= 1) {
    return 1;
  }
  const root = components[0]!;
  let indexAfterOsRoot = 1;
  let isDosStyle = (root.length >= 2 && IsVolumeCharacter(root.charCodeAt(0)) && root.charCodeAt(1) === CHAR_COLON) as bool;

  if (root !== "/" && !isDosStyle && components.length > 1) {
    const second = components[1]!;
    if (second.length >= 2 && IsVolumeCharacter(second.charCodeAt(0)) && strings.HasSuffix(second, String.fromCharCode(CHAR_DOLLAR))) {
      if (length === 2) {
        return 2;
      }
      indexAfterOsRoot = 2;
      isDosStyle = true as bool;
    }
  }

  if (isDosStyle && (indexAfterOsRoot >= length || !strings.EqualFold(components[indexAfterOsRoot]!, "users"))) {
    return indexAfterOsRoot;
  }

  if (indexAfterOsRoot < length && strings.EqualFold(components[indexAfterOsRoot]!, "workspaces")) {
    return indexAfterOsRoot + 1;
  }

  return indexAfterOsRoot + 2;
}
