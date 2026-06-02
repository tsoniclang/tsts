/**
 * Extension fact keys.
 *
 * Fact keys are typed and globally namespaced (see compiler-extension-spec.md
 * "Fact Keys"). The phantom type parameter `T` carries the value shape stored
 * under the key so consumers read facts type-safely:
 *
 *   facts.getNodeFact(node, NumericTypeFact)  // T inferred, statically visible
 *
 * The key is NOT just a string; it pairs an owning extension id with a name and
 * a human description so refactors stay safe and namespaces never collide.
 */

/**
 * A typed, namespaced handle for one kind of extension fact.
 *
 * The `_phantom` brand makes `T` load-bearing at the type level without
 * carrying any runtime value — it is never read.
 */
export interface ExtensionFactKey<T> {
  readonly extensionId: string;
  readonly name: string;
  readonly description: string;
  /** Phantom marker so `T` participates in assignability checks. Never read. */
  readonly _phantom?: (value: T) => void;
}

/**
 * Construct a fact key owned by `extensionId`.
 *
 * The returned object is a plain immutable record; identity is by reference,
 * so a key created here is the canonical handle for that fact.
 */
export function defineFactKey<T>(
  extensionId: string,
  name: string,
  description: string,
): ExtensionFactKey<T> {
  return { extensionId, name, description };
}
