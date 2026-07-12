import type { GoError, GoPtr } from "../../../go/compat.js";
import { Time } from "../../../go/time.js";
import type { CompilerHost } from "../../compiler/host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::Host","kind":"type","status":"implemented","sigHash":"87dbe6f0cfe05a5aa6179f6a36adf26e7d8bf5f0f92113c8de338be891efa895"}
 *
 * Go source:
 * Host interface {
 * 	GetMTime(fileName string) time.Time
 * 	SetMTime(fileName string, mTime time.Time) error
 * }
 */
export interface Host {
  GetMTime(fileName: string): Time;
  SetMTime(fileName: string, mTime: Time): GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::host","kind":"type","status":"implemented","sigHash":"4878a075c6246d276432fff1aab5b03ef485e8fc6f147876280d0e8e305a382a"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ Host = (*host)(nil)
 */
export let __bbc5d83a_0: Host = host_as_incremental_Host(undefined);

export function host_as_incremental_Host(receiver: GoPtr<host>): Host {
  return {
    GetMTime: (fileName: string): Time => host_GetMTime(receiver, fileName),
    SetMTime: (fileName: string, mTime: Time): GoError => host_SetMTime(receiver, fileName, mTime),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::method::host.GetMTime","kind":"method","status":"implemented","sigHash":"b440e4ec0f5cf0c0011a054bf20144b8f6cb39805f65ef7903d31c15133fd296"}
 *
 * Go source:
 * func (b *host) GetMTime(fileName string) time.Time {
 * 	return GetMTime(b.host, fileName)
 * }
 */
export function host_GetMTime(receiver: GoPtr<host>, fileName: string): Time {
  return GetMTime(receiver!.host, fileName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::method::host.SetMTime","kind":"method","status":"implemented","sigHash":"db2611667cf2c2a41c055e88daaa90d49fc4cb5b9dae41ff087c010fc5bc74ac"}
 *
 * Go source:
 * func (b *host) SetMTime(fileName string, mTime time.Time) error {
 * 	return b.host.FS().Chtimes(fileName, time.Time{}, mTime)
 * }
 */
export function host_SetMTime(receiver: GoPtr<host>, fileName: string, mTime: Time): GoError {
  return receiver!.host.FS().Chtimes(fileName, new Time(), mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::func::CreateHost","kind":"func","status":"implemented","sigHash":"bd0d254c73092c2873e8dd7181669d7545654e787a2a268d62423fab98897661"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::func::GetMTime","kind":"func","status":"implemented","sigHash":"0428c75afb0c7742e7a230362ec7cf730f0d26fffaa1542c35e9c9fc57d9a385"}
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
  type FileInfoWithModTime = { ModTime(): Time };
  const stat = host.FS().Stat(fileName);
  let mTime: Time = new Time();
  if (stat !== undefined) {
    mTime = (stat as unknown as FileInfoWithModTime).ModTime();
  }
  return mTime;
}
