package house

import (
	"database/sql"
	"model"
	"net/http"

	"github.com/labstack/echo"
)

type (
	// Handler : Handler for house related requests.
	Handler struct {
		db    *sql.DB
		dbURL string
	}
)

// NewHandler : Create a Handler instance.
func NewHandler(session *sql.DB, dburl string) (h *Handler) {
	return &Handler{session, dburl}
}

// FetchSingleHouseInfo : Return info for a specific house.
//				   URL: "/api/v1/houseInfo/:hid"
//				   Method: GET
//				   Return 200 OK on success.
func (h *Handler) FetchSingleHouseInfo(c echo.Context) (err error) {
	// Retrieve house info from database
	houseD := new(model.House)
	err = h.db.QueryRow("SELECT * FROM house WHERE h_id = :var1", c.Param("hid")).Scan(&houseD.HID, &houseD.UID,
		&houseD.BathroomCnt, &houseD.BedroomCnt, &houseD.BuildingQualityID, &houseD.LivingAreaSize, &houseD.Latitude,
		&houseD.Longitude, &houseD.LotSize, &houseD.CityID, &houseD.County, &houseD.Zip, &houseD.YearBuilt,
		&houseD.StoryNum, &houseD.Price, &houseD.Tax)
	if err != nil {
		if err == sql.ErrNoRows {
			return &echo.HTTPError{Code: http.StatusNotFound, Message: "House does not exist."}
		}
		return err
	}

	return c.JSON(http.StatusOK, houseD)
}

// FetchRegionHouseInfo : Return information about houses located in the queried area.
//				   URL: "/api/v1/houseInfo"
//				   Method: GET
//				   Return 200 OK on success.
//				   Return 404 Not Found if the house is not in the database.
func (h *Handler) FetchRegionHouseInfo(c echo.Context) (err error) {
	// Retrieve house info from database
	houseD := new(model.House)
	var houses []*model.House
	rows, err := h.db.Query("SELECT * FROM house WHERE latitude < :var1 and latitude > :var2 and longitude < :var3 and longitude > :var4",
		c.QueryParam("ne_lat"), c.QueryParam("sw_lat"), c.QueryParam("ne_lng"), c.QueryParam("sw_lng"))
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&houseD.HID, &houseD.UID,
			&houseD.BathroomCnt, &houseD.BedroomCnt, &houseD.BuildingQualityID, &houseD.LivingAreaSize, &houseD.Latitude,
			&houseD.Longitude, &houseD.LotSize, &houseD.CityID, &houseD.County, &houseD.Zip, &houseD.YearBuilt,
			&houseD.StoryNum, &houseD.Price, &houseD.Tax)
		if err != nil {
			return err
		}

		houses = append(houses, houseD)
	}
	if err = rows.Err(); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, houses)
}

// Shutdown : Gracefully shutdown user handler.
func (h *Handler) Shutdown() {
	h.db.Close()
}
