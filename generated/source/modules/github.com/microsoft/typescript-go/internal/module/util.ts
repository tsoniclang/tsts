import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Version$Storage as Version__from_semver$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import type { ResolvedModule } from "./types.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitNone$constant as JsxEmitNone$constant__from_core, JsxEmitPreserve$constant as JsxEmitPreserve$constant__from_core, Tristate_DefaultIfUnknown as Tristate_DefaultIfUnknown__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/state.js";
import { TryParseVersionRange as TryParseVersionRange__from_semver, VersionRange as VersionRange__from_semver, Version as Version__from_semver } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import { ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, NormalizePath as NormalizePath__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { moveToNextDirectorySeparatorIfAvailable } from "./resolver.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export const InferredTypesContainingFile$string: gostring = "__inferred type names__.ts";
export function IsApplicableVersionedTypesKey(key: gostring): bool {
    if (!strings__from_gostdlib.HasPrefix(key, "types@")) {
        return false;
    }
    const __gotots_results_0 = TryParseVersionRange__from_semver(goStringSlice(key, 6));
    let range_ = __gotots_results_0[0];
    let ok = __gotots_results_0[1];
    if (!ok) {
        return false;
    }
    return VersionRange__from_semver.Test(range_, tsonicTypeScriptRuntime.projectLocation<Version__from_semver$Storage, Version__from_semver>(tsonicTypeScriptRuntime.propertyLocation($state, "typeScriptVersion"), ($go$storage: Version__from_semver$Storage): Version__from_semver => {
        return Version__from_semver.$fromStorage($go$storage);
    }, ($go$value: Version__from_semver): Version__from_semver$Storage => {
        return Version__from_semver.$storageOf($go$value);
    }));
}
export function ParseNodeModuleFromPath(resolved__shadow_1: gostring, isFolder: bool): gostring {
    let path = NormalizePath__from_tspath(resolved__shadow_1);
    let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(path, "/node_modules/")));
    if (idx === -1) {
        return "";
    }
    let indexAfterNodeModules = idx + 14;
    let indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterNodeModules, isFolder);
    if (goStringIndex(path, indexAfterNodeModules) === 64) {
        indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName, isFolder);
    }
    return goStringSlice(path, 0, indexAfterPackageName);
}
export function ParsePackageName(moduleName: gostring): [
    gostring,
    gostring
] {
    let packageName: gostring = "";
    let rest: gostring = "";
    let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(moduleName, "/")));
    if (moduleName.length > 0 && goStringIndex(moduleName, 0) === 64) {
        let offset = idx + 1;
        idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(moduleName, offset), "/")));
        if (idx !== -1) {
            idx += offset;
        }
    }
    if (idx === -1) {
        return [moduleName, ""];
    }
    return [goStringSlice(moduleName, 0, idx), goStringSlice(moduleName, idx + 1)];
}
export function MangleScopedPackageName(packageName: gostring): gostring {
    if (packageName.length > 0 && goStringIndex(packageName, 0) === 64) {
        let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(packageName, "/")));
        if (idx === -1) {
            return packageName;
        }
        return goStringSlice(packageName, 1, idx) + "__" + goStringSlice(packageName, idx + 1);
    }
    return packageName;
}
export function UnmangleScopedPackageName(packageName: gostring): gostring {
    const __gotots_results_2 = strings__from_gostdlib.Cut(packageName, "__");
    let before = __gotots_results_2[0];
    let after = __gotots_results_2[1];
    let ok = __gotots_results_2[2];
    if (ok) {
        return "@" + before + "/" + after;
    }
    return packageName;
}
export function GetTypesPackageName(packageName: gostring): gostring {
    return "@types/" + MangleScopedPackageName(packageName);
}
export function GetPackageNameFromTypesPackageName(mangledName: gostring): gostring {
    let withoutAtTypePrefix = strings__from_gostdlib.TrimPrefix(mangledName, "@types/");
    if (withoutAtTypePrefix !== mangledName) {
        return UnmangleScopedPackageName(withoutAtTypePrefix);
    }
    return mangledName;
}
export function ComparePatternKeys(a: gostring, b: gostring): int {
    let aPatternIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(a, "*")));
    let bPatternIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(b, "*")));
    let baseLenA = a.length;
    if (aPatternIndex !== -1) {
        baseLenA = aPatternIndex + 1;
    }
    let baseLenB = b.length;
    if (bPatternIndex !== -1) {
        baseLenB = bPatternIndex + 1;
    }
    if (baseLenA > baseLenB) {
        return -1;
    }
    if (baseLenB > baseLenA) {
        return 1;
    }
    if (aPatternIndex === -1) {
        return 1;
    }
    if (bPatternIndex === -1) {
        return -1;
    }
    if (a.length > b.length) {
        return -1;
    }
    if (b.length > a.length) {
        return 1;
    }
    return 0;
}
export function GetResolutionDiagnostic(options: {
    value: CompilerOptions__from_core;
} | undefined, resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    let needJsx: (() => {
        value: Message__from_diagnostics;
    } | undefined) | undefined = (): {
        value: Message__from_diagnostics;
    } | undefined => {
        if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitNone$constant__from_core())) {
            return void 0;
        }
        return $state__diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set;
    };
    let needAllowJs: (() => {
        value: Message__from_diagnostics;
    } | undefined) | undefined = (): {
        value: Message__from_diagnostics;
    } | undefined => {
        if (CompilerOptions__from_core.GetAllowJS(options) || !Tristate_IsTrue__from_core(Tristate_DefaultIfUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitAny, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Strict))) {
            return void 0;
        }
        return $state__diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
    };
    let needResolveJsonModule: (() => {
        value: Message__from_diagnostics;
    } | undefined) | undefined = (): {
        value: Message__from_diagnostics;
    } | undefined => {
        if (CompilerOptions__from_core.GetResolveJsonModule(options)) {
            return void 0;
        }
        return $state__diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
    };
    let needAllowArbitraryExtensions: (() => {
        value: Message__from_diagnostics;
    } | undefined) | undefined = (): {
        value: Message__from_diagnostics;
    } | undefined => {
        if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowArbitraryExtensions)) {
            return void 0;
        }
        return $state__diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
    };
    switch (((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.Extension) {
        case ExtensionTs$string__from_tspath:
        case ExtensionDts$string__from_tspath:
        case ExtensionMts$string__from_tspath:
        case ExtensionDmts$string__from_tspath:
        case ExtensionCts$string__from_tspath:
        case ExtensionDcts$string__from_tspath: {
            return void 0;
            break;
        }
        case ExtensionTsx$string__from_tspath: {
            const __gotots_callee_0 = needJsx;
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
            break;
        }
        case ExtensionJsx$string__from_tspath: {
            {
                const __gotots_callee_1 = needJsx;
                let message: {
                    value: Message__from_diagnostics;
                } | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                if (!(message === undefined)) {
                    return message;
                }
            }
            const __gotots_callee_2 = needAllowJs;
            return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            break;
        }
        case ExtensionJs$string__from_tspath:
        case ExtensionMjs$string__from_tspath:
        case ExtensionCjs$string__from_tspath: {
            const __gotots_callee_3 = needAllowJs;
            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
            break;
        }
        case ExtensionJson$string__from_tspath: {
            const __gotots_callee_4 = needResolveJsonModule;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
            break;
        }
        default: {
            const __gotots_callee_5 = needAllowArbitraryExtensions;
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
            break;
        }
    }
}
export function TryGetJSExtensionForFile(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    let ext = TryGetExtensionFromPath__from_tspath(fileName);
    switch (ext) {
        case ExtensionTs$string__from_tspath:
        case ExtensionDts$string__from_tspath: {
            return ExtensionJs$string__from_tspath;
            break;
        }
        case ExtensionTsx$string__from_tspath: {
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitPreserve$constant__from_core()) {
                return ExtensionJsx$string__from_tspath;
            }
            return ExtensionJs$string__from_tspath;
            break;
        }
        case ExtensionJs$string__from_tspath:
        case ExtensionJsx$string__from_tspath:
        case ExtensionJson$string__from_tspath: {
            return ext;
            break;
        }
        case ExtensionDmts$string__from_tspath:
        case ExtensionMts$string__from_tspath:
        case ExtensionMjs$string__from_tspath: {
            return ExtensionMjs$string__from_tspath;
            break;
        }
        case ExtensionDcts$string__from_tspath:
        case ExtensionCts$string__from_tspath:
        case ExtensionCjs$string__from_tspath: {
            return ExtensionCjs$string__from_tspath;
            break;
        }
        default: {
            return "";
            break;
        }
    }
}
