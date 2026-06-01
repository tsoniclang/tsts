import type { Cloneable, Value } from "./interfaces.js";

export class Box<T extends Cloneable<T>> implements Value<T> {
  private readonly originalValue: T;
  private currentValue: T;
  private isDirty = false;
  private isDeleted = false;

  constructor(original: T) {
    this.originalValue = original;
    this.currentValue = original;
  }

  value(): T {
    if (this.isDeleted) throw new Error("dirty box has been deleted");
    return this.currentValue;
  }

  original(): T {
    return this.originalValue;
  }

  dirty(): boolean {
    return this.isDirty;
  }

  set(value: T): void {
    this.currentValue = value;
    this.isDeleted = false;
    this.isDirty = true;
  }

  change(apply: (value: T) => void): void {
    if (!this.isDirty) {
      this.currentValue = this.currentValue.clone();
      this.isDirty = true;
    }
    apply(this.currentValue);
  }

  changeIf(cond: (value: T) => boolean, apply: (value: T) => void): boolean {
    if (!cond(this.currentValue)) return false;
    this.change(apply);
    return true;
  }

  delete(): void {
    this.isDeleted = true;
  }

  locked(fn: (value: Value<T>) => void): void {
    fn(this);
  }

  finalize(): readonly [T, boolean] {
    return [this.value(), this.isDirty || this.isDeleted];
  }
}

export function newBox<T extends Cloneable<T>>(original: T): Box<T> {
  return new Box(original);
}
