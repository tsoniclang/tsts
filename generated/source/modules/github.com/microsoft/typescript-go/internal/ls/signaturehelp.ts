import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NewExpression as NewExpression__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, SpreadElement as SpreadElement__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TemplateExpression as TemplateExpression__from_ast, TemplateSpan as TemplateSpan__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ElementFlags as ElementFlags__from_checker, Signature as Signature__from_checker, TypePredicate as TypePredicate__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto, VSClassifiedTextRun as VSClassifiedTextRun__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { PossibleTypeArgumentInfo } from "./utilities.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { BinaryExpression as BinaryExpression__from_ast, CallExpression as CallExpression__from_ast, CanHaveSymbol as CanHaveSymbol__from_ast, ExpressionBase as ExpressionBase__from_ast, FindAncestor as FindAncestor__from_ast, GetInvokedExpression as GetInvokedExpression__from_ast, Identifier as Identifier__from_ast, IndexOfNode as IndexOfNode__from_ast, InternalSymbolNameType$string as InternalSymbolNameType$string__from_ast, IsArrayBindingPattern as IsArrayBindingPattern__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBlock as IsBlock__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCallOrNewExpression as IsCallOrNewExpression__from_ast, IsFunctionTypeNode as IsFunctionTypeNode__from_ast, IsIdentifier as IsIdentifier__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsNewExpression as IsNewExpression__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsTemplateLiteralToken as IsTemplateLiteralToken__from_ast, IsTemplateSpan as IsTemplateSpan__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindPrecedingTokenEx as FindPrecedingTokenEx__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, ElementFlagsRequired$constant as ElementFlagsRequired$constant__from_checker, GetResolvedSignatureForSignatureHelp as GetResolvedSignatureForSignatureHelp__from_checker, IsTupleType as IsTupleType__from_checker, NewNodeBuilder as NewNodeBuilder__from_checker, NodeBuilder as NodeBuilder__from_checker, SignatureKindCall$constant as SignatureKindCall$constant__from_checker, TupleType as TupleType__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { NewLineKindLF$constant as NewLineKindLF$constant__from_core, NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { GetClientCapabilities as GetClientCapabilities__from_lsproto, ParameterInformation as ParameterInformation__from_lsproto, ResolvedClientSignatureInformationOptions as ResolvedClientSignatureInformationOptions__from_lsproto, SignatureHelp as SignatureHelp__from_lsproto, SignatureInformation as SignatureInformation__from_lsproto, StringOrTuple as StringOrTuple__from_lsproto, UintegerOrNull as UintegerOrNull__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { InternalFlagsNone$constant as InternalFlagsNone$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { NewEmitContext as NewEmitContext__from_printer, NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, Scanner as Scanner__from_scanner, SkipTrivia as SkipTrivia__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { FindIndex$Named_checker$ElementFlags } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindIndex.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_ls$displayPartsWriter, $goInterfaceAdapter$PointerTo_Named_ls$invocation, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { displayPartsWriter, newDisplayPartsWriter } from "./displaypartswriter.js";
import { RangeContainsRange, findContainingList, getChildrenFromNonJSDocNode, getPossibleGenericSignatures, getPossibleTypeArgumentsInfo, isInsideTemplateLiteral, isNoSubstitutionTemplateLiteral, isTaggedTemplateExpression, isTemplateHead, isTemplateTail } from "./utilities.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export class callInvocation {
    declare private readonly $goType: void;
    public constructor(public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: callInvocation): callInvocation {
        return new callInvocation($source.node);
    }
    static $equal($left: callInvocation, $right: callInvocation): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.node, $right.node);
    }
    static $hash($source: callInvocation): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.node));
        return $hash;
    }
    declare private readonly then?: never;
}
export class typeArgsInvocation {
    declare private readonly $goType: void;
    public constructor(public called: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined) {
    }
    static $copy($source: typeArgsInvocation): typeArgsInvocation {
        return new typeArgsInvocation($source.called);
    }
    static $equal($left: typeArgsInvocation, $right: typeArgsInvocation): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.called, $right.called);
    }
    static $hash($source: typeArgsInvocation): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.called));
        return $hash;
    }
    declare private readonly then?: never;
}
export class contextualInvocation {
    declare private readonly $goType: void;
    public constructor(public signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
    }
    static $copy($source: contextualInvocation): contextualInvocation {
        return new contextualInvocation($source.signature, $source.node, $source.__go_symbol);
    }
    static $equal($left: contextualInvocation, $right: contextualInvocation): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.signature, $right.signature)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.node, $right.node) &&
            tsonicTypeScriptRuntime.sameLocation($left.__go_symbol, $right.__go_symbol);
    }
    static $hash($source: contextualInvocation): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.signature));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.node));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.__go_symbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export class invocation {
    declare private readonly $goType: void;
    public constructor(public callInvocation: {
        value: callInvocation;
    } | undefined, public typeArgsInvocation: {
        value: typeArgsInvocation;
    } | undefined, public contextualInvocation: {
        value: contextualInvocation;
    } | undefined) {
    }
    static $copy($source: invocation): invocation {
        return new invocation($source.callInvocation, $source.typeArgsInvocation, $source.contextualInvocation);
    }
    static $equal($left: invocation, $right: invocation): bool {
        return $left.callInvocation
            ===
                $right.callInvocation
            &&
                $left.typeArgsInvocation
                    ===
                        $right.typeArgsInvocation &&
            $left.contextualInvocation
                ===
                    $right.contextualInvocation;
    }
    static $hash($source: invocation): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.callInvocation));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.typeArgsInvocation));
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.contextualInvocation));
        return $hash;
    }
    declare private readonly then?: never;
}
export function createTypeHelpItems(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, argumentInfo: argumentListInfo | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): {
    value: SignatureHelp__from_lsproto;
} | undefined {
    let typeParameters = Checker__from_checker.GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(c, __go_symbol);
    if (typeParameters.isNil()) {
        return void 0;
    }
    let item = getTypeHelpItem(__go_symbol, typeParameters, getEnclosingDeclarationFromInvocation((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation), sourceFile, c);
    let caps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto> | undefined = GetClientCapabilities__from_lsproto(ctx);
    let sigInfoCaps = ResolvedClientSignatureInformationOptions__from_lsproto.$copy(((caps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.SignatureHelp.SignatureInformation);
    let supportsPerSignatureActiveParam = sigInfoCaps.ActiveParameterSupport;
    let parameters = RuntimeSlice.make<{
        value: ParameterInformation__from_lsproto;
    } | undefined>(signatureInformation.$storageOf(item).Parameters.length, null, void 0);
    const parameters$location = tsonicTypeScriptRuntime.boundLocation({}, () => parameters, parameters$next => parameters = parameters$next);
    const __gotots_range_1 = signatureInformation.$storageOf(item).Parameters;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = signatureHelpParameter.$copy(signatureHelpParameter.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
        let i = __gotots_range_value_1;
        let param = __gotots_range_value_2;
        parameters.set(i, signatureHelpParameter.$storageOf(param).parameterInfo);
    }
    let sigInfo: {
        value: SignatureInformation__from_lsproto;
    } | undefined = { value: new SignatureInformation__from_lsproto(signatureInformation.$storageOf(item).Label, void 0, parameters$location, void 0, void 0) };
    if (supportsPerSignatureActiveParam && signatureInformation.$storageOf(item).Parameters.length > 0) {
        (sigInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ActiveParameter =
            { value: new UintegerOrNull__from_lsproto(tsonicTypeScriptRuntime.location<uint32>((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex >>> 0)) };
    }
    let help: {
        value: SignatureHelp__from_lsproto;
    } | undefined = { value: new SignatureHelp__from_lsproto(RuntimeSlice.literal<{
            value: SignatureInformation__from_lsproto;
        } | undefined>([sigInfo]), tsonicTypeScriptRuntime.location<uint32>(0), void 0) };
    if (!supportsPerSignatureActiveParam && signatureInformation.$storageOf(item).Parameters.length > 0) {
        (help ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ActiveParameter =
            { value: new UintegerOrNull__from_lsproto(tsonicTypeScriptRuntime.location<uint32>((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex >>> 0)) };
    }
    return help;
}
export function getTypeHelpItem(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeParameter: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): signatureInformation {
    let printer__shadow_1: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, NewLineKindLF$constant__from_core(), false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), void 0);
    const __gotots_slice_build_0 = goSliceAllocate<signatureHelpParameter$Storage>(typeParameter.length, null);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, signatureHelpParameter.$storageOf(signatureHelpParameter.$zero()));
    }
    let parameters = __gotots_slice_build_0;
    const __gotots_range_2 = typeParameter;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_index_2;
        const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
        let i = __gotots_range_value_3;
        let typeParam: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_4;
        parameters.set(i, signatureHelpParameter.$storageOf(createSignatureHelpParameterForTypeParameter(typeParam, sourceFile, enclosingDeclaration, c, printer__shadow_1)));
    }
    let displayParts = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.WriteString(displayParts, Checker__from_checker.SymbolToString(c, __go_symbol));
    if (parameters.length !== 0) {
        strings__from_gostdlib.Builder.WriteString(displayParts, TokenToString__from_scanner(KindLessThanToken$constant__from_ast()));
        const __gotots_range_3 = parameters;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_5 = __gotots_range_index_3;
            const __gotots_range_value_6 = signatureHelpParameter.$copy(signatureHelpParameter.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
            let i = __gotots_range_value_5;
            let typeParameter__shadow_1 = __gotots_range_value_6;
            if (i > 0) {
                strings__from_gostdlib.Builder.WriteString(displayParts, ", ");
            }
            strings__from_gostdlib.Builder.WriteString(displayParts, (((signatureHelpParameter.$storageOf(typeParameter__shadow_1).parameterInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label.String ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value);
        }
        strings__from_gostdlib.Builder.WriteString(displayParts, TokenToString__from_scanner(KindGreaterThanToken$constant__from_ast()));
    }
    return signatureInformation.$fromStorage({
        Label: strings__from_gostdlib.Builder.String(displayParts),
        Documentation: void 0,
        Parameters: parameters,
        IsVariadic: false,
        ColorizedRuns: RuntimeSlice.nil<{
            value: VSClassifiedTextRun__from_lsproto;
        } | undefined>()
    });
}
export function returnTypeToDisplayParts(candidateSignature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, vsCapability: bool): {
    value: displayPartsWriter;
} | undefined {
    let dpw: {
        value: displayPartsWriter;
    } | undefined = newDisplayPartsWriter(vsCapability);
    displayPartsWriter.WritePunctuation(dpw, ": ");
    let predicate: {
        value: TypePredicate__from_checker;
    } | undefined = Checker__from_checker.GetTypePredicateOfSignature(c, candidateSignature);
    if (!(predicate === undefined)) {
        displayPartsWriter.Write(dpw, Checker__from_checker.TypePredicateToString(c, predicate));
    }
    else {
        let returnType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetReturnTypeOfSignature(c, candidateSignature);
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNode(c, returnType, enclosingDeclaration, signatureHelpNodeBuilderFlags$constant(), GoMap.nil());
        if (!(typeNode === undefined)) {
            let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, NewLineKindLF$constant__from_core(), false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), NewEmitContext__from_printer());
            let tempDpw: {
                value: displayPartsWriter;
            } | undefined = newDisplayPartsWriter(vsCapability);
            Printer__from_printer.Write(p, typeNode, sourceFile, new $goInterfaceAdapter$PointerTo_Named_ls$displayPartsWriter(tempDpw), void 0);
            displayPartsWriter.WriteFrom(dpw, tempDpw);
        }
        else {
            displayPartsWriter.Write(dpw, Checker__from_checker.TypeToString(c, returnType));
        }
    }
    return dpw;
}
export function signatureHelpNodeBuilderFlags$constant(): Flags__from_nodebuilder {
    return 70246400;
}
export function createSignatureHelpParameterForTypeParameter(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, p: Printer__from_printer | undefined): signatureHelpParameter {
    let display = Printer__from_printer.Emit(p, NodeBuilder__from_checker.TypeParameterToDeclaration(NewNodeBuilder__from_checker(c, NewEmitContext__from_printer()), t, enclosingDeclaration, signatureHelpNodeBuilderFlags$constant(), InternalFlagsNone$constant__from_nodebuilder(), void 0), sourceFile);
    const display$location = tsonicTypeScriptRuntime.boundLocation({}, () => display, display$next => display = display$next);
    return signatureHelpParameter.$fromStorage({
        parameterInfo: { value: new ParameterInformation__from_lsproto(new StringOrTuple__from_lsproto(display$location, void 0), void 0) },
        isRest: false,
        isOptional: false
    });
}
export type signatureInformation$Storage = {
    Label: gostring;
    Documentation: tsonicTypeScriptRuntime.Location<gostring> | undefined;
    Parameters: RuntimeSlice<signatureHelpParameter$Storage>;
    IsVariadic: bool;
    ColorizedRuns: RuntimeSlice<{
        value: VSClassifiedTextRun__from_lsproto;
    } | undefined>;
};
export class signatureInformation {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: signatureInformation$Storage) {
    }
    public static $storageOf($source: signatureInformation): signatureInformation$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: signatureInformation$Storage): signatureInformation {
        return new signatureInformation($source);
    }
    public get Label(): gostring {
        return this.$storage.Label;
    }
    public set Label($value: gostring) {
        this.$storage.Label = $value;
    }
    public get Documentation(): tsonicTypeScriptRuntime.Location<gostring> | undefined {
        return this.$storage.Documentation;
    }
    public set Documentation($value: tsonicTypeScriptRuntime.Location<gostring> | undefined) {
        this.$storage.Documentation = $value;
    }
    public get Parameters(): RuntimeSlice<signatureHelpParameter$Storage> {
        return this.$storage.Parameters;
    }
    public set Parameters($value: RuntimeSlice<signatureHelpParameter$Storage>) {
        this.$storage.Parameters = $value;
    }
    public get IsVariadic(): bool {
        return this.$storage.IsVariadic;
    }
    public set IsVariadic($value: bool) {
        this.$storage.IsVariadic = $value;
    }
    public get ColorizedRuns(): RuntimeSlice<{
        value: VSClassifiedTextRun__from_lsproto;
    } | undefined> {
        return this.$storage.ColorizedRuns;
    }
    public set ColorizedRuns($value: RuntimeSlice<{
        value: VSClassifiedTextRun__from_lsproto;
    } | undefined>) {
        this.$storage.ColorizedRuns = $value;
    }
    static $zero(): signatureInformation {
        return new signatureInformation({
            Label: "",
            Documentation: void 0,
            Parameters: RuntimeSlice.nil<signatureHelpParameter$Storage>(),
            IsVariadic: false,
            ColorizedRuns: RuntimeSlice.nil<{
                value: VSClassifiedTextRun__from_lsproto;
            } | undefined>()
        });
    }
    static $copy($source: signatureInformation): signatureInformation {
        return new signatureInformation({
            Label: $source.$storage.Label,
            Documentation: $source.$storage.Documentation,
            Parameters: $source.$storage.Parameters,
            IsVariadic: $source.$storage.IsVariadic,
            ColorizedRuns: $source.$storage.ColorizedRuns
        });
    }
    declare private readonly then?: never;
}
export class signatureHelpItemInfo {
    declare private readonly $goType: void;
    public constructor(public isVariadic: bool, public parameters: RuntimeSlice<signatureHelpParameter$Storage>, public writer: {
        value: displayPartsWriter;
    } | undefined) {
    }
    declare private readonly then?: never;
}
export type signatureHelpParameter$Storage = {
    parameterInfo: {
        value: ParameterInformation__from_lsproto;
    } | undefined;
    isRest: bool;
    isOptional: bool;
};
export class signatureHelpParameter implements GoContainerStoredValue<signatureHelpParameter$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: signatureHelpParameter$Storage) {
    }
    public static $storageOf($source: signatureHelpParameter): signatureHelpParameter$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: signatureHelpParameter$Storage): signatureHelpParameter {
        return new signatureHelpParameter($source);
    }
    public get parameterInfo(): {
        value: ParameterInformation__from_lsproto;
    } | undefined {
        return this.$storage.parameterInfo;
    }
    public set parameterInfo($value: {
        value: ParameterInformation__from_lsproto;
    } | undefined) {
        this.$storage.parameterInfo = $value;
    }
    public get isRest(): bool {
        return this.$storage.isRest;
    }
    public set isRest($value: bool) {
        this.$storage.isRest = $value;
    }
    public get isOptional(): bool {
        return this.$storage.isOptional;
    }
    public set isOptional($value: bool) {
        this.$storage.isOptional = $value;
    }
    declare readonly [$goContainerStorageType]: signatureHelpParameter$Storage;
    static $zero(): signatureHelpParameter {
        return new signatureHelpParameter({
            parameterInfo: void 0,
            isRest: false,
            isOptional: false
        });
    }
    static $copy($source: signatureHelpParameter): signatureHelpParameter {
        return new signatureHelpParameter({
            parameterInfo: $source.$storage.parameterInfo,
            isRest: $source.$storage.isRest,
            isOptional: $source.$storage.isOptional
        });
    }
    declare private readonly then?: never;
}
export function getEnclosingDeclarationFromInvocation(invocation__shadow_1: {
    value: invocation;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!((invocation__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation === undefined)) {
        return ((invocation__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node;
    }
    else if (!((invocation__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArgsInvocation === undefined)) {
        const __gotots_store_4 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf(PrimaryExpressionBase__from_ast.$fromStorage(Identifier__from_ast.$storageOf(((((invocation__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArgsInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
    }
    else {
        return ((invocation__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextualInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node;
    }
}
export function getExpressionFromInvocation(argumentInfo: argumentListInfo | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!(((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation === undefined)) {
        return GetInvokedExpression__from_ast((((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node);
    }
    const __gotots_store_5 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf(PrimaryExpressionBase__from_ast.$fromStorage(Identifier__from_ast.$storageOf((((((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArgsInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
    return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    }));
}
export class candidateInfo {
    declare private readonly $goType: void;
    public constructor(public candidates: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, public resolvedSignature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) {
    }
    declare private readonly then?: never;
}
export class CandidateOrTypeInfo {
    declare private readonly $goType: void;
    public constructor(public candidateInfo: candidateInfo | undefined, public typeInfo: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function getCandidateOrTypeInfo(info: argumentListInfo | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, startingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, onlyUseSyntacticOwners: bool): CandidateOrTypeInfo | undefined {
    if (!(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation === undefined)) {
        if (onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node, sourceFile)) {
            return void 0;
        }
        const __gotots_results_0 = GetResolvedSignatureForSignatureHelp__from_checker((((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount, c);
        let resolvedSignature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_0[0];
        let candidates = __gotots_results_0[1];
        if (candidates.length === 0) {
            return void 0;
        }
        return new CandidateOrTypeInfo(new candidateInfo(candidates, resolvedSignature), void 0);
    }
    if (!(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArgsInvocation === undefined)) {
        const __gotots_store_3 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf(PrimaryExpressionBase__from_ast.$fromStorage(Identifier__from_ast.$storageOf((((((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArgsInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        let called: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = called;
        if (IsIdentifier__from_ast(called)) {
            container = Node__from_ast.$storageOf(((called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        if (onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, container)) {
            return void 0;
        }
        let candidates = getPossibleGenericSignatures(called, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount, c);
        if (candidates.length !== 0) {
            return new CandidateOrTypeInfo(new candidateInfo(candidates, candidates.get(0)), void 0);
        }
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, called);
            if (!(__go_symbol === undefined)) {
                return new CandidateOrTypeInfo(void 0, __go_symbol);
            }
        }
        return void 0;
    }
    if (!(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextualInvocation === undefined)) {
        return new CandidateOrTypeInfo(new candidateInfo(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>([(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextualInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature]), (((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextualInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature), void 0);
    }
    AssertNever__from_debug(new $goInterfaceAdapter$PointerTo_Named_ls$invocation((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation), RuntimeSlice.nil<GoInterface | undefined>());
    return void 0;
}
export function isSyntacticOwner(startingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (!IsCallOrNewExpression__from_ast(node)) {
        return false;
    }
    let invocationChildren = getChildrenFromNonJSDocNode(node, sourceFile);
    switch (Node__from_ast.$storageOf(((startingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindOpenParenToken$constant__from_ast():
        case KindCommaToken$constant__from_ast(): {
            return Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(invocationChildren, startingToken);
            break;
        }
        case KindLessThanToken$constant__from_ast(): {
            return containsPrecedingToken(startingToken, sourceFile, Node__from_ast.Expression(node));
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function containsPrecedingToken(startingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let pos = Node__from_ast.Pos(startingToken);
    let currentParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((startingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    for (; !(currentParent === undefined);) {
        let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingTokenEx__from_astnav(sourceFile, pos, currentParent, true);
        if (!(precedingToken === undefined)) {
            return RangeContainsRange(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        currentParent = Node__from_ast.$storageOf(((currentParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return false;
}
export function getContainingArgumentInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, isManuallyInvoked: bool, position__shadow_1: int): argumentListInfo | undefined {
    let firstArgumentInfo: argumentListInfo | undefined = void 0;
    for (let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node; !IsSourceFile__from_ast(n) && (isManuallyInvoked || !IsBlock__from_ast(n)); n = Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
        Assert__from_debug(RangeContainsRange(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc))), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Not a subspan. Child: "), new GoInterfaceAdapter(Node__from_ast.KindString(n)), new GoInterfaceAdapter(", parent: "), new GoInterfaceAdapter(Node__from_ast.KindString(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))]));
        let argumentInfo: argumentListInfo | undefined = getImmediatelyContainingArgumentOrContextualParameterInfo(n, position__shadow_1, sourceFile, checker__shadow_1);
        if (!(argumentInfo === undefined)) {
            if (!(((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextualInvocation === undefined)) {
                return argumentInfo;
            }
            if (firstArgumentInfo === undefined) {
                firstArgumentInfo = argumentInfo;
            }
            if ((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentsSpan.End() === position__shadow_1) {
                return argumentInfo;
            }
            if ((argumentInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentsSpan.Contains(position__shadow_1)) {
                return argumentInfo;
            }
        }
    }
    return firstArgumentInfo;
}
export function getImmediatelyContainingArgumentOrContextualParameterInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentListInfo | undefined {
    let result: argumentListInfo | undefined = tryGetParameterInfo(node, sourceFile, checker__shadow_1);
    if (result === undefined) {
        return getImmediatelyContainingArgumentInfo(node, position__shadow_1, sourceFile, checker__shadow_1);
    }
    return result;
}
export class argumentListInfo {
    declare private readonly $goType: void;
    public constructor(public isTypeParameterList: bool, public invocation: {
        value: invocation;
    } | undefined, public argumentsSpan: TextRange__from_core, public argumentIndex: int, public argumentCount: int) {
    }
    declare private readonly then?: never;
}
export function getImmediatelyContainingArgumentInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentListInfo | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (IsCallOrNewExpression__from_ast(parent)) {
        let info: argumentOrParameterListInfo | undefined = getArgumentOrParameterListInfo(node, sourceFile, c);
        if (info === undefined) {
            return void 0;
        }
        let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).list;
        let argumentIndex = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex;
        let argumentCount = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount;
        let argumentsSpan = TextRange__from_core.$copy((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentsSpan);
        let isTypeParameterList = false;
        let parentTypeArgumentList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.TypeArgumentList(parent);
        if (!(parentTypeArgumentList === undefined)) {
            if (NodeList__from_ast.Pos(parentTypeArgumentList) === NodeList__from_ast.Pos(list)) {
                isTypeParameterList = true;
            }
        }
        return new argumentListInfo(isTypeParameterList, { value: new invocation({ value: new callInvocation(parent) }, void 0, void 0) }, TextRange__from_core.$copy(argumentsSpan), argumentIndex, argumentCount);
    }
    else if (isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent)) {
        if (isInsideTemplateLiteral(node, position__shadow_1, sourceFile)) {
            return getArgumentListInfoForTemplate(Node__from_ast.AsTaggedTemplateExpression(parent), 0, sourceFile);
        }
        return void 0;
    }
    else if (isTemplateHead(node) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTaggedTemplateExpression$constant__from_ast()) {
        let templateExpression: {
            value: TemplateExpression__from_ast;
        } | undefined = Node__from_ast.AsTemplateExpression(parent);
        let tagExpression: {
            value: TaggedTemplateExpression__from_ast;
        } | undefined = Node__from_ast.AsTaggedTemplateExpression(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((templateExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Parent);
        let argumentIndex = 1;
        if (isInsideTemplateLiteral(node, position__shadow_1, sourceFile)) {
            argumentIndex = 0;
        }
        return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
    }
    else if (IsTemplateSpan__from_ast(parent) && isTaggedTemplateExpression(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        let templateSpan: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = parent;
        let tagExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (isTemplateTail(node) && !isInsideTemplateLiteral(node, position__shadow_1, sourceFile)) {
            return void 0;
        }
        let spanIndex = IndexOfNode__from_ast(NodeList__from_ast.$storageOf((((Node__from_ast.AsTemplateExpression(Node__from_ast.$storageOf(((templateSpan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, templateSpan);
        let argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node, position__shadow_1, sourceFile);
        return getArgumentListInfoForTemplate(Node__from_ast.AsTaggedTemplateExpression(tagExpression), argumentIndex, sourceFile);
    }
    else if (IsJsxOpeningLikeElement__from_ast(parent)) {
        let attributeSpanStart = TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Attributes(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos();
        let attributeSpanEnd = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(Node__from_ast.Attributes(parent)));
        return new argumentListInfo(false, { value: new invocation({ value: new callInvocation(parent) }, void 0, void 0) }, NewTextRange__from_core(attributeSpanStart, attributeSpanEnd - attributeSpanStart), 0, 1);
    }
    else {
        let typeArgInfo: PossibleTypeArgumentInfo | undefined = getPossibleTypeArgumentsInfo(node, sourceFile);
        if (!(typeArgInfo === undefined)) {
            let called: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (typeArgInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).called;
            let nTypeArguments = (typeArgInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nTypeArguments;
            let invoc: {
                value: typeArgsInvocation;
            } | undefined = { value: new typeArgsInvocation(Node__from_ast.AsIdentifier(called)) };
            let argumentRange = NewTextRange__from_core(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos(), Node__from_ast.End(node));
            return new argumentListInfo(true, { value: new invocation(void 0, invoc, void 0) }, TextRange__from_core.$copy(argumentRange), nTypeArguments, nTypeArguments + 1);
        }
    }
    return void 0;
}
export function getArgumentIndexForTemplatePiece(spanIndex: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    Assert__from_debug(position__shadow_1 >= TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos(), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Assumed 'position' could not occur before node.")]));
    if (IsTemplateLiteralToken__from_ast(node)) {
        if (isInsideTemplateLiteral(node, position__shadow_1, sourceFile)) {
            return 0;
        }
        return spanIndex + 2;
    }
    return spanIndex + 1;
}
export function getAdjustedNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindOpenParenToken$constant__from_ast():
        case KindCommaToken$constant__from_ast(): {
            return node;
            break;
        }
        default: {
            return FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                if (IsParameterDeclaration__from_ast(n)) {
                    return true;
                }
                else if (IsBindingElement__from_ast(n) || IsObjectBindingPattern__from_ast(n) || IsArrayBindingPattern__from_ast(n)) {
                    return false;
                }
                return false;
            });
            break;
        }
    }
}
export class contextualSignatureLocationInfo {
    declare private readonly $goType: void;
    public constructor(public contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, public argumentIndex: int, public argumentCount: int, public argumentsSpan: TextRange__from_core) {
    }
    declare private readonly then?: never;
}
export function getSpreadElementCount(node: {
    value: SpreadElement__from_ast;
} | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): int {
    let spreadType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(c, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
    if (IsTupleType__from_checker(spreadType)) {
        let tupleType: {
            value: TupleType__from_checker;
        } | undefined = Type__from_checker.AsTupleType(Type__from_checker.Target(spreadType));
        if (tupleType === undefined) {
            return 0;
        }
        let elementFlags = TupleType__from_checker.ElementFlags(tupleType);
        let fixedLength = TupleType__from_checker.FixedLength(tupleType);
        if (fixedLength === 0) {
            return 0;
        }
        let firstOptionalIndex = FindIndex$Named_checker$ElementFlags(elementFlags, (f: ElementFlags__from_checker): bool => {
            return ((f & ElementFlagsRequired$constant__from_checker()) >>> 0 === 0);
        });
        if (firstOptionalIndex < 0) {
            return fixedLength;
        }
        return firstOptionalIndex;
    }
    return 0;
}
export function getArgumentIndex(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_arguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): int {
    return getArgumentIndexOrCount(getTokenFromNodeList(__go_arguments, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile), node, c);
}
export function getArgumentCount(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_arguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): int {
    return getArgumentIndexOrCount(getTokenFromNodeList(__go_arguments, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile), void 0, c);
}
export function getArgumentIndexOrCount(__go_arguments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): int {
    let argumentIndex = 0;
    let skipComma = false;
    const __gotots_range_0 = __go_arguments;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (!(node === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(arg, node)) {
            if (!skipComma && Node__from_ast.$storageOf(((arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
                argumentIndex++;
            }
            return argumentIndex;
        }
        if (IsSpreadElement__from_ast(arg)) {
            argumentIndex += getSpreadElementCount(Node__from_ast.AsSpreadElement(arg), c);
            skipComma = true;
            continue;
        }
        if (!(Node__from_ast.$storageOf(((arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast())) {
            argumentIndex++;
            skipComma = true;
            continue;
        }
        if (skipComma) {
            skipComma = false;
            continue;
        }
        argumentIndex++;
    }
    if (!(node === undefined)) {
        return argumentIndex;
    }
    let argumentCount = argumentIndex;
    if (__go_arguments.length > 0 && Node__from_ast.$storageOf(((__go_arguments.get(__go_arguments.length - 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
        argumentCount = argumentIndex + 1;
    }
    return argumentCount;
}
export class argumentOrParameterListInfo {
    declare private readonly $goType: void;
    public constructor(public list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, public argumentIndex: int, public argumentCount: int, public argumentsSpan: TextRange__from_core) {
    }
    declare private readonly then?: never;
}
export function getArgumentOrParameterListInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentOrParameterListInfo | undefined {
    let info: argumentOrParameterListAndIndex | undefined = getArgumentOrParameterListAndIndex(node, sourceFile, c);
    if (info === undefined) {
        return void 0;
    }
    let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).list;
    let argumentIndex = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex;
    let argumentCount = getArgumentCount(node, list, sourceFile, c);
    let argumentsSpan = getApplicableSpanForArguments(list, node, sourceFile);
    return new argumentOrParameterListInfo(list, argumentIndex, argumentCount, TextRange__from_core.$copy(argumentsSpan));
}
export function getApplicableSpanForArguments(argumentList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): TextRange__from_core {
    if (argumentList === undefined && !(node === undefined)) {
        let spanStart = Node__from_ast.End(node);
        let spanEnd = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node));
        spanEnd = ensureMinimumSpanSize(spanStart, spanEnd);
        return NewTextRange__from_core(spanStart, spanEnd);
    }
    let applicableSpanStart = NodeList__from_ast.Pos(argumentList);
    let applicableSpanEnd = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), NodeList__from_ast.End(argumentList));
    applicableSpanEnd = ensureMinimumSpanSize(applicableSpanStart, applicableSpanEnd);
    return NewTextRange__from_core(applicableSpanStart, applicableSpanEnd);
}
export function ensureMinimumSpanSize(start: int, end: int): int {
    if (end <= start) {
        return start + 1;
    }
    return end;
}
export class argumentOrParameterListAndIndex {
    declare private readonly $goType: void;
    public constructor(public list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, public argumentIndex: int) {
    }
    declare private readonly then?: never;
}
export function getArgumentOrParameterListAndIndex(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentOrParameterListAndIndex | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLessThanToken$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOpenParenToken$constant__from_ast()) {
        let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getChildListThatStartsWithOpenerToken(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, node);
        return new argumentOrParameterListAndIndex(list, 0);
    }
    else {
        let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = findContainingList(node, sourceFile);
        if (list === undefined) {
            return void 0;
        }
        return new argumentOrParameterListAndIndex(list, getArgumentIndex(node, list, sourceFile, c));
    }
}
export function getChildListThatStartsWithOpenerToken(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, openerToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (IsCallExpression__from_ast(parent)) {
        let parentCallExpression: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(parent);
        if (Node__from_ast.$storageOf(((openerToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLessThanToken$constant__from_ast()) {
            const __gotots_store_1 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((parentCallExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
            return Node__from_ast.TypeArgumentList(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                return Node__from_ast.$fromStorage($go$storage);
            }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                return Node__from_ast.$storageOf($go$value);
            }));
        }
        return CallExpression__from_ast.$storageOf(((parentCallExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments;
    }
    else if (IsNewExpression__from_ast(parent)) {
        let parentNewExpression: {
            value: NewExpression__from_ast;
        } | undefined = Node__from_ast.AsNewExpression(parent);
        if (Node__from_ast.$storageOf(((openerToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLessThanToken$constant__from_ast()) {
            const __gotots_store_2 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf((parentNewExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
            return Node__from_ast.TypeArgumentList(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                return Node__from_ast.$fromStorage($go$storage);
            }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                return Node__from_ast.$storageOf($go$value);
            }));
        }
        return (parentNewExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Arguments;
    }
    return void 0;
}
export function tryGetParameterInfo(startingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentListInfo | undefined {
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedNode(startingToken);
    if (node === undefined) {
        return void 0;
    }
    let info: contextualSignatureLocationInfo | undefined = getContextualSignatureLocationInfo(node, sourceFile, c);
    if (info === undefined) {
        return void 0;
    }
    let nonNullableContextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetNonNullableType(c, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextualType);
    if (nonNullableContextualType === undefined) {
        return void 0;
    }
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(nonNullableContextualType);
    if (__go_symbol === undefined) {
        return void 0;
    }
    let signatures = Checker__from_checker.GetSignaturesOfType(c, nonNullableContextualType, SignatureKindCall$constant__from_checker());
    if (signatures.length === 0) {
        return void 0;
    }
    let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = signatures.get(signatures.length - 1);
    let contextualInvocation__shadow_1: {
        value: contextualInvocation;
    } | undefined = { value: new contextualInvocation(signature, startingToken, chooseBetterSymbol(__go_symbol)) };
    return new argumentListInfo(false, { value: new invocation(void 0, void 0, contextualInvocation__shadow_1) }, TextRange__from_core.$copy((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentsSpan), (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount);
}
export function chooseBetterSymbol(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameType$string__from_ast) {
        const __gotots_range_4 = Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_4);
            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            if (IsFunctionTypeNode__from_ast(d) && CanHaveSymbol__from_ast(Node__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.Symbol(Node__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
        }
    }
    return s;
}
export function getContextualSignatureLocationInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): contextualSignatureLocationInfo | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParenthesizedExpression$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast(): {
            let info: argumentOrParameterListInfo | undefined = getArgumentOrParameterListInfo(node, sourceFile, c);
            if (info === undefined) {
                return void 0;
            }
            let argumentIndex = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex;
            let argumentCount = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount;
            let argumentsSpan = TextRange__from_core.$copy((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentsSpan);
            let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
            if (IsMethodDeclaration__from_ast(parent)) {
                contextualType = Checker__from_checker.GetContextualTypeForObjectLiteralElement(c, parent, ContextFlagsNone$constant__from_checker());
            }
            else {
                contextualType = Checker__from_checker.GetContextualType(c, parent, ContextFlagsNone$constant__from_checker());
            }
            if (!(contextualType === undefined)) {
                return new contextualSignatureLocationInfo(contextualType, argumentIndex, argumentCount, TextRange__from_core.$copy(argumentsSpan));
            }
            return void 0;
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            let highestBinary: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = getHighestBinary(Node__from_ast.AsBinaryExpression(parent));
            const __gotots_receiver_0 = c;
            const __gotots_store_6 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((highestBinary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
            const __gotots_argument_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_1 = ContextFlagsNone$constant__from_checker();
            let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1);
            let argumentIndex = 0;
            if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOpenParenToken$constant__from_ast())) {
                argumentIndex = countBinaryExpressionParameters(Node__from_ast.AsBinaryExpression(parent)) - 1;
                let argumentCount = countBinaryExpressionParameters(highestBinary);
                if (!(contextualType === undefined)) {
                    return new contextualSignatureLocationInfo(contextualType, argumentIndex, argumentCount, NewTextRange__from_core(Node__from_ast.Pos(parent), Node__from_ast.End(parent)));
                }
                return void 0;
            }
            break;
        }
    }
    return void 0;
}
export function getHighestBinary(b: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined {
    if (IsBinaryExpression__from_ast(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Parent)) {
        return getHighestBinary(Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Parent));
    }
    return b;
}
export function countBinaryExpressionParameters(b: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): int {
    if (IsBinaryExpression__from_ast(BinaryExpression__from_ast.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
        return countBinaryExpressionParameters(Node__from_ast.AsBinaryExpression(BinaryExpression__from_ast.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) + 1;
    }
    return 2;
}
export function getTokenFromNodeList(nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, nodeListParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (nodeList === undefined || nodeListParent === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let left = NodeList__from_ast.Pos(nodeList);
    let nodeListIndex = 0;
    let tokens = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    for (; left < NodeList__from_ast.End(nodeList);) {
        if (NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > nodeListIndex && left === Node__from_ast.Pos(NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(nodeListIndex))) {
            tokens = tokens.append(void 0, [NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(nodeListIndex)]);
            left = Node__from_ast.End(NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(nodeListIndex));
            nodeListIndex++;
        }
        else {
            let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, left);
            let token = Scanner__from_scanner.Token(scanner__shadow_1);
            let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
            let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
            tokens = tokens.append(void 0, [SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, nodeListParent, Scanner__from_scanner.TokenFlags(scanner__shadow_1))]);
            left = tokenEnd;
        }
    }
    return tokens;
}
export function getArgumentListInfoForTemplate(tagExpression: {
    value: TaggedTemplateExpression__from_ast;
} | undefined, argumentIndex: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): argumentListInfo | undefined {
    let argumentCount = 1;
    if (!isNoSubstitutionTemplateLiteral((tagExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template)) {
        argumentCount = NodeList__from_ast.$storageOf((((Node__from_ast.AsTemplateExpression((tagExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length + 1;
    }
    if (argumentIndex !== 0) {
        Assert__from_debug(argumentIndex < argumentCount, RuntimeSlice.nil<GoInterface | undefined>());
    }
    const __gotots_field_2 = false;
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf((tagExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
    const __gotots_field_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    }));
    const __gotots_field_1 = { value: new callInvocation(__gotots_field_0) };
    const __gotots_field_3 = { value: new invocation(__gotots_field_1, void 0, void 0) };
    return new argumentListInfo(__gotots_field_2, __gotots_field_3, getApplicableRangeForTaggedTemplate(tagExpression, sourceFile), argumentIndex, argumentCount);
}
export function getApplicableRangeForTaggedTemplate(taggedTemplate: {
    value: TaggedTemplateExpression__from_ast;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): TextRange__from_core {
    let template: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (taggedTemplate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template;
    let applicableSpanStart = GetTokenPosOfNode__from_scanner(template, sourceFile, false);
    let applicableSpanEnd = Node__from_ast.End(template);
    if (Node__from_ast.$storageOf(((template ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateExpression$constant__from_ast()) {
        let templateSpans: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (Node__from_ast.AsTemplateExpression(template) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans;
        let lastSpan: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((templateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf(((templateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1);
        if (Node__from_ast.End((Node__from_ast.AsTemplateSpan(lastSpan) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal) - Node__from_ast.Pos((Node__from_ast.AsTemplateSpan(lastSpan) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal) === 0) {
            applicableSpanEnd = SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), applicableSpanEnd);
        }
    }
    return NewTextRange__from_core(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
}
