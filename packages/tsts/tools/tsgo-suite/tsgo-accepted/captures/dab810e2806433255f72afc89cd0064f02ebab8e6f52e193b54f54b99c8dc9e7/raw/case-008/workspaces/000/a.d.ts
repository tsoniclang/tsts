export type SpecialString = string;
type PrivateSpecialString = string;
export declare namespace N {
    type SpecialString = string;
}
export declare const o: (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => {
    foo: SpecialString;
    bar: PrivateSpecialString;
    baz: N.SpecialString;
};
export {};
