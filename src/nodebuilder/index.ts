/**
 * Node builder interfaces and flags.
 *
 * Port of TS-Go internal/nodebuilder/. The concrete implementations live
 * with the checker (since they need type-system access) and aren't yet
 * ported; the flag definitions and SymbolTracker interface are here as
 * the contract.
 */

export * from "./types.js";
