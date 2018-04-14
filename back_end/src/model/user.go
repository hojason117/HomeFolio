package model

import "database/sql"

// UserTable : User table name in database.
const UserTable = "acc_user"

// User : Data structure that holds a single user.
type User struct {
	UID      string         `json:"u_id"`
	Email    string         `json:"email"`
	Username string         `json:"username"`
	Password string         `json:"password"`
	Age      sql.NullInt64  `json:"age,omitempty"`
	Area     sql.NullString `json:"area,omitempty"`
	Bio      sql.NullString `json:"bio,omitempty"`
}
