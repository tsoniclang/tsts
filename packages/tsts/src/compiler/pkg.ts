/**
 * Compiler package metadata.
 *
 * Mirrors TS-Go `internal/compiler/pkg.go`: this module marks the compiler
 * package boundary and gives TSTS importers one explicit source of package
 * identity instead of scattering string literals.
 */

export const compilerPackageName = "compiler";
export const compilerPackageDescription = "TypeScript compiler implementation";

export interface CompilerPackageIdentity {
  readonly name: string;
  readonly description: string;
}

export function getCompilerPackageIdentity(): CompilerPackageIdentity {
  return {
    name: compilerPackageName,
    description: compilerPackageDescription,
  };
}
