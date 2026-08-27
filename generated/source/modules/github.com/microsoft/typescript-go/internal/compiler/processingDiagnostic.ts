import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FileReference as FileReference__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Program } from "./program.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Diagnostic as Diagnostic__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { GetSpellingSuggestionForStrings as GetSpellingSuggestionForStrings__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state as $state__tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath, ToFileNameLowerCase as ToFileNameLowerCase__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$AddIfAbsent$PointerTo_Named_compiler$FileIncludeReason } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Len$PointerTo_Named_compiler$FileIncludeReason } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { IfElse$PointerTo_Named_diagnostics$Message } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Values$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Values.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason, $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_compiler$FileIncludeReason_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { FileIncludeReason, referenceFileLocation } from "./fileInclude.js";
import { includeProcessor } from "./includeprocessor.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class processingDiagnosticKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function processingDiagnosticKindUnknownReference$constant(): processingDiagnosticKind {
    return new processingDiagnosticKind(0);
}
export function processingDiagnosticKindExplainingFileInclude$constant(): processingDiagnosticKind {
    return new processingDiagnosticKind(1);
}
export class processingDiagnostic {
    declare private readonly $goType: void;
    public constructor(public kind: processingDiagnosticKind, public data: GoInterface | undefined) {
    }
    static $copy($source: processingDiagnostic): processingDiagnostic {
        return new processingDiagnostic($source.kind, $source.data);
    }
    static $equal($left: processingDiagnostic, $right: processingDiagnostic): bool {
        return $left.kind.$value === $right.kind.$value && goInterfaceEqual($left.data, $right.data);
    }
    static $hash($source: processingDiagnostic): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind.$value));
        $hash = GoMapHash.mix($hash, $source.data === undefined ? 0 : $source.data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$compiler$asFileIncludeReason(d: {
        value: processingDiagnostic;
    } | undefined): {
        value: FileIncludeReason;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: FileIncludeReason;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$compiler$asIncludeExplainingDiagnostic(d: {
        value: processingDiagnostic;
    } | undefined): {
        value: includeExplainingDiagnostic;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: includeExplainingDiagnostic;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$compiler$createDiagnosticExplainingFile(d: {
        value: processingDiagnostic;
    } | undefined, program: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        let diag: {
            value: includeExplainingDiagnostic;
        } | undefined = processingDiagnostic.$go$private$compiler$asIncludeExplainingDiagnostic(d);
        let includeDetails = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        let relatedInfo = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        let redirectInfo = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        let preferredLocation: {
            value: FileIncludeReason;
        } | undefined = void 0;
        let seenReasons = Set__from_collections.$zero<{
            value: FileIncludeReason;
        } | undefined>((): GoMapValue<{
            value: FileIncludeReason;
        } | undefined, GoEmptyStruct> => {
            return GoMap.nil();
        });
        const seenReasons$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenReasons, seenReasons$next => seenReasons = seenReasons$next);
        if (FileIncludeReason.$go$private$compiler$isReferencedFile((diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReason) && !(includeProcessor.$go$private$compiler$getReferenceLocation((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReason, program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isSynthetic) {
            preferredLocation = (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReason;
        }
        let processRelatedInfo: (($0: {
            value: FileIncludeReason;
        } | undefined) => void) | undefined = (includeReason: {
            value: FileIncludeReason;
        } | undefined): void => {
            if (preferredLocation === undefined && FileIncludeReason.$go$private$compiler$isReferencedFile(includeReason) && !(includeProcessor.$go$private$compiler$getReferenceLocation((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, includeReason, program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isSynthetic) {
                preferredLocation = includeReason;
            }
            else if (!(preferredLocation
                ===
                    includeReason)) {
                let info: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = includeProcessor.$go$private$compiler$getRelatedInfo((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, includeReason, program);
                if (!(info === undefined)) {
                    relatedInfo = relatedInfo.append(void 0, [info]);
                }
            }
        };
        let processInclude: (($0: {
            value: FileIncludeReason;
        } | undefined) => void) | undefined = (includeReason: {
            value: FileIncludeReason;
        } | undefined): void => {
            if (!Set$AddIfAbsent$PointerTo_Named_compiler$FileIncludeReason(seenReasons$location, includeReason)) {
                return;
            }
            includeDetails = includeDetails.append(void 0, [FileIncludeReason.$go$private$compiler$toDiagnostic(includeReason, program, false)]);
            const __gotots_callee_0 = processRelatedInfo;
            const __gotots_argument_2 = includeReason;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        };
        if (!((diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file.$value ===
            ((void Path__from_tspath,
                "") as string))) {
            let reasons = ((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons.lookup((diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
            includeDetails = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(0, reasons.length, void 0);
            const __gotots_range_0 = reasons;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let reason: {
                    value: FileIncludeReason;
                } | undefined = __gotots_range_value_0;
                const __gotots_callee_1 = processInclude;
                const __gotots_argument_3 = reason;
                (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            }
            redirectInfo = includeProcessor.$go$private$compiler$explainRedirectAndImpliedFormat((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, program, (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, (fileName: gostring): gostring => {
                return fileName;
            });
        }
        if (!((diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReason === undefined)) {
            const __gotots_callee_2 = processInclude;
            const __gotots_argument_4 = (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReason;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
        }
        let chain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        if (!includeDetails.isNil() && (preferredLocation === undefined || Set$Len$PointerTo_Named_compiler$FileIncludeReason(seenReasons$location) !== 1)) {
            let fileReason: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = NewCompilerDiagnostic__from_ast($state__diagnostics.The_file_is_in_the_program_because_Colon, RuntimeSlice.nil<GoInterface | undefined>());
            Diagnostic__from_ast.SetMessageChain(fileReason, includeDetails);
            chain = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([fileReason]);
        }
        if (!redirectInfo.isNil()) {
            chain = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(chain, redirectInfo, void 0);
        }
        let result: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = void 0;
        if (!(preferredLocation === undefined)) {
            result = referenceFileLocation.$go$private$compiler$diagnosticAt(includeProcessor.$go$private$compiler$getReferenceLocation((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, preferredLocation, program), (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message, (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args);
        }
        if (result === undefined) {
            result = NewCompilerDiagnostic__from_ast((diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message, (diag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args);
        }
        if (!chain.isNil()) {
            Diagnostic__from_ast.SetMessageChain(result, chain);
        }
        if (!relatedInfo.isNil()) {
            Diagnostic__from_ast.SetRelatedInfo(result, relatedInfo);
        }
        return result;
    }
    static $go$private$compiler$toDiagnostic(d: {
        value: processingDiagnostic;
    } | undefined, program: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        switch ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 0: {
                let ref: {
                    value: FileIncludeReason;
                } | undefined = processingDiagnostic.$go$private$compiler$asFileIncludeReason(d);
                let loc: {
                    value: referenceFileLocation;
                } | undefined = FileIncludeReason.$go$private$compiler$getReferencedLocation(ref, program);
                switch ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
                    case 2: {
                        return referenceFileLocation.$go$private$compiler$diagnosticAt(loc, $state__diagnostics.Cannot_find_type_definition_file_for_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(((loc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName)]));
                        break;
                    }
                    case 3: {
                        let libName = ToFileNameLowerCase__from_tspath(((loc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName);
                        let unqualifiedLibName = strings__from_gostdlib.TrimSuffix(strings__from_gostdlib.TrimPrefix(libName, "lib."), ".d.ts");
                        let suggestion = GetSpellingSuggestionForStrings__from_core(unqualifiedLibName, Values$SliceOf_string$string($state__tsoptions.Libs));
                        return referenceFileLocation.$go$private$compiler$diagnosticAt(loc, IfElse$PointerTo_Named_diagnostics$Message(suggestion !== "", $state__diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1, $state__diagnostics.Cannot_find_lib_definition_for_0), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(libName), new GoInterfaceAdapter(suggestion)]));
                        break;
                    }
                    default: {
                        const __gotots_argument_0 = new GoInterfaceAdapter("unknown include kind");
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                        break;
                    }
                }
                break;
            }
            case 1: {
                return processingDiagnostic.$go$private$compiler$createDiagnosticExplainingFile(d, program);
                break;
            }
            default: {
                const __gotots_argument_1 = new GoInterfaceAdapter("unknown processingDiagnosticKind");
                GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                break;
            }
        }
    }
}
export class includeExplainingDiagnostic {
    declare private readonly $goType: void;
    public constructor(public file: Path__from_tspath, public diagnosticReason: {
        value: FileIncludeReason;
    } | undefined, public message: {
        value: Message__from_diagnostics;
    } | undefined, public args: RuntimeSlice<GoInterface | undefined>) {
    }
    static $copy($source: includeExplainingDiagnostic): includeExplainingDiagnostic {
        return new includeExplainingDiagnostic($source.file, $source.diagnosticReason, $source.message, $source.args);
    }
    declare private readonly then?: never;
}
