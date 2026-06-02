//// [typeParameterComparableRelation.ts] ////

//// [/.src/typeParameterComparableRelation.ts] ////
// https://github.com/microsoft/typescript-go/issues/1462

type StringOrT<T> = T | string

function func<A, B, T extends StringOrT<B>>(thing: T): void {
    thing as A; // Error
}


//// [typeParameterComparableRelation.js]
// https://github.com/microsoft/typescript-go/issues/1462

type StringOrT<T> = T | string

function func<A, B, T extends StringOrT<B>>(thing: T): void {
    thing as A; // Error
}
