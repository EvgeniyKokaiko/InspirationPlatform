package main

import "fmt"

type president struct {
	name    string
	surname string
}

func main() {
	a := []int{1, 2, 3, 4, 5, 6, 67, 7, 7, 8, 12312, 67, 867, 867, 867, 867, 86}

	petro := president{
		name:    "Petro",
		surname: "Poroshenko",
	}
	pointedPetro := &petro

	pointedPetro.bruh("Vasya")
	fmt.Println(petro.name)

	for index, value := range a {
		fmt.Println(index, value)
	}
}

func (s *president) bruh(n string) {
	s.name = n
}
