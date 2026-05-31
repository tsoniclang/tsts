import type { FS } from "../vfs.js";
import { FSMock } from "./mock_generated.js";

export function wrap(fs: FS): FSMock {
  const mock = new FSMock();
  mock.directoryExistsFunc = (path) => fs.directoryExists(path);
  mock.fileExistsFunc = (path) => fs.fileExists(path);
  mock.getAccessibleEntriesFunc = (path) => fs.getAccessibleEntries(path);
  mock.readFileFunc = (path) => fs.readFile(path);
  mock.realpathFunc = (path) => fs.realpath(path);
  mock.removeFunc = (path) => fs.remove(path);
  mock.chtimesFunc = (path, accessTime, modifyTime) => fs.chtimes(path, accessTime, modifyTime);
  mock.statFunc = (path) => fs.stat(path);
  mock.useCaseSensitiveFileNamesFunc = () => fs.useCaseSensitiveFileNames();
  mock.walkDirFunc = (root, walkFn) => fs.walkDir(root, walkFn);
  mock.writeFileFunc = (path, data) => fs.writeFile(path, data);
  mock.appendFileFunc = (path, data) => fs.appendFile(path, data);
  return mock;
}
