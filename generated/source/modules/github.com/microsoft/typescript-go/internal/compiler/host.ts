import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { ExtendedConfigCache as ExtendedConfigCache__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetScriptKindFromFileName as GetScriptKindFromFileName__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ParseSourceFile as ParseSourceFile__from_parser } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { GetParsedCommandLineOfConfigFilePath as GetParsedCommandLineOfConfigFilePath__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { From as From__from_cachedvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$compilerHost, $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$DefaultLibraryPath$void_to_string, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetResolvedProjectReference$string_Named_tspath$Path_to_PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceMethod$GetSourceFile$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$Trace$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void } from "../../../../../../support/interface-methods.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export interface CompilerHost extends GoInterfaceValue {
    DefaultLibraryPath(): gostring;
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
    GetResolvedProjectReference($argument0: gostring, $argument1: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined;
    GetSourceFile($argument0: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    Trace($argument0: {
        value: Message__from_diagnostics;
    } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): void;
}
export const CompilerHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$DefaultLibraryPath$void_to_string, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetResolvedProjectReference$string_Named_tspath$Path_to_PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceMethod$GetSourceFile$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$Trace$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void]);
export function CompilerHost$is(value: GoInterfaceValue | undefined): value is CompilerHost {
    return value !== undefined && value.$go$implements(CompilerHost$contract);
}
export class compilerHost {
    declare private readonly $goType: void;
    public constructor(public currentDirectory: gostring, public fs: FS__from_vfs | undefined, public defaultLibraryPath: gostring, public extendedConfigCache: ExtendedConfigCache__from_tsoptions | undefined, public trace: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined) {
    }
    static $copy($source: compilerHost): compilerHost {
        return new compilerHost($source.currentDirectory, $source.fs, $source.defaultLibraryPath, $source.extendedConfigCache, $source.trace);
    }
    declare private readonly then?: never;
    static DefaultLibraryPath(h: {
        value: compilerHost;
    } | undefined): gostring {
        return (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.defaultLibraryPath;
    }
    static FS(h: {
        value: compilerHost;
    } | undefined): FS__from_vfs | undefined {
        return (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static GetCurrentDirectory(h: {
        value: compilerHost;
    } | undefined): gostring {
        return (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
    }
    static GetResolvedProjectReference(h: {
        value: compilerHost;
    } | undefined, fileName: gostring, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_results_0 = GetParsedCommandLineOfConfigFilePath__from_tsoptions(fileName, path, void 0, void 0, new $goInterfaceAdapter$PointerTo_Named_compiler$compilerHost(h), (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache);
        let commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_0[0];
        return commandLine;
    }
    static GetSourceFile(h: {
        value: compilerHost;
    } | undefined, opts: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_receiver_0 = compilerHost.FS(h);
        const __gotots_argument_0 = SourceFileParseOptions__from_ast.$storageOf(opts).FileName;
        const __gotots_results_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).ReadFile(__gotots_argument_0);
        let text = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (!ok) {
            return void 0;
        }
        return ParseSourceFile__from_parser(SourceFileParseOptions__from_ast.$copy(opts), text, GetScriptKindFromFileName__from_core(SourceFileParseOptions__from_ast.$storageOf(opts).FileName));
    }
    static Trace(h: {
        value: compilerHost;
    } | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        const __gotots_callee_0: compilerHost["trace"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trace;
        const __gotots_argument_1 = msg;
        const __gotots_argument_2 = args;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2);
    }
}
export function NewCachedFSCompilerHost(currentDirectory: gostring, fs: FS__from_vfs | undefined, defaultLibraryPath: gostring, extendedConfigCache: ExtendedConfigCache__from_tsoptions | undefined, trace: (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined): CompilerHost | undefined {
    return NewCompilerHost(currentDirectory, new GoInterfaceAdapter(From__from_cachedvfs(fs)), defaultLibraryPath, extendedConfigCache, trace);
}
export function NewCompilerHost(currentDirectory: gostring, fs: FS__from_vfs | undefined, defaultLibraryPath: gostring, extendedConfigCache: ExtendedConfigCache__from_tsoptions | undefined, trace: (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined): CompilerHost | undefined {
    if (trace === undefined) {
        trace = (msg: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<GoInterface | undefined>): void => {
        };
    }
    return new $goInterfaceAdapter$PointerTo_Named_compiler$compilerHost({ value: new compilerHost(currentDirectory, fs, defaultLibraryPath, extendedConfigCache, trace) });
}
