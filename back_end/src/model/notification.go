package model

import (
	"time"
)

// NotificationCollection : Notification collection name in database.
const (
	NotificationCollection = "notifications"
	NewTweetType           = "NewTweet"
	FollowType             = "Follow"
)

type (
	// Individual : Data structure that contains notifications for a single user.
	Individual struct {
		UID           int
		Username      string
		Notifications []Notification
	}

	// Notification : Data structure that holds a notification.
	Notification struct {
		Timestamp time.Time
		Type      string
		Detail    interface{}
	}

	// NewTweetNotif : Data structure that holds a new tweet notification.
	NewTweetNotif struct {
		Publisher string
	}

	// FollowNotif : Data structure that holds a follow notification.
	FollowNotif struct {
		Followee string
		Follower string
	}
)

// SetBSON : Custom bson.Setter for Notification.
/*func (n *Notification) SetBSON(raw bson.Raw) (err error) {
	typeCheck := new(struct {
		Type string `bson:"type"`
	})
	if err = raw.Unmarshal(typeCheck); err != nil {
		return err
	}

	switch typeCheck.Type {
	case NewTweetType:
		decoded := new(struct {
			Timestamp time.Time     `bson:"timestamp"`
			Type      string        `bson:"type"`
			Detail    NewTweetNotif `bson:"detail"`
		})
		err = raw.Unmarshal(decoded)
		n.Timestamp = decoded.Timestamp
		n.Type = decoded.Type
		n.Detail = decoded.Detail
	case FollowType:
		decoded := new(struct {
			Timestamp time.Time   `bson:"timestamp"`
			Type      string      `bson:"type"`
			Detail    FollowNotif `bson:"detail"`
		})
		err = raw.Unmarshal(decoded)
		n.Timestamp = decoded.Timestamp
		n.Type = decoded.Type
		n.Detail = decoded.Detail
	default:
		fmt.Println("Invalid notification type.")
		err = *new(error)
	}

	return err
}*/
