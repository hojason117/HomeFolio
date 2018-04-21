import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class HouseService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }
  
    fetchRegionHouses = async (LatLng, count) => {
        var nextHouses = [];
        try {
            const response = await Axios.get('/houseInfo?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b + '&count=' + count,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                for (var index in response.data)
                    nextHouses.push({ h_id: response.data[index].h_id, lat: response.data[index].latitude, lng: response.data[index].longitude });
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch(error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
        }

        return nextHouses;
    }

    fetchHouseInfo = async (h_id) => {
        var info;
        try {
            const response = await Axios.get('/houseInfo/' + h_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                info = response.data;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch(error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log('House not found.');
                }
                else
                    console.log(error.response);
            }
            else if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
        }

        return info;
    }

    getHouseAddress = async (lat, lng) => {
        var addr = '';
        try {
            const response = await Axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs')
            if (response.status === 200) {
                addr = response.data.results[0].formatted_address;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch(error) {
            console.log(error);
        }

        return addr;
    }

    getHouseLatLng = async (addr) => {
        var latlng;
        try {
            const response = await Axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr.replace(new RegExp(' ', 'g'), '+') + '&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs')
            if (response.status === 200) {
                latlng = response.data.results[0].geometry.location;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            console.log(error);
        }

        return latlng;
    }

    fetchTopLikedHouses = async (LatLng, count) => {
        var houses;
        try {
            const response = await Axios.get('/topliked?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b + '&count=' + count,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                houses = response.data;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
        }

        return houses;
    }

    fetchTopViewedHouses = async (LatLng, count) => {
        var houses;
        try {
            const response = await Axios.get('/topviewed?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b + '&count=' + count,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                houses = response.data;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
        }

        return houses;
    }

    getTotalTupleCount = async () => {
        var count = 0;
        try {
            const response = await Axios.get('/tuplecount',
                {
                    baseURL: this.baseUrl
                })
            if (response.status === 200) {
                count = response.data.count;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
            throw error;
        }

        return count;
    }

    deleteHouse = async (id) => {
        try {
            const response = await Axios.delete('/deletehouse/' + id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status !== 204)
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
            throw error;
        }
    }

    searchHouse = async (zip, minPrice, maxPrice, bedroomCnt, bathroomCnt, buildingQuality, story, livingArea, lotSize, yearBuilt, max) => {
        var queryParam = '';
        
        if (zip !== '')
            queryParam += ('&zip=' + zip);
        if (minPrice !== '')
            queryParam += ('&minPrice=' + minPrice);
        if (maxPrice !== '')
            queryParam += ('&maxPrice=' + maxPrice);
        if (bedroomCnt !== '')
            queryParam += ('&bedroomCnt=' + bedroomCnt);
        if (bathroomCnt !== '')
            queryParam += ('&bathroomCnt=' + bathroomCnt);
        if (buildingQuality !== '')
            queryParam += ('&buildingQuality=' + buildingQuality);
        if (story !== '')
            queryParam += ('&story=' + story);
        if (livingArea !== '')
            queryParam += ('&livingArea=' + livingArea);
        if (lotSize !== '')
            queryParam += ('&lotSize=' + lotSize);
        if (yearBuilt !== '')
            queryParam += ('&yearBuilt=' + yearBuilt);

        queryParam += ('&max=' + max);

        console.log(queryParam);
        var results = [];

        try {
            const response = await Axios.get('/searchhouse?' + queryParam.slice(1),
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                for (var index in response.data)
                    results.push({ 
                        h_id: response.data[index].h_id, 
                        lat: response.data[index].latitude, 
                        lng: response.data[index].longitude,
                        bathroomCnt: response.data[index].bathroomCnt,
                        bedroomCnt: response.data[index].bedroomCnt,
                        buildingQualityID: response.data[index].buildingQualityID,
                        livingAreaSize: response.data[index].livingAreaSize,
                        lotSize: response.data[index].lotSize,
                        zip: response.data[index].zip,
                        storyNum: response.data[index].storyNum,
                        price: response.data[index].price,
                        yearBuilt: response.data[index].yearBuilt
                     });
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else
                console.log(error.message);
            throw error;
        }

        return results;
    }
}

export default HouseService;