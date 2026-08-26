import { GoArray } from "@gotots/runtime/array.js";
import type {
  gostring,
  int,
  int8,
  int16,
  int32,
  int64,
  uint,
  uint8,
  uint16,
  uint32,
  uint64,
  uintptr,
} from "@gotots/runtime/scalars.js";
import { RuntimeSlice, goSliceAddress } from "@gotots/runtime/slice.js";
import type {
  $goInterface$Interface_Method_Error_void_to_string as GoInterface,
} from "../../../../../support/interface-contracts.js";
import { $goInterfaceAdapter$Named_syscall$Errno } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error } from "../../../../../support/provider-interface-bridges.js";
import * as fs from "@gotots/gostdlib/io/fs.js";
import * as os from "@gotots/gostdlib/os.js";
import * as filepath from "@gotots/gostdlib/path/filepath.js";
import * as syscall from "@gotots/gostdlib/syscall.js";
import { allocatePointer, loadPointer } from "@tsonic/core/lang.js";
import type { Pointer } from "@tsonic/core/types.js";

type GoFailure = GoInterface | undefined;

const openFiles = new Map<number, os.File>();

function providerFailure(
  failure: import("@gotots/runtime/interface-value.js").GoError | undefined,
): GoFailure {
  return $goProviderInterfaceBridge$Named_error.$from(failure);
}

function errnoFailure(value: bigint): GoInterface {
  return new $goInterfaceAdapter$Named_syscall$Errno(new syscall.Errno(value));
}

function unsupported(): GoInterface {
  return errnoFailure(95n);
}

type Fsid$Storage = {
  Val: GoArray<int32, 2>;
};

class Fsid {
  private constructor(private readonly storage: Fsid$Storage) {}

  static $make(value: GoArray<int32, 2>): Fsid {
    return new Fsid({ Val: value });
  }

  static $storageOf(source: Fsid): Fsid$Storage {
    return source.storage;
  }

  static $fromStorage(storage: Fsid$Storage): Fsid {
    return new Fsid(storage);
  }

  static $zero(): Fsid {
    return Fsid.$make(GoArray.zero<int32, 2>(2, 0));
  }

  get Val(): GoArray<int32, 2> {
    return this.storage.Val;
  }

  set Val(value: GoArray<int32, 2>) {
    this.storage.Val = value;
  }
}

type InotifyEvent$Storage = {
  Wd: int32;
  Mask: uint32;
  Cookie: uint32;
  Len: uint32;
};

class InotifyEvent {
  private constructor(private readonly storage: InotifyEvent$Storage) {}

  static $make(wd: int32, mask: uint32, cookie: uint32, length: uint32): InotifyEvent {
    return new InotifyEvent({ Wd: wd, Mask: mask, Cookie: cookie, Len: length });
  }

  static $storageOf(source: InotifyEvent): InotifyEvent$Storage {
    return source.storage;
  }

  static $fromStorage(storage: InotifyEvent$Storage): InotifyEvent {
    return new InotifyEvent(storage);
  }

  static $zero(): InotifyEvent {
    return InotifyEvent.$make(0, 0, 0, 0);
  }

  get Wd(): int32 { return this.storage.Wd; }
  set Wd(value: int32) { this.storage.Wd = value; }
  get Mask(): uint32 { return this.storage.Mask; }
  set Mask(value: uint32) { this.storage.Mask = value; }
  get Cookie(): uint32 { return this.storage.Cookie; }
  set Cookie(value: uint32) { this.storage.Cookie = value; }
  get Len(): uint32 { return this.storage.Len; }
  set Len(value: uint32) { this.storage.Len = value; }
}

type PollFd$Storage = {
  Fd: int32;
  Events: int16;
  Revents: int16;
};

class PollFd {
  private constructor(private readonly storage: PollFd$Storage) {}

  static $make(fd: int32, events: int16, revents: int16): PollFd {
    return new PollFd({ Fd: fd, Events: events, Revents: revents });
  }

  static $storageOf(source: PollFd): PollFd$Storage {
    return source.storage;
  }

  static $fromStorage(storage: PollFd$Storage): PollFd {
    return new PollFd(storage);
  }

  static $zero(): PollFd {
    return PollFd.$make(0, 0, 0);
  }

  get Fd(): int32 { return this.storage.Fd; }
  set Fd(value: int32) { this.storage.Fd = value; }
  get Events(): int16 { return this.storage.Events; }
  set Events(value: int16) { this.storage.Events = value; }
  get Revents(): int16 { return this.storage.Revents; }
  set Revents(value: int16) { this.storage.Revents = value; }
}

type Winsize$Storage = {
  Row: uint16;
  Col: uint16;
  Xpixel: uint16;
  Ypixel: uint16;
};

export class Winsize {
  private constructor(private readonly storage: Winsize$Storage) {}

  static $make(row: uint16, col: uint16, xpixel: uint16, ypixel: uint16): Winsize {
    return new Winsize({ Row: row, Col: col, Xpixel: xpixel, Ypixel: ypixel });
  }

  static $storageOf(source: Winsize): Winsize$Storage { return source.storage; }
  static $fromStorage(storage: Winsize$Storage): Winsize { return new Winsize(storage); }
  static $zero(): Winsize { return Winsize.$make(0, 0, 0, 0); }
  get Row(): uint16 { return this.storage.Row; }
  set Row(value: uint16) { this.storage.Row = value; }
  get Col(): uint16 { return this.storage.Col; }
  set Col(value: uint16) { this.storage.Col = value; }
  get Xpixel(): uint16 { return this.storage.Xpixel; }
  set Xpixel(value: uint16) { this.storage.Xpixel = value; }
  get Ypixel(): uint16 { return this.storage.Ypixel; }
  set Ypixel(value: uint16) { this.storage.Ypixel = value; }
}

type FanotifyEventMetadata$Storage = {
  Event_len: uint32;
  Vers: uint8;
  Reserved: uint8;
  Metadata_len: uint16;
  Mask: uint64;
  Fd: int32;
  Pid: int32;
};

class FanotifyEventMetadata {
  private constructor(private readonly storage: FanotifyEventMetadata$Storage) {}

  static $make(
    eventLength: uint32,
    version: uint8,
    reserved: uint8,
    metadataLength: uint16,
    mask: uint64,
    fd: int32,
    pid: int32,
  ): FanotifyEventMetadata {
    return new FanotifyEventMetadata({
      Event_len: eventLength,
      Vers: version,
      Reserved: reserved,
      Metadata_len: metadataLength,
      Mask: mask,
      Fd: fd,
      Pid: pid,
    });
  }

  static $storageOf(source: FanotifyEventMetadata): FanotifyEventMetadata$Storage {
    return source.storage;
  }

  static $fromStorage(storage: FanotifyEventMetadata$Storage): FanotifyEventMetadata {
    return new FanotifyEventMetadata(storage);
  }

  static $zero(): FanotifyEventMetadata {
    return FanotifyEventMetadata.$make(0, 0, 0, 0, 0n, 0, 0);
  }

  get Event_len(): uint32 { return this.storage.Event_len; }
  set Event_len(value: uint32) { this.storage.Event_len = value; }
  get Vers(): uint8 { return this.storage.Vers; }
  set Vers(value: uint8) { this.storage.Vers = value; }
  get Reserved(): uint8 { return this.storage.Reserved; }
  set Reserved(value: uint8) { this.storage.Reserved = value; }
  get Metadata_len(): uint16 { return this.storage.Metadata_len; }
  set Metadata_len(value: uint16) { this.storage.Metadata_len = value; }
  get Mask(): uint64 { return this.storage.Mask; }
  set Mask(value: uint64) { this.storage.Mask = value; }
  get Fd(): int32 { return this.storage.Fd; }
  set Fd(value: int32) { this.storage.Fd = value; }
  get Pid(): int32 { return this.storage.Pid; }
  set Pid(value: int32) { this.storage.Pid = value; }
}

type Timespec$Storage = {
  Sec: int64;
  Nsec: int64;
};

export class Timespec {
  private constructor(private readonly storage: Timespec$Storage) {}
  static $make(sec: int64, nsec: int64): Timespec { return new Timespec({ Sec: sec, Nsec: nsec }); }
  static $storageOf(source: Timespec): Timespec$Storage { return source.storage; }
  static $fromStorage(storage: Timespec$Storage): Timespec { return new Timespec(storage); }
  static $zero(): Timespec { return Timespec.$make(0n, 0n); }
  get Sec(): int64 { return this.storage.Sec; }
  set Sec(value: int64) { this.storage.Sec = value; }
  get Nsec(): int64 { return this.storage.Nsec; }
  set Nsec(value: int64) { this.storage.Nsec = value; }
}

type Stat_t$Storage = {
  Dev: uint64;
  Ino: uint64;
  Nlink: uint64;
  Mode: uint32;
  Uid: uint32;
  Gid: uint32;
  Rdev: uint64;
  Size: int64;
  Blksize: int64;
  Blocks: int64;
  Atim: Timespec$Storage;
  Mtim: Timespec$Storage;
  Ctim: Timespec$Storage;
};

export class Stat_t {
  private constructor(private readonly storage: Stat_t$Storage) {}

  static $make(
    dev: uint64,
    ino: uint64,
    nlink: uint64,
    mode: uint32,
    uid: uint32,
    gid: uint32,
    rdev: uint64,
    size: int64,
    blockSize: int64,
    blocks: int64,
    accessTime: Timespec,
    modificationTime: Timespec,
    changeTime: Timespec,
  ): Stat_t {
    return new Stat_t({
      Dev: dev,
      Ino: ino,
      Nlink: nlink,
      Mode: mode,
      Uid: uid,
      Gid: gid,
      Rdev: rdev,
      Size: size,
      Blksize: blockSize,
      Blocks: blocks,
      Atim: Timespec.$storageOf(accessTime),
      Mtim: Timespec.$storageOf(modificationTime),
      Ctim: Timespec.$storageOf(changeTime),
    });
  }

  static $storageOf(source: Stat_t): Stat_t$Storage { return source.storage; }
  static $fromStorage(storage: Stat_t$Storage): Stat_t { return new Stat_t(storage); }
  static $zero(): Stat_t {
    return Stat_t.$make(0n, 0n, 0n, 0, 0, 0, 0n, 0n, 0n, 0n, Timespec.$zero(), Timespec.$zero(), Timespec.$zero());
  }

  get Dev(): uint64 { return this.storage.Dev; }
  set Dev(value: uint64) { this.storage.Dev = value; }
  get Ino(): uint64 { return this.storage.Ino; }
  set Ino(value: uint64) { this.storage.Ino = value; }
  get Nlink(): uint64 { return this.storage.Nlink; }
  set Nlink(value: uint64) { this.storage.Nlink = value; }
  get Mode(): uint32 { return this.storage.Mode; }
  set Mode(value: uint32) { this.storage.Mode = value; }
  get Uid(): uint32 { return this.storage.Uid; }
  set Uid(value: uint32) { this.storage.Uid = value; }
  get Gid(): uint32 { return this.storage.Gid; }
  set Gid(value: uint32) { this.storage.Gid = value; }
  get Rdev(): uint64 { return this.storage.Rdev; }
  set Rdev(value: uint64) { this.storage.Rdev = value; }
  get Size(): int64 { return this.storage.Size; }
  set Size(value: int64) { this.storage.Size = value; }
  get Blksize(): int64 { return this.storage.Blksize; }
  set Blksize(value: int64) { this.storage.Blksize = value; }
  get Blocks(): int64 { return this.storage.Blocks; }
  set Blocks(value: int64) { this.storage.Blocks = value; }
  get Atim(): Timespec { return Timespec.$fromStorage(this.storage.Atim); }
  set Atim(value: Timespec) { this.storage.Atim = Timespec.$storageOf(value); }
  get Mtim(): Timespec { return Timespec.$fromStorage(this.storage.Mtim); }
  set Mtim(value: Timespec) { this.storage.Mtim = Timespec.$storageOf(value); }
  get Ctim(): Timespec { return Timespec.$fromStorage(this.storage.Ctim); }
  set Ctim(value: Timespec) { this.storage.Ctim = Timespec.$storageOf(value); }
}

type Dirent$Storage = {
  Ino: uint64;
  Off: int64;
  Reclen: uint16;
  Type: uint8;
  Name: GoArray<int8, 256>;
};

class Dirent {
  private constructor(private readonly storage: Dirent$Storage) {}
  static $make(
    ino: uint64,
    offset: int64,
    recordLength: uint16,
    type: uint8,
    name: GoArray<int8, 256>,
  ): Dirent {
    return new Dirent({ Ino: ino, Off: offset, Reclen: recordLength, Type: type, Name: name });
  }
  static $storageOf(source: Dirent): Dirent$Storage { return source.storage; }
  static $fromStorage(storage: Dirent$Storage): Dirent { return new Dirent(storage); }
  static $zero(): Dirent { return Dirent.$make(0n, 0n, 0, 0, GoArray.zero<int8, 256>(256, 0)); }
  get Ino(): uint64 { return this.storage.Ino; }
  set Ino(value: uint64) { this.storage.Ino = value; }
  get Off(): int64 { return this.storage.Off; }
  set Off(value: int64) { this.storage.Off = value; }
  get Reclen(): uint16 { return this.storage.Reclen; }
  set Reclen(value: uint16) { this.storage.Reclen = value; }
  get Type(): uint8 { return this.storage.Type; }
  set Type(value: uint8) { this.storage.Type = value; }
  get Name(): GoArray<int8, 256> { return this.storage.Name; }
  set Name(value: GoArray<int8, 256>) { this.storage.Name = value; }
}

type Sigset_t$Storage = {
  Val: GoArray<uint64, 16>;
};

class Sigset_t {
  private constructor(private readonly storage: Sigset_t$Storage) {}
  static $make(value: GoArray<uint64, 16>): Sigset_t { return new Sigset_t({ Val: value }); }
  static $storageOf(source: Sigset_t): Sigset_t$Storage { return source.storage; }
  static $fromStorage(storage: Sigset_t$Storage): Sigset_t { return new Sigset_t(storage); }
  static $zero(): Sigset_t { return Sigset_t.$make(GoArray.zero<uint64, 16>(16, 0n)); }
  get Val(): GoArray<uint64, 16> { return this.storage.Val; }
  set Val(value: GoArray<uint64, 16>) { this.storage.Val = value; }
}

type Termios$Storage = {
  Iflag: uint32;
  Oflag: uint32;
  Cflag: uint32;
  Lflag: uint32;
  Line: uint8;
  Cc: GoArray<uint8, 19>;
  Ispeed: uint32;
  Ospeed: uint32;
};

export class Termios {
  private constructor(private readonly storage: Termios$Storage) {}
  static $make(
    inputFlags: uint32,
    outputFlags: uint32,
    controlFlags: uint32,
    localFlags: uint32,
    line: uint8,
    controlCharacters: GoArray<uint8, 19>,
    inputSpeed: uint32,
    outputSpeed: uint32,
  ): Termios {
    return new Termios({
      Iflag: inputFlags,
      Oflag: outputFlags,
      Cflag: controlFlags,
      Lflag: localFlags,
      Line: line,
      Cc: controlCharacters,
      Ispeed: inputSpeed,
      Ospeed: outputSpeed,
    });
  }
  static $storageOf(source: Termios): Termios$Storage { return source.storage; }
  static $fromStorage(storage: Termios$Storage): Termios { return new Termios(storage); }
  static $zero(): Termios { return Termios.$make(0, 0, 0, 0, 0, GoArray.zero<uint8, 19>(19, 0), 0, 0); }
  get Iflag(): uint32 { return this.storage.Iflag; }
  set Iflag(value: uint32) { this.storage.Iflag = value; }
  get Oflag(): uint32 { return this.storage.Oflag; }
  set Oflag(value: uint32) { this.storage.Oflag = value; }
  get Cflag(): uint32 { return this.storage.Cflag; }
  set Cflag(value: uint32) { this.storage.Cflag = value; }
  get Lflag(): uint32 { return this.storage.Lflag; }
  set Lflag(value: uint32) { this.storage.Lflag = value; }
  get Line(): uint8 { return this.storage.Line; }
  set Line(value: uint8) { this.storage.Line = value; }
  get Cc(): GoArray<uint8, 19> { return this.storage.Cc; }
  set Cc(value: GoArray<uint8, 19>) { this.storage.Cc = value; }
  get Ispeed(): uint32 { return this.storage.Ispeed; }
  set Ispeed(value: uint32) { this.storage.Ispeed = value; }
  get Ospeed(): uint32 { return this.storage.Ospeed; }
  set Ospeed(value: uint32) { this.storage.Ospeed = value; }
}

type Statfs_t$Storage = {
  Type: int64;
  Bsize: int64;
  Blocks: uint64;
  Bfree: uint64;
  Bavail: uint64;
  Files: uint64;
  Ffree: uint64;
  Fsid: Fsid$Storage;
  Namelen: int64;
  Frsize: int64;
  Flags: int64;
  Spare: GoArray<int64, 4>;
};

class Statfs_t {
  private constructor(private readonly storage: Statfs_t$Storage) {}
  static $make(
    type: int64,
    blockSize: int64,
    blocks: uint64,
    freeBlocks: uint64,
    availableBlocks: uint64,
    files: uint64,
    freeFiles: uint64,
    fsid: Fsid,
    nameLength: int64,
    fragmentSize: int64,
    flags: int64,
    spare: GoArray<int64, 4>,
  ): Statfs_t {
    return new Statfs_t({
      Type: type,
      Bsize: blockSize,
      Blocks: blocks,
      Bfree: freeBlocks,
      Bavail: availableBlocks,
      Files: files,
      Ffree: freeFiles,
      Fsid: Fsid.$storageOf(fsid),
      Namelen: nameLength,
      Frsize: fragmentSize,
      Flags: flags,
      Spare: spare,
    });
  }
  static $storageOf(source: Statfs_t): Statfs_t$Storage { return source.storage; }
  static $fromStorage(storage: Statfs_t$Storage): Statfs_t { return new Statfs_t(storage); }
  static $zero(): Statfs_t {
    return Statfs_t.$make(0n, 0n, 0n, 0n, 0n, 0n, 0n, Fsid.$zero(), 0n, 0n, 0n, GoArray.zero<int64, 4>(4, 0n));
  }
  get Type(): int64 { return this.storage.Type; }
  set Type(value: int64) { this.storage.Type = value; }
  get Bsize(): int64 { return this.storage.Bsize; }
  set Bsize(value: int64) { this.storage.Bsize = value; }
  get Blocks(): uint64 { return this.storage.Blocks; }
  set Blocks(value: uint64) { this.storage.Blocks = value; }
  get Bfree(): uint64 { return this.storage.Bfree; }
  set Bfree(value: uint64) { this.storage.Bfree = value; }
  get Bavail(): uint64 { return this.storage.Bavail; }
  set Bavail(value: uint64) { this.storage.Bavail = value; }
  get Files(): uint64 { return this.storage.Files; }
  set Files(value: uint64) { this.storage.Files = value; }
  get Ffree(): uint64 { return this.storage.Ffree; }
  set Ffree(value: uint64) { this.storage.Ffree = value; }
  get Fsid(): Fsid { return Fsid.$fromStorage(this.storage.Fsid); }
  set Fsid(value: Fsid) { this.storage.Fsid = Fsid.$storageOf(value); }
  get Namelen(): int64 { return this.storage.Namelen; }
  set Namelen(value: int64) { this.storage.Namelen = value; }
  get Frsize(): int64 { return this.storage.Frsize; }
  set Frsize(value: int64) { this.storage.Frsize = value; }
  get Flags(): int64 { return this.storage.Flags; }
  set Flags(value: int64) { this.storage.Flags = value; }
  get Spare(): GoArray<int64, 4> { return this.storage.Spare; }
  set Spare(value: GoArray<int64, 4>) { this.storage.Spare = value; }
}

class FileHandle {
  private constructor(
    private readonly handleType: int32,
    private readonly bytes: RuntimeSlice<uint8>,
  ) {}

  static $zero(): FileHandle {
    return new FileHandle(0, RuntimeSlice.nil<uint8>());
  }

  static $copy(source: FileHandle): FileHandle {
    return new FileHandle(source.handleType, source.bytes);
  }

  static Bytes(handle: Pointer<FileHandle> | undefined): RuntimeSlice<uint8> {
    return handle === undefined ? RuntimeSlice.nil<uint8>() : loadPointer(handle).bytes;
  }

  static Size(handle: Pointer<FileHandle> | undefined): int {
    return FileHandle.Bytes(handle).length;
  }

  static Type(handle: Pointer<FileHandle> | undefined): int32 {
    return handle === undefined ? 0 : loadPointer(handle).handleType;
  }
}

const DT_DIR$uint8: uint8 = 4;
const DT_UNKNOWN$uint8: uint8 = 0;
const FANOTIFY_METADATA_VERSION$uint8: uint8 = 3;
const FAN_EVENT_INFO_TYPE_DFID$uint8: uint8 = 3;
const FAN_EVENT_INFO_TYPE_DFID_NAME$uint8: uint8 = 2;
const FAN_EVENT_INFO_TYPE_NEW_DFID_NAME$uint8: uint8 = 12;
const FAN_EVENT_INFO_TYPE_OLD_DFID_NAME$uint8: uint8 = 10;
const FAN_MARK_REMOVE$uint: uint = 2;
const FAN_MODIFY$uint64: uint64 = 2n;
const FAN_ONDIR$uint64: uint64 = 1_073_741_824n;
const FAN_Q_OVERFLOW$uint64: uint64 = 16_384n;
const FAN_RENAME$uint64: uint64 = 268_435_456n;
const IN_ISDIR$uint32: uint32 = 1_073_741_824;
const IN_MODIFY$uint32: uint32 = 2;
const IN_Q_OVERFLOW$uint32: uint32 = 16_384;
const S_IFDIR$uint32: uint32 = 16_384;
const S_IFMT$uint32: uint32 = 61_440;
const O_LARGEFILE$int: int = 0;
const SOL_SOCKET$int: int = 1;
const SO_PROTOCOL$int: int = 38;
export const TIOCGWINSZ$uint: uint = 21_523;
const AT_FDCWD$int: int = -100;
const AT_SYMLINK_NOFOLLOW$int: int = 256;
const POLLIN$int16: int16 = 1;
const SizeofInotifyEvent$int: int = 16;

const SYS_READ$uintptr: uintptr = 0;
const SYS_WRITE$uintptr: uintptr = 1;
const SYS_CLOSE$uintptr: uintptr = 3;
const SYS_MMAP$uintptr: uintptr = 9;
const SYS_MUNMAP$uintptr: uintptr = 11;
const SYS_IOCTL$uintptr: uintptr = 16;
const SYS_MREMAP$uintptr: uintptr = 25;
const SYS_GETSOCKOPT$uintptr: uintptr = 55;
const SYS_FCNTL$uintptr: uintptr = 72;
const SYS_STATFS$uintptr: uintptr = 137;
const SYS_GETDENTS64$uintptr: uintptr = 217;
const SYS_INOTIFY_ADD_WATCH$uintptr: uintptr = 254;
const SYS_INOTIFY_RM_WATCH$uintptr: uintptr = 255;
const SYS_OPENAT$uintptr: uintptr = 257;
const SYS_NEWFSTATAT$uintptr: uintptr = 262;
const SYS_READLINKAT$uintptr: uintptr = 267;
const SYS_PPOLL$uintptr: uintptr = 271;
const SYS_PIPE2$uintptr: uintptr = 293;
const SYS_INOTIFY_INIT1$uintptr: uintptr = 294;
const SYS_FANOTIFY_INIT$uintptr: uintptr = 300;
const SYS_FANOTIFY_MARK$uintptr: uintptr = 301;
const SYS_NAME_TO_HANDLE_AT$uintptr: uintptr = 303;

function EACCES$constant(): syscall.Errno { return new syscall.Errno(13n); }
function EAGAIN$constant(): syscall.Errno { return new syscall.Errno(11n); }
function EINTR$constant(): syscall.Errno { return new syscall.Errno(4n); }
function EINVAL$constant(): syscall.Errno { return new syscall.Errno(22n); }
function ENOENT$constant(): syscall.Errno { return new syscall.Errno(2n); }
function ENOTDIR$constant(): syscall.Errno { return new syscall.Errno(20n); }
function EOPNOTSUPP$constant(): syscall.Errno { return new syscall.Errno(95n); }
function EOVERFLOW$constant(): syscall.Errno { return new syscall.Errno(75n); }
function EWOULDBLOCK$constant(): syscall.Errno { return new syscall.Errno(11n); }

let EACCES = EACCES$constant();
let EAGAIN = EAGAIN$constant();
let EINTR = EINTR$constant();
let EINVAL = EINVAL$constant();
let ENOENT = ENOENT$constant();
let ENOTDIR = ENOTDIR$constant();
let EOPNOTSUPP = EOPNOTSUPP$constant();
let EOVERFLOW = EOVERFLOW$constant();
let EWOULDBLOCK = EWOULDBLOCK$constant();

export function $initialize(): void {
  EACCES = EACCES$constant();
  EAGAIN = EAGAIN$constant();
  EINTR = EINTR$constant();
  EINVAL = EINVAL$constant();
  ENOENT = ENOENT$constant();
  ENOTDIR = ENOTDIR$constant();
  EOPNOTSUPP = EOPNOTSUPP$constant();
  EOVERFLOW = EOVERFLOW$constant();
  EWOULDBLOCK = EWOULDBLOCK$constant();
}

const $state = {};

function ByteSliceFromString(value: gostring): [RuntimeSlice<uint8>, GoFailure] {
  if (value.includes("\0")) {
    return [RuntimeSlice.nil<uint8>(), errnoFailure(22n)];
  }
  const bytes = RuntimeSlice.make<uint8>(value.length + 1, null, 0);
  for (let index = 0; index < value.length; index++) {
    bytes.set(index, value.charCodeAt(index));
  }
  return [bytes, undefined];
}

function BytePtrFromString(value: gostring): [Pointer<uint8> | undefined, GoFailure] {
  const [bytes, failure] = ByteSliceFromString(value);
  return failure === undefined ? [goSliceAddress<uint8>(bytes, 0), undefined] : [undefined, failure];
}

export function Open(path: gostring, _mode: int, _permissions: uint32): [int, GoFailure] {
  const [file, failure] = os.Open(path);
  if (file === undefined) {
    return [-1, providerFailure(failure)];
  }
  const descriptor = Number(os.File.Fd(file));
  openFiles.set(descriptor, file);
  return [descriptor, undefined];
}

function Openat(
  directoryDescriptor: int,
  path: gostring,
  flags: int,
  permissions: uint32,
): [int, GoFailure] {
  if (directoryDescriptor !== AT_FDCWD$int) {
    return [-1, unsupported()];
  }
  return Open(path, flags, permissions);
}

export function Close(descriptor: int): GoFailure {
  const file = openFiles.get(descriptor);
  if (file === undefined) {
    return errnoFailure(9n);
  }
  openFiles.delete(descriptor);
  return providerFailure(os.File.Close(file));
}

function Read(descriptor: int, buffer: RuntimeSlice<uint8>): [int, GoFailure] {
  const file = openFiles.get(descriptor);
  if (file === undefined) {
    return [0, errnoFailure(9n)];
  }
  const [count, failure] = os.File.Read(file, buffer);
  return [Number(count), providerFailure(failure)];
}

function Write(descriptor: int, buffer: RuntimeSlice<uint8>): [int, GoFailure] {
  const file = openFiles.get(descriptor);
  if (file === undefined) {
    return [0, errnoFailure(9n)];
  }
  const [count, failure] = os.File.Write(file, buffer);
  return [Number(count), providerFailure(failure)];
}

export function Readlink(path: gostring, buffer: RuntimeSlice<uint8>): [int, GoFailure] {
  const [resolved, failure] = filepath.EvalSymlinks(path);
  if (failure !== undefined) {
    return [0, providerFailure(failure)];
  }
  const count = Math.min(resolved.length, buffer.length);
  for (let index = 0; index < count; index++) {
    buffer.set(index, resolved.charCodeAt(index));
  }
  return [count, undefined];
}

function Readlinkat(
  directoryDescriptor: int,
  path: gostring,
  buffer: RuntimeSlice<uint8>,
): [int, GoFailure] {
  return directoryDescriptor === AT_FDCWD$int
    ? Readlink(path, buffer)
    : [0, unsupported()];
}

function fillStat(
  information: fs.FileInfo,
  target: Pointer<Stat_t> | undefined,
): GoFailure {
  if (target === undefined) {
    return errnoFailure(14n);
  }
  const stat = loadPointer(target);
  stat.Mode = information.IsDir() ? S_IFDIR$uint32 : 32_768;
  stat.Size = information.Size();
  stat.Blksize = 4_096n;
  stat.Blocks = (stat.Size + 511n) / 512n;
  return undefined;
}

export function Stat(path: gostring, target: Pointer<Stat_t> | undefined): GoFailure {
  const [information, failure] = os.Stat(path);
  return information === undefined ? providerFailure(failure) : fillStat(information, target);
}

function Lstat(path: gostring, target: Pointer<Stat_t> | undefined): GoFailure {
  const [information, failure] = os.Lstat(path);
  return information === undefined ? providerFailure(failure) : fillStat(information, target);
}

function Fstatat(
  directoryDescriptor: int,
  path: gostring,
  target: Pointer<Stat_t> | undefined,
  flags: int,
): GoFailure {
  if (directoryDescriptor !== AT_FDCWD$int) {
    return unsupported();
  }
  return (flags & AT_SYMLINK_NOFOLLOW$int) !== 0 ? Lstat(path, target) : Stat(path, target);
}

function Statfs(path: gostring, target: Pointer<Statfs_t> | undefined): GoFailure {
  const [information, failure] = os.Stat(path);
  if (information === undefined) {
    return providerFailure(failure);
  }
  if (target === undefined) {
    return errnoFailure(14n);
  }
  const stat = loadPointer(target);
  stat.Bsize = 4_096n;
  stat.Frsize = 4_096n;
  stat.Namelen = 255n;
  return undefined;
}

function NsecToTimespec(nanoseconds: int64): Timespec {
  let seconds = nanoseconds / 1_000_000_000n;
  let remainder = nanoseconds % 1_000_000_000n;
  if (remainder < 0n) {
    remainder += 1_000_000_000n;
    seconds--;
  }
  return Timespec.$make(seconds, remainder);
}

export function IoctlGetWinsize(
  _descriptor: int,
  _request: uint,
): [Pointer<Winsize> | undefined, GoFailure] {
  return [allocatePointer(Winsize.$zero()), errnoFailure(25n)];
}

export function IoctlGetTermios(
  _descriptor: int,
  _request: uint,
): [Pointer<Termios> | undefined, GoFailure] {
  return [allocatePointer(Termios.$zero()), errnoFailure(25n)];
}

function ReadDirent(
  _descriptor: int,
  _buffer: RuntimeSlice<uint8>,
): [int, GoFailure] {
  return [0, unsupported()];
}

function Getdents(
  _descriptor: int,
  _buffer: RuntimeSlice<uint8>,
): [int, GoFailure] {
  return [0, unsupported()];
}

function Pipe2(_descriptors: RuntimeSlice<int>, _flags: int): GoFailure {
  return unsupported();
}

function Ppoll(
  _descriptors: RuntimeSlice<PollFd$Storage>,
  _timeout: Pointer<Timespec> | undefined,
  _signalMask: Pointer<Sigset_t> | undefined,
): [int, GoFailure] {
  return [0, unsupported()];
}

function Poll(
  descriptors: RuntimeSlice<PollFd$Storage>,
  _timeout: int,
): [int, GoFailure] {
  for (let index = 0; index < descriptors.length; index++) {
    descriptors.get(index).Revents = 0;
  }
  return [0, unsupported()];
}

function FanotifyInit(_flags: uint, _eventFlags: uint): [int, GoFailure] {
  return [-1, unsupported()];
}

function FanotifyMark(
  _descriptor: int,
  _flags: uint,
  _mask: uint64,
  _directoryDescriptor: int,
  _path: gostring,
): GoFailure {
  return unsupported();
}

function InotifyInit1(_flags: int): [int, GoFailure] {
  return [-1, unsupported()];
}

function InotifyAddWatch(
  _descriptor: int,
  _path: gostring,
  _mask: uint32,
): [int, GoFailure] {
  return [-1, unsupported()];
}

function InotifyRmWatch(
  _descriptor: int,
  _watchDescriptor: uint32,
): [int, GoFailure] {
  return [-1, unsupported()];
}

function NameToHandleAt(
  _directoryDescriptor: int,
  _path: gostring,
  _flags: int,
): [FileHandle, int, GoFailure] {
  return [FileHandle.$zero(), 0, unsupported()];
}

function GetsockoptInt(
  _descriptor: int,
  _level: int,
  _option: int,
): [int, GoFailure] {
  return [0, unsupported()];
}

function Syscall(
  _trap: uintptr,
  _argument1: uintptr,
  _argument2: uintptr,
  _argument3: uintptr,
): [uintptr, uintptr, syscall.Errno] {
  return [0, 0, new syscall.Errno(38n)];
}

function Syscall6(
  _trap: uintptr,
  _argument1: uintptr,
  _argument2: uintptr,
  _argument3: uintptr,
  _argument4: uintptr,
  _argument5: uintptr,
  _argument6: uintptr,
): [uintptr, uintptr, syscall.Errno] {
  return [0, 0, new syscall.Errno(38n)];
}

function RawSyscall(
  trap: uintptr,
  argument1: uintptr,
  argument2: uintptr,
  argument3: uintptr,
): [uintptr, uintptr, syscall.Errno] {
  return Syscall(trap, argument1, argument2, argument3);
}
