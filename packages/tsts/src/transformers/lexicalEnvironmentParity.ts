/**
 * Lexical environment parity helpers.
 */

import type { Node as AstNode } from "../ast/index.js";

export interface TransformLexicalEnvironment {
  readonly frames: TransformLexicalFrame[];
}

export interface TransformLexicalFrame {
  readonly node: AstNode;
  readonly declarations: TransformHoistDeclaration[];
  readonly tempVariables: string[];
}

export interface TransformHoistDeclaration {
  readonly name: string;
  readonly kind: "var" | "function";
  readonly node?: AstNode;
}

export function createTransformLexicalEnvironment(): TransformLexicalEnvironment {
  return { frames: [] };
}

export function startTransformLexicalEnvironment(environment: TransformLexicalEnvironment, node: AstNode): TransformLexicalFrame {
  const frame: TransformLexicalFrame = { node, declarations: [], tempVariables: [] };
  environment.frames.push(frame);
  return frame;
}

export function endTransformLexicalEnvironment(environment: TransformLexicalEnvironment, frame: TransformLexicalFrame): readonly TransformHoistDeclaration[] {
  const current = environment.frames.pop();
  if (current !== frame) throw new Error("Transform lexical environment ended out of order.");
  return frame.declarations;
}

export function hoistTransformFunction(environment: TransformLexicalEnvironment, name: string, node: AstNode): void {
  currentFrame(environment).declarations.push({ name, kind: "function", node });
}

export function hoistTransformVariable(environment: TransformLexicalEnvironment, name: string, node?: AstNode): void {
  currentFrame(environment).declarations.push({ name, kind: "var", ...(node === undefined ? {} : { node }) });
}

export function allocateTempVariable(environment: TransformLexicalEnvironment, prefix = "_temp"): string {
  const frame = currentFrame(environment);
  const name = `${prefix}${frame.tempVariables.length}`;
  frame.tempVariables.push(name);
  frame.declarations.push({ name, kind: "var" });
  return name;
}

export function lexicalEnvironmentDepth(environment: TransformLexicalEnvironment): number {
  return environment.frames.length;
}

export function lexicalEnvironmentDeclarations(environment: TransformLexicalEnvironment): readonly TransformHoistDeclaration[] {
  return environment.frames.flatMap(frame => frame.declarations);
}

function currentFrame(environment: TransformLexicalEnvironment): TransformLexicalFrame {
  const frame = environment.frames[environment.frames.length - 1];
  if (frame === undefined) throw new Error("No active transform lexical environment.");
  return frame;
}
