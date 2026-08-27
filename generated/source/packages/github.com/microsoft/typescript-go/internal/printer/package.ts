import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { gostring, int32 } from "@gotots/runtime/scalars.js";
import { NewEmitContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import { EFCustomPrologue$constant, EFExportName$constant, EFExternalHelpers$constant, EFHelperName$constant, EFIndented$constant, EFIndirectCall$constant, EFLocalName$constant, EFMultiLine$constant, EFNoAsciiEscaping$constant, EFNoComments$constant, EFNoIndentation$constant, EFNoLeadingComments$constant, EFNoLeadingSourceMap$constant, EFNoLexicalArguments$constant, EFNoLexicalThis$constant, EFNoNestedComments$constant, EFNoNestedSourceMaps$constant, EFNoSourceMap$constant, EFNoTokenLeadingSourceMaps$constant, EFNoTokenTrailingSourceMaps$constant, EFNoTrailingComments$constant, EFNoTrailingSourceMap$constant, EFNone$constant, EFReuseTempVariableScope$constant, EFSingleLine$constant, EFStartOnNewLine$constant, EFTransformPrivateStaticElements$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitflags.js";
import { SymbolAccessibilityAccessible$constant, SymbolAccessibilityCannotBeNamed$constant, SymbolAccessibilityNotAccessible$constant, SymbolAccessibilityNotResolved$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitresolver.js";
import { PrivateIdentifierKindAccessor$constant, PrivateIdentifierKindField$constant, PrivateIdentifierKindMethod$constant, PrivateIdentifierKindUntransformed$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/factory.js";
import { EmitHelper, Priority } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import { LFAllowTrailingComma$constant, LFAmpersandDelimited$constant, LFAngleBrackets$constant, LFArrayBindingPatternElements$constant, LFArrayLiteralExpressionElements$constant, LFAsteriskDelimited$constant, LFBarDelimited$constant, LFBraces$constant, LFBracketsMask$constant, LFCallExpressionArguments$constant, LFCaseBlockClauses$constant, LFCaseOrDefaultClauseStatements$constant, LFClassHeritageClauses$constant, LFClassMembers$constant, LFCommaDelimited$constant, LFDecorators$constant, LFDelimitersMask$constant, LFEnumMembers$constant, LFHeritageClauseTypes$constant, LFHeritageClauses$constant, LFImportAttributes$constant, LFIndented$constant, LFIndexSignatureParameters$constant, LFInterfaceMembers$constant, LFIntersectionTypeConstituents$constant, LFJsxElementAttributes$constant, LFJsxElementOrFragmentChildren$constant, LFModifiers$constant, LFMultiLine$constant, LFMultiLineBlockStatements$constant, LFMultiLineFunctionBodyStatements$constant, LFMultiLineTupleTypeElements$constant, LFMultiLineTypeLiteralMembers$constant, LFNamedImportsOrExportsElements$constant, LFNewExpressionArguments$constant, LFNoInterveningComments$constant, LFNoSpaceIfEmpty$constant, LFNoTrailingNewLine$constant, LFNone$constant, LFObjectBindingPatternElements$constant, LFObjectLiteralExpressionProperties$constant, LFOptionalIfEmpty$constant, LFOptionalIfNil$constant, LFParameters$constant, LFParenthesis$constant, LFPreferNewLine$constant, LFPreserveLines$constant, LFSingleArrowParameter$constant, LFSingleLine$constant, LFSingleLineBlockStatements$constant, LFSingleLineFunctionBodyStatements$constant, LFSingleLineTupleTypeElements$constant, LFSingleLineTypeLiteralMembers$constant, LFSpaceBetweenBraces$constant, LFSpaceBetweenSiblings$constant, LFSquareBrackets$constant, LFTemplateExpressionSpans$constant, LFTypeArguments$constant, LFTypeParameters$constant, LFUnionTypeConstituents$constant, LFVariableDeclarationList$constant, WriteKindComment$constant, WriteKindKeyword$constant, WriteKindLiteral$constant, WriteKindNone$constant, WriteKindOperator$constant, WriteKindParameter$constant, WriteKindProperty$constant, WriteKindPunctuation$constant, WriteKindStringLiteral$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import { singleLineStringWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/singlelinestringwriter.js";
import { textWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/textwriter.js";
import { QuoteCharBacktick$constant, QuoteCharDoubleQuote$constant, QuoteCharSingleQuote$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/utilities.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$singleLineStringWriter, $goInterfaceAdapter$PointerTo_Named_printer$EmitContext as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $state } from "./state.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    EFCustomPrologue = EFCustomPrologue$constant();
    EFExportName = EFExportName$constant();
    EFExternalHelpers = EFExternalHelpers$constant();
    EFHelperName = EFHelperName$constant();
    EFIndented = EFIndented$constant();
    EFIndirectCall = EFIndirectCall$constant();
    EFLocalName = EFLocalName$constant();
    EFMultiLine = EFMultiLine$constant();
    EFNoAsciiEscaping = EFNoAsciiEscaping$constant();
    EFNoComments = EFNoComments$constant();
    EFNoIndentation = EFNoIndentation$constant();
    EFNoLeadingComments = EFNoLeadingComments$constant();
    EFNoLeadingSourceMap = EFNoLeadingSourceMap$constant();
    EFNoLexicalArguments = EFNoLexicalArguments$constant();
    EFNoLexicalThis = EFNoLexicalThis$constant();
    EFNoNestedComments = EFNoNestedComments$constant();
    EFNoNestedSourceMaps = EFNoNestedSourceMaps$constant();
    EFNoSourceMap = EFNoSourceMap$constant();
    EFNoTokenLeadingSourceMaps = EFNoTokenLeadingSourceMaps$constant();
    EFNoTokenTrailingSourceMaps = EFNoTokenTrailingSourceMaps$constant();
    EFNoTrailingComments = EFNoTrailingComments$constant();
    EFNoTrailingSourceMap = EFNoTrailingSourceMap$constant();
    EFNone = EFNone$constant();
    EFReuseTempVariableScope = EFReuseTempVariableScope$constant();
    EFSingleLine = EFSingleLine$constant();
    EFStartOnNewLine = EFStartOnNewLine$constant();
    EFTransformPrivateStaticElements = EFTransformPrivateStaticElements$constant();
    LFAllowTrailingComma = LFAllowTrailingComma$constant();
    LFAmpersandDelimited = LFAmpersandDelimited$constant();
    LFAngleBrackets = LFAngleBrackets$constant();
    LFArrayBindingPatternElements = LFArrayBindingPatternElements$constant();
    LFArrayLiteralExpressionElements = LFArrayLiteralExpressionElements$constant();
    LFAsteriskDelimited = LFAsteriskDelimited$constant();
    LFBarDelimited = LFBarDelimited$constant();
    LFBraces = LFBraces$constant();
    LFBracketsMask = LFBracketsMask$constant();
    LFCallExpressionArguments = LFCallExpressionArguments$constant();
    LFCaseBlockClauses = LFCaseBlockClauses$constant();
    LFCaseOrDefaultClauseStatements = LFCaseOrDefaultClauseStatements$constant();
    LFClassHeritageClauses = LFClassHeritageClauses$constant();
    LFClassMembers = LFClassMembers$constant();
    LFCommaDelimited = LFCommaDelimited$constant();
    LFDecorators = LFDecorators$constant();
    LFDelimitersMask = LFDelimitersMask$constant();
    LFEnumMembers = LFEnumMembers$constant();
    LFHeritageClauseTypes = LFHeritageClauseTypes$constant();
    LFHeritageClauses = LFHeritageClauses$constant();
    LFImportAttributes = LFImportAttributes$constant();
    LFIndented = LFIndented$constant();
    LFIndexSignatureParameters = LFIndexSignatureParameters$constant();
    LFInterfaceMembers = LFInterfaceMembers$constant();
    LFIntersectionTypeConstituents = LFIntersectionTypeConstituents$constant();
    LFJsxElementAttributes = LFJsxElementAttributes$constant();
    LFJsxElementOrFragmentChildren = LFJsxElementOrFragmentChildren$constant();
    LFModifiers = LFModifiers$constant();
    LFMultiLine = LFMultiLine$constant();
    LFMultiLineBlockStatements = LFMultiLineBlockStatements$constant();
    LFMultiLineFunctionBodyStatements = LFMultiLineFunctionBodyStatements$constant();
    LFMultiLineTupleTypeElements = LFMultiLineTupleTypeElements$constant();
    LFMultiLineTypeLiteralMembers = LFMultiLineTypeLiteralMembers$constant();
    LFNamedImportsOrExportsElements = LFNamedImportsOrExportsElements$constant();
    LFNewExpressionArguments = LFNewExpressionArguments$constant();
    LFNoInterveningComments = LFNoInterveningComments$constant();
    LFNoSpaceIfEmpty = LFNoSpaceIfEmpty$constant();
    LFNoTrailingNewLine = LFNoTrailingNewLine$constant();
    LFNone = LFNone$constant();
    LFObjectBindingPatternElements = LFObjectBindingPatternElements$constant();
    LFObjectLiteralExpressionProperties = LFObjectLiteralExpressionProperties$constant();
    LFOptionalIfEmpty = LFOptionalIfEmpty$constant();
    LFOptionalIfNil = LFOptionalIfNil$constant();
    LFParameters = LFParameters$constant();
    LFParenthesis = LFParenthesis$constant();
    LFPreferNewLine = LFPreferNewLine$constant();
    LFPreserveLines = LFPreserveLines$constant();
    LFSingleArrowParameter = LFSingleArrowParameter$constant();
    LFSingleLine = LFSingleLine$constant();
    LFSingleLineBlockStatements = LFSingleLineBlockStatements$constant();
    LFSingleLineFunctionBodyStatements = LFSingleLineFunctionBodyStatements$constant();
    LFSingleLineTupleTypeElements = LFSingleLineTupleTypeElements$constant();
    LFSingleLineTypeLiteralMembers = LFSingleLineTypeLiteralMembers$constant();
    LFSpaceBetweenBraces = LFSpaceBetweenBraces$constant();
    LFSpaceBetweenSiblings = LFSpaceBetweenSiblings$constant();
    LFSquareBrackets = LFSquareBrackets$constant();
    LFTemplateExpressionSpans = LFTemplateExpressionSpans$constant();
    LFTypeArguments = LFTypeArguments$constant();
    LFTypeParameters = LFTypeParameters$constant();
    LFUnionTypeConstituents = LFUnionTypeConstituents$constant();
    LFVariableDeclarationList = LFVariableDeclarationList$constant();
    PrivateIdentifierKindAccessor = PrivateIdentifierKindAccessor$constant();
    PrivateIdentifierKindField = PrivateIdentifierKindField$constant();
    PrivateIdentifierKindMethod = PrivateIdentifierKindMethod$constant();
    PrivateIdentifierKindUntransformed = PrivateIdentifierKindUntransformed$constant();
    QuoteCharBacktick = QuoteCharBacktick$constant();
    QuoteCharDoubleQuote = QuoteCharDoubleQuote$constant();
    QuoteCharSingleQuote = QuoteCharSingleQuote$constant();
    SymbolAccessibilityAccessible = SymbolAccessibilityAccessible$constant();
    SymbolAccessibilityCannotBeNamed = SymbolAccessibilityCannotBeNamed$constant();
    SymbolAccessibilityNotAccessible = SymbolAccessibilityNotAccessible$constant();
    SymbolAccessibilityNotResolved = SymbolAccessibilityNotResolved$constant();
    WriteKindComment = WriteKindComment$constant();
    WriteKindKeyword = WriteKindKeyword$constant();
    WriteKindLiteral = WriteKindLiteral$constant();
    WriteKindNone = WriteKindNone$constant();
    WriteKindOperator = WriteKindOperator$constant();
    WriteKindParameter = WriteKindParameter$constant();
    WriteKindProperty = WriteKindProperty$constant();
    WriteKindPunctuation = WriteKindPunctuation$constant();
    WriteKindStringLiteral = WriteKindStringLiteral$constant();
    $state.AdvancedAsyncSuperHelper = void 0;
    $state.AsyncSuperHelper = void 0;
    $state.addDisposableResourceHelper = void 0;
    $state.asyncDelegatorHelper = void 0;
    $state.asyncGeneratorHelper = void 0;
    $state.asyncValuesHelper = void 0;
    $state.awaitHelper = void 0;
    $state.awaiterHelper = void 0;
    $state.classPrivateFieldGetHelper = void 0;
    $state.classPrivateFieldInHelper = void 0;
    $state.classPrivateFieldSetHelper = void 0;
    $state.createBindingHelper = void 0;
    $state.decorateHelper = void 0;
    $state.disposeResourcesHelper = void 0;
    $state.emitContextPool = named_sync.SyncPoolOperations.$zero();
    $state.esDecorateHelper = void 0;
    $state.escapedCharsMap = GoMap.nil<int32, gostring>("");
    $state.exportStarHelper = void 0;
    $state.importDefaultHelper = void 0;
    $state.importStarHelper = void 0;
    $state.jsxEscapedCharsMap = GoMap.nil<int32, gostring>("");
    $state.makeTemplateObjectHelper = void 0;
    $state.metadataHelper = void 0;
    $state.nextAutoGenerateId = named_sync_atomic.SyncAtomicUint32Operations.$zero();
    $state.paramHelper = void 0;
    $state.propKeyHelper = void 0;
    $state.restHelper = void 0;
    $state.rewriteRelativeImportExtensionsHelper = void 0;
    $state.runInitializersHelper = void 0;
    $state.setFunctionNameHelper = void 0;
    $state.setModuleDefaultHelper = void 0;
    $state.singleLineStringWriterPool = named_sync.SyncPoolOperations.$zero();
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter(NewEmitContext());
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.emitContextPool = __gotots_struct_0;
    }
    {
        $state.decorateHelper =
            { value: new EmitHelper("typescript:decorate", false, "var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};", void 0, { value: new Priority(2) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__decorate") };
    }
    {
        $state.metadataHelper =
            { value: new EmitHelper("typescript:metadata", false, "var __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};", void 0, { value: new Priority(3) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__metadata") };
    }
    {
        $state.paramHelper =
            { value: new EmitHelper("typescript:param", false, "var __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};", void 0, { value: new Priority(4) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__param") };
    }
    {
        $state.addDisposableResourceHelper =
            { value: new EmitHelper("typescript:addDisposableResource", false, "var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {\n    if (value !== null && value !== void 0) {\n        if (typeof value !== \"object\" && typeof value !== \"function\") throw new TypeError(\"Object expected.\");\n        var dispose, inner;\n        if (async) {\n            if (!Symbol.asyncDispose) throw new TypeError(\"Symbol.asyncDispose is not defined.\");\n            dispose = value[Symbol.asyncDispose];\n        }\n        if (dispose === void 0) {\n            if (!Symbol.dispose) throw new TypeError(\"Symbol.dispose is not defined.\");\n            dispose = value[Symbol.dispose];\n            if (async) inner = dispose;\n        }\n        if (typeof dispose !== \"function\") throw new TypeError(\"Object not disposable.\");\n        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };\n        env.stack.push({ value: value, dispose: dispose, async: async });\n    }\n    else if (async) {\n        env.stack.push({ async: true });\n    }\n    return value;\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__addDisposableResource") };
    }
    {
        $state.disposeResourcesHelper =
            { value: new EmitHelper("typescript:disposeResources", false, "var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {\n    return function (env) {\n        function fail(e) {\n            env.error = env.hasError ? new SuppressedError(e, env.error, \"An error was suppressed during disposal.\") : e;\n            env.hasError = true;\n        }\n        var r, s = 0;\n        function next() {\n            while (r = env.stack.pop()) {\n                try {\n                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);\n                    if (r.dispose) {\n                        var result = r.dispose.call(r.value);\n                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });\n                    }\n                    else s |= 1;\n                }\n                catch (e) {\n                    fail(e);\n                }\n            }\n            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();\n            if (env.hasError) throw env.error;\n        }\n        return next();\n    };\n})(typeof SuppressedError === \"function\" ? SuppressedError : function (error, suppressed, message) {\n    var e = new Error(message);\n    return e.name = \"SuppressedError\", e.error = error, e.suppressed = suppressed, e;\n});", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__disposeResources") };
    }
    {
        $state.classPrivateFieldGetHelper =
            { value: new EmitHelper("typescript:classPrivateFieldGet", false, "var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__classPrivateFieldGet") };
    }
    {
        $state.classPrivateFieldSetHelper =
            { value: new EmitHelper("typescript:classPrivateFieldSet", false, "var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {\n    if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n    return (kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__classPrivateFieldSet") };
    }
    {
        $state.classPrivateFieldInHelper =
            { value: new EmitHelper("typescript:classPrivateFieldIn", false, "var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {\n    if (receiver === null || (typeof receiver !== \"object\" && typeof receiver !== \"function\")) throw new TypeError(\"Cannot use 'in' operator on non-object\");\n    return typeof state === \"function\" ? receiver === state : state.has(receiver);\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__classPrivateFieldIn") };
    }
    {
        $state.awaitHelper =
            { value: new EmitHelper("typescript:await", false, "var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__await") };
    }
    {
        $state.asyncGeneratorHelper =
            { value: new EmitHelper("typescript:asyncGenerator", false, "var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\n    var g = generator.apply(thisArg, _arguments || []), i, q = [];\n    return i = Object.create((typeof AsyncIterator === \"function\" ? AsyncIterator : Object).prototype), verb(\"next\"), verb(\"throw\"), verb(\"return\", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;\n    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }\n    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }\n    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }\n    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }\n    function fulfill(value) { resume(\"next\", value); }\n    function reject(value) { resume(\"throw\", value); }\n    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }\n};", void 0, void 0, RuntimeSlice.literal<{
                    value: EmitHelper;
                } | undefined>([$state.awaitHelper]), "__asyncGenerator") };
    }
    {
        $state.asyncDelegatorHelper =
            { value: new EmitHelper("typescript:asyncDelegator", false, "var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {\n    var i, p;\n    return i = {}, verb(\"next\"), verb(\"throw\", function (e) { throw e; }), verb(\"return\"), i[Symbol.iterator] = function () { return this; }, i;\n    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }\n};", void 0, void 0, RuntimeSlice.literal<{
                    value: EmitHelper;
                } | undefined>([$state.awaitHelper]), "__asyncDelegator") };
    }
    {
        $state.asyncValuesHelper =
            { value: new EmitHelper("typescript:asyncValues", false, "var __asyncValues = (this && this.__asyncValues) || function (o) {\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\n    var m = o[Symbol.asyncIterator], i;\n    return m ? m.call(o) : (o = typeof __values === \"function\" ? __values(o) : o[Symbol.iterator](), i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i);\n    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }\n    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__asyncValues") };
    }
    {
        $state.restHelper =
            { value: new EmitHelper("typescript:rest", false, "var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__rest") };
    }
    {
        $state.awaiterHelper =
            { value: new EmitHelper("typescript:awaiter", false, "var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};", void 0, { value: new Priority(5) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__awaiter") };
    }
    {
        $state.AsyncSuperHelper =
            { value: new EmitHelper("typescript:async-super", true, "", (makeUniqueName: (($0: gostring) => gostring) | undefined): gostring => {
                    const __gotots_binary_operand_0 = "\nconst ";
                    const __gotots_callee_1 = makeUniqueName;
                    const __gotots_argument_0 = "_superIndex";
                    const __gotots_binary_operand_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                    const __gotots_binary_operand_2 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
                    const __gotots_binary_operand_3 = " = name => super[name];";
                    return __gotots_binary_operand_2 + __gotots_binary_operand_3;
                }, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "") };
    }
    {
        $state.AdvancedAsyncSuperHelper =
            { value: new EmitHelper("typescript:advanced-async-super", true, "", (makeUniqueName: (($0: gostring) => gostring) | undefined): gostring => {
                    const __gotots_binary_operand_4 = "\nconst ";
                    const __gotots_callee_2 = makeUniqueName;
                    const __gotots_argument_1 = "_superIndex";
                    const __gotots_binary_operand_5 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                    const __gotots_binary_operand_6 = __gotots_binary_operand_4 + __gotots_binary_operand_5;
                    const __gotots_binary_operand_7 = " = (function (geti, seti) {\n";
                    const __gotots_binary_operand_8 = __gotots_binary_operand_6 + __gotots_binary_operand_7;
                    const __gotots_binary_operand_9 = "    const cache = Object.create(null);\n";
                    const __gotots_binary_operand_10 = __gotots_binary_operand_8 + __gotots_binary_operand_9;
                    const __gotots_binary_operand_11 = "    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });\n";
                    const __gotots_binary_operand_12 = __gotots_binary_operand_10 + __gotots_binary_operand_11;
                    const __gotots_binary_operand_13 = "})(name => super[name], (name, value) => super[name] = value);";
                    return __gotots_binary_operand_12 + __gotots_binary_operand_13;
                }, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "") };
    }
    {
        $state.esDecorateHelper =
            { value: new EmitHelper("typescript:esDecorate", false, "var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {\n    function accept(f) { if (f !== void 0 && typeof f !== \"function\") throw new TypeError(\"Function expected\"); return f; }\n    var kind = contextIn.kind, key = kind === \"getter\" ? \"get\" : kind === \"setter\" ? \"set\" : \"value\";\n    var target = !descriptorIn && ctor ? contextIn[\"static\"] ? ctor : ctor.prototype : null;\n    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});\n    var _, done = false;\n    for (var i = decorators.length - 1; i >= 0; i--) {\n        var context = {};\n        for (var p in contextIn) context[p] = p === \"access\" ? {} : contextIn[p];\n        for (var p in contextIn.access) context.access[p] = contextIn.access[p];\n        context.addInitializer = function (f) { if (done) throw new TypeError(\"Cannot add initializers after decoration has completed\"); extraInitializers.push(accept(f || null)); };\n        var result = (0, decorators[i])(kind === \"accessor\" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);\n        if (kind === \"accessor\") {\n            if (result === void 0) continue;\n            if (result === null || typeof result !== \"object\") throw new TypeError(\"Object expected\");\n            if (_ = accept(result.get)) descriptor.get = _;\n            if (_ = accept(result.set)) descriptor.set = _;\n            if (_ = accept(result.init)) initializers.unshift(_);\n        }\n        else if (_ = accept(result)) {\n            if (kind === \"field\") initializers.unshift(_);\n            else descriptor[key] = _;\n        }\n    }\n    if (target) Object.defineProperty(target, contextIn.name, descriptor);\n    done = true;\n};", void 0, { value: new Priority(2) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__esDecorate") };
    }
    {
        $state.runInitializersHelper =
            { value: new EmitHelper("typescript:runInitializers", false, "var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {\n    var useValue = arguments.length > 2;\n    for (var i = 0; i < initializers.length; i++) {\n        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);\n    }\n    return useValue ? value : void 0;\n};", void 0, { value: new Priority(2) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__runInitializers") };
    }
    {
        $state.makeTemplateObjectHelper =
            { value: new EmitHelper("typescript:makeTemplateObject", false, "var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\n    return cooked;\n};", void 0, { value: new Priority(0) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__makeTemplateObject") };
    }
    {
        $state.propKeyHelper =
            { value: new EmitHelper("typescript:propKey", false, "var __propKey = (this && this.__propKey) || function (x) {\n    return typeof x === \"symbol\" ? x : \"\".concat(x);\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__propKey") };
    }
    {
        $state.setFunctionNameHelper =
            { value: new EmitHelper("typescript:setFunctionName", false, "var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {\n    if (typeof name === \"symbol\") name = name.description ? \"[\".concat(name.description, \"]\") : \"\";\n    return Object.defineProperty(f, \"name\", { configurable: true, value: prefix ? \"\".concat(prefix, \" \", name) : name });\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__setFunctionName") };
    }
    {
        $state.createBindingHelper =
            { value: new EmitHelper("typescript:commonjscreatebinding", false, "var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));", void 0, { value: new Priority(1) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__createBinding") };
    }
    {
        $state.setModuleDefaultHelper =
            { value: new EmitHelper("typescript:commonjscreatevalue", false, "var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});", void 0, { value: new Priority(1) }, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__setModuleDefault") };
    }
    {
        $state.importStarHelper =
            { value: new EmitHelper("typescript:commonjsimportstar", false, "var __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();", void 0, { value: new Priority(2) }, RuntimeSlice.literal<{
                    value: EmitHelper;
                } | undefined>([$state.createBindingHelper, $state.setModuleDefaultHelper]), "__importStar") };
    }
    {
        $state.importDefaultHelper =
            { value: new EmitHelper("typescript:commonjsimportdefault", false, "var __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__importDefault") };
    }
    {
        $state.exportStarHelper =
            { value: new EmitHelper("typescript:export-star", false, "var __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};", void 0, { value: new Priority(2) }, RuntimeSlice.literal<{
                    value: EmitHelper;
                } | undefined>([$state.createBindingHelper]), "__exportStar") };
    }
    {
        $state.rewriteRelativeImportExtensionsHelper =
            { value: new EmitHelper("typescript:rewriteRelativeImportExtensions", false, "var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {\n    if (typeof path === \"string\" && /^\\.\\.?\\//.test(path)) {\n        return path.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+?)?)\\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {\n            return tsx ? preserveJsx ? \".jsx\" : \".js\" : d && (!ext || !cm) ? m : (d + ext + \".\" + cm.toLowerCase() + \"js\");\n        });\n    }\n    return path;\n};", void 0, void 0, RuntimeSlice.nil<{
                    value: EmitHelper;
                } | undefined>(), "__rewriteRelativeImportExtension") };
    }
    {
        const __gotots_field_1 = (): GoInterface | undefined => {
            return new $goInterfaceAdapter$PointerTo_Named_printer$singleLineStringWriter({ value: new singleLineStringWriter(named_strings.StringsBuilderOperations.$zero(), "") });
        };
        const __gotots_struct_1 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_1.New = __gotots_field_1;
        $state.singleLineStringWriterPool = __gotots_struct_1;
    }
    {
        new singleLineStringWriter(named_strings.StringsBuilderOperations.$zero(), "");
    }
    {
        new textWriter("", 0, named_strings.StringsBuilderOperations.$zero(), "", 0, false, 0, 0, false);
    }
    {
        $state.jsxEscapedCharsMap = GoMap.make<int32, gostring>("", 2, [[34, "&quot;"], [39, "&apos;"]]);
    }
    {
        $state.escapedCharsMap = GoMap.make<int32, gostring>("", 14, [[9, "\\t"], [11, "\\v"], [12, "\\f"], [8, "\\b"], [13, "\\r"], [10, "\\n"], [92, "\\\\"], [34, "\\\""], [39, "\\'"], [96, "\\`"], [36, "\\$"], [8232, "\\u2028"], [8233, "\\u2029"], [133, "\\u0085"]]);
    }
}
export { ChangeTrackerWriter, NewChangeTrackerWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/changetrackerwriter.js";
export { AutoGenerateId, AutoGenerateInfo, AutoGenerateOptions, EmitContext, GetEmitContext, NewEmitContext, SynthesizedComment, SynthesizedComment$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
export { EFCustomPrologue$constant, EFExportName$constant, EFExternalHelpers$constant, EFHelperName$constant, EFIndented$constant, EFIndirectCall$constant, EFLocalName$constant, EFMultiLine$constant, EFNoAsciiEscaping$constant, EFNoComments$constant, EFNoIndentation$constant, EFNoLeadingComments$constant, EFNoLeadingSourceMap$constant, EFNoLexicalArguments$constant, EFNoLexicalThis$constant, EFNoNestedComments$constant, EFNoNestedSourceMaps$constant, EFNoSourceMap$constant, EFNoTokenLeadingSourceMaps$constant, EFNoTokenTrailingSourceMaps$constant, EFNoTrailingComments$constant, EFNoTrailingSourceMap$constant, EFNone$constant, EFReuseTempVariableScope$constant, EFSingleLine$constant, EFStartOnNewLine$constant, EFTransformPrivateStaticElements$constant, EmitFlags } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitflags.js";
export { EmitHost, EmitHost$contract, EmitHost$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emithost.js";
export { EmitResolver, EmitResolver$contract, EmitResolver$is, SymbolAccessibility, SymbolAccessibilityAccessible$constant, SymbolAccessibilityCannotBeNamed$constant, SymbolAccessibilityNotAccessible$constant, SymbolAccessibilityNotResolved$constant, SymbolAccessibilityResult, TypeReferenceSerializationKind, TypeReferenceSerializationKindArrayLikeType$int32, TypeReferenceSerializationKindBigIntLikeType$int32, TypeReferenceSerializationKindBooleanType$int32, TypeReferenceSerializationKindESSymbolType$int32, TypeReferenceSerializationKindNumberLikeType$int32, TypeReferenceSerializationKindObjectType$int32, TypeReferenceSerializationKindPromise$int32, TypeReferenceSerializationKindStringLikeType$int32, TypeReferenceSerializationKindTypeWithCallSignature$int32, TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32, TypeReferenceSerializationKindUnknown$int32, TypeReferenceSerializationKindVoidNullableOrNeverType$int32 } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitresolver.js";
export { EmitTextWriter, EmitTextWriter$contract, EmitTextWriter$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emittextwriter.js";
export { AssignedNameOptions, NameOptions, NewNodeFactory, NodeFactory, PrivateIdentifierKind, PrivateIdentifierKindAccessor$constant, PrivateIdentifierKindField$constant, PrivateIdentifierKindMethod$constant, PrivateIdentifierKindUntransformed$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/factory.js";
export { GeneratedIdentifierFlags, GeneratedIdentifierFlagsAllowNameSubstitution$int, GeneratedIdentifierFlagsAuto$int, GeneratedIdentifierFlagsFileLevel$int, GeneratedIdentifierFlagsKindMask$int, GeneratedIdentifierFlagsNode$int, GeneratedIdentifierFlagsNone$int, GeneratedIdentifierFlagsOptimistic$int, GeneratedIdentifierFlagsReservedInNestedScopes$int, GeneratedIdentifierFlagsUnique$int } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/generatedidentifierflags.js";
export { EmitHelper, Priority } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
export { NameGenerator } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/namegenerator.js";
export { LFAllowTrailingComma$constant, LFAmpersandDelimited$constant, LFAngleBrackets$constant, LFArrayBindingPatternElements$constant, LFArrayLiteralExpressionElements$constant, LFAsteriskDelimited$constant, LFBarDelimited$constant, LFBraces$constant, LFBracketsMask$constant, LFCallExpressionArguments$constant, LFCaseBlockClauses$constant, LFCaseOrDefaultClauseStatements$constant, LFClassHeritageClauses$constant, LFClassMembers$constant, LFCommaDelimited$constant, LFDecorators$constant, LFDelimitersMask$constant, LFEnumMembers$constant, LFHeritageClauseTypes$constant, LFHeritageClauses$constant, LFImportAttributes$constant, LFIndented$constant, LFIndexSignatureParameters$constant, LFInterfaceMembers$constant, LFIntersectionTypeConstituents$constant, LFJsxElementAttributes$constant, LFJsxElementOrFragmentChildren$constant, LFModifiers$constant, LFMultiLine$constant, LFMultiLineBlockStatements$constant, LFMultiLineFunctionBodyStatements$constant, LFMultiLineTupleTypeElements$constant, LFMultiLineTypeLiteralMembers$constant, LFNamedImportsOrExportsElements$constant, LFNewExpressionArguments$constant, LFNoInterveningComments$constant, LFNoSpaceIfEmpty$constant, LFNoTrailingNewLine$constant, LFNone$constant, LFObjectBindingPatternElements$constant, LFObjectLiteralExpressionProperties$constant, LFOptionalIfEmpty$constant, LFOptionalIfNil$constant, LFParameters$constant, LFParenthesis$constant, LFPreferNewLine$constant, LFPreserveLines$constant, LFSingleArrowParameter$constant, LFSingleLine$constant, LFSingleLineBlockStatements$constant, LFSingleLineFunctionBodyStatements$constant, LFSingleLineTupleTypeElements$constant, LFSingleLineTypeLiteralMembers$constant, LFSpaceBetweenBraces$constant, LFSpaceBetweenSiblings$constant, LFSquareBrackets$constant, LFTemplateExpressionSpans$constant, LFTypeArguments$constant, LFTypeParameters$constant, LFUnionTypeConstituents$constant, LFVariableDeclarationList$constant, ListFormat, NewPrinter, PrintHandlers, Printer, PrinterOptions, WriteKind, WriteKindComment$constant, WriteKindKeyword$constant, WriteKindLiteral$constant, WriteKindNone$constant, WriteKindOperator$constant, WriteKindParameter$constant, WriteKindProperty$constant, WriteKindPunctuation$constant, WriteKindStringLiteral$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
export { GetSingleLineStringWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/singlelinestringwriter.js";
export { GetDefaultIndentSize, NewTextWriter } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/textwriter.js";
export { EscapeString, FormatGeneratedName, GetLinesBetweenPositions, IsFileLevelUniqueName, IsPinnedComment, IsRecognizedTripleSlashComment, PositionsAreOnSameLine, QuoteChar, QuoteCharBacktick$constant, QuoteCharDoubleQuote$constant, QuoteCharSingleQuote$constant, RangeIsOnSingleLine, RangeStartPositionsAreOnSameLine } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/utilities.js";
export let EFCustomPrologue: ReturnType<typeof EFCustomPrologue$constant>;
export let EFExportName: ReturnType<typeof EFExportName$constant>;
export let EFExternalHelpers: ReturnType<typeof EFExternalHelpers$constant>;
export let EFHelperName: ReturnType<typeof EFHelperName$constant>;
export let EFIndented: ReturnType<typeof EFIndented$constant>;
export let EFIndirectCall: ReturnType<typeof EFIndirectCall$constant>;
export let EFLocalName: ReturnType<typeof EFLocalName$constant>;
export let EFMultiLine: ReturnType<typeof EFMultiLine$constant>;
export let EFNoAsciiEscaping: ReturnType<typeof EFNoAsciiEscaping$constant>;
export let EFNoComments: ReturnType<typeof EFNoComments$constant>;
export let EFNoIndentation: ReturnType<typeof EFNoIndentation$constant>;
export let EFNoLeadingComments: ReturnType<typeof EFNoLeadingComments$constant>;
export let EFNoLeadingSourceMap: ReturnType<typeof EFNoLeadingSourceMap$constant>;
export let EFNoLexicalArguments: ReturnType<typeof EFNoLexicalArguments$constant>;
export let EFNoLexicalThis: ReturnType<typeof EFNoLexicalThis$constant>;
export let EFNoNestedComments: ReturnType<typeof EFNoNestedComments$constant>;
export let EFNoNestedSourceMaps: ReturnType<typeof EFNoNestedSourceMaps$constant>;
export let EFNoSourceMap: ReturnType<typeof EFNoSourceMap$constant>;
export let EFNoTokenLeadingSourceMaps: ReturnType<typeof EFNoTokenLeadingSourceMaps$constant>;
export let EFNoTokenTrailingSourceMaps: ReturnType<typeof EFNoTokenTrailingSourceMaps$constant>;
export let EFNoTrailingComments: ReturnType<typeof EFNoTrailingComments$constant>;
export let EFNoTrailingSourceMap: ReturnType<typeof EFNoTrailingSourceMap$constant>;
export let EFNone: ReturnType<typeof EFNone$constant>;
export let EFReuseTempVariableScope: ReturnType<typeof EFReuseTempVariableScope$constant>;
export let EFSingleLine: ReturnType<typeof EFSingleLine$constant>;
export let EFStartOnNewLine: ReturnType<typeof EFStartOnNewLine$constant>;
export let EFTransformPrivateStaticElements: ReturnType<typeof EFTransformPrivateStaticElements$constant>;
export let LFAllowTrailingComma: ReturnType<typeof LFAllowTrailingComma$constant>;
export let LFAmpersandDelimited: ReturnType<typeof LFAmpersandDelimited$constant>;
export let LFAngleBrackets: ReturnType<typeof LFAngleBrackets$constant>;
export let LFArrayBindingPatternElements: ReturnType<typeof LFArrayBindingPatternElements$constant>;
export let LFArrayLiteralExpressionElements: ReturnType<typeof LFArrayLiteralExpressionElements$constant>;
export let LFAsteriskDelimited: ReturnType<typeof LFAsteriskDelimited$constant>;
export let LFBarDelimited: ReturnType<typeof LFBarDelimited$constant>;
export let LFBraces: ReturnType<typeof LFBraces$constant>;
export let LFBracketsMask: ReturnType<typeof LFBracketsMask$constant>;
export let LFCallExpressionArguments: ReturnType<typeof LFCallExpressionArguments$constant>;
export let LFCaseBlockClauses: ReturnType<typeof LFCaseBlockClauses$constant>;
export let LFCaseOrDefaultClauseStatements: ReturnType<typeof LFCaseOrDefaultClauseStatements$constant>;
export let LFClassHeritageClauses: ReturnType<typeof LFClassHeritageClauses$constant>;
export let LFClassMembers: ReturnType<typeof LFClassMembers$constant>;
export let LFCommaDelimited: ReturnType<typeof LFCommaDelimited$constant>;
export let LFDecorators: ReturnType<typeof LFDecorators$constant>;
export let LFDelimitersMask: ReturnType<typeof LFDelimitersMask$constant>;
export let LFEnumMembers: ReturnType<typeof LFEnumMembers$constant>;
export let LFHeritageClauseTypes: ReturnType<typeof LFHeritageClauseTypes$constant>;
export let LFHeritageClauses: ReturnType<typeof LFHeritageClauses$constant>;
export let LFImportAttributes: ReturnType<typeof LFImportAttributes$constant>;
export let LFIndented: ReturnType<typeof LFIndented$constant>;
export let LFIndexSignatureParameters: ReturnType<typeof LFIndexSignatureParameters$constant>;
export let LFInterfaceMembers: ReturnType<typeof LFInterfaceMembers$constant>;
export let LFIntersectionTypeConstituents: ReturnType<typeof LFIntersectionTypeConstituents$constant>;
export let LFJsxElementAttributes: ReturnType<typeof LFJsxElementAttributes$constant>;
export let LFJsxElementOrFragmentChildren: ReturnType<typeof LFJsxElementOrFragmentChildren$constant>;
export let LFModifiers: ReturnType<typeof LFModifiers$constant>;
export let LFMultiLine: ReturnType<typeof LFMultiLine$constant>;
export let LFMultiLineBlockStatements: ReturnType<typeof LFMultiLineBlockStatements$constant>;
export let LFMultiLineFunctionBodyStatements: ReturnType<typeof LFMultiLineFunctionBodyStatements$constant>;
export let LFMultiLineTupleTypeElements: ReturnType<typeof LFMultiLineTupleTypeElements$constant>;
export let LFMultiLineTypeLiteralMembers: ReturnType<typeof LFMultiLineTypeLiteralMembers$constant>;
export let LFNamedImportsOrExportsElements: ReturnType<typeof LFNamedImportsOrExportsElements$constant>;
export let LFNewExpressionArguments: ReturnType<typeof LFNewExpressionArguments$constant>;
export let LFNoInterveningComments: ReturnType<typeof LFNoInterveningComments$constant>;
export let LFNoSpaceIfEmpty: ReturnType<typeof LFNoSpaceIfEmpty$constant>;
export let LFNoTrailingNewLine: ReturnType<typeof LFNoTrailingNewLine$constant>;
export let LFNone: ReturnType<typeof LFNone$constant>;
export let LFObjectBindingPatternElements: ReturnType<typeof LFObjectBindingPatternElements$constant>;
export let LFObjectLiteralExpressionProperties: ReturnType<typeof LFObjectLiteralExpressionProperties$constant>;
export let LFOptionalIfEmpty: ReturnType<typeof LFOptionalIfEmpty$constant>;
export let LFOptionalIfNil: ReturnType<typeof LFOptionalIfNil$constant>;
export let LFParameters: ReturnType<typeof LFParameters$constant>;
export let LFParenthesis: ReturnType<typeof LFParenthesis$constant>;
export let LFPreferNewLine: ReturnType<typeof LFPreferNewLine$constant>;
export let LFPreserveLines: ReturnType<typeof LFPreserveLines$constant>;
export let LFSingleArrowParameter: ReturnType<typeof LFSingleArrowParameter$constant>;
export let LFSingleLine: ReturnType<typeof LFSingleLine$constant>;
export let LFSingleLineBlockStatements: ReturnType<typeof LFSingleLineBlockStatements$constant>;
export let LFSingleLineFunctionBodyStatements: ReturnType<typeof LFSingleLineFunctionBodyStatements$constant>;
export let LFSingleLineTupleTypeElements: ReturnType<typeof LFSingleLineTupleTypeElements$constant>;
export let LFSingleLineTypeLiteralMembers: ReturnType<typeof LFSingleLineTypeLiteralMembers$constant>;
export let LFSpaceBetweenBraces: ReturnType<typeof LFSpaceBetweenBraces$constant>;
export let LFSpaceBetweenSiblings: ReturnType<typeof LFSpaceBetweenSiblings$constant>;
export let LFSquareBrackets: ReturnType<typeof LFSquareBrackets$constant>;
export let LFTemplateExpressionSpans: ReturnType<typeof LFTemplateExpressionSpans$constant>;
export let LFTypeArguments: ReturnType<typeof LFTypeArguments$constant>;
export let LFTypeParameters: ReturnType<typeof LFTypeParameters$constant>;
export let LFUnionTypeConstituents: ReturnType<typeof LFUnionTypeConstituents$constant>;
export let LFVariableDeclarationList: ReturnType<typeof LFVariableDeclarationList$constant>;
export let PrivateIdentifierKindAccessor: ReturnType<typeof PrivateIdentifierKindAccessor$constant>;
export let PrivateIdentifierKindField: ReturnType<typeof PrivateIdentifierKindField$constant>;
export let PrivateIdentifierKindMethod: ReturnType<typeof PrivateIdentifierKindMethod$constant>;
export let PrivateIdentifierKindUntransformed: ReturnType<typeof PrivateIdentifierKindUntransformed$constant>;
export let QuoteCharBacktick: ReturnType<typeof QuoteCharBacktick$constant>;
export let QuoteCharDoubleQuote: ReturnType<typeof QuoteCharDoubleQuote$constant>;
export let QuoteCharSingleQuote: ReturnType<typeof QuoteCharSingleQuote$constant>;
export let SymbolAccessibilityAccessible: ReturnType<typeof SymbolAccessibilityAccessible$constant>;
export let SymbolAccessibilityCannotBeNamed: ReturnType<typeof SymbolAccessibilityCannotBeNamed$constant>;
export let SymbolAccessibilityNotAccessible: ReturnType<typeof SymbolAccessibilityNotAccessible$constant>;
export let SymbolAccessibilityNotResolved: ReturnType<typeof SymbolAccessibilityNotResolved$constant>;
export let WriteKindComment: ReturnType<typeof WriteKindComment$constant>;
export let WriteKindKeyword: ReturnType<typeof WriteKindKeyword$constant>;
export let WriteKindLiteral: ReturnType<typeof WriteKindLiteral$constant>;
export let WriteKindNone: ReturnType<typeof WriteKindNone$constant>;
export let WriteKindOperator: ReturnType<typeof WriteKindOperator$constant>;
export let WriteKindParameter: ReturnType<typeof WriteKindParameter$constant>;
export let WriteKindProperty: ReturnType<typeof WriteKindProperty$constant>;
export let WriteKindPunctuation: ReturnType<typeof WriteKindPunctuation$constant>;
export let WriteKindStringLiteral: ReturnType<typeof WriteKindStringLiteral$constant>;
export { $state };
