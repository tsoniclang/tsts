import type { int } from "../../go/scalars.js";
import type { Context } from "../../go/context.js";
import { WithValue } from "../../go/context.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::type::key","kind":"type","status":"implemented","sigHash":"457238a82b2258a6a7e6036f5fc2c0853063292070dbb6cb7df6d18806b64ef8"}
 *
 * Go source:
 * key int
 */
export type key = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::constGroup::requestIDKey+checkerLifetimeKey","kind":"constGroup","status":"implemented","sigHash":"46ade8dfc212ff46267ff977ca44ab1cc29820b8aae95a320e9f26c19089ae9e"}
 *
 * Go source:
 * const (
 * 	requestIDKey key = iota
 * 	checkerLifetimeKey
 * )
 */
export const requestIDKey: key = 0;
export const checkerLifetimeKey: key = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::func::WithRequestID","kind":"func","status":"implemented","sigHash":"df240214ccb9132f197cf86e4cd8da4e0fce4e91395b41cf1469c3ec9a804be1"}
 *
 * Go source:
 * func WithRequestID(ctx context.Context, id string) context.Context {
 * 	return context.WithValue(ctx, requestIDKey, id)
 * }
 */
export function WithRequestID(ctx: GoInterface<Context>, id: string): GoInterface<Context> {
  return WithValue(ctx!, requestIDKey, id);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::func::GetRequestID","kind":"func","status":"implemented","sigHash":"8d8c83a7d5b373c90328a6cfa62d2abaab2650e73dd738403cced6e577b78d0c"}
 *
 * Go source:
 * func GetRequestID(ctx context.Context) string {
 * 	if id, ok := ctx.Value(requestIDKey).(string); ok {
 * 		return id
 * 	}
 * 	return ""
 * }
 */
export function GetRequestID(ctx: GoInterface<Context>): string {
  const value = ctx!.Value(requestIDKey);
  if (typeof value === "string") {
    const id = value;
    return id;
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::type::CheckerLifetime","kind":"type","status":"implemented","sigHash":"6a7508236021b100a003502379c8497cb12f8bb76f1a0cbc57e652f6dacd6dc2"}
 *
 * Go source:
 * CheckerLifetime int
 */
export type CheckerLifetime = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::constGroup::CheckerLifetimeTemporary+CheckerLifetimeDiagnostics+CheckerLifetimeAPI","kind":"constGroup","status":"implemented","sigHash":"41e8d6843253b5f8362c56bbb7599a3a0622af3e36c745ac792968b3fe277d6a"}
 *
 * Go source:
 * const (
 * 	CheckerLifetimeTemporary CheckerLifetime = iota
 * 	CheckerLifetimeDiagnostics
 * 	CheckerLifetimeAPI
 * )
 */
export const CheckerLifetimeTemporary: CheckerLifetime = 0;
export const CheckerLifetimeDiagnostics: CheckerLifetime = 1;
export const CheckerLifetimeAPI: CheckerLifetime = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::func::WithCheckerLifetime","kind":"func","status":"implemented","sigHash":"063f69765690c419e88cdaf04a8a4192a8ef4ad68bccf466eeba2e46ffe65037"}
 *
 * Go source:
 * func WithCheckerLifetime(ctx context.Context, lifetime CheckerLifetime) context.Context {
 * 	return context.WithValue(ctx, checkerLifetimeKey, lifetime)
 * }
 */
export function WithCheckerLifetime(ctx: GoInterface<Context>, lifetime: CheckerLifetime): GoInterface<Context> {
  return WithValue(ctx!, checkerLifetimeKey, lifetime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/context.go::func::GetCheckerLifetime","kind":"func","status":"implemented","sigHash":"b2470e28f8488df6262b29bfccebaea0d7ed2eef207d9dc2a61ecd4cbe80f0c6"}
 *
 * Go source:
 * func GetCheckerLifetime(ctx context.Context) CheckerLifetime {
 * 	if lifetime, ok := ctx.Value(checkerLifetimeKey).(CheckerLifetime); ok {
 * 		return lifetime
 * 	}
 * 	return CheckerLifetimeTemporary
 * }
 */
export function GetCheckerLifetime(ctx: GoInterface<Context>): CheckerLifetime {
  const value = ctx!.Value(checkerLifetimeKey);
  if (typeof value === "number") {
    const lifetime = value;
    return lifetime;
  }
  return CheckerLifetimeTemporary;
}
