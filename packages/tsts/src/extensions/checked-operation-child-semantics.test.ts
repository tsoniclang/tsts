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
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  finalizeExtensionSemantics,
  selectedTargetSignatureFactKey,
  targetCallArgumentConversionFactKey,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedConversionMappingRequest,
  CompilerExtension,
  ExtensionHost,
  TargetCallArgumentConversionSlot,
  TargetSignatureSelection,
} from "./index.js";
test("selected calls finalize all call-argument child semantics atomically after lifecycle", () => {
  const capture: { request?: CheckedCallMappingRequest } = {};
  const conversionRequests: CheckedConversionMappingRequest[] = [];
  const conversionRuns = [0, 0];
  const conversionPhases: string[] = [];
  const callPhases: string[] = [];
  const selection: TargetSignatureSelection = {
    member: {
      id: "acme.consume",
      sourceName: "consume",
      targetName: "consume",
      kind: "method",
      parameters: [{
        name: "first",
        type: { kind: "source-global", name: "String" },
        passingMode: "by-value",
      }, {
        name: "second",
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
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "checked-operation-child-semantics-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request, observationContext) => {
          callPhases.push(observationContext.phase);
          capture.request = request;
          return acceptObservation({
            kind: "target",
            selectedSignature: selection,
            argumentConversions: [{
              sourceArgumentIndex: 0,
              sourceForm: "value",
              targetParameterIndex: 0,
              targetForm: "parameter",
            }, {
              sourceArgumentIndex: 1,
              sourceForm: "value",
              targetParameterIndex: 1,
              targetForm: "parameter",
            }],
          });
        },
        mapCheckedConversion: (request, context) => {
          conversionRequests.push(request);
          if (request.conversionKind === "call-argument") {
            const sourceArgumentIndex = request.sourceBinding.sourceArgumentIndex;
            conversionPhases.push(`${sourceArgumentIndex}:${context.phase}`);
            conversionRuns[sourceArgumentIndex] = (conversionRuns[sourceArgumentIndex] ?? 0) + 1;
          }
          return acceptObservation({
            convertedType: { kind: "source-global", name: "String" },
          });
        },
      }), true);
    },
  };
  const { program, programOptions, extensionHost } = createProgram(extension);

  assertCleanProgram(program);
  const checkingRequest = capture.request;
  assert.ok(checkingRequest !== undefined, "A ready selected call must map during source checking.");
  assert.deepEqual(callPhases, ["checking"]);
  assert.deepEqual(conversionPhases, ["0:checking", "1:checking"]);
  assert.deepEqual(conversionRuns, [1, 1]);
  assert.equal(conversionRequests.length, 2);

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const finalizationRequest = capture.request;
  assert.ok(finalizationRequest !== undefined);
  assert.ok(finalizationRequest === checkingRequest, "Finalization must retain the exact checked request identity without replay.");

  assert.equal(extensionHost.finalized, true);
  assert.deepEqual(callPhases, ["checking"]);
  assert.deepEqual(conversionPhases, ["0:checking", "1:checking"]);
  assert.deepEqual(conversionRuns, [1, 1]);
  assert.equal(conversionRequests.length, 2);
  const conversion = conversionRequests.find((request) => request.conversionKind === "call-argument" && request.sourceBinding.sourceArgumentIndex === 0);
  assert.equal(conversion?.conversionKind, "call-argument");
  if (conversion?.conversionKind !== "call-argument") {
    throw new Error("Expected a call-argument child conversion.");
  }
  assert.ok(conversion.call === finalizationRequest.call, "conversion must retain the exact checked call subject");
  assert.equal(conversion.sourceBinding.sourceArgumentIndex, 0);
  assert.equal(conversion.slot.targetParameterIndex, 0);
  assert.ok(
    conversion.selectedSignature.sourceSelection.kind === "applicable"
      && finalizationRequest.sourceSelection.kind === "applicable"
      && conversion.selectedSignature.sourceSelection.parameters[0]?.parameterSymbol
        === finalizationRequest.sourceSelection.parameters[0]?.parameterSymbol,
    "The conversion must retain the exact selected source parameter symbol.",
  );
  assert.equal(conversion.sourceBinding.sourceForm, "value");
  assert.equal(conversion.slot.targetForm, "parameter");
  assert.ok(
    conversion.slot === conversion.selectedSignature.argumentConversions[0],
    "The child conversion must use its selected signature's canonical slot identity.",
  );
  assert.equal(extensionHost.facts.get(finalizationRequest.call, selectedTargetSignatureFactKey)?.member.id, selection.member.id);
  const conversionFact = extensionHost.facts.get(conversion.slot, targetCallArgumentConversionFactKey);
  assert.ok(conversionFact?.slot === conversion.slot, "The child conversion fact must be keyed by and retain the exact selected slot.");
  const convertedType = conversionFact?.convertedType;
  assert.equal(convertedType?.kind, "source-global");
  if (convertedType?.kind !== "source-global") {
    throw new Error("Expected a source-global call-argument conversion target.");
  }
  assert.equal(convertedType.name, "String");
  const secondConversion = conversionRequests.find((request) => request.conversionKind === "call-argument" && request.sourceBinding.sourceArgumentIndex === 1);
  if (secondConversion?.conversionKind !== "call-argument") {
    throw new Error("Expected the second call-argument child conversion.");
  }
  assert.equal(extensionHost.facts.get(secondConversion.slot, targetCallArgumentConversionFactKey)?.convertedType?.kind, "source-global");
  assert.equal(extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
});

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
      declare function consume(first: string, second: string): void;
      consume("first", "second");
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
