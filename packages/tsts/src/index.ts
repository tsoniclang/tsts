export * from "./api/binary-ast/index.js";
export * from "./ast/index.js";
export * from "./binder/index.js";
export * from "./checker/index.js";
export * from "./compiler/index.js";
export * from "./config/index.js";
export * from "./emit-js/index.js";
export * from "./parser/index.js";
export * from "./program/index.js";
export * from "./scanner/index.js";

// `skipTrivia`, `getECMALineOfPosition`, and `getECMALineAndUTF16CharacterOfPosition`
// are re-exported by both `./ast/index.js` (AstNode-adapted shims that delegate
// here) and `./scanner/index.js` (the canonical, faithful scanner.go ports). The
// scanner is the canonical owner, so disambiguate the package root in its favor.
export {
  skipTrivia,
  getECMALineOfPosition,
  getECMALineAndUTF16CharacterOfPosition,
} from "./scanner/index.js";
