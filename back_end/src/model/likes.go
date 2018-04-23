package model

// LikesTable : Likes table name in database.
const LikesTable = "likes"

// Likes : Data structure that holds a single likes.
type Likes struct {
	HID string `json:"h_id"`
	UID string `json:"u_id"`
}
