//// [objectSubtypeReduction.ts] ////

//// [/.src/objectSubtypeReduction.ts] ////
// https://github.com/microsoft/typescript-go/issues/1164

function foo(x?: object) {
    return Object.entries(x || {})
        .sort(([k1, v1], [k2, v2]) => v1.name.localeCompare(v2.name));
}


//// [objectSubtypeReduction.js]
// https://github.com/microsoft/typescript-go/issues/1164

function foo(x?: object) {
    return Object.entries(x || {})
        .sort(([k1, v1], [k2, v2]) => v1.name.localeCompare(v2.name));
}
