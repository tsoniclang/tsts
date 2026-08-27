import { join, resolve } from "node:path";

import {
  verifyGeneratedProductGitVisibility,
  verifyGeneratedProductMatches,
  verifyPublishedProduct,
} from "./generated-product.mjs";

const [repositoryArgument, targetArgument, publishedArgument] = process.argv.slice(2);
if (repositoryArgument === undefined || process.argv.length > 5) {
  throw new Error("repository root and optional target/published roots are required");
}
const repositoryRoot = resolve(repositoryArgument);
const publishedRoot = resolve(
  publishedArgument ?? join(repositoryRoot, "generated"),
);
const verified = targetArgument === undefined
  ? await verifyPublishedProduct(publishedRoot)
  : await verifyGeneratedProductMatches(resolve(targetArgument), publishedRoot);
verifyGeneratedProductGitVisibility(repositoryRoot, publishedRoot, verified.source);
process.stdout.write(
  `generated_product=verified source_files=${verified.manifest.source.files} ` +
    `source_bytes=${verified.manifest.source.bytes}\n`,
);
