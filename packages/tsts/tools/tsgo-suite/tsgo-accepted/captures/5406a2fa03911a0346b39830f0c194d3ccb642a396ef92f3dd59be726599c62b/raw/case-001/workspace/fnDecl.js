export function fnDeclBasic1(p = [], rParam) { }
;
export function fnDeclBasic2(p = () => null, rParam) { }
;
export function fnDeclBasic3(p = class {
}, rParam) { }
;
export function fnDeclBasic4(p = [[]], rParam) { }
;
export function fnDeclBasic5(p = { a: [] }, rParam) { }
;
export function fnDeclBasic6(p = "_", rParam) { }
;
export function fnDeclBasic7(p = [], rParam) { }
;
export function fnDeclBasic8(p = [], rParam) { }
;
export function fnDeclHasUndefined(p = [], rParam) { }
;
export function fnDeclBad(p = [], rParam) { }
;
export const fnExprOk1 = function (array = [], rParam) { };
export const fnExprOk2 = function (array = [], rParam) { };
export const fnExprBad = function (array = [], rParam) { };
export const arrowOk1 = (array = [], rParam) => { };
export const arrowOk2 = (array = [], rParam) => { };
export const arrowBad = (array = [], rParam) => { };
export const inObjectLiteralFnExprOk1 = { o: function (array = [], rParam) { } };
export const inObjectLiteralFnExprOk2 = { o: function (array = [], rParam) { } };
export const inObjectLiteralFnExprBad = { o: function (array = [], rParam) { } };
export const inObjectLiteralArrowOk1 = { o: (array = [], rParam) => { } };
export const inObjectLiteralArrowOk2 = { o: (array = [], rParam) => { } };
export const inObjectLiteralArrowBad = { o: (array = [], rParam) => { } };
export const inObjectLiteralMethodOk1 = { o(array = [], rParam) { } };
export const inObjectLiteralMethodOk2 = { o(array = [], rParam) { } };
export const inObjectLiteralMethodBad = { o(array = [], rParam) { } };
export class InClassFnExprOk1 {
    o = function (array = [], rParam) { };
}
;
export class InClassFnExprOk2 {
    o = function (array = [], rParam) { };
}
;
export class InClassFnExprBad {
    o = function (array = [], rParam) { };
}
;
export class InClassArrowOk1 {
    o = (array = [], rParam) => { };
}
;
export class InClassArrowOk2 {
    o = (array = [], rParam) => { };
}
;
export class InClassArrowBad {
    o = (array = [], rParam) => { };
}
;
export class InClassMethodOk1 {
    o(array = [], rParam) { }
}
;
export class InClassMethodOk2 {
    o(array = [], rParam) { }
}
;
export class InClassMethodBad {
    o(array = [], rParam) { }
}
;
// https://github.com/microsoft/TypeScript/issues/60976
class Bar {
}
export class ClsWithRequiredInitializedParameter {
    arr;
    bool;
    constructor(arr = new Bar(), bool) {
        this.arr = arr;
        this.bool = bool;
    }
}
