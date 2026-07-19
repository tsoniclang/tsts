import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Body, Node_Expression, Node_Locals, Node_Members, Node_ModifierFlags, Node_Symbol, Node_Text, Node_TypeArguments, SourceFile_FileName } from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import type { Symbol } from "../internal/ast/symbol.js";
import type { Type } from "../internal/checker/types.js";
import type { Program } from "../internal/compiler/program.js";
import { Program_GetSemanticDiagnostics } from "../internal/compiler/program.js";
import { ModifierFlagsStatic } from "../internal/ast/modifierflags.js";
import { GetSymbolId } from "../internal/ast/utilities.js";
import {
  KindClassDeclaration,
  KindComputedPropertyName,
  KindConstructSignature,
  KindConstructor,
  KindEnumDeclaration,
  KindEnumMember,
  KindFunctionDeclaration,
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
import { getProviderVirtualArtifactForCompiler } from "./provider-virtual-internal.js";
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
  });
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

function recordProviderVirtualModuleFacts(extensionHost: ExtensionHost, file: SourceFile, virtualModule: ProviderVirtualModuleArtifact): void {
  const evidence = getProviderVirtualModuleEvidence(virtualModule);
  extensionHost[extensionHostSetFact](file, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.packageName !== undefined ? { packageName: virtualModule.packageName } : {}),
    ...(virtualModule.packageVersion !== undefined ? { packageVersion: virtualModule.packageVersion } : {}),
    subpath: virtualModule.moduleSpecifier,
  }, evidence);
  extensionHost[extensionHostSetFact](file, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

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
      continue;
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
    const exportName = getProviderSourceExportName(declaration);
    const symbol = getProviderDeclarationSymbol(file, fileSymbol, declaration);
    if (symbol === undefined) {
      continue;
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

    const targetBinding = getTargetBindingFact(virtualModule, declaration);
    if (targetBinding !== undefined) {
      extensionHost[extensionHostSetFact](symbol, targetBindingFactKey, targetBinding, evidence);
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
  const memberNodes = (exportSymbol.Declarations ?? []).flatMap(getProviderMemberCandidateNodes);
  const usedMemberNodes = new Set<Node>();
  for (const member of declaration.members ?? []) {
    const matchingMemberNodes = memberNodes.filter((node) =>
      node !== undefined
      && !usedMemberNodes.has(node)
      && providerMemberMatchesNode(member, node));
    const memberSymbol = findProviderMemberSymbol(exportSymbol, member, matchingMemberNodes);
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
      const signature = member.signatures?.[index] ?? member.signatures?.[0];
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
}

function setProviderVirtualDeclarationSymbolFact(
  extensionHost: ExtensionHost,
  symbol: Symbol,
  fact: ProviderVirtualDeclarationFact,
  evidence: readonly ExtensionEvidence[],
): void {
  const existing = extensionHost.facts.get(symbol, providerVirtualDeclarationFactKey);
  if (existing !== undefined && !providerVirtualDeclarationFactKey.equals(existing, fact)) {
    return;
  }
  extensionHost[extensionHostSetFact](symbol, providerVirtualDeclarationFactKey, fact, evidence);
}

function findProviderMemberSymbol(exportSymbol: Symbol, member: ProviderMemberDeclaration, matchingMemberNodes: readonly GoPtr<Node>[]): GoPtr<Symbol> {
  for (const node of matchingMemberNodes) {
    const symbol = Node_Symbol(node);
    if (symbol !== undefined) {
      return symbol;
    }
  }
  if (typeof member.name !== "string" && member.name.kind === "well-known-symbol") {
    return undefined;
  }
  const memberName = getProviderPropertyNameText(member.name);
  if (member.static === true) {
    return exportSymbol.Exports?.get(memberName);
  }
  if (member.static === false) {
    return exportSymbol.Members?.get(memberName);
  }
  return exportSymbol.Members?.get(memberName) ?? exportSymbol.Exports?.get(memberName);
}

function providerMemberMatchesNode(member: ProviderMemberDeclaration, node: Node): boolean {
  if (!providerMemberKindMatchesNode(member, node)) {
    return false;
  }
  if (member.kind !== "constructor" && member.kind !== "indexer" && !providerPropertyNameMatchesNode(member.name, Node_Name(node))) {
    return false;
  }
  if (member.static !== undefined && ((Node_ModifierFlags(node) & ModifierFlagsStatic) !== 0) !== member.static) {
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
  if (signatures.length === 0 || symbol.Declarations === undefined) {
    return;
  }

  for (let index = 0; index < signatures.length; index++) {
    const signatureDeclaration = symbol.Declarations[index];
    if (signatureDeclaration === undefined) {
      continue;
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
  signature?: ProviderSignatureDeclaration,
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
    ...(member?.static !== undefined ? { memberStatic: member.static } : {}),
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
  return fileSymbol.Exports?.get(exportName) ?? fileSymbol.Exports?.get(declaration.name);
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
