//// [constructSignatureWithInferReturnType.ts] ////

//// [constructSignatureWithInferReturnType.ts]
type ExtractReturn<T> = T extends { new(): infer R } ? R : never;


//// [constructSignatureWithInferReturnType.js]

