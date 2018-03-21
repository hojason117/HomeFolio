package handler

import (
	"database/sql"

	_ "github.com/mattn/go-oci8"
)

// Handler : Handler for dealing with requests.
type Handler struct {
	Database *sql.DB
	DBName   string
	//UserHandler		*user.Handler
	//TweetHandler	*tweet.Handler
	//CommentHandler	*comment.Handler
	//NotifHandler	*notification.Handler
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
	//defer session.Close()

	// Initialize handler
	//nh := notification.NewHandler(dbURL)
	//uh := user.NewHandler(dbURL, Key, nh.Manager.Operator)
	//th := tweet.NewHandler(dbURL, Key, nh.Manager.Operator)
	//ch := comment.NewHandler(dbURL, Key)
	//h = &Handler{DB: session, DBName: strings.Split(dbURL, "/")[3], UserHandler: uh, TweetHandler: th, CommentHandler: ch, NotifHandler: nh}
	h = &Handler{Database: session, DBName: dbURL}

	return h
}

// Shutdown : Gracefully shutdown handler.
func (h *Handler) Shutdown() {
	h.Database.Close()
	//h.UserHandler.Shutdown()
	//h.TweetHandler.Shutdown()
	//h.CommentHandler.Shutdown()
	//h.NotifHandler.Shutdown()
}
