import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class DataService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }
  
    fetchRegionHouses = (ne_lat, ne_lng, sw_lat, sw_lng) => {
        Axios.get('/houseInfo?ne_lat=' + ne_lat + '&ne_lng=' + ne_lng + '&sw_lat=' + sw_lat + '&sw_lng=' + sw_lng,
            {
                baseURL: this.baseUrl,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}
            })
            .then(
                response => {
                    if (response.status === 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            console.log(i);
                            //<Marker position={{ lat: 34.206691, lng: -118.518468 }} />
                        }
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