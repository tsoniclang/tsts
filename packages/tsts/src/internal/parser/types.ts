import type { uint } from "../../go/scalars.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/types.go::type::ParseFlags","kind":"type","status":"implemented","sigHash":"ec2c138c6126fd16db739ef0b467090e9d970a145b42a30cb3dfebf6b442776b"}
 *
 * Go source:
 * ParseFlags uint32
 */
export type ParseFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/types.go::constGroup::ParseFlagsNone+ParseFlagsYield+ParseFlagsAwait+ParseFlagsType+ParseFlagsIgnoreMissingOpenBrace+ParseFlagsJSDoc","kind":"constGroup","status":"implemented","sigHash":"45771fba15d6b3d1189c5ed5b2cbf2b5e091c72f7397839c4b7819ac00c3a755"}
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
