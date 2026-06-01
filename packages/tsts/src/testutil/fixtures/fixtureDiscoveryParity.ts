/**
 * Fixture discovery parity helpers.
 */

export interface FixtureDiscoveryInput {
  readonly root: string;
  readonly files: readonly string[];
  readonly extension: string;
}

export function discoverFixtures(input: FixtureDiscoveryInput): readonly string[] {
  const normalizedRoot = input.root.replace(/\\/g, "/").replace(/\/$/, "");
  return input.files
    .map(file => file.replace(/\\/g, "/"))
    .filter(file => file.startsWith(`${normalizedRoot}/`) && file.endsWith(input.extension))
    .sort();
}

export function fixtureName(root: string, file: string): string {
  const normalizedRoot = root.replace(/\\/g, "/").replace(/\/$/, "");
  const normalizedFile = file.replace(/\\/g, "/");
  return normalizedFile.startsWith(`${normalizedRoot}/`) ? normalizedFile.slice(normalizedRoot.length + 1) : normalizedFile;
}
