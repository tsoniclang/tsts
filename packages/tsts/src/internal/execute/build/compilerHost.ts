import type { GoPtr } from "../../../go/compat.js";
import type { SourceFile } from "../../ast/ast.js";
import type { SourceFileParseOptions } from "../../ast/parseoptions.js";
import type { CompilerHost } from "../../compiler/host.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import type { ParsedCommandLine } from "../../tsoptions/parsedcommandline.js";
import type { Path } from "../../tspath/path.js";
import type { FS as FS_d7943d56 } from "../../vfs/vfs.js";
import { host_DefaultLibraryPath, host_FS, host_GetCurrentDirectory, host_GetResolvedProjectReference, host_GetSourceFile } from "./host.js";
import type { host } from "./host.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::type::compilerHost","kind":"type","status":"implemented","sigHash":"4bf4babef578ff9bdfa956d0b584af72db5fcca9f8fd79bf7ca2904620f748b9"}
 *
 * Go source:
 * compilerHost struct {
 * 	host  *host
 * 	trace func(msg *diagnostics.Message, args ...any)
 * }
 */
export interface compilerHost {
  host: GoPtr<host>;
  trace: GoFunc<(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"8c5d67f3c7f9a76738bd580ea8317b0653eddd0b682e4212ef9238cf51a627f1"}
 *
 * Go source:
 * var _ compiler.CompilerHost = (*compilerHost)(nil)
 */
export let __56b7611d_0: GoInterface<CompilerHost> = compilerHost_as_compiler_CompilerHost(undefined);

export function compilerHost_as_compiler_CompilerHost(receiver: GoPtr<compilerHost>): CompilerHost {
  return {
    FS: (): FS_d7943d56 => compilerHost_FS(receiver)!,
    DefaultLibraryPath: (): string => compilerHost_DefaultLibraryPath(receiver),
    GetCurrentDirectory: (): string => compilerHost_GetCurrentDirectory(receiver),
    Trace: (msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void => compilerHost_Trace(receiver, msg, ...args),
    GetSourceFile: (opts: SourceFileParseOptions): GoPtr<SourceFile> => compilerHost_GetSourceFile(receiver, opts),
    GetResolvedProjectReference: (fileName: string, path: Path): GoPtr<ParsedCommandLine> => compilerHost_GetResolvedProjectReference(receiver, fileName, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.FS","kind":"method","status":"implemented","sigHash":"7ac0a1648e426ff99ce6a3ac7e77e71a456472c1a332481b2b8db77fe0a4e059"}
 *
 * Go source:
 * func (h *compilerHost) FS() vfs.FS {
 * 	return h.host.FS()
 * }
 */
export function compilerHost_FS(receiver: GoPtr<compilerHost>): GoInterface<FS_d7943d56> {
  return host_FS(receiver!.host);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.DefaultLibraryPath","kind":"method","status":"implemented","sigHash":"a8d4b4fc269ee0449007c06f8d637a123a84b81789d5f37cc9bb9f3cb451316f"}
 *
 * Go source:
 * func (h *compilerHost) DefaultLibraryPath() string {
 * 	return h.host.DefaultLibraryPath()
 * }
 */
export function compilerHost_DefaultLibraryPath(receiver: GoPtr<compilerHost>): string {
  return host_DefaultLibraryPath(receiver!.host);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"8802fe9fb802445dcb46fe0c4a81219208beeec440660865d52ae456fd5588c0"}
 *
 * Go source:
 * func (h *compilerHost) GetCurrentDirectory() string {
 * 	return h.host.GetCurrentDirectory()
 * }
 */
export function compilerHost_GetCurrentDirectory(receiver: GoPtr<compilerHost>): string {
  return host_GetCurrentDirectory(receiver!.host);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.Trace","kind":"method","status":"implemented","sigHash":"1b934b532f93eb7e5fd29017668ca705872b4fa2ba9b3015ff218a044ca4b398"}
 *
 * Go source:
 * func (h *compilerHost) Trace(msg *diagnostics.Message, args ...any) {
 * 	h.trace(msg, args...)
 * }
 */
export function compilerHost_Trace(receiver: GoPtr<compilerHost>, msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void {
  receiver!.trace!(msg, ...args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.GetSourceFile","kind":"method","status":"implemented","sigHash":"a8a084935626b36306b1da45c54ef8fbc502ddff10eabda4755f65c7de9b3e14"}
 *
 * Go source:
 * func (h *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
 * 	return h.host.GetSourceFile(opts)
 * }
 */
export function compilerHost_GetSourceFile(receiver: GoPtr<compilerHost>, opts: SourceFileParseOptions): GoPtr<SourceFile> {
  return host_GetSourceFile(receiver!.host, opts);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/compilerHost.go::method::compilerHost.GetResolvedProjectReference","kind":"method","status":"implemented","sigHash":"9d02fa528e0c84ae5bf9345ad093fcefcc4675b7ea3a3893522917afb784f7a2"}
 *
 * Go source:
 * func (h *compilerHost) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
 * 	return h.host.GetResolvedProjectReference(fileName, path)
 * }
 */
export function compilerHost_GetResolvedProjectReference(receiver: GoPtr<compilerHost>, fileName: string, path: Path): GoPtr<ParsedCommandLine> {
  return host_GetResolvedProjectReference(receiver!.host, fileName, path);
}
