import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections, Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption as GoMap } from "../../../../../../support/maps.js";
import { CommandLineOptionNameMap } from "./tsconfigparsing.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class CommandLineOptionKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function CommandLineOptionTypeString$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("string");
}
export function CommandLineOptionTypeNumber$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("number");
}
export function CommandLineOptionTypeBoolean$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("boolean");
}
export function CommandLineOptionTypeObject$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("object");
}
export function CommandLineOptionTypeList$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("list");
}
export function CommandLineOptionTypeListOrElement$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("listOrElement");
}
export function CommandLineOptionTypeEnum$constant(): CommandLineOptionKind {
    return new CommandLineOptionKind("enum");
}
export type CommandLineOption$Storage = {
    Name: gostring;
    ShortName: gostring;
    Kind: gostring;
    IsFilePath: bool;
    IsTSConfigOnly: bool;
    IsCommandLineOnly: bool;
    Description: {
        value: Message__from_diagnostics;
    } | undefined;
    DefaultValueDescription: GoInterface | undefined;
    ShowInSimplifiedHelpView: bool;
    Category: {
        value: Message__from_diagnostics;
    } | undefined;
    extraValidation: gostring;
    minValue: int;
    allowConfigDirTemplateSubstitution: bool;
    AffectsDeclarationPath: bool;
    AffectsProgramStructure: bool;
    AffectsSemanticDiagnostics: bool;
    AffectsBuildInfo: bool;
    AffectsBindDiagnostics: bool;
    AffectsSourceFile: bool;
    AffectsModuleResolution: bool;
    AffectsEmit: bool;
    allowJsFlag: bool;
    strictFlag: bool;
    transpileOptionValue: uint8;
    listPreserveFalsyValues: bool;
    ElementOptions: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>;
};
export class CommandLineOption {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CommandLineOption$Storage) {
    }
    public static $storageOf($source: CommandLineOption): CommandLineOption$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: CommandLineOption$Storage): CommandLineOption {
        return new CommandLineOption($source);
    }
    public get Name(): gostring {
        return this.$storage.Name;
    }
    public set Name($value: gostring) {
        this.$storage.Name = $value;
    }
    public get ShortName(): gostring {
        return this.$storage.ShortName;
    }
    public set ShortName($value: gostring) {
        this.$storage.ShortName = $value;
    }
    public get Kind(): CommandLineOptionKind {
        return new CommandLineOptionKind(this.$storage.Kind);
    }
    public set Kind($value: CommandLineOptionKind) {
        this.$storage.Kind = $value.$value;
    }
    public get IsFilePath(): bool {
        return this.$storage.IsFilePath;
    }
    public set IsFilePath($value: bool) {
        this.$storage.IsFilePath = $value;
    }
    public get IsTSConfigOnly(): bool {
        return this.$storage.IsTSConfigOnly;
    }
    public set IsTSConfigOnly($value: bool) {
        this.$storage.IsTSConfigOnly = $value;
    }
    public get IsCommandLineOnly(): bool {
        return this.$storage.IsCommandLineOnly;
    }
    public set IsCommandLineOnly($value: bool) {
        this.$storage.IsCommandLineOnly = $value;
    }
    public get Description(): {
        value: Message__from_diagnostics;
    } | undefined {
        return this.$storage.Description;
    }
    public set Description($value: {
        value: Message__from_diagnostics;
    } | undefined) {
        this.$storage.Description = $value;
    }
    public get DefaultValueDescription(): GoInterface | undefined {
        return this.$storage.DefaultValueDescription;
    }
    public set DefaultValueDescription($value: GoInterface | undefined) {
        this.$storage.DefaultValueDescription = $value;
    }
    public get ShowInSimplifiedHelpView(): bool {
        return this.$storage.ShowInSimplifiedHelpView;
    }
    public set ShowInSimplifiedHelpView($value: bool) {
        this.$storage.ShowInSimplifiedHelpView = $value;
    }
    public get Category(): {
        value: Message__from_diagnostics;
    } | undefined {
        return this.$storage.Category;
    }
    public set Category($value: {
        value: Message__from_diagnostics;
    } | undefined) {
        this.$storage.Category = $value;
    }
    public get extraValidation(): extraValidation {
        return new extraValidation(this.$storage.extraValidation);
    }
    public set extraValidation($value: extraValidation) {
        this.$storage.extraValidation = $value.$value;
    }
    public get minValue(): int {
        return this.$storage.minValue;
    }
    public set minValue($value: int) {
        this.$storage.minValue = $value;
    }
    public get allowConfigDirTemplateSubstitution(): bool {
        return this.$storage.allowConfigDirTemplateSubstitution;
    }
    public set allowConfigDirTemplateSubstitution($value: bool) {
        this.$storage.allowConfigDirTemplateSubstitution = $value;
    }
    public get AffectsDeclarationPath(): bool {
        return this.$storage.AffectsDeclarationPath;
    }
    public set AffectsDeclarationPath($value: bool) {
        this.$storage.AffectsDeclarationPath = $value;
    }
    public get AffectsProgramStructure(): bool {
        return this.$storage.AffectsProgramStructure;
    }
    public set AffectsProgramStructure($value: bool) {
        this.$storage.AffectsProgramStructure = $value;
    }
    public get AffectsSemanticDiagnostics(): bool {
        return this.$storage.AffectsSemanticDiagnostics;
    }
    public set AffectsSemanticDiagnostics($value: bool) {
        this.$storage.AffectsSemanticDiagnostics = $value;
    }
    public get AffectsBuildInfo(): bool {
        return this.$storage.AffectsBuildInfo;
    }
    public set AffectsBuildInfo($value: bool) {
        this.$storage.AffectsBuildInfo = $value;
    }
    public get AffectsBindDiagnostics(): bool {
        return this.$storage.AffectsBindDiagnostics;
    }
    public set AffectsBindDiagnostics($value: bool) {
        this.$storage.AffectsBindDiagnostics = $value;
    }
    public get AffectsSourceFile(): bool {
        return this.$storage.AffectsSourceFile;
    }
    public set AffectsSourceFile($value: bool) {
        this.$storage.AffectsSourceFile = $value;
    }
    public get AffectsModuleResolution(): bool {
        return this.$storage.AffectsModuleResolution;
    }
    public set AffectsModuleResolution($value: bool) {
        this.$storage.AffectsModuleResolution = $value;
    }
    public get AffectsEmit(): bool {
        return this.$storage.AffectsEmit;
    }
    public set AffectsEmit($value: bool) {
        this.$storage.AffectsEmit = $value;
    }
    public get allowJsFlag(): bool {
        return this.$storage.allowJsFlag;
    }
    public set allowJsFlag($value: bool) {
        this.$storage.allowJsFlag = $value;
    }
    public get strictFlag(): bool {
        return this.$storage.strictFlag;
    }
    public set strictFlag($value: bool) {
        this.$storage.strictFlag = $value;
    }
    public get transpileOptionValue(): Tristate__from_core {
        return this.$storage.transpileOptionValue;
    }
    public set transpileOptionValue($value: Tristate__from_core) {
        this.$storage.transpileOptionValue = $value;
    }
    public get listPreserveFalsyValues(): bool {
        return this.$storage.listPreserveFalsyValues;
    }
    public set listPreserveFalsyValues($value: bool) {
        this.$storage.listPreserveFalsyValues = $value;
    }
    public get ElementOptions(): CommandLineOptionNameMap {
        return new CommandLineOptionNameMap(this.$storage.ElementOptions);
    }
    public set ElementOptions($value: CommandLineOptionNameMap) {
        this.$storage.ElementOptions = $value.$value;
    }
    static $zero(): CommandLineOption {
        return new CommandLineOption({
            Name: "",
            ShortName: "",
            Kind: ((void CommandLineOptionKind,
                "") as gostring),
            IsFilePath: false,
            IsTSConfigOnly: false,
            IsCommandLineOnly: false,
            Description: void 0,
            DefaultValueDescription: void 0,
            ShowInSimplifiedHelpView: false,
            Category: void 0,
            extraValidation: ((void extraValidation,
                "") as gostring),
            minValue: 0,
            allowConfigDirTemplateSubstitution: false,
            AffectsDeclarationPath: false,
            AffectsProgramStructure: false,
            AffectsSemanticDiagnostics: false,
            AffectsBuildInfo: false,
            AffectsBindDiagnostics: false,
            AffectsSourceFile: false,
            AffectsModuleResolution: false,
            AffectsEmit: false,
            allowJsFlag: false,
            strictFlag: false,
            transpileOptionValue: 0,
            listPreserveFalsyValues: false,
            ElementOptions: new CommandLineOptionNameMap(GoMap.nil()).$value
        });
    }
    declare private readonly then?: never;
    static DeprecatedKeys(o: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        if (!(((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as gostring)
            === CommandLineOptionTypeEnum$constant().$value)) {
            return void 0;
        }
        return $state.commandLineOptionDeprecated.lookup(CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name);
    }
    static DisallowNullOrUndefined(o: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): bool {
        return CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name === "extends";
    }
    static Elements(o: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined {
        if (!(((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as gostring)
            === CommandLineOptionTypeList$constant().$value) && !(((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as gostring)
            === CommandLineOptionTypeListOrElement$constant().$value)) {
            return void 0;
        }
        return $state.commandLineOptionElements.lookup(CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name);
    }
    static EnumMap(o: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
        if (!(((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as gostring)
            === CommandLineOptionTypeEnum$constant().$value)) {
            return void 0;
        }
        return $state.commandLineOptionEnumMap.lookup(CommandLineOption.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name);
    }
}
export class extraValidation {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function extraValidationSpec$constant(): extraValidation {
    return new extraValidation("spec");
}
export function extraValidationLocale$constant(): extraValidation {
    return new extraValidation("locale");
}
export interface CompilerOptionsValue extends GoInterfaceValue {
}
export const CompilerOptionsValue$contract: readonly object[] = globalThis.Object.freeze([]);
export function CompilerOptionsValue$is(value: GoInterfaceValue | undefined): value is CompilerOptionsValue {
    return value !== undefined && value.$go$implements(CompilerOptionsValue$contract);
}
