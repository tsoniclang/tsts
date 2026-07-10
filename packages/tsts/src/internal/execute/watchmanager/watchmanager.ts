import type { bool } from "../../../go/scalars.js";
import type { GoChan, GoError, GoMap, GoPtr, GoSlice } from "../../../go/compat.js";
import { GoChanAsReceive, GoChanSelect, GoChanSelectReceive, GoChanTrySend, MakeGoChan } from "../../../go/compat.js";
import type { Context } from "../../../go/context.js";
import { Is as errors_Is } from "../../../go/errors.js";
import { Errorf, Fprint, Fprintf, Fprintln } from "../../../go/fmt.js";
import type { Closer, Writer } from "../../../go/io.js";
import { Mutex } from "../../../go/sync.js";
import { DiffMapsFunc } from "../../core/core.js";
import * as fswatch from "../../fswatch/fswatch.js";
import type { ComparePathsOptions } from "../../tspath/path.js";
import { ComparePaths, ContainsPath, GetDirectoryPath } from "../../tspath/path.js";
import { CanWatchDirectory, FSWatchBackend_as_WatchBackend, RequireWatchCloser, ShouldIgnoreWatchPath } from "./watchbackend.js";
import type { WatchBackend, WatchDirectoryRequest } from "./watchbackend.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::type::watchedDir","kind":"type","status":"implemented","sigHash":"529c48a4a0430446c841f0076a0da86ea53a672f4c2a8b059aea84bec0285889","bodyHash":"c244ad3d279d5734f2d9a7322393c36e7d75e4e4e09087d8b04238de4f336cf9"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"A watchedDir is allocated before its backend call completes so its callback can capture the entry; closer remains nil on the error path and is required on success, which TypeScript models with undefined plus success-path validation.","goSignature":"interface{closer:packages/tsts/src/go/io.ts::Closer;recursive:packages/tsts/src/go/scalars.ts::bool}","tsSignature":"interface{closer:packages/tsts/src/go/io.ts::Closer|undefined;recursive:packages/tsts/src/go/scalars.ts::bool}"}
 *
 * Go source:
 * watchedDir struct {
 * 	closer    io.Closer
 * 	recursive bool
 * }
 */
export interface watchedDir {
  closer: Closer | undefined;
  recursive: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::type::dirWatchUpdate","kind":"type","status":"implemented","sigHash":"a00602799cce81f24e15443046e2f17a0a6e476fba7dfdb8b540796d0b2cddbb","bodyHash":"a63ce3cbaefa7443fcfd3ad11fdff31c5fbb5991e4c1f9fe0e6c349693cc411a"}
 *
 * Go source:
 * dirWatchUpdate struct {
 * 	dir       string
 * 	recursive bool
 * }
 */
export interface dirWatchUpdate {
  dir: string;
  recursive: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::type::WatchManager","kind":"type","status":"implemented","sigHash":"34d1fe6bd5f8eefcec09523d1ed2217a7b4cd2819e96b737fe53e5eb086badaf","bodyHash":"255755ece1362b19e9aff46cac8c6e81f29bba9c49071ff6bed6babf44bd4cd1"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"WatchManager.backend is nil before backend selection, DebugLog is nil when verbose logging is disabled, and changedPaths is nil between event batches; TypeScript preserves these three independent Go lifecycle states with undefined.","goSignature":"interface{DebugLog:packages/tsts/src/go/io.ts::Writer;backend:packages/tsts/src/internal/execute/watchmanager/watchbackend.ts::WatchBackend;changedMu:packages/tsts/src/go/sync.ts::Mutex;changedOverflow:packages/tsts/src/go/scalars.ts::bool;changedPaths:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/internal/fswatch/fswatch.ts::EventKind>;dirExists:(string)=>packages/tsts/src/go/scalars.ts::bool;doCycleCh:packages/tsts/src/go/compat.ts::GoChan<{__tsgoEmpty?:never},\"bidirectional\">;mu:packages/tsts/src/go/sync.ts::Mutex;warnWriter:packages/tsts/src/go/io.ts::Writer;watchedDirs:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::watchedDir>>}","tsSignature":"interface{DebugLog:packages/tsts/src/go/io.ts::Writer|undefined;backend:packages/tsts/src/internal/execute/watchmanager/watchbackend.ts::WatchBackend|undefined;changedMu:packages/tsts/src/go/sync.ts::Mutex;changedOverflow:packages/tsts/src/go/scalars.ts::bool;changedPaths:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/internal/fswatch/fswatch.ts::EventKind>|undefined;dirExists:(string)=>packages/tsts/src/go/scalars.ts::bool;doCycleCh:packages/tsts/src/go/compat.ts::GoChan<{__tsgoEmpty?:never},\"bidirectional\">;mu:packages/tsts/src/go/sync.ts::Mutex;warnWriter:packages/tsts/src/go/io.ts::Writer;watchedDirs:packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::watchedDir>>}"}
 *
 * Go source:
 * WatchManager struct {
 * 	mu          sync.Mutex
 * 	backend     WatchBackend
 * 	watchedDirs map[string]*watchedDir
 * 	doCycleCh   chan struct{}
 *
 * 	// DebugLog receives verbose watch diagnostics when non-nil
 * 	DebugLog io.Writer
 *
 * 	warnWriter io.Writer
 * 	dirExists  func(string) bool
 *
 * 	changedMu       sync.Mutex
 * 	changedPaths    map[string]fswatch.EventKind
 * 	changedOverflow bool
 * }
 */
export interface WatchManager {
  mu: Mutex;
  backend: WatchBackend | undefined;
  watchedDirs: GoMap<string, GoPtr<watchedDir>>;
  doCycleCh: GoChan<{ readonly __tsgoEmpty?: never }, "bidirectional">;
  DebugLog: Writer | undefined;
  warnWriter: Writer;
  dirExists: (arg0: string) => bool;
  changedMu: Mutex;
  changedPaths: GoMap<string, fswatch.EventKind> | undefined;
  changedOverflow: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::func::NewWatchManager","kind":"func","status":"implemented","sigHash":"53adff793e260776e4f861f03adf5c97dd0226bf37f844cd5cd248f80d3b24d3","bodyHash":"3e12aa5821cc438460e6fe00421935ef3f70572d0c4c2df53ba369221b577b29"}
 *
 * Go source:
 * func NewWatchManager(warnWriter io.Writer, dirExists func(string) bool) *WatchManager {
 * 	return &WatchManager{
 * 		watchedDirs: make(map[string]*watchedDir),
 * 		doCycleCh:   make(chan struct{}, 1),
 * 		warnWriter:  warnWriter,
 * 		dirExists:   dirExists,
 * 	}
 * }
 */
export function NewWatchManager(warnWriter: Writer, dirExists: (arg0: string) => bool): GoPtr<WatchManager> {
  return {
    mu: new Mutex(),
    backend: undefined,
    watchedDirs: new Map<string, GoPtr<watchedDir>>(),
    doCycleCh: MakeGoChan<{ readonly __tsgoEmpty?: never }>(1, () => ({})),
    DebugLog: undefined,
    warnWriter,
    dirExists,
    changedMu: new Mutex(),
    changedPaths: undefined,
    changedOverflow: false as bool,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.SetBackend","kind":"method","status":"implemented","sigHash":"15187241dc246c964160482dca680e7bfde086bc30584cea5bb78059517f1c10","bodyHash":"afd1d3608992b820d7bfbfc908698c3d131f1c8870e81ad7d6fb64d492808d27"}
 *
 * Go source:
 * func (wm *WatchManager) SetBackend(b WatchBackend) { wm.backend = b }
 */
export function WatchManager_SetBackend(receiver: GoPtr<WatchManager>, b: WatchBackend): void {
  receiver!.backend = b;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.Backend","kind":"method","status":"implemented","sigHash":"835e66ae7690dac11c67f880f7fdf1cc0f6107fdfb18bfa6f4949c1196d945bf","bodyHash":"9eb915d18dcce33061102a011c3dc23e92d2f2d7d95558354688a4bfce23fff2"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Backend returns the manager's nil Go backend before SetBackend or EnsureDefaultBackend installs one; TypeScript represents that pre-initialization result with undefined.","goSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>)=>packages/tsts/src/internal/execute/watchmanager/watchbackend.ts::WatchBackend","tsSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>)=>packages/tsts/src/internal/execute/watchmanager/watchbackend.ts::WatchBackend|undefined"}
 *
 * Go source:
 * func (wm *WatchManager) Backend() WatchBackend { return wm.backend }
 */
export function WatchManager_Backend(receiver: GoPtr<WatchManager>): WatchBackend | undefined {
  return receiver!.backend;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.EnsureDefaultBackend","kind":"method","status":"implemented","sigHash":"e8546bcdfaa297604df4314c6f511852c079d2ea61e534a70a13e640ddabe4d5","bodyHash":"5163fe80909e80b8d807ce4edb4dc71e65e0ae306c50a3653023ff71cc7c8596"}
 *
 * Go source:
 * func (wm *WatchManager) EnsureDefaultBackend() {
 * 	if wm.backend == nil {
 * 		fsw := fswatch.Default()
 * 		wm.backend = &FSWatchBackend{Inner: fsw}
 * 		if wm.DebugLog != nil {
 * 			fmt.Fprintf(wm.DebugLog, "[watch] using %s backend\n", fsw.Name())
 * 		}
 * 	}
 * }
 */
export function WatchManager_EnsureDefaultBackend(receiver: GoPtr<WatchManager>): void {
  if (receiver!.backend === undefined) {
    const fsw = fswatch.Default();
    receiver!.backend = FSWatchBackend_as_WatchBackend({ Inner: fsw });
    if (receiver!.DebugLog !== undefined) {
      Fprintf(receiver!.DebugLog, "[watch] using %s backend\n", fsw.Name());
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.Lock","kind":"method","status":"implemented","sigHash":"3ba346acb45af62eaa09c4df6c4c434f7d6fd9e7124af8141ef5251d2f011df1","bodyHash":"d815bea0b1cc7df9b221ef062e8412e265ac6b5776341d764c4f0bfa089b41ba"}
 *
 * Go source:
 * func (wm *WatchManager) Lock() { wm.mu.Lock() }
 */
export function WatchManager_Lock(receiver: GoPtr<WatchManager>): void {
  receiver!.mu.Lock();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.Unlock","kind":"method","status":"implemented","sigHash":"7d579ea40a7d18960f63093cddfe316bcfad6d3afd476c2b2310b53332263618","bodyHash":"6368583d56a68479dc7e71ab4d9518c95363647f078edd907ecfeb53ff522795"}
 *
 * Go source:
 * func (wm *WatchManager) Unlock() { wm.mu.Unlock() }
 */
export function WatchManager_Unlock(receiver: GoPtr<WatchManager>): void {
  receiver!.mu.Unlock();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.DoCycleCh","kind":"method","status":"implemented","sigHash":"edf80e6959b81944a15978ba28ef73ea99efae4846ba2b6809214b4534455142","bodyHash":"796bc3420729b820d4a78406adbbf04e952234c5c96424b2af2c55e90dc0cb92"}
 *
 * Go source:
 * func (wm *WatchManager) DoCycleCh() <-chan struct{} { return wm.doCycleCh }
 */
export function WatchManager_DoCycleCh(receiver: GoPtr<WatchManager>): GoChan<{ readonly __tsgoEmpty?: never }, "receive"> {
  return GoChanAsReceive(receiver!.doCycleCh);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.DrainEvents","kind":"method","status":"implemented","sigHash":"b21f7619cbf08a5463407366738695559d9de13e41c140dda3d461aeebcaf183","bodyHash":"887a002daeebb74e1db3cc1304d841dcb9be5b5a82fe0324b1b5a7f88e09499d"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"DrainEvents returns the current changedPaths map and resets it to nil; when no events were collected the returned Go map is nil, which TypeScript represents with undefined.","goSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>)=>[packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/internal/fswatch/fswatch.ts::EventKind>,packages/tsts/src/go/scalars.ts::bool]","tsSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/execute/watchmanager/watchmanager.ts::WatchManager>)=>[packages/tsts/src/go/compat.ts::GoMap<string,packages/tsts/src/internal/fswatch/fswatch.ts::EventKind>|undefined,packages/tsts/src/go/scalars.ts::bool]"}
 *
 * Go source:
 * func (wm *WatchManager) DrainEvents() (changed map[string]fswatch.EventKind, overflow bool) {
 * 	wm.changedMu.Lock()
 * 	changed = wm.changedPaths
 * 	overflow = wm.changedOverflow
 * 	wm.changedPaths = nil
 * 	wm.changedOverflow = false
 * 	wm.changedMu.Unlock()
 * 	return
 * }
 */
export function WatchManager_DrainEvents(receiver: GoPtr<WatchManager>): [GoMap<string, fswatch.EventKind> | undefined, bool] {
  receiver!.changedMu.Lock();
  const changed = receiver!.changedPaths;
  const overflow = receiver!.changedOverflow;
  receiver!.changedPaths = undefined;
  receiver!.changedOverflow = false as bool;
  receiver!.changedMu.Unlock();
  return [changed, overflow];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.ForceOverflow","kind":"method","status":"implemented","sigHash":"ad07b6d2b2f1d1e2ce7ce1c691360bf9ad93dbc36ba5bf60808f4af04b16b73c","bodyHash":"ffca118519c6473acf69edab85fb4cd18d2906d2584021332ec44c5b3d2632e6"}
 *
 * Go source:
 * func (wm *WatchManager) ForceOverflow() {
 * 	wm.changedMu.Lock()
 * 	wm.changedOverflow = true
 * 	wm.changedMu.Unlock()
 * }
 */
export function WatchManager_ForceOverflow(receiver: GoPtr<WatchManager>): void {
  receiver!.changedMu.Lock();
  receiver!.changedOverflow = true as bool;
  receiver!.changedMu.Unlock();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.signalDoCycle","kind":"method","status":"implemented","sigHash":"4104b5c24367391ab7f829e507b5a4a605b5986d2cfd28b00cca8ab57aad6c1f","bodyHash":"126ad7f4bf7a2367f4cab3ee5fbca2d3d28ff4a5211182866982f44e5422535b"}
 *
 * Go source:
 * func (wm *WatchManager) signalDoCycle() {
 * 	select {
 * 	case wm.doCycleCh <- struct{}{}:
 * 		// Signal sent; the DoCycle loop will pick it up.
 * 	default:
 * 		// A signal is already pending; coalesced.
 * 	}
 * }
 */
export function WatchManager_signalDoCycle(receiver: GoPtr<WatchManager>): void {
  GoChanTrySend(receiver!.doCycleCh, {});
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.onWatchEvents","kind":"method","status":"implemented","sigHash":"58348df7dffa2a81ef727e37482c216d12db81689820c6e9f64b5164532d545f","bodyHash":"8f13a31fcda57e1789661b03274a4a8605c0a948c1b1abb07408d85a91634b7d"}
 *
 * Go source:
 * func (wm *WatchManager) onWatchEvents(events []fswatch.Event, err error) {
 * 	if err != nil {
 * 		if errors.Is(err, fswatch.ErrOverflow) {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] event overflow, triggering rebuild\n")
 * 			}
 * 			wm.changedMu.Lock()
 * 			wm.changedOverflow = true
 * 			wm.changedMu.Unlock()
 * 			wm.signalDoCycle()
 * 			return
 * 		}
 * 		fmt.Fprintf(wm.warnWriter, "Warning: File watch error: %v\n", err)
 * 		return
 * 	}
 *
 * 	if len(events) > 0 {
 * 		if wm.DebugLog != nil {
 * 			fmt.Fprintf(wm.DebugLog, "[watch] %d event(s): ", len(events))
 * 			for i, e := range events {
 * 				if i > 0 {
 * 					fmt.Fprint(wm.DebugLog, ", ")
 * 				}
 * 				if i >= 5 {
 * 					fmt.Fprintf(wm.DebugLog, "... and %d more", len(events)-i)
 * 					break
 * 				}
 * 				fmt.Fprintf(wm.DebugLog, "%s %s", e.Kind, e.Path)
 * 			}
 * 			fmt.Fprintln(wm.DebugLog)
 * 		}
 * 		wm.changedMu.Lock()
 * 		if wm.changedPaths == nil {
 * 			wm.changedPaths = make(map[string]fswatch.EventKind, len(events))
 * 		}
 * 		for _, e := range events {
 * 			wm.changedPaths[e.Path] = e.Kind
 * 		}
 * 		wm.changedMu.Unlock()
 * 		wm.signalDoCycle()
 * 	}
 * }
 */
export function WatchManager_onWatchEvents(receiver: GoPtr<WatchManager>, events: GoSlice<fswatch.Event>, err: GoError): void {
  if (err !== undefined) {
    if (errors_Is(err, fswatch.ErrOverflow)) {
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] event overflow, triggering rebuild\n");
      }
      receiver!.changedMu.Lock();
      receiver!.changedOverflow = true as bool;
      receiver!.changedMu.Unlock();
      WatchManager_signalDoCycle(receiver);
      return;
    }
    Fprintf(receiver!.warnWriter, "Warning: File watch error: %v\n", err);
    return;
  }

  if (events.length > 0) {
    if (receiver!.DebugLog !== undefined) {
      Fprintf(receiver!.DebugLog, "[watch] %d event(s): ", events.length);
      for (let i = 0; i < events.length; i++) {
        const event = events[i]!;
        if (i > 0) {
          Fprint(receiver!.DebugLog, ", ");
        }
        if (i >= 5) {
          Fprintf(receiver!.DebugLog, "... and %d more", events.length - i);
          break;
        }
        Fprintf(receiver!.DebugLog, "%s %s", fswatch.EventKind_String(event.Kind), event.Path);
      }
      Fprintln(receiver!.DebugLog);
    }
    receiver!.changedMu.Lock();
    if (receiver!.changedPaths === undefined) {
      receiver!.changedPaths = new Map<string, fswatch.EventKind>();
    }
    for (const event of events) {
      receiver!.changedPaths.set(event.Path, event.Kind);
    }
    receiver!.changedMu.Unlock();
    WatchManager_signalDoCycle(receiver);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.handleWatchTerminated","kind":"method","status":"implemented","sigHash":"58b75cd2a54f72e91538ee30a9087109df668999671b5c01b93f12aa998e88fb","bodyHash":"ad288e7a9062020463d7739f40744f338ecb5e77744201c1a4adf0125254262b"}
 *
 * Go source:
 * func (wm *WatchManager) handleWatchTerminated(dir string, identity *watchedDir) {
 * 	if wm.DebugLog != nil {
 * 		fmt.Fprintf(wm.DebugLog, "[watch] watch terminated: %s\n", dir)
 * 	}
 * 	var staleCloser io.Closer
 * 	wm.mu.Lock()
 * 	if wd, ok := wm.watchedDirs[dir]; ok && wd == identity {
 * 		staleCloser = wd.closer
 * 		delete(wm.watchedDirs, dir)
 * 	}
 * 	wm.mu.Unlock()
 * 	if staleCloser != nil {
 * 		staleCloser.Close()
 * 	}
 * 	wm.changedMu.Lock()
 * 	wm.changedOverflow = true
 * 	wm.changedMu.Unlock()
 * 	wm.signalDoCycle()
 * }
 */
export function WatchManager_handleWatchTerminated(receiver: GoPtr<WatchManager>, dir: string, identity: GoPtr<watchedDir>): void {
  if (receiver!.DebugLog !== undefined) {
    Fprintf(receiver!.DebugLog, "[watch] watch terminated: %s\n", dir);
  }
  let staleCloser: Closer | undefined;
  receiver!.mu.Lock();
  const wd = receiver!.watchedDirs.get(dir);
  if (wd !== undefined && wd === identity) {
    staleCloser = wd.closer;
    receiver!.watchedDirs.delete(dir);
  }
  receiver!.mu.Unlock();
  if (staleCloser !== undefined) {
    staleCloser.Close();
  }
  receiver!.changedMu.Lock();
  receiver!.changedOverflow = true as bool;
  receiver!.changedMu.Unlock();
  WatchManager_signalDoCycle(receiver);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.CloseAllWatches","kind":"method","status":"implemented","sigHash":"f8b7e53ef15f4d50203305e0da65ed186f6058293f979dd93502fa47ac444310","bodyHash":"522cdb67922e5548b75a1fdefdec6e6d7a875b895785bbff60eee956cc827ef9"}
 *
 * Go source:
 * func (wm *WatchManager) CloseAllWatches() {
 * 	wm.mu.Lock()
 * 	closers := make([]io.Closer, 0, len(wm.watchedDirs))
 * 	for dir, wd := range wm.watchedDirs {
 * 		closers = append(closers, wd.closer)
 * 		delete(wm.watchedDirs, dir)
 * 	}
 * 	wm.mu.Unlock()
 * 	for _, c := range closers {
 * 		c.Close()
 * 	}
 * }
 */
export function WatchManager_CloseAllWatches(receiver: GoPtr<WatchManager>): void {
  receiver!.mu.Lock();
  const closers: GoSlice<Closer> = [];
  for (const [dir, wd] of receiver!.watchedDirs) {
    closers.push(RequireWatchCloser(wd!.closer, "stored watch directory"));
    receiver!.watchedDirs.delete(dir);
  }
  receiver!.mu.Unlock();
  for (const closer of closers) {
    closer.Close();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.createDirWatch","kind":"method","status":"implemented","sigHash":"08c3cded2b4e3577a7d1093ce345a3d6999143065b85231ba01c3c0e0bedd7d6","bodyHash":"aa95b64f8e21f42711982609e766b72ce846d77dd497dc867d2c316043451459"}
 *
 * Go source:
 * func (wm *WatchManager) createDirWatch(dir string, recursive bool) error {
 * 	entry := &watchedDir{recursive: recursive}
 * 	request := wm.createDirWatchRequest(dir, entry)
 * 	watch, err := wm.backend.WatchDirectory(request.Dir, request.Callback, request.Recursive, request.Ignore)
 * 	if err != nil {
 * 		if wm.DebugLog != nil {
 * 			fmt.Fprintf(wm.DebugLog, "[watch] failed to watch directory %s: %v\n", dir, err)
 * 		}
 * 		return fmt.Errorf("failed to watch directory %s: %w", dir, err)
 * 	}
 * 	entry.closer = watch
 * 	wm.watchedDirs[dir] = entry
 * 	return nil
 * }
 */
export function WatchManager_createDirWatch(receiver: GoPtr<WatchManager>, dir: string, recursive: bool): GoError {
  const entry: watchedDir = { closer: undefined, recursive };
  const request = WatchManager_createDirWatchRequest(receiver, dir, entry);
  const [watch, err] = receiver!.backend!.WatchDirectory(request.Dir, request.Callback, request.Recursive, request.Ignore);
  if (err !== undefined) {
    if (receiver!.DebugLog !== undefined) {
      Fprintf(receiver!.DebugLog, "[watch] failed to watch directory %s: %v\n", dir, err);
    }
    return Errorf("failed to watch directory %s: %w", dir, err);
  }
  entry.closer = RequireWatchCloser(watch, "WatchBackend.WatchDirectory()");
  receiver!.watchedDirs.set(dir, entry);
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.createDirWatchRequest","kind":"method","status":"implemented","sigHash":"af67b7d562ac551d00008e708274d6ba6356485fb69edc587886bfae1290494d","bodyHash":"cc8abce0b514e56f101505c719205c664b9e99445bc8069a1168aa56fdcf97e7"}
 *
 * Go source:
 * func (wm *WatchManager) createDirWatchRequest(dir string, entry *watchedDir) WatchDirectoryRequest {
 * 	return WatchDirectoryRequest{
 * 		Dir:       dir,
 * 		Recursive: entry.recursive,
 * 		Ignore:    ShouldIgnoreWatchPath,
 * 		Callback: func(events []fswatch.Event, err error) {
 * 			if err != nil && errors.Is(err, fswatch.ErrWatchTerminated) {
 * 				wm.handleWatchTerminated(dir, entry)
 * 				return
 * 			}
 * 			wm.onWatchEvents(events, err)
 * 		},
 * 	}
 * }
 */
export function WatchManager_createDirWatchRequest(receiver: GoPtr<WatchManager>, dir: string, entry: GoPtr<watchedDir>): WatchDirectoryRequest {
  return {
    Dir: dir,
    Recursive: entry!.recursive,
    Ignore: ShouldIgnoreWatchPath,
    Callback: (events: GoSlice<fswatch.Event>, err: GoError): void => {
      if (err !== undefined && errors_Is(err, fswatch.ErrWatchTerminated)) {
        WatchManager_handleWatchTerminated(receiver, dir, entry);
        return;
      }
      WatchManager_onWatchEvents(receiver, events, err);
    },
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.ResolveDesiredDirs","kind":"method","status":"implemented","sigHash":"1c1c19364d97535610d0a5cecd43a621d49fab5f9ab7ae2d096186f3e8bb14f4","bodyHash":"b2a1fdba366f43701160af2f0abd7b230d10916f974c9242f286daa1a79bc4e0"}
 *
 * Go source:
 * func (wm *WatchManager) ResolveDesiredDirs(desiredDirs map[string]bool) map[string]bool {
 * 	resolved := make(map[string]bool, len(desiredDirs))
 * 	for dir, recursive := range desiredDirs {
 * 		watchDir := dir
 * 		watchRecursive := recursive
 * 		for !wm.dirExists(watchDir) {
 * 			parent := tspath.GetDirectoryPath(watchDir)
 * 			if parent == watchDir {
 * 				break
 * 			}
 * 			watchDir = parent
 * 			watchRecursive = false // ancestor fallbacks are always non-recursive
 * 		}
 * 		if !wm.dirExists(watchDir) || !CanWatchDirectory(watchDir) {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] no watchable ancestor for %s\n", dir)
 * 			}
 * 			continue
 * 		}
 * 		if watchDir != dir && wm.DebugLog != nil {
 * 			fmt.Fprintf(wm.DebugLog, "[watch] resolved %s to ancestor %s\n", dir, watchDir)
 * 		}
 * 		if existing, has := resolved[watchDir]; has {
 * 			resolved[watchDir] = existing || watchRecursive
 * 		} else {
 * 			resolved[watchDir] = watchRecursive
 * 		}
 * 	}
 * 	return resolved
 * }
 */
export function WatchManager_ResolveDesiredDirs(receiver: GoPtr<WatchManager>, desiredDirs: GoMap<string, bool>): GoMap<string, bool> {
  const resolved: GoMap<string, bool> = new Map<string, bool>();
  for (const [dir, recursive] of desiredDirs) {
    let watchDir = dir;
    let watchRecursive = recursive;
    while (!receiver!.dirExists(watchDir)) {
      const parent = GetDirectoryPath(watchDir);
      if (parent === watchDir) {
        break;
      }
      watchDir = parent;
      watchRecursive = false as bool;
    }
    if (!receiver!.dirExists(watchDir) || !CanWatchDirectory(watchDir)) {
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] no watchable ancestor for %s\n", dir);
      }
      continue;
    }
    if (watchDir !== dir && receiver!.DebugLog !== undefined) {
      Fprintf(receiver!.DebugLog, "[watch] resolved %s to ancestor %s\n", dir, watchDir);
    }
    if (resolved.has(watchDir)) {
      resolved.set(watchDir, (resolved.get(watchDir)! || watchRecursive) as bool);
    } else {
      resolved.set(watchDir, watchRecursive);
    }
  }
  return resolved;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.ReconcileWatches","kind":"method","status":"implemented","sigHash":"7c4beeaef81c4728f668eb2d95193a0e121ab030e3e0db1fcdcf7c1fc38b4df8","bodyHash":"22fa33ae0c90e588bd841f68fa13e471b7fcc69478b58662b5dc93141d151560"}
 *
 * Go source:
 * func (wm *WatchManager) ReconcileWatches(desiredDirs map[string]bool) error {
 * 	if wm.backend == nil {
 * 		return nil
 * 	}
 *
 * 	var additions []dirWatchUpdate
 * 	var changes []dirWatchUpdate
 *
 * 	core.DiffMapsFunc(
 * 		wm.watchedDirs,
 * 		desiredDirs,
 * 		func(wd *watchedDir, recursive bool) bool { return wd.recursive == recursive },
 * 		func(dir string, recursive bool) {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] watching directory %s (recursive=%v)\n", dir, recursive)
 * 			}
 * 			additions = append(additions, dirWatchUpdate{dir: dir, recursive: recursive})
 * 		},
 * 		func(dir string, wd *watchedDir) {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] closing stale dir watch: %s\n", dir)
 * 			}
 * 			wd.closer.Close()
 * 			delete(wm.watchedDirs, dir)
 * 		},
 * 		func(dir string, wd *watchedDir, recursive bool) {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] recreating dir watch %s (recursive %v→%v)\n", dir, wd.recursive, recursive)
 * 			}
 * 			wd.closer.Close()
 * 			delete(wm.watchedDirs, dir)
 * 			changes = append(changes, dirWatchUpdate{dir: dir, recursive: recursive})
 * 		},
 * 	)
 * 	additions = append(additions, changes...)
 * 	return wm.createDirWatches(additions)
 * }
 */
export function WatchManager_ReconcileWatches(receiver: GoPtr<WatchManager>, desiredDirs: GoMap<string, bool>): GoError {
  if (receiver!.backend === undefined) {
    return undefined;
  }

  let additions: GoSlice<dirWatchUpdate> = [];
  const changes: GoSlice<dirWatchUpdate> = [];
  DiffMapsFunc(
    receiver!.watchedDirs,
    desiredDirs,
    (wd: GoPtr<watchedDir>, recursive: bool): bool => (wd!.recursive === recursive) as bool,
    (dir: string, recursive: bool): void => {
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] watching directory %s (recursive=%v)\n", dir, recursive);
      }
      additions.push({ dir, recursive });
    },
    (dir: string, wd: GoPtr<watchedDir>): void => {
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] closing stale dir watch: %s\n", dir);
      }
      RequireWatchCloser(wd!.closer, "stored watch directory").Close();
      receiver!.watchedDirs.delete(dir);
    },
    (dir: string, wd: GoPtr<watchedDir>, recursive: bool): void => {
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] recreating dir watch %s (recursive %v→%v)\n", dir, wd!.recursive, recursive);
      }
      RequireWatchCloser(wd!.closer, "stored watch directory").Close();
      receiver!.watchedDirs.delete(dir);
      changes.push({ dir, recursive });
    },
  );
  additions = [...additions, ...changes];
  return WatchManager_createDirWatches(receiver, additions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.createDirWatches","kind":"method","status":"implemented","sigHash":"3b5a60b5ca6221ba8437fc5bc5fa7407b2b927a683a162897feff5bd89da3085","bodyHash":"c25f2ffaa7ff30c8a189a29feeb0adbca95e11a2a7ad67852f2a2e5e80cafe40"}
 *
 * Go source:
 * func (wm *WatchManager) createDirWatches(updates []dirWatchUpdate) error {
 * 	if len(updates) == 0 {
 * 		return nil
 * 	}
 * 	requests := make([]WatchDirectoryRequest, len(updates))
 * 	entries := make([]*watchedDir, len(updates))
 * 	for i, update := range updates {
 * 		entry := &watchedDir{recursive: update.recursive}
 * 		entries[i] = entry
 * 		requests[i] = wm.createDirWatchRequest(update.dir, entry)
 * 	}
 * 	closers, err := wm.backend.WatchDirectories(requests)
 * 	if err != nil {
 * 		for i, update := range updates {
 * 			if wm.DebugLog != nil {
 * 				fmt.Fprintf(wm.DebugLog, "[watch] failed to watch directory %s: %v\n", update.dir, err)
 * 			}
 * 			if i < len(closers) && closers[i] != nil {
 * 				closers[i].Close()
 * 			}
 * 		}
 * 		return err
 * 	}
 * 	for i, update := range updates {
 * 		entries[i].closer = closers[i]
 * 		wm.watchedDirs[update.dir] = entries[i]
 * 	}
 * 	return nil
 * }
 */
export function WatchManager_createDirWatches(receiver: GoPtr<WatchManager>, updates: GoSlice<dirWatchUpdate>): GoError {
  if (updates.length === 0) {
    return undefined;
  }
  const requests: GoSlice<WatchDirectoryRequest> = [];
  const entries: GoSlice<GoPtr<watchedDir>> = [];
  for (const update of updates) {
    const entry: watchedDir = { closer: undefined, recursive: update.recursive };
    entries.push(entry);
    requests.push(WatchManager_createDirWatchRequest(receiver, update.dir, entry));
  }
  const [closers, err] = receiver!.backend!.WatchDirectories(requests);
  if (err !== undefined) {
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i]!;
      if (receiver!.DebugLog !== undefined) {
        Fprintf(receiver!.DebugLog, "[watch] failed to watch directory %s: %v\n", update.dir, err);
      }
      if (closers !== undefined && i < closers.length && closers[i] !== undefined) {
        closers[i]!.Close();
      }
    }
    return err;
  }
  if (closers === undefined || closers.length !== updates.length) {
    throw new globalThis.TypeError("WatchBackend.WatchDirectories() returned an invalid closer count without an error");
  }
  const validatedClosers = closers.map((closer, index) => RequireWatchCloser(closer, `WatchBackend.WatchDirectories()[${index}]`));
  for (let i = 0; i < updates.length; i++) {
    const update = updates[i]!;
    entries[i]!.closer = validatedClosers[i]!;
    receiver!.watchedDirs.set(update.dir, entries[i]);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::func::IsDirCoveredByWatch","kind":"func","status":"implemented","sigHash":"c130c5073965184f6241a285ad5e427dd158ff455a819d4d89c2bbc511482580","bodyHash":"5460eb2239bb5c96df5d8201c2a8c473f9b7390f75a86570597be0cee27d74f3"}
 *
 * Go source:
 * func IsDirCoveredByWatch(dirs map[string]bool, dir string, opts tspath.ComparePathsOptions) bool {
 * 	for wdir, recursive := range dirs {
 * 		if recursive {
 * 			if tspath.ContainsPath(wdir, dir, opts) {
 * 				return true
 * 			}
 * 		} else if tspath.ComparePaths(dir, wdir, opts) == 0 {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function IsDirCoveredByWatch(dirs: GoMap<string, bool>, dir: string, opts: ComparePathsOptions): bool {
  for (const [wdir, recursive] of dirs) {
    if (recursive) {
      if (ContainsPath(wdir, dir, opts)) {
        return true as bool;
      }
    } else if (ComparePaths(dir, wdir, opts) === 0) {
      return true as bool;
    }
  }
  return false as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.IsPathUnderWatch","kind":"method","status":"implemented","sigHash":"d79c257964dc2e0dcfedf6ea3de8ea2dd67ff7870df22a72d4b1b7e3661b4efe","bodyHash":"56c7231e87931ca9c0ee933caee6ae02d47bb7778b96934d7c6d62b906934eaf"}
 *
 * Go source:
 * func (wm *WatchManager) IsPathUnderWatch(path string, opts tspath.ComparePathsOptions) bool {
 * 	for dir := range wm.watchedDirs {
 * 		if tspath.ContainsPath(dir, path, opts) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function WatchManager_IsPathUnderWatch(receiver: GoPtr<WatchManager>, path: string, opts: ComparePathsOptions): bool {
  for (const dir of receiver!.watchedDirs.keys()) {
    if (ContainsPath(dir, path, opts)) {
      return true as bool;
    }
  }
  return false as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/watchmanager/watchmanager.go::method::WatchManager.RunLoop","kind":"method","status":"implemented","sigHash":"64e310c97d25b56e9841a18f529150f0d798b4738b13dcd7ff9010153b5d00f9","bodyHash":"54f7a1bff43952fdb9c9f0c622fb9c15bf880c3657ced1ebe1eaae4eda47cf19"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"Go blocks this goroutine in a select loop. The single-threaded JavaScript runtime uses the shared atomic GoChanSelect coordinator, which commits one ready receive, leaves losing channels untouched, and re-arms after each cycle without blocking the event loop."}
 *
 * Go source:
 * func (wm *WatchManager) RunLoop(ctx context.Context, doCycle func()) {
 * 	for {
 * 		select {
 * 		case <-ctx.Done():
 * 			wm.CloseAllWatches()
 * 			return
 * 		case <-wm.doCycleCh:
 * 			doCycle()
 * 		}
 * 	}
 * }
 */
export function WatchManager_RunLoop(receiver: GoPtr<WatchManager>, ctx: Context, doCycle: () => void): void {
  let active = true;

  const stop = (): void => {
    if (!active) {
      return;
    }
    active = false;
    WatchManager_CloseAllWatches(receiver);
  };

  const armSelect = (): void => {
    if (!active) {
      return;
    }
    if (ctx.Err() !== undefined) {
      stop();
      return;
    }

    const select = (kind: "done" | "cycle"): void => {
      if (!active) {
        return;
      }
      if (kind === "done") {
        stop();
        return;
      }
      doCycle();
      armSelect();
    };

    const done = ctx.Done();
    const cases = [GoChanSelectReceive(receiver!.doCycleCh, () => select("cycle"))];
    if (done !== undefined) {
      cases.unshift(GoChanSelectReceive(done, () => select("done")));
    }
    GoChanSelect(cases);
  };

  armSelect();
}
