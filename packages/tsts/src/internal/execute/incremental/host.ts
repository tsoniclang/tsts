import type { GoError, GoPtr } from "../../../go/compat.js";
import { Time } from "../../../go/time.js";
import type { CompilerHost } from "../../compiler/host.js";
import type { FS } from "../../vfs/vfs.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::Host","kind":"type","status":"implemented","sigHash":"87dbe6f0cfe05a5aa6179f6a36adf26e7d8bf5f0f92113c8de338be891efa895","bodyHash":"1a7c0a301724281408b7e1b989e025602f37355ba428fe8b2d75bb11f7b9174c"}
 *
 * Go source:
 * Host interface {
 * 	FS() vfs.FS
 * 	GetMTime(fileName string) time.Time
 * 	SetMTime(fileName string, mTime time.Time) error
 * }
 */
export interface Host {
  FS(): FS;
  GetMTime(fileName: string): Time;
  SetMTime(fileName: string, mTime: Time): GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::host","kind":"type","status":"implemented","sigHash":"4878a075c6246d276432fff1aab5b03ef485e8fc6f147876280d0e8e305a382a","bodyHash":"d01b4ba443eea78ad6a9ae0dbc82fe36f7057d9afc16b6da4801d5c8a085498c"}
 *
 * Go source:
 * host struct {
 * 	host compiler.CompilerHost
 * }
 */
export interface host {
  host: CompilerHost;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e","bodyHash":"512192df8cd356d4d054e0e1b08c1465c3f8ba1ef146418da3e113469e14fa7d"}
 *
 * Go source:
 * var _ Host = (*host)(nil)
 */
export let __bbc5d83a_0: Host = host_as_incremental_Host(undefined);

export function host_as_incremental_Host(receiver: GoPtr<host>): Host {
  return {
    FS: (): FS => host_FS(receiver),
    GetMTime: (fileName: string): Time => host_GetMTime(receiver, fileName),
    SetMTime: (fileName: string, mTime: Time): GoError => host_SetMTime(receiver, fileName, mTime),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::method::host.FS","kind":"method","status":"implemented","sigHash":"d45876671f8945bccb97e542ce2ec67006013d8bab7e6cd3ee77196ea144fb66","bodyHash":"b36a5440d8ae5c318b21bc54eac0bd347d8af98e63f610cfa6e0381ec36d4afc"}
 *
 * Go source:
 * func (h *host) FS() vfs.FS {
 * 	return h.host.FS()
 * }
 */
export function host_FS(receiver: GoPtr<host>): FS {
  return receiver!.host.FS();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::method::host.GetMTime","kind":"method","status":"implemented","sigHash":"3fbe03bb8a4bcccda6812c93d154e1cc28484f37ce07f8162e651519d5a74c3c","bodyHash":"2230f96fdfa019cb941206c9ece545adaf6ecb44621900ef7c91049fcd26dd19"}
 *
 * Go source:
 * func (h *host) GetMTime(fileName string) time.Time {
 * 	return GetMTime(h.host, fileName)
 * }
 */
export function host_GetMTime(receiver: GoPtr<host>, fileName: string): Time {
  return GetMTime(receiver!.host, fileName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::method::host.SetMTime","kind":"method","status":"implemented","sigHash":"1fb0e3f725dc08e69c77a0d99a131294d611f60f652f9f3974a826e4d7cc28e5","bodyHash":"d9f72e14b9ae458835a1406fb40ddeb0ecf2645b3d8fedf1f09d63bcca07fe6f"}
 *
 * Go source:
 * func (h *host) SetMTime(fileName string, mTime time.Time) error {
 * 	return h.host.FS().Chtimes(fileName, time.Time{}, mTime)
 * }
 */
export function host_SetMTime(receiver: GoPtr<host>, fileName: string, mTime: Time): GoError {
  return receiver!.host.FS().Chtimes(fileName, new Time(), mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::func::CreateHost","kind":"func","status":"implemented","sigHash":"bd0d254c73092c2873e8dd7181669d7545654e787a2a268d62423fab98897661","bodyHash":"7ba873f7d04e696694406ae4c747e68d93be9e96cef1fece4dfee3d4c06b1cb2"}
 *
 * Go source:
 * func CreateHost(compilerHost compiler.CompilerHost) Host {
 * 	return &host{host: compilerHost}
 * }
 */
export function CreateHost(compilerHost: CompilerHost): Host {
  const h: host = { host: compilerHost };
  return host_as_incremental_Host(h);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::func::GetMTime","kind":"func","status":"implemented","sigHash":"0428c75afb0c7742e7a230362ec7cf730f0d26fffaa1542c35e9c9fc57d9a385","bodyHash":"91cbc9c899d91cc504d1f416bf00ccb77b379b232b978f48e6009ddc0c07e912"}
 *
 * Go source:
 * func GetMTime(host compiler.CompilerHost, fileName string) time.Time {
 * 	stat := host.FS().Stat(fileName)
 * 	var mTime time.Time
 * 	if stat != nil {
 * 		mTime = stat.ModTime()
 * 	}
 * 	return mTime
 * }
 */
export function GetMTime(host: CompilerHost, fileName: string): Time {
  const stat = host.FS().Stat(fileName);
  let mTime: Time = new Time();
  if (stat !== undefined) {
    mTime = stat.ModTime();
  }
  return mTime;
}
