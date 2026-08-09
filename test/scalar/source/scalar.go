package scalar

func Increment(value int32) int32 {
	pointer := &value
	(*pointer)++
	return value
}
