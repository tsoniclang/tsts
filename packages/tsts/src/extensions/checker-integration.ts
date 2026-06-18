import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Expression, Node_Text, Node_TypeArguments } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_Name } from "../internal/ast/spine.js";
import { AsElementAccessExpression } from "../internal/ast/generated/casts.js";
import { TokenToString } from "../internal/scanner/scanner.js";
import { ExtensionDecisionQuestion } from "./decisions.js";
import type { ParameterModeRequest, ParameterModeResult, ResolveCallRequest, ResolveCallResult, ResolveElementAccessRequest, ResolveOperationResult, ResolveOperatorRequest, ResolvePropertyAccessRequest, SatisfiesConstraintRequest } from "./decisions.js";
import { argumentPassingFactKey, selectedTargetSignatureFactKey, surfaceOperationFactKey, targetBindingFactKey } from "./facts.js";
import type { ExtensionHost } from "./host.js";
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
  recordExtensionCallParameterModes(extensionHost, callExpression, result.value, Node_Arguments(callExpression) ?? []);
}

export function recordExtensionPropertyAccessResolution(checker: GoPtr<CheckerWithProgram>, propertyAccessExpression: GoPtr<Node>): void {
  if (checker === undefined || propertyAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getDecisionOwner(ExtensionDecisionQuestion.resolvePropertyAccess) === undefined) {
    return;
  }

  const receiver = Node_Expression(propertyAccessExpression);
  const propertyName = Node_Text(Node_Name(propertyAccessExpression));
  if (receiver === undefined || propertyName === "") {
    return;
  }

  const result = extensionHost.runDecision<ResolvePropertyAccessRequest, ResolveOperationResult>(
    ExtensionDecisionQuestion.resolvePropertyAccess,
    {
      expression: propertyAccessExpression,
      receiver,
      propertyName,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned property access resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  extensionHost.facts.set(propertyAccessExpression, surfaceOperationFactKey, result.value.operation, result.evidence ?? []);
}

export function recordExtensionElementAccessResolution(checker: GoPtr<CheckerWithProgram>, elementAccessExpression: GoPtr<Node>): void {
  if (checker === undefined || elementAccessExpression === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getDecisionOwner(ExtensionDecisionQuestion.resolveElementAccess) === undefined) {
    return;
  }

  const receiver = Node_Expression(elementAccessExpression);
  const argument = AsElementAccessExpression(elementAccessExpression)?.ArgumentExpression;
  if (receiver === undefined || argument === undefined) {
    return;
  }

  const result = extensionHost.runDecision<ResolveElementAccessRequest, ResolveOperationResult>(
    ExtensionDecisionQuestion.resolveElementAccess,
    {
      expression: elementAccessExpression,
      receiver,
      argument,
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned element access resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  extensionHost.facts.set(elementAccessExpression, surfaceOperationFactKey, result.value.operation, result.evidence ?? []);
}

export function recordExtensionOperatorResolution(checker: GoPtr<CheckerWithProgram>, expression: GoPtr<Node>, operatorToken: GoPtr<Node>, left: GoPtr<Node>, right: GoPtr<Node>): void {
  if (checker === undefined || expression === undefined || operatorToken === undefined || left === undefined) {
    return;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getDecisionOwner(ExtensionDecisionQuestion.resolveOperator) === undefined) {
    return;
  }

  const result = extensionHost.runDecision<ResolveOperatorRequest, ResolveOperationResult>(
    ExtensionDecisionQuestion.resolveOperator,
    {
      expression,
      operator: TokenToString(operatorToken.Kind),
      left,
      ...(right !== undefined ? { right } : {}),
      ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
    },
    () => {
      throw new Error("Extension-owned operator resolution unexpectedly reached core fallback.");
    },
    { requireOwner: true },
  );

  if (result.kind !== "accept") {
    return;
  }

  extensionHost.facts.set(expression, surfaceOperationFactKey, result.value.operation, result.evidence ?? []);
}

export function recordExtensionTypeArgumentConstraintResolution(checker: GoPtr<CheckerWithProgram>, typeReference: GoPtr<Node>, symbol: GoPtr<Symbol>): boolean {
  if (checker === undefined || typeReference === undefined || symbol === undefined) {
    return true;
  }

  const extensionHost = getExtensionHost(checker.program);
  if (extensionHost === undefined || extensionHost.getDecisionOwner(ExtensionDecisionQuestion.satisfiesConstraint) === undefined) {
    return true;
  }

  const targetBinding = extensionHost.facts.get(symbol, targetBindingFactKey);
  const typeParameters = targetBinding?.typeParameters ?? [];
  const typeArguments = Node_TypeArguments(typeReference) ?? [];
  if (targetBinding === undefined || typeParameters.length === 0 || typeArguments.length === 0) {
    return true;
  }

  let valid = true;
  for (let parameterIndex = 0; parameterIndex < typeParameters.length; parameterIndex++) {
    const parameter = typeParameters[parameterIndex];
    const argument = typeArguments[parameterIndex];
    if (parameter === undefined || argument === undefined) {
      continue;
    }
    for (const constraint of parameter.constraints ?? []) {
      const result = extensionHost.runDecision<SatisfiesConstraintRequest, boolean>(
        ExtensionDecisionQuestion.satisfiesConstraint,
        {
          source: argument,
          constraint,
          target: extensionHost.activeTarget ?? targetBinding.target,
        },
        () => {
          throw new Error("Extension-owned target constraint checking unexpectedly reached core fallback.");
        },
        { requireOwner: true },
      );
      if (result.kind !== "accept" || !result.value) {
        valid = false;
      }
    }
  }
  return valid;
}

function recordExtensionCallParameterModes(extensionHost: ExtensionHost, callExpression: GoPtr<Node>, callResult: ResolveCallResult, arguments_: readonly GoPtr<Node>[]): void {
  if (extensionHost.getDecisionOwner(ExtensionDecisionQuestion.getParameterMode) === undefined) {
    return;
  }
  const parameters = callResult.selectedSignature.member.parameters;
  for (let index = 0; index < parameters.length; index++) {
    const parameter = parameters[index];
    const argument = arguments_[index];
    if (parameter === undefined || argument === undefined) {
      continue;
    }
    const result = extensionHost.runDecision<ParameterModeRequest, ParameterModeResult>(
      ExtensionDecisionQuestion.getParameterMode,
      {
        parameter,
        argument,
        ...(extensionHost.activeTarget !== undefined ? { target: extensionHost.activeTarget } : {}),
      },
      () => {
        throw new Error("Extension-owned parameter mode checking unexpectedly reached core fallback.");
      },
      { requireOwner: true },
    );
    if (result.kind !== "accept") {
      continue;
    }
    extensionHost.facts.set(argument, argumentPassingFactKey, result.value.passing, result.evidence ?? []);
    extensionHost.facts.set(callExpression, argumentPassingFactKey, result.value.passing, result.evidence ?? []);
  }
}
