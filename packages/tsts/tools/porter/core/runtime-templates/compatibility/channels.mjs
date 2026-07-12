export const channelRuntime = `type GoChannelReceiver<T> = (value: T, ok: bool) => void;

interface GoChannelWaiter<T> {
  active: bool;
  deliver(value: T, ok: bool): bool;
}

interface GoChannelState<T> {
  capacity: number;
  queue: T[];
  waiters: GoChannelWaiter<T>[];
  closed: bool;
  zeroValue(): T;
}

export interface GoChanSelectCase {
  readonly channel: GoChan<unknown, string>;
  readonly receiver: GoChannelReceiver<unknown>;
}

const goChannelState: unique symbol = Symbol("GoChannel.state");
const goNilChannel: GoChan<unknown, string> = {};

export function GoNilChan<T, Direction extends string = "bidirectional">(): GoChan<T, Direction> {
  return goNilChannel as GoChan<T, Direction>;
}

export function GoChanIsNil<T, Direction extends string>(channel: GoChan<T, Direction>): bool {
  return (channel === goNilChannel) as bool;
}

export function MakeGoChan<T>(capacity: number, zeroValue: () => T): GoChan<T> {
  if (!Number.isSafeInteger(capacity) || capacity < 0) {
    throw new RangeError("makechan: size out of range");
  }
  return {
    [goChannelState]: {
      capacity,
      queue: [],
      waiters: [],
      closed: false,
      zeroValue,
    },
  };
}

export function GoChanAsReceive<T>(channel: GoChan<T>): GoChan<T, "receive"> {
  return channel as unknown as GoChan<T, "receive">;
}

export function GoChanAsSend<T>(channel: GoChan<T>): GoChan<T, "send"> {
  return channel as unknown as GoChan<T, "send">;
}

export function GoChanTrySend<T>(channel: GoChan<T, string>, value: T): bool {
  if (GoChanIsNil(channel)) return false as bool;
  const state = requireGoChannelState(channel);
  if (state.closed) throw new Error("send on closed channel");
  const waiter = takeGoChannelWaiter(state);
  if (waiter !== undefined) return waiter.deliver(value, true as bool);
  if (state.queue.length < state.capacity) {
    state.queue.push(value);
    return true as bool;
  }
  return false as bool;
}

export function GoChanReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): () => void {
  if (GoChanIsNil(channel)) return () => {};
  const state = requireGoChannelState(channel);
  if (goChannelReceiveReady(state)) {
    const [value, ok] = takeGoChannelReadyValue(state);
    queueMicrotask(() => receiver(value, ok));
    return () => {};
  }
  const waiter: GoChannelWaiter<T> = {
    active: true,
    deliver(value, ok) {
      queueMicrotask(() => receiver(value, ok));
      return true as bool;
    },
  };
  state.waiters.push(waiter);
  return () => { waiter.active = false; };
}

export function GoChanSelectReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): GoChanSelectCase {
  return {
    channel: channel as GoChan<unknown, string>,
    receiver: receiver as GoChannelReceiver<unknown>,
  };
}

export function GoChanSelect(cases: readonly GoChanSelectCase[]): () => void {
  const ready = [] as number[];
  for (let index = 0; index < cases.length; index++) {
    const channel = cases[index]!.channel;
    if (!GoChanIsNil(channel) && goChannelReceiveReady(requireGoChannelState(channel))) ready.push(index);
  }
  if (ready.length > 0) {
    const selectedIndex = ready.length === 1 ? ready[0]! : ready[Math.floor(Math.random() * ready.length)]!;
    const selected = cases[selectedIndex]!;
    const [value, ok] = takeGoChannelReadyValue(requireGoChannelState(selected.channel));
    queueMicrotask(() => selected.receiver(value, ok));
    return () => {};
  }

  let active = true;
  const waiters: Array<GoChannelWaiter<unknown>> = [];
  const cancel = (): void => {
    if (!active) return;
    active = false;
    for (const waiter of waiters) waiter.active = false;
  };
  for (const selectCase of cases) {
    if (GoChanIsNil(selectCase.channel)) continue;
    const waiter: GoChannelWaiter<unknown> = {
      active: true,
      deliver(value, ok) {
        if (!active) return false as bool;
        active = false;
        for (const other of waiters) other.active = false;
        queueMicrotask(() => selectCase.receiver(value, ok));
        return true as bool;
      },
    };
    waiters.push(waiter);
    requireGoChannelState(selectCase.channel).waiters.push(waiter);
  }
  return cancel;
}

export function GoChanClose<T>(channel: GoChan<T, string>): void {
  if (GoChanIsNil(channel)) throw new Error("close of nil channel");
  const state = requireGoChannelState(channel);
  if (state.closed) throw new Error("close of closed channel");
  state.closed = true;
  while (state.queue.length > 0) {
    const waiter = takeGoChannelWaiter(state);
    if (waiter === undefined) break;
    waiter.deliver(state.queue.shift()!, true as bool);
  }
  let waiter: GoChannelWaiter<T> | undefined;
  while ((waiter = takeGoChannelWaiter(state)) !== undefined) waiter.deliver(state.zeroValue(), false as bool);
}

function requireGoChannelState<T>(channel: GoChan<T, string>): GoChannelState<T> {
  const state = channel[goChannelState];
  if (state === undefined) throw new Error("channel has no runtime state");
  return state;
}

function takeGoChannelWaiter<T>(state: GoChannelState<T>): GoChannelWaiter<T> | undefined {
  while (state.waiters.length > 0) {
    const waiter = state.waiters.shift()!;
    if (waiter.active) {
      waiter.active = false;
      return waiter;
    }
  }
  return undefined;
}

function goChannelReceiveReady<T>(state: GoChannelState<T>): bool {
  return (state.queue.length > 0 || state.closed) as bool;
}

function takeGoChannelReadyValue<T>(state: GoChannelState<T>): [T, bool] {
  if (state.queue.length > 0) return [state.queue.shift()!, true as bool];
  if (state.closed) return [state.zeroValue(), false as bool];
  throw new Error("receive from channel that is not ready");
}
`;
