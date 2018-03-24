package handler

import (
	"database/sql"
	"notification"
	"user"

	//oracle db driver
	_ "github.com/mattn/go-oci8"
)

// Handler : Handler for dealing with requests.
type Handler struct {
	Database     *sql.DB
	DBURL        string
	UserHandler  *user.Handler
	NotifHandler *notification.Handler
}

// Key : Key for signing tokens.
const Key = "UYrtPaa0Pky7QZyVrkIfnouatG7LjTKystf0FGdOuDiXCZyCSuVz8YdK7OBeSrC"

// NewHandler : Create a Handler instance
func NewHandler(dbURL string) (h *Handler) {
	// Database connection
	session, err := sql.Open("oci8", dbURL)
	if err != nil {
		panic(err)
	}

	// Initialize handler
	nh := notification.NewHandler(session, dbURL)
	uh := user.NewHandler(session, dbURL, Key, nh.Manager.Operator)
	h = &Handler{Database: session, DBURL: dbURL, UserHandler: uh, NotifHandler: nh}

	return h
}

// Shutdown : Gracefully shutdown handler.
func (h *Handler) Shutdown() {
	h.Database.Close()
	h.UserHandler.Shutdown()
	h.NotifHandler.Shutdown()
}
