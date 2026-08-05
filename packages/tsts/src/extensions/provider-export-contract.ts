import type {
  ProviderExportDeclaration,
  ProviderTypeParameterDeclaration,
} from "./host.js";
import {
  canonicalizeProviderAbiModel,
  canonicalizeProviderAbiTypeParameter,
} from "./provider-model-graph.js";

export function getProviderExportContractKeyMap(moduleSpecifier: string, exports: readonly ProviderExportDeclaration[]): ReadonlyMap<string, string> {
  const canonicalExports = canonicalizeProviderAbiModel({
    moduleSpecifier,
    providerModuleId: "provider-contract",
    exports,
  }).exports;
  const declarationsByExport = new Map<string, ProviderExportDeclaration[]>();
  for (const declaration of canonicalExports) {
    const exportName = getProviderSourceExportName(declaration);
    const declarations = declarationsByExport.get(exportName) ?? [];
    declarations.push(declaration);
    declarationsByExport.set(exportName, declarations);
  }
  return new Map([...declarationsByExport]
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([exportName, declarations]) => [
      exportName,
      JSON.stringify(declarations.sort(compareProviderContractDeclarations)),
    ]));
}

export interface ProviderIncrementalExportContract {
  readonly sourceExportName: string;
  readonly typeArgumentCount?: number;
  readonly headerKey: string;
  readonly bodyKey?: string;
}

export function getProviderIncrementalExportContractMap(
  moduleSpecifier: string,
  exports: readonly ProviderExportDeclaration[],
): ReadonlyMap<string, ProviderIncrementalExportContract> {
  const canonicalExports = canonicalizeProviderAbiModel({
    moduleSpecifier,
    providerModuleId: "provider-incremental-contract",
    exports,
  }).exports;
  return new Map(canonicalExports.map((declaration) => {
    const sourceExportName = getProviderSourceExportName(declaration);
    const typeArgumentCount = declaration.sourceTypeFamily?.typeArgumentCount;
    const { members, signatures, ...header } = declaration;
    const contract = Object.freeze({
      sourceExportName,
      ...(typeArgumentCount === undefined ? {} : { typeArgumentCount }),
      headerKey: JSON.stringify(header),
      ...(members === undefined && signatures === undefined
        ? {}
        : { bodyKey: JSON.stringify({ members, signatures }) }),
    });
    return [
      JSON.stringify([sourceExportName, typeArgumentCount ?? null]),
      contract,
    ];
  }));
}

export function getProviderTypeParameterContractKey(parameter: ProviderTypeParameterDeclaration): string {
  return JSON.stringify(canonicalizeProviderAbiTypeParameter(parameter));
}

function compareProviderContractDeclarations(left: ProviderExportDeclaration, right: ProviderExportDeclaration): number {
  const leftArity = left.sourceTypeFamily?.typeArgumentCount ?? -1;
  const rightArity = right.sourceTypeFamily?.typeArgumentCount ?? -1;
  if (leftArity !== rightArity) {
    return leftArity - rightArity;
  }
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

function getProviderExportName(declaration: ProviderExportDeclaration): string {
  return declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name;
}

function getProviderSourceExportName(declaration: ProviderExportDeclaration): string {
  return declaration.sourceTypeFamily?.exportName ?? getProviderExportName(declaration);
}
