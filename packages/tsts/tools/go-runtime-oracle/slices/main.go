package main

import (
	"encoding/json"
	"os"
	"slices"
)

type nilAndEmptyReport struct {
	NilIsNil        bool `json:"nilIsNil"`
	EmptyIsNil      bool `json:"emptyIsNil"`
	NilLength       int  `json:"nilLength"`
	EmptyLength     int  `json:"emptyLength"`
	NilCapacity     int  `json:"nilCapacity"`
	EmptyCapacity   int  `json:"emptyCapacity"`
	NilResliceNil   bool `json:"nilResliceNil"`
	EmptyResliceNil bool `json:"emptyResliceNil"`
}

type sharedResliceReport struct {
	Base           []int `json:"base"`
	View           []int `json:"view"`
	ViewLength     int   `json:"viewLength"`
	ViewCapacity   int   `json:"viewCapacity"`
	BackingShared  bool  `json:"backingShared"`
	ExtendedValues []int `json:"extendedValues"`
}

type appendReport struct {
	ReuseBase         []int `json:"reuseBase"`
	ReuseBacking      []int `json:"reuseBacking"`
	ReuseView         []int `json:"reuseView"`
	ReuseShared       bool  `json:"reuseShared"`
	ReuseBaseLength   int   `json:"reuseBaseLength"`
	ReuseViewLength   int   `json:"reuseViewLength"`
	AllocateBase      []int `json:"allocateBase"`
	AllocateView      []int `json:"allocateView"`
	AllocateShared    bool  `json:"allocateShared"`
	ZeroAppendBacking []int `json:"zeroAppendBacking"`
	ZeroViewWasNonNil bool  `json:"zeroViewWasNonNil"`
}

type fullSliceReport struct {
	Length   int `json:"length"`
	Capacity int `json:"capacity"`
	Value    int `json:"value"`
}

type copyAndDeleteReport struct {
	OverlapCopyCount int   `json:"overlapCopyCount"`
	OverlapValues    []int `json:"overlapValues"`
	DeleteSource     []int `json:"deleteSource"`
	DeleteResult     []int `json:"deleteResult"`
	DeleteSourceLen  int   `json:"deleteSourceLength"`
	DeleteResultLen  int   `json:"deleteResultLength"`
	DeleteShared     bool  `json:"deleteShared"`
}

type addressReport struct {
	SameElementAddress bool `json:"sameElementAddress"`
	SubsliceAddress    bool `json:"subsliceAddress"`
}

type report struct {
	NilAndEmpty nilAndEmptyReport   `json:"nilAndEmpty"`
	SharedSlice sharedResliceReport `json:"sharedSlice"`
	Append      appendReport        `json:"append"`
	FullSlice   fullSliceReport     `json:"fullSlice"`
	CopyDelete  copyAndDeleteReport `json:"copyAndDelete"`
	Addresses   addressReport       `json:"addresses"`
}

func main() {
	var nilSlice []int
	emptySlice := []int{}
	nilReslice := nilSlice[:0]
	emptyReslice := emptySlice[:0]

	base := make([]int, 2, 4)
	base[0], base[1] = 1, 2
	view := base[:1]
	view[0] = 7
	extended := base[:4]

	reuseBase := make([]int, 1, 3)
	reuseBase[0] = 4
	reuseView := append(reuseBase, 5)
	reuseView[0] = 8
	reuseShared := &reuseBase[0] == &reuseView[0]

	allocateBase := []int{4}
	allocateView := append(allocateBase, 5)
	allocateShared := &allocateBase[0] == &allocateView[0]

	zeroBase := make([]int, 2, 4)
	zeroBase[0], zeroBase[1] = 1, 2
	zeroView := zeroBase[:0]
	zeroViewWasNonNil := zeroView != nil
	zeroView = append(zeroView, 9)

	fullBase := make([]int, 2, 4)
	fullBase[0], fullBase[1] = 11, 12
	fullView := fullBase[1:2:3]

	overlap := []int{1, 2, 3, 4, 5}
	overlapCount := copy(overlap[1:], overlap[:4])

	deleteSource := []int{1, 2, 3, 4, 5}
	deleteResult := slices.Delete(deleteSource, 1, 3)
	deleteShared := &deleteSource[0] == &deleteResult[0]

	addressValues := []int{1, 2, 3}
	firstAddress := &addressValues[1]
	secondAddress := &addressValues[1]
	subview := addressValues[1:]

	result := report{
		NilAndEmpty: nilAndEmptyReport{
			NilIsNil:        nilSlice == nil,
			EmptyIsNil:      emptySlice == nil,
			NilLength:       len(nilSlice),
			EmptyLength:     len(emptySlice),
			NilCapacity:     cap(nilSlice),
			EmptyCapacity:   cap(emptySlice),
			NilResliceNil:   nilReslice == nil,
			EmptyResliceNil: emptyReslice == nil,
		},
		SharedSlice: sharedResliceReport{
			Base:           append([]int(nil), base...),
			View:           append([]int(nil), view...),
			ViewLength:     len(view),
			ViewCapacity:   cap(view),
			BackingShared:  &base[0] == &view[0],
			ExtendedValues: append([]int(nil), extended...),
		},
		Append: appendReport{
			ReuseBase:         append([]int(nil), reuseBase...),
			ReuseBacking:      append([]int(nil), reuseBase[:cap(reuseBase)]...),
			ReuseView:         append([]int(nil), reuseView...),
			ReuseShared:       reuseShared,
			ReuseBaseLength:   len(reuseBase),
			ReuseViewLength:   len(reuseView),
			AllocateBase:      append([]int(nil), allocateBase...),
			AllocateView:      append([]int(nil), allocateView...),
			AllocateShared:    allocateShared,
			ZeroAppendBacking: append([]int(nil), zeroBase[:cap(zeroBase)]...),
			ZeroViewWasNonNil: zeroViewWasNonNil,
		},
		FullSlice: fullSliceReport{
			Length:   len(fullView),
			Capacity: cap(fullView),
			Value:    fullView[0],
		},
		CopyDelete: copyAndDeleteReport{
			OverlapCopyCount: overlapCount,
			OverlapValues:    append([]int(nil), overlap...),
			DeleteSource:     append([]int(nil), deleteSource...),
			DeleteResult:     append([]int(nil), deleteResult...),
			DeleteSourceLen:  len(deleteSource),
			DeleteResultLen:  len(deleteResult),
			DeleteShared:     deleteShared,
		},
		Addresses: addressReport{
			SameElementAddress: firstAddress == secondAddress,
			SubsliceAddress:    firstAddress == &subview[0],
		},
	}

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetEscapeHTML(false)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(result); err != nil {
		panic(err)
	}
}
