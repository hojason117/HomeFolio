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
        /*var addr = '';
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

        return addr;*/

        return '2800 Southwest 35th Place, Gainesville, FL';
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
        var houses = [];
        try {
            const response = await Axios.get('/topliked?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b + '&count=' + count,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200)
                houses = response.data ? response.data : [];
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
        var houses = [];
        try {
            const response = await Axios.get('/topviewed?ne_lat=' + LatLng.f.f + '&ne_lng=' + LatLng.b.f + '&sw_lat=' + LatLng.f.b + '&sw_lng=' + LatLng.b.b + '&count=' + count,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200)
                houses = response.data ? response.data : [];
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

    buyHouse = async (uid, hid) => {
        /*try {
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
        }*/
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
        }

        return results;
    }

    sellHouse = async (u_id, bathroomCnt, bedroomCnt, buildingQualityID, livingAreaSize, latitude, longitude, lotSize, zip, storyNum, price, yearBuilt, tax) => {
        try {
            const response = await Axios.post('/sell',
                {
                    u_id: u_id,
                    bathroomCnt: bathroomCnt,
                    bedroomCnt: bedroomCnt,
                    buildingQualityID: buildingQualityID,
                    livingAreaSize: livingAreaSize,
                    latitude: latitude,
                    longitude: longitude,
                    lotSize: lotSize,
                    zip: zip,
                    storyNum: storyNum,
                    price: price,
                    yearBuilt: yearBuilt,
                    tax: tax
                },
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status !== 201)
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

    updateHouseInfo = async (h_id, bathroomCnt, bedroomCnt, buildingQualityID, livingAreaSize, latitude, longitude, lotSize, zip, storyNum, price, yearBuilt, tax) => {
        try {
            const response = await Axios.post('/updateHouseInfo/' + h_id,
                {
                    bathroomCnt: bathroomCnt,
                    bedroomCnt: bedroomCnt,
                    buildingQualityID: buildingQualityID,
                    livingAreaSize: livingAreaSize,
                    latitude: latitude,
                    longitude: longitude,
                    lotSize: lotSize,
                    zip: zip,
                    storyNum: storyNum,
                    price: price,
                    yearBuilt: yearBuilt,
                    tax: tax
                },
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status !== 200)
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

    addLike = async (u_id, h_id) => {
        try {
            const response = await Axios.post('/like',
                {
                    u_id: u_id,
                    h_id: h_id
                },
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status !== 201)
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
    }

    removeLike = async (u_id, h_id) => {
        try {
            const response = await Axios.delete('/unlike/' + u_id + ',' + h_id,
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
        }
    }

    fetchLikedUser = async (h_id) => {
        var users = [];
        try {
            const response = await Axios.get('houseInfo/likedUsers/' + h_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                if(response.data)
                    users = response.data;
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

        return users;
    }

    fetchViewededUser = async (h_id) => {
        var users = [];
        try {
            const response = await Axios.get('houseInfo/viewedUsers/' + h_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                if (response.data)
                    users = response.data;
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

        return users;
    }

    addViewed = async (u_id, h_id, time) => {
        try {
            const response = await Axios.post('/viewed',
                {
                    u_id: u_id,
                    h_id: h_id,
                    time: time
                },
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status !== 201)
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
    }
}

export default HouseService;