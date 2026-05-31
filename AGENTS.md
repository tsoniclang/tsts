# Agent Notes (TSTS)

This repo is airplane-grade. Correctness and contract exactness matter more than speed.

## Remote Safety

- Never delete remote branches or tags.
- Never force-push.
- Push work to feature branches only; maintainers will merge PRs.

## Work Hygiene

- Never use `git stash`.
- Keep all meaningful work committed on the active branch.
- Keep generated files reproducible from checked-in inputs.
- Use `.temp/` for scratch work inside this repo.
- Do not commit `.analysis/`, `.temp/`, `.tests/`, or local build artifacts.

## TS-Go Contract

- The frontend target is the exact TS-Go schema-level AST contract.
- The source of truth is the pinned TS-Go schema copied under `schema/tsgo/`.
- Do not hand-maintain AST kind values, node fields, aliases, or visitor/factory ordering.
- Do not target TypeScript 6 JavaScript object shapes.
- Do not target Go memory layout or pointer identity.
- If the local schema or generated output drifts from the pinned TS-Go contract, fail hard.

## Compiler State Mutation

- TSTS allows controlled compiler-state mutation **only where TS-Go mutates the equivalent** AST `Node`, `Symbol`, `Type`, `FlowNode`, `Program`, or `EmitContext` state (e.g. `node.parent`, `node.symbol`, `node.locals`, `node.flowNode`, `node.nextContainer`, `symbol.declarations`, `symbol.members`).
- The mutable fields must be declared **centrally** on the corresponding interfaces/types, not bolted on ad hoc.
- Banned: arbitrary ad-hoc mutation, `as any` / `as unknown as` writes, and parallel **side-table substitutes** (e.g. `symbolByNodeId.set(getNodeId(node), symbol)`) — unless upstream TS-Go itself uses an equivalent separate table/link object for that exact state.
- Rationale: the binder/checker/transformer/emitter port is 1:1 with TS-Go, which shares state through AST/Symbol/Flow/links. Side tables create a permanent translation layer that diverges from upstream and hides silent misses. (Decision: codex review-036, AST option A.)

## Truth Over Heuristics

- Do not add heuristic resolution, guessing, name-based inference, or fallback binding in compiler code.
- If a fact is unknown, surface an explicit error instead of recovering silently.
- Optional files or artifacts must be proven to exist before reading them.

## ESM Only

- ESM only.
- Do not introduce CommonJS patterns such as `require`, `module.exports`, or `export =`.
- Do not use triple-slash TypeScript references.
- Use explicit ESM imports with `.js` extensions in TypeScript source.

## Compatibility Policy

- Backward compatibility is not a goal unless explicitly requested.
- Do not add compatibility shims or legacy paths as final architecture.
- Prefer one exact current contract over dual behavior.

## Testing Workflow

- Schema checks must run before trusting generated AST code.
- Parser/scanner tests must compare against TS-Go behavior, not approximate TypeScript expectations.
- Golden files may only encode intended external behavior.
- Never weaken tests to match an implementation bug.

## Reports and Analysis

- Technical reports must include concrete source-level examples when explaining compiler behavior.
- Explain the source input, semantic/compiler decision, produced structure/output, and why it matters.
