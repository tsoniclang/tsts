export var ns;
(function (ns) {
    let internal;
    (function (internal) {
        class Foo {
        }
        internal.Foo = Foo;
    })(internal || (internal = {}));
    let nested;
    (function (nested) {
        nested.inner = internal;
    })(nested = ns.nested || (ns.nested = {}));
})(ns || (ns = {}));
