import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Tristate } from "./tristate.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { CombinePaths as CombinePaths__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Size$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { ForEachAncestorDirectory$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectory.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goReflectType$PointerTo_Named_core$CompilerOptions } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { _ModuleKind_name_0$string, _ModuleKind_name_1$string, _ModuleKind_name_2$string } from "./modulekind_stringer_generated.js";
import { _ScriptTarget_name_0$string, _ScriptTarget_name_1$string } from "./scripttarget_stringer_generated.js";
import { TSFalse$constant, TSTrue$constant, TSUnknown$constant, Tristate_IsTrue, Tristate_IsTrueOrUnknown } from "./tristate.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class CompilerOptions {
    declare private readonly $goType: void;
    public constructor($blank0: noCopy, public AllowJs: Tristate, public AllowArbitraryExtensions: Tristate, public AllowImportingTsExtensions: Tristate, public AllowNonTsExtensions: Tristate, public AllowUmdGlobalAccess: Tristate, public AllowUnreachableCode: Tristate, public AllowUnusedLabels: Tristate, public AssumeChangesOnlyAffectDirectDependencies: Tristate, public CheckJs: Tristate, public CustomConditions: RuntimeSlice<gostring>, public Composite: Tristate, public EmitDeclarationOnly: Tristate, public EmitBOM: Tristate, public EmitDecoratorMetadata: Tristate, public Declaration: Tristate, public DeclarationDir: gostring, public DeclarationMap: Tristate, public DeduplicatePackages: Tristate, public DisableSizeLimit: Tristate, public DisableSourceOfProjectReferenceRedirect: Tristate, public DisableSolutionSearching: Tristate, public DisableReferencedProjectLoad: Tristate, public ErasableSyntaxOnly: Tristate, public ExactOptionalPropertyTypes: Tristate, public ExperimentalDecorators: Tristate, public ForceConsistentCasingInFileNames: Tristate, public IsolatedModules: Tristate, public IsolatedDeclarations: Tristate, public IgnoreConfig: Tristate, public IgnoreDeprecations: gostring, public ImportHelpers: Tristate, public InlineSourceMap: Tristate, public InlineSources: Tristate, public Init: Tristate, public Incremental: Tristate, public Jsx: JsxEmit, public JsxFactory: gostring, public JsxFragmentFactory: gostring, public JsxImportSource: gostring, public Lib: RuntimeSlice<gostring>, public LibReplacement: Tristate, public Locale: gostring, public MapRoot: gostring, public Module: ModuleKind, public ModuleResolution: ModuleResolutionKind, public ModuleSuffixes: RuntimeSlice<gostring>, public ModuleDetection: ModuleDetectionKind, public NewLine: NewLineKind, public NoEmit: Tristate, public NoCheck: Tristate, public NoErrorTruncation: Tristate, public NoFallthroughCasesInSwitch: Tristate, public NoImplicitAny: Tristate, public NoImplicitThis: Tristate, public NoImplicitReturns: Tristate, public NoEmitHelpers: Tristate, public NoLib: Tristate, public NoPropertyAccessFromIndexSignature: Tristate, public NoUncheckedIndexedAccess: Tristate, public NoEmitOnError: Tristate, public NoUnusedLocals: Tristate, public NoUnusedParameters: Tristate, public NoResolve: Tristate, public NoImplicitOverride: Tristate, public NoUncheckedSideEffectImports: Tristate, public OutDir: gostring, public Paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, public PreserveConstEnums: Tristate, public PreserveSymlinks: Tristate, public Project: gostring, public ResolveJsonModule: Tristate, public ResolvePackageJsonExports: Tristate, public ResolvePackageJsonImports: Tristate, public RemoveComments: Tristate, public RewriteRelativeImportExtensions: Tristate, public ReactNamespace: gostring, public RootDir: gostring, public RootDirs: RuntimeSlice<gostring>, public SkipLibCheck: Tristate, public StableTypeOrdering: Tristate, public Strict: Tristate, public StrictBindCallApply: Tristate, public StrictBuiltinIteratorReturn: Tristate, public StrictFunctionTypes: Tristate, public StrictNullChecks: Tristate, public StrictPropertyInitialization: Tristate, public StripInternal: Tristate, public SkipDefaultLibCheck: Tristate, public SourceMap: Tristate, public SourceRoot: gostring, public SuppressOutputPathCheck: Tristate, public Target: ScriptTarget, public TraceResolution: Tristate, public TsBuildInfoFile: gostring, public TypeRoots: RuntimeSlice<gostring>, public Types: RuntimeSlice<gostring>, public UseDefineForClassFields: Tristate, public UseUnknownInCatchVariables: Tristate, public VerbatimModuleSyntax: Tristate, public MaxNodeModuleJsDepth: tsonicTypeScriptRuntime.Location<int> | undefined, public AllowSyntheticDefaultImports: Tristate, public AlwaysStrict: Tristate, public BaseUrl: gostring, public DownlevelIteration: Tristate, public ESModuleInterop: Tristate, public OutFile: gostring, public ConfigFilePath: gostring, public NoDtsResolution: Tristate, public PathsBasePath: gostring, public Diagnostics: Tristate, public ExtendedDiagnostics: Tristate, public GenerateCpuProfile: gostring, public GenerateTrace: gostring, public ListEmittedFiles: Tristate, public ListFiles: Tristate, public ExplainFiles: Tristate, public ListFilesOnly: Tristate, public NoEmitForJsFiles: Tristate, public PreserveWatchOutput: Tristate, public Pretty: Tristate, public Version: Tristate, public Watch: Tristate, public ShowConfig: Tristate, public Build: Tristate, public Help: Tristate, public All: Tristate, public PprofDir: gostring, public SingleThreaded: Tristate, public Quiet: Tristate, public Checkers: tsonicTypeScriptRuntime.Location<int> | undefined) {
    }
    static $zero(): CompilerOptions {
        return new CompilerOptions(noCopy.$zero(), 0, 0, 0, 0, 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, "", "", "", RuntimeSlice.nil<gostring>(), 0, "", "", 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", void 0, 0, 0, "", 0, 0, 0, 0, 0, "", "", RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, "", RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, void 0, 0, 0, "", 0, 0, "", "", 0, "", 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, void 0);
    }
    static $copy($source: CompilerOptions): CompilerOptions {
        return new CompilerOptions(noCopy.$zero(), $source.AllowJs, $source.AllowArbitraryExtensions, $source.AllowImportingTsExtensions, $source.AllowNonTsExtensions, $source.AllowUmdGlobalAccess, $source.AllowUnreachableCode, $source.AllowUnusedLabels, $source.AssumeChangesOnlyAffectDirectDependencies, $source.CheckJs, $source.CustomConditions, $source.Composite, $source.EmitDeclarationOnly, $source.EmitBOM, $source.EmitDecoratorMetadata, $source.Declaration, $source.DeclarationDir, $source.DeclarationMap, $source.DeduplicatePackages, $source.DisableSizeLimit, $source.DisableSourceOfProjectReferenceRedirect, $source.DisableSolutionSearching, $source.DisableReferencedProjectLoad, $source.ErasableSyntaxOnly, $source.ExactOptionalPropertyTypes, $source.ExperimentalDecorators, $source.ForceConsistentCasingInFileNames, $source.IsolatedModules, $source.IsolatedDeclarations, $source.IgnoreConfig, $source.IgnoreDeprecations, $source.ImportHelpers, $source.InlineSourceMap, $source.InlineSources, $source.Init, $source.Incremental, $source.Jsx, $source.JsxFactory, $source.JsxFragmentFactory, $source.JsxImportSource, $source.Lib, $source.LibReplacement, $source.Locale, $source.MapRoot, $source.Module, $source.ModuleResolution, $source.ModuleSuffixes, $source.ModuleDetection, $source.NewLine, $source.NoEmit, $source.NoCheck, $source.NoErrorTruncation, $source.NoFallthroughCasesInSwitch, $source.NoImplicitAny, $source.NoImplicitThis, $source.NoImplicitReturns, $source.NoEmitHelpers, $source.NoLib, $source.NoPropertyAccessFromIndexSignature, $source.NoUncheckedIndexedAccess, $source.NoEmitOnError, $source.NoUnusedLocals, $source.NoUnusedParameters, $source.NoResolve, $source.NoImplicitOverride, $source.NoUncheckedSideEffectImports, $source.OutDir, $source.Paths, $source.PreserveConstEnums, $source.PreserveSymlinks, $source.Project, $source.ResolveJsonModule, $source.ResolvePackageJsonExports, $source.ResolvePackageJsonImports, $source.RemoveComments, $source.RewriteRelativeImportExtensions, $source.ReactNamespace, $source.RootDir, $source.RootDirs, $source.SkipLibCheck, $source.StableTypeOrdering, $source.Strict, $source.StrictBindCallApply, $source.StrictBuiltinIteratorReturn, $source.StrictFunctionTypes, $source.StrictNullChecks, $source.StrictPropertyInitialization, $source.StripInternal, $source.SkipDefaultLibCheck, $source.SourceMap, $source.SourceRoot, $source.SuppressOutputPathCheck, $source.Target, $source.TraceResolution, $source.TsBuildInfoFile, $source.TypeRoots, $source.Types, $source.UseDefineForClassFields, $source.UseUnknownInCatchVariables, $source.VerbatimModuleSyntax, $source.MaxNodeModuleJsDepth, $source.AllowSyntheticDefaultImports, $source.AlwaysStrict, $source.BaseUrl, $source.DownlevelIteration, $source.ESModuleInterop, $source.OutFile, $source.ConfigFilePath, $source.NoDtsResolution, $source.PathsBasePath, $source.Diagnostics, $source.ExtendedDiagnostics, $source.GenerateCpuProfile, $source.GenerateTrace, $source.ListEmittedFiles, $source.ListFiles, $source.ExplainFiles, $source.ListFilesOnly, $source.NoEmitForJsFiles, $source.PreserveWatchOutput, $source.Pretty, $source.Version, $source.Watch, $source.ShowConfig, $source.Build, $source.Help, $source.All, $source.PprofDir, $source.SingleThreaded, $source.Quiet, $source.Checkers);
    }
    declare private readonly then?: never;
    static AllowImportingTsExtensionsFrom(options: {
        value: CompilerOptions;
    } | undefined, fileName: gostring): bool {
        return CompilerOptions.GetAllowImportingTsExtensions(options) || IsDeclarationFileName__from_tspath(fileName);
    }
    static Clone(options: {
        value: CompilerOptions;
    } | undefined): {
        value: CompilerOptions;
    } | undefined {
        let target: {
            value: CompilerOptions;
        } | undefined = { value: new CompilerOptions(noCopy.$zero(), 0, 0, 0, 0, 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, "", "", "", RuntimeSlice.nil<gostring>(), 0, "", "", 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", void 0, 0, 0, "", 0, 0, 0, 0, 0, "", "", RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, "", RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, void 0, 0, 0, "", 0, 0, "", "", 0, "", 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, void 0) };
        let sourceValue = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions(options)).Elem();
        let targetValue = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions(target)).Elem();
        const __gotots_range_0 = globalThis.Number(BigInt.asIntN(64, sourceValue.NumField()));
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            let i = __gotots_range_value_0;
            const __gotots_receiver_0 = $state.optionsType;
            const __gotots_argument_5 = i;
            if (goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_5))).IsExported()) {
                targetValue.Field(BigInt.asIntN(64, goNumberToBigInt(i))).Set(sourceValue.Field(BigInt.asIntN(64, goNumberToBigInt(i))));
            }
        }
        return target;
    }
    static GetAllowImportingTsExtensions(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowImportingTsExtensions) || Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions);
    }
    static GetAllowJS(options: {
        value: CompilerOptions;
    } | undefined): bool {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowJs === TSUnknown$constant())) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowJs === TSTrue$constant();
        }
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs === TSTrue$constant();
    }
    static GetAreDeclarationMapsEnabled(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap === TSTrue$constant() && CompilerOptions.GetEmitDeclarations(options);
    }
    static GetEffectiveTypeRoots(options: {
        value: CompilerOptions;
    } | undefined, currentDirectory: gostring): [
        RuntimeSlice<gostring>,
        bool
    ] {
        let result: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
        let fromConfig: bool = false;
        if (!(options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots.isNil()) {
            return [(options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots, true];
        }
        let baseDir = "";
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
            baseDir = GetDirectoryPath__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
        }
        else {
            baseDir = currentDirectory;
            if (baseDir === "") {
                const __gotots_argument_4 = new GoInterfaceAdapter("cannot get effective type roots without a config file path or current directory");
                GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
            }
        }
        let typeRoots = RuntimeSlice.make<gostring>(0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(baseDir, "/"))), "");
        ForEachAncestorDirectory$Interface_void(baseDir, (dir: gostring): [
            GoInterface | undefined,
            bool
        ] => {
            typeRoots = typeRoots.append("", [CombinePaths__from_tspath(dir, RuntimeSlice.literal<gostring>(["node_modules", "@types"]))]);
            return [void 0, false];
        });
        return [typeRoots, false];
    }
    static GetEmitDeclarations(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration) || Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite);
    }
    static GetEmitModuleDetectionKind(options: {
        value: CompilerOptions;
    } | undefined): ModuleDetectionKind {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleDetection === ModuleDetectionKindNone$constant())) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleDetection;
        }
        let moduleKind = CompilerOptions.GetEmitModuleKind(options);
        if (ModuleKindNode16$constant() <= moduleKind && moduleKind <= ModuleKindNodeNext$constant()) {
            return ModuleDetectionKindForce$constant();
        }
        return ModuleDetectionKindAuto$constant();
    }
    static GetEmitModuleKind(options: {
        value: CompilerOptions;
    } | undefined): ModuleKind {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module === ModuleKindNone$constant())) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module;
        }
        let target = CompilerOptions.GetEmitScriptTarget(options);
        if (target === ScriptTargetESNext$constant()) {
            return ModuleKindESNext$constant();
        }
        if (target >= ScriptTargetES2022$constant()) {
            return ModuleKindES2022$constant();
        }
        if (target >= ScriptTargetES2020$constant()) {
            return ModuleKindES2020$constant();
        }
        if (target >= ScriptTargetES2015$constant()) {
            return ModuleKindES2015$constant();
        }
        return ModuleKindCommonJS$constant();
    }
    static GetEmitScriptTarget(options: {
        value: CompilerOptions;
    } | undefined): ScriptTarget {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target === ScriptTargetNone$constant())) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target;
        }
        return ScriptTargetLatestStandard$constant();
    }
    static GetEmitStandardClassFields(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return !((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseDefineForClassFields === TSFalse$constant()) && CompilerOptions.GetEmitScriptTarget(options) >= ScriptTargetES2022$constant();
    }
    static GetIsolatedModules(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules === TSTrue$constant() || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax === TSTrue$constant();
    }
    static GetJSXTransformEnabled(options: {
        value: CompilerOptions;
    } | undefined): bool {
        let jsx: CompilerOptions["Jsx"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx;
        return jsx === JsxEmitReact$constant() || jsx === JsxEmitReactJSX$constant() || jsx === JsxEmitReactJSXDev$constant();
    }
    static GetModuleResolutionKind(options: {
        value: CompilerOptions;
    } | undefined): ModuleResolutionKind {
        switch ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution) {
            case ModuleResolutionKindUnknown$constant():
            case ModuleResolutionKindClassic$constant():
            case ModuleResolutionKindNode10$constant(): {
                switch (CompilerOptions.GetEmitModuleKind(options)) {
                    case ModuleKindNode16$constant():
                    case ModuleKindNode18$constant():
                    case ModuleKindNode20$constant(): {
                        return ModuleResolutionKindNode16$constant();
                        break;
                    }
                    case ModuleKindNodeNext$constant(): {
                        return ModuleResolutionKindNodeNext$constant();
                        break;
                    }
                    default: {
                        return ModuleResolutionKindBundler$constant();
                        break;
                    }
                }
                break;
            }
            default: {
                return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution;
                break;
            }
        }
    }
    static GetPathsBasePath(options: {
        value: CompilerOptions;
    } | undefined, currentDirectory: gostring): gostring {
        if (OrderedMap$Size$string$SliceOf_string((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths) === 0) {
            return "";
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PathsBasePath !== "") {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PathsBasePath;
        }
        return currentDirectory;
    }
    static GetResolveJsonModule(options: {
        value: CompilerOptions;
    } | undefined): bool {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolveJsonModule === TSUnknown$constant())) {
            return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolveJsonModule === TSTrue$constant();
        }
        switch (CompilerOptions.GetEmitModuleKind(options)) {
            case ModuleKindNode20$constant():
            case ModuleKindNodeNext$constant(): {
                return true;
                break;
            }
        }
        return CompilerOptions.GetModuleResolutionKind(options) === ModuleResolutionKindBundler$constant();
    }
    static GetResolvePackageJsonExports(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Tristate_IsTrueOrUnknown((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonExports);
    }
    static GetResolvePackageJsonImports(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Tristate_IsTrueOrUnknown((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonImports);
    }
    static GetStrictOptionValue(options: {
        value: CompilerOptions;
    } | undefined, value: Tristate): bool {
        if (!(value === TSUnknown$constant())) {
            return value === TSTrue$constant();
        }
        return !((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Strict === TSFalse$constant());
    }
    static GetUseDefineForClassFields(options: {
        value: CompilerOptions;
    } | undefined): bool {
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseDefineForClassFields === TSUnknown$constant()) {
            return CompilerOptions.GetEmitScriptTarget(options) >= ScriptTargetES2022$constant();
        }
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseDefineForClassFields === TSTrue$constant();
    }
    static IsIncremental(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incremental) || Tristate_IsTrue((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite);
    }
    static ShouldPreserveConstEnums(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveConstEnums === TSTrue$constant() || CompilerOptions.GetIsolatedModules(options);
    }
    static UsesWildcardTypes(options: {
        value: CompilerOptions;
    } | undefined): bool {
        return Contains$SliceOf_string$string((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types, "*");
    }
}
export class noCopy {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $zero(): noCopy {
        return new noCopy();
    }
    static $copy($source: noCopy): noCopy {
        return new noCopy();
    }
    static $equal($left: noCopy, $right: noCopy): bool {
        return true;
    }
    static $hash($source: noCopy): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
}
export type ModuleDetectionKind = int32;
export function ModuleDetectionKindNone$constant(): ModuleDetectionKind {
    return 0;
}
export function ModuleDetectionKindAuto$constant(): ModuleDetectionKind {
    return 1;
}
export function ModuleDetectionKindLegacy$constant(): ModuleDetectionKind {
    return 2;
}
export function ModuleDetectionKindForce$constant(): ModuleDetectionKind {
    return 3;
}
export type ModuleKind = int32;
export function ModuleKindNone$constant(): ModuleKind {
    return 0;
}
export function ModuleKindCommonJS$constant(): ModuleKind {
    return 1;
}
export function ModuleKindAMD$constant(): ModuleKind {
    return 2;
}
export function ModuleKindUMD$constant(): ModuleKind {
    return 3;
}
export function ModuleKindSystem$constant(): ModuleKind {
    return 4;
}
export function ModuleKindES2015$constant(): ModuleKind {
    return 5;
}
export function ModuleKindES2020$constant(): ModuleKind {
    return 6;
}
export function ModuleKindES2022$constant(): ModuleKind {
    return 7;
}
export function ModuleKindESNext$constant(): ModuleKind {
    return 99;
}
export function ModuleKindNode16$constant(): ModuleKind {
    return 100;
}
export function ModuleKindNode18$constant(): ModuleKind {
    return 101;
}
export function ModuleKindNode20$constant(): ModuleKind {
    return 102;
}
export function ModuleKindNodeNext$constant(): ModuleKind {
    return 199;
}
export function ModuleKindPreserve$constant(): ModuleKind {
    return 200;
}
export function ModuleKind_IsNonNodeESM(moduleKind: ModuleKind): bool {
    return moduleKind >= ModuleKindES2015$constant() && moduleKind <= ModuleKindESNext$constant();
}
export function ModuleKind_SupportsImportAttributes(moduleKind: ModuleKind): bool {
    return ModuleKindNode18$constant() <= moduleKind && moduleKind <= ModuleKindNodeNext$constant() || moduleKind === ModuleKindPreserve$constant() || moduleKind === ModuleKindESNext$constant();
}
export function ResolutionModeNone$constant(): ModuleKind {
    return 0;
}
export function ResolutionModeCommonJS$constant(): ModuleKind {
    return 1;
}
export function ResolutionModeESM$constant(): ModuleKind {
    return 99;
}
export type ModuleResolutionKind = int32;
export function ModuleResolutionKindUnknown$constant(): ModuleResolutionKind {
    return 0;
}
export function ModuleResolutionKindClassic$constant(): ModuleResolutionKind {
    return 1;
}
export function ModuleResolutionKindNode10$constant(): ModuleResolutionKind {
    return 2;
}
export function ModuleResolutionKindNode16$constant(): ModuleResolutionKind {
    return 3;
}
export function ModuleResolutionKindNodeNext$constant(): ModuleResolutionKind {
    return 99;
}
export function ModuleResolutionKindBundler$constant(): ModuleResolutionKind {
    return 100;
}
export function ModuleResolutionKind_String(m: ModuleResolutionKind): gostring {
    switch (m) {
        case ModuleResolutionKindUnknown$constant(): {
            const __gotots_argument_2 = new GoInterfaceAdapter("should not use zero value of ModuleResolutionKind");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
            break;
        }
        case ModuleResolutionKindClassic$constant(): {
            return "Classic";
            break;
        }
        case ModuleResolutionKindNode10$constant(): {
            return "Node10";
            break;
        }
        case ModuleResolutionKindNode16$constant(): {
            return "Node16";
            break;
        }
        case ModuleResolutionKindNodeNext$constant(): {
            return "NodeNext";
            break;
        }
        case ModuleResolutionKindBundler$constant(): {
            return "Bundler";
            break;
        }
        default: {
            const __gotots_argument_3 = new GoInterfaceAdapter("unhandled case in ModuleResolutionKind.String");
            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
            break;
        }
    }
}
export type NewLineKind = int32;
export function NewLineKindNone$constant(): NewLineKind {
    return 0;
}
export function NewLineKindCRLF$constant(): NewLineKind {
    return 1;
}
export function NewLineKindLF$constant(): NewLineKind {
    return 2;
}
export function GetNewLineKind(s: gostring): NewLineKind {
    switch (s) {
        case "\r\n": {
            return NewLineKindCRLF$constant();
            break;
        }
        case "\n": {
            return NewLineKindLF$constant();
            break;
        }
        default: {
            return NewLineKindNone$constant();
            break;
        }
    }
}
export function NewLineKind_GetNewLineCharacter(newLine: NewLineKind): gostring {
    switch (newLine) {
        case NewLineKindCRLF$constant(): {
            return "\r\n";
            break;
        }
        default: {
            return "\n";
            break;
        }
    }
}
export type ScriptTarget = int32;
export function ScriptTargetNone$constant(): ScriptTarget {
    return 0;
}
export function ScriptTargetES5$constant(): ScriptTarget {
    return 1;
}
export function ScriptTargetES2015$constant(): ScriptTarget {
    return 2;
}
export function ScriptTargetES2016$constant(): ScriptTarget {
    return 3;
}
export function ScriptTargetES2017$constant(): ScriptTarget {
    return 4;
}
export function ScriptTargetES2018$constant(): ScriptTarget {
    return 5;
}
export function ScriptTargetES2019$constant(): ScriptTarget {
    return 6;
}
export function ScriptTargetES2020$constant(): ScriptTarget {
    return 7;
}
export function ScriptTargetES2021$constant(): ScriptTarget {
    return 8;
}
export function ScriptTargetES2022$constant(): ScriptTarget {
    return 9;
}
export function ScriptTargetES2023$constant(): ScriptTarget {
    return 10;
}
export function ScriptTargetES2024$constant(): ScriptTarget {
    return 11;
}
export function ScriptTargetES2025$constant(): ScriptTarget {
    return 12;
}
export function ScriptTargetESNext$constant(): ScriptTarget {
    return 99;
}
export function ScriptTargetLatest$constant(): ScriptTarget {
    return 99;
}
export function ScriptTargetLatestStandard$constant(): ScriptTarget {
    return 12;
}
export type JsxEmit = int32;
export function JsxEmitNone$constant(): JsxEmit {
    return 0;
}
export function JsxEmitPreserve$constant(): JsxEmit {
    return 1;
}
export function JsxEmitReactNative$constant(): JsxEmit {
    return 2;
}
export function JsxEmitReact$constant(): JsxEmit {
    return 3;
}
export function JsxEmitReactJSX$constant(): JsxEmit {
    return 4;
}
export function JsxEmitReactJSXDev$constant(): JsxEmit {
    return 5;
}
export function JsxEmit_String(j: JsxEmit): gostring {
    switch (j) {
        case JsxEmitNone$constant(): {
            const __gotots_argument_0 = new GoInterfaceAdapter("should not use zero value of JsxEmit");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            break;
        }
        case JsxEmitPreserve$constant(): {
            return "preserve";
            break;
        }
        case JsxEmitReactNative$constant(): {
            return "react-native";
            break;
        }
        case JsxEmitReact$constant(): {
            return "react";
            break;
        }
        case JsxEmitReactJSX$constant(): {
            return "react-jsx";
            break;
        }
        case JsxEmitReactJSXDev$constant(): {
            return "react-jsxdev";
            break;
        }
        default: {
            const __gotots_argument_1 = new GoInterfaceAdapter("unhandled case in JsxEmit.String");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
            break;
        }
    }
}
export function ModuleKind_String(i: ModuleKind): gostring {
    __gotots_control_target_0: {
        if (0 <= i && i <= 7) {
            return goStringSlice(_ModuleKind_name_0$string, $state._ModuleKind_index_0.get(i), $state._ModuleKind_index_0.get(i + 1));
        }
        else if (99 <= i && i <= 102) {
            i = i - 99;
            return goStringSlice(_ModuleKind_name_1$string, $state._ModuleKind_index_1.get(i), $state._ModuleKind_index_1.get(i + 1));
        }
        else if (199 <= i && i <= 200) {
            i = i - 199;
            return goStringSlice(_ModuleKind_name_2$string, $state._ModuleKind_index_2.get(i), $state._ModuleKind_index_2.get(i + 1));
        }
        else {
            return "ModuleKind(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
        }
    }
}
export function ScriptTarget_String(i: ScriptTarget): gostring {
    __gotots_control_target_1: {
        if (0 <= i && i <= 12) {
            return goStringSlice(_ScriptTarget_name_0$string, $state._ScriptTarget_index_0.get(i), $state._ScriptTarget_index_0.get(i + 1));
        }
        else if (99 <= i && i <= 100) {
            i = i - 99;
            return goStringSlice(_ScriptTarget_name_1$string, $state._ScriptTarget_index_1.get(i), $state._ScriptTarget_index_1.get(i + 1));
        }
        else {
            return "ScriptTarget(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
        }
    }
}
