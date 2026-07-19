import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import {
  Node_Arguments,
  Node_Body,
  Node_Initializer,
  Node_Text,
  Node_TypeArguments,
  SourceFile_FileName,
} from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import {
  KindCallExpression,
  KindFunctionDeclaration,
  KindPropertySignature,
  KindVariableDeclaration,
} from "../internal/ast/generated/kinds.js";
import { Diagnostic_Code, Diagnostic_String } from "../internal/ast/diagnostic.js";
import type { SignatureLinks, Type } from "../internal/checker/types.js";
import { Type_Symbol } from "../internal/checker/types.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import {
  NewProgram,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
  Program_GetTypeCheckerForFile,
} from "../internal/compiler/program.js";
import { LinkStore_Get } from "../internal/core/linkstore.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  ExtensionHostDiagnosticCode,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  attributeFactKey,
  completeCheckedSourceCallProduction,
  createSourceSemanticsExtension,
  defineExtensionFactKey,
  deferCheckedSourceCallProduction,
  finalizeExtensionSemantics,
  providerVirtualDeclarationFactKey,
  rejectCheckedSourceCallProduction,
  rejectObservation,
  selectedTargetSignatureFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedSourceCallOperation,
  CheckedSourceCallProducer,
  CheckedSourceCallProducerContext,
  CheckedSourceCallProviderSelector,
  CompilerExtension,
  ExtensionDiagnostic,
  ExtensionFactSubject,
  ExtensionHost,
  ExtensionObservationPhase,
  ProviderDeclarationModel,
  TargetBindingProvider,
  TargetSemanticProvider,
} from "./index.js";
import { extensionHostGetCheckedOperationReference } from "./host.js";

const fakeTarget = "checked-source-call-test-target";
const fakeProviderModuleSpecifier = "@test/checked-source-call/fluent.js";
const fakeProviderModuleId = "test.checked-source-call.fluent";
const fakeBindingProviderId = "checked-source-call-test.binding-provider";
const fakeBindingProviderVersion = "1.0.0";
const sourceProducerExtensionId = "checked-source-call-test.source-producer";
const targetExtensionId = "checked-source-call-test.target";

const markExportId = "fluent.mark";
const markSignatureId = "fluent.mark<Owner>()";
const markedExportId = "fluent.Marked";
const selectMemberId = "fluent.Marked.select";
const selectSignatureId = "fluent.Marked.select<Value>((Owner) => Value)";
const selectedExportId = "fluent.Selected";
const terminalMemberId = "fluent.Selected.terminal";
const terminalSignatureId = "fluent.Selected.terminal(unknown)";
const callableValueExportId = "fluent.markValue";
const callableValueSignatureId = "fluent.markValue.call<Owner>()";
const overloadedValueExportId = "fluent.overloadedValue";
const overloadedStringSignatureId = "fluent.overloadedValue.call(string)";
const overloadedNumberSignatureId = "fluent.overloadedValue.call(number)";
const factoryExportId = "fluent.Factory";
const factoryValueExportId = "fluent.factory";
const factoryCallMemberId = "fluent.Factory.markProperty";
const factoryCallSignatureId = "fluent.Factory.markProperty.call<Owner>()";
const staticFactoryExportId = "fluent.StaticFactory";
const staticFactoryCallMemberId = "fluent.StaticFactory.markStatic";
const staticFactoryCallSignatureId = "fluent.StaticFactory.markStatic.call<Owner>()";
const constructedExportId = "fluent.Constructed";
const constructedMemberId = "fluent.Constructed.constructor";
const constructedSignatureId = "fluent.Constructed.constructor(string)";
const utilitiesExportId = "fluent.Utilities";
const utilitiesMemberId = "fluent.Utilities.markNamespace";
const utilitiesSignatureId = "fluent.Utilities.markNamespace.call<Owner>()";
const callableIndexExportId = "fluent.CallableIndex";
const callableIndexMemberId = "fluent.CallableIndex.indexer";
const callableIndexSignatureId = "fluent.CallableIndex.index(number)";
const callableIndexCallSignatureId = "fluent.CallableIndex.index(number).call(string)";
const callableIndexValueExportId = "fluent.callableIndex";
const nulCollisionLeftExportId = "fluent.collision\0owner";
const nulCollisionLeftMemberId = "member";
const nulCollisionRightExportId = "fluent.collision";
const nulCollisionRightMemberId = "owner\0member";
const nulCollisionSignatureId = "invoke()";

type ProducerRole = "mark" | "select" | "terminal";

interface ProducedCallFact {
  readonly role: ProducerRole;
  readonly phase: ExtensionObservationPhase;
  readonly attempt: number;
}

interface TransactionProbeFact {
  readonly stage: "source-rejection" | "target-rejection";
  readonly phase: ExtensionObservationPhase;
}

type FluentChainFact =
  | {
      readonly kind: "root";
      readonly ownerType: ExtensionFactSubject;
    }
  | {
      readonly kind: "selection";
      readonly ownerType: ExtensionFactSubject;
      readonly selectedMember: ExtensionFactSubject;
    }
  | {
      readonly kind: "terminal";
      readonly ownerType: ExtensionFactSubject;
      readonly selectedMember: ExtensionFactSubject;
      readonly argument: ExtensionFactSubject;
    };

const producedCallFactKey = defineExtensionFactKey<ProducedCallFact>({
  extensionId: sourceProducerExtensionId,
  name: "produced-call",
  snapshot: (value) => Object.freeze({
    role: value.role,
    phase: value.phase,
    attempt: value.attempt,
  }),
  equals: (left, right) => left.role === right.role
    && left.phase === right.phase
    && left.attempt === right.attempt,
});

const transactionProbeFactKey = defineExtensionFactKey<TransactionProbeFact>({
  extensionId: sourceProducerExtensionId,
  name: "transaction-probe",
  snapshot: (value) => Object.freeze({
    stage: value.stage,
    phase: value.phase,
  }),
  equals: (left, right) => left.stage === right.stage && left.phase === right.phase,
});

const fluentChainFactKey = defineExtensionFactKey<FluentChainFact>({
  extensionId: sourceProducerExtensionId,
  name: "fluent-chain",
  snapshot: (value) => Object.freeze({ ...value }),
  equals: (left, right) => left.kind === right.kind
    && left.ownerType === right.ownerType
    && (left.kind === "root" || right.kind === "root"
      ? left.kind === right.kind
      : left.selectedMember === right.selectedMember
        && (left.kind === "selection" || right.kind === "selection"
          ? left.kind === right.kind
          : left.argument === right.argument)),
});

const markSelector = Object.freeze({
  kind: "export-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: markExportId,
  signatureId: markSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const selectSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: markedExportId,
  memberId: selectMemberId,
  memberStatic: false,
  signatureId: selectSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const terminalSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: selectedExportId,
  memberId: terminalMemberId,
  memberStatic: false,
  signatureId: terminalSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const callableValueSelector = Object.freeze({
  kind: "export-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: callableValueExportId,
  signatureId: callableValueSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const overloadedStringSelector = Object.freeze({
  kind: "export-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: overloadedValueExportId,
  signatureId: overloadedStringSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const overloadedNumberSelector = Object.freeze({
  kind: "export-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: overloadedValueExportId,
  signatureId: overloadedNumberSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const factoryCallSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: factoryExportId,
  memberId: factoryCallMemberId,
  memberStatic: false,
  signatureId: factoryCallSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const staticFactoryCallSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: staticFactoryExportId,
  memberId: staticFactoryCallMemberId,
  memberStatic: true,
  signatureId: staticFactoryCallSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const constructedSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: constructedExportId,
  memberId: constructedMemberId,
  memberStatic: false,
  signatureId: constructedSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const utilitiesSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: utilitiesExportId,
  memberId: utilitiesMemberId,
  memberStatic: false,
  signatureId: utilitiesSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const callableIndexSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: callableIndexExportId,
  memberId: callableIndexMemberId,
  memberStatic: false,
  signatureId: callableIndexCallSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const nulCollisionLeftSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: nulCollisionLeftExportId,
  memberId: nulCollisionLeftMemberId,
  memberStatic: false,
  signatureId: nulCollisionSignatureId,
} satisfies CheckedSourceCallProviderSelector);

const nulCollisionRightSelector = Object.freeze({
  kind: "member-signature",
  providerId: fakeBindingProviderId,
  providerVersion: fakeBindingProviderVersion,
  providerModuleId: fakeProviderModuleId,
  exportId: nulCollisionRightExportId,
  memberId: nulCollisionRightMemberId,
  memberStatic: false,
  signatureId: nulCollisionSignatureId,
} satisfies CheckedSourceCallProviderSelector);

interface ProducerInvocation {
  readonly role: ProducerRole;
  readonly selector: CheckedSourceCallProviderSelector;
  readonly operation: CheckedSourceCallOperation;
  readonly phase: ExtensionObservationPhase;
}

interface ProducerRegistration {
  readonly selector: CheckedSourceCallProviderSelector;
  readonly produce: CheckedSourceCallProducer["produce"];
}

function authoredStringArgument(operation: CheckedSourceCallOperation, index = 0): string | undefined {
  const composition = operation.sourceArguments[index]?.composition;
  return composition?.kind === "authored-literal" && composition.literal.kind === "string"
    ? composition.literal.value
    : undefined;
}

function inlineFunctionArgument(operation: CheckedSourceCallOperation, index = 0) {
  const composition = operation.sourceArguments[index]?.composition;
  return composition?.kind === "inline-function" ? composition.function : undefined;
}

test("provider-selected source producers preserve exact fluent-call evidence without a target mapper", () => {
  const invocations: ProducerInvocation[] = [];
  const registrationResults: boolean[] = [];
  let mismatchedProducerCalls = 0;
  const mismatchedSelectors: readonly CheckedSourceCallProviderSelector[] = [
    { ...markSelector, providerId: `${fakeBindingProviderId}.other` },
    { ...markSelector, providerVersion: "2.0.0" },
    { ...markSelector, providerModuleId: `${fakeProviderModuleId}.other` },
    { ...markSelector, exportId: `${markExportId}.other` },
    { ...markSelector, signatureId: `${markSignatureId}.other` },
    { ...selectSelector, memberId: `${selectMemberId}.other` },
    { ...selectSelector, memberStatic: true },
    { ...terminalSelector, signatureId: `${terminalSignatureId}.other` },
  ];
  const registrations: ProducerRegistration[] = [
    completeFactProducer("mark", markSelector, invocations),
    completeFactProducer("select", selectSelector, invocations),
    completeFactProducer("terminal", terminalSelector, invocations),
    ...mismatchedSelectors.map((selector): ProducerRegistration => ({
      selector,
      produce: () => {
        mismatchedProducerCalls += 1;
        return completeCheckedSourceCallProduction;
      },
    })),
  ];
  const setup = createProgram({
    sourceFiles: {
      "direct.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";
        import { attribute } from "@test/source-markers/lang.js";

        export interface DirectOwner { readonly member: string; }
        export interface IndirectOwner { readonly member: string; }
        interface ShadowOwner { readonly member: string; }
        interface LocalMarked<Owner> {
          select<Value>(selector: (owner: Owner) => Value): LocalSelected<Owner, Value>;
        }
        interface LocalSelected<Owner, Value> {
          terminal(label: string): Owner;
        }
        declare const localMark: <Owner>() => LocalMarked<Owner>;

        export const directResult = mark<DirectOwner>()
          .select(owner => owner.member)
          .terminal("direct");
        export const indirectLabel: string = "indirect";
        export const indirectResult = mark<IndirectOwner>()
          .select(owner => owner.member)
          .terminal(indirectLabel);
        export const directAttribute = attribute<DirectOwner>("metadata");

        export function shadowed(): ShadowOwner {
          const mark = localMark;
          return mark<ShadowOwner>()
            .select(owner => owner.member)
            .terminal("shadowed");
        }
      `,
      "alias.ts": `
        import { mark as begin } from "${fakeProviderModuleSpecifier}";

        export interface AliasOwner { readonly member: string; }
        export const aliasResult = begin<AliasOwner>()
          .select(owner => owner.member)
          .terminal("alias");
      `,
      "namespace.ts": `
        import * as Fluent from "${fakeProviderModuleSpecifier}";

        export interface NamespaceOwner { readonly member: string; }
        export const namespaceResult = Fluent.mark<NamespaceOwner>()
          .select(owner => owner.member)
          .terminal("namespace");
      `,
      "lookalikes.ts": `
        interface LocalOwner { readonly member: string; }
        interface LocalMarked<Owner> {
          select<Value>(selector: (owner: Owner) => Value): LocalSelected<Owner, Value>;
        }
        interface LocalSelected<Owner, Value> {
          terminal(label: string): Owner;
        }
        declare function mark<Owner>(): LocalMarked<Owner>;
        declare const dynamicValue: any;

        export const localResult = mark<LocalOwner>()
          .select(owner => owner.member)
          .terminal("local");
        export const untypedResult = dynamicValue();
      `,
    },
    extraFiles: sourceMarkerPackageFiles(),
    extensions: [
      sourceProducerExtension(registrations, registrationResults),
      fakeTargetExtension(),
      attributeSourceExtension(),
    ],
  });

  assert.deepEqual(registrationResults, new Array(registrations.length).fill(true));
  assertCleanProgram(setup.program);
  assert.equal(mismatchedProducerCalls, 0);
  assert.equal(
    invocations.length,
    12,
    JSON.stringify([
      ...invocations.map((invocation) => [
        invocation.role,
        SourceFile_FileName(GetSourceFileOfNode(invocation.operation.call as GoPtr<Node>)),
      ]),
      ["source-files", ...Program_GetSourceFiles(setup.program).map(SourceFile_FileName)],
    ]),
  );
  assert.deepEqual(
    invocations.filter((invocation) => invocation.role === "terminal")
      .flatMap((invocation) => {
        const literal = authoredStringArgument(invocation.operation);
        return literal === undefined ? [] : [literal];
      })
      .sort(),
    ["alias", "direct", "namespace"],
  );
  assert.equal(
    invocations.filter((invocation) => invocation.role === "terminal"
      && authoredStringArgument(invocation.operation) === undefined).length,
    1,
  );

  const invocationByCall = new Map(invocations.map((invocation) => [invocation.operation.call, invocation]));
  const expectedOwnerByTerminalLabel = new Map<string, { readonly owner: string; readonly fileName: string }>([
    ["direct", { owner: "DirectOwner", fileName: "/src/direct.ts" }],
    ["indirect", { owner: "IndirectOwner", fileName: "/src/direct.ts" }],
    ["alias", { owner: "AliasOwner", fileName: "/src/alias.ts" }],
    ["namespace", { owner: "NamespaceOwner", fileName: "/src/namespace.ts" }],
  ]);
  for (const terminal of invocations.filter((invocation) => invocation.role === "terminal")) {
    const terminalLiteral = authoredStringArgument(terminal.operation);
    const terminalLabel = terminalLiteral ?? "indirect";
    const expectedOwner = expectedOwnerByTerminalLabel.get(terminalLabel);
    assert.ok(expectedOwner !== undefined);
    const select = invocationByCall.get(terminal.operation.sourceReceiver!.expression);
    assert.equal(select?.role, "select");
    assert.ok(select !== undefined);
    const mark = invocationByCall.get(select.operation.sourceReceiver!.expression);
    assert.equal(mark?.role, "mark");
    assert.ok(mark !== undefined);

    assert.ok(terminal.operation.sourceReceiver?.expression === select.operation.call, `${terminalLabel}: terminal receiver must be its selected predecessor call.`);
    assert.ok(select.operation.sourceReceiver?.expression === mark.operation.call, `${terminalLabel}: select receiver must be its selected predecessor call.`);
    if (terminalLabel === "namespace") {
      assert.equal(Node_Text(mark.operation.sourceReceiver?.expression as GoPtr<Node>), "Fluent");
    } else {
      assert.ok(mark.operation.sourceReceiver === undefined, `${terminalLabel}: direct imported root call must not invent receiver evidence.`);
    }
    assert.deepEqual(mark.operation.chainRole, { kind: "ordinary", participant: "call" });
    assert.deepEqual(select.operation.chainRole, { kind: "ordinary", participant: "call" });
    assert.deepEqual(terminal.operation.chainRole, { kind: "ordinary", participant: "call" });

    const markSelection = requireApplicableSelection(mark.operation);
    assert.equal(markSelection.methodTypeArguments.length, 1);
    const ownerTypeArgument = markSelection.methodTypeArguments[0]!;
    assert.equal(ownerTypeArgument.typeParameterName, "Owner");
    const authoredTypeArgument = (Node_TypeArguments(mark.operation.call as GoPtr<Node>) ?? [])[0];
    assert.ok(authoredTypeArgument !== undefined);
    assert.ok(ownerTypeArgument.explicitTypeNode === authoredTypeArgument, `${terminalLabel}: explicit type-argument evidence must preserve authored node identity.`);
    assert.equal(
      Node_Text(AsTypeReferenceNode(authoredTypeArgument)?.TypeName),
      expectedOwner.owner,
    );
    const ownerSymbol = Type_Symbol(ownerTypeArgument.selectedType as GoPtr<Type>);
    assert.equal(ownerSymbol?.Name, expectedOwner.owner);
    assert.equal(SourceFile_FileName(GetSourceFileOfNode(ownerSymbol?.Declarations?.[0])), expectedOwner.fileName);

    assert.equal(select.operation.arguments.length, 1);
    assert.equal(select.operation.sourceArguments.length, 1);
    const selectorArgument = select.operation.sourceArguments[0]!;
    assert.ok(selectorArgument.expression === select.operation.arguments[0], `${terminalLabel}: selector evidence must preserve argument identity.`);
    const selectorFunction = inlineFunctionArgument(select.operation);
    if (selectorFunction === undefined || selectorFunction.returns.length !== 1) {
      throw new Error("Expected exact inline selector function evidence.");
    }
    const selectedMember = selectorFunction.returns[0]?.selectedProperty;
    if (selectedMember === undefined) {
      throw new Error("Expected exact selected property evidence for the selector result.");
    }
    assert.ok(selectedMember.expression === Node_Body(selectorArgument.expression as GoPtr<Node>), `${terminalLabel}: selected callback member must be the direct body expression.`);
    assert.equal(Node_Text(selectedMember.receiver as GoPtr<Node>), "owner");
    assert.equal(selectorFunction.parameters.length, 1);
    assert.ok(selectedMember.sourceReceiver.symbol === selectorFunction.parameters[0]?.symbol);
    const memberSymbol = ownerSymbol?.Members?.get("member");
    assert.ok(memberSymbol !== undefined);
    assert.ok(selectedMember.sourceResult.selectedSymbol === memberSymbol, `${terminalLabel}: callback result must retain the checker-selected member symbol.`);
    assert.ok(selectedMember.sourceResult.selectedDeclaration === memberSymbol.ValueDeclaration, `${terminalLabel}: callback result must retain the checker-selected member declaration.`);
    assert.equal((selectedMember.sourceResult.selectedDeclaration as GoPtr<Node>)?.Kind, KindPropertySignature);
    assert.equal(Node_Text(Node_Name(selectedMember.sourceResult.selectedDeclaration as GoPtr<Node>)), "member");
    assert.equal(
      SourceFile_FileName(GetSourceFileOfNode(selectedMember.sourceResult.selectedDeclaration as GoPtr<Node>)),
      expectedOwner.fileName,
    );

    assert.equal(terminal.operation.arguments.length, 1);
    assert.equal(terminal.operation.sourceArguments.length, 1);
    assert.ok(terminal.operation.sourceArguments[0]?.expression === terminal.operation.arguments[0], `${terminalLabel}: terminal argument evidence must preserve authored identity.`);
    if (terminalLabel === "indirect") {
      assert.equal(terminalLiteral, undefined, "An identifier initialized by a string literal must not be reported as direct literal evidence.");
      assert.equal(terminal.operation.sourceArguments[0]?.composition, undefined);
    } else {
      assert.equal(terminalLiteral, terminalLabel);
    }
  }

  for (const role of ["mark", "select", "terminal"] as const) {
    const selectedDeclarations = new Set(invocations
      .filter((invocation) => invocation.role === role)
      .map((invocation) => requireApplicableSelection(invocation.operation).declaration));
    assert.equal(selectedDeclarations.size, 1, `${role} must retain one canonical provider declaration across import forms and owner instantiations.`);
  }
  for (const invocation of invocations) {
    assert.deepEqual(setup.extensionHost.facts.get(invocation.operation.call, producedCallFactKey), {
      role: invocation.role,
      phase: "checking",
      attempt: 1,
    });
    assert.equal(setup.extensionHost.facts.get(invocation.operation.call, selectedTargetSignatureFactKey), undefined);
  }

  const directFile = getSourceFile(setup.program, "/src/direct.ts");
  const attributeCall = getVariableInitializer(directFile, "directAttribute");
  assert.equal(attributeCall.Kind, KindCallExpression);
  const attributeFact = setup.extensionHost.facts.get(attributeCall, attributeFactKey);
  assert.equal(attributeFact?.attributeName, "DirectOwner");
  assert.equal(attributeFact?.arguments?.length, 1);
  assert.ok(attributeFact?.arguments?.[0] === (Node_Arguments(attributeCall) ?? [])[0], "Direct attribute evidence must preserve authored argument identity.");
  assert.equal(setup.extensionHost.facts.get(attributeCall, producedCallFactKey), undefined);

  const shadowedFunction = findNamedNodeByKind(directFile, KindFunctionDeclaration, "shadowed");
  const shadowedCalls = collectNodesByKind(shadowedFunction, KindCallExpression);
  assert.equal(shadowedCalls.length, 3);
  assert.ok(shadowedCalls.every((call) => setup.extensionHost.facts.get(call, producedCallFactKey) === undefined));
  const lookalikeCalls = collectNodesByKind(getSourceFile(setup.program, "/src/lookalikes.ts"), KindCallExpression);
  assert.equal(lookalikeCalls.length, 4);
  assert.ok(lookalikeCalls.every((call) => setup.extensionHost.facts.get(call, producedCallFactKey) === undefined));
  assert.ok(lookalikeCalls.every((call) => setup.extensionHost[extensionHostGetCheckedOperationReference](call) === undefined));
  assert.ok(invocations.every((invocation) =>
    setup.extensionHost[extensionHostGetCheckedOperationReference](invocation.operation.call)?.subject === invocation.operation.call));

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(invocations.length, 12, "Completed source-only operations must not replay during finalization.");
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("source-owned fluent facts compose inner-before-outer and reach the independent target mapper", () => {
  const targetFacts: FluentChainFact[] = [];
  const registrations: readonly ProducerRegistration[] = [{
    selector: markSelector,
    produce: (operation, context) => {
      const selection = requireApplicableSelection(operation);
      const ownerType = selection.methodTypeArguments[0]?.selectedType;
      assert.ok(ownerType !== undefined);
      assert.equal(context.facts.set(operation.call, fluentChainFactKey, {
        kind: "root",
        ownerType,
      }), "inserted");
      return completeCheckedSourceCallProduction;
    },
  }, {
    selector: selectSelector,
    produce: (operation, context) => {
      const receiver = operation.sourceReceiver?.expression;
      assert.ok(receiver !== undefined);
      const predecessor = context.facts.get(receiver, fluentChainFactKey);
      assert.equal(predecessor?.kind, "root");
      if (predecessor?.kind !== "root") {
        throw new Error("The selected source protocol lost its exact root predecessor fact.");
      }
      const inlineFunction = inlineFunctionArgument(operation);
      const selectedProperty = inlineFunction?.returns[0]?.selectedProperty;
      const parameterSymbol = inlineFunction?.parameters[0]?.symbol;
      assert.ok(selectedProperty?.sourceReceiver.symbol === parameterSymbol);
      const selectedMember = selectedProperty?.sourceResult.selectedDeclaration;
      assert.ok(selectedMember !== undefined);
      assert.equal(context.facts.set(operation.call, fluentChainFactKey, {
        kind: "selection",
        ownerType: predecessor.ownerType,
        selectedMember,
      }), "inserted");
      return completeCheckedSourceCallProduction;
    },
  }, {
    selector: terminalSelector,
    produce: (operation, context) => {
      const receiver = operation.sourceReceiver?.expression;
      assert.ok(receiver !== undefined);
      const predecessor = context.facts.get(receiver, fluentChainFactKey);
      assert.equal(predecessor?.kind, "selection");
      if (predecessor?.kind !== "selection") {
        throw new Error("The selected source protocol lost its exact selected-member predecessor fact.");
      }
      const argument = operation.sourceArguments[0]?.expression;
      assert.ok(argument !== undefined);
      assert.equal(context.facts.set(operation.call, fluentChainFactKey, {
        kind: "terminal",
        ownerType: predecessor.ownerType,
        selectedMember: predecessor.selectedMember,
        argument,
      }), "inserted");
      return completeCheckedSourceCallProduction;
    },
  }];
  const semanticProvider: TargetSemanticProvider = {
    identity: semanticProviderIdentity("checked-source-call-test.fluent-chain-target"),
    mapCheckedCall: (request, context) => {
      const fact = context.facts.get(request.call, fluentChainFactKey);
      assert.ok(fact !== undefined, "The target mapper must observe each source-owned protocol fact atomically.");
      targetFacts.push(fact);
      return acceptObservation({ kind: "source" });
    },
  };
  const setup = createSingleChainProgram({
    registrations,
    targetSemanticProvider: semanticProvider,
    terminalLabel: "metadata",
  });

  assertCleanProgram(setup.program);
  assert.deepEqual(targetFacts.map((fact) => fact.kind), ["root", "selection", "terminal"]);
  const terminal = targetFacts[2];
  assert.equal(terminal?.kind, "terminal");
  if (terminal?.kind !== "terminal") {
    throw new Error("Expected the terminal source-owned protocol fact.");
  }
  assert.equal(Node_Text(Node_Name(terminal.selectedMember as GoPtr<Node>)), "member");
  assert.equal(Node_Text(terminal.argument as GoPtr<Node>), "metadata");
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(targetFacts.length, 3, "Completed protocol operations must not replay after finalization.");
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("source producer argument composition exposes exact authored literals and inline-function return selections", () => {
  const invocations: ProducerInvocation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";

        interface Owner { readonly member: string; }
        const indirect = "indirect";
        const suffix = "value";
        const identity = <T>(value: T): T => value;

        export const parenthesized = mark<Owner>().select(owner => (((owner.member)))).terminal((("parenthesized")));
        export const template = mark<Owner>().select(owner => owner.member).terminal(\`template\`);
        export const interpolated = mark<Owner>().select(owner => owner.member).terminal(\`prefix\${suffix}\`);
        export const identifier = mark<Owner>().select(owner => owner.member).terminal(indirect);
        export const block = mark<Owner>().select(owner => { return owner.member; }).terminal("block");
        export const call = mark<Owner>().select(owner => identity(owner.member)).terminal("call");
        export const element = mark<Owner>().select(owner => owner["member"]).terminal("element");
        export const asserted = mark<Owner>().select(owner => owner.member as string).terminal("asserted");
        export const numberLiteral = mark<Owner>().select(owner => owner.member).terminal(1_024);
        export const bigintLiteral = mark<Owner>().select(owner => owner.member).terminal(123n);
        export const booleanLiteral = mark<Owner>().select(owner => owner.member).terminal(true);
        export const nullLiteral = mark<Owner>().select(owner => owner.member).terminal(null);
      `,
    },
    extensions: [
      sourceProducerExtension([
        completeFactProducer("mark", markSelector, invocations),
        completeFactProducer("select", selectSelector, invocations),
        completeFactProducer("terminal", terminalSelector, invocations),
      ]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  const terminalArguments = invocations
    .filter((invocation) => invocation.role === "terminal")
    .map((invocation) => invocation.operation.sourceArguments[0]!);
  assert.deepEqual(
    terminalArguments.map((argument) => {
      const composition = argument.composition;
      return composition?.kind === "authored-literal" && composition.literal.kind === "string"
        ? composition.literal.value
        : undefined;
    }),
    ["parenthesized", "template", undefined, undefined, "block", "call", "element", "asserted", undefined, undefined, undefined, undefined],
  );
  assert.deepEqual(
    terminalArguments.slice(8).map((argument) =>
      argument.composition?.kind === "authored-literal" ? argument.composition.literal : undefined),
    [
      { kind: "number", value: "1024" },
      { kind: "bigint", value: "123" },
      { kind: "boolean", value: true },
      { kind: "null" },
    ],
  );
  assert.ok(terminalArguments.every((argument) => argument.composition?.kind !== "inline-function"));

  const selectorArguments = invocations
    .filter((invocation) => invocation.role === "select")
    .map((invocation) => invocation.operation.sourceArguments[0]!);
  assert.equal(selectorArguments.length, 12);
  assert.ok(selectorArguments.every((argument) => argument.composition?.kind === "inline-function"));
  assert.deepEqual(selectorArguments.map((argument) =>
    argument.composition?.kind === "inline-function"
    && argument.composition.function.returns[0]?.selectedProperty !== undefined),
  [true, true, true, true, true, false, false, false, true, true, true, true]);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("inline callback evidence preserves lexical returns and distinguishes the parameter receiver", () => {
  const invocations: ProducerInvocation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";

        interface Owner { readonly member: string; }
        declare const externalOwner: Owner;

        export const lexical = mark<Owner>().select(owner => {
          if (owner.member) return owner.member;
          const nested = () => externalOwner.member;
          nested;
          return owner.member;
        }).terminal("lexical");
        export const external = mark<Owner>()
          .select(owner => externalOwner.member)
          .terminal("external");
      `,
    },
    extensions: [
      sourceProducerExtension([
        completeFactProducer("select", selectSelector, invocations),
      ]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  assert.equal(invocations.length, 2);
  const lexical = inlineFunctionArgument(invocations[0]!.operation);
  assert.ok(lexical !== undefined);
  assert.equal(lexical.returns.length, 2, "Nested function returns must not enter the enclosing callback evidence.");
  assert.ok(lexical.returns.every((returned) =>
    returned.selectedProperty?.sourceReceiver.symbol === lexical.parameters[0]?.symbol));
  const external = inlineFunctionArgument(invocations[1]!.operation);
  assert.ok(external !== undefined);
  assert.equal(external.returns.length, 1);
  assert.ok(external.returns[0]?.selectedProperty !== undefined);
  assert.notEqual(
    external.returns[0]?.selectedProperty?.sourceReceiver.symbol,
    external.parameters[0]?.symbol,
    "A source producer must be able to reject a callback that selects from an external receiver.",
  );
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(invocations.length, 2);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("callable provider values and properties preserve exact signature identity through import aliases namespaces and re-exports", () => {
  const valueCalls: CheckedSourceCallOperation[] = [];
  const propertyCalls: CheckedSourceCallOperation[] = [];
  const staticPropertyCalls: CheckedSourceCallOperation[] = [];
  const namespaceMemberCalls: CheckedSourceCallOperation[] = [];
  const indexedCalls: CheckedSourceCallOperation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "reexport.ts": `
        export {
          markValue as forwardedValue,
          factory as forwardedFactory,
          StaticFactory as ForwardedStaticFactory,
        } from "${fakeProviderModuleSpecifier}";
      `,
      "index.ts": `
        import { markValue, markValue as beginValue, factory, StaticFactory, Utilities, callableIndex } from "${fakeProviderModuleSpecifier}";
        import * as Fluent from "${fakeProviderModuleSpecifier}";
        import { forwardedValue, forwardedFactory, ForwardedStaticFactory } from "./reexport.js";

        interface DirectOwner { readonly member: string; }
        interface AliasOwner { readonly member: string; }
        interface NamespaceOwner { readonly member: string; }
        interface ReexportOwner { readonly member: string; }
        interface PropertyOwner { readonly member: string; }
        interface NamespacePropertyOwner { readonly member: string; }
        interface ReexportPropertyOwner { readonly member: string; }
        interface StaticPropertyOwner { readonly member: string; }
        interface ReexportStaticPropertyOwner { readonly member: string; }
        interface NamespaceMemberOwner { readonly member: string; }

        export const direct = markValue<DirectOwner>();
        export const alias = beginValue<AliasOwner>();
        export const namespace = Fluent.markValue<NamespaceOwner>();
        export const reexport = forwardedValue<ReexportOwner>();
        export const property = factory.markProperty<PropertyOwner>();
        export const namespaceProperty = Fluent.factory.markProperty<NamespacePropertyOwner>();
        export const reexportProperty = forwardedFactory.markProperty<ReexportPropertyOwner>();
        export const staticProperty = StaticFactory.markStatic<StaticPropertyOwner>();
        export const reexportStaticProperty = ForwardedStaticFactory.markStatic<ReexportStaticPropertyOwner>();
        export const namespaceMember = Utilities.markNamespace<NamespaceMemberOwner>();
        export const indexed = callableIndex[0]("indexed");
      `,
    },
    extensions: [
      sourceProducerExtension([{
        selector: callableValueSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, callableValueSelector);
          valueCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }, {
        selector: factoryCallSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, factoryCallSelector);
          propertyCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }, {
        selector: staticFactoryCallSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, staticFactoryCallSelector);
          staticPropertyCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }, {
        selector: utilitiesSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, utilitiesSelector);
          namespaceMemberCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }, {
        selector: callableIndexSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, callableIndexSelector);
          indexedCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  assert.equal(valueCalls.length, 4);
  assert.equal(propertyCalls.length, 3);
  assert.equal(staticPropertyCalls.length, 2);
  assert.equal(namespaceMemberCalls.length, 1);
  assert.equal(indexedCalls.length, 1);
  assert.equal(new Set(valueCalls.map((operation) => requireApplicableSelection(operation).declaration)).size, 1);
  assert.equal(new Set(propertyCalls.map((operation) => requireApplicableSelection(operation).declaration)).size, 1);
  assert.equal(valueCalls.filter((operation) => operation.sourceReceiver !== undefined).length, 1);
  assert.equal(
    Node_Text(valueCalls.find((operation) => operation.sourceReceiver !== undefined)?.sourceReceiver?.expression as GoPtr<Node>),
    "Fluent",
  );
  assert.ok(propertyCalls.every((operation) => operation.sourceReceiver !== undefined));
  assert.ok(staticPropertyCalls.every((operation) => operation.sourceReceiver !== undefined));
  assert.ok(namespaceMemberCalls.every((operation) => operation.sourceReceiver !== undefined));
  assert.equal(indexedCalls[0]?.sourceReceiver === undefined, false);
  assert.equal(indexedCalls[0] === undefined ? undefined : authoredStringArgument(indexedCalls[0]), "indexed");
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("provider callable identity lookup keeps declaration and member ids structurally separate", () => {
  const selected: CheckedSourceCallProviderSelector[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { collisionLeft, collisionRight } from "${fakeProviderModuleSpecifier}";

        export const left = collisionLeft.invoke();
        export const right = collisionRight.invoke();
      `,
    },
    extensions: [
      sourceProducerExtension([
        {
          selector: nulCollisionLeftSelector,
          produce: (operation, context) => {
            requireExactProviderDeclaration(operation, context, nulCollisionLeftSelector);
            selected.push(nulCollisionLeftSelector);
            return completeCheckedSourceCallProduction;
          },
        },
        {
          selector: nulCollisionRightSelector,
          produce: (operation, context) => {
            requireExactProviderDeclaration(operation, context, nulCollisionRightSelector);
            selected.push(nulCollisionRightSelector);
            return completeCheckedSourceCallProduction;
          },
        },
      ]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  assert.deepEqual(selected, [nulCollisionLeftSelector, nulCollisionRightSelector]);
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("provider constructors enter source producers through their exact selected constructor signature", () => {
  const constructions: CheckedSourceCallOperation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { Constructed } from "${fakeProviderModuleSpecifier}";
        export const value = new Constructed("exact");
      `,
    },
    extensions: [
      sourceProducerExtension([{
        selector: constructedSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, constructedSelector);
          constructions.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  assert.equal(constructions.length, 1);
  const operation = constructions[0]!;
  assert.equal(operation.callKind, "construct");
  assert.equal(operation.sourceReceiver, undefined);
  assert.equal(authoredStringArgument(operation), "exact");
  const selectedDeclaration = requireApplicableSelection(operation).declaration;
  assert.ok(selectedDeclaration !== undefined);
  const declaration = setup.extensionHost.facts.get(selectedDeclaration, providerVirtualDeclarationFactKey);
  assert.equal(declaration?.exportId, constructedExportId);
  assert.equal(declaration?.memberId, constructedMemberId);
  assert.equal(declaration?.memberStatic, false);
  assert.equal(declaration?.signatureId, constructedSignatureId);
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("registered source producers retain selected evidence only for exact provider declaration candidates", () => {
  const invocations: ProducerInvocation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";

        interface Owner { readonly member: string; }
        function local(value: string): string { return value; }
        const object = { method(value: string): string { return value; } };
        const indexedFunctions: Array<(value: string) => string> = [local];

        export const identifierCall = local("identifier");
        export const propertyCall = object.method("property");
        export const elementCall = indexedFunctions[0]("element");
        export const providerCall = mark<Owner>();
      `,
    },
    extensions: [
      sourceProducerExtension([completeFactProducer("mark", markSelector, invocations)]),
      fakeTargetExtension(),
    ],
  });
  assertCleanProgram(setup.program);

  const sourceFile = getSourceFile(setup.program, "/src/index.ts");
  const [checker, releaseChecker] = Program_GetTypeCheckerForFile(setup.program, Background(), sourceFile);
  try {
    for (const name of ["identifierCall", "propertyCall", "elementCall"] as const) {
      const call = getVariableInitializer(sourceFile, name);
      assert.equal(call.Kind, KindCallExpression);
      const links = LinkStore_Get(checker!.signatureLinks, call) as SignatureLinks;
      assert.equal(links.checkedCallSelectionSeed, undefined, `${name}: no unrelated source-producer seed`);
      assert.equal(links.resolvedCallSelectionEvidence, undefined, `${name}: no unrelated selected-call evidence`);
      assert.equal(links.resolvedCallEvidence, undefined, `${name}: no unrelated resolved-call evidence`);
      assert.equal(setup.extensionHost[extensionHostGetCheckedOperationReference](call), undefined);
    }
  } finally {
    releaseChecker();
  }

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(invocations.length, 1);
  assert.equal(invocations[0]?.selector, markSelector);
});

test("one provider callable value selects distinct exact function identities for overloads", () => {
  const stringCalls: CheckedSourceCallOperation[] = [];
  const numberCalls: CheckedSourceCallOperation[] = [];
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { overloadedValue } from "${fakeProviderModuleSpecifier}";
        export const text = overloadedValue("text");
        export const number = overloadedValue(42);
      `,
    },
    extensions: [
      sourceProducerExtension([{
        selector: overloadedStringSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, overloadedStringSelector);
          stringCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }, {
        selector: overloadedNumberSelector,
        produce: (operation, context) => {
          requireExactProviderDeclaration(operation, context, overloadedNumberSelector);
          numberCalls.push(operation);
          return completeCheckedSourceCallProduction;
        },
      }]),
      fakeTargetExtension(),
    ],
  });

  assertCleanProgram(setup.program);
  assert.equal(stringCalls.length, 1);
  assert.equal(numberCalls.length, 1);
  const stringDeclaration = requireApplicableSelection(stringCalls[0]!).declaration;
  const numberDeclaration = requireApplicableSelection(numberCalls[0]!).declaration;
  assert.ok(stringDeclaration !== undefined);
  assert.ok(numberDeclaration !== undefined);
  assert.equal(
    setup.extensionHost.facts.get(stringDeclaration, providerVirtualDeclarationFactKey)?.signatureId,
    overloadedStringSignatureId,
  );
  assert.equal(
    setup.extensionHost.facts.get(numberDeclaration, providerVirtualDeclarationFactKey)?.signatureId,
    overloadedNumberSignatureId,
  );
  assert.notEqual(stringDeclaration, numberDeclaration);
  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
});

test("invalid and untyped calls cannot enter exact provider-selected producers", () => {
  const producerCalls: CheckedSourceCallOperation[] = [];
  const targetRequests: CheckedCallMappingRequest[] = [];
  const registrations: ProducerRegistration[] = [{
    selector: markSelector,
    produce: (operation) => {
      producerCalls.push(operation);
      return completeCheckedSourceCallProduction;
    },
  }];
  const semanticProvider: TargetSemanticProvider = {
    identity: semanticProviderIdentity("checked-source-call-test.invalid-untyped-semantic"),
    mapCheckedCall: (request) => {
      targetRequests.push(request);
      return acceptObservation({ kind: "source" });
    },
  };
  const setup = createProgram({
    sourceFiles: {
      "index.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";

        interface Owner { readonly member: string; }
        declare const dynamicValue: any;
        export const invalid = mark<Owner>(1);
        export const untyped = dynamicValue();
      `,
    },
    extensions: [
      sourceProducerExtension(registrations),
      fakeTargetExtension(semanticProvider),
    ],
  });
  const index = getSourceFile(setup.program, "/src/index.ts");

  assertNoProgramOrSyntacticDiagnostics(setup.program, index);
  const semanticDiagnostics = Program_GetSemanticDiagnostics(setup.program, Background(), index);
  assert.equal(semanticDiagnostics.length, 1);
  assert.equal(Diagnostic_Code(semanticDiagnostics[0]), 2554);
  assert.equal(producerCalls.length, 0);
  assert.equal(targetRequests.length, 1);
  assert.equal(targetRequests[0]?.sourceSelection.kind, "untyped");
  const authoredCalls = collectNodesByKind(index, KindCallExpression);
  assert.equal(authoredCalls.length, 2);
  assert.equal(targetRequests[0]?.call, authoredCalls[1]);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(producerCalls.length, 0);
  assert.equal(targetRequests.length, 1);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("an active target mapper reads source-owned facts staged by exact producers", () => {
  const invocations: ProducerInvocation[] = [];
  const targetReads: Array<{ readonly request: CheckedCallMappingRequest; readonly fact: ProducedCallFact }> = [];
  const registrations = [
    completeFactProducer("mark", markSelector, invocations),
    completeFactProducer("select", selectSelector, invocations),
    completeFactProducer("terminal", terminalSelector, invocations),
  ];
  const semanticProvider: TargetSemanticProvider = {
    identity: semanticProviderIdentity("checked-source-call-test.staged-fact-semantic"),
    mapCheckedCall: (request, context) => {
      const fact = context.facts.get(request.call, producedCallFactKey);
      assert.ok(fact !== undefined, "The target mapper must observe the source producer's staged fact.");
      targetReads.push({ request, fact });
      if (fact.role !== "mark") {
        return acceptObservation({ kind: "source" });
      }
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          member: {
            id: "checked-source-call-test.target.mark",
            sourceName: "provider-root",
            targetName: "providerRoot",
            kind: "method",
            parameters: [],
          },
        },
        argumentConversions: [],
      });
    },
  };
  const setup = createSingleChainProgram({
    registrations,
    targetSemanticProvider: semanticProvider,
    terminalLabel: "mapped",
  });

  assertCleanProgram(setup.program);
  assert.deepEqual(targetReads.map((entry) => entry.fact.role), ["mark", "select", "terminal"]);
  assert.equal(invocations.length, 3);
  for (const entry of targetReads) {
    assert.equal(setup.extensionHost.facts.get(entry.request.call, producedCallFactKey), entry.fact);
  }
  const mark = requireInvocation(invocations, "mark");
  const select = requireInvocation(invocations, "select");
  const terminal = requireInvocation(invocations, "terminal");
  assert.equal(setup.extensionHost.facts.get(mark.operation.call, selectedTargetSignatureFactKey)?.member.id, "checked-source-call-test.target.mark");
  assert.equal(setup.extensionHost.facts.get(select.operation.call, selectedTargetSignatureFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(terminal.operation.call, selectedTargetSignatureFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.deepEqual(targetReads.map((entry) => entry.fact.role), ["mark", "select", "terminal"]);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("deferred source production rolls back and replays once with identical retained source evidence", () => {
  const invocations: ProducerInvocation[] = [];
  const terminalFactsBeforeWrite: Array<ProducedCallFact | undefined> = [];
  let terminalAttempt = 0;
  const registrations: ProducerRegistration[] = [
    completeFactProducer("mark", markSelector, invocations),
    completeFactProducer("select", selectSelector, invocations),
    {
      selector: terminalSelector,
      produce: (operation, context) => {
        recordInvocation("terminal", terminalSelector, operation, context, invocations);
        terminalAttempt += 1;
        terminalFactsBeforeWrite.push(context.facts.get(operation.call, producedCallFactKey));
        assert.equal(context.facts.set<ProducedCallFact>(operation.call, producedCallFactKey, {
          role: "terminal",
          phase: context.phase,
          attempt: terminalAttempt,
        }), "inserted");
        return context.phase === "checking"
          ? deferCheckedSourceCallProduction
          : completeCheckedSourceCallProduction;
      },
    },
  ];
  const setup = createSingleChainProgram({ registrations, terminalLabel: "deferred" });

  assertCleanProgram(setup.program);
  assert.deepEqual(invocations.map((invocation) => [invocation.role, invocation.phase]), [
    ["mark", "checking"],
    ["select", "checking"],
    ["terminal", "checking"],
  ]);
  const checkingTerminal = requireInvocation(invocations, "terminal");
  assert.deepEqual(terminalFactsBeforeWrite, [undefined]);
  assert.equal(setup.extensionHost.facts.get(checkingTerminal.operation.call, producedCallFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.deepEqual(invocations.map((invocation) => [invocation.role, invocation.phase]), [
    ["mark", "checking"],
    ["select", "checking"],
    ["terminal", "checking"],
    ["terminal", "finalization"],
  ]);
  const terminalInvocations = invocations.filter((invocation) => invocation.role === "terminal");
  assert.equal(terminalInvocations.length, 2);
  const replayedTerminal = terminalInvocations[1]!;
  assert.equal(replayedTerminal.operation, checkingTerminal.operation);
  assert.equal(replayedTerminal.operation.call, checkingTerminal.operation.call);
  assert.equal(replayedTerminal.operation.callee, checkingTerminal.operation.callee);
  assert.equal(replayedTerminal.operation.sourceArguments[0]?.expression, checkingTerminal.operation.sourceArguments[0]?.expression);
  assert.deepEqual(terminalFactsBeforeWrite, [undefined, undefined]);
  assert.deepEqual(setup.extensionHost.facts.get(replayedTerminal.operation.call, producedCallFactKey), {
    role: "terminal",
    phase: "finalization",
    attempt: 2,
  });
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

test("source rejection rolls back its staged source-owned fact", () => {
  const invocations: ProducerInvocation[] = [];
  let rejectedCall: CheckedSourceCallOperation | undefined;
  const registrations: ProducerRegistration[] = [
    completeFactProducer("mark", markSelector, invocations),
    completeFactProducer("select", selectSelector, invocations),
    {
      selector: terminalSelector,
      produce: (operation, context) => {
        recordInvocation("terminal", terminalSelector, operation, context, invocations);
        rejectedCall = operation;
        assert.equal(context.facts.set<TransactionProbeFact>(operation.call, transactionProbeFactKey, {
          stage: "source-rejection",
          phase: context.phase,
        }), "inserted");
        return rejectCheckedSourceCallProduction(sourceRejectionDiagnostic(operation, context));
      },
    },
  ];
  const setup = createSingleChainProgram({ registrations, terminalLabel: "source-rejected" });

  assertCleanProgram(setup.program);
  assert.deepEqual(invocations.map((invocation) => invocation.role), ["mark", "select", "terminal"]);
  assert.ok(rejectedCall !== undefined);
  assert.equal(setup.extensionHost.facts.get(rejectedCall.call, transactionProbeFactKey), undefined);
  for (const role of ["mark", "select"] as const) {
    const predecessor = requireInvocation(invocations, role);
    assert.equal(setup.extensionHost.facts.get(predecessor.operation.call, producedCallFactKey)?.role, role);
  }
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(invocations.length, 3, "A retained source rejection must publish without replaying its producer.");
  assert.equal(setup.extensionHost.facts.get(rejectedCall.call, transactionProbeFactKey), undefined);
  for (const role of ["mark", "select"] as const) {
    const predecessor = requireInvocation(invocations, role);
    assert.equal(setup.extensionHost.facts.get(predecessor.operation.call, producedCallFactKey)?.role, role);
  }
  const diagnostics = setup.extensionHost.diagnostics.all();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]?.extensionId, sourceProducerExtensionId);
  assert.equal(diagnostics[0]?.extensionCode, "TEST_SOURCE_CALL_REJECTED");
  assert.equal(diagnostics[0]?.numericCode, 9931001);
  assert.equal(diagnostics[0]?.nodeOrSpan, rejectedCall.call);
  const sourceDiagnostics = Program_GetSemanticDiagnostics(
    setup.program,
    Background(),
    getSourceFile(setup.program, "/src/index.ts"),
  );
  assert.equal(sourceDiagnostics.length, 1);
  assert.equal(Diagnostic_Code(sourceDiagnostics[0]), 9931001);
});

test("target rejection rolls back the source-owned fact visible to its mapper", () => {
  const invocations: ProducerInvocation[] = [];
  const targetReads: Array<{ readonly stage: ProducerRole | TransactionProbeFact["stage"]; readonly call: object }> = [];
  let rejectedOperation: CheckedSourceCallOperation | undefined;
  let rejectedStagedFact: TransactionProbeFact | undefined;
  const registrations: ProducerRegistration[] = [
    completeFactProducer("mark", markSelector, invocations),
    completeFactProducer("select", selectSelector, invocations),
    {
      selector: terminalSelector,
      produce: (operation, context) => {
        recordInvocation("terminal", terminalSelector, operation, context, invocations);
        rejectedOperation = operation;
        assert.equal(context.facts.set<TransactionProbeFact>(operation.call, transactionProbeFactKey, {
          stage: "target-rejection",
          phase: context.phase,
        }), "inserted");
        return completeCheckedSourceCallProduction;
      },
    },
  ];
  const semanticProvider: TargetSemanticProvider = {
    identity: semanticProviderIdentity("checked-source-call-test.target-rejection-semantic"),
    mapCheckedCall: (request, context) => {
      const produced = context.facts.get(request.call, producedCallFactKey);
      if (produced !== undefined) {
        targetReads.push({ stage: produced.role, call: request.call });
        return acceptObservation({ kind: "source" });
      }
      const transactionProbe = context.facts.get(request.call, transactionProbeFactKey);
      assert.ok(transactionProbe !== undefined, "The rejecting target mapper must see the source-owned staged fact.");
      rejectedStagedFact = transactionProbe;
      targetReads.push({ stage: transactionProbe.stage, call: request.call });
      return rejectObservation(targetRejectionDiagnostic(request, context.extensionId));
    },
  };
  const setup = createSingleChainProgram({
    registrations,
    targetSemanticProvider: semanticProvider,
    terminalLabel: "target-rejected",
  });

  assertCleanProgram(setup.program);
  assert.deepEqual(targetReads.map((entry) => entry.stage), ["mark", "select", "target-rejection"]);
  assert.deepEqual(rejectedStagedFact, { stage: "target-rejection", phase: "checking" });
  assert.ok(rejectedOperation !== undefined);
  assert.equal(setup.extensionHost.facts.get(rejectedOperation.call, transactionProbeFactKey), undefined);
  for (const role of ["mark", "select"] as const) {
    const predecessor = requireInvocation(invocations, role);
    assert.equal(setup.extensionHost.facts.get(predecessor.operation.call, producedCallFactKey)?.role, role);
  }
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);

  assert.equal(finalizeExtensionSemantics(setup.programOptions), setup.extensionHost);
  assert.equal(invocations.length, 3);
  assert.deepEqual(targetReads.map((entry) => entry.stage), ["mark", "select", "target-rejection"]);
  assert.equal(setup.extensionHost.facts.get(rejectedOperation.call, transactionProbeFactKey), undefined);
  for (const role of ["mark", "select"] as const) {
    const predecessor = requireInvocation(invocations, role);
    assert.equal(setup.extensionHost.facts.get(predecessor.operation.call, producedCallFactKey)?.role, role);
  }
  const diagnostics = setup.extensionHost.diagnostics.all();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]?.extensionId, targetExtensionId);
  assert.equal(diagnostics[0]?.extensionCode, "TEST_TARGET_CALL_REJECTED");
  assert.equal(diagnostics[0]?.numericCode, 9932001);
  assert.equal(diagnostics[0]?.nodeOrSpan, rejectedOperation.call);
  const sourceDiagnostics = Program_GetSemanticDiagnostics(
    setup.program,
    Background(),
    getSourceFile(setup.program, "/src/index.ts"),
  );
  assert.equal(sourceDiagnostics.length, 1);
  assert.equal(Diagnostic_Code(sourceDiagnostics[0]), 9932001);
});

test("checked source-call producer registration is restricted to source composition", () => {
  let registrationResult: boolean | undefined;
  let producerCalls = 0;
  const targetOnlyExtensionId = "checked-source-call-test.target-only-registration";
  const extension: CompilerExtension = {
    identity: {
      id: targetOnlyExtensionId,
      version: "1.0.0",
      capabilityNamespace: "checked-source-call-test.target-only-registration",
    },
    composition: { kind: "target", target: fakeTarget },
    initialize(context): void {
      registrationResult = context.registerCheckedSourceCallProducer({
        selector: markSelector,
        produce: () => {
          producerCalls += 1;
          return completeCheckedSourceCallProduction;
        },
      });
    },
  };
  const setup = createProgram({
    sourceFiles: { "index.ts": "export const value = 1;" },
    extensions: [extension],
  });

  assert.equal(registrationResult, false);
  assert.equal(producerCalls, 0);
  const diagnostics = setup.extensionHost.diagnostics.all();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]?.extensionCode, "INVALID_CHECKED_SOURCE_CALL_PRODUCER");
  assert.equal(diagnostics[0]?.numericCode, ExtensionHostDiagnosticCode.invalidSourceOperationProducer);
  assert.equal(
    diagnostics[0]?.message,
    `Only a source-composition extension can register a checked source-call producer; '${targetOnlyExtensionId}' is 'target'.`,
  );
});

function completeFactProducer(
  role: ProducerRole,
  selector: CheckedSourceCallProviderSelector,
  invocations: ProducerInvocation[],
): ProducerRegistration {
  return {
    selector,
    produce: (operation, context) => {
      recordInvocation(role, selector, operation, context, invocations);
      assert.equal(context.facts.set(operation.call, producedCallFactKey, {
        role,
        phase: context.phase,
        attempt: 1,
      }), "inserted");
      return completeCheckedSourceCallProduction;
    },
  };
}

function recordInvocation(
  role: ProducerRole,
  selector: CheckedSourceCallProviderSelector,
  operation: CheckedSourceCallOperation,
  context: CheckedSourceCallProducerContext,
  invocations: ProducerInvocation[],
): void {
  assert.equal(context.extensionId, sourceProducerExtensionId);
  assert.equal(operation.sourceOperationKind, "call");
  assert.equal(operation.callKind, "call");
  assert.equal(operation.sourceSelection.kind, "applicable");
  assert.equal(operation.sourceResult.expression, operation.call);
  assert.equal(operation.arguments.length, operation.sourceArguments.length);
  assert.equal(Object.isFrozen(operation), true);
  requireExactProviderDeclaration(operation, context, selector);
  invocations.push({
    role,
    selector,
    operation,
    phase: context.phase,
  });
}

function requireExactProviderDeclaration(
  operation: CheckedSourceCallOperation,
  context: CheckedSourceCallProducerContext,
  selector: CheckedSourceCallProviderSelector,
): void {
  requireApplicableSelection(operation);
  assert.equal(context.extensionId, sourceProducerExtensionId);
  assert.deepEqual(operation.sourceProviderSelection, selector);
}

function requireApplicableSelection(operation: CheckedSourceCallOperation) {
  assert.equal(operation.sourceSelection.kind, "applicable");
  if (operation.sourceSelection.kind !== "applicable") {
    throw new Error("Expected exact applicable source-call evidence.");
  }
  return operation.sourceSelection;
}

function requireInvocation(invocations: readonly ProducerInvocation[], role: ProducerRole): ProducerInvocation {
  const matching = invocations.filter((invocation) => invocation.role === role);
  assert.equal(matching.length, 1);
  return matching[0]!;
}

function sourceProducerExtension(
  registrations: readonly ProducerRegistration[],
  registrationResults?: boolean[],
): CompilerExtension {
  return {
    identity: {
      id: sourceProducerExtensionId,
      version: "1.0.0",
      capabilityNamespace: "checked-source-call-test.source-producer",
      diagnosticRange: { start: 9931000, end: 9931099 },
    },
    composition: { kind: "source" },
    initialize(context): void {
      for (const registration of registrations) {
        const producer: CheckedSourceCallProducer = {
          selector: registration.selector,
          produce: registration.produce,
        };
        const registered = context.registerCheckedSourceCallProducer(producer);
        registrationResults?.push(registered);
        assert.equal(registered, true);
      }
    },
  };
}

function fakeTargetExtension(semanticProvider?: TargetSemanticProvider): CompilerExtension {
  return {
    identity: {
      id: targetExtensionId,
      version: "1.0.0",
      capabilityNamespace: "checked-source-call-test.target",
      diagnosticRange: { start: 9932000, end: 9932099 },
    },
    composition: { kind: "target", target: fakeTarget },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(fakeBindingProvider()), true);
      if (semanticProvider !== undefined) {
        assert.equal(context.registerTargetSemanticProvider(semanticProvider), true);
      }
    },
  };
}

function fakeBindingProvider(): TargetBindingProvider {
  return {
    identity: {
      id: fakeBindingProviderId,
      version: fakeBindingProviderVersion,
      target: fakeTarget,
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
    },
    ownsModule: (moduleSpecifier) => moduleSpecifier === fakeProviderModuleSpecifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (moduleSpecifier) => ({
      kind: "virtual",
      moduleSpecifier,
      virtualFileName: "tsts-provider://checked-source-call-test/fluent",
      providerModuleId: fakeProviderModuleId,
      packageName: "@test/checked-source-call",
      packageVersion: "1.0.0",
    }),
    getDeclarationModel: (resolution): ProviderDeclarationModel => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: markExportId,
        name: "mark",
        kind: "function",
        signatures: [{
          id: markSignatureId,
          typeParameters: [{ name: "Owner" }],
          parameters: [],
          returnType: {
            kind: "provider-ref",
            moduleSpecifier: resolution.moduleSpecifier,
            exportName: "Marked",
            typeArguments: [{ kind: "type-parameter", name: "Owner" }],
          },
        }],
      }, {
        id: markedExportId,
        name: "Marked",
        kind: "interface",
        typeParameters: [{ name: "Owner" }],
        members: [{
          id: selectMemberId,
          name: "select",
          kind: "method",
          signatures: [{
            id: selectSignatureId,
            typeParameters: [{ name: "Value" }],
            parameters: [{
              name: "selector",
              type: {
                kind: "function",
                id: "Marked.select.selector",
                parameters: [{
                  name: "owner",
                  type: { kind: "type-parameter", name: "Owner" },
                }],
                returnType: { kind: "type-parameter", name: "Value" },
              },
            }],
            returnType: {
              kind: "provider-ref",
              moduleSpecifier: resolution.moduleSpecifier,
              exportName: "Selected",
              typeArguments: [
                { kind: "type-parameter", name: "Owner" },
                { kind: "type-parameter", name: "Value" },
              ],
            },
          }],
        }],
      }, {
        id: selectedExportId,
        name: "Selected",
        kind: "interface",
        typeParameters: [{ name: "Owner" }, { name: "Value" }],
        members: [{
          id: terminalMemberId,
          name: "terminal",
          kind: "method",
          signatures: [{
            id: terminalSignatureId,
            parameters: [{ name: "value", type: { kind: "unknown" } }],
            returnType: { kind: "type-parameter", name: "Owner" },
          }],
        }],
      }, {
        id: callableValueExportId,
        name: "markValue",
        kind: "value",
        type: {
          kind: "function",
          id: callableValueSignatureId,
          typeParameters: [{ name: "Owner" }],
          parameters: [],
          returnType: {
            kind: "provider-ref",
            moduleSpecifier: resolution.moduleSpecifier,
            exportName: "Marked",
            typeArguments: [{ kind: "type-parameter", name: "Owner" }],
          },
        },
      }, {
        id: overloadedValueExportId,
        name: "overloadedValue",
        kind: "value",
        type: {
          kind: "intersection",
          types: [{
            kind: "function",
            id: overloadedStringSignatureId,
            parameters: [{ name: "value", type: { kind: "string" } }],
            returnType: { kind: "string" },
          }, {
            kind: "function",
            id: overloadedNumberSignatureId,
            parameters: [{ name: "value", type: { kind: "number" } }],
            returnType: { kind: "number" },
          }],
        },
      }, {
        id: factoryExportId,
        name: "Factory",
        kind: "interface",
        members: [{
          id: "fluent.Factory.unicode-prefix",
          name: { kind: "string-literal", text: "é" },
          kind: "property",
          readonly: true,
          type: { kind: "string" },
        }, {
          id: factoryCallMemberId,
          name: "markProperty",
          kind: "property",
          readonly: true,
          type: {
            kind: "function",
            id: factoryCallSignatureId,
            typeParameters: [{ name: "Owner" }],
            parameters: [],
            returnType: {
              kind: "provider-ref",
              moduleSpecifier: resolution.moduleSpecifier,
              exportName: "Marked",
              typeArguments: [{ kind: "type-parameter", name: "Owner" }],
            },
          },
        }],
      }, {
        id: factoryValueExportId,
        name: "factory",
        kind: "value",
        type: {
          kind: "provider-ref",
          moduleSpecifier: resolution.moduleSpecifier,
          exportName: "Factory",
        },
      }, {
        id: staticFactoryExportId,
        name: "StaticFactory",
        kind: "class",
        members: [{
          id: staticFactoryCallMemberId,
          name: "markStatic",
          kind: "property",
          static: true,
          readonly: true,
          type: {
            kind: "function",
            id: staticFactoryCallSignatureId,
            typeParameters: [{ name: "Owner" }],
            parameters: [],
            returnType: {
              kind: "provider-ref",
              moduleSpecifier: resolution.moduleSpecifier,
              exportName: "Marked",
              typeArguments: [{ kind: "type-parameter", name: "Owner" }],
            },
          },
        }],
      }, {
        id: constructedExportId,
        name: "Constructed",
        kind: "class",
        members: [{
          id: constructedMemberId,
          name: "constructor",
          kind: "constructor",
          signatures: [{
            id: constructedSignatureId,
            parameters: [{ name: "value", type: { kind: "string" } }],
          }],
        }],
      }, {
        id: utilitiesExportId,
        name: "Utilities",
        kind: "namespace",
        members: [{
          id: utilitiesMemberId,
          name: "markNamespace",
          kind: "property",
          type: {
            kind: "function",
            id: utilitiesSignatureId,
            typeParameters: [{ name: "Owner" }],
            parameters: [],
            returnType: {
              kind: "provider-ref",
              moduleSpecifier: resolution.moduleSpecifier,
              exportName: "Marked",
              typeArguments: [{ kind: "type-parameter", name: "Owner" }],
            },
          },
        }],
      }, {
        id: callableIndexExportId,
        name: "CallableIndex",
        kind: "interface",
        members: [{
          id: callableIndexMemberId,
          name: "index",
          kind: "indexer",
          signatures: [{
            id: callableIndexSignatureId,
            parameters: [{ name: "index", type: { kind: "number" } }],
            returnType: {
              kind: "function",
              id: callableIndexCallSignatureId,
              parameters: [{ name: "value", type: { kind: "string" } }],
              returnType: { kind: "string" },
            },
          }],
        }],
      }, {
        id: callableIndexValueExportId,
        name: "callableIndex",
        kind: "value",
        type: {
          kind: "provider-ref",
          moduleSpecifier: resolution.moduleSpecifier,
          exportName: "CallableIndex",
        },
      }, {
        id: nulCollisionLeftExportId,
        name: "CollisionLeft",
        kind: "interface",
        members: [{
          id: nulCollisionLeftMemberId,
          name: "invoke",
          kind: "property",
          readonly: true,
          type: {
            kind: "function",
            id: nulCollisionSignatureId,
            parameters: [],
            returnType: { kind: "string" },
          },
        }],
      }, {
        id: "fluent.collisionLeft.value",
        name: "collisionLeft",
        kind: "value",
        type: {
          kind: "provider-ref",
          moduleSpecifier: resolution.moduleSpecifier,
          exportName: "CollisionLeft",
        },
      }, {
        id: nulCollisionRightExportId,
        name: "CollisionRight",
        kind: "interface",
        members: [{
          id: nulCollisionRightMemberId,
          name: "invoke",
          kind: "property",
          readonly: true,
          type: {
            kind: "function",
            id: nulCollisionSignatureId,
            parameters: [],
            returnType: { kind: "string" },
          },
        }],
      }, {
        id: "fluent.collisionRight.value",
        name: "collisionRight",
        kind: "value",
        type: {
          kind: "provider-ref",
          moduleSpecifier: resolution.moduleSpecifier,
          exportName: "CollisionRight",
        },
      }],
    }),
  };
}

function semanticProviderIdentity(id: string) {
  return {
    id,
    version: "1.0.0",
    target: fakeTarget,
    extensionContractVersion: TstsProviderContractVersion,
    providerKind: "semantic" as const,
  };
}

function attributeSourceExtension(): CompilerExtension {
  return createSourceSemanticsExtension({
    identity: {
      id: "checked-source-call-test.attribute-source",
      version: "1.0.0",
      capabilityNamespace: "checked-source-call-test.attribute-source",
    },
    modules: [{
      moduleSpecifier: "@test/source-markers/lang.js",
      packageName: "@test/source-markers",
      subpath: "lang.js",
      exports: [{ kind: "call-marker", exportName: "attribute", marker: "attribute" }],
    }],
  });
}

function sourceMarkerPackageFiles(): ReadonlyMap<string, string> {
  return new Map([
    ["/src/node_modules/@test/source-markers/package.json", JSON.stringify({
      name: "@test/source-markers",
      version: "1.0.0",
      type: "module",
      exports: {
        "./lang.js": {
          types: "./lang.d.ts",
          default: "./lang.js",
        },
      },
    })],
    ["/src/node_modules/@test/source-markers/lang.d.ts", "export declare function attribute<T>(value?: unknown): unknown;"],
  ]);
}

function sourceRejectionDiagnostic(
  operation: CheckedSourceCallOperation,
  context: CheckedSourceCallProducerContext,
): ExtensionDiagnostic {
  return {
    extensionId: context.extensionId,
    extensionCode: "TEST_SOURCE_CALL_REJECTED",
    numericCode: 9931001,
    category: "error",
    message: "The test source producer rejected the selected terminal call.",
    nodeOrSpan: operation.call,
    identity: "checked-source-call-test:source-rejection",
  };
}

function targetRejectionDiagnostic(request: CheckedCallMappingRequest, extensionId: string): ExtensionDiagnostic {
  return {
    extensionId,
    extensionCode: "TEST_TARGET_CALL_REJECTED",
    numericCode: 9932001,
    category: "error",
    message: "The test target mapper rejected the selected terminal call.",
    nodeOrSpan: request.call,
    identity: "checked-source-call-test:target-rejection",
  };
}

function createSingleChainProgram(options: {
  readonly registrations: readonly ProducerRegistration[];
  readonly targetSemanticProvider?: TargetSemanticProvider;
  readonly terminalLabel: string;
}): ProgramSetup {
  return createProgram({
    sourceFiles: {
      "index.ts": `
        import { mark } from "${fakeProviderModuleSpecifier}";

        interface Owner { readonly member: string; }
        export const result = mark<Owner>()
          .select(owner => owner.member)
          .terminal("${options.terminalLabel}");
      `,
    },
    extensions: [
      sourceProducerExtension(options.registrations),
      fakeTargetExtension(options.targetSemanticProvider),
    ],
  });
}

interface ProgramSetup {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
}

function createProgram(options: {
  readonly sourceFiles: Readonly<Record<string, string>>;
  readonly extensions: readonly CompilerExtension[];
  readonly extraFiles?: ReadonlyMap<string, string>;
}): ProgramSetup {
  const sourceEntries = Object.entries(options.sourceFiles)
    .map(([fileName, sourceText]) => [`/src/${fileName}`, sourceText] as const);
  const rootFileNames = ["profile.d.ts", ...Object.keys(options.sourceFiles)];
  const files = new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ...sourceEntries,
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: rootFileNames,
    })],
    ...(options.extraFiles ?? []),
  ]);
  let fs = FromMap(files, false as bool);
  fs = WrapFS(fs);
  const compilerHost = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile(
    "/src/tsconfig.json",
    {} as CompilerOptions,
    undefined,
    compilerHost as ParseConfigHost,
    undefined,
  );
  assert.equal((configErrors ?? []).length, 0);
  const baseOptions = { Config: parsed, Host: compilerHost } satisfies ProgramOptions;
  const extended = attachExtensionHost(baseOptions, {
    activeTarget: fakeTarget,
    extensions: options.extensions,
  });
  return {
    program: NewProgram(extended.program),
    programOptions: extended.program,
    extensionHost: extended.extensionHost,
  };
}

function assertCleanProgram(program: GoPtr<Program>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
    const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
    assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
    assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
  }
}

function assertNoProgramOrSyntacticDiagnostics(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
}

function getSourceFile(program: GoPtr<Program>, fileName: string): NonNullable<GoPtr<SourceFile>> {
  const sourceFile = Program_GetSourceFile(program, fileName);
  assert.ok(sourceFile !== undefined);
  return sourceFile;
}

function getVariableInitializer(sourceFile: GoPtr<SourceFile>, name: string): NonNullable<GoPtr<Node>> {
  const declaration = findNamedNodeByKind(sourceFile, KindVariableDeclaration, name);
  const initializer = Node_Initializer(declaration);
  assert.ok(initializer !== undefined);
  return initializer;
}

function findNamedNodeByKind(root: GoPtr<Node>, kind: number, name: string): NonNullable<GoPtr<Node>> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found === undefined && node?.Kind === kind && Node_Text(Node_Name(node)) === name) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function collectNodesByKind(root: GoPtr<Node>, kind: number): NonNullable<GoPtr<Node>>[] {
  const nodes: NonNullable<GoPtr<Node>>[] = [];
  visitNodes(root, (node) => {
    if (node?.Kind === kind) {
      nodes.push(node);
    }
  });
  return nodes;
}

function visitNodes(root: GoPtr<Node>, visit: (node: NonNullable<GoPtr<Node>>) => void): void {
  if (root === undefined) {
    return;
  }
  visit(root);
  Node_ForEachChild(root, (child) => {
    visitNodes(child, visit);
    return false;
  });
}

const sourceProfile = `
  interface Object {}
  interface Function {}
  interface CallableFunction extends Function {}
  interface NewableFunction extends Function {}
  interface IArguments {}
  interface String {}
  interface Number {}
  interface Boolean {}
  interface RegExp {}
  interface Array<T> { readonly length: number; [index: number]: T; }
`;
