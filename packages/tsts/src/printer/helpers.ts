/**
 * Printer helpers.
 *
 * Port of TS-Go `internal/printer/helpers.go` (~560 LoC). Provides
 * tactical helpers used during emission: parenthesization rules,
 * literal text reconstruction, source-character escape handling, and
 * comment-range pruning.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, Expression, Statement } from "../ast/index.js";
import { createParenthesizedExpression, Kind, NodeFlags } from "../ast/index.js";

export interface Priority {
  readonly value: number;
}

export interface EmitHelper {
  readonly name: string;
  readonly scoped: boolean;
  readonly text?: string;
  readonly textCallback?: (makeUniqueName: (name: string) => string) => string;
  readonly priority?: Priority;
  readonly dependencies?: readonly EmitHelper[];
  readonly importName?: string;
}

export function compareEmitHelpers(left: EmitHelper | undefined, right: EmitHelper | undefined): number {
  if (left === right) return 0;
  if (left?.priority === right?.priority) return 0;
  if (left?.priority === undefined) return 1;
  if (right?.priority === undefined) return -1;
  return left.priority.value - right.priority.value;
}

export const decorateHelper: EmitHelper = {
  name: "typescript:decorate",
  importName: "__decorate",
  scoped: false,
  priority: { value: 2 },
  text: `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};`,
};

export const metadataHelper: EmitHelper = {
  name: "typescript:metadata",
  importName: "__metadata",
  scoped: false,
  priority: { value: 3 },
  text: `var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`,
};

export const paramHelper: EmitHelper = {
  name: "typescript:param",
  importName: "__param",
  scoped: false,
  priority: { value: 4 },
  text: `var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`,
};

export const assignHelper: EmitHelper = {
  name: "typescript:assign",
  importName: "__assign",
  scoped: false,
  text: `var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};`,
};

export const restHelper: EmitHelper = {
  name: "typescript:rest",
  importName: "__rest",
  scoped: false,
  text: `var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};`,
};

export const awaitHelper: EmitHelper = {
  name: "typescript:await",
  importName: "__await",
  scoped: false,
  text: `var __await = (this && this.__await) || function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
};`,
};

export const asyncGeneratorHelper: EmitHelper = {
  name: "typescript:asyncGenerator",
  importName: "__asyncGenerator",
  scoped: false,
  dependencies: [awaitHelper],
  text: `var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};`,
};

export const asyncDelegatorHelper: EmitHelper = {
  name: "typescript:asyncDelegator",
  importName: "__asyncDelegator",
  scoped: false,
  dependencies: [awaitHelper],
  text: `var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};`,
};

export const asyncValuesHelper: EmitHelper = {
  name: "typescript:asyncValues",
  importName: "__asyncValues",
  scoped: false,
  text: `var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
};`,
};

export const awaiterHelper: EmitHelper = {
  name: "typescript:awaiter",
  importName: "__awaiter",
  scoped: false,
  text: `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};`,
};

export const extendsHelper: EmitHelper = {
  name: "typescript:extends",
  importName: "__extends",
  scoped: false,
  text: `var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();`,
};

export const generatorHelper: EmitHelper = {
  name: "typescript:generator",
  importName: "__generator",
  scoped: false,
  text: `var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};`,
};

export const valuesHelper: EmitHelper = {
  name: "typescript:values",
  importName: "__values",
  scoped: false,
  text: `var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};`,
};

export const readHelper: EmitHelper = {
  name: "typescript:read",
  importName: "__read",
  scoped: false,
  dependencies: [valuesHelper],
  text: `var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try { if (r && !r.done && (m = i["return"])) m.call(i); }
        finally { if (e) throw e.error; }
    }
    return ar;
};`,
};

export const spreadArrayHelper: EmitHelper = {
  name: "typescript:spreadArray",
  importName: "__spreadArray",
  scoped: false,
  text: `var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};`,
};

export const addDisposableResourceHelper: EmitHelper = {
  name: "typescript:addDisposableResource",
  importName: "__addDisposableResource",
  scoped: false,
  text: `var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};`,
};

export const disposeResourcesHelper: EmitHelper = {
  name: "typescript:disposeResources",
  importName: "__disposeResources",
  scoped: false,
  text: `var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});`,
};

export const importDefaultHelper: EmitHelper = {
  name: "typescript:importDefault",
  importName: "__importDefault",
  scoped: false,
  text: `var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};`,
};

export const importStarHelper: EmitHelper = {
  name: "typescript:importStar",
  importName: "__importStar",
  scoped: false,
  text: `var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};`,
};

export const exportStarHelper: EmitHelper = {
  name: "typescript:exportStar",
  importName: "__exportStar",
  scoped: false,
  text: `var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) exports[p] = m[p];
};`,
};

export const classPrivateFieldGetHelper: EmitHelper = {
  name: "typescript:classPrivateFieldGet",
  importName: "__classPrivateFieldGet",
  scoped: false,
  text: `var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};`,
};

export const classPrivateFieldSetHelper: EmitHelper = {
  name: "typescript:classPrivateFieldSet",
  importName: "__classPrivateFieldSet",
  scoped: false,
  text: `var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};`,
};

export const classPrivateFieldInHelper: EmitHelper = {
  name: "typescript:classPrivateFieldIn",
  importName: "__classPrivateFieldIn",
  scoped: false,
  text: `var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function (state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};`,
};

export const setFunctionNameHelper: EmitHelper = {
  name: "typescript:setFunctionName",
  importName: "__setFunctionName",
  scoped: false,
  text: `var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};`,
};

export const propKeyHelper: EmitHelper = {
  name: "typescript:propKey",
  importName: "__propKey",
  scoped: false,
  text: `var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};`,
};

export const makeTemplateObjectHelper: EmitHelper = {
  name: "typescript:makeTemplateObject",
  importName: "__makeTemplateObject",
  scoped: false,
  text: `var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); }
    else { cooked.raw = raw; }
    return cooked;
};`,
};

export const esDecorateHelper: EmitHelper = {
  name: "typescript:esDecorate",
  importName: "__esDecorate",
  scoped: false,
  text: `var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};`,
};

export const runInitializersHelper: EmitHelper = {
  name: "typescript:runInitializers",
  importName: "__runInitializers",
  scoped: false,
  text: `var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};`,
};

export const rewriteRelativeImportExtensionsHelper: EmitHelper = {
  name: "typescript:rewriteRelativeImportExtensions",
  importName: "__rewriteRelativeImportExtension",
  scoped: false,
  text: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
};`,
};

// Precedence ranks (TC39 spec). Mirrors ts-go OperatorPrecedence.
function operatorPrecedence(op: number): number {
  switch (op) {
    case Kind.CommaToken: return 0;
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken: case Kind.MinusEqualsToken:
    case Kind.AsteriskAsteriskEqualsToken: case Kind.AsteriskEqualsToken:
    case Kind.SlashEqualsToken: case Kind.PercentEqualsToken:
    case Kind.LessThanLessThanEqualsToken: case Kind.GreaterThanGreaterThanEqualsToken:
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case Kind.AmpersandEqualsToken: case Kind.BarEqualsToken: case Kind.CaretEqualsToken:
    case Kind.BarBarEqualsToken: case Kind.AmpersandAmpersandEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return 2;
    case Kind.QuestionToken: case Kind.ColonToken: return 3;
    case Kind.QuestionQuestionToken: return 4;
    case Kind.BarBarToken: return 5;
    case Kind.AmpersandAmpersandToken: return 6;
    case Kind.BarToken: return 7;
    case Kind.CaretToken: return 8;
    case Kind.AmpersandToken: return 9;
    case Kind.EqualsEqualsToken: case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken: case Kind.ExclamationEqualsEqualsToken:
      return 10;
    case Kind.LessThanToken: case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken: case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword: case Kind.InstanceOfKeyword: case Kind.AsKeyword:
    case Kind.SatisfiesKeyword:
      return 11;
    case Kind.LessThanLessThanToken: case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return 12;
    case Kind.PlusToken: case Kind.MinusToken: return 13;
    case Kind.AsteriskToken: case Kind.SlashToken: case Kind.PercentToken: return 14;
    case Kind.AsteriskAsteriskToken: return 15;
  }
  return -1;
}

function expressionPrecedence(node: Expression): number {
  const k = (node as { kind?: number }).kind;
  switch (k) {
    case Kind.BinaryExpression: {
      const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind ?? 0;
      return operatorPrecedence(op);
    }
    case Kind.ConditionalExpression: return 3;
    case Kind.YieldExpression: return 1;
    case Kind.SpreadElement: return 0;
    case Kind.PrefixUnaryExpression: case Kind.TypeOfExpression:
    case Kind.VoidExpression: case Kind.DeleteExpression: case Kind.AwaitExpression:
      return 16;
    case Kind.PostfixUnaryExpression: return 17;
    case Kind.CallExpression: case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.PropertyAccessExpression: case Kind.ElementAccessExpression:
      return 19;
    default: return 20;
  }
}

export function needsParensInArrowBody(node: Expression): boolean {
  // Arrow body { ... } would be parsed as block. Object-literal body needs parens.
  return (node as { kind?: number }).kind === Kind.ObjectLiteralExpression;
}
export function needsParensInLeftSideOfAccess(node: Expression): boolean {
  // Member access on a numeric literal needs parens (`(1).toString()`).
  const k = (node as { kind?: number }).kind;
  if (k === Kind.NumericLiteral) {
    const text = (node as unknown as { text?: string }).text ?? "";
    return !text.includes(".") && !text.includes("e") && !text.includes("E");
  }
  // Function/Class expressions on the left of access need parens.
  return k === Kind.FunctionExpression || k === Kind.ClassExpression
    || k === Kind.ArrowFunction || k === Kind.NewExpression
    || k === Kind.ObjectLiteralExpression;
}
export function needsParensInCallTarget(node: Expression): boolean {
  const k = (node as { kind?: number }).kind;
  return k === Kind.FunctionExpression || k === Kind.ArrowFunction
    || k === Kind.ClassExpression || k === Kind.BinaryExpression
    || k === Kind.ConditionalExpression || k === Kind.TypeAssertionExpression
    || k === Kind.AsExpression;
}
export function needsParensInNewTarget(node: Expression): boolean {
  return needsParensInCallTarget(node);
}
export function needsParensInBinary(left: Expression, operator: number, right: Expression): boolean {
  // True if `left` has lower precedence than `operator`, or if `right`
  // has lower-or-equal precedence (right-associative case for `=` and
  // `??`, `**`).
  const opPrec = operatorPrecedence(operator);
  const lp = expressionPrecedence(left);
  const rp = expressionPrecedence(right);
  return lp < opPrec || rp < opPrec;
}
export function needsParensInPrefixUnary(operand: Expression): boolean {
  return expressionPrecedence(operand) < 16;
}
export function needsParensInPostfixUnary(operand: Expression): boolean {
  return expressionPrecedence(operand) < 17;
}
export function needsParensInConditional(condition: Expression): boolean {
  // Conditional condition needs parens when its precedence is at or
  // below the `?:` precedence (3).
  return expressionPrecedence(condition) <= 3;
}
export function needsParensInExtends(expression: Expression): boolean {
  // `class X extends ... { }` — arrow/function/object/binary/conditional all need parens.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.ArrowFunction || k === Kind.FunctionExpression
    || k === Kind.ClassExpression || k === Kind.ObjectLiteralExpression
    || k === Kind.BinaryExpression || k === Kind.ConditionalExpression
    || k === Kind.YieldExpression || k === Kind.AwaitExpression;
}
export function needsParensForExpressionStatement(expression: Expression): boolean {
  // Expressions starting with `{`, `function`, `class`, `async` keyword,
  // or destructuring assignment need parens at statement position.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.ObjectLiteralExpression || k === Kind.FunctionExpression
    || k === Kind.ClassExpression;
}
export function needsParensForSpread(expression: Expression): boolean {
  // Spread argument with binary/conditional/yield needs parens to bind
  // the expression to the spread.
  const k = (expression as { kind?: number }).kind;
  return k === Kind.BinaryExpression || k === Kind.ConditionalExpression
    || k === Kind.YieldExpression;
}

export function parenthesizeExpressionForExportDefault(expression: Expression): Expression {
  return needsParensForExpressionStatement(expression) ? createParenthesizedExpression(expression) : expression;
}
export function parenthesizeBinaryOperand(operand: Expression, operator: number, isLeftSide: boolean): Expression {
  const operandPrecedence = expressionPrecedence(operand);
  const opPrecedence = operatorPrecedence(operator);
  if (operandPrecedence < opPrecedence || !isLeftSide && operandPrecedence === opPrecedence) {
    return createParenthesizedExpression(operand);
  }
  return operand;
}
export function parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression {
  return expression.kind === Kind.CommaToken || expression.kind === Kind.BinaryExpression && ((expression as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(expression)
    : expression;
}
export function parenthesizeConditionOfConditionalExpression(condition: Expression): Expression {
  return needsParensInConditional(condition) ? createParenthesizedExpression(condition) : condition;
}
export function parenthesizeBranchOfConditionalExpression(branch: Expression): Expression {
  return branch.kind === Kind.BinaryExpression && ((branch as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(branch)
    : branch;
}
export function parenthesizeExpressionForDisallowedComma(expression: Expression): Expression {
  return expression.kind === Kind.BinaryExpression && ((expression as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind === Kind.CommaToken)
    ? createParenthesizedExpression(expression)
    : expression;
}
export function parenthesizeMemberOfElementType(member: AstNode): AstNode {
  return member.kind === Kind.UnionType || member.kind === Kind.IntersectionType || member.kind === Kind.FunctionType
    ? createParenthesizedExpression(member as Expression)
    : member;
}
export function parenthesizeMemberOfConditionalType(member: AstNode): AstNode {
  return member.kind === Kind.ConditionalType ? createParenthesizedExpression(member as Expression) : member;
}

export function chainBundle(transform: (node: AstNode) => AstNode): (node: AstNode) => AstNode {
  return (node) => transform(node);
}

export function visitArray<T extends AstNode>(nodes: readonly T[], cb: (n: T) => T | undefined): readonly T[] {
  const result: T[] = [];
  for (const n of nodes) {
    const visited = cb(n);
    if (visited !== undefined) result.push(visited);
  }
  return result;
}

export function getEmitScriptTarget(opts: { target?: number; emitTarget?: number }): number {
  return opts.emitTarget ?? opts.target ?? 0;
}

export function getEmitModuleKind(opts: { module?: number }): number {
  return opts.module ?? 0;
}

export function getUseDefineForClassFields(opts: { useDefineForClassFields?: boolean }): boolean {
  return opts.useDefineForClassFields ?? false;
}

export function getResolveJsonModule(opts: { resolveJsonModule?: boolean }): boolean {
  return opts.resolveJsonModule ?? false;
}

export function isCustomPrologue(node: Statement): boolean {
  // True for prologue-directive ExpressionStatement marked synthesized
  // by the compiler (e.g. emit-helpers shim like '"use strict";').
  if (!isPrologueDirective(node)) return false;
  return (((node as unknown as { flags?: number }).flags ?? 0) & NodeFlags.Synthesized) !== 0;
}
export function isPrologueDirective(node: Statement): boolean {
  if ((node as { kind?: number }).kind !== Kind.ExpressionStatement) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  return expr !== undefined && (expr as { kind?: number }).kind === Kind.StringLiteral;
}
export function isAnyImportOrReExport(node: AstNode): boolean {
  const k = (node as { kind?: number }).kind;
  return k === Kind.ImportDeclaration || k === Kind.ImportEqualsDeclaration
    || k === Kind.ExportDeclaration || k === Kind.ExportAssignment;
}

export function reduceLeft<T, U>(
  list: readonly T[], cb: (acc: U, elem: T, i: number) => U, initial: U,
): U {
  let acc = initial;
  list.forEach((elem, i) => { acc = cb(acc, elem, i); });
  return acc;
}

export function reduceRight<T, U>(
  list: readonly T[], cb: (acc: U, elem: T, i: number) => U, initial: U,
): U {
  let acc = initial;
  for (let i = list.length - 1; i >= 0; i -= 1) acc = cb(acc, list[i]!, i);
  return acc;
}
