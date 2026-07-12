import test from "node:test";

import { runGoExtractorTests } from "./coverage-gate.mjs";

test("Go extractor suite is part of the authoritative Porter gate", () => runGoExtractorTests());
