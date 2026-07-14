import type { bool } from "../../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../../go/compat.js";
import { GoAppend } from "../../../go/compat.js";
import type { RWMutex } from "../../../go/sync.js";
import type { Time } from "../../../go/time.js";
import type { Entries, FileInfo, FS, WalkDirFunc } from "../vfs.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"bf43051dbf5443359d945ee6f538cadaf617e6c30585a226b391502e8ff2cb44"}
 *
 * Go source:
 * var _ vfs.FS = &FSMock{}
 */
export let __611a48db_0: GoInterface<FS> = FSMock_as_vfs_FS(undefined);

export function FSMock_as_vfs_FS(receiver: GoPtr<FSMock>): FS {
  return {
    UseCaseSensitiveFileNames: (): bool => FSMock_UseCaseSensitiveFileNames(receiver),
    FileExists: (path: string): bool => FSMock_FileExists(receiver, path),
    ReadFile: (path: string): [string, bool] => FSMock_ReadFile(receiver, path),
    WriteFile: (path: string, data: string): GoError => FSMock_WriteFile(receiver, path, data),
    AppendFile: (path: string, data: string): GoError => FSMock_AppendFile(receiver, path, data),
    Remove: (path: string): GoError => FSMock_Remove(receiver, path),
    Chtimes: (path: string, aTime: Time, mTime: Time): GoError => FSMock_Chtimes(receiver, path, aTime, mTime),
    DirectoryExists: (path: string): bool => FSMock_DirectoryExists(receiver, path),
    GetAccessibleEntries: (path: string): Entries => FSMock_GetAccessibleEntries(receiver, path),
    Stat: (path: string): GoInterface<FileInfo> => FSMock_Stat(receiver, path),
    WalkDir: (root: string, walkFn: WalkDirFunc): GoError => FSMock_WalkDir(receiver, root, walkFn),
    Realpath: (path: string): string => FSMock_Realpath(receiver, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::type::FSMock","kind":"type","status":"implemented","sigHash":"a921a1d55d48c9f433b4e4651b6d84d2bbccc39d87bcc0b788b8434aa2a92949"}
 *
 * Go source:
 * FSMock struct {
 * 	// AppendFileFunc mocks the AppendFile method.
 * 	AppendFileFunc func(path string, data string) error
 * 
 * 	// ChtimesFunc mocks the Chtimes method.
 * 	ChtimesFunc func(path string, aTime time.Time, mTime time.Time) error
 * 
 * 	// DirectoryExistsFunc mocks the DirectoryExists method.
 * 	DirectoryExistsFunc func(path string) bool
 * 
 * 	// FileExistsFunc mocks the FileExists method.
 * 	FileExistsFunc func(path string) bool
 * 
 * 	// GetAccessibleEntriesFunc mocks the GetAccessibleEntries method.
 * 	GetAccessibleEntriesFunc func(path string) vfs.Entries
 * 
 * 	// ReadFileFunc mocks the ReadFile method.
 * 	ReadFileFunc func(path string) (string, bool)
 * 
 * 	// RealpathFunc mocks the Realpath method.
 * 	RealpathFunc func(path string) string
 * 
 * 	// RemoveFunc mocks the Remove method.
 * 	RemoveFunc func(path string) error
 * 
 * 	// StatFunc mocks the Stat method.
 * 	StatFunc func(path string) vfs.FileInfo
 * 
 * 	// UseCaseSensitiveFileNamesFunc mocks the UseCaseSensitiveFileNames method.
 * 	UseCaseSensitiveFileNamesFunc func() bool
 * 
 * 	// WalkDirFunc mocks the WalkDir method.
 * 	WalkDirFunc func(root string, walkFn vfs.WalkDirFunc) error
 * 
 * 	// WriteFileFunc mocks the WriteFile method.
 * 	WriteFileFunc func(path string, data string) error
 * 
 * 	// calls tracks calls to the methods.
 * 	calls struct {
 * 		// AppendFile holds details about calls to the AppendFile method.
 * 		AppendFile []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 			// Data is the data argument value.
 * 			Data string
 * 		}
 * 		// Chtimes holds details about calls to the Chtimes method.
 * 		Chtimes []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 			// ATime is the aTime argument value.
 * 			ATime time.Time
 * 			// MTime is the mTime argument value.
 * 			MTime time.Time
 * 		}
 * 		// DirectoryExists holds details about calls to the DirectoryExists method.
 * 		DirectoryExists []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// FileExists holds details about calls to the FileExists method.
 * 		FileExists []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// GetAccessibleEntries holds details about calls to the GetAccessibleEntries method.
 * 		GetAccessibleEntries []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// ReadFile holds details about calls to the ReadFile method.
 * 		ReadFile []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// Realpath holds details about calls to the Realpath method.
 * 		Realpath []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// Remove holds details about calls to the Remove method.
 * 		Remove []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// Stat holds details about calls to the Stat method.
 * 		Stat []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 		}
 * 		// UseCaseSensitiveFileNames holds details about calls to the UseCaseSensitiveFileNames method.
 * 		UseCaseSensitiveFileNames []struct{}
 * 		// WalkDir holds details about calls to the WalkDir method.
 * 		WalkDir []struct {
 * 			// Root is the root argument value.
 * 			Root string
 * 			// WalkFn is the walkFn argument value.
 * 			WalkFn vfs.WalkDirFunc
 * 		}
 * 		// WriteFile holds details about calls to the WriteFile method.
 * 		WriteFile []struct {
 * 			// Path is the path argument value.
 * 			Path string
 * 			// Data is the data argument value.
 * 			Data string
 * 		}
 * 	}
 * 	lockAppendFile                sync.RWMutex
 * 	lockChtimes                   sync.RWMutex
 * 	lockDirectoryExists           sync.RWMutex
 * 	lockFileExists                sync.RWMutex
 * 	lockGetAccessibleEntries      sync.RWMutex
 * 	lockReadFile                  sync.RWMutex
 * 	lockRealpath                  sync.RWMutex
 * 	lockRemove                    sync.RWMutex
 * 	lockStat                      sync.RWMutex
 * 	lockUseCaseSensitiveFileNames sync.RWMutex
 * 	lockWalkDir                   sync.RWMutex
 * 	lockWriteFile                 sync.RWMutex
 * }
 */
export interface FSMock {
  AppendFileFunc: GoFunc<(path: string, data: string) => GoError>;
  ChtimesFunc: GoFunc<(path: string, aTime: Time, mTime: Time) => GoError>;
  DirectoryExistsFunc: GoFunc<(path: string) => bool>;
  FileExistsFunc: GoFunc<(path: string) => bool>;
  GetAccessibleEntriesFunc: GoFunc<(path: string) => Entries>;
  ReadFileFunc: GoFunc<(path: string) => [string, bool]>;
  RealpathFunc: GoFunc<(path: string) => string>;
  RemoveFunc: GoFunc<(path: string) => GoError>;
  StatFunc: GoFunc<(path: string) => GoInterface<FileInfo>>;
  UseCaseSensitiveFileNamesFunc: GoFunc<() => bool>;
  WalkDirFunc: GoFunc<(root: string, walkFn: WalkDirFunc) => GoError>;
  WriteFileFunc: GoFunc<(path: string, data: string) => GoError>;
  calls: { AppendFile: GoSlice<{ Path: string; Data: string }>; Chtimes: GoSlice<{ Path: string; ATime: Time; MTime: Time }>; DirectoryExists: GoSlice<{ Path: string }>; FileExists: GoSlice<{ Path: string }>; GetAccessibleEntries: GoSlice<{ Path: string }>; ReadFile: GoSlice<{ Path: string }>; Realpath: GoSlice<{ Path: string }>; Remove: GoSlice<{ Path: string }>; Stat: GoSlice<{ Path: string }>; UseCaseSensitiveFileNames: GoSlice<{ readonly __tsgoEmpty?: never }>; WalkDir: GoSlice<{ Root: string; WalkFn: WalkDirFunc }>; WriteFile: GoSlice<{ Path: string; Data: string }> };
  lockAppendFile: RWMutex;
  lockChtimes: RWMutex;
  lockDirectoryExists: RWMutex;
  lockFileExists: RWMutex;
  lockGetAccessibleEntries: RWMutex;
  lockReadFile: RWMutex;
  lockRealpath: RWMutex;
  lockRemove: RWMutex;
  lockStat: RWMutex;
  lockUseCaseSensitiveFileNames: RWMutex;
  lockWalkDir: RWMutex;
  lockWriteFile: RWMutex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.AppendFile","kind":"method","status":"implemented","sigHash":"1a30ed51d94c8c43552aebdd0c4c33d88bab5fbf63b55da5fe12097990ef291e"}
 *
 * Go source:
 * func (mock *FSMock) AppendFile(path string, data string) error {
 * 	if mock.AppendFileFunc == nil {
 * 		panic("FSMock.AppendFileFunc: method is nil but FS.AppendFile was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 		Data string
 * 	}{
 * 		Path: path,
 * 		Data: data,
 * 	}
 * 	mock.lockAppendFile.Lock()
 * 	mock.calls.AppendFile = append(mock.calls.AppendFile, callInfo)
 * 	mock.lockAppendFile.Unlock()
 * 	return mock.AppendFileFunc(path, data)
 * }
 */
export function FSMock_AppendFile(receiver: GoPtr<FSMock>, path: string, data: string): GoError {
  if (receiver!.AppendFileFunc === undefined) {
    throw new globalThis.Error("FSMock.AppendFileFunc: method is nil but FS.AppendFile was just called");
  }
  const callInfo = { Path: path, Data: data };
  receiver!.lockAppendFile.Lock();
  receiver!.calls.AppendFile = GoAppend(receiver!.calls.AppendFile, callInfo);
  receiver!.lockAppendFile.Unlock();
  return receiver!.AppendFileFunc(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.AppendFileCalls","kind":"method","status":"implemented","sigHash":"928ff63d2fec4c4bd69ba81a7465001753b678ac64fb5b36694a7f76efcf72b2"}
 *
 * Go source:
 * func (mock *FSMock) AppendFileCalls() []struct {
 * 	Path string
 * 	Data string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 		Data string
 * 	}
 * 	mock.lockAppendFile.RLock()
 * 	calls = mock.calls.AppendFile
 * 	mock.lockAppendFile.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_AppendFileCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string; Data: string }> {
  receiver!.lockAppendFile.RLock();
  const calls = receiver!.calls.AppendFile;
  receiver!.lockAppendFile.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.Chtimes","kind":"method","status":"implemented","sigHash":"37087a4a29afb8671a4cce2a6fd032091c0849042aa160d13f3644224e15d109"}
 *
 * Go source:
 * func (mock *FSMock) Chtimes(path string, aTime time.Time, mTime time.Time) error {
 * 	if mock.ChtimesFunc == nil {
 * 		panic("FSMock.ChtimesFunc: method is nil but FS.Chtimes was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path  string
 * 		ATime time.Time
 * 		MTime time.Time
 * 	}{
 * 		Path:  path,
 * 		ATime: aTime,
 * 		MTime: mTime,
 * 	}
 * 	mock.lockChtimes.Lock()
 * 	mock.calls.Chtimes = append(mock.calls.Chtimes, callInfo)
 * 	mock.lockChtimes.Unlock()
 * 	return mock.ChtimesFunc(path, aTime, mTime)
 * }
 */
export function FSMock_Chtimes(receiver: GoPtr<FSMock>, path: string, aTime: Time, mTime: Time): GoError {
  if (receiver!.ChtimesFunc === undefined) {
    throw new globalThis.Error("FSMock.ChtimesFunc: method is nil but FS.Chtimes was just called");
  }
  const callInfo = { Path: path, ATime: aTime, MTime: mTime };
  receiver!.lockChtimes.Lock();
  receiver!.calls.Chtimes = GoAppend(receiver!.calls.Chtimes, callInfo);
  receiver!.lockChtimes.Unlock();
  return receiver!.ChtimesFunc(path, aTime, mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.ChtimesCalls","kind":"method","status":"implemented","sigHash":"5b92636b5d0a6f33ec5b6a6ee3fccced4323e52e889e586323ae0bf6ba25a016"}
 *
 * Go source:
 * func (mock *FSMock) ChtimesCalls() []struct {
 * 	Path  string
 * 	ATime time.Time
 * 	MTime time.Time
 * } {
 * 	var calls []struct {
 * 		Path  string
 * 		ATime time.Time
 * 		MTime time.Time
 * 	}
 * 	mock.lockChtimes.RLock()
 * 	calls = mock.calls.Chtimes
 * 	mock.lockChtimes.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_ChtimesCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string; ATime: Time; MTime: Time }> {
  receiver!.lockChtimes.RLock();
  const calls = receiver!.calls.Chtimes;
  receiver!.lockChtimes.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.DirectoryExists","kind":"method","status":"implemented","sigHash":"e84aae2ed6d0d4d8d8d574992ac2c976a8cf33b8e8b9c4626897cecffa93dbbe"}
 *
 * Go source:
 * func (mock *FSMock) DirectoryExists(path string) bool {
 * 	if mock.DirectoryExistsFunc == nil {
 * 		panic("FSMock.DirectoryExistsFunc: method is nil but FS.DirectoryExists was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockDirectoryExists.Lock()
 * 	mock.calls.DirectoryExists = append(mock.calls.DirectoryExists, callInfo)
 * 	mock.lockDirectoryExists.Unlock()
 * 	return mock.DirectoryExistsFunc(path)
 * }
 */
export function FSMock_DirectoryExists(receiver: GoPtr<FSMock>, path: string): bool {
  if (receiver!.DirectoryExistsFunc === undefined) {
    throw new globalThis.Error("FSMock.DirectoryExistsFunc: method is nil but FS.DirectoryExists was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockDirectoryExists.Lock();
  receiver!.calls.DirectoryExists = GoAppend(receiver!.calls.DirectoryExists, callInfo);
  receiver!.lockDirectoryExists.Unlock();
  return receiver!.DirectoryExistsFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.DirectoryExistsCalls","kind":"method","status":"implemented","sigHash":"57341956a9b36289347b4f4c557e3f571c4d187d9fa2b8ba4a3db42ca37132c5"}
 *
 * Go source:
 * func (mock *FSMock) DirectoryExistsCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockDirectoryExists.RLock()
 * 	calls = mock.calls.DirectoryExists
 * 	mock.lockDirectoryExists.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_DirectoryExistsCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockDirectoryExists.RLock();
  const calls = receiver!.calls.DirectoryExists;
  receiver!.lockDirectoryExists.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.FileExists","kind":"method","status":"implemented","sigHash":"aaeaba2a386d6babfbe18c77c3a28a3a1b1b7f20401333bc7e1eecd51b5c0bf8"}
 *
 * Go source:
 * func (mock *FSMock) FileExists(path string) bool {
 * 	if mock.FileExistsFunc == nil {
 * 		panic("FSMock.FileExistsFunc: method is nil but FS.FileExists was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockFileExists.Lock()
 * 	mock.calls.FileExists = append(mock.calls.FileExists, callInfo)
 * 	mock.lockFileExists.Unlock()
 * 	return mock.FileExistsFunc(path)
 * }
 */
export function FSMock_FileExists(receiver: GoPtr<FSMock>, path: string): bool {
  if (receiver!.FileExistsFunc === undefined) {
    throw new globalThis.Error("FSMock.FileExistsFunc: method is nil but FS.FileExists was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockFileExists.Lock();
  receiver!.calls.FileExists = GoAppend(receiver!.calls.FileExists, callInfo);
  receiver!.lockFileExists.Unlock();
  return receiver!.FileExistsFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.FileExistsCalls","kind":"method","status":"implemented","sigHash":"72a78f507e2d429fd1345268d3f7e4c14d707d89b64c4bd16fc56b7a506a7463"}
 *
 * Go source:
 * func (mock *FSMock) FileExistsCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockFileExists.RLock()
 * 	calls = mock.calls.FileExists
 * 	mock.lockFileExists.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_FileExistsCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockFileExists.RLock();
  const calls = receiver!.calls.FileExists;
  receiver!.lockFileExists.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.GetAccessibleEntries","kind":"method","status":"implemented","sigHash":"d8197abb958d3ad88dd472b76832f818ec93c35d6744ea71baa69ecc404eccb7"}
 *
 * Go source:
 * func (mock *FSMock) GetAccessibleEntries(path string) vfs.Entries {
 * 	if mock.GetAccessibleEntriesFunc == nil {
 * 		panic("FSMock.GetAccessibleEntriesFunc: method is nil but FS.GetAccessibleEntries was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockGetAccessibleEntries.Lock()
 * 	mock.calls.GetAccessibleEntries = append(mock.calls.GetAccessibleEntries, callInfo)
 * 	mock.lockGetAccessibleEntries.Unlock()
 * 	return mock.GetAccessibleEntriesFunc(path)
 * }
 */
export function FSMock_GetAccessibleEntries(receiver: GoPtr<FSMock>, path: string): Entries {
  if (receiver!.GetAccessibleEntriesFunc === undefined) {
    throw new globalThis.Error("FSMock.GetAccessibleEntriesFunc: method is nil but FS.GetAccessibleEntries was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockGetAccessibleEntries.Lock();
  receiver!.calls.GetAccessibleEntries = GoAppend(receiver!.calls.GetAccessibleEntries, callInfo);
  receiver!.lockGetAccessibleEntries.Unlock();
  return receiver!.GetAccessibleEntriesFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.GetAccessibleEntriesCalls","kind":"method","status":"implemented","sigHash":"ee2e4a9a99328041e469a85e8ba7017d9e7c622a3cd4e7b4462ffa52f13e02d7"}
 *
 * Go source:
 * func (mock *FSMock) GetAccessibleEntriesCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockGetAccessibleEntries.RLock()
 * 	calls = mock.calls.GetAccessibleEntries
 * 	mock.lockGetAccessibleEntries.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_GetAccessibleEntriesCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockGetAccessibleEntries.RLock();
  const calls = receiver!.calls.GetAccessibleEntries;
  receiver!.lockGetAccessibleEntries.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.ReadFile","kind":"method","status":"implemented","sigHash":"a1535fdebf6cbe332301b5faac61d54161ca966ca48dfeae018a53b83de0009a"}
 *
 * Go source:
 * func (mock *FSMock) ReadFile(path string) (string, bool) {
 * 	if mock.ReadFileFunc == nil {
 * 		panic("FSMock.ReadFileFunc: method is nil but FS.ReadFile was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockReadFile.Lock()
 * 	mock.calls.ReadFile = append(mock.calls.ReadFile, callInfo)
 * 	mock.lockReadFile.Unlock()
 * 	return mock.ReadFileFunc(path)
 * }
 */
export function FSMock_ReadFile(receiver: GoPtr<FSMock>, path: string): [string, bool] {
  if (receiver!.ReadFileFunc === undefined) {
    throw new globalThis.Error("FSMock.ReadFileFunc: method is nil but FS.ReadFile was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockReadFile.Lock();
  receiver!.calls.ReadFile = GoAppend(receiver!.calls.ReadFile, callInfo);
  receiver!.lockReadFile.Unlock();
  return receiver!.ReadFileFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.ReadFileCalls","kind":"method","status":"implemented","sigHash":"2fda2db885f6cd195f5f76b2fe8a744b80a27c24dd7513195751f9e865e30951"}
 *
 * Go source:
 * func (mock *FSMock) ReadFileCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockReadFile.RLock()
 * 	calls = mock.calls.ReadFile
 * 	mock.lockReadFile.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_ReadFileCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockReadFile.RLock();
  const calls = receiver!.calls.ReadFile;
  receiver!.lockReadFile.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.Realpath","kind":"method","status":"implemented","sigHash":"1262f7a59e50e50c517f98890d13ed1f48a2f900f019a6ee975253fc833b5b04"}
 *
 * Go source:
 * func (mock *FSMock) Realpath(path string) string {
 * 	if mock.RealpathFunc == nil {
 * 		panic("FSMock.RealpathFunc: method is nil but FS.Realpath was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockRealpath.Lock()
 * 	mock.calls.Realpath = append(mock.calls.Realpath, callInfo)
 * 	mock.lockRealpath.Unlock()
 * 	return mock.RealpathFunc(path)
 * }
 */
export function FSMock_Realpath(receiver: GoPtr<FSMock>, path: string): string {
  if (receiver!.RealpathFunc === undefined) {
    throw new globalThis.Error("FSMock.RealpathFunc: method is nil but FS.Realpath was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockRealpath.Lock();
  receiver!.calls.Realpath = GoAppend(receiver!.calls.Realpath, callInfo);
  receiver!.lockRealpath.Unlock();
  return receiver!.RealpathFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.RealpathCalls","kind":"method","status":"implemented","sigHash":"ab172a65bbf842b6665da561e818864c33bcd78357620447609781b702488d27"}
 *
 * Go source:
 * func (mock *FSMock) RealpathCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockRealpath.RLock()
 * 	calls = mock.calls.Realpath
 * 	mock.lockRealpath.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_RealpathCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockRealpath.RLock();
  const calls = receiver!.calls.Realpath;
  receiver!.lockRealpath.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.Remove","kind":"method","status":"implemented","sigHash":"7d8df0dc6be62219184399a12a856ac77c0b32006330b2cbca836259a2270706"}
 *
 * Go source:
 * func (mock *FSMock) Remove(path string) error {
 * 	if mock.RemoveFunc == nil {
 * 		panic("FSMock.RemoveFunc: method is nil but FS.Remove was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockRemove.Lock()
 * 	mock.calls.Remove = append(mock.calls.Remove, callInfo)
 * 	mock.lockRemove.Unlock()
 * 	return mock.RemoveFunc(path)
 * }
 */
export function FSMock_Remove(receiver: GoPtr<FSMock>, path: string): GoError {
  if (receiver!.RemoveFunc === undefined) {
    throw new globalThis.Error("FSMock.RemoveFunc: method is nil but FS.Remove was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockRemove.Lock();
  receiver!.calls.Remove = GoAppend(receiver!.calls.Remove, callInfo);
  receiver!.lockRemove.Unlock();
  return receiver!.RemoveFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.RemoveCalls","kind":"method","status":"implemented","sigHash":"eefb07130f8be36f7d925bbd8895e4433155eb4a1024f48d337edc6817748bd2"}
 *
 * Go source:
 * func (mock *FSMock) RemoveCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockRemove.RLock()
 * 	calls = mock.calls.Remove
 * 	mock.lockRemove.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_RemoveCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockRemove.RLock();
  const calls = receiver!.calls.Remove;
  receiver!.lockRemove.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.Stat","kind":"method","status":"implemented","sigHash":"d5ecfa15099661274fb4d56a2785a328a4926f74f87271507a70ec827ed636c8"}
 *
 * Go source:
 * func (mock *FSMock) Stat(path string) vfs.FileInfo {
 * 	if mock.StatFunc == nil {
 * 		panic("FSMock.StatFunc: method is nil but FS.Stat was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 	}{
 * 		Path: path,
 * 	}
 * 	mock.lockStat.Lock()
 * 	mock.calls.Stat = append(mock.calls.Stat, callInfo)
 * 	mock.lockStat.Unlock()
 * 	return mock.StatFunc(path)
 * }
 */
export function FSMock_Stat(receiver: GoPtr<FSMock>, path: string): GoInterface<FileInfo> {
  if (receiver!.StatFunc === undefined) {
    throw new globalThis.Error("FSMock.StatFunc: method is nil but FS.Stat was just called");
  }
  const callInfo = { Path: path };
  receiver!.lockStat.Lock();
  receiver!.calls.Stat = GoAppend(receiver!.calls.Stat, callInfo);
  receiver!.lockStat.Unlock();
  return receiver!.StatFunc(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.StatCalls","kind":"method","status":"implemented","sigHash":"44690b6d9858ba7a89f4f473b4ec5c443c374f7949e32105703d790f75785118"}
 *
 * Go source:
 * func (mock *FSMock) StatCalls() []struct {
 * 	Path string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 	}
 * 	mock.lockStat.RLock()
 * 	calls = mock.calls.Stat
 * 	mock.lockStat.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_StatCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string }> {
  receiver!.lockStat.RLock();
  const calls = receiver!.calls.Stat;
  receiver!.lockStat.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"1a620fe4e7e2d473a90ba14a131d2c12eed0c7159ba06a518acb4ca9ff2e987d"}
 *
 * Go source:
 * func (mock *FSMock) UseCaseSensitiveFileNames() bool {
 * 	if mock.UseCaseSensitiveFileNamesFunc == nil {
 * 		panic("FSMock.UseCaseSensitiveFileNamesFunc: method is nil but FS.UseCaseSensitiveFileNames was just called")
 * 	}
 * 	callInfo := struct{}{}
 * 	mock.lockUseCaseSensitiveFileNames.Lock()
 * 	mock.calls.UseCaseSensitiveFileNames = append(mock.calls.UseCaseSensitiveFileNames, callInfo)
 * 	mock.lockUseCaseSensitiveFileNames.Unlock()
 * 	return mock.UseCaseSensitiveFileNamesFunc()
 * }
 */
export function FSMock_UseCaseSensitiveFileNames(receiver: GoPtr<FSMock>): bool {
  if (receiver!.UseCaseSensitiveFileNamesFunc === undefined) {
    throw new globalThis.Error("FSMock.UseCaseSensitiveFileNamesFunc: method is nil but FS.UseCaseSensitiveFileNames was just called");
  }
  const callInfo = {};
  receiver!.lockUseCaseSensitiveFileNames.Lock();
  receiver!.calls.UseCaseSensitiveFileNames = GoAppend(receiver!.calls.UseCaseSensitiveFileNames, callInfo);
  receiver!.lockUseCaseSensitiveFileNames.Unlock();
  return receiver!.UseCaseSensitiveFileNamesFunc();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.UseCaseSensitiveFileNamesCalls","kind":"method","status":"implemented","sigHash":"a1c2e65b8db74f700317add4708b95aeb8616c5235741fcd987298bd214b6145"}
 *
 * Go source:
 * func (mock *FSMock) UseCaseSensitiveFileNamesCalls() []struct{} {
 * 	var calls []struct{}
 * 	mock.lockUseCaseSensitiveFileNames.RLock()
 * 	calls = mock.calls.UseCaseSensitiveFileNames
 * 	mock.lockUseCaseSensitiveFileNames.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_UseCaseSensitiveFileNamesCalls(receiver: GoPtr<FSMock>): GoSlice<{ readonly __tsgoEmpty?: never }> {
  receiver!.lockUseCaseSensitiveFileNames.RLock();
  const calls = receiver!.calls.UseCaseSensitiveFileNames;
  receiver!.lockUseCaseSensitiveFileNames.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.WalkDir","kind":"method","status":"implemented","sigHash":"c8714cff80dbc3d87a17ba261c5a9ee9b091f972431a5ee39460f162ba81bd52"}
 *
 * Go source:
 * func (mock *FSMock) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
 * 	if mock.WalkDirFunc == nil {
 * 		panic("FSMock.WalkDirFunc: method is nil but FS.WalkDir was just called")
 * 	}
 * 	callInfo := struct {
 * 		Root   string
 * 		WalkFn vfs.WalkDirFunc
 * 	}{
 * 		Root:   root,
 * 		WalkFn: walkFn,
 * 	}
 * 	mock.lockWalkDir.Lock()
 * 	mock.calls.WalkDir = append(mock.calls.WalkDir, callInfo)
 * 	mock.lockWalkDir.Unlock()
 * 	return mock.WalkDirFunc(root, walkFn)
 * }
 */
export function FSMock_WalkDir(receiver: GoPtr<FSMock>, root: string, walkFn: WalkDirFunc): GoError {
  if (receiver!.WalkDirFunc === undefined) {
    throw new globalThis.Error("FSMock.WalkDirFunc: method is nil but FS.WalkDir was just called");
  }
  const callInfo = { Root: root, WalkFn: walkFn };
  receiver!.lockWalkDir.Lock();
  receiver!.calls.WalkDir = GoAppend(receiver!.calls.WalkDir, callInfo);
  receiver!.lockWalkDir.Unlock();
  return receiver!.WalkDirFunc(root, walkFn);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.WalkDirCalls","kind":"method","status":"implemented","sigHash":"0d9ada5cf88844cfada851cba8c7dcd7b3fc523de1f7173002a7ff1633578703"}
 *
 * Go source:
 * func (mock *FSMock) WalkDirCalls() []struct {
 * 	Root   string
 * 	WalkFn vfs.WalkDirFunc
 * } {
 * 	var calls []struct {
 * 		Root   string
 * 		WalkFn vfs.WalkDirFunc
 * 	}
 * 	mock.lockWalkDir.RLock()
 * 	calls = mock.calls.WalkDir
 * 	mock.lockWalkDir.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_WalkDirCalls(receiver: GoPtr<FSMock>): GoSlice<{ Root: string; WalkFn: WalkDirFunc }> {
  receiver!.lockWalkDir.RLock();
  const calls = receiver!.calls.WalkDir;
  receiver!.lockWalkDir.RUnlock();
  return calls;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.WriteFile","kind":"method","status":"implemented","sigHash":"2f6c5cc129ed7b485a747ae62a501c3846be5431d86f300b0de5e93371f191c2"}
 *
 * Go source:
 * func (mock *FSMock) WriteFile(path string, data string) error {
 * 	if mock.WriteFileFunc == nil {
 * 		panic("FSMock.WriteFileFunc: method is nil but FS.WriteFile was just called")
 * 	}
 * 	callInfo := struct {
 * 		Path string
 * 		Data string
 * 	}{
 * 		Path: path,
 * 		Data: data,
 * 	}
 * 	mock.lockWriteFile.Lock()
 * 	mock.calls.WriteFile = append(mock.calls.WriteFile, callInfo)
 * 	mock.lockWriteFile.Unlock()
 * 	return mock.WriteFileFunc(path, data)
 * }
 */
export function FSMock_WriteFile(receiver: GoPtr<FSMock>, path: string, data: string): GoError {
  if (receiver!.WriteFileFunc === undefined) {
    throw new globalThis.Error("FSMock.WriteFileFunc: method is nil but FS.WriteFile was just called");
  }
  const callInfo = { Path: path, Data: data };
  receiver!.lockWriteFile.Lock();
  receiver!.calls.WriteFile = GoAppend(receiver!.calls.WriteFile, callInfo);
  receiver!.lockWriteFile.Unlock();
  return receiver!.WriteFileFunc(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmock/mock_generated.go::method::FSMock.WriteFileCalls","kind":"method","status":"implemented","sigHash":"db995a84c327c9e7813deacf5bcf8e6c77c15e44dac464da80df57fbd5a1eede"}
 *
 * Go source:
 * func (mock *FSMock) WriteFileCalls() []struct {
 * 	Path string
 * 	Data string
 * } {
 * 	var calls []struct {
 * 		Path string
 * 		Data string
 * 	}
 * 	mock.lockWriteFile.RLock()
 * 	calls = mock.calls.WriteFile
 * 	mock.lockWriteFile.RUnlock()
 * 	return calls
 * }
 */
export function FSMock_WriteFileCalls(receiver: GoPtr<FSMock>): GoSlice<{ Path: string; Data: string }> {
  receiver!.lockWriteFile.RLock();
  const calls = receiver!.calls.WriteFile;
  receiver!.lockWriteFile.RUnlock();
  return calls;
}
