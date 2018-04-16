import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class DataService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }
  
    fetchRegionHouses = (LatLng, map) => {
        var nextHouses = [];

        Axios.get('/houseInfo?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b,
            {
                baseURL: this.baseUrl,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}
            })
            .then(
                response => {
                    if (response.status === 200) {
                        for (var index in response.data)
                            nextHouses.push({h_id: response.data[index].h_id , lat: response.data[index].latitude, lng: response.data[index].longitude });
                        
                        map.setState({ houses: nextHouses });
                    }
                    else {
                        console.log('Unexpected response code: ' + response.status);
                    }
                })
            .catch(this.fetchRegionHousesErrorHandler)
    }

    fetchRegionHousesErrorHandler = (error) => {
        if (error.request) {
            console.log('No response from server.');
            console.log(error.request);
        }
        else {
            console.log(error.message);
        }
    }

    fetchHouseInfo = (h_id) => {
        Axios.get('/houseInfo/' + h_id,
            {
                baseURL: this.baseUrl,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
            })
            .then(
                response => {
                    if (response.status === 200) {
                        
                    }
                    else {
                        console.log('Unexpected response code: ' + response.status);
                    }
                })
            .catch(this.fetchHouseInfoErrorHandler)
    }

    fetchHouseInfoErrorHandler = (error) => {
        if (error.response) {
            if (error.response.status === 404) {
                console.log('House not found.');
            }
        }
        else if (error.request) {
            console.log('No response from server.');
            console.log(error.request);
        }
        else {
            console.log(error.message);
        }
    }

    getHouseAddress = (marker) => {
        Axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + marker.props.info.lat + ',' + marker.props.info.lng + '&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs')
            .then(
                response => {
                    if (response.status === 200) {
                        marker.setState({ addr: response.data.results[0].formatted_address });
                    }
                    else {
                        console.log('Unexpected response code: ' + response.status);
                    }
                })
            .catch((error) => console.log(error))
    }
}

export default DataService;