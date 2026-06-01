export type QueueTask<TContext> = (context: TContext) => void | Promise<void>;

export interface CancellationContext {
  readonly cancelled?: boolean;
  readonly signal?: AbortSignal;
}

export class Queue<TContext extends CancellationContext = CancellationContext> {
  private closed = false;
  private readonly active = new Set<Promise<void>>();

  enqueue(context: TContext, fn: QueueTask<TContext>): void {
    if (this.closed || context.cancelled === true || context.signal?.aborted === true) return;
    const task = Promise.resolve().then(async () => {
      if (context.cancelled === true || context.signal?.aborted === true) return;
      await fn(context);
    });
    this.active.add(task);
    task.finally(() => this.active.delete(task)).catch(() => undefined);
  }

  async wait(): Promise<void> {
    while (this.active.size > 0) {
      await Promise.all([...this.active]);
    }
  }

  close(): void {
    this.closed = true;
  }
}

export function newQueue<TContext extends CancellationContext = CancellationContext>(): Queue<TContext> {
  return new Queue<TContext>();
}
