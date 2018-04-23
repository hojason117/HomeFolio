package model

// ViewedTable : Viewed table name in database.
const ViewedTable = "viewed"

// Viewed : Data structure that holds a single likes.
type Viewed struct {
	HID  string `json:"h_id"`
	UID  string `json:"u_id"`
	Time string `json:"time"`
}
