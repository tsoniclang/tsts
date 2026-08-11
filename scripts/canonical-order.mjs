export function compareCodeUnits(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function compareRecordPaths(left, right) {
  return compareCodeUnits(left.path, right.path);
}
