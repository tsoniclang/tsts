import {
  copyNormalizedTree,
  describeNormalizedRecords,
  describeNormalizedTree,
} from "./normalized-tree.mjs";

export async function describeNormalizedDistribution(root, subject, requireSingleLink = false) {
  return describeNormalizedTree(root, subject, { requireSingleLink });
}

export async function copyNormalizedDistribution(sourceRoot, targetRoot, subject) {
  return copyNormalizedTree(sourceRoot, targetRoot, subject);
}

export function digestNormalizedDistributionRecords(directories, members, root) {
  const prefix = `${root}/`;
  const selectedDirectories = directories
    .map((record) => record.path)
    .filter((path) => path.startsWith(prefix))
    .map((path) => path.slice(prefix.length));
  const selectedMembers = members
    .filter((record) => record.path.startsWith(prefix))
    .map((record) => ({
      path: record.path.slice(prefix.length),
      mode: record.mode,
      size: record.size,
      digest: record.digest,
    }));
  return describeNormalizedRecords(selectedDirectories, selectedMembers);
}
