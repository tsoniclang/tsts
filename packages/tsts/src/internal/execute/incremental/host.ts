import type { GoError, GoPtr } from "../../../go/compat.js";
import { Time } from "../../../go/time.js";
import type { CompilerHost } from "../../compiler/host.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::Host","kind":"type","status":"implemented","sigHash":"31c183fb6ba46cac3beda7d365db28f1eb48f85a81060c6eb4cd886a51127459"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::type::host","kind":"type","status":"implemented","sigHash":"d01b4ba443eea78ad6a9ae0dbc82fe36f7057d9afc16b6da4801d5c8a085498c"}
 *
 * Go source:
 * host struct {
 * 	host compiler.CompilerHost
 * }
 */
export interface host {
  host: GoInterface<CompilerHost>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"9b7ca15aedd1f4e3ec668ba19196a3324cd120c0c1842c4781db9fcc669447f2"}
 *
 * Go source:
 * var _ Host = (*host)(nil)
 */
export let __bbc5d83a_0: GoInterface<Host> = host_as_incremental_Host(undefined);

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
  return receiver!.host!.FS()!.Chtimes(fileName, new Time(), mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/incremental/host.go::func::CreateHost","kind":"func","status":"implemented","sigHash":"bd0d254c73092c2873e8dd7181669d7545654e787a2a268d62423fab98897661"}
 *
 * Go source:
 * func CreateHost(compilerHost compiler.CompilerHost) Host {
 * 	return &host{host: compilerHost}
 * }
 */
export function CreateHost(compilerHost: GoInterface<CompilerHost>): GoInterface<Host> {
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
export function GetMTime(host: GoInterface<CompilerHost>, fileName: string): Time {
  type FileInfoWithModTime = { ModTime(): Time };
  const stat = host!.FS()!.Stat(fileName);
  let mTime: Time = new Time();
  if (stat !== undefined) {
    mTime = (stat as unknown as FileInfoWithModTime).ModTime();
  }
  return mTime;
}
