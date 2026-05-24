import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  forEachDependency,
  hasDependency,
  isPresent,
  isValid,
  parsePackageJSON,
} from "./index.js";

export class PackageJsonParseBasicsTests {
  parses_well_formed(): void {
    const text =
      "{\"name\":\"foo\",\"version\":\"1.0.0\",\"type\":\"module\"," +
      "\"main\":\"./dist/index.js\",\"types\":\"./dist/index.d.ts\"}";
    const pkg = parsePackageJSON(text);
    Assert.True(isValid(pkg.name));
    if (pkg.name.state === "ok") {
      Assert.Equal("foo", pkg.name.value);
    }
    Assert.True(isValid(pkg.version));
    Assert.True(isValid(pkg.main));
  }

  handles_absent_fields(): void {
    const pkg = parsePackageJSON("{\"name\":\"foo\"}");
    Assert.False(isPresent(pkg.version));
    Assert.Equal("absent", pkg.version.state);
  }

  handles_null_fields(): void {
    const pkg = parsePackageJSON("{\"name\":null}");
    Assert.Equal("null", pkg.name.state);
  }

  handles_wrong_type_fields(): void {
    const pkg = parsePackageJSON("{\"name\":42}");
    Assert.Equal("wrong-type", pkg.name.state);
    if (pkg.name.state === "wrong-type") {
      Assert.Equal("number", pkg.name.actualJSONType);
    }
  }
}

export class PackageJsonDependencyTests {
  reads_dependency_map(): void {
    const text = "{\"dependencies\":{\"react\":\"^18.0.0\",\"typescript\":\"^5.4.0\"}}";
    const pkg = parsePackageJSON(text);
    Assert.True(isValid(pkg.dependencies));
    if (pkg.dependencies.state === "ok") {
      Assert.Equal("^18.0.0", pkg.dependencies.value.get("react"));
      Assert.Equal("^5.4.0", pkg.dependencies.value.get("typescript"));
    }
  }

  has_dependency_searches_all_fields(): void {
    const text =
      "{\"dependencies\":{\"react\":\"*\"},\"devDependencies\":{\"typescript\":\"*\"}," +
      "\"peerDependencies\":{\"eslint\":\"*\"},\"optionalDependencies\":{\"foo\":\"*\"}}";
    const pkg = parsePackageJSON(text);
    Assert.True(hasDependency(pkg, "react"));
    Assert.True(hasDependency(pkg, "typescript"));
    Assert.True(hasDependency(pkg, "eslint"));
    Assert.True(hasDependency(pkg, "foo"));
    Assert.False(hasDependency(pkg, "missing"));
  }

  for_each_dependency_iterates(): void {
    const text = "{\"dependencies\":{\"a\":\"1\"},\"devDependencies\":{\"b\":\"2\"}}";
    const pkg = parsePackageJSON(text);
    const seen: string[] = [];
    forEachDependency(pkg, (name, version, field) => {
      seen.push(`${field}/${name}@${version}`);
      return true;
    });
    Assert.Equal(2, seen.length);
    Assert.Contains("dependencies/a@1", seen);
    Assert.Contains("devDependencies/b@2", seen);
  }

  for_each_dependency_stops_on_false(): void {
    const text = "{\"dependencies\":{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\"}}";
    const pkg = parsePackageJSON(text);
    let count: int = 0;
    forEachDependency(pkg, () => {
      count = count + 1;
      return count < 2;
    });
    Assert.Equal(2, count);
  }
}

export class PackageJsonExportsTests {
  reads_exports_field(): void {
    const text = "{\"exports\":{\".\":\"./index.js\",\"./sub\":\"./sub.js\"}}";
    const pkg = parsePackageJSON(text);
    Assert.Equal("object", pkg.exports.type);
  }

  absent_exports_has_not_present_type(): void {
    const pkg = parsePackageJSON("{}");
    Assert.Equal("not-present", pkg.exports.type);
  }
}

A<PackageJsonParseBasicsTests>().method((t) => t.parses_well_formed).add(FactAttribute);
A<PackageJsonParseBasicsTests>().method((t) => t.handles_absent_fields).add(FactAttribute);
A<PackageJsonParseBasicsTests>().method((t) => t.handles_null_fields).add(FactAttribute);
A<PackageJsonParseBasicsTests>().method((t) => t.handles_wrong_type_fields).add(FactAttribute);
A<PackageJsonDependencyTests>().method((t) => t.reads_dependency_map).add(FactAttribute);
A<PackageJsonDependencyTests>().method((t) => t.has_dependency_searches_all_fields).add(FactAttribute);
A<PackageJsonDependencyTests>().method((t) => t.for_each_dependency_iterates).add(FactAttribute);
A<PackageJsonDependencyTests>().method((t) => t.for_each_dependency_stops_on_false).add(FactAttribute);
A<PackageJsonExportsTests>().method((t) => t.reads_exports_field).add(FactAttribute);
A<PackageJsonExportsTests>().method((t) => t.absent_exports_has_not_present_type).add(FactAttribute);
