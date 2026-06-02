/**
 * Extension host public surface.
 *
 * Generic, consumer-agnostic extension infrastructure: fact keys, the sidecar
 * fact store, lifecycle contexts, the checker facade, import recognition,
 * deterministic ordering, and the dispatch host. TSTS core never depends on any
 * concrete extension; this barrel is the only entry consumers and the (future)
 * program wiring import from.
 */

export * from "./factKeys.js";
export * from "./facts.js";
export * from "./checkerFacade.js";
export * from "./contexts.js";
export * from "./imports.js";
export * from "./ordering.js";
export * from "./host.js";
