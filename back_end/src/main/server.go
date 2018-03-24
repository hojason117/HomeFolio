package main

import (
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

	// Start server
	e.Logger.Fatal(e.Start(srvAddr))
}
