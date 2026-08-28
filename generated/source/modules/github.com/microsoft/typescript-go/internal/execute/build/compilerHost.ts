import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { host } from "./host.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class compilerHost {
    declare private readonly $goType: void;
    public constructor(public host: {
        value: host;
    } | undefined, public trace: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined) {
    }
    static $copy($source: compilerHost): compilerHost {
        return new compilerHost($source.host, $source.trace);
    }
    declare private readonly then?: never;
    static DefaultLibraryPath(h: {
        value: compilerHost;
    } | undefined): gostring {
        return host.DefaultLibraryPath((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
    }
    static FS(h: {
        value: compilerHost;
    } | undefined): FS__from_vfs | undefined {
        return host.FS((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
    }
    static GetCurrentDirectory(h: {
        value: compilerHost;
    } | undefined): gostring {
        return host.GetCurrentDirectory((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
    }
    static GetResolvedProjectReference(h: {
        value: compilerHost;
    } | undefined, fileName: gostring, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        return host.GetResolvedProjectReference((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, fileName, path);
    }
    static GetSourceFile(h: {
        value: compilerHost;
    } | undefined, opts: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return host.GetSourceFile((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, SourceFileParseOptions__from_ast.$copy(opts));
    }
    static Trace(h: {
        value: compilerHost;
    } | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        const __gotots_callee_0: compilerHost["trace"] = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trace;
        const __gotots_argument_0 = msg;
        const __gotots_argument_1 = args;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
    }
}
