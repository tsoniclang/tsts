import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import { Background } from "../go/context.js";
import type { GoPtr } from "../go/compat.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import {
  NewProgram,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  ExtensionLifecycleEvent,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  deferObservation,
  finalizeExtensionSemantics,
  selectedTargetSignatureFactKey,
  targetCallArgumentConversionFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CompilerExtension,
  ExtensionHost,
  SelectedTargetSignatureFact,
  TargetCallArgumentConversionSlot,
  TargetSignatureSelection,
} from "./index.js";

test("an idempotent selected-call fact still finalizes call-argument child semantics", () => {
  let checkingRequest: CheckedCallMappingRequest | undefined;
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const selection: TargetSignatureSelection = {
    member: {
      id: "acme.consume",
      sourceName: "consume",
      targetName: "consume",
      kind: "method",
      parameters: [{
        name: "value",
        type: { kind: "source-global", name: "String" },
        passingMode: "by-value",
      }],
    },
  };
  const extension: CompilerExtension = {
    identity: {
      id: "checked-operation-child-semantics",
      version: "1.0.0",
      capabilityNamespace: "checked-operation-child-semantics",
    },
    initialize(context): void {
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        assert.ok(checkingRequest !== undefined);
        assert.equal(
          lifecycleContext.host.facts.set(
            checkingRequest.call,
            selectedTargetSignatureFactKey,
            selectedFact(selection, checkingRequest),
          ),
          "inserted",
        );
      });
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "checked-operation-child-semantics-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request, observationContext) => {
          if (observationContext.phase === "checking") {
            checkingRequest = request;
            return deferObservation;
          }
          return acceptObservation({
            kind: "target",
            selectedSignature: selection,
            argumentConversions: [{
              sourceArgumentIndex: 0,
              sourceForm: "value",
              targetParameterIndex: 0,
              targetForm: "parameter",
            }],
          });
        },
        mapCheckedConversion: (request) => {
          conversionRequests.push(request);
          return acceptObservation({
            convertedType: { kind: "source-global", name: "String" },
          });
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createProgram(extension);

  assertCleanProgram(program);
  assert.ok(checkingRequest !== undefined);
  assert.equal(conversionRequests.length, 0);

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);

  assert.equal(extensionHost.finalized, true);
  assert.equal(conversionRequests.length, 1);
  const conversion = conversionRequests[0];
  assert.equal(conversion?.conversionKind, "call-argument");
  if (conversion?.conversionKind !== "call-argument") {
    throw new Error("Expected a call-argument child conversion.");
  }
  assert.ok(conversion.call === checkingRequest.call, "conversion must retain the exact checked call subject");
  assert.equal(conversion.sourceArgumentIndex, 0);
  assert.equal(conversion.targetParameterIndex, 0);
  assert.ok(
    conversion.selectedSignature.sourceSelectedSignatureParameters?.[0]?.parameterSymbol
      === checkingRequest.sourceSelectedSignatureParameters?.[0]?.parameterSymbol,
    "The conversion must retain the exact selected source parameter symbol.",
  );
  assert.equal(conversion.sourceForm, "value");
  assert.equal(conversion.targetForm, "parameter");
  assert.ok(
    conversion.slot === conversion.selectedSignature.argumentConversions[0],
    "The child conversion must use its selected signature's canonical slot identity.",
  );
  assert.equal(extensionHost.facts.get(checkingRequest.call, selectedTargetSignatureFactKey)?.member.id, selection.member.id);
  const conversionFact = extensionHost.facts.get(conversion.slot, targetCallArgumentConversionFactKey);
  assert.ok(conversionFact?.slot === conversion.slot, "The child conversion fact must be keyed by and retain the exact selected slot.");
  const convertedType = conversionFact?.convertedType;
  assert.equal(convertedType?.kind, "source-global");
  if (convertedType?.kind !== "source-global") {
    throw new Error("Expected a source-global call-argument conversion target.");
  }
  assert.equal(convertedType.name, "String");
  assert.equal(extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
});

function selectedFact(
  selection: TargetSignatureSelection,
  request: CheckedCallMappingRequest,
): SelectedTargetSignatureFact {
  return {
    ...selection,
    argumentConversions: [argumentConversionSlot(0, 0)],
    sourceArgumentBindings: request.sourceArgumentBindings ?? [],
    ...(request.sourceSelectedMethodTypeArguments === undefined ? {} : {
      sourceSelectedMethodTypeArguments: request.sourceSelectedMethodTypeArguments,
    }),
    ...(request.sourceSelectedSignatureParameters === undefined ? {} : {
      sourceSelectedSignatureParameters: request.sourceSelectedSignatureParameters,
    }),
    ...(request.sourceSelectedSignatureKind === undefined ? {} : {
      sourceSelectedSignatureKind: request.sourceSelectedSignatureKind,
    }),
    sourceCallKind: request.callKind,
    ...(request.sourceSelectedSignature === undefined ? {} : { sourceSignature: request.sourceSelectedSignature }),
    ...(request.sourceSelectedDeclaration === undefined ? {} : { sourceDeclaration: request.sourceSelectedDeclaration }),
    sourceCallee: request.sourceCallee,
    sourceArguments: request.sourceArguments,
    sourceResult: request.sourceResult,
    ...(request.optionalChain === undefined ? {} : { sourceOptionalChain: request.optionalChain }),
    ...(request.sourceReceiver === undefined ? {} : { sourceReceiver: request.sourceReceiver }),
  };
}

function argumentConversionSlot(
  sourceArgumentIndex: number,
  targetParameterIndex: number,
): TargetCallArgumentConversionSlot {
  return {
    sourceArgumentIndex,
    sourceForm: "value",
    targetParameterIndex,
    targetForm: "parameter",
  };
}

function createProgram(extension: CompilerExtension): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
} {
  const files = new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ["/src/index.ts", `
      declare function consume(value: string): void;
      consume("value");
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]);
  let fs = FromMap(files, false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const baseOptions = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(baseOptions, {
    activeTarget: "acme",
    extensions: [extension],
  });
  const program = NewProgram(extended.program);
  return { program, programOptions: extended.program, extensionHost: extended.extensionHost };
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
