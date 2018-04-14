import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class DataService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }
  
    fetchRegionHouses = (LatLng, map) => {
        var nextMarkers = [];

        Axios.get('/houseInfo?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b,
            {
                baseURL: this.baseUrl,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}
            })
            .then(
                response => {
                    if (response.status === 200) {
                        for (var index in response.data)
                            nextMarkers.push({ lat: response.data[index].latitude, lng: response.data[index].longitude });
                        
                        map.setState({ markers: nextMarkers });
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
}

export default DataService;