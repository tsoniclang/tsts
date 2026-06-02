//// [constructSignatureWithInferReturnType.ts] ////

//// [/.src/constructSignatureWithInferReturnType.ts] ////
type ExtractReturn<T> = T extends { new(): infer R } ? R : never;


//// [constructSignatureWithInferReturnType.js]
type ExtractReturn<T> = T extends { new(): infer R } ? R : never;


//// [constructSignatureWithInferReturnType.d.ts]
type ExtractReturn<T> = T extends { new(): infer R } ? R : never;
