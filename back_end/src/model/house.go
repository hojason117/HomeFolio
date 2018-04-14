package model

// HouseTable : House table name in database.
const HouseTable = "house"

// House : Data structure that holds a single house.
type House struct {
	HID               string  `json:"h_id"`
	UID               string  `json:"u_id"`
	BathroomCnt       int     `json:"bathroomCnt"`
	BedroomCnt        int     `json:"bedroomCnt"`
	BuildingQualityID int     `json:"buildingQualityID"`
	LivingAreaSize    int     `json:"livingAreaSize"`
	Latitude          float32 `json:"latitude"`
	Longitude         float32 `json:"longitude"`
	LotSize           int     `json:"lotSize"`
	CityID            int     `json:"cityID"`
	County            string  `json:"county"`
	Zip               int     `json:"zip"`
	YearBuilt         int     `json:"yearBuilt"`
	StoryNum          int     `json:"storyNum"`
	Price             int     `json:"price"`
	Tax               float32 `json:"tax"`
}
