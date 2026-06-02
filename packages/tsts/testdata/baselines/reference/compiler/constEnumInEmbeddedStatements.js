//// [constEnumInEmbeddedStatements.ts] ////

//// [/.src/constEnumInEmbeddedStatements.ts] ////
function t(x: number) {
    if (x)
        /* before E */ const enum E { A = 1 } /* after E */
}


//// [constEnumInEmbeddedStatements.js]
function t(x: number) {
    if (x)
        /* before E */ const enum E { A = 1 } /* after E */
}


//// [Diagnostics]

error TS1389: 'enum' is not allowed as a variable declaration name.

!!! error TS1389: 'enum' is not allowed as a variable declaration name.==== /.src/constEnumInEmbeddedStatements.ts (0 errors) ====
    function t(x: number) {
        if (x)
            /* before E */ const enum E { A = 1 } /* after E */
    }
    