import type { bool, int } from "../../go/scalars.js";
import { GoNilSlice } from "../../go/compat.js";
import type { GoFunc, GoPtr, GoSlice } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceBuild, GoSliceStore } from "../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::type::Priority","kind":"type","status":"implemented","sigHash":"2ab6d6a4dd675ef3c0c291801db9ec07f9bb7327fe479c4d9c642f66ddd4160c"}
 *
 * Go source:
 * Priority struct {
 * 	Value int
 * }
 */
export interface Priority {
  Value: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::type::EmitHelper","kind":"type","status":"implemented","sigHash":"29837b904cdbc5bc1f465794a6dbd9c0b45d737ccebfbc3ab9bc7010250f6381"}
 *
 * Go source:
 * EmitHelper struct {
 * 	Name         string                                          // A unique name for this helper.
 * 	Scoped       bool                                            // Indicates whether the helper MUST be emitted in the current scope.
 * 	Text         string                                          // ES3-compatible raw script text
 * 	TextCallback func(makeUniqueName func(string) string) string // A function yielding an ES3-compatible raw script text.
 * 	Priority     *Priority                                       // Helpers with a higher priority are emitted earlier than other helpers on the node.
 * 	Dependencies []*EmitHelper                                   // Emit helpers this helper depends on
 * 	ImportName   string                                          // The name of the helper to use when importing via `--importHelpers`.
 * }
 */
export interface EmitHelper {
  Name: string;
  Scoped: bool;
  Text: string;
  TextCallback: GoFunc<(makeUniqueName: GoFunc<(arg0: string) => string>) => string>;
  Priority: GoPtr<Priority>;
  Dependencies: GoSlice<GoPtr<EmitHelper>>;
  ImportName: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::func::compareEmitHelpers","kind":"func","status":"implemented","sigHash":"950fd9826c98a6720b8a949f4dccef594dc0ffd482585545220de5cd85e96346"}
 *
 * Go source:
 * func compareEmitHelpers(x *EmitHelper, y *EmitHelper) int {
 * 	if x == y {
 * 		return 0
 * 	}
 * 	if x.Priority == y.Priority {
 * 		return 0
 * 	}
 * 	if x.Priority == nil {
 * 		return 1
 * 	}
 * 	if y.Priority == nil {
 * 		return -1
 * 	}
 * 	return x.Priority.Value - y.Priority.Value
 * }
 */
export function compareEmitHelpers(x: GoPtr<EmitHelper>, y: GoPtr<EmitHelper>): int {
  if (x === y) {
    return 0;
  }
  if (x!.Priority === y!.Priority) {
    return 0;
  }
  if (x!.Priority === undefined) {
    return 1;
  }
  if (y!.Priority === undefined) {
    return -1;
  }
  return x!.Priority.Value - y!.Priority.Value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::decorateHelper","kind":"varGroup","status":"implemented","sigHash":"6e35f73e453eda17cb33f3b060fd40fc9ad5fef680c94aa5498064976122d8cb"}
 *
 * Go source:
 * var decorateHelper = &EmitHelper{
 * 	Name:       "typescript:decorate",
 * 	ImportName: "__decorate",
 * 	Scoped:     false,
 * 	Priority:   &Priority{2},
 * 	Text: `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
 *     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
 *     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
 *     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
 *     return c > 3 && r && Object.defineProperty(target, key, r), r;
 * };`,
 * }
 */
export let decorateHelper: GoPtr<EmitHelper> = {
  Name: "typescript:decorate",
  ImportName: "__decorate",
  Scoped: false,
  Priority: { Value: 2 },
  Text: `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::metadataHelper","kind":"varGroup","status":"implemented","sigHash":"da35841570dbec5aa29df52363bad91d3eb62dab3f4ebd5011038d4c66ca1c43"}
 *
 * Go source:
 * var metadataHelper = &EmitHelper{
 * 	Name:       "typescript:metadata",
 * 	ImportName: "__metadata",
 * 	Scoped:     false,
 * 	Priority:   &Priority{3},
 * 	Text: `var __metadata = (this && this.__metadata) || function (k, v) {
 *     if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
 * };`,
 * }
 */
export let metadataHelper: GoPtr<EmitHelper> = {
  Name: "typescript:metadata",
  ImportName: "__metadata",
  Scoped: false,
  Priority: { Value: 3 },
  Text: `var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::paramHelper","kind":"varGroup","status":"implemented","sigHash":"7884056886bbed4188a4fe2112ecd201b657ef662e164e8863d4872e4381c043"}
 *
 * Go source:
 * var paramHelper = &EmitHelper{
 * 	Name:       "typescript:param",
 * 	ImportName: "__param",
 * 	Scoped:     false,
 * 	Priority:   &Priority{4},
 * 	Text: `var __param = (this && this.__param) || function (paramIndex, decorator) {
 *     return function (target, key) { decorator(target, key, paramIndex); }
 * };`,
 * }
 */
export let paramHelper: GoPtr<EmitHelper> = {
  Name: "typescript:param",
  ImportName: "__param",
  Scoped: false,
  Priority: { Value: 4 },
  Text: `var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::addDisposableResourceHelper","kind":"varGroup","status":"implemented","sigHash":"b1819cf79eb38e1b0c239224aaf4f094428292555fc1ae1ca30d784d357454bc"}
 *
 * Go source:
 * var addDisposableResourceHelper = &EmitHelper{
 * 	Name:       "typescript:addDisposableResource",
 * 	ImportName: "__addDisposableResource",
 * 	Scoped:     false,
 * 	Text: `var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
 *     if (value !== null && value !== void 0) {
 *         if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
 *         var dispose, inner;
 *         if (async) {
 *             if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
 *             dispose = value[Symbol.asyncDispose];
 *         }
 *         if (dispose === void 0) {
 *             if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
 *             dispose = value[Symbol.dispose];
 *             if (async) inner = dispose;
 *         }
 *         if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
 *         if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
 *         env.stack.push({ value: value, dispose: dispose, async: async });
 *     }
 *     else if (async) {
 *         env.stack.push({ async: true });
 *     }
 *     return value;
 * };`,
 * }
 */
export let addDisposableResourceHelper: GoPtr<EmitHelper> = {
  Name: "typescript:addDisposableResource",
  ImportName: "__addDisposableResource",
  Scoped: false,
  Text: `var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
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
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::disposeResourcesHelper","kind":"varGroup","status":"implemented","sigHash":"4adc62991ab7e1ef671f0e46f7b7c979f54ac7cf16c816fc70e4a0ec866d40c6"}
 *
 * Go source:
 * var disposeResourcesHelper = &EmitHelper{
 * 	Name:       "typescript:disposeResources",
 * 	ImportName: "__disposeResources",
 * 	Scoped:     false,
 * 	Text: `var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
 *     return function (env) {
 *         function fail(e) {
 *             env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
 *             env.hasError = true;
 *         }
 *         var r, s = 0;
 *         function next() {
 *             while (r = env.stack.pop()) {
 *                 try {
 *                     if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
 *                     if (r.dispose) {
 *                         var result = r.dispose.call(r.value);
 *                         if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
 *                     }
 *                     else s |= 1;
 *                 }
 *                 catch (e) {
 *                     fail(e);
 *                 }
 *             }
 *             if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
 *             if (env.hasError) throw env.error;
 *         }
 *         return next();
 *     };
 * })(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
 *     var e = new Error(message);
 *     return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
 * });`,
 * }
 */
export let disposeResourcesHelper: GoPtr<EmitHelper> = {
  Name: "typescript:disposeResources",
  ImportName: "__disposeResources",
  Scoped: false,
  Text: `var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
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
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::classPrivateFieldGetHelper","kind":"varGroup","status":"implemented","sigHash":"ff6eabdd4797328296b6afd5d7f05cd056277882d75dbc00b101c59b43e2cf5d"}
 *
 * Go source:
 * var classPrivateFieldGetHelper = &EmitHelper{
 * 	Name:       "typescript:classPrivateFieldGet",
 * 	ImportName: "__classPrivateFieldGet",
 * 	Scoped:     false,
 * 	Text: `var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
 *     if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
 *     if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
 *     return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
 * };`,
 * }
 */
export let classPrivateFieldGetHelper: GoPtr<EmitHelper> = {
  Name: "typescript:classPrivateFieldGet",
  ImportName: "__classPrivateFieldGet",
  Scoped: false,
  Text: `var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::classPrivateFieldSetHelper","kind":"varGroup","status":"implemented","sigHash":"5f8f822692458d8611ea8ba71887ee9d0d9f3b5a0ec51dbc5a9dcd9fcea8bf8e"}
 *
 * Go source:
 * var classPrivateFieldSetHelper = &EmitHelper{
 * 	Name:       "typescript:classPrivateFieldSet",
 * 	ImportName: "__classPrivateFieldSet",
 * 	Scoped:     false,
 * 	Text: `var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
 *     if (kind === "m") throw new TypeError("Private method is not writable");
 *     if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
 *     if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
 *     return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
 * };`,
 * }
 */
export let classPrivateFieldSetHelper: GoPtr<EmitHelper> = {
  Name: "typescript:classPrivateFieldSet",
  ImportName: "__classPrivateFieldSet",
  Scoped: false,
  Text: `var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::classPrivateFieldInHelper","kind":"varGroup","status":"implemented","sigHash":"4359819a1bc9f7d3fc7ebb98ca1de3936f59eabe5666735c3a475d7f9d6a737b"}
 *
 * Go source:
 * var classPrivateFieldInHelper = &EmitHelper{
 * 	Name:       "typescript:classPrivateFieldIn",
 * 	ImportName: "__classPrivateFieldIn",
 * 	Scoped:     false,
 * 	Text: `var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
 *     if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
 *     return typeof state === "function" ? receiver === state : state.has(receiver);
 * };`,
 * }
 */
export let classPrivateFieldInHelper: GoPtr<EmitHelper> = {
  Name: "typescript:classPrivateFieldIn",
  ImportName: "__classPrivateFieldIn",
  Scoped: false,
  Text: `var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::awaitHelper","kind":"varGroup","status":"implemented","sigHash":"4b89e2b49524a588b673f0b98b6c214ab763c696ca27a4f8a1a849006a1d5186"}
 *
 * Go source:
 * var awaitHelper = &EmitHelper{
 * 	Name:       "typescript:await",
 * 	ImportName: "__await",
 * 	Scoped:     false,
 * 	Text:       `var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`,
 * }
 */
export let awaitHelper: GoPtr<EmitHelper> = {
  Name: "typescript:await",
  ImportName: "__await",
  Scoped: false,
  Text: `var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::asyncGeneratorHelper","kind":"varGroup","status":"implemented","sigHash":"8439891b3f5807a5b7e987248577a6b8944b63d3c192c25e3d3e5fce8bc46e0c"}
 *
 * Go source:
 * var asyncGeneratorHelper = &EmitHelper{
 * 	Name:         "typescript:asyncGenerator",
 * 	ImportName:   "__asyncGenerator",
 * 	Scoped:       false,
 * 	Dependencies: []*EmitHelper{awaitHelper},
 * 	Text: `var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
 *     if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
 *     var g = generator.apply(thisArg, _arguments || []), i, q = [];
 *     return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
 *     function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
 *     function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
 *     function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
 *     function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
 *     function fulfill(value) { resume("next", value); }
 *     function reject(value) { resume("throw", value); }
 *     function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
 * };`,
 * }
 */
export let asyncGeneratorHelper: GoPtr<EmitHelper> = {
  Name: "typescript:asyncGenerator",
  ImportName: "__asyncGenerator",
  Scoped: false,
  Dependencies: GoSliceBuild(1, 1, GoPointerValueOps<EmitHelper>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, awaitHelper, GoPointerValueOps<EmitHelper>());
  }),
  Text: `var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};`,
  Priority: undefined,
  TextCallback: undefined,
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::asyncDelegatorHelper","kind":"varGroup","status":"implemented","sigHash":"670a99903ce06c6007ac23164e7b2d140ea48e915843bd23a94a42cff9107aca"}
 *
 * Go source:
 * var asyncDelegatorHelper = &EmitHelper{
 * 	Name:         "typescript:asyncDelegator",
 * 	ImportName:   "__asyncDelegator",
 * 	Scoped:       false,
 * 	Dependencies: []*EmitHelper{awaitHelper},
 * 	Text: `var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
 *     var i, p;
 *     return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
 *     function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
 * };`,
 * }
 */
export let asyncDelegatorHelper: GoPtr<EmitHelper> = {
  Name: "typescript:asyncDelegator",
  ImportName: "__asyncDelegator",
  Scoped: false,
  Dependencies: GoSliceBuild(1, 1, GoPointerValueOps<EmitHelper>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, awaitHelper, GoPointerValueOps<EmitHelper>());
  }),
  Text: `var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};`,
  Priority: undefined,
  TextCallback: undefined,
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::asyncValuesHelper","kind":"varGroup","status":"implemented","sigHash":"912bea213e36d7cd68cab3135da7235b3afc597ce6d12d9a886a28b6e239b7fa"}
 *
 * Go source:
 * var asyncValuesHelper = &EmitHelper{
 * 	Name:       "typescript:asyncValues",
 * 	ImportName: "__asyncValues",
 * 	Scoped:     false,
 * 	Text: `var __asyncValues = (this && this.__asyncValues) || function (o) {
 *     if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
 *     var m = o[Symbol.asyncIterator], i;
 *     return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
 *     function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
 *     function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
 * };`,
 * }
 */
export let asyncValuesHelper: GoPtr<EmitHelper> = {
  Name: "typescript:asyncValues",
  ImportName: "__asyncValues",
  Scoped: false,
  Text: `var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::restHelper","kind":"varGroup","status":"implemented","sigHash":"85d4774b04d4684d0b2f022610cf47d29e34076e2a6f4d2ccce8dfed766a3d89"}
 *
 * Go source:
 * var restHelper = &EmitHelper{
 * 	Name:       "typescript:rest",
 * 	ImportName: "__rest",
 * 	Scoped:     false,
 * 	Text: `var __rest = (this && this.__rest) || function (s, e) {
 *     var t = {};
 *     for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
 *         t[p] = s[p];
 *     if (s != null && typeof Object.getOwnPropertySymbols === "function")
 *         for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
 *             if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
 *                 t[p[i]] = s[p[i]];
 *         }
 *     return t;
 * };`,
 * }
 */
export let restHelper: GoPtr<EmitHelper> = {
  Name: "typescript:rest",
  ImportName: "__rest",
  Scoped: false,
  Text: `var __rest = (this && this.__rest) || function (s, e) {
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
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::awaiterHelper","kind":"varGroup","status":"implemented","sigHash":"0cf7b1550763fb06bb169068e6d355d351d51ddaa0fba616dbd963e43ef44322"}
 *
 * Go source:
 * var awaiterHelper = &EmitHelper{
 * 	Name:       "typescript:awaiter",
 * 	ImportName: "__awaiter",
 * 	Scoped:     false,
 * 	Priority:   &Priority{5},
 * 	Text: `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
 *     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
 *     return new (P || (P = Promise))(function (resolve, reject) {
 *         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
 *         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
 *         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
 *         step((generator = generator.apply(thisArg, _arguments || [])).next());
 *     });
 * };`,
 * }
 */
export let awaiterHelper: GoPtr<EmitHelper> = {
  Name: "typescript:awaiter",
  ImportName: "__awaiter",
  Scoped: false,
  Priority: { Value: 5 },
  Text: `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::AsyncSuperHelper","kind":"varGroup","status":"implemented","sigHash":"bb38962c873af8c5da7325a1807af22ddcfcd64e087f7a5d6d76c62893f7743b"}
 *
 * Go source:
 * var AsyncSuperHelper = &EmitHelper{
 * 	Name:   "typescript:async-super",
 * 	Scoped: true,
 * 	TextCallback: func(makeUniqueName func(string) string) string {
 * 		return "\nconst " + makeUniqueName("_superIndex") + " = name => super[name];"
 * 	},
 * }
 */
export let AsyncSuperHelper: GoPtr<EmitHelper> = {
  Name: "typescript:async-super",
  Scoped: true,
  TextCallback: (makeUniqueName: GoFunc<(arg0: string) => string>): string => {
    return "\nconst " + makeUniqueName!("_superIndex") + " = name => super[name];";
  },
  Text: "",
  ImportName: "",
  Priority: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::AdvancedAsyncSuperHelper","kind":"varGroup","status":"implemented","sigHash":"a8a2ec1db7a378320938476e5932b44e1b7649dab1694b42f574208b2fc4cb48"}
 *
 * Go source:
 * var AdvancedAsyncSuperHelper = &EmitHelper{
 * 	Name:   "typescript:advanced-async-super",
 * 	Scoped: true,
 * 	TextCallback: func(makeUniqueName func(string) string) string {
 * 		return "\nconst " + makeUniqueName("_superIndex") + " = (function (geti, seti) {\n" +
 * 			"    const cache = Object.create(null);\n" +
 * 			"    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });\n" +
 * 			"})(name => super[name], (name, value) => super[name] = value);"
 * 	},
 * }
 */
export let AdvancedAsyncSuperHelper: GoPtr<EmitHelper> = {
  Name: "typescript:advanced-async-super",
  Scoped: true,
  TextCallback: (makeUniqueName: GoFunc<(arg0: string) => string>): string => {
    return "\nconst " + makeUniqueName!("_superIndex") + " = (function (geti, seti) {\n" +
      "    const cache = Object.create(null);\n" +
      "    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });\n" +
      "})(name => super[name], (name, value) => super[name] = value);";
  },
  Text: "",
  ImportName: "",
  Priority: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::esDecorateHelper","kind":"varGroup","status":"implemented","sigHash":"06ce118d6be8308f21d999d4b85a428bfdc89569e4bc038f76d3d31d49b1a744"}
 *
 * Go source:
 * var esDecorateHelper = &EmitHelper{
 * 	Name:       "typescript:esDecorate",
 * 	ImportName: "__esDecorate",
 * 	Scoped:     false,
 * 	Priority:   &Priority{2},
 * 	Text: `var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
 *     function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
 *     var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
 *     var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
 *     var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
 *     var _, done = false;
 *     for (var i = decorators.length - 1; i >= 0; i--) {
 *         var context = {};
 *         for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
 *         for (var p in contextIn.access) context.access[p] = contextIn.access[p];
 *         context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
 *         var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
 *         if (kind === "accessor") {
 *             if (result === void 0) continue;
 *             if (result === null || typeof result !== "object") throw new TypeError("Object expected");
 *             if (_ = accept(result.get)) descriptor.get = _;
 *             if (_ = accept(result.set)) descriptor.set = _;
 *             if (_ = accept(result.init)) initializers.unshift(_);
 *         }
 *         else if (_ = accept(result)) {
 *             if (kind === "field") initializers.unshift(_);
 *             else descriptor[key] = _;
 *         }
 *     }
 *     if (target) Object.defineProperty(target, contextIn.name, descriptor);
 *     done = true;
 * };`,
 * }
 */
export let esDecorateHelper: GoPtr<EmitHelper> = {
  Name: "typescript:esDecorate",
  ImportName: "__esDecorate",
  Scoped: false,
  Priority: { Value: 2 },
  Text: `var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::runInitializersHelper","kind":"varGroup","status":"implemented","sigHash":"6cbdb19003bdd67b4c91af1b8b2e72fa9790ac6b549cbf1f6dfd857b5fa8ed26"}
 *
 * Go source:
 * var runInitializersHelper = &EmitHelper{
 * 	Name:       "typescript:runInitializers",
 * 	ImportName: "__runInitializers",
 * 	Scoped:     false,
 * 	Priority:   &Priority{2},
 * 	Text: `var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
 *     var useValue = arguments.length > 2;
 *     for (var i = 0; i < initializers.length; i++) {
 *         value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
 *     }
 *     return useValue ? value : void 0;
 * };`,
 * }
 */
export let runInitializersHelper: GoPtr<EmitHelper> = {
  Name: "typescript:runInitializers",
  ImportName: "__runInitializers",
  Scoped: false,
  Priority: { Value: 2 },
  Text: `var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::makeTemplateObjectHelper","kind":"varGroup","status":"implemented","sigHash":"7643d01b62ec673688e4cab17c8cdef187013ae2d8abac48612ad4c3b71e2efd"}
 *
 * Go source:
 * var makeTemplateObjectHelper = &EmitHelper{
 * 	Name:       "typescript:makeTemplateObject",
 * 	ImportName: "__makeTemplateObject",
 * 	Scoped:     false,
 * 	Priority:   &Priority{0},
 * 	Text: `var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
 *     if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
 *     return cooked;
 * };`,
 * }
 */
export let makeTemplateObjectHelper: GoPtr<EmitHelper> = {
  Name: "typescript:makeTemplateObject",
  ImportName: "__makeTemplateObject",
  Scoped: false,
  Priority: { Value: 0 },
  Text: `var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::propKeyHelper","kind":"varGroup","status":"implemented","sigHash":"fe82a313993e61790fcc06d6a6761fef3d7833a5f24f0bff96817c1a8ccfd457"}
 *
 * Go source:
 * var propKeyHelper = &EmitHelper{
 * 	Name:       "typescript:propKey",
 * 	ImportName: "__propKey",
 * 	Scoped:     false,
 * 	Text: `var __propKey = (this && this.__propKey) || function (x) {
 *     return typeof x === "symbol" ? x : "".concat(x);
 * };`,
 * }
 */
export let propKeyHelper: GoPtr<EmitHelper> = {
  Name: "typescript:propKey",
  ImportName: "__propKey",
  Scoped: false,
  Text: `var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::setFunctionNameHelper","kind":"varGroup","status":"implemented","sigHash":"b235e1a58b4a2babf83c040bf50f6657e37cc3f0138ce521d181e65fd8fca111"}
 *
 * Go source:
 * var setFunctionNameHelper = &EmitHelper{
 * 	Name:       "typescript:setFunctionName",
 * 	ImportName: "__setFunctionName",
 * 	Scoped:     false,
 * 	Text: `var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
 *     if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
 *     return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
 * };`,
 * }
 */
export let setFunctionNameHelper: GoPtr<EmitHelper> = {
  Name: "typescript:setFunctionName",
  ImportName: "__setFunctionName",
  Scoped: false,
  Text: `var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::createBindingHelper","kind":"varGroup","status":"implemented","sigHash":"71a238f5a65d34825febd3a1c240e60b9329654926d3a57575774af61c436a03"}
 *
 * Go source:
 * var createBindingHelper = &EmitHelper{
 * 	Name:       "typescript:commonjscreatebinding",
 * 	ImportName: "__createBinding",
 * 	Scoped:     false,
 * 	Priority:   &Priority{1},
 * 	Text: `var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
 *     if (k2 === undefined) k2 = k;
 *     var desc = Object.getOwnPropertyDescriptor(m, k);
 *     if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
 *       desc = { enumerable: true, get: function() { return m[k]; } };
 *     }
 *     Object.defineProperty(o, k2, desc);
 * }) : (function(o, m, k, k2) {
 *     if (k2 === undefined) k2 = k;
 *     o[k2] = m[k];
 * }));`,
 * }
 */
export let createBindingHelper: GoPtr<EmitHelper> = {
  Name: "typescript:commonjscreatebinding",
  ImportName: "__createBinding",
  Scoped: false,
  Priority: { Value: 1 },
  Text: `var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::setModuleDefaultHelper","kind":"varGroup","status":"implemented","sigHash":"b1b742b59c2977bdfdf169685cd00561ab8f021244c16e6b7e11aa2088ba5188"}
 *
 * Go source:
 * var setModuleDefaultHelper = &EmitHelper{
 * 	Name:       "typescript:commonjscreatevalue",
 * 	ImportName: "__setModuleDefault",
 * 	Scoped:     false,
 * 	Priority:   &Priority{1},
 * 	Text: `var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
 *     Object.defineProperty(o, "default", { enumerable: true, value: v });
 * }) : function(o, v) {
 *     o["default"] = v;
 * });`,
 * }
 */
export let setModuleDefaultHelper: GoPtr<EmitHelper> = {
  Name: "typescript:commonjscreatevalue",
  ImportName: "__setModuleDefault",
  Scoped: false,
  Priority: { Value: 1 },
  Text: `var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});`,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::importStarHelper","kind":"varGroup","status":"implemented","sigHash":"8968cbc26954e820f0d60edb2513bbf0a27e98d0a9a607d491254fe56c7616ac"}
 *
 * Go source:
 * var importStarHelper = &EmitHelper{
 * 	Name:         "typescript:commonjsimportstar",
 * 	ImportName:   "__importStar",
 * 	Scoped:       false,
 * 	Dependencies: []*EmitHelper{createBindingHelper, setModuleDefaultHelper},
 * 	Priority:     &Priority{2},
 * 	Text: `var __importStar = (this && this.__importStar) || (function () {
 *     var ownKeys = function(o) {
 *         ownKeys = Object.getOwnPropertyNames || function (o) {
 *             var ar = [];
 *             for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
 *             return ar;
 *         };
 *         return ownKeys(o);
 *     };
 *     return function (mod) {
 *         if (mod && mod.__esModule) return mod;
 *         var result = {};
 *         if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
 *         __setModuleDefault(result, mod);
 *         return result;
 *     };
 * })();`,
 * }
 */
export let importStarHelper: GoPtr<EmitHelper> = {
  Name: "typescript:commonjsimportstar",
  ImportName: "__importStar",
  Scoped: false,
  Dependencies: GoSliceBuild(2, 2, GoPointerValueOps<EmitHelper>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, createBindingHelper, GoPointerValueOps<EmitHelper>());
    GoSliceStore(__goSliceLiteral, 1, setModuleDefaultHelper, GoPointerValueOps<EmitHelper>());
  }),
  Priority: { Value: 2 },
  Text: `var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();`,
  TextCallback: undefined,
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::importDefaultHelper","kind":"varGroup","status":"implemented","sigHash":"4649bb2547c39695ca076935e3a381bb731753595534bb1019851766eb0d109b"}
 *
 * Go source:
 * var importDefaultHelper = &EmitHelper{
 * 	Name:       "typescript:commonjsimportdefault",
 * 	ImportName: "__importDefault",
 * 	Scoped:     false,
 * 	Text: `var __importDefault = (this && this.__importDefault) || function (mod) {
 *     return (mod && mod.__esModule) ? mod : { "default": mod };
 * };`,
 * }
 */
export let importDefaultHelper: GoPtr<EmitHelper> = {
  Name: "typescript:commonjsimportdefault",
  ImportName: "__importDefault",
  Scoped: false,
  Text: `var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::exportStarHelper","kind":"varGroup","status":"implemented","sigHash":"ae66b88854d4e346b3c473cd32ea9eef92854d9026b5c6f5b896ddfb40f41156"}
 *
 * Go source:
 * var exportStarHelper = &EmitHelper{
 * 	Name:         "typescript:export-star",
 * 	ImportName:   "__exportStar",
 * 	Scoped:       false,
 * 	Dependencies: []*EmitHelper{createBindingHelper},
 * 	Priority:     &Priority{2},
 * 	Text: `var __exportStar = (this && this.__exportStar) || function(m, exports) {
 *     for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
 * };`,
 * }
 */
export let exportStarHelper: GoPtr<EmitHelper> = {
  Name: "typescript:export-star",
  ImportName: "__exportStar",
  Scoped: false,
  Dependencies: GoSliceBuild(1, 1, GoPointerValueOps<EmitHelper>(), (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, createBindingHelper, GoPointerValueOps<EmitHelper>());
  }),
  Priority: { Value: 2 },
  Text: `var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};`,
  TextCallback: undefined,
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/helpers.go::varGroup::rewriteRelativeImportExtensionsHelper","kind":"varGroup","status":"implemented","sigHash":"38417c6ee84dae5779f948c2b50cd470da0d58098f5f2c7b7befdb3eab018abd"}
 *
 * Go source:
 * var rewriteRelativeImportExtensionsHelper = &EmitHelper{
 * 	Name:       "typescript:rewriteRelativeImportExtensions",
 * 	ImportName: "__rewriteRelativeImportExtension",
 * 	Scoped:     false,
 * 	Text: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
 *     if (typeof path === "string" && /^\.\.?\//.test(path)) {
 *         return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
 *             return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
 *         });
 *     }
 *     return path;
 * };`,
 * }
 */
export let rewriteRelativeImportExtensionsHelper: GoPtr<EmitHelper> = {
  Name: "typescript:rewriteRelativeImportExtensions",
  ImportName: "__rewriteRelativeImportExtension",
  Scoped: false,
  Text: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\\.\\.?\\//.test(path)) {
        return path.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+?)?)\\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};`,
  Priority: undefined,
  TextCallback: undefined,
  Dependencies: GoNilSlice(),
};
