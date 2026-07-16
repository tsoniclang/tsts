# TSTS v0 Fixes Backport Ledger

This branch is an isolated cumulative fix line for Tsonic consumers while the next TSTS line is developed separately. It is not intended to merge wholesale into `main`.

- Branch: `tsts-v0-fixes`
- Base: `a80a5da32ee5335928e44ee3fe9357fe1e51056e`
- Policy: port contracts and regressions, not private helper names or file locations.
- Ordering: preserve the commit order below because later fixes strengthen or share earlier contracts.
- Compatibility: do not add legacy paths when porting. Each row identifies the one current contract.
- Evidence: every implementation commit contains neutral regressions. Local detailed request/response reports live under `.analysis/worklist/` but are intentionally untracked by repository policy.

## Work Items

| Worklist ID | Commit(s) | Disposition | Contract to port |
|---|---|---|---|
| `20260713-080445-repeated-checked-property-provenance` | `4361a76685c5091fc222a8570e6d8d80332955a8` | Superseded; port only with the next row | Repeated checked operation observations remain idempotent when equivalent TS-Go result wrappers are reallocated. |
| `20260713-084231-checked-operation-result-identity` | `aa06e699d49d489ddbe00c443c248c4d29192dd4` | Resolved | Target operation results are structural `TargetTypeRef` values; unique-symbol source identity is declaration anchored after full provenance equality. |
| `20260713-094102-selected-tuple-element-index-evidence` | `e1d623bf9ed12b71605f9294136411e1543909e6` | Resolved | Checked element access exposes the selected fixed tuple ordinal without consumer AST/checker reconstruction. |
| `20260713-094101-checked-assertion-conversion-evidence` | `1068a2d3d36e33a937b3035d60a9cdd0889e78c3` | Resolved | Checked assertions expose selected conversion evidence and explicit target syntax provenance. |
| `20260713-134329-assertion-source-alias-evidence` | `82954374f3f67990403f811b291eda06152a340a` | Resolved | Assertion conversion evidence preserves exact source alias/syntax provenance after semantic primitive erasure. |
| `20260713-145945-variable-declaration-kind-contract` | `8837d3cd76568e2c40412c4b207a1d55f3ba1033` | Resolved | Public AST queries distinguish `const`, `let`, and `var` through TS-Go declaration flags rather than modifier flags. |
| `20260713-165152-provider-slice-canonical-export-identity-ordering` | `4f81fb743d04f91a36e0714074134bffe3c542b2` | Resolved | One provider public module export has one canonical identity across slice and resolution order. |
| `20260714-075158-provider-family-canonical-slice-value-heritage` | `4e9154564b6b21c9376ff0e4f61596f2c7986637` | Resolved | Value-position provider heritage preserves the exact selected family arity variant. |
| `20260714-121906-provider-value-heritage-benign-resolution-cycle` | `59f9fab4ef25d245e4f8ec680d79729e64941508` | Resolved | Provider closure planning distinguishes benign module revisits from exact declaration-heritage cycles. |
| `20260714-202748-dotnet-provider-model-complexity-bound` | `9fcc1b6d080519cceede3dc2803621ad20dc5097` | Resolved | Ancillary metadata, declaration graph, and recursive closure workloads have independent finite budgets and atomic rollback. |
| `20260715-174228-provider-source-profile-type-reference` | `8b53611f4ab16b301b2b37bba618d6daf48a1a21`, `fe8063dbf8ac870c6749618c475733fe24f35ead`, `56a44d1b562731d2c107980e1fc99d46db8b460d` | Resolved | Providers can reference exact selected source-profile global types, including generic types, without activating profiles or guessing names. |
| `20260715-174823-aspnet-provider-closure-transaction-budget` | `8699823fdc45bb2963148802f161eba3720aee60`, `fe8063dbf8ac870c6749618c475733fe24f35ead`, `56a44d1b562731d2c107980e1fc99d46db8b460d` | Resolved | Provider closure accounting separates retained physical state from expanded semantic work and remains finite, order independent, and atomic. |
| `20260715-210925-aspnet-provider-input-scalar-budget` | `79e400b664c98a2e6b4f9305e067afe5976ecd77`, `e38b1731790214cfadac4176b2e7832a488d836b` | Resolved | Input-scalar capacity is measured once per physical snapshot, calibrated from neutral profiles, finite at every boundary, and atomically rejected beyond limits. |
| `20260716-122903-selected-source-constructor-call-evidence` | `691ceb8006ea8e8be32cb9614879032060e4bbdb` | Resolved; accepted by focused Tsonic integration | Checked calls expose alias-resolved callee identity and selected parameter provenance; mapper results are target-only and finalized source evidence is checker-owned. |

## Complete Commit Order

1. `4361a76685c5091fc222a8570e6d8d80332955a8`
2. `aa06e699d49d489ddbe00c443c248c4d29192dd4`
3. `e1d623bf9ed12b71605f9294136411e1543909e6`
4. `1068a2d3d36e33a937b3035d60a9cdd0889e78c3`
5. `82954374f3f67990403f811b291eda06152a340a`
6. `8837d3cd76568e2c40412c4b207a1d55f3ba1033`
7. `4f81fb743d04f91a36e0714074134bffe3c542b2`
8. `4e9154564b6b21c9376ff0e4f61596f2c7986637`
9. `59f9fab4ef25d245e4f8ec680d79729e64941508`
10. `9fcc1b6d080519cceede3dc2803621ad20dc5097`
11. `8b53611f4ab16b301b2b37bba618d6daf48a1a21`
12. `8699823fdc45bb2963148802f161eba3720aee60`
13. `fe8063dbf8ac870c6749618c475733fe24f35ead`
14. `56a44d1b562731d2c107980e1fc99d46db8b460d`
15. `79e400b664c98a2e6b4f9305e067afe5976ecd77`
16. `e38b1731790214cfadac4176b2e7832a488d836b`
17. `691ceb8006ea8e8be32cb9614879032060e4bbdb`

## Future Fix Procedure

For every incoming issue:

1. Add a timestamped request and response pair under `.analysis/worklist/`.
2. Generalize the failure class before implementation; reject target-specific recovery and compatibility paths.
3. Commit neutral implementation and positive/fail-closed regressions together.
4. Include `Backport-Worklist: <timestamp-name>` in the commit body.
5. Update this ledger with the exact commit and semantic contract.
6. Push `tsts-v0-fixes` and verify local `HEAD` equals `origin/tsts-v0-fixes` before reporting completion.
