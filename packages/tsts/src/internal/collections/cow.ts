import type { bool } from "../../go/scalars.js";
import type { GoComparable, GoMap, GoMapKeyDescriptor, GoPtr, GoZeroFactory } from "../../go/compat.js";
import { GoMapIsNil, GoMapMake } from "../../go/compat.js";
import * as maps from "../../go/maps.js";

import type { GoFunc } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::type::CopyOnWriteMap","kind":"type","status":"implemented","sigHash":"03b1be1ac4b9a5a1409fe9912998e5fd6ae9e9c521fb413c59dfb750753eeb50"}
 *
 * Go source:
 * CopyOnWriteMap[K comparable, V any] struct {
 * 	m     map[K]V
 * 	owned bool
 * }
 *
 * The zero value is an empty map ready to use (m nil/undefined, owned false).
 */
export interface CopyOnWriteMap<K extends GoComparable, V> {
  m: GoMap<K, V>;
  owned: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Get","kind":"method","status":"implemented","sigHash":"524fff945dd4c8c999c50f30588706af0cce65c8fc0a20eb0c44639bf22c09f9"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic map lookup receives the exact static zero-value constructor for its missing-result path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"}]}
 *
 * Go source:
 * func (c *CopyOnWriteMap[K, V]) Get(k K) (V, bool) {
 * 	v, ok := c.m[k]
 * 	return v, ok
 * }
 */
export function CopyOnWriteMap_Get<K extends GoComparable, V>(receiver: GoPtr<CopyOnWriteMap<K, V>>, k: K, zeroValue: GoZeroFactory<V>): [V, bool] {
  const ok = receiver!.m?.has(k) ?? false;
  return [ok ? receiver!.m.get(k)! : zeroValue(), ok];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Has","kind":"method","status":"implemented","sigHash":"6eaf18f414abd76a374cb9e898eb81fb5a31c208e5813f1225a9a60c1df90792"}
 *
 * Go source:
 * func (c *CopyOnWriteMap[K, V]) Has(k K) bool {
 * 	_, ok := c.m[k]
 * 	return ok
 * }
 */
export function CopyOnWriteMap_Has<K extends GoComparable, V>(receiver: GoPtr<CopyOnWriteMap<K, V>>, k: K): bool {
  return (receiver!.m?.has(k) ?? false) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Set","kind":"method","status":"implemented","sigHash":"788a0a7860b47d62f6567180f5ec5bbc43a0f84224d416fa3e779ce14061cde8"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic copy-on-write mutation forwards the exact static Go map-key descriptor to backing-map allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (c *CopyOnWriteMap[K, V]) Set(k K, v V) {
 * 	c.ensureOwned()
 * 	c.m[k] = v
 * }
 */
export function CopyOnWriteMap_Set<K extends GoComparable, V>(receiver: GoPtr<CopyOnWriteMap<K, V>>, k: K, v: V, keyDescriptor: GoMapKeyDescriptor<K>): void {
  CopyOnWriteMap_ensureOwned(receiver, keyDescriptor);
  receiver!.m!.set(k, v);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.ensureOwned","kind":"method","status":"implemented","sigHash":"d53a59d9f48f96fc0293e6071a317bc46d984515d43fb60a1cd92e23e912f30b"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic copy-on-write backing allocation receives the exact static Go map-key descriptor.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (c *CopyOnWriteMap[K, V]) ensureOwned() {
 * 	if c.owned {
 * 		return
 * 	}
 * 	if c.m == nil {
 * 		c.m = make(map[K]V)
 * 	} else {
 * 		c.m = maps.Clone(c.m)
 * 	}
 * 	c.owned = true
 * }
 */
export function CopyOnWriteMap_ensureOwned<K extends GoComparable, V>(receiver: GoPtr<CopyOnWriteMap<K, V>>, keyDescriptor: GoMapKeyDescriptor<K>): void {
  if (receiver!.owned) {
    return;
  }
  if (GoMapIsNil(receiver!.m)) {
    receiver!.m = GoMapMake<K, V>(keyDescriptor);
  } else {
    receiver!.m = maps.Clone(receiver!.m, keyDescriptor);
  }
  receiver!.owned = true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.EnterScope","kind":"method","status":"implemented","sigHash":"0e626cc295bab1e88b5a443ca42e56195d57fdd88edc8b15de2425578f233094"}
 *
 * Go source:
 * func (c *CopyOnWriteMap[K, V]) EnterScope() func() {
 * 	saved := *c
 * 	c.owned = false
 * 	return func() { *c = saved }
 * }
 */
export function CopyOnWriteMap_EnterScope<K extends GoComparable, V>(receiver: GoPtr<CopyOnWriteMap<K, V>>): GoFunc<() => void> {
  // `saved := *c` copies the struct by value (the backing-map reference and the
  // owned flag); the returned closure restores both via `*c = saved`.
  const saved = { m: receiver!.m, owned: receiver!.owned };
  receiver!.owned = false as bool;
  return () => {
    receiver!.m = saved.m;
    receiver!.owned = saved.owned;
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::type::CopyOnWriteSet","kind":"type","status":"implemented","sigHash":"b0aba1abc891897fdc86efb41a2c2fcb62d6b401ebe90b7c5b91b769fb7c2924"}
 *
 * Go source:
 * CopyOnWriteSet[K comparable] struct {
 * 	m CopyOnWriteMap[K, struct{}]
 * }
 */
export interface CopyOnWriteSet<K extends GoComparable> {
  m: CopyOnWriteMap<K, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.Has","kind":"method","status":"implemented","sigHash":"ccd5e875100b02049c0f1acefd82bf09eb4579fbf7ba588da0f2c1dff071fc93"}
 *
 * Go source:
 * func (c *CopyOnWriteSet[K]) Has(k K) bool {
 * 	_, ok := c.m.Get(k)
 * 	return ok
 * }
 */
export function CopyOnWriteSet_Has<K extends GoComparable>(receiver: GoPtr<CopyOnWriteSet<K>>, k: K): bool {
  return CopyOnWriteMap_Has(receiver!.m, k);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.Add","kind":"method","status":"implemented","sigHash":"350bee723194f4d1bd2c390f4aec3a6ac49d7272d2e35d6228e138ffb59ba1b0"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic copy-on-write set mutation forwards the exact static Go map-key descriptor to backing-map allocation.","runtimeDictionaries":[{"kind":"map-key","parameter":"keyDescriptor","typeParameter":"K"}]}
 *
 * Go source:
 * func (c *CopyOnWriteSet[K]) Add(k K) {
 * 	c.m.Set(k, struct{}{})
 * }
 */
export function CopyOnWriteSet_Add<K extends GoComparable>(receiver: GoPtr<CopyOnWriteSet<K>>, k: K, keyDescriptor: GoMapKeyDescriptor<K>): void {
  CopyOnWriteMap_Set(receiver!.m, k, {}, keyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.EnterScope","kind":"method","status":"implemented","sigHash":"8fc81561ca0fca9e2025227618daab8802ee8dfb06edb111cc823f869d159591"}
 *
 * Go source:
 * func (c *CopyOnWriteSet[K]) EnterScope() func() {
 * 	return c.m.EnterScope()
 * }
 */
export function CopyOnWriteSet_EnterScope<K extends GoComparable>(receiver: GoPtr<CopyOnWriteSet<K>>): GoFunc<() => void> {
  return CopyOnWriteMap_EnterScope(receiver!.m);
}
