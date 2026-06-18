import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression } from "../internal/ast/ast.js";
import { ExtensionDecisionQuestion } from "./decisions.js";
import type { ResolveCallRequest, ResolveCallResult } from "./decisions.js";
import { selectedTargetSignatureFactKey } from "./facts.js";
import { getExtensionHost } from "./host.js";

interface CheckerWithProgram {
  readonly program: object;
}

export function recordExtensionCallResolution(checker: GoPtr<CheckerWithProgram>, callExpression: GoPtr<Node>): void {
  if (checker === undefined || callExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getDecisionOwner(ExtensionDecisionQuestion.resolveCall) === undefined) {
    return;
  }

  const callee = Node_Expression(callExpression);
  if (callee === undefined) {
    return;
  }

  const result = extensionHost.runDecision<ResolveCallRequest, ResolveCallResult>(
    ExtensionDecisionQuestion.resolveCall,
    {
      call: callExpression,
      callee,
      arguments: Node_Arguments(callExpression) ?? [],
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned call resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  extensionHost.facts.set(callExpression, selectedTargetSignatureFactKey, result.value.selectedSignature, result.evidence ?? []);
}
