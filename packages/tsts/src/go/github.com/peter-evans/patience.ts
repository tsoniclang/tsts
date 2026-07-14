import type { int } from "../../scalars.js";
import type { GoSlice } from "../../compat.js";
import { GoSliceLoad, GoStringValueOps } from "../../compat.js";


export type DiffKind = "equal" | "delete" | "insert";

export interface DiffLine {
  Kind: DiffKind;
  Text: string;
}

export interface UnifiedDiffOptions {
  Precontext?: int;
  Postcontext?: int;
  SrcHeader?: string;
  DstHeader?: string;
}

export function Diff(oldLines: GoSlice<string>, newLines: GoSlice<string>): GoSlice<DiffLine> {
  const result: DiffLine[] = [];
  const oldLength = oldLines.length;
  const newLength = newLines.length;
  const lcs = Array.from({ length: oldLength + 1 }, () => new Array<number>(newLength + 1).fill(0));
  for (let i = oldLength - 1; i >= 0; i--) {
    for (let j = newLength - 1; j >= 0; j--) {
      lcs[i]![j] = GoSliceLoad(oldLines, i, GoStringValueOps) === GoSliceLoad(newLines, j, GoStringValueOps) ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!);
    }
  }
  let i = 0;
  let j = 0;
  while (i < oldLength || j < newLength) {
    if (i < oldLength && j < newLength && GoSliceLoad(oldLines, i, GoStringValueOps) === GoSliceLoad(newLines, j, GoStringValueOps)) {
      result.push({ Kind: "equal", Text: GoSliceLoad(oldLines, i, GoStringValueOps)! });
      i++;
      j++;
    } else if (j < newLength && (i === oldLength || lcs[i]![j + 1]! >= lcs[i + 1]![j]!)) {
      result.push({ Kind: "insert", Text: GoSliceLoad(newLines, j, GoStringValueOps)! });
      j++;
    } else if (i < oldLength) {
      result.push({ Kind: "delete", Text: GoSliceLoad(oldLines, i, GoStringValueOps)! });
      i++;
    }
  }
  return result;
}

export function UnifiedDiffTextWithOptions(lines: GoSlice<DiffLine>, options: UnifiedDiffOptions): string {
  const output: string[] = [];
  output.push(`--- ${options.SrcHeader ?? "old"}`);
  output.push(`+++ ${options.DstHeader ?? "new"}`);
  output.push("@@");
  for (const line of lines) {
    switch (line.Kind) {
      case "equal":
        output.push(` ${line.Text}`);
        break;
      case "delete":
        output.push(`-${line.Text}`);
        break;
      case "insert":
        output.push(`+${line.Text}`);
        break;
    }
  }
  return output.join("\n");
}
