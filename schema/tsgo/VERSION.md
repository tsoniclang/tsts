# TS-Go Schema Pin

TSTS vendors the TS-Go AST schema as the exact frontend contract.

| Field | Value |
| --- | --- |
| Upstream | `microsoft/typescript-go` |
| Commit | `515d036f927aba8b468011098e2721335f0e2d00` |
| `ast.json` SHA-256 | `b51eb936a91ac24b61ea5ad7fa83d99b92c7329c4676c675c8b71713bcf28db3` |
| `ast.schema.json` SHA-256 | `c614df46892e8623fcb4ba9d2cbdc4da2537af140674776f3dbb78e96cdf16d2` |
| `protocol.ts` SHA-256 | `02662b99b9e40190fc56b7210139175d043e369c59345b61fb5c5533bdd42830` |

## Policy

- Generated AST contract code must be derived from these files.
- Schema drift is a hard failure.
- Updating the schema requires updating this file, regenerating artifacts, and explaining the upstream TS-Go change.
