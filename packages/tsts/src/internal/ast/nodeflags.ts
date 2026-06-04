import type { int, uint } from "@tsonic/core/types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/nodeflags.go::type::NodeFlags","kind":"type","status":"stub","sigHash":"1ab8cedf51e53d4d4a76535f180fa467201a4ee1d08d7a155aaeb2a90ab16ad7","bodyHash":"5197d1ac139ca86c7af2d2cefe73128e846310afb8e0533c210c8308c6d55e12"}
 *
 * Go source:
 * NodeFlags uint32
 */
export type NodeFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/ast/nodeflags.go::constGroup::NodeFlagsNone+NodeFlagsLet+NodeFlagsConst+NodeFlagsUsing+NodeFlagsReparsed+NodeFlagsSynthesized+NodeFlagsOptionalChain+NodeFlagsExportContext+NodeFlagsContainsThis+NodeFlagsHasImplicitReturn+NodeFlagsHasExplicitReturn+NodeFlagsDisallowInContext+NodeFlagsYieldContext+NodeFlagsDecoratorContext+NodeFlagsAwaitContext+NodeFlagsDisallowConditionalTypesContext+NodeFlagsThisNodeHasError+NodeFlagsJavaScriptFile+NodeFlagsThisNodeOrAnySubNodesHasError+NodeFlagsHasAsyncFunctions+NodeFlagsPossiblyContainsDynamicImport+NodeFlagsPossiblyContainsImportMeta+NodeFlagsHasJSDoc+NodeFlagsJSDoc+NodeFlagsAmbient+NodeFlagsInWithStatement+NodeFlagsJsonFile+NodeFlagsPossiblyContainsDeprecatedTag+NodeFlagsUnreachable+NodeFlagsBlockScoped+NodeFlagsConstant+NodeFlagsAwaitUsing+NodeFlagsReachabilityCheckFlags+NodeFlagsReachabilityAndEmitFlags+NodeFlagsContextFlags+NodeFlagsTypeExcludesFlags+NodeFlagsPermanentlySetIncrementalFlags+NodeFlagsIdentifierHasExtendedUnicodeEscape","kind":"constGroup","status":"stub","sigHash":"d0234342afdf1d9936c76788479c8c9262ad27533a39c6a4bb52188d435a5e19","bodyHash":"48e7bb2d2442640d317a22fb7b4312b32137ec9ae5e1c89b80134a3644c26346"}
 *
 * Go source:
 * const (
 * 	NodeFlagsNone                            NodeFlags = 0
 * 	NodeFlagsLet                             NodeFlags = 1 << 0  // Variable declaration
 * 	NodeFlagsConst                           NodeFlags = 1 << 1  // Variable declaration
 * 	NodeFlagsUsing                           NodeFlags = 1 << 2  // Variable declaration
 * 	NodeFlagsReparsed                        NodeFlags = 1 << 3  // Node was synthesized during parsing
 * 	NodeFlagsSynthesized                     NodeFlags = 1 << 4  // Node was synthesized during transformation
 * 	NodeFlagsOptionalChain                   NodeFlags = 1 << 5  // Chained MemberExpression rooted to a pseudo-OptionalExpression
 * 	NodeFlagsExportContext                   NodeFlags = 1 << 6  // Export context (initialized by binding)
 * 	NodeFlagsContainsThis                    NodeFlags = 1 << 7  // Interface contains references to "this"
 * 	NodeFlagsHasImplicitReturn               NodeFlags = 1 << 8  // If function implicitly returns on one of codepaths (initialized by binding)
 * 	NodeFlagsHasExplicitReturn               NodeFlags = 1 << 9  // If function has explicit reachable return on one of codepaths (initialized by binding)
 * 	NodeFlagsDisallowInContext               NodeFlags = 1 << 10 // If node was parsed in a context where 'in-expressions' are not allowed
 * 	NodeFlagsYieldContext                    NodeFlags = 1 << 11 // If node was parsed in the 'yield' context created when parsing a generator
 * 	NodeFlagsDecoratorContext                NodeFlags = 1 << 12 // If node was parsed as part of a decorator
 * 	NodeFlagsAwaitContext                    NodeFlags = 1 << 13 // If node was parsed in the 'await' context created when parsing an async function
 * 	NodeFlagsDisallowConditionalTypesContext NodeFlags = 1 << 14 // If node was parsed in a context where conditional types are not allowed
 * 	NodeFlagsThisNodeHasError                NodeFlags = 1 << 15 // If the parser encountered an error when parsing the code that created this node
 * 	NodeFlagsJavaScriptFile                  NodeFlags = 1 << 16 // If node was parsed in a JavaScript
 * 	NodeFlagsThisNodeOrAnySubNodesHasError   NodeFlags = 1 << 17 // If this node or any of its children had an error
 * 	NodeFlagsHasAsyncFunctions               NodeFlags = 1 << 18 // If the file has async functions (initialized by binding)
 * 	// NodeFlagsHasAggregatedChildData is deprecated. Use `subtreeFacts` instead.
 * 
 * 	// These flags will be set when the parser encounters a dynamic import expression or 'import.meta' to avoid
 * 	// walking the tree if the flags are not set. However, these flags are just a approximation
 * 	// (hence why it's named "PossiblyContainsDynamicImport") because once set, the flags never get cleared.
 * 	// During editing, if a dynamic import is removed, incremental parsing will *NOT* clear this flag.
 * 	// This means that the tree will always be traversed during module resolution, or when looking for external module indicators.
 * 	// However, the removal operation should not occur often and in the case of the
 * 	// removal, it is likely that users will add the import anyway.
 * 	// The advantage of this approach is its simplicity. For the case of batch compilation,
 * 	// we guarantee that users won't have to pay the price of walking the tree if a dynamic import isn't used.
 * 	NodeFlagsPossiblyContainsDynamicImport NodeFlags = 1 << 19
 * 	NodeFlagsPossiblyContainsImportMeta    NodeFlags = 1 << 20
 * 
 * 	NodeFlagsHasJSDoc                      NodeFlags = 1 << 21 // If node has preceding JSDoc comment(s)
 * 	NodeFlagsJSDoc                         NodeFlags = 1 << 22 // If node was parsed inside jsdoc
 * 	NodeFlagsAmbient                       NodeFlags = 1 << 23 // If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
 * 	NodeFlagsInWithStatement               NodeFlags = 1 << 24 // If any ancestor of node was the `statement` of a WithStatement (not the `expression`)
 * 	NodeFlagsJsonFile                      NodeFlags = 1 << 25 // If node was parsed in a Json
 * 	NodeFlagsPossiblyContainsDeprecatedTag NodeFlags = 1 << 26 // Set during parse if comment text contains '@deprecated'; must confirm via JSDoc lookup
 * 	NodeFlagsUnreachable                   NodeFlags = 1 << 27 // If node is unreachable according to the binder
 * 
 * 	NodeFlagsBlockScoped = NodeFlagsLet | NodeFlagsConst | NodeFlagsUsing
 * 	NodeFlagsConstant    = NodeFlagsConst | NodeFlagsUsing
 * 	NodeFlagsAwaitUsing  = NodeFlagsConst | NodeFlagsUsing // Variable declaration (NOTE: on a single node these flags would otherwise be mutually exclusive)
 * 
 * 	NodeFlagsReachabilityCheckFlags   = NodeFlagsHasImplicitReturn | NodeFlagsHasExplicitReturn
 * 	NodeFlagsReachabilityAndEmitFlags = NodeFlagsReachabilityCheckFlags | NodeFlagsHasAsyncFunctions
 * 
 * 	// Parsing context flags
 * 	NodeFlagsContextFlags NodeFlags = NodeFlagsDisallowInContext | NodeFlagsDisallowConditionalTypesContext | NodeFlagsYieldContext | NodeFlagsDecoratorContext | NodeFlagsAwaitContext | NodeFlagsJavaScriptFile | NodeFlagsInWithStatement | NodeFlagsAmbient
 * 
 * 	// Exclude these flags when parsing a Type
 * 	NodeFlagsTypeExcludesFlags NodeFlags = NodeFlagsYieldContext | NodeFlagsAwaitContext
 * 
 * 	// Represents all flags that are potentially set once and
 * 	// never cleared on SourceFiles which get re-used in between incremental parses.
 * 	// See the comment above on `PossiblyContainsDynamicImport` and `PossiblyContainsImportMeta`.
 * 	NodeFlagsPermanentlySetIncrementalFlags NodeFlags = NodeFlagsPossiblyContainsDynamicImport | NodeFlagsPossiblyContainsImportMeta
 * 
 * 	// The following flags repurpose other NodeFlags as different meanings for Identifier nodes
 * 	NodeFlagsIdentifierHasExtendedUnicodeEscape NodeFlags = NodeFlagsContainsThis // Indicates whether the identifier contains an extended unicode escape sequence
 * )
 */
export const NodeFlagsNone: NodeFlags = undefined as never;
export const NodeFlagsLet: NodeFlags = undefined as never;
export const NodeFlagsConst: NodeFlags = undefined as never;
export const NodeFlagsUsing: NodeFlags = undefined as never;
export const NodeFlagsReparsed: NodeFlags = undefined as never;
export const NodeFlagsSynthesized: NodeFlags = undefined as never;
export const NodeFlagsOptionalChain: NodeFlags = undefined as never;
export const NodeFlagsExportContext: NodeFlags = undefined as never;
export const NodeFlagsContainsThis: NodeFlags = undefined as never;
export const NodeFlagsHasImplicitReturn: NodeFlags = undefined as never;
export const NodeFlagsHasExplicitReturn: NodeFlags = undefined as never;
export const NodeFlagsDisallowInContext: NodeFlags = undefined as never;
export const NodeFlagsYieldContext: NodeFlags = undefined as never;
export const NodeFlagsDecoratorContext: NodeFlags = undefined as never;
export const NodeFlagsAwaitContext: NodeFlags = undefined as never;
export const NodeFlagsDisallowConditionalTypesContext: NodeFlags = undefined as never;
export const NodeFlagsThisNodeHasError: NodeFlags = undefined as never;
export const NodeFlagsJavaScriptFile: NodeFlags = undefined as never;
export const NodeFlagsThisNodeOrAnySubNodesHasError: NodeFlags = undefined as never;
export const NodeFlagsHasAsyncFunctions: NodeFlags = undefined as never;
export const NodeFlagsPossiblyContainsDynamicImport: NodeFlags = undefined as never;
export const NodeFlagsPossiblyContainsImportMeta: NodeFlags = undefined as never;
export const NodeFlagsHasJSDoc: NodeFlags = undefined as never;
export const NodeFlagsJSDoc: NodeFlags = undefined as never;
export const NodeFlagsAmbient: NodeFlags = undefined as never;
export const NodeFlagsInWithStatement: NodeFlags = undefined as never;
export const NodeFlagsJsonFile: NodeFlags = undefined as never;
export const NodeFlagsPossiblyContainsDeprecatedTag: NodeFlags = undefined as never;
export const NodeFlagsUnreachable: NodeFlags = undefined as never;
export const NodeFlagsBlockScoped: int = undefined as never;
export const NodeFlagsConstant: int = undefined as never;
export const NodeFlagsAwaitUsing: int = undefined as never;
export const NodeFlagsReachabilityCheckFlags: int = undefined as never;
export const NodeFlagsReachabilityAndEmitFlags: int = undefined as never;
export const NodeFlagsContextFlags: NodeFlags = undefined as never;
export const NodeFlagsTypeExcludesFlags: NodeFlags = undefined as never;
export const NodeFlagsPermanentlySetIncrementalFlags: NodeFlags = undefined as never;
export const NodeFlagsIdentifierHasExtendedUnicodeEscape: NodeFlags = undefined as never;
