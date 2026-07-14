import type { bool } from "../../go/scalars.js";
import type { GoComparable, GoMap, GoMapKeyDescriptor, GoPtr, GoZeroFactory } from "../../go/compat.js";
import { GoMapIsNil, GoMapMake } from "../../go/compat.js";
import * as maps from "../../go/maps.js";

import type { GoFunc } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::type::CopyOnWriteMap","kind":"type","status":"implemented","sigHash":"8b79aaca4698ef01fe0843f83d39777eddcc15b867531b8d7fe3ef9356ccbc3b"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Get","kind":"method","status":"implemented","sigHash":"9569ee5ad3d4a7b603eee7142535eb6c0798304bace340ec8e688d284fe6fd49"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Has","kind":"method","status":"implemented","sigHash":"0494cab7edc9b9a2d64f484d6618632c04a698ffa230e255e689dbec507347c6"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.Set","kind":"method","status":"implemented","sigHash":"90318234f568e569e7ad25e317966379b6495024cd1a8854ff10c16a1ad872c8"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteMap.EnterScope","kind":"method","status":"implemented","sigHash":"6e93ea40ddc85253909a1232cfa7b97ca91e8230c9ec2c790fe8c0d0b6c29972"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::type::CopyOnWriteSet","kind":"type","status":"implemented","sigHash":"bb3accac8f936695f4aa2a6788fbc246b4384623058d0c8b00c7b58099b787e9"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.Has","kind":"method","status":"implemented","sigHash":"8ad62e35c67e49569a594729230943a5399a86e69cafc2230c7304158dc5ab57"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.Add","kind":"method","status":"implemented","sigHash":"0f27af06c9c0b86a45804f9e436c9d837aa04ca5fb00cf6519ab3f8d4c4b24fa"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/cow.go::method::CopyOnWriteSet.EnterScope","kind":"method","status":"implemented","sigHash":"4381319ca699b0591c398fb7638c780ff9dec4766c3a391cb73575502502791c"}
 *
 * Go source:
 * func (c *CopyOnWriteSet[K]) EnterScope() func() {
 * 	return c.m.EnterScope()
 * }
 */
export function CopyOnWriteSet_EnterScope<K extends GoComparable>(receiver: GoPtr<CopyOnWriteSet<K>>): GoFunc<() => void> {
  return CopyOnWriteMap_EnterScope(receiver!.m);
}
