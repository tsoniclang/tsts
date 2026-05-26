import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { containsNodeModules, type ResolvedModule } from "./specifiers.js";
import { tryGetRealFileNameForNonJSDeclarationFileName } from "./util.js";

// `getEachFileNameOfModule` / `tryGetModuleNameFromExportsOrImports` tests
// require the full host surface (symlink cache, package-json info, etc.) and
// the upstream tspath helpers. Those land with the corresponding TSTS
// subsystems; this file tests the parts that are self-contained.

export class ContainsNodeModulesTests {
  contains_node_modules_returns_true_for_node_modules_paths(): void {
    Assert.True(containsNodeModules("/project/node_modules/lodash/index.js"));
  }

  contains_node_modules_returns_false_for_non_node_modules_paths(): void {
    Assert.False(containsNodeModules("/project/src/utils.ts"));
  }

  contains_node_modules_handles_node_modules_in_middle(): void {
    Assert.True(containsNodeModules("/project/packages/node_modules/pkg/file.js"));
  }

  contains_node_modules_handles_empty_path(): void {
    Assert.False(containsNodeModules(""));
  }
}

// Faithful port of TS-Go `getBaseFileName` / `removeExtension` for the
// test's purposes. The full implementations live in `tspath`; here we
// supply the minimal logic needed.
function getBaseFileName(p: string): string {
  const slash = p.lastIndexOf("/");
  return slash === -1 ? p : p.slice(slash + 1);
}

function removeExtension(p: string, ext: string): string {
  return p.endsWith(ext) ? p.slice(0, p.length - ext.length) : p;
}

export class TryGetRealFileNameForNonJSDeclarationFileNameTests {
  json_declaration_file_returns_underlying_asset(): void {
    Assert.Equal(
      "/project/foo.json",
      tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.d.json.ts", getBaseFileName, removeExtension),
    );
  }

  multi_dot_source_extension_declaration_file_returns_full_basename(): void {
    Assert.Equal(
      "/project/foo.module.css",
      tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.module.d.css.ts", getBaseFileName, removeExtension),
    );
  }

  plain_dts_file_returns_empty_string(): void {
    Assert.Equal(
      "",
      tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.d.ts", getBaseFileName, removeExtension),
    );
  }
}

// Ensure the type is exercised so the forward-declared module-resolution
// surface compiles even without the full module port.
function _typeCheck_ResolvedModule(m: ResolvedModule): boolean {
  return m.isResolved();
}

A<ContainsNodeModulesTests>().method((t) => t.contains_node_modules_returns_true_for_node_modules_paths).add(FactAttribute);
A<ContainsNodeModulesTests>().method((t) => t.contains_node_modules_returns_false_for_non_node_modules_paths).add(FactAttribute);
A<ContainsNodeModulesTests>().method((t) => t.contains_node_modules_handles_node_modules_in_middle).add(FactAttribute);
A<ContainsNodeModulesTests>().method((t) => t.contains_node_modules_handles_empty_path).add(FactAttribute);
A<TryGetRealFileNameForNonJSDeclarationFileNameTests>().method((t) => t.json_declaration_file_returns_underlying_asset).add(FactAttribute);
A<TryGetRealFileNameForNonJSDeclarationFileNameTests>().method((t) => t.multi_dot_source_extension_declaration_file_returns_full_basename).add(FactAttribute);
A<TryGetRealFileNameForNonJSDeclarationFileNameTests>().method((t) => t.plain_dts_file_returns_empty_string).add(FactAttribute);
