import { spawnSync } from "node:child_process";

const result = spawnSync("git", ["diff", "--exit-code", "--", "src/ast/generated", "src/ast/index.ts"], {
  encoding: "utf8",
  stdio: "pipe",
});

if (result.status !== 0) {
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  throw new Error("Generated AST files are out of date. Run `npm run generate` and commit the result.");
}

console.log("Generated AST files are current.");
