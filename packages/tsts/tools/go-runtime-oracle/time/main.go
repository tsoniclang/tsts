package main

import (
	"encoding/json"
	"os"
	"strconv"
	"time"
)

type durationReport struct {
	Minimum     string `json:"minimum"`
	Maximum     string `json:"maximum"`
	Millisecond string `json:"millisecond"`
	Second      string `json:"second"`
	Minute      string `json:"minute"`
}

type zeroReport struct {
	FreshAddresses     bool  `json:"freshAddresses"`
	RawEqual           bool  `json:"rawEqual"`
	IsZero             bool  `json:"isZero"`
	UnixMilliseconds   int64 `json:"unixMilliseconds"`
	EpochIsZero        bool  `json:"epochIsZero"`
	EpochMilliseconds  int64 `json:"epochMilliseconds"`
	LocalYearOneIsZero bool  `json:"localYearOneIsZero"`
	SameInstant        bool  `json:"sameInstant"`
	SameRepresentation bool  `json:"sameRepresentation"`
}

type copyReport struct {
	FreshAddress               bool   `json:"freshAddress"`
	SameRepresentation         bool   `json:"sameRepresentation"`
	SameInstant                bool   `json:"sameInstant"`
	Difference                 string `json:"difference"`
	WallOnlySameInstant        bool   `json:"wallOnlySameInstant"`
	WallOnlySameRepresentation bool   `json:"wallOnlySameRepresentation"`
}

type normalizationReport struct {
	NegativeNanosecondDifference string `json:"negativeNanosecondDifference"`
	NegativeNanosecondMillis     int64  `json:"negativeNanosecondMillis"`
	BeforeEpochDifference        string `json:"beforeEpochDifference"`
	BeforeEpochMillis            int64  `json:"beforeEpochMillis"`
	OverflowNanosecondDifference string `json:"overflowNanosecondDifference"`
	OverflowNanosecondMillis     int64  `json:"overflowNanosecondMillis"`
}

type subtractionReport struct {
	Maximum string `json:"maximum"`
	Minimum string `json:"minimum"`
}

type report struct {
	Duration      durationReport      `json:"duration"`
	Zero          zeroReport          `json:"zero"`
	Copy          copyReport          `json:"copy"`
	Normalization normalizationReport `json:"normalization"`
	Subtraction   subtractionReport   `json:"subtraction"`
}

func main() {
	zero, anotherZero := time.Time{}, time.Time{}
	epoch := time.UnixMilli(0)
	localYearOne := time.Unix(-62_135_596_800, 0)
	now := time.Now()
	nowCopy := now
	wallOnlyNow := now.Round(0)
	negativeNanosecond := time.Unix(1, -1)
	beforeEpoch := time.Unix(0, -1)
	overflowNanosecond := time.Unix(0, 1_000_000_001)
	farFuture := time.Unix(10_000_000_000, 0)

	result := report{
		Duration: durationReport{
			Minimum:     durationNanoseconds(time.Duration(-1 << 63)),
			Maximum:     durationNanoseconds(time.Duration(1<<63 - 1)),
			Millisecond: durationNanoseconds(time.Millisecond),
			Second:      durationNanoseconds(time.Second),
			Minute:      durationNanoseconds(time.Minute),
		},
		Zero: zeroReport{
			FreshAddresses:     &zero != &anotherZero,
			RawEqual:           zero == anotherZero,
			IsZero:             zero.IsZero(),
			UnixMilliseconds:   zero.UnixMilli(),
			EpochIsZero:        epoch.IsZero(),
			EpochMilliseconds:  epoch.UnixMilli(),
			LocalYearOneIsZero: localYearOne.IsZero(),
			SameInstant:        zero.Equal(localYearOne),
			SameRepresentation: zero == localYearOne,
		},
		Copy: copyReport{
			FreshAddress:               &now != &nowCopy,
			SameRepresentation:         now == nowCopy,
			SameInstant:                now.Equal(nowCopy),
			Difference:                 durationNanoseconds(nowCopy.Sub(now)),
			WallOnlySameInstant:        now.Equal(wallOnlyNow),
			WallOnlySameRepresentation: now == wallOnlyNow,
		},
		Normalization: normalizationReport{
			NegativeNanosecondDifference: durationNanoseconds(negativeNanosecond.Sub(epoch)),
			NegativeNanosecondMillis:     negativeNanosecond.UnixMilli(),
			BeforeEpochDifference:        durationNanoseconds(beforeEpoch.Sub(epoch)),
			BeforeEpochMillis:            beforeEpoch.UnixMilli(),
			OverflowNanosecondDifference: durationNanoseconds(overflowNanosecond.Sub(epoch)),
			OverflowNanosecondMillis:     overflowNanosecond.UnixMilli(),
		},
		Subtraction: subtractionReport{
			Maximum: durationNanoseconds(farFuture.Sub(epoch)),
			Minimum: durationNanoseconds(epoch.Sub(farFuture)),
		},
	}

	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		panic(err)
	}
}

func durationNanoseconds(duration time.Duration) string {
	return strconv.FormatInt(int64(duration), 10)
}
