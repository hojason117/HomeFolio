import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class UserService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }

    fetchUserInfo = async (u_id) => {
        var info = {};
        try {
            const response = await Axios.get('/userInfo/' + u_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                info.u_id = response.data.u_id;
                info.email = response.data.email;
                info.username = response.data.username;
                info.seller = response.data.seller;
                info.buyer = response.data.buyer;
                info.age = response.data.age ? response.data.age : 0;
                info.area = response.data.area ? response.data.area : '';
                info.bio = response.data.bio ? response.data.bio : '';
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch(error) {
            if (error.response) {
                if (error.response.status === 404)
                    console.log('User not found.');
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

    fetchOwnHouse = async (u_id) => {
        var houses = [];
        try {
            const response = await Axios.get('/userInfo/ownHouses/' + u_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                for (var index in response.data)
                    houses.push(response.data[index]);
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        }

        return houses;
    }

    fetchLikedHouse = async (u_id) => {
        var houses = [];
        try {
            const response = await Axios.get('/userInfo/likedHouses/' + u_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                for (var index in response.data)
                    houses.push(response.data[index]);
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        }

        return houses;
    }

    fetchViewedHouse = async (u_id) => {
        var houses = [];
        try {
            const response = await Axios.get('/userInfo/viewedHouses/' + u_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                for (var index in response.data)
                    houses.push(response.data[index]);
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch (error) {
            if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        }

        return houses;
    }

    updateUserInfo = async (username, password, age, area, bio) => {
        try {
            const response = await Axios.post('/updateUserInfo',
                {
                    username: username,
                    password: password,
                    age: age,
                    area: area,
                    bio: bio
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
}

export default UserService;