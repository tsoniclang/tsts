import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Body, Node_Members, Node_ModifierFlags, Node_Symbol, Node_Text, SourceFile_FileName } from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { ModifierFlagsStatic } from "../internal/ast/modifierflags.js";
import {
  KindConstructSignature,
  KindConstructor,
  KindEnumMember,
  KindFunctionDeclaration,
  KindIndexSignature,
  KindMethodDeclaration,
  KindMethodSignature,
  KindModuleDeclaration,
  KindPropertyDeclaration,
  KindPropertySignature,
  KindVariableDeclaration,
} from "../internal/ast/generated/kinds.js";
import {
  canonicalIdentityFactKey,
  providerVirtualDeclarationFactKey,
  targetBindingFactKey,
} from "./facts.js";
import type {
  ArgumentPassingMode,
  ProviderDeclarationIdentity,
  ProviderVirtualDeclarationFact,
  TargetBindingFact,
  TargetConstraint,
  TargetMember,
  TargetParameter,
  TargetTypeParameter,
  TargetTypeRef,
} from "./facts.js";
import { ExtensionLifecycleEvent, getExtensionHost } from "./host.js";
import type {
  ExtensionEvidence,
  ExtensionHost,
  ProviderExportDeclaration,
  ProviderMemberDeclaration,
  ProviderParameterDeclaration,
  ProviderPropertyName,
  ProviderResolvedModule,
  ProviderSignatureDeclaration,
  ProviderTypeParameterDeclaration,
  ProviderTypeExpression,
} from "./host.js";

export function recordBoundSourceFileExtensionFacts(program: object, file: GoPtr<SourceFile>): void {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined || file === undefined) {
    return;
  }

  const fileName = SourceFile_FileName(file);
  const virtualModule = extensionHost.providers.getVirtualModuleByFileName(fileName);
  if (virtualModule !== undefined) {
    recordProviderVirtualModuleFacts(extensionHost, file, virtualModule);
  }
  extensionHost.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
    sourceFile: file,
    fileName,
    ...(virtualModule !== undefined ? { providerVirtualModule: virtualModule } : {}),
  });
}

export function finalizeExtensionSemantics(program: object): ExtensionHost | undefined {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined) {
    return undefined;
  }
  extensionHost.finalizeSemantics();
  return extensionHost;
}

function recordProviderVirtualModuleFacts(extensionHost: ExtensionHost, file: SourceFile, virtualModule: ProviderResolvedModule): void {
  const evidence = getProviderVirtualModuleEvidence(virtualModule);
  extensionHost.facts.set(file, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
    ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
    subpath: virtualModule.resolution.moduleSpecifier,
  }, evidence);
  extensionHost.facts.set(file, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

  const fileSymbol = Node_Symbol(file as GoPtr<Node>);
  if (fileSymbol === undefined) {
    return;
  }

  extensionHost.facts.set(fileSymbol, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
    ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
    subpath: virtualModule.resolution.moduleSpecifier,
    canonicalSymbolId: getSymbolFactId(fileSymbol),
  }, evidence);
  extensionHost.facts.set(fileSymbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

  for (const declaration of virtualModule.declarationModel.exports) {
    const exportName = getProviderExportName(declaration);
    const symbol = fileSymbol.Exports?.get(exportName) ?? fileSymbol.Exports?.get(declaration.name);
    if (symbol === undefined) {
      continue;
    }
    extensionHost.facts.set(symbol, canonicalIdentityFactKey, {
      kind: "export",
      id: `${virtualModule.declarationModel.providerModuleId}::${exportName}`,
      ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
      ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
      subpath: virtualModule.resolution.moduleSpecifier,
      exportName,
      canonicalSymbolId: getSymbolFactId(symbol),
    }, evidence);
    extensionHost.facts.set(symbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule, declaration), evidence);
    if (declaration.signatures === undefined || declaration.signatures.length === 0) {
      for (const exportDeclaration of symbol.Declarations ?? []) {
        if (exportDeclaration === undefined) {
          continue;
        }
        extensionHost.facts.set(
          exportDeclaration,
          providerVirtualDeclarationFactKey,
          getProviderVirtualDeclarationFact(virtualModule, declaration),
          evidence,
        );
      }
    }

    const targetBinding = getTargetBindingFact(virtualModule, declaration);
    if (targetBinding !== undefined) {
      extensionHost.facts.set(symbol, targetBindingFactKey, targetBinding, evidence);
    }

    if (declaration.signatures !== undefined && declaration.signatures.length > 0) {
      recordProviderVirtualSignatureFacts(
        extensionHost,
        symbol,
        virtualModule,
        declaration,
        declaration.signatures,
        evidence,
      );
    }

    if (declaration.members !== undefined) {
      recordProviderVirtualMemberFacts(extensionHost, symbol, virtualModule, declaration, evidence);
    }
  }
}

function getProviderVirtualModuleEvidence(virtualModule: ProviderResolvedModule): readonly ExtensionEvidence[] {
  return [{
    message: "provider virtual module",
    details: {
      provider: virtualModule.provider.identity,
      moduleSpecifier: virtualModule.resolution.moduleSpecifier,
      providerModuleId: virtualModule.resolution.providerModuleId,
      virtualFileName: virtualModule.resolution.virtualFileName,
    },
  }];
}

function recordProviderVirtualMemberFacts(
  extensionHost: ExtensionHost,
  exportSymbol: Symbol,
  virtualModule: ProviderResolvedModule,
  declaration: ProviderExportDeclaration,
  evidence: readonly ExtensionEvidence[],
): void {
  const memberNodes = (exportSymbol.Declarations ?? []).flatMap(getProviderMemberCandidateNodes);
  const usedMemberNodes = new Set<Node>();
  for (const member of declaration.members ?? []) {
    const matchingMemberNodes = memberNodes.filter((node) =>
      node !== undefined
      && !usedMemberNodes.has(node)
      && providerMemberMatchesNode(member, node));
    const memberSymbol = findProviderMemberSymbol(exportSymbol, member, matchingMemberNodes);
    if (memberSymbol !== undefined) {
      extensionHost.facts.set(
        memberSymbol,
        providerVirtualDeclarationFactKey,
        getProviderVirtualDeclarationFact(virtualModule, declaration, member),
        evidence,
      );
    }
    for (let index = 0; index < matchingMemberNodes.length; index++) {
      const memberNode = matchingMemberNodes[index];
      if (memberNode === undefined) {
        continue;
      }
      usedMemberNodes.add(memberNode);
      const signature = member.signatures?.[index] ?? member.signatures?.[0];
      extensionHost.facts.set(
        memberNode,
        providerVirtualDeclarationFactKey,
        getProviderVirtualDeclarationFact(virtualModule, declaration, member, signature),
        evidence,
      );
      const nodeSymbol = Node_Symbol(memberNode);
      if (nodeSymbol !== undefined && nodeSymbol !== memberSymbol) {
        extensionHost.facts.set(
          nodeSymbol,
          providerVirtualDeclarationFactKey,
          getProviderVirtualDeclarationFact(virtualModule, declaration, member),
          evidence,
        );
      }
    }
  }
}

function findProviderMemberSymbol(exportSymbol: Symbol, member: ProviderMemberDeclaration, matchingMemberNodes: readonly GoPtr<Node>[]): GoPtr<Symbol> {
  for (const node of matchingMemberNodes) {
    const symbol = Node_Symbol(node);
    if (symbol !== undefined) {
      return symbol;
    }
  }
  const memberName = getProviderPropertyNameText(member.name);
  return exportSymbol.Members?.get(memberName) ?? exportSymbol.Exports?.get(memberName);
}

function providerMemberMatchesNode(member: ProviderMemberDeclaration, node: Node): boolean {
  if (!providerMemberKindMatchesNode(member, node)) {
    return false;
  }
  if (member.kind !== "constructor" && member.kind !== "indexer" && getProviderPropertyNameText(member.name) !== Node_Text(Node_Name(node))) {
    return false;
  }
  if (member.static !== undefined && ((Node_ModifierFlags(node) & ModifierFlagsStatic) !== 0) !== member.static) {
    return false;
  }
  return true;
}

function providerMemberKindMatchesNode(member: ProviderMemberDeclaration, node: Node): boolean {
  switch (member.kind) {
    case "constructor":
      return node.Kind === KindConstructor || node.Kind === KindConstructSignature;
    case "method":
      return node.Kind === KindMethodDeclaration || node.Kind === KindMethodSignature || node.Kind === KindFunctionDeclaration;
    case "property":
    case "field":
      return node.Kind === KindPropertyDeclaration || node.Kind === KindPropertySignature || node.Kind === KindEnumMember || node.Kind === KindVariableDeclaration;
    case "indexer":
      return node.Kind === KindIndexSignature;
  }
}

function getProviderMemberCandidateNodes(exportDeclaration: GoPtr<Node>): readonly GoPtr<Node>[] {
  if (exportDeclaration === undefined) {
    return [];
  }
  if (exportDeclaration.Kind !== KindModuleDeclaration) {
    return Node_Members(exportDeclaration) ?? [];
  }
  const candidates: GoPtr<Node>[] = [];
  collectProviderNamespaceMemberCandidateNodes(Node_Body(exportDeclaration), candidates);
  return candidates;
}

function collectProviderNamespaceMemberCandidateNodes(node: GoPtr<Node>, candidates: GoPtr<Node>[]): void {
  if (node === undefined) {
    return;
  }
  switch (node.Kind) {
    case KindFunctionDeclaration:
    case KindVariableDeclaration:
      candidates.push(node);
      return;
    default:
      Node_ForEachChild(node, (child) => {
        collectProviderNamespaceMemberCandidateNodes(child, candidates);
        return false;
      });
  }
}

function recordProviderVirtualSignatureFacts(
  extensionHost: ExtensionHost,
  symbol: Symbol,
  virtualModule: ProviderResolvedModule,
  declaration: ProviderExportDeclaration,
  signatures: readonly ProviderSignatureDeclaration[],
  evidence: readonly ExtensionEvidence[],
  member?: ProviderMemberDeclaration,
): void {
  if (signatures.length === 0 || symbol.Declarations === undefined) {
    return;
  }

  for (let index = 0; index < signatures.length; index++) {
    const signatureDeclaration = symbol.Declarations[index];
    if (signatureDeclaration === undefined) {
      continue;
    }
    extensionHost.facts.set(
      signatureDeclaration,
      providerVirtualDeclarationFactKey,
      getProviderVirtualDeclarationFact(virtualModule, declaration, member, signatures[index]),
      evidence,
    );
  }
}

function getSymbolFactId(symbol: Symbol): string {
  return `${symbol.Name}:${String(symbol.id)}`;
}

function getTargetBindingFact(virtualModule: ProviderResolvedModule, declaration: ProviderExportDeclaration): TargetBindingFact | undefined {
  if (declaration.targetIdentity === undefined) {
    return undefined;
  }
  return {
    id: declaration.targetIdentity.id,
    sourceName: getProviderExportName(declaration),
    targetName: declaration.targetIdentity.displayName ?? declaration.targetIdentity.id,
    target: declaration.targetIdentity.target,
    kind: getTargetBindingKind(declaration.kind),
    ...(declaration.typeParameters !== undefined
      ? {
        typeParameters: declaration.typeParameters.map(getTargetTypeParameter),
      }
      : {}),
    ...(declaration.members !== undefined ? { members: declaration.members.flatMap((member) => getTargetMembers(virtualModule, declaration, member)) } : {}),
  };
}

function getTargetTypeParameter(parameter: ProviderTypeParameterDeclaration): TargetTypeParameter {
  const constraints = (parameter.constraints ?? []).flatMap(getTargetConstraint);
  return {
    name: parameter.name,
    ...(constraints.length > 0 ? { constraints } : {}),
    ...(parameter.variance !== undefined ? { variance: parameter.variance } : {}),
  };
}

function getTargetMembers(virtualModule: ProviderResolvedModule, declaration: ProviderExportDeclaration, member: ProviderMemberDeclaration): readonly TargetMember[] {
  const sourceName = getProviderPropertyNameText(member.name);
  if (member.signatures !== undefined && member.signatures.length > 0) {
    return member.signatures.map((signature) => getTargetMemberFromSignature(sourceName, member.kind, signature, virtualModule, declaration, member));
  }
  return [{
    id: member.id,
    sourceName,
    targetName: sourceName,
    kind: member.kind,
    parameters: [],
    ...(member.static !== undefined ? { static: member.static } : {}),
    ...(member.type !== undefined ? { returnType: getTargetTypeRef(member.type) } : {}),
    providerDeclaration: getProviderDeclarationIdentity(virtualModule, declaration, member),
  }];
}

function getTargetMemberFromSignature(sourceName: string, kind: TargetMember["kind"], signature: ProviderSignatureDeclaration, virtualModule: ProviderResolvedModule, declaration: ProviderExportDeclaration, member?: ProviderMemberDeclaration): TargetMember {
  const typeParameters = (signature.typeParameters ?? []).map(getTargetTypeParameter);
  return {
    id: signature.id,
    sourceName,
    targetName: signature.name ?? (member === undefined ? sourceName : getProviderPropertyNameText(member.name)),
    kind,
    parameters: signature.parameters.map(getTargetParameter),
    ...(member?.static !== undefined ? { static: member.static } : {}),
    ...(signature.returnType !== undefined ? { returnType: getTargetTypeRef(signature.returnType) } : {}),
    ...(typeParameters.length > 0 ? { typeParameters } : {}),
    overloadGroup: member?.id ?? sourceName,
    providerDeclaration: getProviderDeclarationIdentity(virtualModule, declaration, member, signature),
  };
}

function getTargetParameter(parameter: ProviderParameterDeclaration): TargetParameter {
  return {
    name: parameter.name,
    type: getTargetTypeRef(parameter.type),
    passingMode: getArgumentPassingMode(parameter),
    ...(parameter.optional === true ? { optional: true } : {}),
    ...(parameter.rest === true ? { paramsArray: true } : {}),
  };
}

function getArgumentPassingMode(parameter: ProviderParameterDeclaration): ArgumentPassingMode {
  return "by-value";
}

function getTargetConstraint(type: ProviderTypeExpression): readonly TargetConstraint[] {
  switch (type.kind) {
    case "target-named":
      return [{
        kind: "implements",
        contract: type.id,
        ...(type.typeArguments !== undefined ? { typeArguments: type.typeArguments.map(getTargetTypeRef) } : {}),
      }];
    default:
      return [];
  }
}

function getTargetTypeRef(type: ProviderTypeExpression): TargetTypeRef {
  switch (type.kind) {
    case "boolean":
      return { kind: "source-primitive", name: "bool" };
    case "bigint":
      return { kind: "source-primitive", name: "int64" };
    case "source-primitive":
      return { kind: "source-primitive", name: type.name };
    case "type-parameter":
      return { kind: "type-parameter", name: type.name };
    case "target-named":
      return {
        kind: "target-named",
        id: type.id,
        ...(type.typeArguments !== undefined ? { typeArguments: type.typeArguments.map(getTargetTypeRef) } : {}),
      };
    case "array":
      return { kind: "array", element: getTargetTypeRef(type.elementType) };
    case "tuple":
      return { kind: "tuple", elements: type.elementTypes.map(getTargetTypeRef) };
    case "function":
      return {
        kind: "function-pointer",
        args: type.parameters.map((parameter) => getTargetTypeRef(parameter.type)),
        result: getTargetTypeRef(type.returnType),
      };
    case "opaque":
      return { kind: "opaque", id: type.id };
    case "provider-ref":
      return { kind: "opaque", id: `${type.moduleSpecifier}::${type.exportName}` };
    case "string":
    case "number":
    case "any":
    case "unknown":
    case "void":
    case "never":
    case "object":
    case "union":
    case "intersection":
    case "literal":
      return { kind: "opaque", id: type.kind };
  }
}

function getProviderVirtualDeclarationFact(
  virtualModule: ProviderResolvedModule,
  declaration?: ProviderExportDeclaration,
  member?: ProviderMemberDeclaration,
  signature?: ProviderSignatureDeclaration,
): ProviderVirtualDeclarationFact {
  return {
    providerId: virtualModule.provider.identity.id,
    providerVersion: virtualModule.provider.identity.version,
    providerModuleId: virtualModule.resolution.providerModuleId,
    moduleSpecifier: virtualModule.resolution.moduleSpecifier,
    virtualFileName: virtualModule.resolution.virtualFileName,
    ...(declaration !== undefined ? { exportName: getProviderExportName(declaration) } : {}),
    ...(declaration !== undefined ? { exportId: declaration.id } : {}),
    ...(member !== undefined ? { memberName: getProviderPropertyNameText(member.name) } : {}),
    ...(member !== undefined ? { memberId: member.id } : {}),
    ...(signature !== undefined ? { signatureId: signature.id } : {}),
    ...(declaration?.targetIdentity !== undefined
      ? {
        targetIdentity: {
          kind: "target-named",
          id: declaration.targetIdentity.id,
        } satisfies TargetTypeRef,
      }
      : {}),
  };
}

function getProviderExportName(declaration: ProviderExportDeclaration): string {
  return declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name;
}

function getProviderPropertyNameText(name: ProviderPropertyName): string {
  if (typeof name === "string") {
    return name;
  }
  switch (name.kind) {
    case "identifier":
    case "string-literal":
      return name.text;
    case "number-literal":
      return String(name.value);
    case "well-known-symbol":
      return `Symbol.${name.name}`;
  }
}

function getProviderDeclarationIdentity(
  virtualModule: ProviderResolvedModule,
  declaration: ProviderExportDeclaration,
  member?: ProviderMemberDeclaration,
  signature?: ProviderSignatureDeclaration,
): ProviderDeclarationIdentity {
  return getProviderVirtualDeclarationFact(virtualModule, declaration, member, signature);
}

function getTargetBindingKind(kind: ProviderExportDeclaration["kind"]): TargetBindingFact["kind"] {
  switch (kind) {
    case "class":
      return "class";
    case "interface":
      return "interface";
    case "enum":
      return "enum";
    case "function":
      return "function";
    case "opaque":
      return "opaque";
    case "type":
    case "value":
    case "namespace":
      return "opaque";
  }
}
