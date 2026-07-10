export declare const nImported = "nImported";
export declare const nNotImported = "nNotImported";
declare const nPrivate = "private";
export declare const o: (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => {
    foo: typeof nImported;
    bar: typeof nPrivate;
    baz: typeof nNotImported;
};
export {};
