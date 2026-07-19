import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Body, Node_Expression, Node_Locals, Node_Members, Node_ModifierFlags, Node_Symbol, Node_Text, Node_TypeArguments, SourceFile_FileName, SourceFile_Text } from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name, Node_Pos } from "../internal/ast/spine.js";
import type { Symbol } from "../internal/ast/symbol.js";
import type { Type } from "../internal/checker/types.js";
import type { Program } from "../internal/compiler/program.js";
import { Program_GetSemanticDiagnostics } from "../internal/compiler/program.js";
import { ModifierFlagsStatic } from "../internal/ast/modifierflags.js";
import { GetSymbolId } from "../internal/ast/utilities.js";
import * as utf8 from "../go/unicode/utf8.js";
import {
  KindClassDeclaration,
  KindComputedPropertyName,
  KindConstructSignature,
  KindConstructor,
  KindEnumDeclaration,
  KindEnumMember,
  KindFunctionDeclaration,
  KindFunctionType,
  KindIndexSignature,
  KindInterfaceDeclaration,
  KindMethodDeclaration,
  KindMethodSignature,
  KindModuleDeclaration,
  KindPropertyDeclaration,
  KindPropertyAccessExpression,
  KindPropertySignature,
  KindTypeAliasDeclaration,
  KindVariableDeclaration,
} from "../internal/ast/generated/kinds.js";
import {
  canonicalIdentityFactKey,
  instantiatedTargetTypeFactKey,
  providerTypeFamilyFactKey,
  providerVirtualDeclarationFactKey,
  targetBindingFactKey,
} from "./facts.js";
import type {
  ArgumentPassingMode,
  ProviderDeclarationIdentity,
  ProviderMemberKey,
  ProviderTypeFamilyFact,
  ProviderVirtualDeclarationFact,
  TargetBindingFact,
  TargetConstraint,
  TargetMember,
  TargetParameter,
  TargetTypeParameter,
  TargetTypeRef,
} from "./facts.js";
import { ExtensionLifecycleEvent, extensionHostSetFact, getExtensionHost } from "./host.js";
import type {
  ExtensionEvidence,
  ExtensionHost,
  ProviderExportDeclaration,
  ProviderMemberDeclaration,
  ProviderParameterDeclaration,
  ProviderPropertyName,
  ProviderSignatureDeclaration,
  ProviderTypeParameterDeclaration,
  ProviderTypeExpression,
  ProviderVirtualModuleArtifact,
} from "./host.js";
import {
  getProviderVirtualArtifactForCompiler,
  getProviderVirtualCompilerMetadata,
  type ProviderVirtualCompilerArtifact,
} from "./provider-virtual-internal.js";
import { parseProviderFunctionSignatureMarker, providerFunctionSignatureMarkerMaximumLength } from "./provider-callable-signatures.js";
import { extensionHostAllowsSemanticQueryPreflight } from "./host-attachment.js";

export function recordBoundSourceFileExtensionFacts(program: object, file: GoPtr<SourceFile>): void {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined || file === undefined) {
    return;
  }
  if (!extensionHost[extensionHostAllowsSemanticQueryPreflight]()) {
    return;
  }

  const fileName = SourceFile_FileName(file);
  const virtualArtifact = getProviderVirtualArtifactForCompiler(extensionHost.providers, fileName);
  if (virtualArtifact !== undefined) {
    recordProviderVirtualModuleFacts(extensionHost, file, virtualArtifact);
  }
  if (virtualArtifact?.kind === "canonical-export-owner") {
    return;
  }
  extensionHost.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
    sourceFile: file,
    fileName,
    ...(virtualArtifact !== undefined ? { providerVirtualArtifact: virtualArtifact } : {}),
  }, file);
}

export function finalizeExtensionSemantics(program: object): ExtensionHost | undefined {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined) {
    return undefined;
  }
  Program_GetSemanticDiagnostics(extensionHost.program as GoPtr<Program>, Background(), undefined);
  extensionHost.finalizeSemantics();
  return extensionHost;
}

export function recordProviderTypeFamilyReferenceFacts(extensionHost: ExtensionHost, typeReference: GoPtr<Node>, type: GoPtr<Type>, symbol: GoPtr<Symbol>): void {
  if (typeReference === undefined || symbol === undefined) {
    return;
  }
  const family = extensionHost.facts.get(symbol, providerTypeFamilyFactKey);
  if (family === undefined) {
    return;
  }
  const sourceTypeArgumentCount = (Node_TypeArguments(typeReference) ?? []).length;
  const variant = family.variants.find((candidate) => candidate.sourceTypeArgumentCount === sourceTypeArgumentCount);
  if (variant === undefined) {
    return;
  }
  const evidence = [{
    message: "provider type-family variant selected by source type-argument count",
    details: {
      exportName: family.exportName,
      sourceTypeArgumentCount,
      exportId: variant.declaration.exportId,
    },
  }];
  extensionHost[extensionHostSetFact](typeReference, providerVirtualDeclarationFactKey, variant.declaration, evidence);
  if (variant.targetBinding !== undefined) {
    extensionHost[extensionHostSetFact](typeReference, targetBindingFactKey, variant.targetBinding, evidence);
    if (type !== undefined) {
      extensionHost[extensionHostSetFact](type, targetBindingFactKey, variant.targetBinding, evidence);
    }
    extensionHost[extensionHostSetFact](typeReference, instantiatedTargetTypeFactKey, {
      targetType: variant.targetBinding,
      typeArguments: (Node_TypeArguments(typeReference) ?? []).filter((argument): argument is Node => argument !== undefined),
    }, evidence);
  }
}

function recordProviderVirtualModuleFacts(extensionHost: ExtensionHost, file: SourceFile, virtualModule: ProviderVirtualCompilerArtifact): void {
  const evidence = getProviderVirtualModuleEvidence(virtualModule);
  const compilerMetadata = getProviderVirtualCompilerMetadata(extensionHost.providers, virtualModule.fileName);
  if (compilerMetadata === undefined) {
    throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has no compiler-owned metadata.`);
  }
  const directDeclarationIds = new Set(compilerMetadata.directDeclarationIds);
  extensionHost[extensionHostSetFact](file, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.packageName !== undefined ? { packageName: virtualModule.packageName } : {}),
    ...(virtualModule.packageVersion !== undefined ? { packageVersion: virtualModule.packageVersion } : {}),
    subpath: virtualModule.moduleSpecifier,
  }, evidence);
  extensionHost[extensionHostSetFact](file, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);
  recordProviderVirtualFunctionSignatureFacts(extensionHost, file, virtualModule, compilerMetadata.renderedFunctionSignatures, evidence);

  const fileSymbol = Node_Symbol(file as GoPtr<Node>);
  if (fileSymbol === undefined) {
    return;
  }

  extensionHost[extensionHostSetFact](fileSymbol, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.packageName !== undefined ? { packageName: virtualModule.packageName } : {}),
    ...(virtualModule.packageVersion !== undefined ? { packageVersion: virtualModule.packageVersion } : {}),
    subpath: virtualModule.moduleSpecifier,
    canonicalSymbolId: getSymbolFactId(fileSymbol),
  }, evidence);
  extensionHost[extensionHostSetFact](fileSymbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

  for (const family of getProviderTypeFamilies(virtualModule)) {
    const familySymbol = fileSymbol.Exports?.get(family.exportName);
    if (familySymbol === undefined) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' did not bind type-family export '${family.exportName}'.`);
    }
    extensionHost[extensionHostSetFact](familySymbol, canonicalIdentityFactKey, {
      kind: "export",
      id: `${virtualModule.declarationModel.providerModuleId}::${family.exportName}`,
      ...(virtualModule.packageName !== undefined ? { packageName: virtualModule.packageName } : {}),
      ...(virtualModule.packageVersion !== undefined ? { packageVersion: virtualModule.packageVersion } : {}),
      subpath: virtualModule.moduleSpecifier,
      exportName: family.exportName,
      canonicalSymbolId: getSymbolFactId(familySymbol),
    }, evidence);
    extensionHost[extensionHostSetFact](familySymbol, providerTypeFamilyFactKey, getProviderTypeFamilyFact(virtualModule, family), evidence);
  }

  for (const declaration of virtualModule.declarationModel.exports) {
    const isDirectDeclaration = directDeclarationIds.has(declaration.id);
    if (declaration.sourceTypeFamily !== undefined && !isDirectDeclaration) {
      continue;
    }
    const exportName = getProviderSourceExportName(declaration);
    const symbol = getProviderDeclarationSymbol(file, fileSymbol, declaration);
    if (symbol === undefined) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' did not bind export identity '${declaration.id}'.`);
    }
    extensionHost[extensionHostSetFact](symbol, canonicalIdentityFactKey, {
      kind: "export",
      id: declaration.sourceTypeFamily === undefined
        ? `${virtualModule.declarationModel.providerModuleId}::${exportName}`
        : `${virtualModule.declarationModel.providerModuleId}::${exportName}:${declaration.sourceTypeFamily.typeArgumentCount}`,
      ...(virtualModule.packageName !== undefined ? { packageName: virtualModule.packageName } : {}),
      ...(virtualModule.packageVersion !== undefined ? { packageVersion: virtualModule.packageVersion } : {}),
      subpath: virtualModule.moduleSpecifier,
      exportName,
      canonicalSymbolId: getSymbolFactId(symbol),
    }, evidence);
    extensionHost[extensionHostSetFact](symbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule, declaration), evidence);
    const targetBinding = getTargetBindingFact(virtualModule, declaration);
    if (targetBinding !== undefined) {
      extensionHost[extensionHostSetFact](symbol, targetBindingFactKey, targetBinding, evidence);
    }

    if (!isDirectDeclaration) {
      continue;
    }

    if (declaration.signatures === undefined || declaration.signatures.length === 0) {
      for (const exportDeclaration of symbol.Declarations ?? []) {
        if (exportDeclaration === undefined) {
          continue;
        }
        extensionHost[extensionHostSetFact](
          exportDeclaration,
          providerVirtualDeclarationFactKey,
          getProviderVirtualDeclarationFact(virtualModule, declaration),
          evidence,
        );
      }
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

function recordProviderVirtualFunctionSignatureFacts(
  extensionHost: ExtensionHost,
  file: SourceFile,
  virtualModule: ProviderVirtualModuleArtifact,
  renderedFunctionSignatures: readonly import("./provider-callable-signatures.js").ProviderRenderedFunctionSignature[],
  evidence: readonly ExtensionEvidence[],
): void {
  if (renderedFunctionSignatures.length === 0) {
    return;
  }
  const functionTypeNodes: Node[] = [];
  collectProviderFunctionTypeNodes(file as Node, functionTypeNodes);
  if (functionTypeNodes.length !== renderedFunctionSignatures.length) {
    throw new Error(
      `Provider virtual artifact '${virtualModule.fileName}' rendered ${renderedFunctionSignatures.length} provider function signatures but parsed ${functionTypeNodes.length} function-type declarations.`,
    );
  }
  const declarationsById = new Map(virtualModule.declarationModel.exports.map((declaration) => [declaration.id, declaration]));
  const membersByDeclarationId = new Map<string, Map<string, ProviderMemberDeclaration>>();
  for (const declaration of virtualModule.declarationModel.exports) {
    const membersById = new Map<string, ProviderMemberDeclaration>();
    for (const member of declaration.members ?? []) {
      membersById.set(member.id, member);
    }
    if (membersById.size !== 0) {
      membersByDeclarationId.set(declaration.id, membersById);
    }
  }
  const usedMarkers = new Set<number>();
  const sourceText = SourceFile_Text(file);
  const sourceTextByteLength = utf8.StringByteLen(sourceText);
  for (const node of functionTypeNodes) {
    const start = Node_Pos(node);
    if (start < 0 || start > sourceTextByteLength) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has an invalid function-type source position.`);
    }
    const marker = parseProviderFunctionSignatureMarker(
      utf8.StringByteSlice(
        sourceText,
        start,
        Math.min(sourceTextByteLength, start + providerFunctionSignatureMarkerMaximumLength),
      ),
    );
    if (marker === undefined || marker < 0 || marker >= renderedFunctionSignatures.length || usedMarkers.has(marker)) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has an invalid or duplicate function-signature marker.`);
    }
    usedMarkers.add(marker);
    const rendered = renderedFunctionSignatures[marker]!;
    if (rendered.marker !== marker) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has a non-canonical function-signature manifest marker '${marker}'.`);
    }
    const declaration = declarationsById.get(rendered.exportId);
    if (declaration === undefined) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has no declaration for rendered function export identity '${rendered.exportId}'.`);
    }
    const member = rendered.memberId === undefined
      ? undefined
      : membersByDeclarationId.get(rendered.exportId)?.get(rendered.memberId);
    if (rendered.memberId !== undefined && member === undefined) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has no member for rendered function member identity '${rendered.memberId}'.`);
    }
    extensionHost[extensionHostSetFact](
      node,
      providerVirtualDeclarationFactKey,
      getProviderVirtualDeclarationFact(
        virtualModule,
        declaration,
        member,
        rendered.signatureId,
      ),
      evidence,
    );
  }
  if (usedMarkers.size !== renderedFunctionSignatures.length) {
    throw new Error(`Provider virtual artifact '${virtualModule.fileName}' did not bind every rendered function-signature marker.`);
  }
}

function collectProviderFunctionTypeNodes(node: Node, result: Node[]): void {
  if (node.Kind === KindFunctionType) {
    result.push(node);
  }
  Node_ForEachChild(node, (child) => {
    if (child !== undefined) {
      collectProviderFunctionTypeNodes(child, result);
    }
    return false;
  });
}

function getProviderVirtualModuleEvidence(virtualModule: ProviderVirtualModuleArtifact): readonly ExtensionEvidence[] {
  return [{
    message: "provider virtual module",
    details: {
      provider: virtualModule.provider,
      moduleSpecifier: virtualModule.moduleSpecifier,
      providerModuleId: virtualModule.providerModuleId,
      artifactFileName: virtualModule.fileName,
    },
  }];
}

function recordProviderVirtualMemberFacts(
  extensionHost: ExtensionHost,
  exportSymbol: Symbol,
  virtualModule: ProviderVirtualModuleArtifact,
  declaration: ProviderExportDeclaration,
  evidence: readonly ExtensionEvidence[],
): void {
  const directExportDeclarations = (exportSymbol.Declarations ?? []).filter((node) =>
    node !== undefined && providerExportDeclarationMatchesNode(declaration, node));
  if (directExportDeclarations.length === 0) {
    throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has no direct declaration for member-owning export identity '${declaration.id}'.`);
  }
  const memberNodes = directExportDeclarations.flatMap(getProviderMemberCandidateNodes);
  const usedMemberNodes = new Set<Node>();
  for (const member of declaration.members ?? []) {
    const matchingMemberNodes = memberNodes.filter((node) =>
      node !== undefined
      && !usedMemberNodes.has(node)
      && providerMemberMatchesNode(member, node));
    const expectedNodeCount = providerMemberDeclarationCount(member);
    if (matchingMemberNodes.length !== expectedNodeCount) {
      throw new Error(
        `Provider virtual artifact '${virtualModule.fileName}' bound ${matchingMemberNodes.length} declarations for member identity '${member.id}', expected ${expectedNodeCount}.`,
      );
    }
    const memberSymbol = findProviderMemberSymbol(matchingMemberNodes);
    const memberFact = getProviderVirtualDeclarationFact(virtualModule, declaration, member);
    if (memberSymbol !== undefined) {
      setProviderVirtualDeclarationSymbolFact(
        extensionHost,
        memberSymbol,
        memberFact,
        evidence,
      );
    }
    for (let index = 0; index < matchingMemberNodes.length; index++) {
      const memberNode = matchingMemberNodes[index];
      if (memberNode === undefined) {
        continue;
      }
      usedMemberNodes.add(memberNode);
      const signature = member.signatures?.[index];
      extensionHost[extensionHostSetFact](
        memberNode,
        providerVirtualDeclarationFactKey,
        getProviderVirtualDeclarationFact(virtualModule, declaration, member, signature),
        evidence,
      );
      const nodeSymbol = Node_Symbol(memberNode);
      if (nodeSymbol !== undefined && nodeSymbol !== memberSymbol) {
        setProviderVirtualDeclarationSymbolFact(
          extensionHost,
          nodeSymbol,
          memberFact,
          evidence,
        );
      }
    }
  }
  if (usedMemberNodes.size !== memberNodes.length) {
    throw new Error(
      `Provider virtual artifact '${virtualModule.fileName}' contains ${memberNodes.length - usedMemberNodes.size} unclaimed member declarations for export identity '${declaration.id}'.`,
    );
  }
}

function providerExportDeclarationMatchesNode(declaration: ProviderExportDeclaration, node: Node): boolean {
  switch (declaration.kind) {
    case "class":
      return node.Kind === KindClassDeclaration;
    case "interface":
      return node.Kind === KindInterfaceDeclaration;
    case "function":
      return node.Kind === KindFunctionDeclaration;
    case "type":
      return node.Kind === KindTypeAliasDeclaration;
    case "value":
    case "opaque":
      return node.Kind === KindVariableDeclaration;
    case "namespace":
      return node.Kind === KindModuleDeclaration;
    case "enum":
      return node.Kind === KindEnumDeclaration;
  }
}

function providerMemberDeclarationCount(member: ProviderMemberDeclaration): number {
  switch (member.kind) {
    case "constructor":
    case "method":
    case "indexer":
      return member.signatures?.length ?? 0;
    case "property":
    case "field":
      return 1;
  }
}

function setProviderVirtualDeclarationSymbolFact(
  extensionHost: ExtensionHost,
  symbol: Symbol,
  fact: ProviderVirtualDeclarationFact,
  evidence: readonly ExtensionEvidence[],
): void {
  const existing = extensionHost.facts.get(symbol, providerVirtualDeclarationFactKey);
  if (existing !== undefined && !providerVirtualDeclarationFactKey.equals(existing, fact)) {
    throw new Error("A provider virtual symbol resolved to conflicting exact declaration identities.");
  }
  extensionHost[extensionHostSetFact](symbol, providerVirtualDeclarationFactKey, fact, evidence);
}

function findProviderMemberSymbol(matchingMemberNodes: readonly GoPtr<Node>[]): GoPtr<Symbol> {
  for (const node of matchingMemberNodes) {
    const symbol = Node_Symbol(node);
    if (symbol !== undefined) {
      return symbol;
    }
  }
  return undefined;
}

function providerMemberMatchesNode(member: ProviderMemberDeclaration, node: Node): boolean {
  if (!providerMemberKindMatchesNode(member, node)) {
    return false;
  }
  if (member.kind !== "constructor" && member.kind !== "indexer" && !providerPropertyNameMatchesNode(member.name, Node_Name(node))) {
    return false;
  }
  if (((Node_ModifierFlags(node) & ModifierFlagsStatic) !== 0) !== (member.static === true)) {
    return false;
  }
  return true;
}

function providerPropertyNameMatchesNode(name: ProviderPropertyName, nodeName: GoPtr<Node>): boolean {
  if (nodeName === undefined) {
    return false;
  }
  if (typeof name !== "string" && name.kind === "well-known-symbol") {
    if (nodeName.Kind !== KindComputedPropertyName) {
      return false;
    }
    const expression = Node_Expression(nodeName);
    return expression?.Kind === KindPropertyAccessExpression
      && Node_Text(Node_Expression(expression)) === "Symbol"
      && Node_Text(Node_Name(expression)) === name.name;
  }
  return nodeName.Kind !== KindComputedPropertyName && Node_Text(nodeName) === getProviderPropertyNameText(name);
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
  if (exportDeclaration.Kind === KindClassDeclaration
    || exportDeclaration.Kind === KindInterfaceDeclaration
    || exportDeclaration.Kind === KindEnumDeclaration
    || exportDeclaration.Kind === KindTypeAliasDeclaration
    || exportDeclaration.Kind === KindFunctionDeclaration
    || exportDeclaration.Kind === KindVariableDeclaration) {
    return Node_Members(exportDeclaration) ?? [];
  }
  if (exportDeclaration.Kind !== KindModuleDeclaration) {
    return [];
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
  virtualModule: ProviderVirtualModuleArtifact,
  declaration: ProviderExportDeclaration,
  signatures: readonly ProviderSignatureDeclaration[],
  evidence: readonly ExtensionEvidence[],
  member?: ProviderMemberDeclaration,
): void {
  if (signatures.length === 0) {
    throw new Error(`Provider export identity '${declaration.id}' has no signatures to record.`);
  }
  const signatureDeclarations = (symbol.Declarations ?? []).filter((candidate) => candidate?.Kind === KindFunctionDeclaration);
  if (signatureDeclarations.length === 0) {
    throw new Error(`Provider virtual artifact '${virtualModule.fileName}' has no direct function declarations for export identity '${declaration.id}'.`);
  }
  if (signatureDeclarations.length !== signatures.length) {
    throw new Error(
      `Provider virtual artifact '${virtualModule.fileName}' bound ${signatureDeclarations.length} function declarations for export identity '${declaration.id}', expected ${signatures.length}.`,
    );
  }
  for (let index = 0; index < signatures.length; index++) {
    const signatureDeclaration = signatureDeclarations[index];
    if (signatureDeclaration === undefined) {
      throw new Error(`Provider virtual artifact '${virtualModule.fileName}' lost function signature ${index} for export identity '${declaration.id}'.`);
    }
    extensionHost[extensionHostSetFact](
      signatureDeclaration,
      providerVirtualDeclarationFactKey,
      getProviderVirtualDeclarationFact(virtualModule, declaration, member, signatures[index]),
      evidence,
    );
  }
}

function getSymbolFactId(symbol: Symbol): string {
  return `${symbol.Name}:${String(GetSymbolId(symbol))}`;
}

function getTargetBindingFact(virtualModule: ProviderVirtualModuleArtifact, declaration: ProviderExportDeclaration): TargetBindingFact | undefined {
  if (declaration.targetIdentity === undefined) {
    return undefined;
  }
  return {
    id: declaration.targetIdentity.id,
    sourceName: getProviderSourceExportName(declaration),
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

function getTargetMembers(virtualModule: ProviderVirtualModuleArtifact, declaration: ProviderExportDeclaration, member: ProviderMemberDeclaration): readonly TargetMember[] {
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

function getTargetMemberFromSignature(sourceName: string, kind: TargetMember["kind"], signature: ProviderSignatureDeclaration, virtualModule: ProviderVirtualModuleArtifact, declaration: ProviderExportDeclaration, member?: ProviderMemberDeclaration): TargetMember {
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
  return parameter.passingMode ?? "by-value";
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
    case "source-global":
      return {
        kind: "source-global",
        name: type.name,
        ...(type.typeArguments !== undefined ? { typeArguments: type.typeArguments.map(getTargetTypeRef) } : {}),
      };
    case "string":
    case "number":
    case "any":
    case "unknown":
    case "void":
    case "never":
    case "undefined":
    case "object":
    case "union":
    case "intersection":
    case "literal":
      return { kind: "opaque", id: type.kind };
  }
}

function getProviderVirtualDeclarationFact(
  virtualModule: ProviderVirtualModuleArtifact,
  declaration?: ProviderExportDeclaration,
  member?: ProviderMemberDeclaration,
  signature?: ProviderSignatureDeclaration | string,
): ProviderVirtualDeclarationFact {
  return {
    providerId: virtualModule.provider.id,
    providerVersion: virtualModule.provider.version,
    providerModuleId: virtualModule.providerModuleId,
    moduleSpecifier: virtualModule.moduleSpecifier,
    artifactFileName: virtualModule.fileName,
    ...(declaration !== undefined ? { exportName: getProviderSourceExportName(declaration) } : {}),
    ...(declaration !== undefined ? { exportId: declaration.id } : {}),
    ...(member !== undefined ? { memberName: getProviderPropertyNameText(member.name) } : {}),
    ...(member !== undefined ? { memberKey: getProviderMemberKey(member.name) } : {}),
    ...(member !== undefined ? { memberId: member.id } : {}),
    ...(member !== undefined ? { memberStatic: member.static === true } : {}),
    ...(signature !== undefined ? { signatureId: typeof signature === "string" ? signature : signature.id } : {}),
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

function getProviderTypeFamilyFact(virtualModule: ProviderVirtualModuleArtifact, family: ProviderTypeFamilyGroup): ProviderTypeFamilyFact {
  return {
    exportName: family.exportName,
    variants: family.variants
      .map((declaration) => {
        const targetBinding = getTargetBindingFact(virtualModule, declaration);
        return {
          sourceTypeArgumentCount: declaration.sourceTypeFamily!.typeArgumentCount,
          declaration: getProviderVirtualDeclarationFact(virtualModule, declaration),
          ...(targetBinding !== undefined ? { targetBinding } : {}),
        };
      })
      .sort((left, right) => left.sourceTypeArgumentCount - right.sourceTypeArgumentCount),
  };
}

function getProviderExportName(declaration: ProviderExportDeclaration): string {
  return declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name;
}

function getProviderSourceExportName(declaration: ProviderExportDeclaration): string {
  return declaration.sourceTypeFamily?.exportName ?? getProviderExportName(declaration);
}

function getProviderDeclarationSymbol(file: SourceFile, fileSymbol: Symbol, declaration: ProviderExportDeclaration): GoPtr<Symbol> {
  if (declaration.sourceTypeFamily !== undefined) {
    return Node_Locals(file)?.get(getProviderTypeFamilyVariantLocalName(declaration));
  }
  const exportName = getProviderExportName(declaration);
  return fileSymbol.Exports?.get(exportName);
}

interface ProviderTypeFamilyGroup {
  readonly exportName: string;
  readonly variants: readonly ProviderExportDeclaration[];
}

function getProviderTypeFamilies(virtualModule: ProviderVirtualModuleArtifact): readonly ProviderTypeFamilyGroup[] {
  const groups = new Map<string, ProviderExportDeclaration[]>();
  for (const declaration of virtualModule.declarationModel.exports) {
    if (declaration.sourceTypeFamily === undefined) {
      continue;
    }
    const variants = groups.get(declaration.sourceTypeFamily.exportName) ?? [];
    variants.push(declaration);
    groups.set(declaration.sourceTypeFamily.exportName, variants);
  }
  return [...groups].map(([exportName, variants]) => ({
    exportName,
    variants: variants.sort((left, right) => left.sourceTypeFamily!.typeArgumentCount - right.sourceTypeFamily!.typeArgumentCount),
  }));
}

function getProviderTypeFamilyVariantLocalName(declaration: ProviderExportDeclaration): string {
  return `__TstsProvider_${declaration.sourceTypeFamily!.exportName}_${declaration.sourceTypeFamily!.typeArgumentCount}`;
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

function getProviderMemberKey(name: ProviderPropertyName): ProviderMemberKey {
  return typeof name !== "string" && name.kind === "well-known-symbol"
    ? { kind: "well-known-symbol", name: name.name }
    : { kind: "property-key", name: getProviderPropertyNameText(name) };
}

function getProviderDeclarationIdentity(
  virtualModule: ProviderVirtualModuleArtifact,
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
