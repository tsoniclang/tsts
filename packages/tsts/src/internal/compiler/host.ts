import type { GoFunc, GoPtr } from "../../go/compat.js";
import type { SourceFile } from "../ast/ast.js";
import type { SourceFileParseOptions } from "../ast/parseoptions.js";
import { GetScriptKindFromFileName } from "../core/core.js";
import type { Message } from "../diagnostics/diagnostics.js";
import { GetParsedCommandLineOfConfigFilePath } from "../tsoptions/tsconfigparsing.js";
import type { ParsedCommandLine } from "../tsoptions/parsedcommandline.js";
import type { ExtendedConfigCache } from "../tsoptions/tsconfigparsing.js";
import type { Path } from "../tspath/path.js";
import type { FS as FS_4e804012 } from "../vfs/vfs.js";
import { From as cachedvfsFrom, FS_as_vfs_FS as cachedvfsAsVfsFS } from "../vfs/cachedvfs/cachedvfs.js";
import { init as initJSDocParser } from "../parser/jsdoc.js";
import { ParseSourceFile } from "../parser/parser/statements-declarations.js";

import type { GoInterface } from "../../go/compat.js";
initJSDocParser();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::type::CompilerHost","kind":"type","status":"implemented","sigHash":"319f081bf4446cfb78e78229efac86213d9c967cf1530c9feb54b28489fea241"}
 *
 * Go source:
 * CompilerHost interface {
 * 	FS() vfs.FS
 * 	DefaultLibraryPath() string
 * 	GetCurrentDirectory() string
 * 	Trace(msg *diagnostics.Message, args ...any)
 * 	GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile
 * 	GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine
 * }
 */
export interface CompilerHost {
  FS(): GoInterface<FS_4e804012>;
  DefaultLibraryPath(): string;
  GetCurrentDirectory(): string;
  Trace(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void;
  GetSourceFile(opts: SourceFileParseOptions): GoPtr<SourceFile>;
  GetResolvedProjectReference(fileName: string, path: Path): GoPtr<ParsedCommandLine>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"b52cb61a302c45114c3ec19369c1ca7dde9fa968581766c449a23f4e0f053683"}
 *
 * Go source:
 * var _ CompilerHost = (*compilerHost)(nil)
 */
export let __9ad05d82_0: GoInterface<CompilerHost> = compilerHost_as_compiler_CompilerHost(undefined);

export function compilerHost_as_compiler_CompilerHost(receiver: GoPtr<compilerHost>): CompilerHost {
  return {
    FS: (): FS_4e804012 => compilerHost_FS(receiver)!,
    DefaultLibraryPath: (): string => compilerHost_DefaultLibraryPath(receiver),
    GetCurrentDirectory: (): string => compilerHost_GetCurrentDirectory(receiver),
    Trace: (msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void => compilerHost_Trace(receiver, msg, ...args),
    GetSourceFile: (opts: SourceFileParseOptions): GoPtr<SourceFile> => compilerHost_GetSourceFile(receiver, opts),
    GetResolvedProjectReference: (fileName: string, path: Path): GoPtr<ParsedCommandLine> => compilerHost_GetResolvedProjectReference(receiver, fileName, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::type::compilerHost","kind":"type","status":"implemented","sigHash":"f7c43bc4eafc5ebbf42aef5f0ad6d223b712751461eedb723e678d8ba5cde7e2"}
 *
 * Go source:
 * compilerHost struct {
 * 	currentDirectory    string
 * 	fs                  vfs.FS
 * 	defaultLibraryPath  string
 * 	extendedConfigCache tsoptions.ExtendedConfigCache
 * 	trace               func(msg *diagnostics.Message, args ...any)
 * }
 */
export interface compilerHost {
  currentDirectory: string;
  fs: GoInterface<FS_4e804012>;
  defaultLibraryPath: string;
  extendedConfigCache: GoInterface<ExtendedConfigCache>;
  trace: GoFunc<(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::func::NewCachedFSCompilerHost","kind":"func","status":"implemented","sigHash":"60930d3c5b37765ea6556d812a899df6810424f41904f279f449c8be2bb0c2ed"}
 *
 * Go source:
 * func NewCachedFSCompilerHost(
 * 	currentDirectory string,
 * 	fs vfs.FS,
 * 	defaultLibraryPath string,
 * 	extendedConfigCache tsoptions.ExtendedConfigCache,
 * 	trace func(msg *diagnostics.Message, args ...any),
 * ) CompilerHost {
 * 	return NewCompilerHost(currentDirectory, cachedvfs.From(fs), defaultLibraryPath, extendedConfigCache, trace)
 * }
 */
export function NewCachedFSCompilerHost(currentDirectory: string, fs: GoInterface<FS_4e804012>, defaultLibraryPath: string, extendedConfigCache: GoInterface<ExtendedConfigCache>, trace: GoFunc<(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void>): GoInterface<CompilerHost> {
  return NewCompilerHost(currentDirectory, cachedvfsAsVfsFS(cachedvfsFrom(fs)), defaultLibraryPath, extendedConfigCache, trace);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::func::NewCompilerHost","kind":"func","status":"implemented","sigHash":"e6e45396ef101cb38a02eccde7240ad601b1af04a145b53b886342dba2c37136"}
 *
 * Go source:
 * func NewCompilerHost(
 * 	currentDirectory string,
 * 	fs vfs.FS,
 * 	defaultLibraryPath string,
 * 	extendedConfigCache tsoptions.ExtendedConfigCache,
 * 	trace func(msg *diagnostics.Message, args ...any),
 * ) CompilerHost {
 * 	if trace == nil {
 * 		trace = func(msg *diagnostics.Message, args ...any) {}
 * 	}
 * 	return &compilerHost{
 * 		currentDirectory:    currentDirectory,
 * 		fs:                  fs,
 * 		defaultLibraryPath:  defaultLibraryPath,
 * 		extendedConfigCache: extendedConfigCache,
 * 		trace:               trace,
 * 	}
 * }
 */
export function NewCompilerHost(currentDirectory: string, fs: GoInterface<FS_4e804012>, defaultLibraryPath: string, extendedConfigCache: GoInterface<ExtendedConfigCache>, trace: GoFunc<(msg: GoPtr<Message>, ...args: Array<GoInterface<unknown>>) => void>): GoInterface<CompilerHost> {
  if (trace === undefined) {
    trace = (_msg: GoPtr<Message>, ..._args: Array<GoInterface<unknown>>): void => {};
  }
  const h: compilerHost = {
    currentDirectory,
    fs,
    defaultLibraryPath,
    extendedConfigCache,
    trace,
  };
  return compilerHost_as_compiler_CompilerHost(h);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.FS","kind":"method","status":"implemented","sigHash":"7ac0a1648e426ff99ce6a3ac7e77e71a456472c1a332481b2b8db77fe0a4e059"}
 *
 * Go source:
 * func (h *compilerHost) FS() vfs.FS {
 * 	return h.fs
 * }
 */
export function compilerHost_FS(receiver: GoPtr<compilerHost>): GoInterface<FS_4e804012> {
  return receiver!.fs;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.DefaultLibraryPath","kind":"method","status":"implemented","sigHash":"a8d4b4fc269ee0449007c06f8d637a123a84b81789d5f37cc9bb9f3cb451316f"}
 *
 * Go source:
 * func (h *compilerHost) DefaultLibraryPath() string {
 * 	return h.defaultLibraryPath
 * }
 */
export function compilerHost_DefaultLibraryPath(receiver: GoPtr<compilerHost>): string {
  return receiver!.defaultLibraryPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"8802fe9fb802445dcb46fe0c4a81219208beeec440660865d52ae456fd5588c0"}
 *
 * Go source:
 * func (h *compilerHost) GetCurrentDirectory() string {
 * 	return h.currentDirectory
 * }
 */
export function compilerHost_GetCurrentDirectory(receiver: GoPtr<compilerHost>): string {
  return receiver!.currentDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.Trace","kind":"method","status":"implemented","sigHash":"1b934b532f93eb7e5fd29017668ca705872b4fa2ba9b3015ff218a044ca4b398"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.GetSourceFile","kind":"method","status":"implemented","sigHash":"a8a084935626b36306b1da45c54ef8fbc502ddff10eabda4755f65c7de9b3e14"}
 *
 * Go source:
 * func (h *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
 * 	text, ok := h.FS().ReadFile(opts.FileName)
 * 	if !ok {
 * 		return nil
 * 	}
 * 	return parser.ParseSourceFile(opts, text, core.GetScriptKindFromFileName(opts.FileName))
 * }
 */
export function compilerHost_GetSourceFile(receiver: GoPtr<compilerHost>, opts: SourceFileParseOptions): GoPtr<SourceFile> {
  const [text, ok] = compilerHost_FS(receiver)!.ReadFile(opts.FileName);
  if (!ok) {
    return undefined;
  }
  return ParseSourceFile(opts, text, GetScriptKindFromFileName(opts.FileName));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/host.go::method::compilerHost.GetResolvedProjectReference","kind":"method","status":"implemented","sigHash":"9d02fa528e0c84ae5bf9345ad093fcefcc4675b7ea3a3893522917afb784f7a2"}
 *
 * Go source:
 * func (h *compilerHost) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
 * 	commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, nil, nil /*optionsRaw* /, h, h.extendedConfigCache)
 * 	return commandLine
 * }
 */
export function compilerHost_GetResolvedProjectReference(receiver: GoPtr<compilerHost>, fileName: string, path: Path): GoPtr<ParsedCommandLine> {
  const [commandLine] = GetParsedCommandLineOfConfigFilePath(fileName, path, undefined, undefined, compilerHost_as_compiler_CompilerHost(receiver), receiver!.extendedConfigCache);
  return commandLine;
}
