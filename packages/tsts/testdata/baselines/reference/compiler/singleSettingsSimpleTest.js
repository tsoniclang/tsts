//// [singleSettingsSimpleTest.ts] ////

//// [/.src/singleSettingsSimpleTest.ts] ////
export {};
const x: string = undefined;

//// [singleSettingsSimpleTest.js]
export {  };
const x = undefined;


//// [Diagnostics]

error TS0: Type 'undefined' is not assignable to type 'string'.

==== /.src/singleSettingsSimpleTest.ts (1 errors) ====
    export {};
    ~
!!! error TS0: Type 'undefined' is not assignable to type 'string'.
    const x: string = undefined;