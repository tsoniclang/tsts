/**
 * Build up-to-date status model.
 *
 * Port of TS-Go `internal/execute/build/uptodatestatus.go`.
 */

export enum UpToDateStatusType {
  ConfigFileNotFound = 0,
  BuildErrors = 1,
  UpstreamErrors = 2,

  UpToDate = 3,

  UpToDateWithUpstreamTypes = 4,
  UpToDateWithInputFileText = 5,

  InputFileMissing = 6,
  OutputMissing = 7,
  InputFileNewer = 8,
  OutOfDateBuildInfoWithPendingEmit = 9,
  OutOfDateBuildInfoWithErrors = 10,
  OutOfDateOptions = 11,
  OutOfDateRoots = 12,
  TsVersionOutputOfDate = 13,
  ForceBuild = 14,

  Solution = 15,
}

export class InputOutputName {
  readonly input: string;
  readonly output: string;

  constructor(input: string, output: string) {
    this.input = input;
    this.output = output;
  }
}

export class FileAndTime {
  readonly file: string;
  readonly time: Date;

  constructor(file: string, time: Date) {
    this.file = file;
    this.time = time;
  }
}

export class InputOutputFileAndTime {
  readonly input: FileAndTime;
  readonly output: FileAndTime;
  readonly buildInfo: string;

  constructor(input: FileAndTime, output: FileAndTime, buildInfo: string) {
    this.input = input;
    this.output = output;
    this.buildInfo = buildInfo;
  }
}

export class UpstreamErrors {
  readonly ref: string;
  readonly refHasUpstreamErrors: boolean;

  constructor(ref: string, refHasUpstreamErrors: boolean) {
    this.ref = ref;
    this.refHasUpstreamErrors = refHasUpstreamErrors;
  }
}

export type UpToDateStatusData =
  | string
  | InputOutputName
  | InputOutputFileAndTime
  | UpstreamErrors
  | undefined;

function isInputOutputFileAndTime(data: UpToDateStatusData): data is InputOutputFileAndTime {
  return data instanceof InputOutputFileAndTime;
}

function isInputOutputName(data: UpToDateStatusData): data is InputOutputName {
  return data instanceof InputOutputName;
}

function isUpstreamErrors(data: UpToDateStatusData): data is UpstreamErrors {
  return data instanceof UpstreamErrors;
}

export class UpToDateStatus {
  readonly kind: UpToDateStatusType;
  readonly data: UpToDateStatusData;

  constructor(kind: UpToDateStatusType, data?: UpToDateStatusData) {
    this.kind = kind;
    this.data = data;
  }

  isError(): boolean {
    switch (this.kind) {
      case UpToDateStatusType.ConfigFileNotFound:
      case UpToDateStatusType.BuildErrors:
      case UpToDateStatusType.UpstreamErrors:
        return true;
      default:
        return false;
    }
  }

  isPseudoBuild(): boolean {
    switch (this.kind) {
      case UpToDateStatusType.UpToDateWithUpstreamTypes:
      case UpToDateStatusType.UpToDateWithInputFileText:
        return true;
      default:
        return false;
    }
  }

  inputOutputFileAndTime(): InputOutputFileAndTime | undefined {
    if (!isInputOutputFileAndTime(this.data)) return undefined;
    return this.data;
  }

  inputOutputName(): InputOutputName | undefined {
    if (!isInputOutputName(this.data)) return undefined;
    return this.data;
  }

  oldestOutputFileName(): string {
    if (!this.isPseudoBuild() && this.kind !== UpToDateStatusType.UpToDate) {
      throw new Error("only valid for up-to-date, pseudo-build, or up-to-date status");
    }

    const inputOutputFileAndTime = this.inputOutputFileAndTime();
    if (inputOutputFileAndTime !== undefined) return inputOutputFileAndTime.output.file;

    const inputOutputName = this.inputOutputName();
    if (inputOutputName !== undefined) return inputOutputName.output;

    if (typeof this.data === "string") return this.data;
    return "";
  }

  upstreamErrors(): UpstreamErrors {
    if (!isUpstreamErrors(this.data)) {
      throw new Error("up-to-date status does not carry upstream errors");
    }
    return this.data;
  }
}
