/**
 * Incremental output invalidation parity helpers.
 */

export interface OutputSignature {
  readonly output: string;
  readonly input: string;
  readonly signature: string;
}

export interface OutputInvalidation {
  readonly output: string;
  readonly reason: "missing" | "signature-change" | "input-change";
}

export function compareOutputSignatures(previous: readonly OutputSignature[], next: readonly OutputSignature[]): readonly OutputInvalidation[] {
  const previousByOutput = new Map(previous.map(item => [item.output, item]));
  const invalidations: OutputInvalidation[] = [];
  for (const current of next) {
    const old = previousByOutput.get(current.output);
    if (old === undefined) invalidations.push({ output: current.output, reason: "missing" });
    else if (old.input !== current.input) invalidations.push({ output: current.output, reason: "input-change" });
    else if (old.signature !== current.signature) invalidations.push({ output: current.output, reason: "signature-change" });
  }
  return invalidations;
}

export function outputsAffectedByInputs(signatures: readonly OutputSignature[], inputs: ReadonlySet<string>): readonly string[] {
  return signatures.filter(signature => inputs.has(signature.input)).map(signature => signature.output).sort();
}

export function updateOutputSignature(signatures: readonly OutputSignature[], next: OutputSignature): readonly OutputSignature[] {
  const result = signatures.filter(signature => signature.output !== next.output);
  result.push(next);
  return result.sort((left, right) => left.output.localeCompare(right.output));
}
