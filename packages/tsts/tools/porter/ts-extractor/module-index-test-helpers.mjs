import { loadParser } from "./parser-runtime.mjs";

export const ANNOTATION = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };

export async function parserWithCount() {
  const parser = await loadParser();
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
