import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as url__from_gostdlib from "@gotots/gostdlib/net/url.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class NameValidationResult {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function NameOk$constant(): NameValidationResult {
    return new NameValidationResult(0);
}
export function EmptyName$constant(): NameValidationResult {
    return new NameValidationResult(1);
}
export function NameTooLong$constant(): NameValidationResult {
    return new NameValidationResult(2);
}
export function NameStartsWithDot$constant(): NameValidationResult {
    return new NameValidationResult(3);
}
export function NameStartsWithUnderscore$constant(): NameValidationResult {
    return new NameValidationResult(4);
}
export function NameContainsNonURISafeCharacters$constant(): NameValidationResult {
    return new NameValidationResult(5);
}
export const maxPackageNameLength$int: int = 214;
export function ValidatePackageName(packageName: gostring): [
    NameValidationResult,
    gostring,
    bool
] {
    let result: NameValidationResult = new NameValidationResult(0);
    let name: gostring = "";
    let isScopeName: bool = false;
    return validatePackageNameWorker(packageName, true);
}
export function validatePackageNameWorker(packageName: gostring, supportScopedPackage: bool): [
    NameValidationResult,
    gostring,
    bool
] {
    let result: NameValidationResult = new NameValidationResult(0);
    let name: gostring = "";
    let isScopeName: bool = false;
    let packageNameLen = packageName.length;
    if (packageNameLen === 0) {
        return [EmptyName$constant(), "", false];
    }
    if (packageNameLen > maxPackageNameLength$int) {
        return [NameTooLong$constant(), "", false];
    }
    const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(packageName);
    const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
        int32,
        int
    ];
    let firstChar = __gotots_results_1[0];
    if (firstChar === 46) {
        return [NameStartsWithDot$constant(), "", false];
    }
    if (firstChar === 95) {
        return [NameStartsWithUnderscore$constant(), "", false];
    }
    if (supportScopedPackage) {
        {
            const __gotots_results_3 = strings__from_gostdlib.CutPrefix(packageName, "@");
            let withoutScope = __gotots_results_3[0];
            let found = __gotots_results_3[1];
            if (found) {
                const __gotots_results_5 = strings__from_gostdlib.Cut(withoutScope, "/");
                let scope = __gotots_results_5[0];
                let scopedPackageName = __gotots_results_5[1];
                let found__shadow_1 = __gotots_results_5[2];
                if (found__shadow_1 && scope.length > 0 && scopedPackageName.length > 0 && !strings__from_gostdlib.Contains(scopedPackageName, "/")) {
                    const __gotots_results_6 = validatePackageNameWorker(scope, false);
                    let scopeResult = __gotots_results_6[0];
                    if (!(scopeResult.$value === NameOk$constant().$value)) {
                        return [scopeResult, scope, true];
                    }
                    const __gotots_results_7 = validatePackageNameWorker(scopedPackageName, false);
                    let packageResult = __gotots_results_7[0];
                    if (!(packageResult.$value === NameOk$constant().$value)) {
                        return [packageResult, scopedPackageName, false];
                    }
                    return [NameOk$constant(), "", false];
                }
            }
        }
    }
    if (url__from_gostdlib.QueryEscape(packageName) !== packageName) {
        return [NameContainsNonURISafeCharacters$constant(), "", false];
    }
    return [NameOk$constant(), "", false];
}
export function renderPackageNameValidationFailure(typing: gostring, result: NameValidationResult, name: gostring, isScopeName: bool): gostring {
    let kind = "";
    if (isScopeName) {
        kind = "Scope";
    }
    else {
        kind = "Package";
    }
    if (name === "") {
        name = typing;
    }
    switch (result.$value) {
        case 1: {
            return fmt__from_gostdlib.Sprintf("'%s':: %s name '%s' cannot be empty", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(kind), new GoInterfaceAdapter(name)]));
            break;
        }
        case 2: {
            return fmt__from_gostdlib.Sprintf("'%s':: %s name '%s' should be less than %d characters", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(kind), new GoInterfaceAdapter(name), new $goInterfaceAdapter$int(maxPackageNameLength$int)]));
            break;
        }
        case 3: {
            return fmt__from_gostdlib.Sprintf("'%s':: %s name '%s' cannot start with '.'", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(kind), new GoInterfaceAdapter(name)]));
            break;
        }
        case 4: {
            return fmt__from_gostdlib.Sprintf("'%s':: %s name '%s' cannot start with '_'", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(kind), new GoInterfaceAdapter(name)]));
            break;
        }
        case 5: {
            return fmt__from_gostdlib.Sprintf("'%s':: %s name '%s' contains non URI safe characters", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(typing), new GoInterfaceAdapter(kind), new GoInterfaceAdapter(name)]));
            break;
        }
        case 0: {
            const __gotots_argument_0 = new GoInterfaceAdapter("Unexpected Ok result");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            break;
        }
        default: {
            const __gotots_argument_1 = new GoInterfaceAdapter("Unknown package name validation result");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
            break;
        }
    }
}
