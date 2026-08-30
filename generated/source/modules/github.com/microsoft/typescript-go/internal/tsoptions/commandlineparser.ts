import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ParsedOptions as ParsedOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CommandLineOption$Storage as CommandLineOption__from_tsoptions$Storage } from "./commandlineoption.js";
import type { AlternateModeDiagnostics, ParseCommandLineWorkerDiagnostics } from "./diagnostics.js";
import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { ParseConfigHost } from "./tsconfigparsing.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { BuildOptions as BuildOptions__from_core, CompilerOptions as CompilerOptions__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, WatchOptions as WatchOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Clone$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Clone.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Set$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { MapFiltered$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapFiltered.js";
import { convertMapToOptions$PointerTo_Named_tsoptions$buildOptionsParser, convertMapToOptions$PointerTo_Named_tsoptions$compilerOptionsParser, convertMapToOptions$PointerTo_Named_tsoptions$watchOptionsParser } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tsoptions/convertMapToOptions.js";
import { $goInterfaceAdapter$Named_tsoptions$CommandLineOptionKind, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$bool, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { CommandLineOption, CommandLineOptionKind } from "./commandlineoption.js";
import { createDiagnosticForInvalidEnumType, createUnknownOptionError, getCompilerOptionValueTypeString } from "./errors.js";
import { GetNameMapFromList, NameMap } from "./namemap.js";
import { ParsedBuildCommandLine } from "./parsedbuildcommandline.js";
import { NewParsedCommandLine } from "./parsedcommandline.js";
import { ParseCompilerOptions, buildOptionsParser, compilerOptionsParser, convertToOptionsWithAbsolutePaths, watchOptionsParser } from "./parsinghelpers.js";
import { CommandLineOptionNameMap, validateJsonOptionValue } from "./tsconfigparsing.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class commandLineParser {
    declare private readonly $goType: void;
    public constructor(public workerDiagnostics: ParseCommandLineWorkerDiagnostics | undefined, public optionsMap: NameMap | undefined, public fs: FS__from_vfs | undefined, public currentDirectory: gostring, public options: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, public fileNames: RuntimeSlice<gostring>, public errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
    static AlternateMode(p: commandLineParser | undefined): AlternateModeDiagnostics | undefined {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workerDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).didYouMean.alternateMode;
    }
    static OptionsDeclarations(p: commandLineParser | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined> {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workerDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).didYouMean.OptionDeclarations;
    }
    static UnknownOptionDiagnostic(p: commandLineParser | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workerDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).didYouMean.UnknownOptionDiagnostic;
    }
    static $go$private$tsoptions$createUnknownOptionError(parser: commandLineParser | undefined, unknownOption: gostring, unknownOptionErrorText: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        return createUnknownOptionError(unknownOption, commandLineParser.UnknownOptionDiagnostic(parser), unknownOptionErrorText, node, sourceFile, commandLineParser.AlternateMode(parser));
    }
    static $go$private$tsoptions$parseListTypeOption(p: commandLineParser | undefined, opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: gostring): [
        RuntimeSlice<GoInterface | undefined>,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
    ] {
        return ParseListTypeOption(opt, value);
    }
    static $go$private$tsoptions$parseOptionValue(p: commandLineParser | undefined, args: RuntimeSlice<gostring>, i: int, opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, diag: {
        value: Message__from_diagnostics;
    } | undefined): int {
        if (CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsTSConfigOnly && i <= args.length) {
            let optValue = "";
            if (i < args.length) {
                optValue = args.get(i);
            }
            if (optValue === "null") {
                OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, void 0);
                i++;
            }
            else if (((void CommandLineOptionKind,
                CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
                ===
                    ((void CommandLineOptionKind,
                        "boolean") as string)) {
                if (optValue === "false") {
                    OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$bool(false));
                    i++;
                }
                else {
                    if (optValue === "true") {
                        i++;
                    }
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))]);
                }
            }
            else {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))]);
                if (optValue.length !== 0 && !strings__from_gostdlib.HasPrefix(optValue, "-")) {
                    i++;
                }
            }
        }
        else {
            if (i >= args.length) {
                if (!(((void CommandLineOptionKind,
                    CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
                    ===
                        ((void CommandLineOptionKind,
                            "boolean") as string))) {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast(diag, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), new $goInterfaceAdapter$string(getCompilerOptionValueTypeString(opt))]))]);
                    if (((void CommandLineOptionKind,
                        CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
                        ===
                            ((void CommandLineOptionKind,
                                "list") as string)) {
                        OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$SliceOf_string(RuntimeSlice.literal<gostring>([])));
                    }
                    else if (((void CommandLineOptionKind,
                        CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
                        ===
                            ((void CommandLineOptionKind,
                                "enum") as string)) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [createDiagnosticForInvalidEnumType(opt, void 0, void 0)]);
                    }
                }
                else {
                    OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$bool(true));
                }
                return i;
            }
            if (args.get(i) !== "null") {
                switch (((void CommandLineOptionKind,
                    CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) {
                    case "number": {
                        const __gotots_results_2 = strconv__from_gostdlib.Atoi(args.get(i));
                        const __gotots_results_3 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_2[0])), GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                            int,
                            $goInterface$Interface_Method_Error_void_to_string | undefined
                        ];
                        let num = __gotots_results_3[0];
                        let e: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
                        if (e === undefined) {
                            if (num >= CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).minValue) {
                                OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$int(num));
                            }
                            else {
                                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Option_0_requires_value_to_be_greater_than_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), new $goInterfaceAdapter$string(strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).minValue))))]))]);
                            }
                        }
                        else {
                            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast(diag, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), new $goInterfaceAdapter$string("number")]))]);
                        }
                        i++;
                        break;
                    }
                    case "boolean": {
                        let optValue = args.get(i);
                        if (optValue === "false") {
                            OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$bool(false));
                        }
                        else {
                            OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$bool(true));
                        }
                        if (optValue === "false" || optValue === "true") {
                            i++;
                        }
                        break;
                    }
                    case "string": {
                        const __gotots_results_4 = validateJsonOptionValue(opt, new $goInterfaceAdapter$string(args.get(i)), void 0, void 0);
                        let val: GoInterface | undefined = __gotots_results_4[0];
                        let err = __gotots_results_4[1];
                        if (err.isNil()) {
                            OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, val);
                        }
                        else {
                            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors, err, void 0);
                        }
                        i++;
                        break;
                    }
                    case "list": {
                        const __gotots_results_5 = commandLineParser.$go$private$tsoptions$parseListTypeOption(p, opt, args.get(i));
                        let result = __gotots_results_5[0];
                        let err = __gotots_results_5[1];
                        OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, new $goInterfaceAdapter$SliceOf_Interface_void(result));
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors, err, void 0);
                        if (result.length > 0 || err.length > 0) {
                            i++;
                        }
                        break;
                    }
                    case "listOrElement": {
                        const __gotots_argument_23 = new $goInterfaceAdapter$string("listOrElement not supported here");
                        GoPanic.raise(__gotots_argument_23 === undefined ? GoPanicNilValue.create() : __gotots_argument_23);
                        break;
                    }
                    default: {
                        const __gotots_results_6 = convertJsonOptionOfEnumType(opt, strings__from_gostdlib.TrimFunc(args.get(i), IsWhiteSpaceLike__from_stringutil), void 0, void 0);
                        let val: GoInterface | undefined = __gotots_results_6[0];
                        let err = __gotots_results_6[1];
                        OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, val);
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors, err, void 0);
                        i++;
                        break;
                    }
                }
            }
            else {
                OrderedMap$Set$string$Interface_void((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, void 0);
                i++;
            }
        }
        return i;
    }
    static $go$private$tsoptions$parseResponseFile(p: commandLineParser | undefined, fileName: gostring): void {
        fileName = GetNormalizedAbsolutePath__from_tspath(fileName, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentDirectory);
        const __gotots_results_1 = tryReadFile(fileName, (fileName__shadow_1: gostring): [
            gostring,
            bool
        ] => {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fs === undefined) {
                return ["", false];
            }
            const __gotots_receiver_11 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fs;
            const __gotots_argument_18 = fileName__shadow_1;
            const __gotots_results_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).ReadFile(__gotots_argument_18);
            let read = __gotots_results_0[0];
            let err = __gotots_results_0[1];
            return [read, err];
        }, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors);
        let fileContents = __gotots_results_1[0];
        let errors = __gotots_results_1[1];
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = errors;
        if (fileContents === "") {
            return;
        }
        let args = RuntimeSlice.nil<gostring>();
        const __gotots_conversion_0 = fileContents;
        let __gotots_conversion_1 = RuntimeSlice.make<int32>(0, __gotots_conversion_0.length, 0);
        let __gotots_conversion_2 = 0;
        while (__gotots_conversion_2 < __gotots_conversion_0.length) {
            const __gotots_conversion_3 = goStringDecodeRune(__gotots_conversion_0, __gotots_conversion_2);
            __gotots_conversion_1 = __gotots_conversion_1.append(0, [__gotots_conversion_3[0]]);
            __gotots_conversion_2 += __gotots_conversion_3[1];
        }
        let text = __gotots_conversion_1;
        let textLength = text.length;
        let pos = 0;
        for (; pos < textLength;) {
            for (; pos < textLength && text.get(pos) <= 32;) {
                pos++;
            }
            if (pos >= textLength) {
                break;
            }
            let start = pos;
            if (text.get(pos) === 34) {
                pos++;
                for (; pos < textLength && text.get(pos) !== 34;) {
                    pos++;
                }
                if (pos < textLength) {
                    const __gotots_argument_19 = args;
                    const __gotots_conversion_4 = text.slice(start + 1, pos, null);
                    let __gotots_conversion_5 = "";
                    for (let __gotots_conversion_6 = 0; __gotots_conversion_6 < __gotots_conversion_4.length; __gotots_conversion_6++) {
                        __gotots_conversion_5 += goStringEncodeRune(__gotots_conversion_4.get(__gotots_conversion_6));
                    }
                    const __gotots_argument_20 = __gotots_conversion_5;
                    args = __gotots_argument_19.append("", [__gotots_argument_20]);
                    pos++;
                }
                else {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Unterminated_quoted_string_in_response_file_0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fileName)]))]);
                }
            }
            else {
                for (; text.get(pos) > 32;) {
                    pos++;
                }
                const __gotots_argument_21 = args;
                const __gotots_conversion_7 = text.slice(start, pos, null);
                let __gotots_conversion_8 = "";
                for (let __gotots_conversion_9 = 0; __gotots_conversion_9 < __gotots_conversion_7.length; __gotots_conversion_9++) {
                    __gotots_conversion_8 += goStringEncodeRune(__gotots_conversion_7.get(__gotots_conversion_9));
                }
                const __gotots_argument_22 = __gotots_conversion_8;
                args = __gotots_argument_21.append("", [__gotots_argument_22]);
            }
        }
        commandLineParser.$go$private$tsoptions$parseStrings(p, args);
    }
    static $go$private$tsoptions$parseStrings(p: commandLineParser | undefined, args: RuntimeSlice<gostring>): void {
        let i = 0;
        for (; i < args.length;) {
            let s = args.get(i);
            i++;
            if (s === "") {
                continue;
            }
            switch (goStringIndex(s, 0)) {
                case 64: {
                    commandLineParser.$go$private$tsoptions$parseResponseFile(p, goStringSlice(s, 1));
                    break;
                }
                case 45: {
                    let inputOptionName = getInputOptionName(s);
                    let opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = NameMap.GetOptionDeclarationFromName((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).optionsMap, inputOptionName, true);
                    if (!(opt === undefined)) {
                        i = commandLineParser.$go$private$tsoptions$parseOptionValue(p, args, i, opt, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workerDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OptionTypeMismatchDiagnostic);
                    }
                    else {
                        let watchOpt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = NameMap.GetOptionDeclarationFromName($state.WatchNameMap, inputOptionName, true);
                        if (!(watchOpt === undefined)) {
                            i = commandLineParser.$go$private$tsoptions$parseOptionValue(p, args, i, watchOpt, ($state.watchOptionsDidYouMeanDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OptionTypeMismatchDiagnostic);
                        }
                        else {
                            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.append(void 0, [commandLineParser.$go$private$tsoptions$createUnknownOptionError(p, inputOptionName, s, void 0, void 0)]);
                        }
                    }
                    break;
                }
                default: {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNames = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNames.append("", [s]);
                    break;
                }
            }
        }
    }
}
export function ParseCommandLine(commandLine: RuntimeSlice<gostring>, host: ParseConfigHost | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined {
    if (commandLine.isNil()) {
        commandLine = RuntimeSlice.literal<gostring>([]);
    }
    const __gotots_argument_6 = $state.CompilerOptionsDidYouMeanDiagnostics;
    const __gotots_argument_7 = commandLine;
    const __gotots_receiver_5 = host;
    const __gotots_argument_8 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_5).FS();
    const __gotots_receiver_6 = host;
    const __gotots_argument_9 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_6).GetCurrentDirectory();
    let parser: commandLineParser | undefined = parseCommandLineWorker(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
    const __gotots_argument_10 = OrderedMap$Clone$string$Interface_void((parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options);
    const __gotots_argument_11 = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap);
    const __gotots_receiver_7 = host;
    const __gotots_argument_12 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_7).GetCurrentDirectory();
    let optionsWithAbsolutePaths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = convertToOptionsWithAbsolutePaths(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
    const __gotots_argument_13 = optionsWithAbsolutePaths;
    const __gotots_struct_2 = CompilerOptions__from_core.$zero();
    const __gotots_field_10 = { value: __gotots_struct_2 };
    const __gotots_argument_14 = new compilerOptionsParser(__gotots_field_10);
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (convertMapToOptions$PointerTo_Named_tsoptions$compilerOptionsParser(__gotots_argument_13, __gotots_argument_14) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let watchOptions: {
        value: WatchOptions__from_core;
    } | undefined = (convertMapToOptions$PointerTo_Named_tsoptions$watchOptionsParser(optionsWithAbsolutePaths, new watchOptionsParser({ value: new WatchOptions__from_core(void 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>()) })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).WatchOptions;
    const __gotots_argument_15 = compilerOptions;
    const __gotots_argument_16 = (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNames;
    const __gotots_receiver_8 = host;
    const __gotots_receiver_9 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_8).FS();
    const __gotots_field_11 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    const __gotots_receiver_10 = host;
    const __gotots_field_12 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_10).GetCurrentDirectory();
    const __gotots_argument_17 = new ComparePathsOptions__from_tspath(__gotots_field_11, __gotots_field_12);
    let result: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined = NewParsedCommandLine(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
    (((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).WatchOptions = watchOptions;
    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors = (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors;
    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Raw = new GoInterfaceAdapter((parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options);
    return result;
}
export function ParseBuildCommandLine(commandLine: RuntimeSlice<gostring>, host: ParseConfigHost | undefined): {
    value: ParsedBuildCommandLine;
} | undefined {
    if (commandLine.isNil()) {
        commandLine = RuntimeSlice.literal<gostring>([]);
    }
    const __gotots_argument_0 = $state.buildOptionsDidYouMeanDiagnostics;
    const __gotots_argument_1 = commandLine;
    const __gotots_receiver_0 = host;
    const __gotots_argument_2 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_0).FS();
    const __gotots_receiver_1 = host;
    const __gotots_argument_3 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_1).GetCurrentDirectory();
    let parser: commandLineParser | undefined = parseCommandLineWorker(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
    const __gotots_struct_0 = CompilerOptions__from_core.$zero();
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = { value: __gotots_struct_0 };
    const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void((parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options));
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_0(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_0 = $argument0;
        const __gotots_range_value_1 = $argument1;
        let key = __gotots_range_value_0;
        let value: GoInterface | undefined = __gotots_range_value_1;
        let buildOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = NameMap.Get($state.BuildNameMap, key);
        if (tsonicTypeScriptRuntime.sameLocation(buildOption, new $ProjectedPropertyLocation($state, "TscBuildOption", CommandLineOption.$fromStorage, CommandLineOption.$storageOf))
            ||
                tsonicTypeScriptRuntime.sameLocation(buildOption, NameMap.Get($state.CompilerNameMap, key))) {
            ParseCompilerOptions(key, value, compilerOptions);
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    const __gotots_argument_4 = (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options;
    const __gotots_struct_1 = BuildOptions__from_core.$zero();
    const __gotots_field_0 = { value: __gotots_struct_1 };
    const __gotots_argument_5 = new buildOptionsParser(__gotots_field_0);
    const __gotots_field_3 = (convertMapToOptions$PointerTo_Named_tsoptions$buildOptionsParser(__gotots_argument_4, __gotots_argument_5) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BuildOptions;
    const __gotots_field_4 = compilerOptions;
    const __gotots_field_5 = (convertMapToOptions$PointerTo_Named_tsoptions$watchOptionsParser((parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, new watchOptionsParser({ value: new WatchOptions__from_core(void 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>()) })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).WatchOptions;
    const __gotots_field_6 = (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNames;
    const __gotots_field_7 = (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors;
    const __gotots_field_8 = new GoInterfaceAdapter((parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options);
    const __gotots_receiver_2 = host;
    const __gotots_receiver_3 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_2).FS();
    const __gotots_field_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
    const __gotots_receiver_4 = host;
    const __gotots_field_2 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_4).GetCurrentDirectory();
    const __gotots_field_9 = new ComparePathsOptions__from_tspath(__gotots_field_1, __gotots_field_2);
    let result: {
        value: ParsedBuildCommandLine;
    } | undefined = { value: new ParsedBuildCommandLine(__gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, __gotots_field_7, __gotots_field_8, __gotots_field_9, RuntimeSlice.nil<gostring>(), named_sync.SyncOnceOperations.$zero(), Locale__from_locale.$zero(), named_sync.SyncOnceOperations.$zero()) };
    if ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Projects.length === 0) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Projects = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Projects.append("", ["."]);
    }
    if (Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean) && Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Force)) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Options_0_and_1_cannot_be_combined, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("clean"), new $goInterfaceAdapter$string("force")]))]);
    }
    if (Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean) && Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Options_0_and_1_cannot_be_combined, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("clean"), new $goInterfaceAdapter$string("verbose")]))]);
    }
    if (Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean) && Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Options_0_and_1_cannot_be_combined, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("clean"), new $goInterfaceAdapter$string("watch")]))]);
    }
    if (Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch) && Tristate_IsTrue__from_core(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry)) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Options_0_and_1_cannot_be_combined, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("watch"), new $goInterfaceAdapter$string("dry")]))]);
    }
    return result;
}
export function parseCommandLineWorker(parseCommandLineWithDiagnostics: ParseCommandLineWorkerDiagnostics | undefined, commandLine: RuntimeSlice<gostring>, fs: FS__from_vfs | undefined, currentDirectory: gostring): commandLineParser | undefined {
    const __gotots_field_13 = fs;
    const __gotots_field_14 = currentDirectory;
    const __gotots_field_15 = parseCommandLineWithDiagnostics;
    const __gotots_field_16 = RuntimeSlice.literal<gostring>([]);
    const __gotots_struct_3 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
        return GoMap.nil();
    });
    const __gotots_field_17 = tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_3);
    let parser: commandLineParser | undefined = new commandLineParser(__gotots_field_15, void 0, __gotots_field_13, __gotots_field_14, __gotots_field_17, __gotots_field_16, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]));
    (parser ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).optionsMap = GetNameMapFromList(commandLineParser.OptionsDeclarations(parser));
    commandLineParser.$go$private$tsoptions$parseStrings(parser, commandLine);
    return parser;
}
export function getInputOptionName(input: gostring): gostring {
    return strings__from_gostdlib.TrimPrefix(strings__from_gostdlib.TrimPrefix(input, "-"), "-");
}
export function tryReadFile(fileName: gostring, readFile: (($0: gostring) => [
    gostring,
    bool
]) | undefined, errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): [
    gostring,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    const __gotots_callee_1 = readFile;
    const __gotots_argument_24 = fileName;
    const __gotots_results_7 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
    let text = __gotots_results_7[0];
    let e = __gotots_results_7[1];
    if (!e) {
        text = "";
        errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Cannot_read_file_0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fileName)]))]);
    }
    return [text, errors];
}
export function ParseListTypeOption(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: gostring): [
    RuntimeSlice<GoInterface | undefined>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    value = strings__from_gostdlib.TrimSpace(value);
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    if (strings__from_gostdlib.HasPrefix(value, "-")) {
        return [RuntimeSlice.literal<GoInterface | undefined>([]), errors];
    }
    if (((void CommandLineOptionKind,
        CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
        ===
            ((void CommandLineOptionKind,
                "listOrElement") as string) && !strings__from_gostdlib.ContainsRune(value, 44)) {
        const __gotots_results_9 = validateJsonOptionValue(opt, new $goInterfaceAdapter$string(value), void 0, void 0);
        let val: GoInterface | undefined = __gotots_results_9[0];
        let err = __gotots_results_9[1];
        if (!err.isNil()) {
            return [RuntimeSlice.literal<GoInterface | undefined>([]), err];
        }
        return [RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string((($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(val))]), errors];
    }
    if (value === "") {
        return [RuntimeSlice.literal<GoInterface | undefined>([]), errors];
    }
    let values = strings__from_gostdlib.Split(value, ",");
    switch (((void CommandLineOptionKind,
        CommandLineOption.$storageOf(((CommandLineOption.Elements(opt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) {
        case "string": {
            let elements = MapFiltered$string$Interface_void(values, (v: gostring): [
                GoInterface | undefined,
                bool
            ] => {
                const __gotots_results_10 = validateJsonOptionValue(CommandLineOption.Elements(opt), new $goInterfaceAdapter$string(v), void 0, void 0);
                let val: GoInterface | undefined = __gotots_results_10[0];
                let err = __gotots_results_10[1];
                {
                    const __gotots_results_11 = (($value: GoInterface | undefined): [
                        gostring,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return ["", false];
                        }
                        return [$value.$go$value, true];
                    })(val);
                    let s = __gotots_results_11[0];
                    let ok = __gotots_results_11[1];
                    if (ok && err.length === 0 && s !== "") {
                        return [new $goInterfaceAdapter$string(s), true];
                    }
                }
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
                return [new $goInterfaceAdapter$string(""), false];
            });
            return [elements, errors];
            break;
        }
        case "boolean":
        case "object":
        case "number": {
            const __gotots_argument_25 = new $goInterfaceAdapter$Named_tsoptions$CommandLineOptionKind(new CommandLineOptionKind(((void CommandLineOptionKind,
                "List of " +
                    ((void CommandLineOptionKind,
                        CommandLineOption.$storageOf(((CommandLineOption.Elements(opt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) as string)
                + " is not yet supported."));
            GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
            break;
        }
        default: {
            let result = MapFiltered$string$Interface_void(values, (v: gostring): [
                GoInterface | undefined,
                bool
            ] => {
                const __gotots_results_12 = convertJsonOptionOfEnumType(CommandLineOption.Elements(opt), strings__from_gostdlib.TrimFunc(v, IsWhiteSpaceLike__from_stringutil), void 0, void 0);
                let val: GoInterface | undefined = __gotots_results_12[0];
                let err = __gotots_results_12[1];
                {
                    const __gotots_results_13 = (($value: GoInterface | undefined): [
                        gostring,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return ["", false];
                        }
                        return [$value.$go$value, true];
                    })(val);
                    let s = __gotots_results_13[0];
                    let ok = __gotots_results_13[1];
                    if (ok && err.length === 0 && s !== "") {
                        return [new $goInterfaceAdapter$string(s), true];
                    }
                }
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
                return [new $goInterfaceAdapter$string(""), false];
            });
            return [result, errors];
            break;
        }
    }
}
export function convertJsonOptionOfEnumType(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: gostring, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (value === "") {
        return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    let key = strings__from_gostdlib.ToLower(value);
    let typeMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption.EnumMap(opt);
    if (typeMap === undefined) {
        return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    const __gotots_results_8 = OrderedMap$Get$string$Interface_void(typeMap, key);
    let val: GoInterface | undefined = __gotots_results_8[0];
    let ok = __gotots_results_8[1];
    if (ok) {
        return validateJsonOptionValue(opt, val, valueExpression, sourceFile);
    }
    return [void 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([createDiagnosticForInvalidEnumType(opt, sourceFile, valueExpression)])];
}
