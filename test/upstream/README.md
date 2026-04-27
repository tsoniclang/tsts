Vendored upstream compiler conformance inputs.

These files are copied as source inputs plus pinned diagnostic baselines. The conformance runner treats upstream `.errors.txt` baselines as the oracle instead of re-deriving expected diagnostics with the installed TypeScript API, because the official compiler suite depends on harness virtual-file semantics that are not equivalent to a raw `ts.createProgram` call.

Pinned upstream sources:

- TypeScript: `microsoft/TypeScript` at `55423abe4d029017f19b6e4c32097591994836b4`
- TS-Go: `microsoft/typescript-go` at `515d036f927aba8b468011098e2721335f0e2d00`

Directories:

- `typescript/compiler`: copied from TypeScript `tests/cases/compiler`
- `typescript/baselines/reference/compiler`: copied from TypeScript `tests/baselines/reference/*.errors.txt`
- `tsgo/compiler`: copied from TS-Go `testdata/tests/cases/compiler`
- `tsgo/baselines/reference/compiler`: copied from TS-Go `testdata/baselines/reference/compiler`

Refresh rule:

- Update the pinned commit notes and replace the copied source inputs in the same change.
- Do not hand-edit individual upstream cases to make local behavior pass.
