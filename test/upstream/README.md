Vendored upstream compiler conformance inputs.

These files are copied as source inputs only. The conformance runner compares the diagnostics produced by the installed TypeScript API against `tsts` for the same cases; it does not trust or import upstream baseline output.

Pinned upstream sources:

- TypeScript: `microsoft/TypeScript` at `55423abe4d029017f19b6e4c32097591994836b4`
- TS-Go: `microsoft/typescript-go` at `515d036f927aba8b468011098e2721335f0e2d00`

Directories:

- `typescript/compiler`: copied from TypeScript `tests/cases/compiler`
- `tsgo/compiler`: copied from TS-Go `testdata/tests/cases/compiler`
- `tsgo/baselines/reference/compiler`: copied from TS-Go `testdata/baselines/reference/compiler`

Refresh rule:

- Update the pinned commit notes and replace the copied source inputs in the same change.
- Do not hand-edit individual upstream cases to make local behavior pass.
