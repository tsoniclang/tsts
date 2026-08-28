import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RepopulateDiagnosticInfo as RepopulateDiagnosticInfo__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { WriteFileData as WriteFileData__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { ModuleKind as ModuleKind__from_core, Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Category as Category__from_diagnostics, Key as Key__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32, uint32 } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast, NewDiagnosticFromSerialized as NewDiagnosticFromSerialized__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CreateModeMismatchDetails as CreateModeMismatchDetails__from_checker, CreateModuleNotFoundChain as CreateModuleNotFoundChain__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, NewTextRange as NewTextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Category_Name as Category_Name__from_diagnostics, Message as Message__from_diagnostics, StringifyArgs as StringifyArgs__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, EnsurePathIsNonModuleName as EnsurePathIsNonModuleName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { HashString128 as HashString128__from_xxh3 } from "../../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Delete.js";
import { SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_ast$Diagnostic } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$int32, $goInterfaceAdapter$PointerTo_Named_compiler$Program as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { referenceMap } from "./referencemap.js";
import * as hex__from_gostdlib from "@gotots/gostdlib/encoding/hex.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class FileInfo {
    declare private readonly $goType: void;
    public constructor(public version: gostring, public signature: gostring, public affectsGlobalScope: bool, public impliedNodeFormat: ModuleKind__from_core) {
    }
    static $copy($source: FileInfo): FileInfo {
        return new FileInfo($source.version, $source.signature, $source.affectsGlobalScope, $source.impliedNodeFormat);
    }
    static $equal($left: FileInfo, $right: FileInfo): bool {
        return $left.version === $right.version && $left.signature === $right.signature && $left.affectsGlobalScope === $right.affectsGlobalScope && $left.impliedNodeFormat === $right.impliedNodeFormat;
    }
    static $hash($source: FileInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.version));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.signature));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.affectsGlobalScope));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.impliedNodeFormat));
        return $hash;
    }
    declare private readonly then?: never;
    static Version(f: {
        value: FileInfo;
    } | undefined): gostring {
        return (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version;
    }
}
export function ComputeHash(text: gostring, hashWithText: bool): gostring {
    let hashBytes = HashString128__from_xxh3(text).Bytes();
    let hash = hex__from_gostdlib.EncodeToString(goArraySlice(hashBytes, 0, null, null));
    if (hashWithText) {
        hash = hash + ("-" + text);
    }
    return hash;
}
export type FileEmitKind = uint32;
export function FileEmitKindNone$constant(): FileEmitKind {
    return 0;
}
export function FileEmitKindJs$constant(): FileEmitKind {
    return 1;
}
export function FileEmitKindJsMap$constant(): FileEmitKind {
    return 2;
}
export function FileEmitKindJsInlineMap$constant(): FileEmitKind {
    return 4;
}
export function FileEmitKindDtsErrors$constant(): FileEmitKind {
    return 8;
}
export function FileEmitKindDtsMap$constant(): FileEmitKind {
    return 32;
}
export function FileEmitKindDts$constant(): FileEmitKind {
    return 24;
}
export function FileEmitKindAllJs$constant(): FileEmitKind {
    return 7;
}
export function FileEmitKindAllDtsEmit$constant(): FileEmitKind {
    return 48;
}
export function FileEmitKindAllDts$constant(): FileEmitKind {
    return 56;
}
export function GetFileEmitKind(options: {
    value: CompilerOptions__from_core;
} | undefined): FileEmitKind {
    let result = FileEmitKindJs$constant();
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap)) {
        result = (result | 2) >>> 0;
    }
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
        result = (result | 4) >>> 0;
    }
    if (CompilerOptions__from_core.GetEmitDeclarations(options)) {
        result = (result | 24) >>> 0;
    }
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap)) {
        result = (result | 32) >>> 0;
    }
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly)) {
        result = (result & 56) >>> 0;
    }
    return result;
}
export function getPendingEmitKindWithOptions(options: {
    value: CompilerOptions__from_core;
} | undefined, oldOptions: {
    value: CompilerOptions__from_core;
} | undefined): FileEmitKind {
    let oldEmitKind = GetFileEmitKind(oldOptions);
    let newEmitKind = GetFileEmitKind(options);
    return getPendingEmitKind(newEmitKind, oldEmitKind);
}
export function getPendingEmitKind(emitKind: FileEmitKind, oldEmitKind: FileEmitKind): FileEmitKind {
    if (oldEmitKind === emitKind) {
        return FileEmitKindNone$constant();
    }
    if (oldEmitKind === 0 || emitKind === 0) {
        return emitKind;
    }
    let diff = (oldEmitKind ^ emitKind) >>> 0;
    let result = FileEmitKindNone$constant();
    if (!(((diff & FileEmitKindAllJs$constant()) >>> 0) === 0)) {
        result = (result | (emitKind & FileEmitKindAllJs$constant()) >>> 0) >>> 0;
    }
    if (!(((diff & FileEmitKindDtsErrors$constant()) >>> 0) === 0)) {
        result = (result | (emitKind & FileEmitKindAllDts$constant()) >>> 0) >>> 0;
    }
    if (!(((diff & FileEmitKindAllDtsEmit$constant()) >>> 0) === 0)) {
        result = (result | (emitKind & FileEmitKindAllDtsEmit$constant()) >>> 0) >>> 0;
    }
    return result;
}
export class emitSignature {
    declare private readonly $goType: void;
    public constructor(public signature: gostring, public signatureWithDifferentOptions: RuntimeSlice<gostring>) {
    }
    static $copy($source: emitSignature): emitSignature {
        return new emitSignature($source.signature, $source.signatureWithDifferentOptions);
    }
    declare private readonly then?: never;
    static $go$private$incremental$getNewEmitSignature(e: {
        value: emitSignature;
    } | undefined, oldOptions: {
        value: CompilerOptions__from_core;
    } | undefined, newOptions: {
        value: CompilerOptions__from_core;
    } | undefined): {
        value: emitSignature;
    } | undefined {
        if (Tristate_IsTrue__from_core((oldOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap) === Tristate_IsTrue__from_core((newOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap)) {
            return e;
        }
        if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signatureWithDifferentOptions.isNil()) {
            return { value: new emitSignature("", RuntimeSlice.literal<gostring>([(e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature])) };
        }
        else {
            return { value: new emitSignature((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signatureWithDifferentOptions.get(0), RuntimeSlice.nil<gostring>()) };
        }
    }
}
export class buildInfoDiagnosticWithFileName {
    declare private readonly $goType: void;
    public constructor(public file: Path__from_tspath, public noFile: bool, public pos: int, public end: int, public code: int32, public category: Category__from_diagnostics, public messageKey: Key__from_diagnostics, public messageArgs: RuntimeSlice<gostring>, public messageChain: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName;
    } | undefined>, public relatedInformation: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName;
    } | undefined>, public reportsUnnecessary: bool, public reportsDeprecated: bool, public skippedOnNoEmit: bool, public repopulateInfo: {
        value: RepopulateDiagnosticInfo__from_ast;
    } | undefined) {
    }
    static $copy($source: buildInfoDiagnosticWithFileName): buildInfoDiagnosticWithFileName {
        return new buildInfoDiagnosticWithFileName($source.file, $source.noFile, $source.pos, $source.end, $source.code, $source.category, $source.messageKey, $source.messageArgs, $source.messageChain, $source.relatedInformation, $source.reportsUnnecessary, $source.reportsDeprecated, $source.skippedOnNoEmit, $source.repopulateInfo);
    }
    declare private readonly then?: never;
    static $go$private$incremental$toDiagnostic(b: {
        value: buildInfoDiagnosticWithFileName;
    } | undefined, p: {
        value: Program__from_compiler;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        let fileForDiagnostic: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file.$value ===
            ((void Path__from_tspath,
                "") as string))) {
            fileForDiagnostic = Program__from_compiler.GetSourceFileByPath(p, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
        }
        else if (!(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.noFile) {
            fileForDiagnostic = file;
        }
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.repopulateInfo === undefined)) {
            return repopulateDiagnosticChain(b, p, fileForDiagnostic);
        }
        let messageChain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_range_5: buildInfoDiagnosticWithFileName["messageChain"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let msg: {
                value: buildInfoDiagnosticWithFileName;
            } | undefined = __gotots_range_value_5;
            messageChain = messageChain.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(msg, p, fileForDiagnostic)]);
        }
        let relatedInformation = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_range_6: buildInfoDiagnosticWithFileName["relatedInformation"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInformation;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
            let info: {
                value: buildInfoDiagnosticWithFileName;
            } | undefined = __gotots_range_value_6;
            relatedInformation = relatedInformation.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(info, p, fileForDiagnostic)]);
        }
        return NewDiagnosticFromSerialized__from_ast(fileForDiagnostic, NewTextRange__from_core((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.code, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.category, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageKey, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageArgs, messageChain, relatedInformation, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsUnnecessary, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsDeprecated, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.skippedOnNoEmit);
    }
    static $go$private$incremental$toDiagnosticWithoutRepopulate(b: {
        value: buildInfoDiagnosticWithFileName;
    } | undefined, p: {
        value: Program__from_compiler;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        let messageChain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_range_3: buildInfoDiagnosticWithFileName["messageChain"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let msg: {
                value: buildInfoDiagnosticWithFileName;
            } | undefined = __gotots_range_value_3;
            messageChain = messageChain.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(msg, p, file)]);
        }
        let relatedInformation = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_range_4: buildInfoDiagnosticWithFileName["relatedInformation"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInformation;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let info: {
                value: buildInfoDiagnosticWithFileName;
            } | undefined = __gotots_range_value_4;
            relatedInformation = relatedInformation.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(info, p, file)]);
        }
        return NewDiagnosticFromSerialized__from_ast(file, NewTextRange__from_core((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.code, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.category, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageKey, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageArgs, messageChain, relatedInformation, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsUnnecessary, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsDeprecated, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.skippedOnNoEmit);
    }
}
export class DiagnosticsOrBuildInfoDiagnosticsWithFileName {
    declare private readonly $goType: void;
    public constructor(public diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public buildInfoDiagnostics: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName;
    } | undefined>) {
    }
    static $copy($source: DiagnosticsOrBuildInfoDiagnosticsWithFileName): DiagnosticsOrBuildInfoDiagnosticsWithFileName {
        return new DiagnosticsOrBuildInfoDiagnosticsWithFileName($source.diagnostics, $source.buildInfoDiagnostics);
    }
    declare private readonly then?: never;
    static $go$private$incremental$getDiagnostics(d: {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined, p: {
        value: Program__from_compiler;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (!(d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics.isNil()) {
            return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics;
        }
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics = Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_ast$Diagnostic((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoDiagnostics, (diag: {
            value: buildInfoDiagnosticWithFileName;
        } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            return buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(diag, p, file);
        });
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics;
    }
}
export function repopulateDiagnosticChain(b: {
    value: buildInfoDiagnosticWithFileName;
} | undefined, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let info: {
        value: RepopulateDiagnosticInfo__from_ast;
    } | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.repopulateInfo;
    switch ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value) {
        case 1: {
            return repopulateModeMismatchChain(b, p, file);
            break;
        }
        case 2: {
            return repopulateModuleNotFoundChain(b, p, file, info);
            break;
        }
        default: {
            return buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnosticWithoutRepopulate(b, p, file);
            break;
        }
    }
}
export function repopulateModeMismatchChain(b: {
    value: buildInfoDiagnosticWithFileName;
} | undefined, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    if (file === undefined) {
        return buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnosticWithoutRepopulate(b, p, file);
    }
    let details = CreateModeMismatchDetails__from_checker(new GoInterfaceAdapter(p), file);
    let nextChain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_range_1: buildInfoDiagnosticWithFileName["messageChain"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let msg: {
            value: buildInfoDiagnosticWithFileName;
        } | undefined = __gotots_range_value_1;
        nextChain = nextChain.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(msg, p, file)]);
    }
    return NewDiagnosticFromSerialized__from_ast(file, NewTextRange__from_core((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end), Message__from_diagnostics.Code(details.Message), Message__from_diagnostics.Category(details.Message), Message__from_diagnostics.Key(details.Message), StringifyArgs__from_diagnostics(details.Args), nextChain, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), false, false, false);
}
export function repopulateModuleNotFoundChain(b: {
    value: buildInfoDiagnosticWithFileName;
} | undefined, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, info: {
    value: RepopulateDiagnosticInfo__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    if (file === undefined) {
        return buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnosticWithoutRepopulate(b, p, file);
    }
    let packageName: RepopulateDiagnosticInfo__from_ast["PackageName"] = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName;
    if (packageName === "") {
        packageName = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference;
    }
    let details = CreateModuleNotFoundChain__from_checker(new GoInterfaceAdapter(p), file, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Mode, packageName);
    let nextChain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_range_2: buildInfoDiagnosticWithFileName["messageChain"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let msg: {
            value: buildInfoDiagnosticWithFileName;
        } | undefined = __gotots_range_value_2;
        nextChain = nextChain.append(void 0, [buildInfoDiagnosticWithFileName.$go$private$incremental$toDiagnostic(msg, p, file)]);
    }
    return NewDiagnosticFromSerialized__from_ast(file, NewTextRange__from_core((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end), Message__from_diagnostics.Code(details.Message), Message__from_diagnostics.Category(details.Message), Message__from_diagnostics.Key(details.Message), StringifyArgs__from_diagnostics(details.Args), nextChain, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), false, false, false);
}
export class snapshot {
    declare private readonly $goType: void;
    public constructor(public fileInfos: SyncMap__from_collections<Path__from_tspath, {
        value: FileInfo;
    } | undefined>, public options: {
        value: CompilerOptions__from_core;
    } | undefined, public referencedMap: referenceMap, public semanticDiagnosticsPerFile: SyncMap__from_collections<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>, public emitDiagnosticsPerFile: SyncMap__from_collections<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>, public changedFilesSet: SyncSet__from_collections<Path__from_tspath>, public affectedFilesPendingEmit: SyncMap__from_collections<Path__from_tspath, FileEmitKind>, public latestChangedDtsFile: gostring, public emitSignatures: SyncMap__from_collections<Path__from_tspath, {
        value: emitSignature;
    } | undefined>, public hasErrors: Tristate__from_core, public hasSemanticErrors: bool, public checkPending: bool, public buildInfoEmitPending: atomic__from_gostdlib.Bool, public hasErrorsFromOldState: Tristate__from_core, public hasSemanticErrorsFromOldState: bool, public allFilesExcludingDefaultLibraryFileOnce: sync__from_gostdlib.Once, public allFilesExcludingDefaultLibraryFile: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public hasChangedDtsFile: bool, public hasEmitDiagnostics: bool, public hashWithText: bool) {
    }
    static $zero(): snapshot {
        return new snapshot(SyncMap__from_collections.$zero<Path__from_tspath, {
            value: FileInfo;
        } | undefined>(), void 0, referenceMap.$zero(), SyncMap__from_collections.$zero<Path__from_tspath, {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined>(), SyncSet__from_collections.$zero<Path__from_tspath>(), SyncMap__from_collections.$zero<Path__from_tspath, FileEmitKind>(), "", SyncMap__from_collections.$zero<Path__from_tspath, {
            value: emitSignature;
        } | undefined>(), 0, false, false, named_sync_atomic.SyncAtomicBoolOperations.$zero(), 0, false, named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), false, false, false);
    }
    static $copy($source: snapshot): snapshot {
        return new snapshot(SyncMap__from_collections.$copy<Path__from_tspath, {
            value: FileInfo;
        } | undefined>($source.fileInfos), $source.options, referenceMap.$copy($source.referencedMap), SyncMap__from_collections.$copy<Path__from_tspath, {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined>($source.semanticDiagnosticsPerFile), SyncMap__from_collections.$copy<Path__from_tspath, {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined>($source.emitDiagnosticsPerFile), SyncSet__from_collections.$copy<Path__from_tspath>($source.changedFilesSet), SyncMap__from_collections.$copy<Path__from_tspath, FileEmitKind>($source.affectedFilesPendingEmit), $source.latestChangedDtsFile, SyncMap__from_collections.$copy<Path__from_tspath, {
            value: emitSignature;
        } | undefined>($source.emitSignatures), $source.hasErrors, $source.hasSemanticErrors, $source.checkPending, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.buildInfoEmitPending), $source.hasErrorsFromOldState, $source.hasSemanticErrorsFromOldState, named_sync.SyncOnceOperations.$copy($source.allFilesExcludingDefaultLibraryFileOnce), $source.allFilesExcludingDefaultLibraryFile, $source.hasChangedDtsFile, $source.hasEmitDiagnostics, $source.hashWithText);
    }
    declare private readonly then?: never;
    static $go$private$incremental$addFileToAffectedFilesPendingEmit(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined, filePath: Path__from_tspath, emitKind: FileEmitKind): void {
        const __gotots_store_1 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "affectedFilesPendingEmit"), filePath);
        let existingKind = __gotots_results_0[0];
        const __gotots_store_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "affectedFilesPendingEmit"), filePath, (existingKind | emitKind) >>> 0);
        if (!((emitKind & FileEmitKindDtsErrors$constant()) >>> 0 === 0)) {
            const __gotots_store_3 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "emitDiagnosticsPerFile"), filePath);
        }
        atomic__from_gostdlib.Bool.Store(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
    }
    static $go$private$incremental$addFileToChangeSet(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined, filePath: Path__from_tspath): void {
        const __gotots_store_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        SyncSet$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "changedFilesSet"), filePath);
        atomic__from_gostdlib.Bool.Store(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
    }
    static $go$private$incremental$canUseIncrementalState(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined): bool {
        if (!CompilerOptions__from_core.IsIncremental(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options) && Tristate_IsTrue__from_core((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Build)) {
            return false;
        }
        return true;
    }
    static $go$private$incremental$computeHash(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined, text: gostring): gostring {
        return ComputeHash(text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hashWithText);
    }
    static $go$private$incremental$computeSignatureWithDiagnostics(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, text: gostring, data: WriteFileData__from_compiler | undefined): gostring {
        let builder = named_strings.StringsBuilderOperations.$zero();
        const builder$location = tsonicTypeScriptRuntime.boundLocation({}, () => builder, builder$next => builder = builder$next);
        strings__from_gostdlib.Builder.WriteString(builder, getTextHandlingSourceMapForSignature(text, data));
        const __gotots_range_7 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostics;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_7;
            diagnosticToStringBuilder(diag, file, builder$location);
        }
        return snapshot.$go$private$incremental$computeHash(s, strings__from_gostdlib.Builder.String(builder));
    }
    static $go$private$incremental$getAllFilesExcludingDefaultLibraryFile(s: tsonicTypeScriptRuntime.Location<snapshot> | undefined, program: {
        value: Program__from_compiler;
    } | undefined, firstSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        sync__from_gostdlib.Once.Do(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.allFilesExcludingDefaultLibraryFileOnce, (): void => {
            let files = Program__from_compiler.GetSourceFiles(program);
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.allFilesExcludingDefaultLibraryFile = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(0, files.length, void 0);
            let addSourceFile: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined = (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
                if (!Program__from_compiler.IsSourceFileDefaultLibrary(program, SourceFile__from_ast.Path(file))) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.allFilesExcludingDefaultLibraryFile = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.allFilesExcludingDefaultLibraryFile.append(void 0, [file]);
                }
            };
            if (!(firstSourceFile === undefined)) {
                const __gotots_callee_0 = addSourceFile;
                const __gotots_argument_0 = firstSourceFile;
                (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            }
            const __gotots_range_0 = files;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
                if (!tsonicTypeScriptRuntime.sameLocation(file, firstSourceFile)) {
                    const __gotots_callee_1 = addSourceFile;
                    const __gotots_argument_1 = file;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                }
            }
        });
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.allFilesExcludingDefaultLibraryFile;
    }
}
export function getTextHandlingSourceMapForSignature(text: gostring, data: WriteFileData__from_compiler | undefined): gostring {
    if ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceMapUrlPos !== -1) {
        return goStringSlice(text, 0, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceMapUrlPos);
    }
    return text;
}
export function diagnosticToStringBuilder(diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, builder: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined): void {
    if (diagnostic === undefined) {
        return;
    }
    const __gotots_receiver_0 = builder;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\n");
    if (!tsonicTypeScriptRuntime.sameLocation(Diagnostic__from_ast.File(diagnostic), file)) {
        const __gotots_receiver_1 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, EnsurePathIsNonModuleName__from_tspath(GetRelativePathFromDirectory__from_tspath(GetDirectoryPath__from_tspath(SourceFile__from_ast.Path(file).$value), SourceFile__from_ast.Path(Diagnostic__from_ast.File(diagnostic)).$value, new ComparePathsOptions__from_tspath(false, ""))));
    }
    if (!(Diagnostic__from_ast.File(diagnostic) === undefined)) {
        const __gotots_receiver_2 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, fmt__from_gostdlib.Sprintf("(%d,%d): ", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(Diagnostic__from_ast.Pos(diagnostic)), new $goInterfaceAdapter$int(Diagnostic__from_ast.Len(diagnostic))])));
    }
    const __gotots_receiver_3 = builder;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3 === void 0 ? void 0 :
        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, Category_Name__from_diagnostics(Diagnostic__from_ast.Category(diagnostic)));
    const __gotots_receiver_4 = builder;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, fmt__from_gostdlib.Sprintf("%d: ", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int32(Diagnostic__from_ast.Code(diagnostic))])));
    const __gotots_receiver_5 = builder;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_5 === void 0 ? void 0 :
        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, Diagnostic__from_ast.MessageKey(diagnostic).$value);
    const __gotots_receiver_6 = builder;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_6 === void 0 ? void 0 :
        (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\n");
    const __gotots_range_8 = Diagnostic__from_ast.MessageArgs(diagnostic);
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let arg = __gotots_range_value_8;
        const __gotots_receiver_7 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_7 === void 0 ? void 0 :
            (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, arg);
        const __gotots_receiver_8 = builder;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_8 === void 0 ? void 0 :
            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\n");
    }
    const __gotots_range_9 = Diagnostic__from_ast.MessageChain(diagnostic);
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
        let chain: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_9;
        diagnosticToStringBuilder(chain, file, builder);
    }
    const __gotots_range_10 = Diagnostic__from_ast.RelatedInformation(diagnostic);
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
        const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_10);
        let info: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_10;
        diagnosticToStringBuilder(info, file, builder);
    }
}
