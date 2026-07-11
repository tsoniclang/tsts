import { loadParser } from "./parser-runtime.mjs";

export const ANNOTATION = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };

export async function parserWithCount(testContext) {
  let parser;
  try {
    parser = await loadParser();
  } catch (error) {
    testContext.skip(`TSTS parser unavailable: ${error.message}`);
    return undefined;
  }
  let parseCount = 0;
  return {
    api: {
      ...parser,
      ParseSourceFile(...args) {
        parseCount++;
        return parser.ParseSourceFile(...args);
      },
    },
    count: () => parseCount,
  };
}
