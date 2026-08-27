import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolutionHost as ResolutionHost__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetCompilerOptionsWithRedirect as GetCompilerOptionsWithRedirect__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewSetWithSizeHint$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { fileLoader } from "./fileloader.js";
import { ProgramOptions } from "./program.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class projectReferenceFileMapper {
    declare private readonly $goType: void;
    public constructor(public opts: ProgramOptions, public host: ResolutionHost__from___go_module | undefined, public loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, public configToProjectReference: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>, public referencesInConfigFile: GoMapValue<Path__from_tspath, RuntimeSlice<gostring>>, public sourceToProjectReference: GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined>, public outputDtsToProjectReference: GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined>, public realpathDtsToSource: SyncMap__from_collections<Path__from_tspath, {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined>) {
    }
    static $copy($source: projectReferenceFileMapper): projectReferenceFileMapper {
        return new projectReferenceFileMapper(ProgramOptions.$copy($source.opts), $source.host, $source.loader, $source.configToProjectReference, $source.referencesInConfigFile, $source.sourceToProjectReference, $source.outputDtsToProjectReference, SyncMap__from_collections.$copy<Path__from_tspath, {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined>($source.realpathDtsToSource));
    }
    declare private readonly then?: never;
    static $go$private$compiler$getCompilerOptionsForFile(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, file: HasFileName__from_ast | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = projectReferenceFileMapper.$go$private$compiler$getRedirectParsedCommandLineForResolution(mapper, file);
        return GetCompilerOptionsWithRedirect__from___go_module(ParsedCommandLine__from_tsoptions.CompilerOptions((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config), new GoInterfaceAdapter(redirect));
    }
    static $go$private$compiler$getParseFileRedirect(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, file: HasFileName__from_ast | undefined): gostring {
        const __gotots_store_0 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "opts"))) {
            const __gotots_receiver_1 = mapper;
            const __gotots_receiver_0 = file;
            const __gotots_argument_0 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_0).Path();
            let source: {
                value: SourceOutputAndProjectReference__from_tsoptions;
            } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromOutputDts(__gotots_receiver_1, __gotots_argument_0);
            if (source === undefined) {
                source = projectReferenceFileMapper.$go$private$compiler$getSourceToDtsIfSymlink(mapper, file);
            }
            if (!(source === undefined)) {
                return (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source;
            }
        }
        else {
            const __gotots_receiver_3 = mapper;
            const __gotots_receiver_2 = file;
            const __gotots_argument_1 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_2).Path();
            let output: {
                value: SourceOutputAndProjectReference__from_tsoptions;
            } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromSource(__gotots_receiver_3, __gotots_argument_1);
            if (!(output === undefined) && (output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutputDts !== "") {
                return (output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutputDts;
            }
        }
        return "";
    }
    static $go$private$compiler$getProjectReferenceFromOutputDts(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, path: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        return (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outputDtsToProjectReference.lookup(path);
    }
    static $go$private$compiler$getProjectReferenceFromSource(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, path: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        return (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceToProjectReference.lookup(path);
    }
    static $go$private$compiler$getRedirectForResolution(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, file: HasFileName__from_ast | undefined): [
        tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined,
        gostring
    ] {
        const __gotots_receiver_9 = file;
        let path = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_9).Path();
        let output: {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromSource(mapper, path);
        if (!(output === undefined)) {
            return [(output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Resolved, (output ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source];
        }
        let resultFromDts: {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromOutputDts(mapper, path);
        if (!(resultFromDts === undefined)) {
            return [(resultFromDts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Resolved, (resultFromDts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source];
        }
        let realpathDtsToSource: {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined = projectReferenceFileMapper.$go$private$compiler$getSourceToDtsIfSymlink(mapper, file);
        if (!(realpathDtsToSource === undefined)) {
            return [(realpathDtsToSource ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Resolved, (realpathDtsToSource ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source];
        }
        const __gotots_results_2 = void 0;
        const __gotots_receiver_10 = file;
        const __gotots_results_3 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_10).FileName();
        return [__gotots_results_2, __gotots_results_3];
    }
    static $go$private$compiler$getRedirectParsedCommandLineForResolution(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, file: HasFileName__from_ast | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_results_4 = projectReferenceFileMapper.$go$private$compiler$getRedirectForResolution(mapper, file);
        let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_4[0];
        return redirect;
    }
    static $go$private$compiler$getResolvedProjectReferences(mapper: {
        value: projectReferenceFileMapper;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined> {
        if ((((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>();
        }
        const __gotots_results_5 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.lookupOk(SourceFile__from_ast.Path(((((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
        let refs = __gotots_results_5[0];
        let ok = __gotots_results_5[1];
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>();
        if (ok) {
            result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>(0, refs.length, void 0);
            const __gotots_range_1 = refs;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_2 = new Path__from_tspath(__gotots_range_1.get(__gotots_range_index_1));
                let refPath = __gotots_range_value_2;
                const __gotots_results_6 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configToProjectReference.lookupOk(refPath);
                let refConfig: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_6[0];
                result = result.append(void 0, [refConfig]);
            }
        }
        return result;
    }
    static $go$private$compiler$getSourceToDtsIfSymlink(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, file: HasFileName__from_ast | undefined): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        const __gotots_receiver_4 = file;
        let path = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_4).Path();
        const __gotots_store_1 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "realpathDtsToSource"), path);
        let realpathDtsToSource: {
            value: SourceOutputAndProjectReference__from_tsoptions;
        } | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok) {
            return realpathDtsToSource;
        }
        if (!((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loader === undefined) && (ParsedCommandLine__from_tsoptions.CompilerOptions((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveSymlinks === TSTrue$constant__from_core()) {
            const __gotots_receiver_5 = file;
            let fileName = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_5).FileName();
            if (!strings__from_gostdlib.Contains(fileName, "/node_modules/")) {
                const __gotots_store_2 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "realpathDtsToSource"), path, void 0);
            }
            else {
                const __gotots_receiver_8 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loader;
                const __gotots_receiver_6 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_receiver_7 = goInterfaceNonNil<ResolutionHost__from___go_module>(__gotots_receiver_6).FS();
                const __gotots_argument_6 = fileName;
                const __gotots_argument_7 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Realpath(__gotots_argument_6);
                let realDeclarationPath = fileLoader.$go$private$compiler$toPath(__gotots_receiver_8, __gotots_argument_7);
                if (realDeclarationPath.$value === path.$value) {
                    const __gotots_store_3 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "realpathDtsToSource"), path, void 0);
                }
                else {
                    let realpathDtsToSource__shadow_1: {
                        value: SourceOutputAndProjectReference__from_tsoptions;
                    } | undefined = projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromOutputDts(mapper, realDeclarationPath);
                    if (!(realpathDtsToSource__shadow_1 === undefined)) {
                        const __gotots_store_4 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "realpathDtsToSource"), path, realpathDtsToSource__shadow_1);
                        return realpathDtsToSource__shadow_1;
                    }
                    const __gotots_store_5 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "realpathDtsToSource"), path, void 0);
                }
            }
        }
        return void 0;
    }
    static $go$private$compiler$isSourceFromProjectReference(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, path: Path__from_tspath): bool {
        const __gotots_store_6 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "opts")) && !(projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromSource(mapper, path) === undefined);
    }
    static $go$private$compiler$rangeResolvedProjectReference(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, f: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int) => bool) | undefined): bool {
        if ((((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) {
            return false;
        }
        let seenRef: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetWithSizeHint$Named_tspath$Path((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.length());
        Set$Add$Named_tspath$Path(seenRef, SourceFile__from_ast.Path(((((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
        let refs = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.lookup(SourceFile__from_ast.Path(((((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
        return projectReferenceFileMapper.$go$private$compiler$rangeResolvedReferenceWorker(mapper, refs, f, (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config, seenRef);
    }
    static $go$private$compiler$rangeResolvedProjectReferenceInChildConfig(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, childConfig: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, f: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int) => bool) | undefined): bool {
        if (childConfig === undefined || ((childConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) {
            return false;
        }
        let seenRef: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetWithSizeHint$Named_tspath$Path((mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.length());
        Set$Add$Named_tspath$Path(seenRef, SourceFile__from_ast.Path((((childConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
        let refs = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.lookup(SourceFile__from_ast.Path((((childConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
        return projectReferenceFileMapper.$go$private$compiler$rangeResolvedReferenceWorker(mapper, refs, f, (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config, seenRef);
    }
    static $go$private$compiler$rangeResolvedReferenceWorker(mapper: {
        value: projectReferenceFileMapper;
    } | undefined, references: RuntimeSlice<gostring>, f: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int) => bool) | undefined, parent: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, seenRef: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): bool {
        const __gotots_range_0 = references;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = new Path__from_tspath(__gotots_range_0.get(__gotots_range_index_0));
            let index = __gotots_range_value_0;
            let path = __gotots_range_value_1;
            if (!Set$AddIfAbsent$Named_tspath$Path(seenRef, path)) {
                continue;
            }
            const __gotots_results_0 = (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configToProjectReference.lookupOk(path);
            let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_0[0];
            const __gotots_callee_0 = f;
            const __gotots_argument_2 = path;
            const __gotots_argument_3 = config;
            const __gotots_argument_4 = parent;
            const __gotots_argument_5 = index;
            if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5)) {
                return false;
            }
            if (!projectReferenceFileMapper.$go$private$compiler$rangeResolvedReferenceWorker(mapper, (mapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referencesInConfigFile.lookup(path), f, config, seenRef)) {
                return false;
            }
        }
        return true;
    }
}
