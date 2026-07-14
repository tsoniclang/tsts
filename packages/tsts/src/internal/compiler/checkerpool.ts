import type { bool, int } from "../../go/scalars.js";
import { GoEqualStrict, type GoMap, type GoPtr, type GoSlice } from "../../go/compat.js";
import type { Context } from "../../go/context.js";
import { Mutex, Once, OnceFunc } from "../../go/sync.js";
import type { SourceFile } from "../ast/ast.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import { NewChecker } from "../checker/checker/state.js";
import type { Checker } from "../checker/checker/state.js";
import { Checker_GetGlobalDiagnostics } from "../checker/checker/diagnostics.js";
import { NewTracer } from "../checker/tracer.js";
import { NewWorkGroup } from "../core/workgroup.js";
import type { Tracing } from "../tracing/tracing.js";
import { Concat, Index } from "../../go/slices.js";
import type { Program } from "./program.js";
import { Program_as_checker_Program, Program_Options, Program_SingleThreaded, SortAndDeduplicateDiagnostics } from "./program.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceLoad, GoSliceStore, GoSliceValueOps } from "../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::type::CheckerPool","kind":"type","status":"implemented","sigHash":"c982af3c817df71dc9ae1af140208863183d3eaa1e11d94bfdcf98a350318845"}
 *
 * Go source:
 * CheckerPool interface {
 * 	GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
 * }
 */
export interface CheckerPool {
  GetChecker(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::type::checkerPool","kind":"type","status":"implemented","sigHash":"1586bb5506912830f0532ac797eda4f3701bf2b9daa7da79ac8f2b61ca699bbf"}
 *
 * Go source:
 * checkerPool struct {
 * 	program *Program
 * 	tracing *tracing.Tracing
 * 
 * 	createCheckersOnce sync.Once
 * 	checkers           []*checker.Checker
 * 	locks              []*sync.Mutex
 * 	fileAssociations   map[*ast.SourceFile]*checker.Checker
 * }
 */
export interface checkerPool {
  program: GoPtr<Program>;
  tracing: GoPtr<Tracing>;
  createCheckersOnce: Once;
  checkers: GoSlice<GoPtr<Checker>>;
  locks: GoSlice<GoPtr<Mutex>>;
  fileAssociations: GoMap<GoPtr<SourceFile>, GoPtr<Checker>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"4e31f2db76b3745b8a9fcd481b03ad08bf8536bf7a7377587813fadb230a8521"}
 *
 * Go source:
 * var _ CheckerPool = (*checkerPool)(nil)
 */
export let __34031131_0: GoInterface<CheckerPool> = checkerPool_as_compiler_CheckerPool(undefined);

export function checkerPool_as_compiler_CheckerPool(receiver: GoPtr<checkerPool>): CheckerPool {
  return {
    GetChecker: (ctx: Context, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] => checkerPool_GetChecker(receiver, ctx, file),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::func::newCheckerPool","kind":"func","status":"implemented","sigHash":"166e4959543a17d547b22ee4264d922ed4cabd9adeaa8a75759e6f7392883bdf"}
 *
 * Go source:
 * func newCheckerPool(program *Program) *checkerPool {
 * 	return newCheckerPoolWithTracing(program, nil)
 * }
 */
export function newCheckerPool(program: GoPtr<Program>): GoPtr<checkerPool> {
  return newCheckerPoolWithTracing(program, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::func::newCheckerPoolWithTracing","kind":"func","status":"implemented","sigHash":"9953910d49bd820792eabe9a00a2ed76d566e8c7b5bc474574cc454fed7a1624"}
 *
 * Go source:
 * func newCheckerPoolWithTracing(program *Program, tr *tracing.Tracing) *checkerPool {
 * 	checkerCount := 4
 * 	if program.SingleThreaded() {
 * 		checkerCount = 1
 * 	} else if c := program.Options().Checkers; c != nil {
 * 		checkerCount = *c
 * 	}
 * 
 * 	checkerCount = max(min(checkerCount, len(program.files), 256), 1)
 * 
 * 	pool := &checkerPool{
 * 		program:  program,
 * 		checkers: make([]*checker.Checker, checkerCount),
 * 		locks:    make([]*sync.Mutex, checkerCount),
 * 		tracing:  tr,
 * 	}
 * 
 * 	return pool
 * }
 */
export function newCheckerPoolWithTracing(program: GoPtr<Program>, tr: GoPtr<Tracing>): GoPtr<checkerPool> {
  let checkerCount = 4;
  if (Program_SingleThreaded(program)) {
    checkerCount = 1;
  } else {
    const c = Program_Options(program)!.Checkers;
    if (c !== undefined) {
      checkerCount = c.v;
    }
  }
  const files = program!.__tsgoEmbedded0!.files;
  checkerCount = Math.max(Math.min(checkerCount, files.length, 256), 1);
  const pool: checkerPool = {
    program,
    tracing: tr,
    createCheckersOnce: new Once(),
    checkers: new globalThis.Array(checkerCount).fill(undefined) as GoSlice<GoPtr<Checker>>,
    locks: new globalThis.Array(checkerCount).fill(undefined) as GoSlice<GoPtr<Mutex>>,
    fileAssociations: new globalThis.Map<GoPtr<SourceFile>, GoPtr<Checker>>(),
  };
  return pool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.GetChecker","kind":"method","status":"implemented","sigHash":"4448846b3eb3bbe78f7d5fa4190fe34e385c65d8436914d46fda95094874c80e"}
 *
 * Go source:
 * func (p *checkerPool) GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
 * 	if file != nil {
 * 		return p.getCheckerForFileExclusive(ctx, file)
 * 	}
 * 	p.createCheckers()
 * 	c := p.checkers[0]
 * 	p.locks[0].Lock()
 * 	return c, sync.OnceFunc(func() {
 * 		p.locks[0].Unlock()
 * 	})
 * }
 */
export function checkerPool_GetChecker(receiver: GoPtr<checkerPool>, ctx: GoInterface<Context>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] {
  if (file !== undefined) {
    return checkerPool_getCheckerForFileExclusive(receiver, ctx, file);
  }
  checkerPool_createCheckers(receiver);
  const c = GoSliceLoad(receiver!.checkers, 0, GoPointerValueOps<Checker>());
  GoSliceLoad(receiver!.locks, 0, GoPointerValueOps<Mutex>())!.Lock();
  return [c, OnceFunc((): void => {
    GoSliceLoad(receiver!.locks, 0, GoPointerValueOps<Mutex>())!.Unlock();
  })];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.getCheckerForFileNonExclusive","kind":"method","status":"implemented","sigHash":"dd1ce9653bbe4dc2e987bbd576c822b55735128e64e94ef9608c48618ee21c6d"}
 *
 * Go source:
 * func (p *checkerPool) getCheckerForFileNonExclusive(file *ast.SourceFile) (*checker.Checker, func()) {
 * 	p.createCheckers()
 * 	return p.fileAssociations[file], noop
 * }
 */
export function checkerPool_getCheckerForFileNonExclusive(receiver: GoPtr<checkerPool>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] {
  checkerPool_createCheckers(receiver);
  return [receiver!.fileAssociations.get(file), noop];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.getCheckerForFileExclusive","kind":"method","status":"implemented","sigHash":"83eebee60ea64c4c19a3821bc9da72d2850e90e1d8433511273e446dabbd729b"}
 *
 * Go source:
 * func (p *checkerPool) getCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
 * 	p.createCheckers()
 * 	c := p.fileAssociations[file]
 * 	idx := slices.Index(p.checkers, c)
 * 	p.locks[idx].Lock()
 * 	return c, sync.OnceFunc(func() {
 * 		p.locks[idx].Unlock()
 * 	})
 * }
 */
export function checkerPool_getCheckerForFileExclusive(receiver: GoPtr<checkerPool>, ctx: GoInterface<Context>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] {
  checkerPool_createCheckers(receiver);
  const c = receiver!.fileAssociations.get(file);
  const idx = Index(receiver!.checkers, c, GoEqualStrict);
  GoSliceLoad(receiver!.locks, idx, GoPointerValueOps<Mutex>())!.Lock();
  return [c, OnceFunc((): void => {
    GoSliceLoad(receiver!.locks, idx, GoPointerValueOps<Mutex>())!.Unlock();
  })];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.getCheckerNonExclusive","kind":"method","status":"implemented","sigHash":"49c1aecdd6e2ac4d217db89425016133a69dab5d2a9b115be2b2be724449248c"}
 *
 * Go source:
 * func (p *checkerPool) getCheckerNonExclusive() (*checker.Checker, func()) {
 * 	p.createCheckers()
 * 	return p.checkers[0], noop
 * }
 */
export function checkerPool_getCheckerNonExclusive(receiver: GoPtr<checkerPool>): [GoPtr<Checker>, GoFunc<() => void>] {
  checkerPool_createCheckers(receiver);
  return [GoSliceLoad(receiver!.checkers, 0, GoPointerValueOps<Checker>()), noop];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.createCheckers","kind":"method","status":"implemented","sigHash":"19230b9f77ae2328d885f0532415a4cffa41067f50bf4e1450779f8f28f22c43"}
 *
 * Go source:
 * func (p *checkerPool) createCheckers() {
 * 	p.createCheckersOnce.Do(func() {
 * 		checkerCount := len(p.checkers)
 * 		wg := core.NewWorkGroup(p.program.SingleThreaded())
 * 		for i := range checkerCount {
 * 			wg.Queue(func() {
 * 				var tracer *checker.Tracer
 * 				if p.tracing != nil {
 * 					tracer = checker.NewTracer(p.tracing, i)
 * 				}
 * 				p.checkers[i], p.locks[i] = checker.NewChecker(p.program, tracer)
 * 			})
 * 		}
 * 
 * 		wg.RunAndWait()
 * 
 * 		p.fileAssociations = make(map[*ast.SourceFile]*checker.Checker, len(p.program.files))
 * 		for i, file := range p.program.files {
 * 			p.fileAssociations[file] = p.checkers[i%checkerCount]
 * 		}
 * 	})
 * }
 */
export function checkerPool_createCheckers(receiver: GoPtr<checkerPool>): void {
  receiver!.createCheckersOnce.Do((): void => {
    const checkerCount = receiver!.checkers.length;
    const wg = NewWorkGroup(Program_SingleThreaded(receiver!.program));
    for (let i = 0; i < checkerCount; i++) {
      const idx = i;
      wg!.Queue((): void => {
        let tracer = undefined;
        if (receiver!.tracing !== undefined) {
          tracer = NewTracer(receiver!.tracing, idx as int);
        }
        const [c, lock] = NewChecker(Program_as_checker_Program(receiver!.program), tracer);
        GoSliceStore(receiver!.checkers, idx, c, GoPointerValueOps<Checker>());
        GoSliceStore(receiver!.locks, idx, lock, GoPointerValueOps<Mutex>());
      });
    }
    wg!.RunAndWait();
    receiver!.fileAssociations = new globalThis.Map<GoPtr<SourceFile>, GoPtr<Checker>>();
    const files = receiver!.program!.__tsgoEmbedded0!.files;
    for (let i = 0; i < files.length; i++) {
      receiver!.fileAssociations.set(GoSliceLoad(files, i, GoPointerValueOps<SourceFile>()), GoSliceLoad(receiver!.checkers, i % checkerCount, GoPointerValueOps<Checker>()));
    }
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.forEachCheckerParallel","kind":"method","status":"implemented","sigHash":"8f8a04762abf015ba25610ac90f2714fbf38e8bba755fc7f1c43d08369e56793"}
 *
 * Go source:
 * func (p *checkerPool) forEachCheckerParallel(cb func(idx int, c *checker.Checker)) {
 * 	p.createCheckers()
 * 	wg := core.NewWorkGroup(p.program.SingleThreaded())
 * 	for idx, checker := range p.checkers {
 * 		wg.Queue(func() {
 * 			p.locks[idx].Lock()
 * 			defer p.locks[idx].Unlock()
 * 			cb(idx, checker)
 * 		})
 * 	}
 * 	wg.RunAndWait()
 * }
 */
export function checkerPool_forEachCheckerParallel(receiver: GoPtr<checkerPool>, cb: GoFunc<(idx: int, c: GoPtr<Checker>) => void>): void {
  checkerPool_createCheckers(receiver);
  const wg = NewWorkGroup(Program_SingleThreaded(receiver!.program));
  for (let idx = 0; idx < receiver!.checkers.length; idx++) {
    const checkerIdx = idx;
    const checkerVal = GoSliceLoad(receiver!.checkers, idx, GoPointerValueOps<Checker>());
    wg!.Queue((): void => {
      GoSliceLoad(receiver!.locks, checkerIdx, GoPointerValueOps<Mutex>())!.Lock();
      try {
        cb!(checkerIdx as int, checkerVal);
      } finally {
        GoSliceLoad(receiver!.locks, checkerIdx, GoPointerValueOps<Mutex>())!.Unlock();
      }
    });
  }
  wg!.RunAndWait();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.GetGlobalDiagnostics","kind":"method","status":"implemented","sigHash":"410fa0340cbce64a38248739a4536a44f70f45c4d9210e984dc35a650a1b4bd6"}
 *
 * Go source:
 * func (p *checkerPool) GetGlobalDiagnostics() []*ast.Diagnostic {
 * 	p.createCheckers()
 * 	globalDiagnostics := make([][]*ast.Diagnostic, len(p.checkers))
 * 	p.forEachCheckerParallel(func(idx int, checker *checker.Checker) {
 * 		globalDiagnostics[idx] = checker.GetGlobalDiagnostics()
 * 	})
 * 	return SortAndDeduplicateDiagnostics(slices.Concat(globalDiagnostics...))
 * }
 */
export function checkerPool_GetGlobalDiagnostics(receiver: GoPtr<checkerPool>): GoSlice<GoPtr<Diagnostic>> {
  checkerPool_createCheckers(receiver);
  const globalDiagnostics: GoSlice<GoSlice<GoPtr<Diagnostic>>> = new globalThis.Array(receiver!.checkers.length).fill([]);
  checkerPool_forEachCheckerParallel(receiver, (idx: int, checker: GoPtr<Checker>): void => {
    GoSliceStore(globalDiagnostics, idx, Checker_GetGlobalDiagnostics(checker), GoSliceValueOps<GoPtr<Diagnostic>>());
  });
  return SortAndDeduplicateDiagnostics(Concat(...globalDiagnostics));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::method::checkerPool.forEachCheckerGroupDo","kind":"method","status":"implemented","sigHash":"f97935909deaee1ef26aff7ac5bca0cc97dee7075d52169b0581ac7d8eeb5eec"}
 *
 * Go source:
 * func (p *checkerPool) forEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
 * 	p.createCheckers()
 * 
 * 	checkerCount := len(p.checkers)
 * 	wg := core.NewWorkGroup(singleThreaded)
 * 	for checkerIdx := range checkerCount {
 * 		wg.Queue(func() {
 * 			p.locks[checkerIdx].Lock()
 * 			defer p.locks[checkerIdx].Unlock()
 * 			for i, file := range files {
 * 				if checker := p.checkers[checkerIdx]; checker == p.fileAssociations[file] {
 * 					cb(checker, i, file)
 * 				}
 * 			}
 * 		})
 * 	}
 * 	wg.RunAndWait()
 * }
 */
export function checkerPool_forEachCheckerGroupDo(receiver: GoPtr<checkerPool>, ctx: GoInterface<Context>, files: GoSlice<GoPtr<SourceFile>>, singleThreaded: bool, cb: GoFunc<(c: GoPtr<Checker>, fileIndex: int, file: GoPtr<SourceFile>) => void>): void {
  checkerPool_createCheckers(receiver);
  const checkerCount = receiver!.checkers.length;
  const wg = NewWorkGroup(singleThreaded);
  for (let checkerIdx = 0; checkerIdx < checkerCount; checkerIdx++) {
    const ci = checkerIdx;
    wg!.Queue((): void => {
      GoSliceLoad(receiver!.locks, ci, GoPointerValueOps<Mutex>())!.Lock();
      try {
        for (let i = 0; i < files.length; i++) {
          const file = GoSliceLoad(files, i, GoPointerValueOps<SourceFile>());
          const checker = GoSliceLoad(receiver!.checkers, ci, GoPointerValueOps<Checker>());
          if (checker === receiver!.fileAssociations.get(file)) {
            cb!(checker, i as int, file);
          }
        }
      } finally {
        GoSliceLoad(receiver!.locks, ci, GoPointerValueOps<Mutex>())!.Unlock();
      }
    });
  }
  wg!.RunAndWait();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/checkerpool.go::func::noop","kind":"func","status":"implemented","sigHash":"6be010a04bb0d20312c767db86bb1c06ec0eae1e2858ba2d9aaba7aae566927f"}
 *
 * Go source:
 * func noop() {}
 */
export function noop(): void {}
