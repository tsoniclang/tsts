import { join, resolve } from "node:path";

import { publishGeneratedProduct } from "./generated-product.mjs";

const [repositoryArgument, targetArgument, publishedArgument] = process.argv.slice(2);
if (repositoryArgument === undefined || process.argv.length > 5) {
  throw new Error("repository root and optional target/published roots are required");
}
const repositoryRoot = resolve(repositoryArgument);
const targetRoot = resolve(targetArgument ?? join(repositoryRoot, ".temp", "target"));
const publishedRoot = resolve(
  publishedArgument ?? join(repositoryRoot, "generated"),
);
const manifest = await publishGeneratedProduct(
  repositoryRoot,
  targetRoot,
  publishedRoot,
);
process.stdout.write(
  `generated_product=published source_files=${manifest.source.files} ` +
    `source_bytes=${manifest.source.bytes}\n`,
);
