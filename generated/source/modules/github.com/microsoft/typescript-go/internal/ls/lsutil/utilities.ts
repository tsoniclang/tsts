import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { UserPreferences } from "./userpreferences.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import { IsContextualKeyword as IsContextualKeyword__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, Symbol as Symbol__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, Visitor as Visitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $state as $state__core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, IsIdentifierPart as IsIdentifierPart__from_scanner, IsIdentifierStart as IsIdentifierStart__from_scanner, SkipTrivia as SkipTrivia__from_scanner, StringToToken as StringToToken__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { StripQuotes as StripQuotes__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GetBaseFileName as GetBaseFileName__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { SyntaxRequiresTrailingCommaOrSemicolonOrASI, SyntaxRequiresTrailingSemicolonOrASI } from "./asi.js";
import { GetLastToken } from "./children.js";
import { QuotePreference, QuotePreferenceDouble$constant, QuotePreferenceSingle$constant } from "./userpreferences.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringEncodeRune } from "@gotots/runtime/string.js";
export function ProbablyUsesSemicolons(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let withSemicolon = 0;
    let withoutSemicolon = 0;
    let nStatementsToObserve = 5;
    let visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined;
    visit = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return false;
        }
        if (SyntaxRequiresTrailingSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            let lastToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastToken(node, file);
            if (!(lastToken === undefined) && Node__from_ast.$storageOf(((lastToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast()) {
                withSemicolon++;
            }
            else {
                withoutSemicolon++;
            }
        }
        else if (SyntaxRequiresTrailingCommaOrSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            let lastToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastToken(node, file);
            if (!(lastToken === undefined) && Node__from_ast.$storageOf(((lastToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast()) {
                withSemicolon++;
            }
            else if (!(lastToken === undefined) && !(Node__from_ast.$storageOf(((lastToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast())) {
                let lastTokenLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), GetStartOfNode__from_astnav(lastToken, file, false));
                let nextTokenLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), SkipTrivia__from_scanner(SourceFile__from_ast.Text(file), Node__from_ast.End(lastToken)));
                if (lastTokenLine !== nextTokenLine) {
                    withoutSemicolon++;
                }
            }
        }
        if (withSemicolon + withoutSemicolon >= nStatementsToObserve) {
            return true;
        }
        return Node__from_ast.ForEachChild(node, new Visitor__from_ast(visit));
    };
    SourceFile__from_ast.ForEachChild(file, new Visitor__from_ast(visit));
    if (withSemicolon === 0 && withoutSemicolon <= 1) {
        return true;
    }
    if (withoutSemicolon === 0) {
        return true;
    }
    return withSemicolon * nStatementsToObserve > withoutSemicolon;
}
export function ShouldUseUriStyleNodeCoreModules(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, program: {
    value: Program__from_compiler;
} | undefined): Tristate__from_core {
    const __gotots_range_0 = SourceFile__from_ast.Imports(file);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        const __gotots_callee_0 = $state__core.NodeCoreModules;
        const __gotots_map_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_map_1 = Node__from_ast.Text(node);
        if (__gotots_map_0.lookup(__gotots_map_1) && !$state__core.ExclusivelyPrefixedNodeCoreModules.lookup(Node__from_ast.Text(node))) {
            if (strings__from_gostdlib.HasPrefix(Node__from_ast.Text(node), "node:")) {
                return TSTrue$constant__from_core();
            }
            else {
                return TSFalse$constant__from_core();
            }
        }
    }
    return Program__from_compiler.UsesUriStyleNodeCoreModules(program);
}
export function QuotePreferenceFromString(str: tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined): QuotePreference {
    if (!(((void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
        (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
            StringLiteral__from_ast.$storageOf(((str ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags & TokenFlagsSingleQuote$constant__from_ast()) === 0)) {
        return QuotePreferenceSingle$constant();
    }
    return QuotePreferenceDouble$constant();
}
export function GetQuotePreference(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences): QuotePreference {
    if (!(preferences.QuotePreference.$value ===
        ((void QuotePreference,
            "") as string)) && !(preferences.QuotePreference.$value ===
        ((void QuotePreference,
            "auto") as string))) {
        if (preferences.QuotePreference.$value ===
            ((void QuotePreference,
                "single") as string)) {
            return QuotePreferenceSingle$constant();
        }
        return QuotePreferenceDouble$constant();
    }
    let firstModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(SourceFile__from_ast.Imports(sourceFile), (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return IsStringLiteral__from_ast(n) && !NodeIsSynthesized__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    });
    if (!(firstModuleSpecifier === undefined)) {
        return QuotePreferenceFromString(Node__from_ast.AsStringLiteral(firstModuleSpecifier));
    }
    return QuotePreferenceDouble$constant();
}
export function ModuleSymbolToValidIdentifier(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, forceCapitalize: bool): gostring {
    return ModuleSpecifierToValidIdentifier(StripQuotes__from_stringutil(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), forceCapitalize);
}
export function ModuleSpecifierToValidIdentifier(moduleSpecifier: gostring, forceCapitalize: bool): gostring {
    let baseName = GetBaseFileName__from_tspath(strings__from_gostdlib.TrimSuffix(RemoveFileExtension__from_tspath(moduleSpecifier), "/index"));
    let res = RuntimeSlice.literal<int32>([]);
    let lastCharWasValid = true;
    const __gotots_conversion_0 = baseName;
    let __gotots_conversion_1 = RuntimeSlice.make<int32>(0, __gotots_conversion_0.length, 0);
    let __gotots_conversion_2 = 0;
    while (__gotots_conversion_2 < __gotots_conversion_0.length) {
        const __gotots_conversion_3 = goStringDecodeRune(__gotots_conversion_0, __gotots_conversion_2);
        __gotots_conversion_1 = __gotots_conversion_1.append(0, [__gotots_conversion_3[0]]);
        __gotots_conversion_2 += __gotots_conversion_3[1];
    }
    let baseNameRunes = __gotots_conversion_1;
    if (baseNameRunes.length > 0 && IsIdentifierStart__from_scanner(baseNameRunes.get(0))) {
        if (forceCapitalize) {
            res = res.append(0, [unicode__from_gostdlib.ToUpper(baseNameRunes.get(0))]);
        }
        else {
            res = res.append(0, [baseNameRunes.get(0)]);
        }
    }
    else {
        lastCharWasValid = false;
    }
    for (let i = 1; i < baseNameRunes.length; i++) {
        let isValid = IsIdentifierPart__from_scanner(baseNameRunes.get(i));
        if (isValid) {
            if (!lastCharWasValid) {
                res = res.append(0, [unicode__from_gostdlib.ToUpper(baseNameRunes.get(i))]);
            }
            else {
                res = res.append(0, [baseNameRunes.get(i)]);
            }
        }
        lastCharWasValid = isValid;
    }
    const __gotots_conversion_4 = res;
    let __gotots_conversion_5 = "";
    for (let __gotots_conversion_6 = 0; __gotots_conversion_6 < __gotots_conversion_4.length; __gotots_conversion_6++) {
        __gotots_conversion_5 += goStringEncodeRune(__gotots_conversion_4.get(__gotots_conversion_6));
    }
    let resString = __gotots_conversion_5;
    if (resString !== "" && !IsNonContextualKeyword(StringToToken__from_scanner(resString))) {
        return resString;
    }
    return "_" + resString;
}
export function IsNonContextualKeyword(token: Kind__from_ast): bool {
    return IsKeywordKind__from_ast(token) && !IsContextualKeyword__from_ast(token);
}
