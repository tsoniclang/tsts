import { SignatureKind } from "./types.js";

export function signatureKindToString(kind: SignatureKind): string {
  if (kind === SignatureKind.Call) return "SignatureKindCall";
  if (kind === SignatureKind.Construct) return "SignatureKindConstruct";
  return `SignatureKind(${kind})`;
}
