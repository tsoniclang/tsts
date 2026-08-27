import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { SourceFileParseOptions$Storage as SourceFileParseOptions__from_ast$Storage } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/parseoptions.js";
import type { parseCacheEntry as parseCacheEntry__from_build } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/parseCache.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/parseoptions.js";
import { parseCache as parseCache__from_build } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/parseCache.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceAdapter$Named_ast$SourceFileParseOptions as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function parseCache$loadOrStore$Named_ast$SourceFileParseOptions$PointerTo_Named_ast$SourceFile($argument0: tsonicTypeScriptRuntime.Location<parseCache__from_build<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>> | undefined, $argument1: SourceFileParseOptions__from_ast, $argument2: (($0: SourceFileParseOptions__from_ast) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined, $argument3: bool): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
    return parseCache__from_build.$go$private$build$loadOrStore$kernel<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: SourceFileParseOptions__from_ast): SourceFileParseOptions__from_ast => {
        return SourceFileParseOptions__from_ast.$copy($argument0);
    }, ($argument0: {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: SourceFileParseOptions__from_ast): GoInterface | undefined => {
        return new GoInterfaceAdapter(SourceFileParseOptions__from_ast.$copy($argument0));
    }, ($argument0: {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_ast$SourceFile($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_ast$SourceFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, (): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return void 0;
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument1, $argument2, $argument3);
}
export function parseCache$loadOrStore$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine($argument0: tsonicTypeScriptRuntime.Location<parseCache__from_build<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: (($0: Path__from_tspath) => tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined) | undefined, $argument3: bool): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
    return parseCache__from_build.$go$private$build$loadOrStore$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $argument1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
    } | undefined): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_tsoptions$ParsedCommandLine($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_build$parseCacheEntryOf_PointerTo_Named_tsoptions$ParsedCommandLine.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return $argument0;
    }, (): {
        value: parseCacheEntry__from_build<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
    } | undefined => {
        return void 0;
    }, (): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined => {
        return void 0;
    }, $argument1, $argument2, $argument3);
}
