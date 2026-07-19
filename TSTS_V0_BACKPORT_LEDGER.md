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
| `20260717-082846-selected-receiver-and-deferred-operation-finalization` | `97a0c550bfa61586ab90c36cade31e41d085eefd` through `43194d24c747a0500c84c5dbea16a26ed8007da0` | Resolved | Checked calls, members, operators, conversions, and iteration retain immutable checker-selected source evidence and finalize through one bounded, deterministic, dependency-ordered, atomic operation graph after lifecycle facts become available. |
| `20260718-declaration-only-checked-operations` | `90cf4005209f2fefdafd495b76362e6d31cdce6c`, `f63828ce5188ad33d9d11e28d6511ed40e041ffc`, `bf89f7700457a269e1ed11f444ce5432df882b49` | Resolved | Runtime checked operations are published only for executable implementation syntax; declarations and ambient/type-only syntax remain semantic inputs, while implementation operations retain declaration-selected evidence. |
| `20260718-retained-operation-transaction-audit` | `90cf4005209f2fefdafd495b76362e6d31cdce6c`, `f63828ce5188ad33d9d11e28d6511ed40e041ffc`, `bf89f7700457a269e1ed11f444ce5432df882b49` | Resolved | Retained operations, dependencies, mapper effects, diagnostics, and facts settle or roll back with their exact atomic owner; replay is bounded, idempotent, conflict-diagnosed, and cannot migrate children between owners. |
| `20260718-source-decision-authority-audit` | `695c2f92b9f8a0a4503233de1988f5278175e23a`, `ab66f3943c070340ce30f2da3a0eb86dc4aa2aa7`, `f63828ce5188ad33d9d11e28d6511ed40e041ffc`, `bf89f7700457a269e1ed11f444ce5432df882b49`, `84af473b0de29e570320dc9a20c0592b1e271086` | Resolved | Exact source decisions are captured only on authoritative checker branches, speculative/query work cannot publish, for-of evidence follows the normal TS-Go check path, and property selection preserves TS-Go's lazy chosen branch. |
| `20260718-post-lifecycle-deep-audit` | `90cf4005209f2fefdafd495b76362e6d31cdce6c` through `84af473b0de29e570320dc9a20c0592b1e271086` | Resolved | The complete post-check lifecycle has one source-decision authority, one retained-operation settlement model, exact bounded codecs, immutable provenance, and no target-specific or legacy recovery path. |
| `porter-extension-boundary-and-semantic-decomposition` | `17c4d250cb75d16528118b4286c4556278ae9db7`, `df9bdccebb0531ae38db3ec823a778569563425a` | Resolved maintenance contract | Extension-only helpers are excluded explicitly from mechanical TS-Go unit parity, local overrides remain verifier-checked, and Porter implementation files are split by semantic ownership without changing extracted signature scope. |
| `20260719-full-corpus-index-evidence-and-harness` | `61f2a765b7a820639a734e94177665860ffd4283` | Resolved | Index-signature provenance is extension-only exact declaration evidence: ordinary TS-Go symbol caches are unchanged and no synthetic `__index` symbol is fabricated. The TypeScript corpus harness also applies static pinned-runner skips before materialization and models the complete TypeScript API declaration alias family. |
| `20260719-115106-post-finalization-checker-query` | `44928afc` | Resolved | Public checker and diagnostic queries retain canonical semantic discovery while extension semantics are open, then become read-only consumers of already-checked state once finalization begins; they cannot reopen lifecycle hooks, checked operations, facts, provider artifacts, or extension diagnostics. |
| `20260719-135458-provider-type-family-runtime-carrier-shared-symbol-conflict` | `3407b2f8` | Resolved | Instantiated runtime carriers are published only to exact checked type-use and semantic-type subjects; declaration symbols remain provenance/target-binding subjects and cannot acquire one concrete carrier for multiple generic instantiations or provider-family arities. |
| `20260719-165020-built-package-omits-bundled-default-libraries` | `4720657c` | Resolved | The build packages exactly the generated bundled-library index, and package validation installs the real tarball in isolation and checks a default-lib program through the public API. |

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
18. `7961f2c443fe131ee5c5c5fafa9fc19815f86df4`
19. `85d12a8cccce1aefdd034e3ee7dba179f78de2e6`
20. `97a0c550bfa61586ab90c36cade31e41d085eefd`
21. `21bdbc7cc68faf5127308c69151aade5553586c5`
22. `64518ee72531e8673950bf8ce0a4bf18d60a2569`
23. `dc950407bc0762ae479d55794fe0fd953612a91d`
24. `0eabacfd79062f89c0a49be7b9b8b37538be674d`
25. `942c944cdcdf2c6ec02d4a161a5d469583fa8a29`
26. `8b2b82db2235fa45e9d1ecd6701bba347e251624`
27. `1ac7bbb50fc930a82b486eddf6ac5c78d5cba65b`
28. `dc1152fee27ac319c0f647e3bd15fbe2c30e6f4c`
29. `43194d24c747a0500c84c5dbea16a26ed8007da0`
30. `695c2f92b9f8a0a4503233de1988f5278175e23a`
31. `ab66f3943c070340ce30f2da3a0eb86dc4aa2aa7`
32. `90cf4005209f2fefdafd495b76362e6d31cdce6c`
33. `f63828ce5188ad33d9d11e28d6511ed40e041ffc`
34. `bf89f7700457a269e1ed11f444ce5432df882b49`
35. `17c4d250cb75d16528118b4286c4556278ae9db7`
36. `84af473b0de29e570320dc9a20c0592b1e271086`
37. `df9bdccebb0531ae38db3ec823a778569563425a`
38. `61f2a765b7a820639a734e94177665860ffd4283`
39. `44928afc`
40. `3407b2f8`
41. `4720657c`

## Complete Validation At Implementation `3407b2f8`

- Build and built-package contract: pass.
- Complete source suite: 2,075/2,075 pass; zero failed, skipped, or todo.
- Porter tests: 83/83 pass.
- Strict Porter verification: 9,385/9,385 portable units implemented; zero missing, stale, orphan, generated-artifact, schema-sync, large-file-plan, or override issues.
- TS-Go suite harness tests: 85/85 pass.
- Current pinned TS-Go corpus: 317 total; 313 pass, zero fail, four explicit policy skips; 925 exact comparable artifacts and zero mismatches.
- Full TypeScript corpus: 15,626 total; 12,820 pass, zero fail, 2,806 explicit pinned-runner policy skips; 43,218 exact comparable artifacts and zero mismatches.
- Real-world AST parity: 1,274/1,274 files pass.
- Generated data: 108 bundled libraries current; Unicode 15.1.0 data current.
- Reproducible built artifact: 1,808 files; two independent builds produced aggregate sorted-manifest SHA-256 `c15f97ff87d121116b1de115c3f2f98ffc4bbc87e549fd605a7b9f6fd5e7e9a3`.
- Performance gates completed under a 5 GiB memory ceiling: mandatory self-compile wall median 15.76s and maxRSS 1,446.07 MiB for 654 files/552,030 lines; pinned native TS-Go cross-check wall 0.79s versus TSTS 14.30s and `tsc` 5.84s; UTF-8/source-text speedups 79.8x–19,277.6x over legacy equivalents; scanner checksum-stable medians 4.25ms ASCII, 2.50ms mixed Unicode, and 1.57ms JSX.

## Future Fix Procedure

For every incoming issue:

1. Add a timestamped request and response pair under `.analysis/worklist/`.
2. Generalize the failure class before implementation; reject target-specific recovery and compatibility paths.
3. Commit neutral implementation and positive/fail-closed regressions together.
4. Include `Backport-Worklist: <timestamp-name>` in the commit body.
5. Update this ledger with the exact commit and semantic contract.
6. Push `tsts-v0-fixes` and verify local `HEAD` equals `origin/tsts-v0-fixes` before reporting completion.
