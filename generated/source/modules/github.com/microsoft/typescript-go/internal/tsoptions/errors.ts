import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { AlternateModeDiagnostics } from "./diagnostics.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, NewDiagnostic as NewDiagnostic__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { OrderedMap$Keys$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { Filter$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Collect$string } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { CommandLineOption, CommandLineOptionKind } from "./commandlineoption.js";
import { NameMap } from "./namemap.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function createDiagnosticForInvalidEnumType(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let namesOfType = Collect$string(OrderedMap$Keys$string$Interface_void(CommandLineOption.EnumMap(opt)));
    let stringNames = formatEnumTypeKeys(opt, namesOfType);
    let optName = "--" + CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name;
    return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, $state__diagnostics.Argument_for_0_option_must_be_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(optName), new GoInterfaceAdapter(stringNames)]));
}
export function formatEnumTypeKeys(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, keys: RuntimeSlice<gostring>): gostring {
    if (!(CommandLineOption.DeprecatedKeys(opt) === undefined)) {
        keys = Filter$string(keys, (key: gostring): bool => {
            return !Set__from_collections.Has<gostring>(CommandLineOption.DeprecatedKeys(opt), key);
        });
    }
    return "'" + strings__from_gostdlib.Join(keys, "', '") + "'";
}
export function getCompilerOptionValueTypeString(option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): gostring {
    switch (((void CommandLineOptionKind,
        CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) {
        case "listOrElement": {
            return fmt__from_gostdlib.Sprintf("%v or Array", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(getCompilerOptionValueTypeString(CommandLineOption.Elements(option)))]));
            break;
        }
        case "list": {
            return "Array";
            break;
        }
        default: {
            return ((void CommandLineOptionKind,
                CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string);
            break;
        }
    }
}
export function createUnknownOptionError(unknownOption: gostring, unknownOptionDiagnostic: {
    value: Message__from_diagnostics;
} | undefined, unknownOptionErrorText: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, alternateMode: AlternateModeDiagnostics | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    if (!(alternateMode === undefined) && !((alternateMode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).optionsNameMap === undefined)) {
        let otherOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = NameMap.Get((alternateMode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).optionsNameMap, strings__from_gostdlib.ToLower(unknownOption));
        if (!(otherOption === undefined)) {
            let diagnostic: {
                value: Message__from_diagnostics;
            } | undefined = (alternateMode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).diagnostic;
            if (CommandLineOption.$storageOf(((otherOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name === "build") {
                diagnostic = $state__diagnostics.Option_build_must_be_the_first_command_line_argument;
            }
            return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostic, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(unknownOption)]));
        }
    }
    if (unknownOptionErrorText === "") {
        unknownOptionErrorText = unknownOption;
    }
    return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, unknownOptionDiagnostic, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(unknownOptionErrorText)]));
}
export function CreateDiagnosticForNodeInSourceFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return NewDiagnostic__from_ast(sourceFile, NewTextRange__from_core(SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos()), Node__from_ast.End(node)), message, args);
}
export function CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    if (!(sourceFile === undefined) && !(node === undefined)) {
        return CreateDiagnosticForNodeInSourceFile(sourceFile, node, message, args);
    }
    return NewCompilerDiagnostic__from_ast(message, args);
}
export function extraKeyDiagnostics(s: gostring): {
    value: Message__from_diagnostics;
} | undefined {
    switch (s) {
        case "compilerOptions": {
            return $state__diagnostics.Unknown_compiler_option_0;
            break;
        }
        case "watchOptions": {
            return $state__diagnostics.Unknown_watch_option_0;
            break;
        }
        case "typeAcquisition": {
            return $state__diagnostics.Unknown_type_acquisition_option_0;
            break;
        }
        case "buildOptions": {
            return $state__diagnostics.Unknown_build_option_0;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function extraKeyDidYouMeanDiagnostics(s: gostring): {
    value: Message__from_diagnostics;
} | undefined {
    switch (s) {
        case "compilerOptions": {
            return $state__diagnostics.Unknown_compiler_option_0_Did_you_mean_1;
            break;
        }
        case "watchOptions": {
            return $state__diagnostics.Unknown_watch_option_0_Did_you_mean_1;
            break;
        }
        case "typeAcquisition": {
            return $state__diagnostics.Unknown_type_acquisition_option_0_Did_you_mean_1;
            break;
        }
        case "buildOptions": {
            return $state__diagnostics.Unknown_build_option_0_Did_you_mean_1;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
