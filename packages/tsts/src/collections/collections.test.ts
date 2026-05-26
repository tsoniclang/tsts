import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { CopyOnWriteMap, CopyOnWriteSet, MultiMap } from "./index.js";

export class MultiMapTests {
  add_get_has(): void {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.add("b", 3);
    Assert.Equal<readonly number[]>([1, 2], [...m.get("a")]);
    Assert.Equal<readonly number[]>([3], [...m.get("b")]);
    Assert.Equal<readonly number[]>([], [...m.get("c")]);
    Assert.True(m.has("a"));
    Assert.False(m.has("c"));
    Assert.Equal(2, m.size);
  }

  remove_one_occurrence_then_key_gone(): void {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.remove("a", 1);
    Assert.Equal<readonly number[]>([2], [...m.get("a")]);
    m.remove("a", 2);
    Assert.False(m.has("a"));
  }

  remove_all(): void {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.removeAll("a");
    Assert.False(m.has("a"));
  }

  group_by_factory(): void {
    const items = [1, 2, 3, 4, 5, 6];
    const m = MultiMap.groupBy(items, (n) => (n % 2 === 0 ? "even" : "odd"));
    Assert.Equal<readonly number[]>([2, 4, 6], [...m.get("even")]);
    Assert.Equal<readonly number[]>([1, 3, 5], [...m.get("odd")]);
  }

  clear(): void {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.clear();
    Assert.Equal(0, m.size);
  }
}

export class CopyOnWriteMapTests {
  basic_get_set_has(): void {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);
    Assert.Equal(1, m.get("a"));
    Assert.True(m.has("a"));
    Assert.False(m.has("b"));
  }

  nested_scope_isolates_writes(): void {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);

    const restore = m.enterScope();
    m.set("a", 99);
    m.set("b", 2);
    Assert.Equal(99, m.get("a"));
    Assert.Equal(2, m.get("b"));

    restore();
    Assert.Equal(1, m.get("a"));
    Assert.False(m.has("b"));
  }

  nested_scope_read_only_reuse_if_no_writes(): void {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);

    const restore = m.enterScope();
    Assert.Equal(1, m.get("a"));
    restore();

    Assert.Equal(1, m.get("a"));
  }
}

export class CopyOnWriteSetTests {
  basic(): void {
    const s = new CopyOnWriteSet<string>();
    s.add("x");
    Assert.True(s.has("x"));
    Assert.False(s.has("y"));
  }

  nested_scope_isolation(): void {
    const s = new CopyOnWriteSet<string>();
    s.add("a");

    const restore = s.enterScope();
    s.add("b");
    Assert.True(s.has("b"));

    restore();
    Assert.True(s.has("a"));
    Assert.False(s.has("b"));
  }
}

A<MultiMapTests>().method((t) => t.add_get_has).add(FactAttribute);
A<MultiMapTests>().method((t) => t.remove_one_occurrence_then_key_gone).add(FactAttribute);
A<MultiMapTests>().method((t) => t.remove_all).add(FactAttribute);
A<MultiMapTests>().method((t) => t.group_by_factory).add(FactAttribute);
A<MultiMapTests>().method((t) => t.clear).add(FactAttribute);
A<CopyOnWriteMapTests>().method((t) => t.basic_get_set_has).add(FactAttribute);
A<CopyOnWriteMapTests>().method((t) => t.nested_scope_isolates_writes).add(FactAttribute);
A<CopyOnWriteMapTests>().method((t) => t.nested_scope_read_only_reuse_if_no_writes).add(FactAttribute);
A<CopyOnWriteSetTests>().method((t) => t.basic).add(FactAttribute);
A<CopyOnWriteSetTests>().method((t) => t.nested_scope_isolation).add(FactAttribute);
