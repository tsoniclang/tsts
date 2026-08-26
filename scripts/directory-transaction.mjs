import { lstat, mkdir, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export async function replaceDirectory(targetArgument, stagedArgument, preservedArgument) {
  const target = resolve(targetArgument);
  const staged = resolve(stagedArgument);
  const preserved = resolve(preservedArgument);

  await requireDirectory(staged, "Staged replacement");
  const targetStatus = await optionalStatus(target);
  if (targetStatus === undefined) {
    await mkdir(dirname(target), { recursive: true });
    await rename(staged, target);
    return undefined;
  }
  if (!targetStatus.isDirectory()) {
    throw new Error("Directory replacement target is not a directory");
  }
  if (await optionalStatus(preserved) !== undefined) {
    throw new Error("Preserved directory replacement path already exists");
  }

  await mkdir(dirname(preserved), { recursive: true });
  await rename(target, preserved);
  try {
    await rename(staged, target);
  } catch (error) {
    await rename(preserved, target);
    throw error;
  }
  return preserved;
}

async function requireDirectory(path, subject) {
  const status = await optionalStatus(path);
  if (status === undefined || !status.isDirectory()) {
    throw new Error(`${subject} is not a directory`);
  }
}

async function optionalStatus(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}
