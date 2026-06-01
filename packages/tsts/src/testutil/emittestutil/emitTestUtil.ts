export interface EmitTestFile {
  readonly path: string;
  readonly text: string;
}

export interface EmitTestResult {
  readonly js: readonly EmitTestFile[];
  readonly declarations: readonly EmitTestFile[];
  readonly diagnostics: readonly string[];
}

export function formatEmitResult(result: EmitTestResult): string {
  const sections: string[] = [];
  for (const file of result.js) sections.push(`//// ${file.path}\n${file.text}`);
  for (const file of result.declarations) sections.push(`//// ${file.path}\n${file.text}`);
  if (result.diagnostics.length > 0) sections.push(`//// diagnostics\n${result.diagnostics.join("\n")}`);
  return sections.join("\n\n");
}
