export interface ParseTestCase<TNode> {
  readonly name: string;
  readonly source: string;
  readonly parse: (source: string) => TNode;
  readonly format: (node: TNode) => string;
}

export function runParseTest<TNode>(test: ParseTestCase<TNode>): string {
  const node = test.parse(test.source);
  return test.format(node);
}
