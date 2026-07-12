import type { uint } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/types.go::type::ParseFlags","kind":"type","status":"implemented","sigHash":"351ebf721cd2754016dc44fcbdf16dc89d33b4fc6a92eed1f9db4696eed47fcd"}
 *
 * Go source:
 * ParseFlags uint32
 */
export type ParseFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/types.go::constGroup::ParseFlagsNone+ParseFlagsYield+ParseFlagsAwait+ParseFlagsType+ParseFlagsIgnoreMissingOpenBrace+ParseFlagsJSDoc","kind":"constGroup","status":"implemented","sigHash":"c1c0a30e1330ab6084823a9cec03c70fecd0e68844959d06e1c3bb28f6b7c3c3"}
 *
 * Go source:
 * const (
 * 	ParseFlagsNone                   ParseFlags = 0
 * 	ParseFlagsYield                  ParseFlags = 1 << 0
 * 	ParseFlagsAwait                  ParseFlags = 1 << 1
 * 	ParseFlagsType                   ParseFlags = 1 << 2
 * 	ParseFlagsIgnoreMissingOpenBrace ParseFlags = 1 << 4
 * 	ParseFlagsJSDoc                  ParseFlags = 1 << 5
 * )
 */
export const ParseFlagsNone: ParseFlags = 0;
export const ParseFlagsYield: ParseFlags = 1 << 0;
export const ParseFlagsAwait: ParseFlags = 1 << 1;
export const ParseFlagsType: ParseFlags = 1 << 2;
export const ParseFlagsIgnoreMissingOpenBrace: ParseFlags = 1 << 4;
export const ParseFlagsJSDoc: ParseFlags = 1 << 5;
