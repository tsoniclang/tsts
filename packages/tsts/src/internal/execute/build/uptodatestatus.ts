import type { bool, ushort } from "../../../go/scalars.js";
import type { GoPtr } from "../../../go/compat.js";
import type { Time } from "../../../go/time.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::upToDateStatusType","kind":"type","status":"implemented","sigHash":"75ef290f4654b735067a28afff3ec1bac3d48350e5823448a89ad4dc1b07c289"}
 *
 * Go source:
 * upToDateStatusType uint16
 */
export type upToDateStatusType = ushort;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::constGroup::upToDateStatusTypeConfigFileNotFound+upToDateStatusTypeBuildErrors+upToDateStatusTypeUpstreamErrors+upToDateStatusTypeUpToDate+upToDateStatusTypeUpToDateWithUpstreamTypes+upToDateStatusTypeUpToDateWithInputFileText+upToDateStatusTypeInputFileMissing+upToDateStatusTypeOutputMissing+upToDateStatusTypeInputFileNewer+upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit+upToDateStatusTypeOutOfDateBuildInfoWithErrors+upToDateStatusTypeOutOfDateOptions+upToDateStatusTypeOutOfDateRoots+upToDateStatusTypeTsVersionOutputOfDate+upToDateStatusTypeForceBuild+upToDateStatusTypeSolution","kind":"constGroup","status":"implemented","sigHash":"75c1c19a7fbc1a584e3877886c10fc73a2febc96825a7cd67e34af870802d1c8"}
 *
 * Go source:
 * const (
 * 	// Errors:
 * 
 * 	// config file was not found
 * 	upToDateStatusTypeConfigFileNotFound upToDateStatusType = iota
 * 	// found errors during build
 * 	upToDateStatusTypeBuildErrors
 * 	// did not build because upstream project has errors - and we have option to stop build on upstream errors
 * 	upToDateStatusTypeUpstreamErrors
 * 
 * 	// Its all good, no work to do
 * 	upToDateStatusTypeUpToDate
 * 
 * 	// Pseudo-builds - touch timestamps, no actual build:
 * 
 * 	// The project appears out of date because its upstream inputs are newer than its outputs,
 * 	// but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
 * 	// This means we can Pseudo-build (just touch timestamps), as if we had actually built this project.
 * 	upToDateStatusTypeUpToDateWithUpstreamTypes
 * 	// The project appears up to date and even though input file changed, its text didnt so just need to update timestamps
 * 	upToDateStatusTypeUpToDateWithInputFileText
 * 
 * 	// Needs build:
 * 
 * 	// input file is missing
 * 	upToDateStatusTypeInputFileMissing
 * 	// output file is missing
 * 	upToDateStatusTypeOutputMissing
 * 	// input file is newer than output file
 * 	upToDateStatusTypeInputFileNewer
 * 	// build info is out of date as we need to emit some files
 * 	upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit
 * 	// build info indicates that project has errors and they need to be reported
 * 	upToDateStatusTypeOutOfDateBuildInfoWithErrors
 * 	// build info options indicate there is work to do based on changes in options
 * 	upToDateStatusTypeOutOfDateOptions
 * 	// file was root when built but not any more
 * 	upToDateStatusTypeOutOfDateRoots
 * 	// buildInfo.version mismatch with current ts version
 * 	upToDateStatusTypeTsVersionOutputOfDate
 * 	// build because --force was specified
 * 	upToDateStatusTypeForceBuild
 * 
 * 	// solution file
 * 	upToDateStatusTypeSolution
 * )
 */
export const upToDateStatusTypeConfigFileNotFound: upToDateStatusType = 0 as upToDateStatusType;
export const upToDateStatusTypeBuildErrors: upToDateStatusType = 1 as upToDateStatusType;
export const upToDateStatusTypeUpstreamErrors: upToDateStatusType = 2 as upToDateStatusType;
export const upToDateStatusTypeUpToDate: upToDateStatusType = 3 as upToDateStatusType;
export const upToDateStatusTypeUpToDateWithUpstreamTypes: upToDateStatusType = 4 as upToDateStatusType;
export const upToDateStatusTypeUpToDateWithInputFileText: upToDateStatusType = 5 as upToDateStatusType;
export const upToDateStatusTypeInputFileMissing: upToDateStatusType = 6 as upToDateStatusType;
export const upToDateStatusTypeOutputMissing: upToDateStatusType = 7 as upToDateStatusType;
export const upToDateStatusTypeInputFileNewer: upToDateStatusType = 8 as upToDateStatusType;
export const upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit: upToDateStatusType = 9 as upToDateStatusType;
export const upToDateStatusTypeOutOfDateBuildInfoWithErrors: upToDateStatusType = 10 as upToDateStatusType;
export const upToDateStatusTypeOutOfDateOptions: upToDateStatusType = 11 as upToDateStatusType;
export const upToDateStatusTypeOutOfDateRoots: upToDateStatusType = 12 as upToDateStatusType;
export const upToDateStatusTypeTsVersionOutputOfDate: upToDateStatusType = 13 as upToDateStatusType;
export const upToDateStatusTypeForceBuild: upToDateStatusType = 14 as upToDateStatusType;
export const upToDateStatusTypeSolution: upToDateStatusType = 15 as upToDateStatusType;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::inputOutputName","kind":"type","status":"implemented","sigHash":"bef4e1d2b921cbe6f82e048fbf8366e7a27e0ef7c6e241d1ccd9d31b23befae6"}
 *
 * Go source:
 * inputOutputName struct {
 * 	input  string
 * 	output string
 * }
 */
export interface inputOutputName {
  input: string;
  output: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::fileAndTime","kind":"type","status":"implemented","sigHash":"527070a7ff09a0a6cd8003bc7bca450309a28b3967829d419a5642cce6d4e1e5"}
 *
 * Go source:
 * fileAndTime struct {
 * 	file string
 * 	time time.Time
 * }
 */
export interface fileAndTime {
  file: string;
  time: Time;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::inputOutputFileAndTime","kind":"type","status":"implemented","sigHash":"678b561ea186205c4918f46c4fc5c798fd6561beda7f7d248002bbf602d96298"}
 *
 * Go source:
 * inputOutputFileAndTime struct {
 * 	input     fileAndTime
 * 	output    fileAndTime
 * 	buildInfo string
 * }
 */
export interface inputOutputFileAndTime {
  input: fileAndTime;
  output: fileAndTime;
  buildInfo: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::upstreamErrors","kind":"type","status":"implemented","sigHash":"b8bdb0ca26d7a5eab9d64239e8d902a5f03f2395ea8a20669afa1c7f9a12ca18"}
 *
 * Go source:
 * upstreamErrors struct {
 * 	ref                  string
 * 	refHasUpstreamErrors bool
 * }
 */
export interface upstreamErrors {
  ref: string;
  refHasUpstreamErrors: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::type::upToDateStatus","kind":"type","status":"implemented","sigHash":"e4f8c66edc421439e4242b575bfae23bb261dc99bce9198fbb6d8f813604377e"}
 *
 * Go source:
 * upToDateStatus struct {
 * 	kind upToDateStatusType
 * 	data any
 * }
 */
export interface upToDateStatus {
  kind: upToDateStatusType;
  data: GoInterface<unknown>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.isError","kind":"method","status":"implemented","sigHash":"a179f791a9a811200bd6a8d814e3b3a53c710126dd17f1680eaab1a13bc366b1"}
 *
 * Go source:
 * func (s *upToDateStatus) isError() bool {
 * 	switch s.kind {
 * 	case upToDateStatusTypeConfigFileNotFound,
 * 		upToDateStatusTypeBuildErrors,
 * 		upToDateStatusTypeUpstreamErrors:
 * 		return true
 * 	default:
 * 		return false
 * 	}
 * }
 */
export function upToDateStatus_isError(receiver: GoPtr<upToDateStatus>): bool {
  switch (receiver!.kind) {
    case upToDateStatusTypeConfigFileNotFound:
    case upToDateStatusTypeBuildErrors:
    case upToDateStatusTypeUpstreamErrors:
      return true;
    default:
      return false;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.isPseudoBuild","kind":"method","status":"implemented","sigHash":"0d8f1726c3fb1319366e743b9f543067d6a3626c35277abc8d516756259dafc9"}
 *
 * Go source:
 * func (s *upToDateStatus) isPseudoBuild() bool {
 * 	switch s.kind {
 * 	case upToDateStatusTypeUpToDateWithUpstreamTypes,
 * 		upToDateStatusTypeUpToDateWithInputFileText:
 * 		return true
 * 	default:
 * 		return false
 * 	}
 * }
 */
export function upToDateStatus_isPseudoBuild(receiver: GoPtr<upToDateStatus>): bool {
  switch (receiver!.kind) {
    case upToDateStatusTypeUpToDateWithUpstreamTypes:
    case upToDateStatusTypeUpToDateWithInputFileText:
      return true;
    default:
      return false;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.inputOutputFileAndTime","kind":"method","status":"implemented","sigHash":"5de7a0b0501000ee62631a778edc319cc7c98e8b4f89df1575aec6ccb38c3f2f"}
 *
 * Go source:
 * func (s *upToDateStatus) inputOutputFileAndTime() *inputOutputFileAndTime {
 * 	data, ok := s.data.(*inputOutputFileAndTime)
 * 	if !ok {
 * 		return nil
 * 	}
 * 	return data
 * }
 */
export function upToDateStatus_inputOutputFileAndTime(receiver: GoPtr<upToDateStatus>): GoPtr<inputOutputFileAndTime> {
  const data = receiver!.data;
  if (data === undefined || data === null || typeof data !== "object" || !("input" in data && "output" in data && "buildInfo" in data)) {
    return undefined;
  }
  return data as inputOutputFileAndTime;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.inputOutputName","kind":"method","status":"implemented","sigHash":"327e8e770b9f91406681d66bb9c7ed62b5a94ae2aebac650e0469fd806f3dbcb"}
 *
 * Go source:
 * func (s *upToDateStatus) inputOutputName() *inputOutputName {
 * 	data, ok := s.data.(*inputOutputName)
 * 	if !ok {
 * 		return nil
 * 	}
 * 	return data
 * }
 */
export function upToDateStatus_inputOutputName(receiver: GoPtr<upToDateStatus>): GoPtr<inputOutputName> {
  const data = receiver!.data;
  if (data === undefined || data === null || typeof data !== "object" || !("input" in data && "output" in data) || "buildInfo" in data) {
    return undefined;
  }
  return data as inputOutputName;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.oldestOutputFileName","kind":"method","status":"implemented","sigHash":"3a3691fc1607c320043d04cc9a0ca79265ac2f28488e108901b3428ad48e9e91"}
 *
 * Go source:
 * func (s *upToDateStatus) oldestOutputFileName() string {
 * 	if !s.isPseudoBuild() && s.kind != upToDateStatusTypeUpToDate {
 * 		panic("only valid for up to date status of pseudo-build or up to date")
 * 	}
 * 
 * 	if inputOutputFileAndTime := s.inputOutputFileAndTime(); inputOutputFileAndTime != nil {
 * 		return inputOutputFileAndTime.output.file
 * 	}
 * 	if inputOutputName := s.inputOutputName(); inputOutputName != nil {
 * 		return inputOutputName.output
 * 	}
 * 	return s.data.(string)
 * }
 */
export function upToDateStatus_oldestOutputFileName(receiver: GoPtr<upToDateStatus>): string {
  if (!upToDateStatus_isPseudoBuild(receiver) && receiver!.kind !== upToDateStatusTypeUpToDate) {
    throw new globalThis.Error("only valid for up to date status of pseudo-build or up to date");
  }

  const ioFileAndTime = upToDateStatus_inputOutputFileAndTime(receiver);
  if (ioFileAndTime !== undefined) {
    return ioFileAndTime.output.file;
  }
  const ioName = upToDateStatus_inputOutputName(receiver);
  if (ioName !== undefined) {
    return ioName.output;
  }
  return receiver!.data as string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/execute/build/uptodatestatus.go::method::upToDateStatus.upstreamErrors","kind":"method","status":"implemented","sigHash":"a2c1b2e8a3554bef17898fddeb0d2fb9784934ea00a8425491519252c74a0ff1"}
 *
 * Go source:
 * func (s *upToDateStatus) upstreamErrors() *upstreamErrors {
 * 	return s.data.(*upstreamErrors)
 * }
 */
export function upToDateStatus_upstreamErrors(receiver: GoPtr<upToDateStatus>): GoPtr<upstreamErrors> {
  return receiver!.data as upstreamErrors;
}
