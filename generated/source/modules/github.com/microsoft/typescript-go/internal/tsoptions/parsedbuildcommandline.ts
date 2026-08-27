import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { BuildOptions as BuildOptions__from_core, CompilerOptions as CompilerOptions__from_core, WatchOptions as WatchOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { ResolveConfigFileNameOfProjectReference as ResolveConfigFileNameOfProjectReference__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Locale as Locale__from_locale, Parse as Parse__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ResolvePath as ResolvePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Map$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ParsedBuildCommandLine {
    declare private readonly $goType: void;
    public constructor(public BuildOptions: {
        value: BuildOptions__from_core;
    } | undefined, public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public WatchOptions: {
        value: WatchOptions__from_core;
    } | undefined, public Projects: RuntimeSlice<gostring>, public Errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public Raw: GoInterface | undefined, public comparePathsOptions: ComparePathsOptions__from_tspath, public resolvedProjectPaths: RuntimeSlice<gostring>, public resolvedProjectPathsOnce: sync__from_gostdlib.Once, public locale: Locale__from_locale, public localeOnce: sync__from_gostdlib.Once) {
    }
    static $copy($source: ParsedBuildCommandLine): ParsedBuildCommandLine {
        return new ParsedBuildCommandLine($source.BuildOptions, $source.CompilerOptions, $source.WatchOptions, $source.Projects, $source.Errors, $source.Raw, ComparePathsOptions__from_tspath.$copy($source.comparePathsOptions), $source.resolvedProjectPaths, named_sync.SyncOnceOperations.$copy($source.resolvedProjectPathsOnce), Locale__from_locale.$copy($source.locale), named_sync.SyncOnceOperations.$copy($source.localeOnce));
    }
    declare private readonly then?: never;
    static Locale(p: {
        value: ParsedBuildCommandLine;
    } | undefined): Locale__from_locale {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localeOnce, (): void => {
            const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_0 = Parse__from_locale(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Locale);
            __gotots_store_0.locale = __gotots_results_0[0];
        });
        return Locale__from_locale.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locale);
    }
    static ResolvedProjectPaths(p: {
        value: ParsedBuildCommandLine;
    } | undefined): RuntimeSlice<gostring> {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolvedProjectPathsOnce, (): void => {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolvedProjectPaths = Map$string$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Projects, (project: gostring): gostring => {
                return ResolveConfigFileNameOfProjectReference__from_core(ResolvePath__from_tspath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.CurrentDirectory, RuntimeSlice.literal<gostring>([project])));
            });
        });
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolvedProjectPaths;
    }
}
