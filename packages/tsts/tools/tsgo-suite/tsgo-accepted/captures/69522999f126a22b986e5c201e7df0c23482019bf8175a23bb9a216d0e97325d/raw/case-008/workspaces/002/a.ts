export type SpecialString = string;
type PrivateSpecialString = string;

export namespace N {
    export type SpecialString = string;
}
export const o = (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => null! as { foo: SpecialString, bar: PrivateSpecialString, baz: N.SpecialString };
