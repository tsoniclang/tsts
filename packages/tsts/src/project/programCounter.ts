export class ProgramCounter<TProgram extends object> {
  private readonly refs = new Map<TProgram, number>();

  ref(program: TProgram): void {
    this.refs.set(program, (this.refs.get(program) ?? 0) + 1);
  }

  deref(program: TProgram): boolean {
    const count = this.refs.get(program);
    if (count === undefined) return false;
    const next = count - 1;
    if (next < 0) throw new Error("program reference count went below zero");
    if (next === 0) {
      this.refs.delete(program);
      return true;
    }
    this.refs.set(program, next);
    return false;
  }

  len(): number {
    return this.refs.size;
  }
}
