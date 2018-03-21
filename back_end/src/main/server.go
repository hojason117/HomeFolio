package main

import (
	"fmt"
	"handler"
	"server"
)

func main() {
	// Instantiate server
	dbURL := "chho/Lego1424@oracle.cise.ufl.edu:1521/orcl"
	srvAddr := "localhost:1323"
	h := handler.NewHandler(dbURL)
	e := server.NewServer(h)

	// Initiate parallel server control
	go server.TerminalControl(e, h, srvAddr)

	go test(h)

	// Start server
	e.Logger.Fatal(e.Start(srvAddr))
}

func test(h *handler.Handler) {
	rows, err := h.Database.Query("SELECT name FROM country")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var name string
		err = rows.Scan(&name)
		if err != nil {
			panic(err)
		}
		fmt.Println(name)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
}
