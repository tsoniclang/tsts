import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { QualifiedName as QualifiedName__from_ast, SemanticMeaning as SemanticMeaning__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SignatureKind as SignatureKind__from_checker, SymbolFormatFlags as SymbolFormatFlags__from_checker, TypeFormatFlags as TypeFormatFlags__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { EmitContext as EmitContext__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CheckFlagsIndexSymbol$constant as CheckFlagsIndexSymbol$constant__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetRootDeclaration as GetRootDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasAbstractModifier as HasAbstractModifier__from_ast, HasStaticModifier as HasStaticModifier__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassOrInterfaceLike as IsClassOrInterfaceLike__from_ast, IsConstTypeReference as IsConstTypeReference__from_ast, IsConstructSignatureDeclaration as IsConstructSignatureDeclaration__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsEnumConst as IsEnumConst__from_ast, IsEnumDeclaration as IsEnumDeclaration__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpressionOrArrowFunction as IsFunctionExpressionOrArrowFunction__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportMeta as IsImportMeta__from_ast, IsInExpressionContext as IsInExpressionContext__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJsxNamespacedName as IsJsxNamespacedName__from_ast, IsLabelName as IsLabelName__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodSignatureDeclaration as IsMethodSignatureDeclaration__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsNamedTupleMember as IsNamedTupleMember__from_ast, IsNewExpression as IsNewExpression__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsTagName as IsTagName__from_ast, IsThisInTypeQuery as IsThisInTypeQuery__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeOrJSTypeAliasDeclaration as IsTypeOrJSTypeAliasDeclaration__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsVarAwaitUsing as IsVarAwaitUsing__from_ast, IsVarConst as IsVarConst__from_ast, IsVarLet as IsVarLet__from_ast, IsVarUsing as IsVarUsing__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, JSDoc as JSDoc__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindJSDoc$constant as KindJSDoc$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocNameReference$constant as KindJSDocNameReference$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocTemplateTag$constant as KindJSDocTemplateTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindMetaProperty$constant as KindMetaProperty$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SemanticMeaningNamespace$constant as SemanticMeaningNamespace$constant__from_ast, SemanticMeaningType$constant as SemanticMeaningType$constant__from_ast, SemanticMeaningValue$constant as SemanticMeaningValue$constant__from_ast, SymbolFlagsAccessor$constant as SymbolFlagsAccessor$constant__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsMethod$constant as SymbolFlagsMethod$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolFlagsNamespace$constant as SymbolFlagsNamespace$constant__from_ast, SymbolFlagsNone$constant as SymbolFlagsNone$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsProperty$constant as SymbolFlagsProperty$constant__from_ast, SymbolFlagsSignature$constant as SymbolFlagsSignature$constant__from_ast, SymbolFlagsType$constant as SymbolFlagsType$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, Symbol as Symbol__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, InterfaceType as InterfaceType__from_checker, LiteralType as LiteralType__from_checker, NewNodeBuilderEx as NewNodeBuilderEx__from_checker, NodeBuilder as NodeBuilder__from_checker, SignatureFlagsConstruct$constant as SignatureFlagsConstruct$constant__from_checker, SignatureKindCall$constant as SignatureKindCall$constant__from_checker, SignatureKindConstruct$constant as SignatureKindConstruct$constant__from_checker, Signature as Signature__from_checker, TypeFlagsLiteral$constant as TypeFlagsLiteral$constant__from_checker, TypeFormatFlagsMultilineObjectLiterals$constant as TypeFormatFlagsMultilineObjectLiterals$constant__from_checker, TypeFormatFlagsNodeBuilderFlagsMask$constant as TypeFormatFlagsNodeBuilderFlagsMask$constant__from_checker, TypeFormatFlagsWriteArrowStyleSignature$constant as TypeFormatFlagsWriteArrowStyleSignature$constant__from_checker, TypeFormatFlagsWriteCallStyleSignature$constant as TypeFormatFlagsWriteCallStyleSignature$constant__from_checker, Type as Type__from_checker, VerbosityContext as VerbosityContext__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewLineKindLF$constant as NewLineKindLF$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { InternalFlagsNone$constant as InternalFlagsNone$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { NewEmitContext as NewEmitContext__from_printer, NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Set$AddIfAbsent$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LastOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$PointerTo_Named_ls$displayPartsWriter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { displayPartsWriter, newDisplayPartsWriter } from "./displaypartswriter.js";
import { getContainerNode, getContainingObjectLiteralElement } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function symbolFormatFlags$constant(): SymbolFormatFlags__from_checker {
    return 15;
}
export function typeFormatFlags$constant(): TypeFormatFlags__from_checker {
    return 1073758208;
}
export function formatQuickInfo(quickInfo: gostring): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next => b = b$next);
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(32)));
    writeCode(b$location, "typescript", quickInfo);
    return strings__from_gostdlib.Builder.String(b);
}
export function shouldGetType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast(): {
            return !(!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) && IsDeclarationName__from_ast(node)) && !IsLabelName__from_ast(node) && !IsTagName__from_ast(node) && !IsConstTypeReference__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindThisKeyword$constant__from_ast():
        case KindThisType$constant__from_ast():
        case KindSuperKeyword$constant__from_ast():
        case KindNamedTupleMember$constant__from_ast(): {
            return true;
            break;
        }
        case KindMetaProperty$constant__from_ast(): {
            return IsImportMeta__from_ast(node);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export class symbolDisplayInfo {
    declare private readonly $goType: void;
    public constructor(public displayParts: {
        value: displayPartsWriter;
    } | undefined, public declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function getQuickInfoAndDeclarationAtLocation(c: {
    value: Checker__from_checker;
} | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, vc: {
    value: VerbosityContext__from_checker;
} | undefined, vsCapability: bool, meaning: SemanticMeaning__from_ast): symbolDisplayInfo {
    let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainerNode(node);
    if (vc === undefined) {
        vc =
            { value: new VerbosityContext__from_checker(0, 0, false, false) };
    }
    let dpw: {
        value: displayPartsWriter;
    } | undefined = newDisplayPartsWriter(vsCapability);
    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
    if (!(node === undefined)) {
        sourceFile = GetSourceFileOfNode__from_ast(node);
    }
    const classifiedNodeBuilderFlags: Flags__from_nodebuilder = 70238720;
    let writeTypeClassified: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: TypeFormatFlags__from_checker) => void) | undefined = (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, enclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: TypeFormatFlags__from_checker): void => {
        flags = (flags | 1024) >>> 0;
        if (!vsCapability) {
            displayPartsWriter.Write(dpw, Checker__from_checker.TypeToStringEx(c, t, enclosing, flags, vc));
            return;
        }
        let emitContext: {
            value: EmitContext__from_printer;
        } | undefined = NewEmitContext__from_printer();
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = GoMap.make(0, []);
        let nb: NodeBuilder__from_checker | undefined = NewNodeBuilderEx__from_checker(c, emitContext, idToSymbol);
        let combinedFlags = ((flags & TypeFormatFlagsNodeBuilderFlagsMask$constant__from_checker()) >>> 0 | classifiedNodeBuilderFlags) >>> 0;
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilder__from_checker.TypeToTypeNode(nb, t, enclosing, combinedFlags, InternalFlagsNone$constant__from_nodebuilder(), void 0);
        if (typeNode === undefined) {
            displayPartsWriter.Write(dpw, Checker__from_checker.TypeToStringEx(c, t, enclosing, flags, vc));
            return;
        }
        let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, NewLineKindLF$constant__from_core(), false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IdToSymbol = idToSymbol;
        let tempDpw: {
            value: displayPartsWriter;
        } | undefined = newDisplayPartsWriter(true);
        Printer__from_printer.Write(p, typeNode, sourceFile, new GoInterfaceAdapter(tempDpw), void 0);
        displayPartsWriter.WriteFrom(dpw, tempDpw);
    };
    let writeSignatureClassified: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: TypeFormatFlags__from_checker) => void) | undefined = (sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, enclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: TypeFormatFlags__from_checker): void => {
        flags = (flags | 1024) >>> 0;
        if (!vsCapability) {
            displayPartsWriter.Write(dpw, Checker__from_checker.SignatureToStringEx(c, sig, enclosing, flags, vc));
            return;
        }
        let isConstructor = !((Signature__from_checker.Flags(sig) & SignatureFlagsConstruct$constant__from_checker()) >>> 0 === 0) && (flags & TypeFormatFlagsWriteCallStyleSignature$constant__from_checker()) >>> 0 === 0;
        let sigOutput = 0;
        if (!((flags & TypeFormatFlagsWriteArrowStyleSignature$constant__from_checker()) >>> 0 === 0)) {
            if (isConstructor) {
                sigOutput = KindConstructorType$constant__from_ast();
            }
            else {
                sigOutput = KindFunctionType$constant__from_ast();
            }
        }
        else {
            if (isConstructor) {
                sigOutput = KindConstructSignature$constant__from_ast();
            }
            else {
                sigOutput = KindCallSignature$constant__from_ast();
            }
        }
        let emitContext: {
            value: EmitContext__from_printer;
        } | undefined = NewEmitContext__from_printer();
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = GoMap.make(0, []);
        let nb: NodeBuilder__from_checker | undefined = NewNodeBuilderEx__from_checker(c, emitContext, idToSymbol);
        let combinedFlags = ((flags & TypeFormatFlagsNodeBuilderFlagsMask$constant__from_checker()) >>> 0 | classifiedNodeBuilderFlags) >>> 0;
        let sigNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilder__from_checker.SignatureToSignatureDeclaration(nb, sig, sigOutput, enclosing, combinedFlags, InternalFlagsNone$constant__from_nodebuilder(), void 0);
        if (sigNode === undefined) {
            displayPartsWriter.Write(dpw, Checker__from_checker.SignatureToStringEx(c, sig, enclosing, flags, vc));
            return;
        }
        let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, NewLineKindLF$constant__from_core(), false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IdToSymbol = idToSymbol;
        let tempDpw: {
            value: displayPartsWriter;
        } | undefined = newDisplayPartsWriter(true);
        Printer__from_printer.Write(p, sigNode, sourceFile, new GoInterfaceAdapter(tempDpw), void 0);
        displayPartsWriter.WriteFrom(dpw, tempDpw);
    };
    let writeSymbolClassified: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: SymbolFlags__from_ast, $3: SymbolFormatFlags__from_checker) => void) | undefined = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning__shadow_1: SymbolFlags__from_ast, flags: SymbolFormatFlags__from_checker): void => {
        if (!vsCapability) {
            displayPartsWriter.Write(dpw, Checker__from_checker.SymbolToStringEx(c, __go_symbol__shadow_1, enclosing, meaning__shadow_1, flags));
            return;
        }
        let text = Checker__from_checker.SymbolToStringEx(c, __go_symbol__shadow_1, enclosing, meaning__shadow_1, flags);
        displayPartsWriter.WriteSymbol(dpw, text, __go_symbol__shadow_1);
    };
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast() && IsInExpressionContext__from_ast(node) || IsThisInTypeQuery__from_ast(node)) {
        displayPartsWriter.WriteKeyword(dpw, "this");
        displayPartsWriter.WritePunctuation(dpw, ": ");
        const __gotots_callee_0 = writeTypeClassified;
        const __gotots_argument_0 = Checker__from_checker.GetTypeAtLocation(c, node);
        const __gotots_argument_1 = container;
        const __gotots_argument_2 = typeFormatFlags$constant();
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        return new symbolDisplayInfo(dpw, void 0);
    }
    if (__go_symbol === undefined) {
        if (shouldGetType(node)) {
            const __gotots_callee_1 = writeTypeClassified;
            const __gotots_argument_3 = Checker__from_checker.GetTypeAtLocation(c, node);
            const __gotots_argument_4 = container;
            const __gotots_argument_5 = typeFormatFlags$constant();
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
        }
        return new symbolDisplayInfo(dpw, void 0);
    }
    let visitedAliases = Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil();
    });
    const visitedAliases$location = tsonicTypeScriptRuntime.boundLocation({}, () => visitedAliases, visitedAliases$next => visitedAliases = visitedAliases$next);
    let aliasLevel = 0;
    let firstDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let setDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        if (firstDeclaration === undefined) {
            firstDeclaration = declaration;
        }
    };
    let writeNewLine: (() => void) | undefined = (): void => {
        if (displayPartsWriter.String(dpw) !== "") {
            displayPartsWriter.Write(dpw, "\n");
        }
        if (aliasLevel !== 0) {
            displayPartsWriter.WritePunctuation(dpw, "(");
            displayPartsWriter.Write(dpw, "alias");
            displayPartsWriter.WritePunctuation(dpw, ") ");
        }
    };
    let writeSignatures: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $1: gostring, $2: bool, $3: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined = (signatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, prefix: gostring, parenthesized: bool, __go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void => {
        const __gotots_range_2 = signatures;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_0 = __gotots_range_index_2;
            const __gotots_range_value_1 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_0;
            let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_1;
            const __gotots_callee_2 = writeNewLine;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            if (i === 3 && signatures.length >= 5) {
                displayPartsWriter.WriteComment(dpw, fmt__from_gostdlib.Sprintf("// +%v more overloads", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(signatures.length - 3)])));
                break;
            }
            if (parenthesized) {
                displayPartsWriter.WritePunctuation(dpw, "(");
                displayPartsWriter.Write(dpw, prefix);
                displayPartsWriter.WritePunctuation(dpw, ") ");
            }
            else {
                displayPartsWriter.WriteKeyword(dpw, prefix);
            }
            const __gotots_callee_3 = writeSymbolClassified;
            const __gotots_argument_6 = __go_symbol__shadow_1;
            const __gotots_argument_7 = container;
            const __gotots_argument_8 = SymbolFlagsNone$constant__from_ast();
            const __gotots_argument_9 = symbolFormatFlags$constant();
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
            if (!((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0)) {
                displayPartsWriter.WritePunctuation(dpw, "?");
            }
            const __gotots_callee_4 = writeSignatureClassified;
            const __gotots_argument_10 = sig;
            const __gotots_argument_11 = container;
            const __gotots_argument_12 = 1207975968;
            (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
        }
    };
    let writeTypeParams: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>) => void) | undefined = (params: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): void => {
        if (params.length > 0) {
            displayPartsWriter.WritePunctuation(dpw, "<");
            const __gotots_range_3 = params;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_2 = __gotots_range_index_3;
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let i = __gotots_range_value_2;
                let tp: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_3;
                if (i !== 0) {
                    displayPartsWriter.WritePunctuation(dpw, ", ");
                }
                const __gotots_callee_5 = writeSymbolClassified;
                const __gotots_argument_13 = Type__from_checker.Symbol(tp);
                const __gotots_argument_14 = void 0;
                const __gotots_argument_15 = SymbolFlagsNone$constant__from_ast();
                const __gotots_argument_16 = symbolFormatFlags$constant();
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
                let cons: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetConstraintOfTypeParameter(c, tp);
                if (!(cons === undefined)) {
                    displayPartsWriter.WriteKeyword(dpw, " extends ");
                    const __gotots_callee_6 = writeTypeClassified;
                    const __gotots_argument_17 = cons;
                    const __gotots_argument_18 = void 0;
                    const __gotots_argument_19 = typeFormatFlags$constant();
                    (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                }
                let def: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetDefaultFromTypeParameter(c, tp);
                if (!(def === undefined)) {
                    displayPartsWriter.WriteOperator(dpw, " = ");
                    const __gotots_callee_7 = writeTypeClassified;
                    const __gotots_argument_20 = def;
                    const __gotots_argument_21 = void 0;
                    const __gotots_argument_22 = typeFormatFlags$constant();
                    (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21, __gotots_argument_22);
                }
            }
            displayPartsWriter.WritePunctuation(dpw, ">");
        }
    };
    let symbolWasExpanded = false;
    let canExpandSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        if (vc === undefined) {
            return false;
        }
        if ((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (2016)) >>> 0 === 0) {
            return false;
        }
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
        if (!((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (96)) >>> 0 === 0)) {
            t = Checker__from_checker.GetDeclaredTypeOfSymbol(c, __go_symbol__shadow_1);
        }
        else {
            t = Checker__from_checker.GetTypeOfSymbolAtLocation(c, __go_symbol__shadow_1, node);
        }
        if (t === undefined || Checker__from_checker.IsLibTypeForHoverVerbosity(c, t)) {
            return false;
        }
        if ((vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Level > 0) {
            return true;
        }
        (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity = true;
        return false;
    };
    let tryExpandSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: SymbolFlags__from_ast) => bool) | undefined = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning__shadow_1: SymbolFlags__from_ast): bool => {
        if (symbolWasExpanded) {
            return true;
        }
        const __gotots_callee_8 = canExpandSymbol;
        const __gotots_argument_23 = __go_symbol__shadow_1;
        if ((__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23)) {
            let expandVC: {
                value: VerbosityContext__from_checker;
            } | undefined = { value: new VerbosityContext__from_checker((vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Level - 1, (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MaxTruncationLength, false, false) };
            let expanded = Checker__from_checker.ExpandSymbolForHover(c, __go_symbol__shadow_1, meaning__shadow_1, expandVC);
            if (expanded !== "") {
                (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity = (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity || (expandVC ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity;
                (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated = (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated || (expandVC ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated;
                displayPartsWriter.Write(dpw, expanded);
                symbolWasExpanded = true;
                return true;
            }
        }
        return false;
    };
    let writeSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined;
    writeSymbol = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void => {
        if (!((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0) && Set$AddIfAbsent$PointerTo_Named_ast$Symbol(visitedAliases$location, __go_symbol__shadow_1)) {
            {
                let aliasedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetAliasedSymbol(c, __go_symbol__shadow_1);
                if (!tsonicTypeScriptRuntime.sameLocation(aliasedSymbol, Checker__from_checker.GetUnknownSymbol(c))) {
                    aliasLevel++;
                    const __gotots_callee_9 = writeSymbol;
                    const __gotots_argument_24 = aliasedSymbol;
                    (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
                    aliasLevel--;
                }
            }
        }
        let flags = 0;
        switch (meaning) {
            case SemanticMeaningValue$constant__from_ast(): {
                flags = (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (242623)) >>> 0;
                break;
            }
            case SemanticMeaningType$constant__from_ast(): {
                flags = (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsType$constant__from_ast()) >>> 0;
                break;
            }
            case SemanticMeaningNamespace$constant__from_ast(): {
                flags = (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsNamespace$constant__from_ast()) >>> 0;
                break;
            }
            default: {
                flags = (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (1032191)) >>> 0;
                break;
            }
        }
        if (flags === 0) {
            if (aliasLevel !== 0 || displayPartsWriter.String(dpw) !== "") {
                return;
            }
            flags = (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (1032191)) >>> 0;
            if (flags === 0) {
                return;
            }
        }
        if (!((flags & SymbolFlagsProperty$constant__from_ast()) >>> 0 === 0) && !(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsMethodDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
            flags = SymbolFlagsMethod$constant__from_ast();
        }
        if (!((flags & (98311)) >>> 0 === 0)) {
            const __gotots_callee_10 = writeNewLine;
            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))();
            if ((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsIndexSymbol$constant__from_ast()) >>> 0 === 0) {
                __gotots_control_target_0: {
                    if (!((flags & SymbolFlagsProperty$constant__from_ast()) >>> 0 === 0)) {
                        displayPartsWriter.WritePunctuation(dpw, "(");
                        displayPartsWriter.Write(dpw, "property");
                        displayPartsWriter.WritePunctuation(dpw, ") ");
                    }
                    else if (!((flags & SymbolFlagsAccessor$constant__from_ast()) >>> 0 === 0)) {
                        displayPartsWriter.WritePunctuation(dpw, "(");
                        displayPartsWriter.Write(dpw, "accessor");
                        displayPartsWriter.WritePunctuation(dpw, ") ");
                    }
                    else {
                        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                        if (!(decl === undefined)) {
                            decl = GetRootDeclaration__from_ast(decl);
                            __gotots_control_target_1: {
                                if (IsParameterDeclaration__from_ast(decl)) {
                                    displayPartsWriter.WritePunctuation(dpw, "(");
                                    displayPartsWriter.Write(dpw, "parameter");
                                    displayPartsWriter.WritePunctuation(dpw, ") ");
                                }
                                else if (IsVarLet__from_ast(decl)) {
                                    displayPartsWriter.WriteKeyword(dpw, "let ");
                                }
                                else if (IsVarConst__from_ast(decl)) {
                                    displayPartsWriter.WriteKeyword(dpw, "const ");
                                }
                                else if (IsVarUsing__from_ast(decl)) {
                                    displayPartsWriter.WriteKeyword(dpw, "using ");
                                }
                                else if (IsVarAwaitUsing__from_ast(decl)) {
                                    displayPartsWriter.WriteKeyword(dpw, "await ");
                                    displayPartsWriter.WriteKeyword(dpw, "using ");
                                }
                                else {
                                    displayPartsWriter.WriteKeyword(dpw, "var ");
                                }
                            }
                        }
                    }
                }
                if (Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameExportEquals$string__from_ast && !(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !((Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0)) {
                    displayPartsWriter.Write(dpw, "exports");
                }
                else {
                    const __gotots_callee_11 = writeSymbolClassified;
                    const __gotots_argument_25 = __go_symbol__shadow_1;
                    const __gotots_argument_26 = container;
                    const __gotots_argument_27 = SymbolFlagsNone$constant__from_ast();
                    const __gotots_argument_28 = symbolFormatFlags$constant();
                    (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
                }
                if (!((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0)) {
                    displayPartsWriter.WritePunctuation(dpw, "?");
                }
                displayPartsWriter.WritePunctuation(dpw, ": ");
            }
            {
                let callNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getCallOrNewExpression(node);
                if (!(callNode === undefined)) {
                    let flags__shadow_1 = 1074020384;
                    if (IsCallExpression__from_ast(callNode)) {
                        flags__shadow_1 = (flags__shadow_1 | 134217728) >>> 0;
                    }
                    const __gotots_callee_12 = writeSignatureClassified;
                    const __gotots_argument_29 = Checker__from_checker.GetResolvedSignature(c, callNode);
                    const __gotots_argument_30 = container;
                    const __gotots_argument_31 = flags__shadow_1;
                    (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
                }
                else {
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbolAtLocation(c, __go_symbol__shadow_1, node);
                    if (!(vc === undefined) && !(Type__from_checker.Symbol(t) === undefined) && !((Symbol__from_ast.$storageOf(((Type__from_checker.Symbol(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0) && !(Checker__from_checker.GetConstraintOfTypeParameter(c, t) === undefined)) {
                        if ((vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Level > 0) {
                            let expandVC: {
                                value: VerbosityContext__from_checker;
                            } | undefined = { value: new VerbosityContext__from_checker((vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Level - 1, (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MaxTruncationLength, false, false) };
                            displayPartsWriter.Write(dpw, typeParameterToString(c, t, container, expandVC));
                            (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity = (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity || (expandVC ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity;
                            (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated = (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated || (expandVC ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Truncated;
                        }
                        else {
                            const __gotots_callee_13 = writeTypeClassified;
                            const __gotots_argument_32 = t;
                            const __gotots_argument_33 = container;
                            const __gotots_argument_34 = typeFormatFlags$constant();
                            (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32, __gotots_argument_33, __gotots_argument_34);
                            (vc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CanIncreaseVerbosity = true;
                        }
                    }
                    else {
                        const __gotots_callee_14 = writeTypeClassified;
                        const __gotots_argument_35 = t;
                        const __gotots_argument_36 = container;
                        const __gotots_argument_37 = typeFormatFlags$constant();
                        (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35, __gotots_argument_36, __gotots_argument_37);
                    }
                }
            }
            const __gotots_callee_15 = setDeclaration;
            const __gotots_argument_38 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
        }
        if (!((flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_16 = writeNewLine;
            (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))();
            displayPartsWriter.WritePunctuation(dpw, "(");
            displayPartsWriter.Write(dpw, "enum member");
            displayPartsWriter.WritePunctuation(dpw, ") ");
            let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbol(c, __go_symbol__shadow_1);
            const __gotots_callee_17 = writeTypeClassified;
            const __gotots_argument_39 = t;
            const __gotots_argument_40 = container;
            const __gotots_argument_41 = typeFormatFlags$constant();
            (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41);
            if (!((Type__from_checker.Flags(t) & TypeFlagsLiteral$constant__from_checker()) >>> 0 === 0)) {
                displayPartsWriter.WriteOperator(dpw, " = ");
                displayPartsWriter.WriteLiteral(dpw, LiteralType__from_checker.String(Type__from_checker.AsLiteralType(t)));
            }
            const __gotots_callee_18 = setDeclaration;
            const __gotots_argument_42 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
        }
        if (!((flags & (8208)) >>> 0 === 0)) {
            let isMethod = !((flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0);
            let prefix = IfElse$string(isMethod, "method", "function ");
            if (IsIdentifier__from_ast(node) && (IsFunctionLikeDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsMethodSignatureDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) &&
                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node) && Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                const __gotots_callee_19 = setDeclaration;
                const __gotots_argument_43 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43);
                let signatures = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>([Checker__from_checker.GetSignatureFromDeclaration(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)]);
                const __gotots_callee_20 = writeSignatures;
                const __gotots_argument_44 = signatures;
                const __gotots_argument_45 = prefix;
                const __gotots_argument_46 = isMethod;
                const __gotots_argument_47 = __go_symbol__shadow_1;
                (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47);
            }
            else {
                let signatures = getSignaturesAtLocation(c, __go_symbol__shadow_1, SignatureKindCall$constant__from_checker(), node);
                if (signatures.length === 1) {
                    {
                        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Signature__from_checker.Declaration(signatures.get(0));
                        if (!(d === undefined) && (Node__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) {
                            const __gotots_callee_21 = setDeclaration;
                            const __gotots_argument_48 = d;
                            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
                        }
                    }
                }
                const __gotots_callee_22 = writeSignatures;
                const __gotots_argument_49 = signatures;
                const __gotots_argument_50 = prefix;
                const __gotots_argument_51 = isMethod;
                const __gotots_argument_52 = __go_symbol__shadow_1;
                (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
            }
            const __gotots_callee_23 = setDeclaration;
            const __gotots_argument_53 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53);
        }
        if (!((flags & (96)) >>> 0 === 0)) {
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast() || IsThisInTypeQuery__from_ast(node)) {
                const __gotots_callee_24 = writeNewLine;
                (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))();
                displayPartsWriter.WriteKeyword(dpw, "this");
            }
            else if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructorKeyword$constant__from_ast() && (IsConstructorDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsConstructSignatureDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
                const __gotots_callee_25 = setDeclaration;
                const __gotots_argument_54 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54);
                let signatures = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>([Checker__from_checker.GetSignatureFromDeclaration(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)]);
                const __gotots_callee_26 = writeSignatures;
                const __gotots_argument_55 = signatures;
                const __gotots_argument_56 = "constructor ";
                const __gotots_argument_57 = false;
                const __gotots_argument_58 = __go_symbol__shadow_1;
                (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
            }
            else {
                let signatures = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>();
                if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && !(getCallOrNewExpression(node) === undefined)) {
                    signatures = getSignaturesAtLocation(c, __go_symbol__shadow_1, SignatureKindConstruct$constant__from_checker(), node);
                }
                if (signatures.length === 1) {
                    {
                        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Signature__from_checker.Declaration(signatures.get(0));
                        if (!(d === undefined) && (Node__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) {
                            const __gotots_callee_27 = setDeclaration;
                            const __gotots_argument_59 = d;
                            (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59);
                        }
                    }
                    const __gotots_callee_28 = writeSignatures;
                    const __gotots_argument_60 = signatures;
                    const __gotots_argument_61 = "constructor ";
                    const __gotots_argument_62 = false;
                    const __gotots_argument_63 = __go_symbol__shadow_1;
                    (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63);
                }
                else {
                    const __gotots_callee_29 = writeNewLine;
                    (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))();
                    if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
                        let classExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol__shadow_1, KindClassExpression$constant__from_ast());
                        if (!(classExpression === undefined)) {
                            displayPartsWriter.WritePunctuation(dpw, "(");
                            displayPartsWriter.Write(dpw, "local class");
                            displayPartsWriter.WritePunctuation(dpw, ") ");
                        }
                        const __gotots_callee_30 = tryExpandSymbol;
                        const __gotots_argument_64 = __go_symbol__shadow_1;
                        const __gotots_argument_65 = flags;
                        if (!(__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_64, __gotots_argument_65)) {
                            if (classExpression === undefined) {
                                if (Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                                    return IsClassDeclaration__from_ast(d) && HasAbstractModifier__from_ast(d);
                                })) {
                                    displayPartsWriter.WriteKeyword(dpw, "abstract ");
                                }
                                displayPartsWriter.WriteKeyword(dpw, "class ");
                            }
                            const __gotots_callee_31 = writeSymbolClassified;
                            const __gotots_argument_66 = __go_symbol__shadow_1;
                            const __gotots_argument_67 = container;
                            const __gotots_argument_68 = SymbolFlagsNone$constant__from_ast();
                            const __gotots_argument_69 = symbolFormatFlags$constant();
                            (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
                            let params = InterfaceType__from_checker.LocalTypeParameters(Type__from_checker.AsInterfaceType(Checker__from_checker.GetDeclaredTypeOfSymbol(c, __go_symbol__shadow_1)));
                            const __gotots_callee_32 = writeTypeParams;
                            const __gotots_argument_70 = params;
                            (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70);
                        }
                    }
                    else {
                        const __gotots_callee_33 = tryExpandSymbol;
                        const __gotots_argument_71 = __go_symbol__shadow_1;
                        const __gotots_argument_72 = flags;
                        if (!(__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_71, __gotots_argument_72)) {
                            displayPartsWriter.WriteKeyword(dpw, "interface ");
                            const __gotots_callee_34 = writeSymbolClassified;
                            const __gotots_argument_73 = __go_symbol__shadow_1;
                            const __gotots_argument_74 = container;
                            const __gotots_argument_75 = SymbolFlagsNone$constant__from_ast();
                            const __gotots_argument_76 = symbolFormatFlags$constant();
                            (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_73, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76);
                            let params = InterfaceType__from_checker.LocalTypeParameters(Type__from_checker.AsInterfaceType(Checker__from_checker.GetDeclaredTypeOfSymbol(c, __go_symbol__shadow_1)));
                            const __gotots_callee_35 = writeTypeParams;
                            const __gotots_argument_77 = params;
                            (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_77);
                        }
                    }
                }
            }
            if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
                const __gotots_callee_36 = setDeclaration;
                const __gotots_argument_78 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78);
            }
            else {
                const __gotots_callee_37 = setDeclaration;
                const __gotots_argument_79 = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsInterfaceDeclaration__from_ast);
                (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_79);
            }
        }
        if (!((flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_38 = writeNewLine;
            (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_callee_39 = tryExpandSymbol;
            const __gotots_argument_80 = __go_symbol__shadow_1;
            const __gotots_argument_81 = flags;
            if (!(__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_80, __gotots_argument_81)) {
                if (Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return IsEnumDeclaration__from_ast(d) && IsEnumConst__from_ast(d);
                })) {
                    displayPartsWriter.WriteKeyword(dpw, "const ");
                }
                displayPartsWriter.WriteKeyword(dpw, "enum ");
                const __gotots_callee_40 = writeSymbolClassified;
                const __gotots_argument_82 = __go_symbol__shadow_1;
                const __gotots_argument_83 = container;
                const __gotots_argument_84 = SymbolFlagsNone$constant__from_ast();
                const __gotots_argument_85 = symbolFormatFlags$constant();
                (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85);
            }
            const __gotots_callee_41 = setDeclaration;
            const __gotots_argument_86 = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsEnumDeclaration__from_ast);
            (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86);
        }
        if (!((flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_42 = writeNewLine;
            (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_callee_43 = tryExpandSymbol;
            const __gotots_argument_87 = __go_symbol__shadow_1;
            const __gotots_argument_88 = flags;
            if (!(__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_87, __gotots_argument_88)) {
                let isModule = !(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && (IsSourceFile__from_ast(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) || IsAmbientModule__from_ast(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
                displayPartsWriter.WriteKeyword(dpw, IfElse$string(isModule, "module ", "namespace "));
                const __gotots_callee_44 = writeSymbolClassified;
                const __gotots_argument_89 = __go_symbol__shadow_1;
                const __gotots_argument_90 = container;
                const __gotots_argument_91 = SymbolFlagsNone$constant__from_ast();
                const __gotots_argument_92 = symbolFormatFlags$constant();
                (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92);
            }
            const __gotots_callee_45 = setDeclaration;
            const __gotots_argument_93 = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsModuleDeclaration__from_ast);
            (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_93);
        }
        if (!((flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_46 = writeNewLine;
            (__gotots_callee_46 ?? GoPanic.raiseRuntime("call of nil function"))();
            displayPartsWriter.WritePunctuation(dpw, "(");
            displayPartsWriter.Write(dpw, "type parameter");
            displayPartsWriter.WritePunctuation(dpw, ") ");
            let tp: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetDeclaredTypeOfSymbol(c, __go_symbol__shadow_1);
            const __gotots_callee_47 = writeSymbolClassified;
            const __gotots_argument_94 = __go_symbol__shadow_1;
            const __gotots_argument_95 = container;
            const __gotots_argument_96 = SymbolFlagsNone$constant__from_ast();
            const __gotots_argument_97 = symbolFormatFlags$constant();
            (__gotots_callee_47 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
            let cons: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetConstraintOfTypeParameter(c, tp);
            if (!(cons === undefined)) {
                displayPartsWriter.WriteKeyword(dpw, " extends ");
                const __gotots_callee_48 = writeTypeClassified;
                const __gotots_argument_98 = cons;
                const __gotots_argument_99 = container;
                const __gotots_argument_100 = typeFormatFlags$constant();
                (__gotots_callee_48 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_98, __gotots_argument_99, __gotots_argument_100);
            }
            if (!(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
                displayPartsWriter.WriteKeyword(dpw, " in ");
                const __gotots_callee_49 = writeSymbolClassified;
                const __gotots_argument_101 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent;
                const __gotots_argument_102 = container;
                const __gotots_argument_103 = SymbolFlagsNone$constant__from_ast();
                const __gotots_argument_104 = symbolFormatFlags$constant();
                (__gotots_callee_49 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_101, __gotots_argument_102, __gotots_argument_103, __gotots_argument_104);
                {
                    let parentType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetDeclaredTypeOfSymbol(c, Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
                    if (!(Type__from_checker.AsInterfaceType(parentType) === undefined)) {
                        let parentParams = InterfaceType__from_checker.LocalTypeParameters(Type__from_checker.AsInterfaceType(parentType));
                        const __gotots_callee_50 = writeTypeParams;
                        const __gotots_argument_105 = parentParams;
                        (__gotots_callee_50 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_105);
                    }
                }
            }
            else {
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol__shadow_1, KindTypeParameter$constant__from_ast());
                if (!(decl === undefined) && !(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    if (IsFunctionLike__from_ast(declaration)) {
                        displayPartsWriter.WriteKeyword(dpw, " in ");
                        if (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructSignature$constant__from_ast()) {
                            displayPartsWriter.WriteKeyword(dpw, "new ");
                        }
                        else if (!(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCallSignature$constant__from_ast()) && !(Node__from_ast.Name(declaration) === undefined)) {
                            const __gotots_callee_51 = writeSymbolClassified;
                            const __gotots_argument_106 = Node__from_ast.Symbol(declaration);
                            const __gotots_argument_107 = container;
                            const __gotots_argument_108 = SymbolFlagsNone$constant__from_ast();
                            const __gotots_argument_109 = symbolFormatFlags$constant();
                            (__gotots_callee_51 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_106, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109);
                        }
                        let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetSignatureFromDeclaration(c, declaration);
                        if (!(sig === undefined)) {
                            const __gotots_callee_52 = writeSignatureClassified;
                            const __gotots_argument_110 = sig;
                            const __gotots_argument_111 = container;
                            const __gotots_argument_112 = 1073758240;
                            (__gotots_callee_52 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_110, __gotots_argument_111, __gotots_argument_112);
                        }
                    }
                    else if (IsTypeAliasDeclaration__from_ast(declaration)) {
                        displayPartsWriter.WriteKeyword(dpw, " in ");
                        displayPartsWriter.WriteKeyword(dpw, "type ");
                        const __gotots_callee_53 = writeSymbolClassified;
                        const __gotots_argument_113 = Node__from_ast.Symbol(declaration);
                        const __gotots_argument_114 = container;
                        const __gotots_argument_115 = SymbolFlagsNone$constant__from_ast();
                        const __gotots_argument_116 = symbolFormatFlags$constant();
                        (__gotots_callee_53 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116);
                        {
                            let declSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(declaration);
                            if (!(declSymbol === undefined)) {
                                let taParams = Checker__from_checker.GetTypeAliasTypeParameters(c, declSymbol);
                                const __gotots_callee_54 = writeTypeParams;
                                const __gotots_argument_117 = taParams;
                                (__gotots_callee_54 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_117);
                            }
                        }
                    }
                }
            }
            const __gotots_callee_55 = setDeclaration;
            const __gotots_argument_118 = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsTypeParameterDeclaration__from_ast);
            (__gotots_callee_55 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_118);
        }
        if (!((flags & SymbolFlagsTypeAlias$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_56 = writeNewLine;
            (__gotots_callee_56 ?? GoPanic.raiseRuntime("call of nil function"))();
            displayPartsWriter.WriteKeyword(dpw, "type ");
            const __gotots_callee_57 = writeSymbolClassified;
            const __gotots_argument_119 = __go_symbol__shadow_1;
            const __gotots_argument_120 = container;
            const __gotots_argument_121 = SymbolFlagsNone$constant__from_ast();
            const __gotots_argument_122 = symbolFormatFlags$constant();
            (__gotots_callee_57 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122);
            const __gotots_callee_58 = writeTypeParams;
            const __gotots_argument_123 = Checker__from_checker.GetTypeAliasTypeParameters(c, __go_symbol__shadow_1);
            (__gotots_callee_58 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_123);
            displayPartsWriter.WriteOperator(dpw, " = ");
            let typeAliasType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
            if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsConstTypeReference__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                typeAliasType = Checker__from_checker.GetTypeAtLocation(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            else {
                typeAliasType = Checker__from_checker.GetDeclaredTypeOfSymbol(c, __go_symbol__shadow_1);
            }
            const __gotots_callee_59 = writeTypeClassified;
            const __gotots_argument_124 = typeAliasType;
            const __gotots_argument_125 = container;
            const __gotots_argument_126 = 1082146816;
            (__gotots_callee_59 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_124, __gotots_argument_125, __gotots_argument_126);
            const __gotots_callee_60 = setDeclaration;
            const __gotots_argument_127 = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsTypeOrJSTypeAliasDeclaration__from_ast);
            (__gotots_callee_60 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_127);
        }
        if (!((flags & SymbolFlagsSignature$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_callee_61 = writeNewLine;
            (__gotots_callee_61 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_callee_62 = writeTypeClassified;
            const __gotots_argument_128 = Checker__from_checker.GetTypeOfSymbol(c, __go_symbol__shadow_1);
            const __gotots_argument_129 = container;
            const __gotots_argument_130 = typeFormatFlags$constant();
            (__gotots_callee_62 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_128, __gotots_argument_129, __gotots_argument_130);
        }
    };
    const __gotots_callee_63 = writeSymbol;
    const __gotots_argument_131 = __go_symbol;
    (__gotots_callee_63 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_131);
    return new symbolDisplayInfo(dpw, firstDeclaration);
}
export function typeParameterToString(c: {
    value: Checker__from_checker;
} | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, vc: {
    value: VerbosityContext__from_checker;
} | undefined): gostring {
    return Checker__from_checker.TypeParameterToStringEx(c, t, enclosingDeclaration, vc);
}
export function getNodeForQuickInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return node;
    }
    if (IsNewExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && Node__from_ast.Pos(node) === Node__from_ast.Pos(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    if (IsNamedTupleMember__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && Node__from_ast.Pos(node) === Node__from_ast.Pos(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (IsImportMeta__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (IsJsxNamespacedName__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return node;
}
export function getSymbolAtLocationForQuickInfo(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    {
        let objectElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainingObjectLiteralElement(node);
        if (!(objectElement === undefined)) {
            {
                let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(c, Node__from_ast.$storageOf(((objectElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ContextFlagsNone$constant__from_checker());
                if (!(contextualType === undefined)) {
                    {
                        let properties = Checker__from_checker.GetPropertySymbolsFromContextualType(c, objectElement, contextualType, false);
                        if (properties.length === 1) {
                            return properties.get(0);
                        }
                    }
                }
            }
        }
    }
    return Checker__from_checker.GetSymbolAtLocation(c, node);
}
export function getSignaturesAtLocation(c: {
    value: Checker__from_checker;
} | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, kind: SignatureKind__from_checker, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    let signatures = Checker__from_checker.GetSignaturesOfType(c, Checker__from_checker.RemoveMissingOrUndefinedType(c, Checker__from_checker.GetTypeOfSymbol(c, __go_symbol)), kind);
    if (signatures.length > 1 || signatures.length === 1 && Signature__from_checker.TypeParameters(signatures.get(0)).length !== 0) {
        {
            let callNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getCallOrNewExpression(node);
            if (!(callNode === undefined)) {
                return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>([Checker__from_checker.GetResolvedSignature(c, callNode)]);
            }
        }
    }
    return signatures;
}
export function getCallOrNewExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsSourceFile__from_ast(node)) {
        return void 0;
    }
    if (IsPropertyAccessExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if ((IsCallExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsNewExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return void 0;
}
export function containsTypedefTag(jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((jsdoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDoc$constant__from_ast()) {
        {
            let tags: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsdoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags;
            if (!(tags === undefined)) {
                const __gotots_range_6 = NodeList__from_ast.$storageOf(((tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                    const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                    let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                    if (Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTypedefTag$constant__from_ast() || Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocCallbackTag$constant__from_ast()) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
export function getJSDoc(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return LastOrNil$PointerTo_Named_ast$Node(Node__from_ast.JSDoc(node, void 0));
}
export function getJSDocOrTag(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    {
        let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDoc(node);
        if (!(jsdoc === undefined)) {
            return jsdoc;
        }
    }
    __gotots_control_target_2: {
        if (IsParameterDeclaration__from_ast(node)) {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
            if (IsBindingPattern__from_ast(name)) {
                return getJSDocParameterTagByPosition(c, node);
            }
            return getMatchingJSDocTag(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Node__from_ast.Text(name), isMatchingParameterTag);
        }
        else if (IsTypeParameterDeclaration__from_ast(node)) {
            return getMatchingJSDocTag(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Node__from_ast.Text(Node__from_ast.Name(node)), isMatchingTemplateTag);
        }
        else if (IsVariableDeclaration__from_ast(node) && IsVariableDeclarationList__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
            tsonicTypeScriptRuntime.sameLocation(FirstOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes), node)) {
            return getJSDocOrTag(c, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        else if ((IsFunctionExpressionOrArrowFunction__from_ast(node) || IsClassExpression__from_ast(node)) && (IsVariableDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsPropertyDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsPropertyAssignment__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
            return getJSDocOrTag(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        else if (IsBindingElement__from_ast(node) && IsObjectBindingPattern__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyNameOrName(node);
                if (IsIdentifier__from_ast(name)) {
                    {
                        let objectType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(c, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        if (!(objectType === undefined)) {
                            {
                                let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(c, objectType, Node__from_ast.Text(name));
                                if (!(prop === undefined)) {
                                    const __gotots_range_4 = Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                                        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                                        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                                        {
                                            let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDoc(d);
                                            if (!(jsdoc === undefined)) {
                                                return jsdoc;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(node);
        if (!(__go_symbol === undefined) && !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
            if (IsFunctionDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node) || IsConstructorDeclaration__from_ast(node) || IsConstructSignatureDeclaration__from_ast(node)) {
                let firstSignature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsFunctionLike__from_ast);
                if (!(firstSignature === undefined) && !tsonicTypeScriptRuntime.sameLocation(node, firstSignature)) {
                    {
                        let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDocOrTag(c, firstSignature);
                        if (!(jsDoc === undefined)) {
                            return jsDoc;
                        }
                    }
                }
            }
            if (IsClassOrInterfaceLike__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                let isStatic = HasStaticModifier__from_ast(node);
                let classType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetDeclaredTypeOfSymbol(c, Node__from_ast.Symbol(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
                if (isStatic) {
                    let staticBaseType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetApparentType(c, Checker__from_checker.GetBaseConstructorTypeOfClass(c, classType));
                    {
                        let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(c, staticBaseType, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                        if (!(prop === undefined) && !(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
                            {
                                let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDocOrTag(c, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                                if (!(jsDoc === undefined)) {
                                    return jsDoc;
                                }
                            }
                        }
                    }
                }
                else {
                    const __gotots_range_5 = Checker__from_checker.GetBaseTypes(c, classType);
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                        let baseType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_5;
                        {
                            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(c, baseType, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                            if (!(prop === undefined) && !(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
                                {
                                    let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDocOrTag(c, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                                    if (!(jsDoc === undefined)) {
                                        return jsDoc;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return void 0;
}
export function getMatchingJSDocTag(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring, match: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: gostring) => bool) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    {
        let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDocOrTag(c, node);
        if (!(jsdoc === undefined) && Node__from_ast.$storageOf(((jsdoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDoc$constant__from_ast()) {
            {
                let tags: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsdoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags;
                if (!(tags === undefined)) {
                    const __gotots_range_9 = NodeList__from_ast.$storageOf(((tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
                        const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_9);
                        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                        const __gotots_callee_64 = match;
                        const __gotots_argument_132 = tag;
                        const __gotots_argument_133 = name;
                        if ((__gotots_callee_64 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_132, __gotots_argument_133)) {
                            return tag;
                        }
                    }
                }
            }
        }
    }
    return void 0;
}
export function getJSDocParameterTagByPosition(c: {
    value: Checker__from_checker;
} | undefined, param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (parent === undefined) {
        return void 0;
    }
    let params = Node__from_ast.Parameters(parent);
    let paramIndex = -1;
    const __gotots_range_7 = params;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_index_7;
        const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_7);
        let i = __gotots_range_value_7;
        let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
        if (tsonicTypeScriptRuntime.sameLocation((void Node__from_ast.AsNode,
            p), param)) {
            paramIndex = i;
            break;
        }
    }
    if (paramIndex < 0) {
        return void 0;
    }
    let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getJSDocOrTag(c, parent);
    if (jsdoc === undefined || !(Node__from_ast.$storageOf(((jsdoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDoc$constant__from_ast())) {
        return void 0;
    }
    let tags: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsdoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags;
    if (tags === undefined) {
        return void 0;
    }
    let paramTagIndex = 0;
    const __gotots_range_8 = NodeList__from_ast.$storageOf(((tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
        if (Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocParameterTag$constant__from_ast()) {
            if (paramTagIndex === paramIndex) {
                return tag;
            }
            paramTagIndex++;
        }
    }
    return void 0;
}
export function isMatchingParameterTag(tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
    return Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocParameterTag$constant__from_ast() && isNodeWithName(tag, name);
}
export function isMatchingTemplateTag(tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
    return Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTemplateTag$constant__from_ast() && Some$PointerTo_Named_ast$Node(Node__from_ast.TypeParameters(tag), (tp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return isNodeWithName(tp, name);
    });
}
export function isNodeWithName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
    let nodeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
    return IsIdentifier__from_ast(nodeName) && Node__from_ast.Text(nodeName) === name;
}
export function writeCode(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, lang: gostring, code: gostring): void {
    if (code === "") {
        return;
    }
    let ticks = 3;
    for (; strings__from_gostdlib.Contains(code, strings__from_gostdlib.Repeat("`", BigInt.asIntN(64, goNumberToBigInt(ticks))));) {
        ticks++;
    }
    const __gotots_range_0 = ticks;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
        const __gotots_receiver_0 = b;
        strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 96);
    }
    const __gotots_receiver_1 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, lang);
    const __gotots_receiver_2 = b;
    strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_2 === void 0 ? void 0 :
        (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 10);
    const __gotots_receiver_3 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3 === void 0 ? void 0 :
        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, code);
    const __gotots_receiver_4 = b;
    strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_4 === void 0 ? void 0 :
        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 10);
    const __gotots_range_1 = ticks;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
        const __gotots_receiver_5 = b;
        strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_5 === void 0 ? void 0 :
            (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 96);
    }
    const __gotots_receiver_6 = b;
    strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_6 === void 0 ? void 0 :
        (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 10);
}
export function trimCommentPrefix(text: gostring): gostring {
    return strings__from_gostdlib.TrimLeft(strings__from_gostdlib.TrimPrefix(strings__from_gostdlib.TrimLeft(text, " "), "|"), " ");
}
export function writeMarkdownLink(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, text: gostring, uri: gostring, quote__shadow_1: bool): void {
    const __gotots_receiver_12 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_12 === void 0 ? void 0 :
        (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "[");
    writeQuotedString(b, text, quote__shadow_1);
    const __gotots_receiver_13 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_13 === void 0 ? void 0 :
        (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "](");
    const __gotots_receiver_14 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_14 === void 0 ? void 0 :
        (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, uri);
    const __gotots_receiver_15 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_15 === void 0 ? void 0 :
        (__gotots_receiver_15 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, ")");
}
export function writeOptionalEntityName(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    if (!(name === undefined)) {
        const __gotots_receiver_7 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_7 === void 0 ? void 0 :
            (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, " ");
        writeQuotedString(b, getEntityNameString(name), true);
    }
}
export function writeQuotedString(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, str: gostring, quote__shadow_1: bool): void {
    if (quote__shadow_1 && !strings__from_gostdlib.Contains(str, "`")) {
        const __gotots_receiver_8 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_8 === void 0 ? void 0 :
            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "`");
        const __gotots_receiver_9 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_9 === void 0 ? void 0 :
            (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, str);
        const __gotots_receiver_10 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_10 === void 0 ? void 0 :
            (__gotots_receiver_10 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "`");
    }
    else {
        const __gotots_receiver_11 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_11 === void 0 ? void 0 :
            (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, str);
    }
}
export function getEntityNameString(name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next2 => b = b$next2);
    writeEntityNameParts(b$location2, name);
    return strings__from_gostdlib.Builder.String(b);
}
export function writeEntityNameParts(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast(): {
            const __gotots_receiver_16 = b;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_16 === void 0 ? void 0 :
                (__gotots_receiver_16 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, Node__from_ast.Text(node));
            break;
        }
        case KindQualifiedName$constant__from_ast(): {
            writeEntityNameParts(b, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left);
            const __gotots_receiver_17 = b;
            strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_17 === void 0 ? void 0 :
                (__gotots_receiver_17 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 46);
            writeEntityNameParts(b, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right);
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast(): {
            writeEntityNameParts(b, Node__from_ast.Expression(node));
            const __gotots_receiver_18 = b;
            strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_18 === void 0 ? void 0 :
                (__gotots_receiver_18 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 46);
            writeEntityNameParts(b, Node__from_ast.Name(node));
            break;
        }
        case KindParenthesizedExpression$constant__from_ast():
        case KindExpressionWithTypeArguments$constant__from_ast(): {
            writeEntityNameParts(b, Node__from_ast.Expression(node));
            break;
        }
        case KindJSDocNameReference$constant__from_ast(): {
            writeEntityNameParts(b, Node__from_ast.Name(node));
            break;
        }
    }
}
