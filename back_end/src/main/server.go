package main

import (
	"handler"
	"server"
)

func main() {
	// Instantiate server
	dbURL := "hojason117/cop5725dbms@homefolio.cons9y5crumk.us-east-2.rds.amazonaws.com:1521/ORCL"
	srvAddr := "ec2-13-58-245-163.us-east-2.compute.amazonaws.com:1323"
	h := handler.NewHandler(dbURL)
	e := server.NewServer(h)

	// Initiate parallel server control
	go server.TerminalControl(e, h, srvAddr)

	// Start server
	e.Logger.Fatal(e.Start(srvAddr))
	//e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	//e.Logger.Fatal(e.StartAutoTLS(srvAddr))
}
