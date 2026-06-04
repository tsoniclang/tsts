import type { int, uint } from "@tsonic/core/types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitflags.go::type::EmitFlags","kind":"type","status":"stub","sigHash":"ee59f590d3720aa14847f8b36b602f63cf53c9ed0889cdb41f1d322c3b09de2b","bodyHash":"87bef90f852c48705ef5683f813808b557f897cd4dd50b366a8940f6053fa84d"}
 *
 * Go source:
 * EmitFlags uint32
 */
export type EmitFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitflags.go::constGroup::EFSingleLine+EFMultiLine+EFNoLeadingSourceMap+EFNoTrailingSourceMap+EFNoNestedSourceMaps+EFNoTokenLeadingSourceMaps+EFNoTokenTrailingSourceMaps+EFNoLeadingComments+EFNoTrailingComments+EFNoNestedComments+EFHelperName+EFExportName+EFLocalName+EFIndented+EFNoIndentation+EFReuseTempVariableScope+EFCustomPrologue+EFNoAsciiEscaping+EFExternalHelpers+EFStartOnNewLine+EFIndirectCall+EFAsyncFunctionBody+EFNoLexicalArguments+EFTransformPrivateStaticElements","kind":"constGroup","status":"stub","sigHash":"d883d0e455170d9fcabc38558346c51def111f63b842153035815c1bd3d20249","bodyHash":"27180306b35c61aab493d2d919d8daa465b469637ff9f9d99f3d9a94ebf75180"}
 *
 * Go source:
 * const (
 * 	EFSingleLine                     EmitFlags = 1 << iota // The contents of this node should be emitted on a single line.
 * 	EFMultiLine                                            // The contents of this node should be emitted on multiple lines.
 * 	EFNoLeadingSourceMap                                   // Do not emit a leading source map location for this node.
 * 	EFNoTrailingSourceMap                                  // Do not emit a trailing source map location for this node.
 * 	EFNoNestedSourceMaps                                   // Do not emit source map locations for children of this node.
 * 	EFNoTokenLeadingSourceMaps                             // Do not emit leading source map location for token nodes.
 * 	EFNoTokenTrailingSourceMaps                            // Do not emit trailing source map location for token nodes.
 * 	EFNoLeadingComments                                    // Do not emit leading comments for this node.
 * 	EFNoTrailingComments                                   // Do not emit trailing comments for this node.
 * 	EFNoNestedComments                                     // Do not emit nested comments for children of this node.
 * 	EFHelperName                                           // The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
 * 	EFExportName                                           // Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
 * 	EFLocalName                                            // Ensure an export prefix is not added for an identifier that points to an exported declaration.
 * 	EFIndented                                             // Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
 * 	EFNoIndentation                                        // Do not indent the node.
 * 	EFReuseTempVariableScope                               // Reuse the existing temp variable scope during emit.
 * 	EFCustomPrologue                                       // Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
 * 	EFNoAsciiEscaping                                      // When synthesizing nodes that lack an original node or textSourceNode, we want to write the text on the node with ASCII escaping substitutions.
 * 	EFExternalHelpers                                      // This source file has external helpers
 * 	EFStartOnNewLine                                       // Start this node on a new line
 * 	EFIndirectCall                                         // Emit CallExpression as an indirect call: `(0, f)()`
 * 	EFAsyncFunctionBody                                    // The node was originally an async function body.
 * 	EFNoLexicalArguments                                   // Do not capture `arguments` for this arrow function. Set on arrows lowered from class static blocks, where `arguments` is an error; preserves Strada's emit behavior.
 * 	EFTransformPrivateStaticElements                       // Indicates static private elements in a file or class should be transformed regardless of --target (used by esDecorators transform).
 * )
 */
export const EFSingleLine: EmitFlags = undefined as never;
export const EFMultiLine: EmitFlags = undefined as never;
export const EFNoLeadingSourceMap: EmitFlags = undefined as never;
export const EFNoTrailingSourceMap: EmitFlags = undefined as never;
export const EFNoNestedSourceMaps: EmitFlags = undefined as never;
export const EFNoTokenLeadingSourceMaps: EmitFlags = undefined as never;
export const EFNoTokenTrailingSourceMaps: EmitFlags = undefined as never;
export const EFNoLeadingComments: EmitFlags = undefined as never;
export const EFNoTrailingComments: EmitFlags = undefined as never;
export const EFNoNestedComments: EmitFlags = undefined as never;
export const EFHelperName: EmitFlags = undefined as never;
export const EFExportName: EmitFlags = undefined as never;
export const EFLocalName: EmitFlags = undefined as never;
export const EFIndented: EmitFlags = undefined as never;
export const EFNoIndentation: EmitFlags = undefined as never;
export const EFReuseTempVariableScope: EmitFlags = undefined as never;
export const EFCustomPrologue: EmitFlags = undefined as never;
export const EFNoAsciiEscaping: EmitFlags = undefined as never;
export const EFExternalHelpers: EmitFlags = undefined as never;
export const EFStartOnNewLine: EmitFlags = undefined as never;
export const EFIndirectCall: EmitFlags = undefined as never;
export const EFAsyncFunctionBody: EmitFlags = undefined as never;
export const EFNoLexicalArguments: EmitFlags = undefined as never;
export const EFTransformPrivateStaticElements: EmitFlags = undefined as never;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/emitflags.go::constGroup::EFNone+EFNoSourceMap+EFNoTokenSourceMaps+EFNoComments","kind":"constGroup","status":"stub","sigHash":"a700daeebdaad66b66ac5279de5363afb1864ca17d4a4095fc3bbd44de0237f2","bodyHash":"f465f44a026a29c9b31524728c12067da13ae28a8485b93d6feef87df4a0f9dd"}
 *
 * Go source:
 * const (
 * 	EFNone              EmitFlags = 0
 * 	EFNoSourceMap                 = EFNoLeadingSourceMap | EFNoTrailingSourceMap             // Do not emit a source map location for this node.
 * 	EFNoTokenSourceMaps           = EFNoTokenLeadingSourceMaps | EFNoTokenTrailingSourceMaps // Do not emit source map locations for tokens of this node.
 * 	EFNoComments                  = EFNoLeadingComments | EFNoTrailingComments               // Do not emit comments for this node.
 * )
 */
export const EFNone: EmitFlags = undefined as never;
export const EFNoSourceMap: int = undefined as never;
export const EFNoTokenSourceMaps: int = undefined as never;
export const EFNoComments: int = undefined as never;
